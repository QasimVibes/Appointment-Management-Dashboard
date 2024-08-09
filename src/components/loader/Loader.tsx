import React from "react";

export default function Loader({ className = "" }) {
  return (
    <div
      className={`w-5 h-5 border-lightgray animate-spin rounded-full border-4 border-t-quaternary ${className}`}
    />
  );
}
