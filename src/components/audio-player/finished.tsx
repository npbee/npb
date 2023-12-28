import { useEffect, useRef, useState, useTransition } from "react";
import invariant from "tiny-invariant";
import { Slider, SliderThumb, SliderTrack } from "react-aria-components";

export const trackUrl =
  "https://res.cloudinary.com/dhhjogfy6//video/upload/q_auto/v1575831765/audio/rest.mp3";

const waveformUrl = (params: string) =>
  `http://localhost:8000/render?url=${trackUrl}&type=bars&stroke-linecap=round${params}`;
// `https://api.waveformr.com/render?url=${trackUrl}&type=bars${params}`;
//

// TODO:
//  - Responsive with srcset
//  - Faster timeupdate ala svelte
//  - buffering?
export function Final() {
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

  useEffect(() => {
    const duration = ref.current?.duration;
    if (typeof duration === "number" && !Number.isNaN(duration)) {
      setDuration(duration);
    }
  }, []);

  return (
    <Container>
      <div className="flex gap-8">
        <div className="flex flex-1 flex-col justify-between gap-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
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
              <ArtistInfo />
            </div>
            <AudioTime currentTime={currentTime} duration={duration} />
          </div>
          <Scrubber
            min={0}
            max={duration}
            value={currentTime}
            onPlay={togglePlay}
            onChange={(newTime) => {
              const audioElement = ref.current;
              invariant(audioElement, "Expected audio element to be defined");

              // Need to set both the state and the audio element's currentTime
              // here so that the scrubber doesn't jump back to the previous
              // position when the audio element's time updates.
              setCurrentTime(newTime);
              audioElement.currentTime = newTime;
            }}
          />
        </div>
        <Artwork />
      </div>
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

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-900 flex flex-col rounded-lg p-4 shadow-2xl">
      {children}
    </div>
  );
}

function PlayIcon() {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-play-circle"
    >
      <circle cx="12" cy="12" r="10" />
      <polygon points="10 8 16 12 10 16 10 8" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-pause-circle"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="10" x2="10" y1="15" y2="9" />
      <line x1="14" x2="14" y1="15" y2="9" />
    </svg>
  );
}

function useLazyValue(value: any, delay: number) {
  const [state, setState] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setState(value);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
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
  const [hint, setHint] = useState(0);
  const [, startTransition] = useTransition();

  const isLoaded = max > min;

  return (
    <div
      className="relative"
      style={
        {
          "--seek-hint": `${hint}%`,
          "--played": `${percentPlayed}%`,
        } as React.CSSProperties
      }
      onMouseLeave={() => {
        setHint(0);
      }}
      onMouseMove={(evt) => {
        if (!isLoaded) return;

        let rect = evt.currentTarget.getBoundingClientRect();

        startTransition(() => {
          setHint(((evt.clientX - rect.left) / rect.width) * 100);
        });
      }}
    >
      <div className="absolute left-0 top-0 h-full w-full">
        <WaveformImg
          name="played"
          stroke="linear-gradient(E75318,c62513)"
          clipStart="0%"
          clipEnd="var(--played)"
        />
      </div>
      <div
        className="absolute left-0 top-0 h-full w-full"
        style={{ opacity: hint === 0 ? 0 : 1 }}
      >
        <WaveformImg
          name="seek-hint"
          stroke="linear-gradient(EC7546, ED5645)"
          clipStart="min(var(--played), var(--seek-hint))"
          clipEnd="max(var(--played), var(--seek-hint))"
        />
      </div>
      {isLoaded ? (
        <Slider
          className="absolute left-0 top-0 h-full w-full"
          formatOptions={{
            style: "unit",
            unit: "second",
          }}
          minValue={min}
          maxValue={max}
          value={value}
          aria-label="Seek"
          step={1}
          onChange={(val) => {
            onChange(val);
          }}
        >
          <SliderTrack className="bg-transparent relative h-full">
            <SliderThumb
              className="bg-blue-500 data-[focus-visible]:ring-blue-600 h-full w-[2px] rounded opacity-0 data-[focus-visible]:opacity-100"
              style={{
                top: "50%",
              }}
            />
          </SliderTrack>
        </Slider>
      ) : (
        // If we're not loaded yet, this is just a big button to start playing
        <button
          className="absolute left-0 top-0 flex h-full w-full focus:outline-none [&+div]:hover:opacity-50 [&+div]:focus-visible:opacity-50 [&+div]:active:opacity-[40]"
          onClick={onPlay}
        />
      )}
      <div className="pointer-events-none transition-opacity">
        <WaveformImg
          name="base"
          stroke="c5c1bd"
          clipStart="max(var(--played), var(--seek-hint))"
          clipEnd="100%"
        />
      </div>

      <div
        className="bg-blue-600 pointer-events-none absolute left-0 top-0 flex h-full w-[2px] items-center justify-between"
        style={{
          left: "var(--seek-hint)",
          opacity: hint === 0 ? 0 : 1,
        }}
      />
    </div>
  );
}

