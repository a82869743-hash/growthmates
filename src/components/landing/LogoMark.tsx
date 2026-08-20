import React from "react";

interface LogoMarkProps {
  size?: "small" | "default" | "large";
  variant?: "full" | "icon" | "stacked";
  /** Use "dark" when placed on a dark background (e.g. footer) */
  onBackground?: "light" | "dark";
  className?: string;
  showSubtitle?: boolean;
}

export const SignalPulseIcon: React.FC<{ size?: number; color?: string; className?: string }> = ({
  size = 36,
  color = "#2E5EFF",
  className = "",
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 overflow-visible ${className}`}
    >
      {/* 1. Origin Open Ring */}
      <circle cx="20" cy="90" r="8" fill="none" stroke={color} strokeWidth="6" />

      {/* 2. Signal Pulse Geometric Ascending Path */}
      <path
        d="M 26 84 L 44 48 L 62 64 L 80 34 L 94 42 L 108 18"
        stroke={color}
        strokeWidth="6.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 3. Terminal Solid Target Dot */}
      <circle cx="108" cy="18" r="11" fill={color} />
    </svg>
  );
};

const LogoMark = ({
  size = "default",
  variant = "full",
  onBackground = "light",
  className = "",
  showSubtitle = false,
}: LogoMarkProps) => {
  const isDark = onBackground === "dark";
  const primaryText = isDark ? "text-white" : "text-[#14171F]";
  const accentBlue = "#2E5EFF";

  const sizeConfigs = {
    small: {
      iconSize: 26,
      textClass: "text-lg tracking-tight",
      subClass: "text-[10px]",
      gap: "gap-2",
    },
    default: {
      iconSize: 34,
      textClass: "text-2xl tracking-tight",
      subClass: "text-xs",
      gap: "gap-2.5",
    },
    large: {
      iconSize: 48,
      textClass: "text-3xl sm:text-4xl tracking-tight",
      subClass: "text-sm",
      gap: "gap-3.5",
    },
  };

  const currentSize = sizeConfigs[size];

  if (variant === "icon") {
    return <SignalPulseIcon size={currentSize.iconSize} color={accentBlue} className={className} />;
  }

  if (variant === "stacked") {
    return (
      <div className={`inline-flex flex-col items-center text-center ${className}`}>
        <SignalPulseIcon size={currentSize.iconSize * 1.6} color={accentBlue} className="mb-2" />
        <div className={`font-display font-extrabold ${currentSize.textClass} leading-none`}>
          <span className={primaryText}>Growth</span>
          <span className="text-[#2E5EFF]">mates</span>
        </div>
        {showSubtitle && (
          <span className={`mt-1.5 font-medium ${isDark ? "text-white/60" : "text-[#71717A]"} ${currentSize.subClass}`}>
            Signal pulse mark
          </span>
        )}
      </div>
    );
  }

  // Full Horizontal Brand Combo
  return (
    <div className={`inline-flex items-center ${currentSize.gap} select-none ${className}`}>
      <SignalPulseIcon size={currentSize.iconSize} color={accentBlue} />
      <div className="flex flex-col leading-none">
        <div className={`font-display font-extrabold ${currentSize.textClass}`}>
          <span className={primaryText}>Growth</span>
          <span className="text-[#2E5EFF]">mates</span>
        </div>
        {showSubtitle && (
          <span className={`mt-0.5 font-medium ${isDark ? "text-white/60" : "text-[#71717A]"} ${currentSize.subClass}`}>
            Signal pulse mark
          </span>
        )}
      </div>
    </div>
  );
};

export default LogoMark;
