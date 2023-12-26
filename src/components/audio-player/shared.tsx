import { useEffect, useId, useMemo, useRef, useState } from "react";

export const trackUrl =
  "https://res.cloudinary.com/dhhjogfy6//video/upload/q_auto/v1575831765/audio/rest.mp3";

export function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-900 flex flex-col rounded-lg p-4 shadow-2xl">
      {children}
    </div>
  );
}

export function PlayIcon() {
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

export function PauseIcon() {
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

// Thanks: https://github.com/SamHerbert/SVG-Loaders
export function LoadingSpinner() {
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

export function IconButton(props: React.ComponentPropsWithRef<"button">) {
  return (
    <button
      {...props}
      className={`text-gray-200 hover:text-gray-300 active:text-gray-400 focus-visible:ring-orange-600 rounded-full text-4xl focus-visible:outline-none focus-visible:ring-2`}
    />
  );
}

export function Heading(props: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="flex">
          <img
            alt="Artist image of The Air on Earth"
            src="/images/taoe.jpg"
            className="not-prose my-0 aspect-square w-10 rounded md:w-12"
          />
        </div>
        <div className="flex flex-col gap-1">
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-50 block text-lg font-medium no-underline hover:underline md:text-xl"
            href="https://open.spotify.com/track/5fqgN15DVKhH7TjUkvjVQD"
          >
            Rest
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 block text-xs no-underline hover:underline"
            href="https://open.spotify.com/artist/4beU4ZRfDapoH3orvpJthM"
          >
            The Air on Earth
          </a>
        </div>
      </div>
      {props.children}
    </div>
  );
}

export function useLazyValue(value: any, delay: number) {
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

export function formatTimecode(seconds: number) {
  const min = String(Math.floor(seconds / 60) % 60).padStart(2, "0");
  const sec = String(Math.floor(seconds) % 60).padStart(2, "0");

  return `${min}:${sec}`;
}

export function describeTime(seconds: number) {
  const min = Math.floor(seconds / 60) % 60;
  const sec = Math.floor(seconds) % 60;

  return `${min} minutes and ${sec} seconds`;
}

export function Controls(props: { children: React.ReactNode }) {
  return <div className="flex items-center gap-4">{props.children}</div>;
}

export function AudioTime(props: { currentTime: number; duration: number }) {
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

export function RangeInput(props: {
  value: number;
  max: number;
  min: number;
  onChange: (value: number) => void;
}) {
  const { value, max, min, onChange } = props;
  const [ariaValueNow, setAriaValueNow] = useState(value);
  const [stepValue, setStepValue] = useState(1);
  const ariaValueText = `Elapsed time ${describeTime(ariaValueNow)}`;
  const descriptionId = useId();

  return (
    <div>
      <p id={descriptionId} className="sr-only">
        Audio scrubber. Total time {describeTime(max)}
      </p>
      <input
        type="range"
        min={min}
        max={props.max}
        value={props.value}
        step={stepValue}
        aria-label="Seek"
        aria-describedby={descriptionId}
        aria-valuemax={max}
        aria-valuenow={ariaValueNow}
        aria-valuetext={ariaValueText}
        onKeyDown={(event) => {
          if (event.key === "Shift") {
            setStepValue(10);
          }
        }}
        onKeyUp={(event) => {
          if (event.key === "Shift") {
            setStepValue(1);
          }
        }}
        className="w-full"
        onChange={(event) => {
          const changeValue = event.target.valueAsNumber;
          onChange(changeValue);
          setAriaValueNow(changeValue);
        }}
      />
    </div>
  );
}
