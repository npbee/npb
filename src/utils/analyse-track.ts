// Browser only: splits a recording into the home mark's two voices. Each is
// the loudness of one band over time: the low voice below LOW_HZ (kick,
// bass), the high voice above HIGH_HZ (hats, air), as RMS in `points`
// equal windows, scaled 0–1.
const LOW_HZ = 200;
const HIGH_HZ = 3000;

export type Analysis = { low: number[]; high: number[] };

export async function analyseTrack(url: string, points = 2048): Promise<Analysis> {
  const bytes = await (await fetch(url)).arrayBuffer();
  const decoded = await new OfflineAudioContext(1, 1, 44100).decodeAudioData(bytes);

  const band = async (type: BiquadFilterType, frequency: number) => {
    const ctx = new OfflineAudioContext(1, decoded.length, decoded.sampleRate);
    const source = new AudioBufferSourceNode(ctx, { buffer: decoded });
    // Two filters in series for a steeper edge between the voices
    const a = new BiquadFilterNode(ctx, { type, frequency });
    const b = new BiquadFilterNode(ctx, { type, frequency });
    source.connect(a).connect(b).connect(ctx.destination);
    source.start();
    return envelope((await ctx.startRendering()).getChannelData(0), points);
  };

  return { low: await band("lowpass", LOW_HZ), high: await band("highpass", HIGH_HZ) };
}

function envelope(samples: Float32Array, points: number) {
  const size = Math.floor(samples.length / points);
  const out = Array.from({ length: points }, (_, i) => {
    let sum = 0;
    for (let j = i * size; j < (i + 1) * size; j++) sum += samples[j] ** 2;
    return Math.sqrt(sum / size);
  });
  // Scaled to the 99th percentile, so one transient doesn't flatten the rest
  const ceiling = [...out].sort((a, b) => a - b)[Math.floor(points * 0.99)] || 1;
  return out.map((v) => Math.round(Math.min(1, v / ceiling) * 1000) / 1000);
}
