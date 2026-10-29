import Link from "next/link";
export default function NotFound() {
  return (
    <div className="grid min-h-[70vh] place-items-center bg-sand px-5 text-center">
      <div>
        <p className="kicker">404</p>
        <h1 className="mt-4 font-serif text-4xl">Page Not Found</h1>
        <p className="my-5 text-[var(--theme-muted)]">
          The page is unavailable or may have been removed.
        </p>
        <Link href="/" className="btn-dark">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
