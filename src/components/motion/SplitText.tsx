import { Fragment, type CSSProperties, type ElementType } from "react";

type Seg = { text: string; italic: boolean };

/** Splits a line into words; each word is a list of segments so "*inevitable*." keeps its plain period. */
function tokenize(line: string, startItalic: boolean): { words: Seg[][]; italic: boolean } {
  const words: Seg[][] = [];
  let current: Seg[] = [];
  let buffer = "";
  let italic = startItalic;
  const flush = () => {
    if (buffer) current.push({ text: buffer, italic });
    buffer = "";
  };
  for (const ch of line) {
    if (ch === "*") {
      flush();
      italic = !italic;
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
  return { words, italic };
}

type Props = {
  /** Text to split. Wrap words in *asterisks* for italic; use `\n` for a forced line break. */
  text: string;
  as?: ElementType;
  className?: string;
  /** Delay before the first word, in ms. */
  delay?: number;
  italicClassName?: string;
  id?: string;
  /** "auto" animates on first paint (use above the fold); default waits until scrolled into view. */
  trigger?: "inview" | "auto";
};

/**
 * Server-rendered masked word reveal. Each word sits in a clipping span and rises into place when the
 * RevealObserver marks the element as in view. Assistive tech reads one visually hidden plain sentence.
 */
export function SplitText({ text, as: Tag = "span", className, delay = 0, italicClassName = "italic", id, trigger = "inview" }: Props) {
  const plain = text.replace(/\*/g, "").replace(/\n/g, " ");
  let index = 0;
  let italic = false;

  return (
    <Tag id={id} className={className} data-split={trigger === "auto" ? "auto" : ""} style={{ "--d": delay } as CSSProperties}>
      <span className="sr-only">{plain}</span>
      {text.split("\n").map((line, li) => {
        const result = tokenize(line, italic);
        italic = result.italic;
        return (
          <Fragment key={li}>
            {li > 0 && <br />}
            {result.words.map((segs, wi) => {
              const i = index++;
              return (
                <Fragment key={wi}>
                  <span className="split-word" aria-hidden="true">
                    <span style={{ "--i": i } as CSSProperties}>
                      {segs.map((s, si) =>
                        s.italic ? (
                          <em key={si} className={italicClassName}>
                            {s.text}
                          </em>
                        ) : (
                          <Fragment key={si}>{s.text}</Fragment>
                        ),
                      )}
                    </span>
                  </span>
                  {wi < result.words.length - 1 ? " " : null}
                </Fragment>
              );
            })}
          </Fragment>
        );
      })}
    </Tag>
  );
}
