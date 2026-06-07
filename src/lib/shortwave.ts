// Web Audio engine for the Numbers Station receiver. Everything is synthesized
// live, no audio files: looping shortwave static, and three "stations" you can
// tune onto, the Buzzer drone, a counting-station tone bed with blips, and a
// short looping motif. Kept separate from the payphone's tones.ts because the
// sound palette (noise, gated sawtooth, scheduled motif) is different.

type AudioContextConstructor = typeof AudioContext;

function getAudioContextCtor(): AudioContextConstructor | null {
  if (typeof window === "undefined") return null;
  const w = window as Window & { webkitAudioContext?: AudioContextConstructor };
  return window.AudioContext ?? w.webkitAudioContext ?? null;
}

export type StationId = "buzzer" | "counting" | "poacher";

export interface Station {
  id: StationId;
  name: string;
  pos: number; // dial position, 0 to 1
}

export const STATIONS: Station[] = [
  { id: "buzzer", name: "UVB-76 / the Buzzer", pos: 0.2 },
  { id: "counting", name: "five-figure counting station", pos: 0.52 },
  { id: "poacher", name: "the Lincolnshire Poacher", pos: 0.82 },
];

const LOCK = 0.06; // how close, in dial units, you must be to lock a station

export interface TuneResult {
  station: Station | null;
  freqKHz: number;
}

export function tuningToKHz(t: number): number {
  return Math.round(3000 + t * 27000); // a 3 to 30 MHz shortwave sweep
}

const MAX_GAIN = 0.35;

