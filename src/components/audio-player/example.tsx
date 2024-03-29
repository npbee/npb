export function Example(props: {
  example: React.ReactNode;
  code: React.ReactNode;
}) {
  return (
    <div className="">
      <span className="text-gray-500 mb-1 block text-sm font-semibold">
        Example:
      </span>
      <div className="full-bleed">
        <div className="mx-auto max-w-5xl px-8">{props.example}</div>
      </div>
      <CodeDetails>{props.code}</CodeDetails>
    </div>
  );
}

export function CodeDetails(props: { children: React.ReactNode }) {
  return (
    <details className="my-2 space-y-2 [&>pre]:my-0 [&>pre]:text-sm">
      <summary className="not-prose text-gray-500 cursor-pointer text-sm font-semibold">
        Code
      </summary>
      {props.children}
    </details>
  );
}
