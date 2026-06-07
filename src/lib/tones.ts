// Frequency tables and a small Web Audio tone engine for the /2600 payphone.
// Every tone is synthesized live from sine oscillators. There are no audio
// files: the page produces the actual frequencies the phreaks used.
//
// The single primitive here is the sustained "voice" (one or more oscillators
// summed through a gain node). DTMF keys, the dial tone, and the 2600 Hz tone
// are all voices. V2 additions (blue box MF, red box coin tones, SIT) are meant
// to drop in as more voices without touching this structure.

export type DtmfKey =
  | "1" | "2" | "3"
  | "4" | "5" | "6"
  | "7" | "8" | "9"
  | "*" | "0" | "#";

// DTMF dual-tone pairs [low, high] in Hz.
export const DTMF_FREQUENCIES: Record<DtmfKey, [number, number]> = {
  "1": [697, 1209], "2": [697, 1336], "3": [697, 1477],
  "4": [770, 1209], "5": [770, 1336], "6": [770, 1477],
  "7": [852, 1209], "8": [852, 1336], "9": [852, 1477],
  "*": [941, 1209], "0": [941, 1336], "#": [941, 1477],
};

// US precise dial tone: two frequencies sounded together, continuously.
export const DIAL_TONE: [number, number] = [350, 440];

// The tone the whole site is named after.
export const SEIZE_FREQUENCY = 2600;

const ATTACK = 0.005; // seconds, ramp up so tones do not click on
const RELEASE = 0.04; // seconds, ramp down so tones do not click off
const MAX_GAIN = 0.3; // ceiling the volume slider maps into
const VOICE_LEVEL = 0.5; // per-voice gain; two summed oscillators stay under 1

type AudioContextConstructor = typeof AudioContext;

function getAudioContextCtor(): AudioContextConstructor | null {
  if (typeof window === "undefined") return null;
  const w = window as Window & { webkitAudioContext?: AudioContextConstructor };
  return window.AudioContext ?? w.webkitAudioContext ?? null;
}

interface Voice {
  oscs: OscillatorNode[];
  gain: GainNode;
}

export class ToneEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private voices = new Map<string, Voice>();
  private volume01 = 0.6;
  private muted = false;

  // Lazily create the AudioContext on first use. Must be called from a user
  // gesture handler so browser autoplay policy lets the context start.
  private ensure(): { ctx: AudioContext; master: GainNode } | null {
    if (this.ctx && this.master) {
      if (this.ctx.state === "suspended") void this.ctx.resume();
      return { ctx: this.ctx, master: this.master };
    }
    const Ctor = getAudioContextCtor();
    if (!Ctor) return null;
    const ctx = new Ctor();
    const master = ctx.createGain();
    master.gain.value = this.effectiveGain();
    master.connect(ctx.destination);
    this.ctx = ctx;
    this.master = master;
    if (ctx.state === "suspended") void ctx.resume();
    return { ctx, master };
  }

  private effectiveGain(): number {
    return this.muted ? 0 : this.volume01 * MAX_GAIN;
  }

  // Start (or replace) a named sustained voice.
  setSustained(name: string, freqs: number[]): void {
    const ready = this.ensure();
    if (!ready) return;
    const { ctx, master } = ready;
    this.clearSustained(name);

    const gain = ctx.createGain();
    gain.gain.value = 0;
    gain.connect(master);

    const oscs = freqs.map((f) => {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = f;
      osc.connect(gain);
      osc.start();
      return osc;
    });

    const now = ctx.currentTime;
    gain.gain.cancelScheduledValues(now);
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(VOICE_LEVEL, now + ATTACK);

    this.voices.set(name, { oscs, gain });
  }

  // Release and tear down a named voice.
  clearSustained(name: string): void {
    const voice = this.voices.get(name);
    this.voices.delete(name);
    if (!voice || !this.ctx) return;

    const now = this.ctx.currentTime;
    const { gain, oscs } = voice;
    gain.gain.cancelScheduledValues(now);
    gain.gain.setValueAtTime(gain.gain.value, now);
    gain.gain.linearRampToValueAtTime(0, now + RELEASE);
    oscs.forEach((osc) => osc.stop(now + RELEASE + 0.02));

    window.setTimeout(() => {
      try {
        gain.disconnect();
      } catch {
        // already disconnected, nothing to do
      }
    }, (RELEASE + 0.1) * 1000);
  }

  clearAll(): void {
    Array.from(this.voices.keys()).forEach((name) => this.clearSustained(name));
  }

  hasVoice(name: string): boolean {
    return this.voices.has(name);
  }

  // Slider value, 0 to 1.
  setVolume(v: number): void {
    this.volume01 = Math.max(0, Math.min(1, v));
    this.applyMasterGain();
  }

  setMuted(m: boolean): void {
    this.muted = m;
    this.applyMasterGain();
  }

  private applyMasterGain(): void {
    if (!this.master || !this.ctx) return;
    const now = this.ctx.currentTime;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.setValueAtTime(this.master.gain.value, now);
    this.master.gain.linearRampToValueAtTime(this.effectiveGain(), now + 0.02);
  }

  dispose(): void {
    this.clearAll();
    if (this.ctx) {
      void this.ctx.close();
      this.ctx = null;
      this.master = null;
    }
  }
}
