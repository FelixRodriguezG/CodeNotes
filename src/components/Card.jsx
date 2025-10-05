import React from "react";
import {
  DocumentTextIcon,
  CodeBracketIcon,
  TagIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

export default function Card({ icon: Icon, content, className = "" }) {
  return (
    <div
      className={`flex flex-col gap-1.5 w-full  md:max-w-2xs h-full items-start md:gap-4 p-6 bg-elevated rounded-lg ${className}`}
      role="article"
    >
      {Icon && <Icon className="w-3 h-3 text-primary-500" aria-hidden="true" />}
      <p className="text-muted text-lg">{content}</p>
    </div>
  );
}
