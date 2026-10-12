import wordmark from "@/assets/logo/wordmark.json";
import emblem from "@/assets/logo/emblem.json";

type Props = { className?: string; title?: string };

/** The PASTED wordmark, traced from the studio's master artwork. Inherits `color`. */
export function Wordmark({ className, title = "Pasted" }: Props) {
  return (
    <svg viewBox={wordmark.viewBox} className={className} role="img" aria-label={title} fill="currentColor">
      <path fillRule="evenodd" d={wordmark.d} />
    </svg>
  );
}

/** The oval P emblem. */
export function Emblem({ className, title = "Pasted emblem" }: Props) {
  return (
    <svg viewBox={emblem.viewBox} className={className} role="img" aria-label={title} fill="currentColor">
      <path fillRule="evenodd" d={emblem.d} />
    </svg>
  );
}
