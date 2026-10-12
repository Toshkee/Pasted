import { ButtonLink, Eyebrow } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[100svh] items-center bg-ink pt-24" aria-labelledby="nf-title">
      <div className="wrap">
        <Eyebrow index="404" className="mb-10">
          Not found
        </Eyebrow>
        <h1 id="nf-title" className="display-xl max-w-[14ch] text-bone">
          Some markets are closed. <em className="text-copper-2">This one doesn’t exist.</em>
        </h1>
        <p className="lede mt-8 max-w-md text-bone-2">The page you were looking for has moved, or was never here.</p>
        <div className="mt-12 flex flex-wrap gap-3">
          <ButtonLink href="/" variant="solid" size="lg">
            Back to the house
          </ButtonLink>
          <ButtonLink href="/work" variant="outline" size="lg">
            See the work
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
