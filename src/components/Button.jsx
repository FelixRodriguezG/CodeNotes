import React from "react";

const sizeToClass = {
  sm: "btn--sm",
  md: "btn--md",
  lg: "btn--lg",
};

export default function Button({
  children,
  type = "button",
  variant = "primary", // primary | success | warning | danger | outline | ghost
  size = "md",        // sm | md | lg
  disabled = false,
  isLoading = false,
  className = "",
  ...props
}) {
  const classes = [
    "btn",
    `btn-${variant}`,
    sizeToClass[size] || "",
    isLoading ? "cursor-wait" : "cursor-pointer",
    className,
  ]
    .filter(Boolean) // filtra valores vacios (ejemplo size="")
    .join(" ");

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      className={classes}
      {...props}
    >
      {isLoading && (
        <span className="inline-block w-4 h-4 border-2 border-current border-r-transparent rounded-full animate-spin" />
      )}
      <span>{children}</span>
    </button>
  );
}