export class ShortwaveEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private staticGain: GainNode | null = null;
  private stationGain: GainNode | null = null;
  private stationNodes: AudioNode[] = [];
  private motifTimer: number | null = null;
  private current: StationId | null = null;
  private volume01 = 0.6;
  private muted = false;

  private effective(): number {
    return this.muted ? 0 : this.volume01 * MAX_GAIN;
  }

  // Must be called from a user gesture. Returns false if Web Audio is missing.
  // Call tune() afterward to set the initial station and gains.
  start(): boolean {
    const Ctor = getAudioContextCtor();
    if (!Ctor) return false;

    if (!this.ctx) {
      const ctx = new Ctor();
      const master = ctx.createGain();
      master.gain.value = this.effective();
      master.connect(ctx.destination);

      const staticGain = ctx.createGain();
      staticGain.gain.value = 0.5;
      staticGain.connect(master);

      const stationGain = ctx.createGain();
      stationGain.gain.value = 0;
      stationGain.connect(master);

      // Static: two seconds of looping white noise, high-passed into a hiss.
      const buffer = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;
      const hp = ctx.createBiquadFilter();
      hp.type = "highpass";
      hp.frequency.value = 1100;
      noise.connect(hp);
      hp.connect(staticGain);
      noise.start();

      this.ctx = ctx;
      this.master = master;
      this.staticGain = staticGain;
      this.stationGain = stationGain;
    }

    if (this.ctx.state === "suspended") void this.ctx.resume();
    return true;
  }

  private nearest(t: number): { station: Station; dist: number } {
    let best = STATIONS[0];
    let bestDist = Infinity;
    for (const s of STATIONS) {
      const d = Math.abs(t - s.pos);
      if (d < bestDist) {
        bestDist = d;
        best = s;
      }
    }
    return { station: best, dist: bestDist };
  }

  tune(t: number): TuneResult {
    if (!this.ctx || !this.staticGain || !this.stationGain) {
      return { station: null, freqKHz: tuningToKHz(t) };
    }
    const { station, dist } = this.nearest(t);
    const locked = dist <= LOCK ? station : null;

    if ((locked?.id ?? null) !== this.current) {
      this.teardownStation();
      if (locked) this.buildStation(locked.id);
      this.current = locked?.id ?? null;
    }

    const now = this.ctx.currentTime;
    const closeness = locked ? 1 - dist / LOCK : 0; // 1 at center, 0 at the edge
    const staticLevel = locked ? 0.05 + 0.45 * (1 - closeness) : 0.55;
    const stationLevel = locked ? 0.2 + 0.8 * closeness : 0;

    this.ramp(this.staticGain.gain, staticLevel, now);
    this.ramp(this.stationGain.gain, stationLevel, now);

    return { station: locked, freqKHz: tuningToKHz(t) };
  }

  private ramp(param: AudioParam, target: number, now: number): void {
    param.cancelScheduledValues(now);
    param.setValueAtTime(param.value, now);
    param.linearRampToValueAtTime(target, now + 0.08);
  }

  private buildStation(id: StationId): void {
    const ctx = this.ctx;
    const bus = this.stationGain;
    if (!ctx || !bus) return;

    if (id === "buzzer") {
      const osc = ctx.createOscillator();
      osc.type = "sawtooth";
      osc.frequency.value = 130;
      const lp = ctx.createBiquadFilter();
      lp.type = "lowpass";
      lp.frequency.value = 1600;
      const gate = ctx.createGain();
      gate.gain.value = 0.28;
      // Slow square LFO gates the buzz on and off, roughly the Buzzer cadence.
      const lfo = ctx.createOscillator();
      lfo.type = "square";
      lfo.frequency.value = 0.45;
      const lfoDepth = ctx.createGain();
      lfoDepth.gain.value = 0.28;
      lfo.connect(lfoDepth);
      lfoDepth.connect(gate.gain);
      osc.connect(lp);
      lp.connect(gate);
      gate.connect(bus);
      osc.start();
      lfo.start();
      this.stationNodes = [osc, lp, gate, lfo, lfoDepth];
    } else if (id === "counting") {
      // A low, steady carrier bed. The blips come from blip() per number group.
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = 210;
      const g = ctx.createGain();
      g.gain.value = 0.14;
      osc.connect(g);
      g.connect(bus);
      osc.start();
      this.stationNodes = [osc, g];
    } else {
      // poacher: a short motif looped every few seconds, plus a faint carrier.
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = 180;
      const g = ctx.createGain();
      g.gain.value = 0.06;
      osc.connect(g);
      g.connect(bus);
      osc.start();
      this.stationNodes = [osc, g];
      this.playMotif();
      this.motifTimer = window.setInterval(() => this.playMotif(), 3600);
    }
  }

  private playMotif(): void {
    const ctx = this.ctx;
    const bus = this.stationGain;
    if (!ctx || !bus) return;
    const notes = [659.25, 587.33, 493.88, 440.0, 493.88]; // a small, sad figure
    const t0 = ctx.currentTime + 0.05;
    notes.forEach((freq, i) => {
      const when = t0 + i * 0.42;
      const dur = 0.36;
      const osc = ctx.createOscillator();
      osc.type = "triangle";
      osc.frequency.value = freq;
      const g = ctx.createGain();
      g.gain.value = 0;
      osc.connect(g);
      g.connect(bus);
      g.gain.setValueAtTime(0, when);
      g.gain.linearRampToValueAtTime(0.5, when + 0.03);
      g.gain.linearRampToValueAtTime(0, when + dur);
      osc.start(when);
      osc.stop(when + dur + 0.05);
      osc.onended = () => {
        try {
          g.disconnect();
        } catch {
          // already gone
        }
      };
    });
  }

  // A short beep, fired by the component as each number group prints.
  blip(): void {
    const ctx = this.ctx;
    const bus = this.stationGain;
    if (!ctx || !bus) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = 1040;
    const g = ctx.createGain();
    g.gain.value = 0;
    osc.connect(g);
    g.connect(bus);
    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(0.5, now + 0.01);
    g.gain.linearRampToValueAtTime(0, now + 0.09);
    osc.start(now);
    osc.stop(now + 0.12);
    osc.onended = () => {
      try {
        g.disconnect();
      } catch {
        // already gone
      }
    };
  }

  private teardownStation(): void {
    if (this.motifTimer !== null) {
      window.clearInterval(this.motifTimer);
      this.motifTimer = null;
    }
    for (const node of this.stationNodes) {
      try {
        if ("stop" in node && typeof (node as OscillatorNode).stop === "function") {
          (node as OscillatorNode).stop();
        }
      } catch {
        // already stopped
      }
      try {
        node.disconnect();
      } catch {
        // already disconnected
      }
    }
    this.stationNodes = [];
  }

  setVolume(v: number): void {
    this.volume01 = Math.max(0, Math.min(1, v));
    this.applyMaster();
  }

  setMuted(m: boolean): void {
    this.muted = m;
    this.applyMaster();
  }

  private applyMaster(): void {
    if (!this.master || !this.ctx) return;
    const now = this.ctx.currentTime;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.setValueAtTime(this.master.gain.value, now);
    this.master.gain.linearRampToValueAtTime(this.effective(), now + 0.03);
  }

  dispose(): void {
    this.teardownStation();
    if (this.ctx) {
      void this.ctx.close();
      this.ctx = null;
      this.master = null;
      this.staticGain = null;
      this.stationGain = null;
    }
    this.current = null;
  }
}
