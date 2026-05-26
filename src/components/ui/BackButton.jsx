"use client";
import { useRouter } from "next/navigation";

export default function BackButton({ children, className }) {
  const router = useRouter();
  return (
    <button onClick={() => router.back()} className={className}>
      {children}
    </button>
  );
}
