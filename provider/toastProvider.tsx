"use client";
import React from "react";
import { Toaster } from "react-hot-toast";
export default function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        style: {
          background: "#282c34",
          color: "#fff",
          borderRadius: "5px",
          padding: "10px",
        },
      }}
    />
  );
}
