import { useEffect, useRef, useState, useTransition } from "react";
import { Slider, SliderThumb, SliderTrack } from "react-aria-components";
import styles from "./player.module.css";

export function AudioPlayer() {
  const ref = useRef<HTMLAudioElement>(null);
  const [state, setState] = useState<"idle" | "loading" | "playing" | "paused">("idle");
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  // Only show "loading" if it lasts long enough to notice
  const lazyState = useLazyValue(state, 100);

  function togglePlay() {
    const audioElement = ref.current;
    if (!audioElement) return;

    if (audioElement.paused) {
      audioElement.play();
    } else {
      audioElement.pause();
    }

    if (state === "idle") {
      setState("loading");
    }
  }

  // The metadata is sometimes cached by the browser and we don't get a
  // loadedmetadata event. Check once on mount to see if we have a duration
  useEffect(() => {
    const duration = ref.current?.duration;
    if (typeof duration === "number" && !Number.isNaN(duration)) {
      setDuration(duration);
    }
  }, []);

  const label =
    lazyState === "loading" ? "loading" : state === "playing" ? "pause" : "play";

  return (
    <div className={styles.player}>
      <div className={styles.top}>
        <div className={styles.track}>
          <a className={styles.title} href={trackLink} target="_blank" rel="noopener noreferrer">
            Rest
          </a>
          <a className={styles.artist} href={artistLink} target="_blank" rel="noopener noreferrer">
            the air on earth
          </a>
        </div>
        <div className={styles.controls}>
          <AudioTime currentTime={currentTime} duration={duration} />
          <button type="button" className={styles.play} onClick={togglePlay}>
            <span className={styles.mark} aria-hidden="true">
              {state === "playing" ? "❚❚" : "▶"}
            </span>
            {label}
          </button>
        </div>
      </div>
      <Scrubber
        min={0}
        max={duration}
        value={currentTime}
        onPlay={togglePlay}
        onChange={(newTime) => {
          const audioElement = ref.current;
          if (!audioElement) return;

          // Set both, so the scrubber doesn't jump back to the old position
          // when the audio element next reports its time
          setCurrentTime(newTime);
          audioElement.currentTime = newTime;
        }}
      />
      <audio
        src={trackUrl}
        // Nothing loads until the reader presses play
        preload="none"
        ref={ref}
        onPlaying={() => setState("playing")}
        onPause={() => setState("paused")}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
      />
    </div>
  );
}

function useLazyValue<T>(value: T, delay: number) {
  const [state, setState] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setState(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return state;
}

function Scrubber(props: {
  value: number;
  max: number;
  min: number;
  onChange: (value: number) => void;
  onPlay: () => void;
}) {
  const { onChange, value, min, max, onPlay } = props;
  const percentPlayed = max === 0 ? 0 : (value / max) * 100;
  const [hint, setHint] = useState<number | null>(null);
  const [, startTransition] = useTransition();
  const isLoaded = max > min;

  return (
    <div
      className={styles.scrubber}
      style={{ "--played": `${percentPlayed}%` } as React.CSSProperties}
      onMouseLeave={() => setHint(null)}
      onMouseMove={(evt) => {
        if (!isLoaded) return;
        const rect = evt.currentTarget.getBoundingClientRect();
        startTransition(() => {
          setHint(((evt.clientX - rect.left) / rect.width) * 100);
        });
      }}
    >
      <WaveformImg strokes={baseStrokes} clipStart="var(--played)" clipEnd="100%" />
      <div className={styles.layer}>
        <WaveformImg strokes={playedStrokes} clipStart="0%" clipEnd="var(--played)" />
      </div>
      {isLoaded ? (
        <Slider
          className={styles.slider}
          formatOptions={{ style: "unit", unit: "second" }}
          minValue={min}
          maxValue={max}
          value={value}
          aria-label="Seek"
          step={1}
          onChange={onChange}
        >
          <SliderTrack className={styles["track-area"]}>
            <SliderThumb className={styles.thumb} style={{ top: "50%" }} />
          </SliderTrack>
        </Slider>
      ) : (
        <button type="button" className={styles.start} aria-label="Play" onClick={onPlay} />
      )}
      {hint !== null && <div className={styles.hint} style={{ left: `${hint}%` }} />}
    </div>
  );
}

function AudioTime(props: { currentTime: number; duration: number }) {
  return (
    <div className={styles.time} aria-hidden={props.duration === 0}>
      {formatTimecode(props.currentTime)} / {formatTimecode(props.duration)}
    </div>
  );
}

// One image per theme; CSS shows the one matching the page's theme
function WaveformImg(props: {
  clipStart: string;
  clipEnd: string;
  strokes: { light: string; dark: string };
}) {
  const { clipStart, clipEnd, strokes } = props;
  const clipPath = `polygon(${clipStart} 0%, ${clipEnd} 0%, ${clipEnd} 100%, ${clipStart} 100%)`;

  return (
    <>
      <img
        alt=""
        className={styles.light}
        src={waveformUrl({ stroke: strokes.light })}
        style={{ clipPath }}
      />
      <img
        alt=""
        className={styles.dark}
        src={waveformUrl({ stroke: strokes.dark })}
        style={{ clipPath }}
      />
    </>
  );
}

function formatTimecode(seconds: number) {
  const min = String(Math.floor(seconds / 60) % 60).padStart(2, "0");
  const sec = String(Math.floor(seconds) % 60).padStart(2, "0");

  return `${min}:${sec}`;
}

// Waveforms are images, so their colors are fixed hex values per theme. The
// unplayed grey is a step past --dim, which vanishes on --ground-2.
const baseStrokes = { light: "B4B4AE", dark: "4A4B4A" };
const playedStrokes = { light: "1A1A19", dark: "E9E8E4" };

const trackUrl =
  "https://res.cloudinary.com/dhhjogfy6//video/upload/q_auto/v1575831765/audio/rest.mp3";
const trackLink = "https://open.spotify.com/track/5fqgN15DVKhH7TjUkvjVQD";
const artistLink = "https://open.spotify.com/artist/4beU4ZRfDapoH3orvpJthM";

function waveformUrl(params: { stroke: string }) {
  const url = new URL("https://waveformr.com/render");
  url.searchParams.set("url", trackUrl);
  url.searchParams.set("type", "bars");
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  return url.toString();
}
