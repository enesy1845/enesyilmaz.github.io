import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "text";

type BaseButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

type ButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonLinkProps = BaseButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

const variantClass: Record<ButtonVariant, string> = {
  primary:
    "border-[var(--color-accent)] bg-[var(--color-accent)] text-[var(--color-accent-foreground)] hover:border-[var(--color-accent-hover)] hover:bg-[var(--color-accent-hover)]",
  secondary:
    "border-[var(--color-border-strong)] bg-[var(--color-surface-muted)] text-[var(--color-foreground)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent-hover)]",
  ghost:
    "border-[var(--color-border)] bg-transparent text-[var(--color-foreground-muted)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-foreground)]",
  text: "border-transparent bg-transparent px-0 text-[var(--color-accent)] hover:text-[var(--color-accent-hover)]",
};

const baseClass =
  "inline-flex min-h-11 items-center justify-center rounded-[var(--radius-pill)] border px-5 py-2.5 text-sm font-semibold no-underline transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]";

export function Button({
  children,
  className = "",
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${baseClass} ${variantClass[variant]} ${className}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  children,
  className = "",
  variant = "primary",
  href,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={`${baseClass} ${variantClass[variant]} ${className}`}
      href={href}
      {...props}
    >
      {children}
    </Link>
  );
}
