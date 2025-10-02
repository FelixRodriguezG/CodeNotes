import React from "react";
import Spinner from "./Spinner";

const sizeToClass = {
  sm: "px-2 py-1 text-sm rounded-[var(--radius-sm)]",
  md: "px-3 py-2 text-base rounded-[var(--radius-md)]",
  lg: "px-4 py-3 text-lg rounded-[var(--radius-lg)]",
};

export default function Button({
  children,
  type = "button",
  variant = "primary", // primary | success | warning | danger | outline | ghost | secondary
  size = "md",         // sm | md | lg
  disabled = false,
  isLoading = false,
  className = "",
  ...props
}) {
  const classes = [
    "btn",                 // base
    `btn-${variant}`,      // variante (ya definida en tu CSS)
    "inline-flex items-center justify-center gap-2 font-medium transition",
    sizeToClass[size] || "", 
    isLoading ? "cursor-wait" : "cursor-pointer",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    className,
  ]
    .filter(Boolean)
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
