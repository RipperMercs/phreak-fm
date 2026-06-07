"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  DTMF_FREQUENCIES,
  DIAL_TONE,
  SEIZE_FREQUENCY,
  ToneEngine,
  type DtmfKey,
} from "@/lib/tones";

// Voice names used with the tone engine.
const V_DIAL = "dial";
const V_KEY = "key";
const V_SEIZE = "seize";

const KEYS: { key: DtmfKey; letters: string }[] = [
  { key: "1", letters: "" },
  { key: "2", letters: "ABC" },
  { key: "3", letters: "DEF" },
  { key: "4", letters: "GHI" },
  { key: "5", letters: "JKL" },
  { key: "6", letters: "MNO" },
  { key: "7", letters: "PQRS" },
  { key: "8", letters: "TUV" },
  { key: "9", letters: "WXYZ" },
  { key: "*", letters: "" },
  { key: "0", letters: "OPER" },
  { key: "#", letters: "" },
];

const CAP_IDLE = "a payphone. one of the last. lift the handset.";
const CAP_DIAL = "dial tone. the network is listening.";
const CAP_KEY = "touch tones. two frequencies per key. the keypad was always a chord.";
const CAP_SEIZE =
  "2600 hz. one tone. in 1960 it seized a long distance trunk and the whole continent opened up.";
const CAP_HANGUP = "back on hook. the line goes quiet.";
const CAP_2600_DIALED = "you dialed 2600. of course you did.";

