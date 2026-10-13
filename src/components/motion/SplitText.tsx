import { Fragment, type CSSProperties, type ElementType } from "react";

type Seg = { text: string; accent: boolean };

/** Splits a line into words; each word is a list of segments so "*inevitable*." keeps its plain period. */
function tokenize(line: string, startAccent: boolean): { words: Seg[][]; accent: boolean } {
  const words: Seg[][] = [];
  let current: Seg[] = [];
  let buffer = "";
  let accent = startAccent;
  const flush = () => {
    if (buffer) current.push({ text: buffer, accent });
    buffer = "";
  };
  for (const ch of line) {
    if (ch === "*") {
      flush();
      accent = !accent;
    } else if (ch === " ") {
      flush();
      if (current.length) words.push(current);
      current = [];
    } else {
      buffer += ch;
    }
  }
  flush();
  if (current.length) words.push(current);
  return { words, accent };
}

type Props = {
  /** Text to split. Wrap words in *asterisks* for the accent colour; use `\n` for a forced line break. */
  text: string;
  as?: ElementType;
  className?: string;
  /** Delay before the first word, in ms. */
  delay?: number;
  accentClassName?: string;
  id?: string;
  /** "auto" animates on first paint (use above the fold); default waits until scrolled into view. */
  trigger?: "inview" | "auto";
};

/**
 * Server-rendered masked word reveal. Each word sits in a clipping span and rises into place when the
 * RevealObserver marks the element as in view. Assistive tech reads one visually hidden plain sentence.
 */
export function SplitText({ text, as: Tag = "span", className, delay = 0, accentClassName = "text-copper-2", id, trigger = "inview" }: Props) {
  const plain = text.replace(/\*/g, "").replace(/\n/g, " ");

  // Tokenize once, up front: lines → words → segments, each word carrying its stagger index.
  const lines: { segs: Seg[]; i: number }[][] = [];
  let accent = false;
  let counter = 0;
  for (const line of text.split("\n")) {
    const result = tokenize(line, accent);
    accent = result.accent;
    lines.push(result.words.map((segs) => ({ segs, i: counter++ })));
  }

  return (
    <Tag id={id} className={className} data-split={trigger === "auto" ? "auto" : ""} style={{ "--d": delay } as CSSProperties}>
      <span className="sr-only">{plain}</span>
      {lines.map((words, li) => (
        <Fragment key={li}>
          {li > 0 && <br />}
          {words.map(({ segs, i }, wi) => (
            <Fragment key={wi}>
              <span className="split-word" aria-hidden="true">
                <span style={{ "--i": i } as CSSProperties}>
                  {segs.map((s, si) =>
                    s.accent ? (
                      <span key={si} className={accentClassName}>
                        {s.text}
                      </span>
                    ) : (
                      <Fragment key={si}>{s.text}</Fragment>
                    ),
                  )}
                </span>
              </span>
              {wi < words.length - 1 ? " " : null}
            </Fragment>
          ))}
        </Fragment>
      ))}
    </Tag>
  );
}
