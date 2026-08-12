interface LogoMarkProps {
  size?: "default" | "small" | "large";
  variant?: "full" | "icon";
  /** Use "dark" when placed on a dark background (e.g. footer) */
  onBackground?: "light" | "dark";
  className?: string;
}

const LogoMark = ({ size = "default", variant = "icon", onBackground = "light", className = "" }: LogoMarkProps) => {
  const scales = {
    small: 28,
    default: 36,
    large: 48,
  };

  const dimension = scales[size];
  const isDark = onBackground === "dark";

  const accentColor = isDark ? "#FF8A5C" : "#E8622E";
  const primaryColor = isDark ? "#F2F1EE" : "#14181F";

  return (
    <div className={`inline-flex items-center gap-2 shrink-0 ${className}`}>
      {/* Pure D-BST Industrial Engineering Icon Mark */}
      <svg
        width={dimension}
        height={dimension}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* Technical Node Frame */}
        <rect x="2" y="2" width="36" height="36" rx="6" fill={isDark ? "#1E2430" : "#FFF1ED"} stroke={accentColor} strokeWidth="1.5" />
        
        {/* Geometric DBST Intersection Nodes */}
        <path d="M12 12H20C23.3137 12 26 14.6863 26 18C26 21.3137 23.3137 24 20 24H12V12Z" fill={primaryColor} />
        <path d="M12 24H22C25.3137 24 28 26.6863 28 30C28 33.3137 25.3137 36 22 36H12V24Z" fill={accentColor} />
        
        {/* Precision Laser Scanning Accent Dot */}
        <circle cx="28" cy="12" r="3" fill={accentColor} />
      </svg>

      {variant === "full" && (
        <div className="flex flex-col text-left">
          <span className={`font-display font-bold text-lg leading-none tracking-tight ${isDark ? "text-white" : "text-fg-default"}`}>
            D-BST <span style={{ color: accentColor }}>Solutions</span>
          </span>
          <span className={`text-[9px] font-mono uppercase tracking-widest mt-1 ${isDark ? "text-zinc-400" : "text-fg-dim"}`}>
            Precision Engineering
          </span>
        </div>
      )}
    </div>
  );
};

export default LogoMark;
