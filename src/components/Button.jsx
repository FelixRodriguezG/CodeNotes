import React from "react";
import Spinner from "./Spinner"

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
    "flex gap-2",
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
      {isLoading && <Spinner />}
      <span>{children}</span>
    </button>
  );
}