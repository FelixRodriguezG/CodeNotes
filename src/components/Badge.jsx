// Badge.jsx
import React from "react";

// 1) Normaliza el texto del tag a una clave estable
function toKey(raw) {
  return String(raw)
    .trim()
    .toLowerCase()
    .normalize("NFD")                // quita acentos
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")            // espacios -> guion
    .replace(/[.+]/g, "");           // quita puntos, etc. (next.js -> nextjs)
}

// 2) Alias -> slug canónico que coincide con tus clases CSS
const ALIAS = {
  javascript: "js",
  js: "js",

  typescript: "ts",
  ts: "ts",

  "reactjs": "react",
  "react": "react",

  "nextjs": "next",
  "next": "next",

  "nodejs": "node",
  "node": "node",

  "postgres": "postgresql",
  "postgre-sql": "postgresql",
  "postgresql": "postgresql",

  "mongo": "mongodb",
  "mongodb": "mongodb",
  "mongo-db": "mongodb",

  bash: "shell",
  sh: "shell",
  zsh: "shell",

  a11y: "accessibility",
};

// 3) Slugs soportados (de tus clases .badge-*)
export const KNOWN = new Set([
  "js","ts","react","next","vue","svelte","angular","css","html",
  "node","express","mongodb","sql","mysql","postgresql","api","http",
  "auth","jwt","array","snippet","regex","git","github","docker",
  "linux","shell","testing","jest","cypress","ui","ux",
  "accessibility","seo","performance","security","default",
]);

export default function Badge({ children, className = "" }) {
  const key = toKey(children);
  const canonical = ALIAS[key] ?? key;                 // resuelve alias
  const slug = KNOWN.has(canonical) ? canonical : "default";

  const classes = ["badge-base", `badge-${slug}`, className]
    .filter(Boolean)
    .join(" ");

  return <span className={classes}>{children}</span>;
}
