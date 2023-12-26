import { useRef, useState } from "react";
import { Container, IconButton, PauseIcon, PlayIcon, trackUrl } from "./shared";
import invariant from "tiny-invariant";

export function Step2() {
  const ref = useRef<HTMLAudioElement>(null);
  const [state, setState] = useState<"loading" | "playing" | "paused">(
    "paused",
  );

  function togglePlay() {
    const audioElement = ref.current;
    invariant(audioElement, "Expected audio element to be defined");

    if (audioElement.paused) {
      audioElement.play();
    } else {
      audioElement.pause();
    }
  }

  return (
    <Container>
      <IconButton
        aria-label={state === "playing" ? "Pause" : "Play"}
        onClick={togglePlay}
      >
        {state === "playing" ? <PauseIcon /> : <PlayIcon />}
      </IconButton>
      <audio
        src={trackUrl}
        preload="none"
        ref={ref}
        onPlay={() => {
          setState("playing");
        }}
        onPause={() => {
          setState("paused");
        }}
      />
    </Container>
  );
}
