import { cx } from '../../utils/helpers';

/** TechNova mark — a stylized gradient "N/peak" glyph. */
export default function Logo({ className }) {
  return (
    <span className={cx('inline-grid place-items-center', className)} aria-hidden="true">
      <svg viewBox="0 0 64 64" className="h-full w-full">
        <defs>
          <linearGradient id="logo-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#3563ff" />
            <stop offset="1" stopColor="#1fa298" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="16" fill="url(#logo-grad)" />
        <path
          d="M18 42 L32 18 L46 42 Z"
          fill="none"
          stroke="#fff"
          strokeWidth="4.5"
          strokeLinejoin="round"
        />
        <circle cx="32" cy="45" r="3.6" fill="#fff" />
      </svg>
    </span>
  );
}
