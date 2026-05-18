"use client";

import { sendMessgeWassap } from "@/lib/sendMenssageWassap";

export default function Button({
  children,
  className,
  sendMessageWassap,
  number,
}) {
  const handleClick = () => {
    if (sendMessageWassap && number) {
      sendMessgeWassap(number, "Hola, me gustaría obtener más información.");
    }
  };

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  );
}
