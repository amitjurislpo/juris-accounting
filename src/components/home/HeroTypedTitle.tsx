"use client";

import { useEffect, useState } from "react";

const LINE_1 = "Clarity behind";
const WORDS = ["every number.", "every record.", "every entry."];

const TYPE_MS = 70;
const ERASE_MS = 35;
const HOLD_MS = 2400;
const EMPTY_MS = 450;

/**
 * Hero headline: "Clarity behind" stays fixed while the second line types
 * itself out, holds, backspaces, and types the next phrase.
 * Starts fully written (SSR / no-JS / reduced-motion all see the first phrase).
 * The line sits in a grid cell sized by invisible copies of every phrase, so
 * typing never shifts the layout and the block stays centred as a unit.
 */
export function HeroTypedTitle() {
  const [word, setWord] = useState(0);
  const [count, setCount] = useState(WORDS[0].length);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let w = 0;
    let c = WORDS[0].length;
    let dir = -1;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      c += dir;
      let delay = dir < 0 ? ERASE_MS : TYPE_MS;
      if (c <= 0) {
        c = 0;
        w = (w + 1) % WORDS.length;
        dir = 1;
        delay = EMPTY_MS;
        setWord(w);
      } else if (c >= WORDS[w].length) {
        dir = -1;
        delay = HOLD_MS;
      }
      setCount(c);
      timer = setTimeout(tick, delay);
    };

    timer = setTimeout(tick, HOLD_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <span className="sr-only">
        {LINE_1} {WORDS[0]}
      </span>
      <span aria-hidden className="hero-title-word block">
        {LINE_1}
      </span>
      <span aria-hidden className="block font-serif text-[1.12em] font-normal italic leading-[0.9] tracking-[-0.02em]">
        <span className="inline-grid text-left">
          {WORDS.map((w) => (
            <span key={w} className="invisible col-start-1 row-start-1 pr-[0.04em]">
              {w}
            </span>
          ))}
          <span className="col-start-1 row-start-1">
            <span className="text-metal hero-title-glow pr-[0.04em]">{WORDS[word].slice(0, count)}</span>
            <span className="ml-[0.06em] inline-block h-[0.82em] w-[0.05em] translate-y-[0.06em] animate-pulse rounded-[1px] bg-signal align-baseline" />
          </span>
        </span>
      </span>
    </>
  );
}
