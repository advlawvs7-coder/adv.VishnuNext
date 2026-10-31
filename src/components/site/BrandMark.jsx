/** Original, scalable VS legal monogram. Inherits the active theme accent. */
export default function BrandMark({ compact = false, inverse = false, className = "" }) {
  return (
    <span
      className={`v9-brand ${compact ? "v9-brand-compact" : ""} ${inverse ? "v9-brand-inverse" : ""} ${className}`}
    >
      <svg
        className="v9-brand-symbol"
        viewBox="0 0 72 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Premium Rounded Border */}
        <rect
          x="2"
          y="2"
          width="68"
          height="68"
          rx="18"
          stroke="currentColor"
          strokeWidth="1.5"
        />

        {/* Central Justice Pillar */}
        <path
          d="M36 14V54M23 22H49M31 56H41M26 61H46"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Top Crown */}
        <path d="M36 13L32 19H40L36 13Z" fill="currentColor" />

        {/* Center Detail */}
        <circle cx="36" cy="23" r="3" fill="currentColor" />

        {/* Balanced Scales */}
        <path
          d="M23 25L15 41H31L23 25ZM49 25L41 41H57L49 25Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />

        {/* Scale Bowls */}
        <path
          d="M15 43Q23 51 31 43M41 43Q49 51 57 43"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Suspension Details */}
        <path d="M23 25V22M49 25V22" stroke="currentColor" strokeWidth="1.7" />

        {/* Pillar Base Detail */}
        <path
          d="M32 52H40"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      <span className="v9-brand-wordmark">
        <span className="v9-brand-kicker">ADVOCATE</span>
        <span className="v9-brand-name">Dr.VISHNU SHARMA</span>
        <span className="v9-brand-descriptor">
          LEGAL COUNSEL <span aria-hidden="true">·</span> NEW DELHI
        </span>
      </span>
    </span>
  );
}
