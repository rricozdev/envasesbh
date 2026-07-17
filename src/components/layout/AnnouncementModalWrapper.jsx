"use client";

import dynamic from "next/dynamic";

const AnnouncementModal = dynamic(
  () => import("../ui/AnnouncementModal").then((m) => ({ default: m.AnnouncementModal })),
  { ssr: false }
);

export default function AnnouncementModalWrapper({ endDate, children }) {
  return <AnnouncementModal endDate={endDate}>{children}</AnnouncementModal>;
}
