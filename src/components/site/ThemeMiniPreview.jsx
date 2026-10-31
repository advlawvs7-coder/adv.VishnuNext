/** Minimal website preview: white canvas, outlined cards, and a single-accent CTA. */
export default function ThemeMiniPreview({ theme }) {
  const c = theme.primary;
  const gradient = `linear-gradient(115deg, color-mix(in srgb, ${c} 82%, #18202C), ${c}, color-mix(in srgb, ${c} 85%, white))`;
  return (
    <span className="block overflow-hidden rounded-xl border border-[#E1E5EA] bg-white">
      <span className="flex h-10 items-center justify-between border-b border-[#E1E5EA] px-3">
        <span className="inline-flex items-center gap-2 text-[9px] font-bold text-[#18202C]">
          <span
            className="grid h-5 w-5 place-items-center rounded-full border text-[9px]"
            style={{ borderColor: c, color: c }}
          >
            V
          </span>{" "}
          VISHNU SHARMA
        </span>
        <span className="flex gap-2">
          <span className="h-[3px] w-5 rounded bg-[#CCD1D8]" />
          <span className="h-[3px] w-5 rounded bg-[#CCD1D8]" />
          <span className="h-[3px] w-5 rounded" style={{ background: c }} />
        </span>
      </span>
      <span className="flex h-28 items-center justify-between gap-2 px-3">
        <span className="space-y-2">
          <span className="block h-2 w-24 rounded bg-[#18202C]" />
          <span className="block h-1 w-24 rounded bg-[#D6DAE0]" />
          <span className="block h-1 w-20 rounded bg-[#D6DAE0]" />
          <span
            className="block h-5 w-14 rounded"
            style={{ background: gradient }}
          />
        </span>
        <span className="flex h-16 w-16 items-center justify-center rounded-xl border border-[#E1E5EA] bg-white">
          <span className="text-2xl font-serif font-bold" style={{ color: c }}>
            VS
          </span>
        </span>
      </span>
      <span className="block h-1" style={{ background: gradient }} />
    </span>
  );
}
