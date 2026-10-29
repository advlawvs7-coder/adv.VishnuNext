export default function Loading() {
  return (
    <main
      className="min-h-[60vh] bg-[var(--theme-tint)]"
      role="status"
      aria-label="Loading page"
    >
      <div className="h-36 animate-pulse bg-gradient-to-r from-[var(--theme-dark)] to-[var(--theme-primary)] md:h-52" />
      <div className="container-site space-y-5 py-14">
        <div className="h-9 w-2/5 animate-pulse rounded-xl bg-[var(--theme-border)]" />
        <div className="h-5 w-4/5 animate-pulse rounded-lg bg-[var(--theme-border)]" />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-48 animate-pulse rounded-2xl bg-[var(--theme-border)]"
            />
          ))}
        </div>
        <p className="text-sm text-[var(--theme-muted)]">
          Loading selected page…
        </p>
      </div>
    </main>
  );
}
