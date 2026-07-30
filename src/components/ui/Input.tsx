import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";

/* ----------------------------------------------------------------
   INPUT
   ---------------------------------------------------------------- */
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      hint,
      leftIcon,
      rightIcon,
      className = "",
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-text-secondary"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={`
              w-full rounded-[var(--radius-md)]
              bg-bg-tertiary border
              ${error ? "border-danger" : "border-border-default"}
              px-3 py-2.5
              ${leftIcon ? "pl-10" : ""}
              ${rightIcon ? "pr-10" : ""}
              text-sm text-text-primary
              placeholder:text-text-tertiary
              transition-all duration-200
              hover:border-border-hover
              focus:outline-none focus:border-[var(--border-focus)]
              focus:shadow-[0_0_0_3px_var(--accent-muted)]
              disabled:opacity-50 disabled:cursor-not-allowed
              ${className}
            `}
            {...props}
          />
          {rightIcon && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary">
              {rightIcon}
            </span>
          )}
        </div>
        {error && (
          <p className="text-xs text-danger font-medium">{error}</p>
        )}
        {hint && !error && (
          <p className="text-xs text-text-tertiary">{hint}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

/* ----------------------------------------------------------------
   TEXTAREA
   ---------------------------------------------------------------- */
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className = "", id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-text-secondary"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={`
            w-full rounded-[var(--radius-md)]
            bg-bg-tertiary border
            ${error ? "border-danger" : "border-border-default"}
            px-3 py-2.5
            text-sm text-text-primary
            placeholder:text-text-tertiary
            transition-all duration-200
            hover:border-border-hover
            focus:outline-none focus:border-[var(--border-focus)]
            focus:shadow-[0_0_0_3px_var(--accent-muted)]
            disabled:opacity-50 disabled:cursor-not-allowed
            resize-y min-h-[100px]
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="text-xs text-danger font-medium">{error}</p>
        )}
        {hint && !error && (
          <p className="text-xs text-text-tertiary">{hint}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Input, Textarea };
export type { InputProps, TextareaProps };
