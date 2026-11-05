import type { CSSProperties } from "react";

/**
 * The name rises into place letter by letter on first load. Pure CSS, so it is visible as soon as
 * the page paints rather than after the JavaScript arrives.
 */
export function AnimatedName({ text }: { text: string }) {
  let index = 0;
  return (
    <>
      <span className="sr-only">{text}</span>
      {text.split(" ").map((word, w) => (
        <span
          key={w}
          aria-hidden="true"
          className="mr-[0.25em] inline-block overflow-hidden pb-[0.08em] last:mr-0"
        >
          {Array.from(word).map((char, c) => (
            <span
              key={c}
              className="animate-rise inline-block"
              style={{ animationDelay: `${0.1 + index++ * 0.035}s` } as CSSProperties}
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </>
  );
}
