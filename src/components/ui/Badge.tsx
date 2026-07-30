type BadgeVariant = "default" | "success" | "warning" | "danger" | "info" | "accent";
type BadgeSize = "sm" | "md";

interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  pulseDot?: boolean;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, { bg: string; text: string; dot: string }> = {
  default: {
    bg: "bg-bg-tertiary",
    text: "text-text-secondary",
    dot: "bg-text-secondary",
  },
  success: {
    bg: "bg-success-muted",
    text: "text-success",
    dot: "bg-success",
  },
  warning: {
    bg: "bg-warning-muted",
    text: "text-warning",
    dot: "bg-warning",
  },
  danger: {
    bg: "bg-danger-muted",
    text: "text-danger",
    dot: "bg-danger",
  },
  info: {
    bg: "bg-info-muted",
    text: "text-info",
    dot: "bg-info",
  },
  accent: {
    bg: "bg-accent-muted",
    text: "text-accent",
    dot: "bg-accent",
  },
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-[10px]",
  md: "px-3 py-1 text-xs",
};

export function Badge({
  variant = "default",
  size = "md",
  dot = false,
  pulseDot = false,
  children,
  className = "",
}: BadgeProps) {
  const styles = variantStyles[variant];

  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        font-mono font-semibold
        rounded-full
        ${styles.bg} ${styles.text}
        ${sizeStyles[size]}
        ${className}
      `}
    >
      {dot && (
        <span
          className={`
            h-1.5 w-1.5 rounded-full ${styles.dot}
            ${pulseDot ? "animate-pulse-glow" : ""}
          `}
        />
      )}
      {children}
    </span>
  );
}

export type { BadgeProps, BadgeVariant, BadgeSize };
