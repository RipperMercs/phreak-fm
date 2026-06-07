"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ShortwaveEngine,
  STATIONS,
  tuningToKHz,
  type StationId,
} from "@/lib/shortwave";

const START_TUNING = 0.35; // a static gap, so you have to hunt for a station

function randomGroup(): string {
  let g = "";
  for (let i = 0; i < 5; i++) g += String(Math.floor(Math.random() * 10));
  return g;
}

function stationName(id: StationId | null): string | null {
  return id ? STATIONS.find((s) => s.id === id)?.name ?? null : null;
}

export function NumbersStation() {
  const engineRef = useRef<ShortwaveEngine | null>(null);
  const teletypeTimer = useRef<number | null>(null);

  const [powered, setPowered] = useState(false);
  const [tuning, setTuning] = useState(START_TUNING);
  const [stationId, setStationId] = useState<StationId | null>(null);
  const [freqKHz, setFreqKHz] = useState(tuningToKHz(START_TUNING));
  const [volume, setVolume] = useState(0.6);
  const [muted, setMuted] = useState(false);
  const [teletype, setTeletype] = useState<string[]>([]);

  const getEngine = useCallback((): ShortwaveEngine => {
    if (!engineRef.current) {
      const engine = new ShortwaveEngine();
      engine.setVolume(volume);
      engine.setMuted(muted);
      engineRef.current = engine;
    }
    return engineRef.current;
  }, [volume, muted]);

  const clearTeletypeTimer = useCallback(() => {
    if (teletypeTimer.current !== null) {
      window.clearInterval(teletypeTimer.current);
      teletypeTimer.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      clearTeletypeTimer();
      engineRef.current?.dispose();
      engineRef.current = null;
    };
  }, [clearTeletypeTimer]);

  // The teletype only runs while locked onto the counting station.
  useEffect(() => {
    clearTeletypeTimer();
    if (powered && stationId === "counting") {
      teletypeTimer.current = window.setInterval(() => {
        setTeletype((lines) => [...lines, randomGroup()].slice(-9));
        engineRef.current?.blip();
      }, 1300);
    } else {
      setTeletype([]);
    }
    return clearTeletypeTimer;
  }, [powered, stationId, clearTeletypeTimer]);

  const togglePower = useCallback(() => {
    const engine = getEngine();
    if (powered) {
      engine.dispose();
      setPowered(false);
      setStationId(null);
    } else {
      if (!engine.start()) return;
      const res = engine.tune(tuning);
      setPowered(true);
      setStationId(res.station?.id ?? null);
      setFreqKHz(res.freqKHz);
    }
  }, [powered, tuning, getEngine]);

  const onTune = (t: number) => {
    setTuning(t);
    setFreqKHz(tuningToKHz(t));
    if (powered) {
      const res = getEngine().tune(t);
      setStationId(res.station?.id ?? null);
      setFreqKHz(res.freqKHz);
    }
  };

  const handleVolume = (v: number) => {
    setVolume(v);
    engineRef.current?.setVolume(v);
  };

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    engineRef.current?.setMuted(next);
  };

  const mhz = (freqKHz / 1000).toFixed(2);
  const name = stationName(stationId);

  return (
    <div className="my-8 border border-border bg-bg-surface">
      <div className="flex items-center justify-between border-b border-border px-4 py-2">
        <span className="text-[0.65rem] tracking-[0.3em] text-accent uppercase">
          Shortwave Receiver
        </span>
        <span className="font-mono text-[0.6rem] text-text-muted">{mhz} MHz</span>
      </div>

      {/* Screen */}
      <div className="border-b border-border bg-bg p-4 min-h-[8rem]">
        {!powered ? (
          <p className="font-mono text-xs text-text-muted">
            {">"} receiver is off. power on, then turn the dial.
          </p>
        ) : name ? (
          <div>
            <p className="font-mono text-[0.6rem] uppercase tracking-widest text-accent mb-2">
              {">"} locked :: {name}
            </p>
            {stationId === "counting" ? (
              <div className="font-mono text-sm leading-relaxed text-text-bright">
                {teletype.length === 0 ? (
                  <span className="text-text-muted">listening...</span>
                ) : (
                  teletype.map((g, i) => (
                    <span key={i} className="mr-3 inline-block">
                      {g}
                    </span>
                  ))
                )}
                <span className="cursor-blink" />
              </div>
            ) : stationId === "buzzer" ? (
              <p className="font-mono text-sm text-text">
                a flat, endless buzz. it almost never stops. nobody will say why.
              </p>
            ) : (
              <p className="font-mono text-sm text-text">
                a few notes of a folk tune, looping, then it will read the
                groups. someone is meant to be listening.
              </p>
            )}
          </div>
        ) : (
          <p className="font-mono text-xs text-text-muted">
            {">"} ...static... turn the dial slowly. there are stations out here.
          </p>
        )}
      </div>

      {/* Dial */}
      <div className="border-b border-border px-4 py-3">
        <label className="mb-2 block text-[0.55rem] uppercase tracking-widest text-text-muted">
          tuning :: 3 to 30 MHz
        </label>
        <input
          type="range"
          min={0}
          max={1}
          step={0.004}
          value={tuning}
          onChange={(e) => onTune(Number(e.target.value))}
          aria-label="Tuning dial"
          className="w-full accent-accent"
        />
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 p-4">
        <button
          type="button"
          onClick={togglePower}
          aria-pressed={powered}
          className={`rounded-sm border px-3 py-2 text-xs uppercase tracking-widest transition-colors ${
            powered
              ? "border-accent bg-accent text-bg"
              : "border-border text-text-muted hover:border-accent hover:text-accent"
          }`}
        >
          {powered ? "power on" : "power off"}
        </button>

        <button
          type="button"
          onClick={toggleMute}
          aria-pressed={muted}
          aria-label={muted ? "Unmute" : "Mute"}
          className="rounded-sm border border-border px-3 py-2 text-[0.6rem] uppercase tracking-wider text-text-muted hover:text-text"
        >
          {muted ? "muted" : "on"}
        </button>

        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => handleVolume(Number(e.target.value))}
          aria-label="Volume"
          className="ml-auto w-20 accent-accent"
        />
      </div>
    </div>
  );
}
