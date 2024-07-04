import React from "react";

export default function Button({
  text,
  onClick,
  className = "",
  ...props
}: any) {
  return (
    <>
      <button onClick={onClick} className={className} {...props}>
        {text}
      </button>
    </>
  );
}
