<script lang="ts">
const trackUrl =
  "https://res.cloudinary.com/dhhjogfy6//video/upload/q_auto/v1575831765/audio/rest.mp3";

let currentState = $state<"idle" | "playing" | "paused">("idle");
let duration = $state<number>(0);
let currentTime = $state<number>(0);
let seeking = $state<boolean>(false);

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
  `https://api.waveformr.com/render?url=${trackUrl}&type=bars${params}`;

let played = $derived(
  duration === 0 ? `0%` : `${(currentTime / duration) * 100}%`,
);

$effect(() => {
  audio.load();
});
</script>

<div class="rounded-lg bg-gray-12 p-4 shadow-2xl" style="--played: {played}">
  <audio
    src={trackUrl}
    bind:this={audio}
    bind:currentTime={currentTime}
    on:loadedmetadata={evt => {
      duration = evt.currentTarget.duration;
    }}
  />
  <div class="controls flex">
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
  <div class="waveforms relative w-full">
    <img alt="" src={waveformUrl(`&height=60&stroke=cbd5e1`)} class="h-full" />
    <img
      alt=""
      src={waveformUrl(`&stroke=linear-gradient(red, blue)&height=60`)}
      class="absolute left-0 top-0 h-auto w-full"
      style={`clip-path: polygon(0% 0%, var(--played) 0%, var(--played) 100%, 0% 100%)`}
    />

    <div class="scrubber absolute top-0 h-full w-full">
      <input
        class="h-full w-full"
        data-plyr="seek"
        type="range"
        min="0"
        max={duration}
        step="1"
        value={seeking ? null : currentTime}
        autocomplete="off"
        role="slider"
        aria-label="Seek"
        aria-valuemin={0}
        aria-valuemax={duration}
        aria-valuenow={currentTime}
        aria-valuetext={`${currentTime} of ${duration}`}
        style="--value: 0%;"
        on:pointerdown={() => {
          seeking = true;
        }}
        on:change={evt => {
          audio.currentTime = evt.currentTarget.valueAsNumber;
          seeking = false;
          // audio.play();
        }}
      />
    </div>
  </div>
</div>
