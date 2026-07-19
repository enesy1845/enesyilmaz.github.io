import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type ContainerSize = "standard" | "wide" | "reading";

type ContainerProps<TElement extends ElementType> = {
  as?: TElement;
  children: ReactNode;
  size?: ContainerSize;
  className?: string;
} & Omit<ComponentPropsWithoutRef<TElement>, "as" | "children" | "className">;

const sizeClass: Record<ContainerSize, string> = {
  standard: "max-w-[var(--layout-max)]",
  wide: "max-w-[var(--layout-wide)]",
  reading: "max-w-[var(--layout-reading)]",
};

export function Container<TElement extends ElementType = "div">({
  as,
  children,
  className = "",
  size = "standard",
  ...props
}: ContainerProps<TElement>) {
  const Component = as ?? "div";

  return (
    <Component
      className={`mx-auto w-full px-[var(--layout-gutter)] ${sizeClass[size]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
