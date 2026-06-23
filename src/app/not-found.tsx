import { Container } from "@/components/layout/Container";
import { LinkButton } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center gap-4 text-center">
      <p className="font-display text-display font-semibold text-gradient">404</p>
      <h1 className="font-display text-h2 font-semibold">This paddock is empty</h1>
      <p className="max-w-sm text-muted">
        The page you&apos;re looking for has wandered off. Let&apos;s get you back on the trail.
      </p>
      <div className="mt-2 flex gap-3">
        <LinkButton href="/">Back home</LinkButton>
        <LinkButton href="/breeds" variant="secondary">
          Explore breeds
        </LinkButton>
      </div>
    </Container>
  );
}
