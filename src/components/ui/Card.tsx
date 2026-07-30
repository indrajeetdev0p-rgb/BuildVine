import { forwardRef, type HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  border?: boolean;
  glow?: boolean;
}

const paddingStyles = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      hover = false,
      padding = "md",
      border = true,
      glow = false,
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`
          rounded-[var(--radius-lg)]
          bg-bg-secondary
          transition-all duration-200 ease-out
          ${border ? "border border-border-default" : ""}
          ${
            hover
              ? "hover:border-border-hover hover:-translate-y-0.5 hover:shadow-[var(--shadow-lg)] cursor-pointer"
              : ""
          }
          ${glow ? "hover:shadow-[var(--shadow-glow)]" : ""}
          ${paddingStyles[padding]}
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

/* ----------------------------------------------------------------
   Card Sub-components
   ---------------------------------------------------------------- */

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

function CardHeader({ className = "", children, ...props }: CardHeaderProps) {
  return (
    <div
      className={`flex items-center gap-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4";
  className?: string;
}

function CardTitle({
  as: Tag = "h3",
  className = "",
  children,
  ...props
}: CardTitleProps) {
  return (
    <Tag
      className={`font-heading text-lg font-bold tracking-tight text-text-primary ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}

interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  className?: string;
}

function CardDescription({
  className = "",
  children,
  ...props
}: CardDescriptionProps) {
  return (
    <p
      className={`text-sm text-text-secondary leading-relaxed ${className}`}
      {...props}
    >
      {children}
    </p>
  );
}

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

function CardFooter({ className = "", children, ...props }: CardFooterProps) {
  return (
    <div
      className={`flex items-center justify-between pt-4 border-t border-border-default ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export { Card, CardHeader, CardTitle, CardDescription, CardFooter };
export type { CardProps };
