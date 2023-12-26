import { useRef, useState } from "react";
import {
  AudioTime,
  Container,
  Controls,
  IconButton,
  LoadingSpinner,
  PauseIcon,
  PlayIcon,
  RangeInput,
  formatTimecode,
  trackUrl,
  useLazyValue,
} from "./shared";
import invariant from "tiny-invariant";

export function Step5() {
  const ref = useRef<HTMLAudioElement>(null);
  const [state, setState] = useState<"idle" | "loading" | "playing" | "paused">(
    "idle",
  );
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
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
      <RangeInput
        min={0}
        max={duration}
        value={currentTime}
        onChange={(newTime) => {
          const audioElement = ref.current;
          invariant(audioElement, "Expected audio element to be defined");

          audioElement.currentTime = newTime;
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
      />
    </Container>
  );
}
