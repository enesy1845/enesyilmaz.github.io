type SkipLinkProps = {
  label: string;
};

export function SkipLink({ label }: SkipLinkProps) {
  return (
    <a
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-[var(--color-focus)] focus:px-4 focus:py-3 focus:text-black"
      href="#main-content"
    >
      {label}
    </a>
  );
}
