"use client";

import { useEffect } from "react";

export default function ImageProtector() {
  useEffect(() => {
    const handler = (e) => {
      if (e.target.tagName === "IMG") {
        e.preventDefault();
      }
    };
    document.addEventListener("contextmenu", handler);
    return () => document.removeEventListener("contextmenu", handler);
  }, []);

  return null;
}
