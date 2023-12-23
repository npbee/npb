<script lang="ts">
const trackUrl =
  "https://res.cloudinary.com/dhhjogfy6//video/upload/q_auto/v1575831765/audio/rest.mp3";

let currentState = $state<"idle" | "playing" | "paused">("idle");
let duration = $state<number>(0);
let currentTime = $state<number>(0);
let seeking = $state<boolean>(false);
let seekHint = $state<number>(0);

let audio: HTMLAudioElement;

function togglePlay() {
  if (currentState === "playing") {
    audio.pause();
    currentState = "paused";
  } else {
    audio.play();
    currentState = "playing";
  }
}

const waveformUrl = (params: string) =>
  `http://localhost:8000/render?url=${trackUrl}&height=75&type=bars${params}`;
// `https://api.waveformr.com/render?url=${trackUrl}&type=bars${params}`;

let playedNum = $derived(duration === 0 ? 0 : currentTime / duration);
let played = $derived(`${playedNum * 100}%`);

function clipRect(opts: { start: string; end: string }) {
  const { start, end } = opts;
  return `polygon(${start} 0%, ${end} 0%, ${end} 100%, ${start} 100%)`;
}

function formatDuration(seconds: number) {
  const min = String(Math.floor(seconds / 60) % 60).padStart(2, "0");
  const sec = String(Math.floor(seconds) % 60).padStart(2, "0");

  return `${min}:${sec}`;
}

$effect(() => {
  audio.load();
});
</script>

<div
  class="flex flex-col gap-4 rounded-lg bg-gray-12 p-4 shadow-2xl"
  style="--played: {played}; --seek-hint: {seekHint * 100}%;"
>
  <audio
    src={trackUrl}
    bind:this={audio}
    bind:currentTime={currentTime}
    on:loadedmetadata={evt => {
      duration = evt.currentTarget.duration;
    }}
  />
  <div class="controls flex items-center justify-between">
    <div class="flex gap-4">
      <div class="flex items-center gap-3">
        <div>
          <img
            alt="Artist image of The Air on Earth"
            src="/images/taoe.jpg"
            class="aspect-square w-10 rounded md:w-12"
          />
        </div>
        <div class="flex flex-col gap-1">
          <a
            target="_blank"
            rel="noopener noreferrer"
            class="text-gray-50 block text-lg font-medium no-underline hover:underline md:text-xl"
            href="https://open.spotify.com/track/5fqgN15DVKhH7TjUkvjVQD"
          >
            Rest
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            class="text-gray-300 block text-xs no-underline hover:underline"
            href="https://open.spotify.com/artist/4beU4ZRfDapoH3orvpJthM"
          >
            The Air on Earth
          </a>
        </div>
      </div>
    </div>
    <div class="flex items-center gap-4">
      <div class="text-gray-300 flex gap-2 text-xs font-medium">
        <div>{formatDuration(currentTime)}</div>
        <span class="text-xs">/</span>
        <div>{formatDuration(duration)}</div>
      </div>
      <button class="text-4xl text-gray-1" on:click={togglePlay}>
        <svg
          class:hidden={currentState === "playing"}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-play-circle"
        >
          <circle cx="12" cy="12" r="10" />
          <polygon points="10 8 16 12 10 16 10 8" />
        </svg>

        <svg
          class:hidden={currentState !== "playing"}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-pause-circle"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="10" x2="10" y1="15" y2="9" />
          <line x1="14" x2="14" y1="15" y2="9" />
        </svg>
      </button>
    </div>
  </div>
  <div class="waveforms relative w-full">
    <img
      alt=""
      src={waveformUrl(`&stroke=c5c1bd`)}
      class="base h-full"
      style:clip-path={clipRect({ start: 'max(var(--played), var(--seek-hint))', end: '100%'})}
    />
    <img
      alt=""
      src={waveformUrl(`&stroke=linear-gradient(c74815,c62513)`)}
      class="played-fill absolute left-0 top-0 h-auto w-full"
      style:clip-path={seeking || seekHint === 0
        ? clipRect({start: '0%', end: 'var(--played)'}) 
        : clipRect({ start: '0%', end: 'min(var(--played), var(--seek-hint))' })}
    />
    <img
      alt=""
      src={waveformUrl(`&stroke=fe996c`)}
      class="seek-hint-fill absolute left-0 top-0 h-auto w-full"
      style:opacity={seeking || seekHint === 0 ? 0 : 1}
      style:clip-path={clipRect({ 
        start: 'min(var(--played), var(--seek-hint))', 
        end: 'max(var(--played), var(--seek-hint))'
      })}
    />

    <div
      class="scrubber [&:has(:focus-visible)>.playhead]:ring-blue-500 group absolute top-0 h-full w-full [&:has(:focus-visible)>.playhead]:ring-2"
      on:mouseleave={() => {
        seekHint = 0;
      }}
      on:mousemove={evt => {
          let rect = evt.currentTarget.getBoundingClientRect();
          seekHint = (evt.clientX - rect.left) / rect.width;
        }}
    >
      <div
        class="progress bg-orange-500 absolute h-full w-[2px] -translate-x-1/2 rounded opacity-0 group-hover:opacity-50"
        style={`left: var(--seek-hint)`}
        aria-hidden="true"
      />
      <div
        class="playhead bg-orange-500 group-focus-visible:ring-blue-500 absolute h-full w-[2px] -translate-x-1/2 rounded opacity-100 group-focus-visible:ring-2"
        style={`left: ${played}`}
        aria-hidden="true"
      />
      <input
        class="bg-transparent h-full w-full cursor-pointer appearance-none opacity-0"
        data-plyr="seek"
        type="range"
        min="0"
        max={duration}
        step="1"
        value={currentTime}
        autocomplete="off"
        role="slider"
        aria-label="Seek"
        aria-valuemin={0}
        aria-valuemax={duration}
        aria-valuenow={currentTime}
        aria-valuetext={`${currentTime} of ${duration}`}
        on:pointermove={(evt) => {
          if (evt.buttons === 1) {
            seeking = true;
          }
        }}
        on:pointerup={() => {
          seeking = false;
        }}
        on:input={evt => {
          let hintVal = seekHint * duration;
          let num = evt.currentTarget.valueAsNumber;
          audio.currentTime = hintVal === 0 ? num : hintVal;
        }}
      />
    </div>
  </div>
</div>