function AudioTime(props: { currentTime: number; duration: number }) {
  return (
    <div
      className="text-gray-200 flex gap-1 text-sm opacity-100 aria-hidden:opacity-0"
      aria-hidden={props.duration === 0}
    >
      <span>{formatTimecode(props.currentTime)}</span>
      <span>/</span>
      <span>{formatTimecode(props.duration)}</span>
    </div>
  );
}

function Artwork() {
  return (
    <div className="flex aspect-square  ">
      <img
        alt="Artist image of The Air on Earth"
        src="/images/taoe.jpg"
        className="not-prose aspect-square rounded"
      />
    </div>
  );
}

function WaveformImg(props: {
  name: string;
  clipStart: string;
  clipEnd: string;
  stroke: string;
  className?: string;
}) {
  const { name, clipStart, clipEnd, stroke } = props;
  const clipPath = `polygon(${clipStart} 0%, ${clipEnd} 0%, ${clipEnd} 100%, ${clipStart} 100%)`;

  return (
    <img
      alt=""
      src={waveformUrl(`&stroke=${stroke}`)}
      className={`not-prose ${name}`}
      style={{
        clipPath,
      }}
    />
  );
}

function IconButton(props: React.ComponentPropsWithRef<"button">) {
  return (
    <button
      {...props}
      className={`text-gray-200 hover:text-gray-300 active:text-gray-400 focus-visible:ring-orange-600 rounded-full text-4xl focus-visible:outline-none focus-visible:ring-2`}
    />
  );
}

// Thanks: https://github.com/SamHerbert/SVG-Loaders
function LoadingSpinner() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      aria-hidden="true"
      viewBox="0 0 38 38"
    >
      <defs>
        <linearGradient id="a" x1="8.042%" x2="65.682%" y1="0%" y2="23.865%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0"></stop>
          <stop offset="63.146%" stopColor="#fff" stopOpacity="0.631"></stop>
          <stop offset="100%" stopColor="#fff"></stop>
        </linearGradient>
      </defs>
      <g fill="none" fillRule="evenodd" transform="translate(1 1)">
        <path stroke="url(#a)" strokeWidth="2" d="M36 18c0-9.94-8.06-18-18-18">
          <animateTransform
            attributeName="transform"
            dur="0.9s"
            from="0 18 18"
            repeatCount="indefinite"
            to="360 18 18"
            type="rotate"
          ></animateTransform>
        </path>
        <circle cx="36" cy="18" r="1" fill="#fff">
          <animateTransform
            attributeName="transform"
            dur="0.9s"
            from="0 18 18"
            repeatCount="indefinite"
            to="360 18 18"
            type="rotate"
          ></animateTransform>
        </circle>
      </g>
    </svg>
  );
}

function ArtistInfo() {
  return (
    <div className="flex flex-col">
      <a
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-300 block text-xs leading-none no-underline hover:underline"
        href="https://open.spotify.com/artist/4beU4ZRfDapoH3orvpJthM"
      >
        The Air on Earth
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-50 block text-lg font-medium leading-none no-underline hover:underline md:text-xl md:leading-none"
        href="https://open.spotify.com/track/5fqgN15DVKhH7TjUkvjVQD"
      >
        Rest
      </a>
    </div>
  );
}

function formatTimecode(seconds: number) {
  const min = String(Math.floor(seconds / 60) % 60).padStart(2, "0");
  const sec = String(Math.floor(seconds) % 60).padStart(2, "0");

  return `${min}:${sec}`;
}
