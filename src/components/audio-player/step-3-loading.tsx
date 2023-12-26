import { useRef, useState } from "react";
import {
  Container,
  IconButton,
  LoadingSpinner,
  PauseIcon,
  PlayIcon,
  trackUrl,
  useLazyValue,
} from "./shared";
import invariant from "tiny-invariant";

export function Step3() {
  const ref = useRef<HTMLAudioElement>(null);
  const [state, setState] = useState<"idle" | "loading" | "playing" | "paused">(
    "idle",
  );
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
      />
    </Container>
  );
}
