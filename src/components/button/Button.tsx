import React from "react";
import { ButtonProps } from "@/types/types";
import Loader from "../loader/Loader";

export default function Button({
  text,
  onClick,
  className = "",
  children,
  isLoading = false,
  ...props
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${
        isLoading ? "cursor-not-allowed flex items-center justify-center" : ""
      } ${className}`}
      {...props}
      disabled={isLoading}
    >
      {isLoading && <Loader className="mr-2" />}
      {children || text}
    </button>
  );
}
