import { useRef, useState } from "react";
import {
  AudioTime,
  Container,
  Controls,
  IconButton,
  LoadingSpinner,
  PauseIcon,
  PlayIcon,
  Scrubber,
  trackUrl,
  useLazyValue,
} from "./shared";
import invariant from "tiny-invariant";

export function Step6() {
  const ref = useRef<HTMLAudioElement>(null);
  const [state, setState] = useState<"idle" | "loading" | "playing" | "paused">(
    "idle",
  );
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [bufferedPercent, setBufferedPercent] = useState(0);
  const lazyState = useLazyValue(state, 100);

  function togglePlay() {
    const audioElement = ref.current;
    invariant(audioElement, "Expected audio element to be defined");

    if (audioElement.paused) {
      audioElement.play();
    } else {
      audioElement.pause();
    }

    if (state === "idle") {
      setState("loading");
    }
  }

  return (
    <Container>
      <Controls>
        <IconButton
          aria-label={
            lazyState === "loading"
              ? "Loading"
              : state === "playing"
              ? "Pause"
              : "Play"
          }
          onClick={togglePlay}
        >
          {lazyState === "loading" ? (
            <LoadingSpinner />
          ) : state === "playing" ? (
            <PauseIcon />
          ) : (
            <PlayIcon />
          )}
        </IconButton>
        <AudioTime currentTime={currentTime} duration={duration} />
      </Controls>
      <Scrubber
        min={0}
        max={duration}
        value={currentTime}
        onChange={(newTime) => {
          const audioElement = ref.current;
          invariant(audioElement, "Expected audio element to be defined");

          audioElement.currentTime = newTime;
        }}
      />
      <div
        style={{
          height: 8,
          background: "#ddd",
          width: bufferedPercent + "%",
          transition: "width 100ms",
        }}
      />
      <audio
        src={trackUrl}
        // This tells the browser not to preload anything for this track
        preload="none"
        ref={ref}
        onPlaying={() => {
          setState("playing");
        }}
        onPause={() => {
          setState("paused");
        }}
        onLoadedMetadata={(event) => {
          setDuration(event.currentTarget.duration);
        }}
        onTimeUpdate={(event) => {
          setCurrentTime(event.currentTarget.currentTime);
        }}
        onLoadedData={(event) => {
          const audio = event.currentTarget;
          invariant(audio, "Expected audio element to be defined");
          const bufferedSeconds = audio.buffered.end(audio.buffered.length - 1);
          const buffered = (bufferedSeconds / duration) * 100;
          setBufferedPercent(buffered);
        }}
        onProgress={(event) => {
          const audio = event.currentTarget;
          invariant(audio, "Expected audio element to be defined");
          const bufferedSeconds = audio.buffered.end(audio.buffered.length - 1);
          const buffered = (bufferedSeconds / duration) * 100;
          setBufferedPercent(buffered);
        }}
      />
    </Container>
  );
}