export function Payphone() {
  const engineRef = useRef<ToneEngine | null>(null);
  const heldRef = useRef<Set<string>>(new Set());

  const [offHook, setOffHook] = useState(false);
  const [activeKey, setActiveKey] = useState<DtmfKey | null>(null);
  const [seizing, setSeizing] = useState(false);
  const [dialed, setDialed] = useState("");
  const [caption, setCaption] = useState(CAP_IDLE);
  const [volume, setVolume] = useState(0.6);
  const [muted, setMuted] = useState(false);

  const getEngine = useCallback((): ToneEngine => {
    if (!engineRef.current) {
      const engine = new ToneEngine();
      engine.setVolume(volume);
      engine.setMuted(muted);
      engineRef.current = engine;
    }
    return engineRef.current;
  }, [volume, muted]);

  useEffect(() => {
    return () => {
      engineRef.current?.dispose();
      engineRef.current = null;
    };
  }, []);

  const resumeDialIfIdle = useCallback(() => {
    if (offHook && heldRef.current.size === 0) {
      getEngine().setSustained(V_DIAL, [DIAL_TONE[0], DIAL_TONE[1]]);
    }
  }, [offHook, getEngine]);

  const toggleHook = useCallback(() => {
    const engine = getEngine();
    if (offHook) {
      heldRef.current.clear();
      engine.clearAll();
      setOffHook(false);
      setActiveKey(null);
      setSeizing(false);
      setCaption(CAP_HANGUP);
    } else {
      engine.setSustained(V_DIAL, [DIAL_TONE[0], DIAL_TONE[1]]);
      setOffHook(true);
      setCaption(CAP_DIAL);
    }
  }, [offHook, getEngine]);

  const startKey = useCallback(
    (k: DtmfKey) => {
      if (!offHook || heldRef.current.has(k)) return;
      heldRef.current.add(k);
      const engine = getEngine();
      engine.clearSustained(V_DIAL);
      engine.clearSustained(V_SEIZE);
      engine.setSustained(V_KEY, [DTMF_FREQUENCIES[k][0], DTMF_FREQUENCIES[k][1]]);
      setSeizing(false);
      setActiveKey(k);
      setDialed((d) => (d + k).slice(-32));
      setCaption(CAP_KEY);
    },
    [offHook, getEngine]
  );

  const endKey = useCallback(
    (k: DtmfKey) => {
      if (!heldRef.current.has(k)) return;
      heldRef.current.delete(k);
      getEngine().clearSustained(V_KEY);
      setActiveKey(null);
      resumeDialIfIdle();
    },
    [getEngine, resumeDialIfIdle]
  );

  const startSeize = useCallback(() => {
    if (!offHook || heldRef.current.has(V_SEIZE)) return;
    heldRef.current.add(V_SEIZE);
    const engine = getEngine();
    engine.clearSustained(V_DIAL);
    engine.clearSustained(V_KEY);
    engine.setSustained(V_SEIZE, [SEIZE_FREQUENCY]);
    setActiveKey(null);
    setSeizing(true);
    setCaption(CAP_SEIZE);
  }, [offHook, getEngine]);

  const endSeize = useCallback(() => {
    if (!heldRef.current.has(V_SEIZE)) return;
    heldRef.current.delete(V_SEIZE);
    getEngine().clearSustained(V_SEIZE);
    setSeizing(false);
    resumeDialIfIdle();
  }, [getEngine, resumeDialIfIdle]);

  // Quiet easter egg: dialing the tone itself.
  useEffect(() => {
    if (dialed.endsWith("2600")) setCaption(CAP_2600_DIALED);
  }, [dialed]);

  const handleVolume = (v: number) => {
    setVolume(v);
    engineRef.current?.setVolume(v);
  };

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    engineRef.current?.setMuted(next);
  };

  const readout = !offHook
    ? "on hook"
    : seizing
    ? `${SEIZE_FREQUENCY} Hz`
    : activeKey
    ? `${DTMF_FREQUENCIES[activeKey][0]} + ${DTMF_FREQUENCIES[activeKey][1]} Hz`
    : `${DIAL_TONE[0]} + ${DIAL_TONE[1]} Hz`;

  return (
    <div className="max-w-sm mx-auto">
      {/* The phone */}
      <div className="border border-border bg-bg-surface">
        {/* Enamel sign */}
        <div className="flex items-center justify-between border-b border-border px-4 py-2">
          <span className="text-[0.65rem] tracking-[0.3em] text-accent uppercase">
            Public Telephone
          </span>
          <span className="text-[0.6rem] text-text-muted">no. 2600</span>
        </div>

        {/* Handset + readout */}
        <div className="flex items-stretch gap-3 border-b border-border p-4">
          <button
            type="button"
            onClick={toggleHook}
            aria-pressed={offHook}
            aria-label={offHook ? "Hang up the handset" : "Lift the handset"}
            className={`flex w-24 shrink-0 flex-col items-center justify-center gap-2 rounded-sm border py-3 transition-colors ${
              offHook
                ? "border-accent text-accent"
                : "border-border text-text-muted hover:border-accent hover:text-accent"
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              className={`h-7 w-7 transition-transform motion-reduce:transition-none ${
                offHook ? "-translate-y-0.5 -rotate-12" : ""
              }`}
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.3 1.1l-2.2 2.1z"
              />
            </svg>
            <span className="text-[0.6rem] uppercase tracking-wider">
              {offHook ? "hang up" : "lift"}
            </span>
          </button>

          <div className="flex flex-1 flex-col justify-between">
            {/* Dialed digits display */}
            <div
              className="overflow-hidden whitespace-nowrap rounded-sm border border-border bg-bg px-3 py-2 text-right text-accent"
              aria-hidden="true"
            >
              {dialed || " "}
            </div>
            {/* Live frequency readout, the non-audio channel */}
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-[0.55rem] uppercase tracking-widest text-text-muted">
                signal
              </span>
              <span className="text-xs text-text-bright" aria-live="polite">
                {readout}
              </span>
            </div>
          </div>
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-px bg-border p-px">
          {KEYS.map(({ key, letters }) => (
            <button
              key={key}
              type="button"
              disabled={!offHook}
              onPointerDown={() => startKey(key)}
              onPointerUp={() => endKey(key)}
              onPointerLeave={() => endKey(key)}
              onPointerCancel={() => endKey(key)}
              onKeyDown={(e) => {
                if (e.key === " " || e.key === "Enter") {
                  e.preventDefault();
                  startKey(key);
                }
              }}
              onKeyUp={(e) => {
                if (e.key === " " || e.key === "Enter") endKey(key);
              }}
              aria-label={`Dial ${key}`}
              className={`flex touch-none select-none flex-col items-center justify-center bg-bg-surface py-3 transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                activeKey === key
                  ? "bg-accent text-bg"
                  : "text-text hover:bg-bg-surface-hover"
              }`}
            >
              <span className="text-lg leading-none">{key}</span>
              <span className="mt-1 h-[0.6rem] text-[0.5rem] tracking-[0.2em] text-text-muted">
                {letters}
              </span>
            </button>
          ))}
        </div>

        {/* 2600 + controls */}
        <div className="flex items-center gap-3 border-t border-border p-4">
          <button
            type="button"
            disabled={!offHook}
            onPointerDown={startSeize}
            onPointerUp={endSeize}
            onPointerLeave={endSeize}
            onPointerCancel={endSeize}
            onKeyDown={(e) => {
              if (e.key === " " || e.key === "Enter") {
                e.preventDefault();
                startSeize();
              }
            }}
            onKeyUp={(e) => {
              if (e.key === " " || e.key === "Enter") endSeize();
            }}
            aria-label="Sound the 2600 hertz tone"
            className={`flex-1 touch-none select-none rounded-sm border py-2 text-xs uppercase tracking-widest transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
              seizing
                ? "border-signals bg-signals text-bg"
                : "border-border text-text-muted hover:border-signals hover:text-signals"
            }`}
          >
            2600 hz
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
            className="w-20 accent-accent"
          />
        </div>
      </div>

      {/* Caption, in the operator's voice */}
      <p
        key={caption}
        className="mt-4 min-h-[2.5rem] animate-fade-in text-center text-xs leading-relaxed text-accent motion-reduce:animate-none"
        aria-live="polite"
      >
        {caption}
      </p>

      <p className="mt-1 text-center text-[0.6rem] uppercase tracking-widest text-text-muted">
        hold a key to hear its tone
      </p>

      {/* Elegy */}
      <p className="mx-auto mt-10 max-w-xs text-center font-body text-sm leading-relaxed text-text-muted">
        In 1999 there were roughly two million payphones across the United States.
        Most are gone now. New York City pulled its last public sidewalk payphone
        in 2022. This one still works.
      </p>
    </div>
  );
}
