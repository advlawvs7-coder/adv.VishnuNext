/** Original, scalable VS legal monogram. Inherits the active theme accent. */
export default function BrandMark({ compact = false, inverse = false, className = "" }) {
  return (
    <span className={`v9-brand ${compact ? "v9-brand-compact" : ""} ${inverse ? "v9-brand-inverse" : ""} ${className}`}>
      {/* <svg className="v9-brand-symbol" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="2" y="2" width="68" height="68" rx="19" stroke="currentColor" strokeWidth="1.5" />
        <path d="M13 22L26 49L36 29L46 49L59 22" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22 21H50M36 13V44M29 59H43" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M22 22L16 32H28L22 22ZM50 22L44 32H56L50 22Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M16 33C17 37 27 37 28 33M44 33C45 37 55 37 56 33" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg> */}
      <span className="v9-brand-wordmark">
        <span className="v9-brand-kicker">ADVOCATE DR.</span>
        <span className="v9-brand-name">VISHNU SHARMA</span>
        <span className="v9-brand-descriptor">LEGAL COUNSEL <span aria-hidden="true">·</span> NEW DELHI</span>
      </span>
    </span>
  );
}
