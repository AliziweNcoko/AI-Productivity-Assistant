interface Props {
  className?: string;
  size?: number;
}

export function CapacitiLogo({ className, size = 40 }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="CAPACITI logo"
    >
      <defs>
        <clipPath id="cap-circle">
          <circle cx="50" cy="50" r="46" />
        </clipPath>
      </defs>
      <g clipPath="url(#cap-circle)">
        <rect width="100" height="100" fill="#FFFFFF" />
        {/* Concentric hexagonal chevrons */}
        {[38, 28, 18, 8].map((r, i) => (
          <polygon
            key={i}
            points={hexPoints(50, 50, r)}
            fill="none"
            stroke={i === 1 ? "#FF3B4E" : "#1A2B4A"}
            strokeWidth="5"
          />
        ))}
        {/* Right-side red accent overlay */}
        <rect x="60" y="10" width="40" height="80" fill="#FF3B4E" opacity="0.0" />
      </g>
      <circle cx="50" cy="50" r="46" fill="none" stroke="transparent" />
    </svg>
  );
}

function hexPoints(cx: number, cy: number, r: number) {
  const pts: string[] = [];
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i - Math.PI / 2;
    pts.push(`${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`);
  }
  return pts.join(" ");
}
