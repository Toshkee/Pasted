import { ViewTransition, type ReactNode } from "react";

/**
 * Wraps each page so route changes cross-fade with a soft rise (see `.page-enter` / `.page-exit` in
 * globals.css). Layout chrome (header, footer) stays put; only the page content transitions.
 */
export function Page({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}
