// src/components/NotionXRenderer.tsx
"use client";

import dynamic from "next/dynamic";
import { NotionRenderer } from "react-notion-x";
import type { ExtendedRecordMap } from "notion-types";

// 3rd‑party components lazy‑loaded
const Code = dynamic(
  () => import("react-notion-x/build/third-party/code").then((m) => m.Code),
  { ssr: false }
);
const Collection = dynamic(
  () =>
    import("react-notion-x/build/third-party/collection").then(
      (m) => m.Collection
    ),
  { ssr: false }
);
const Equation = dynamic(
  () =>
    import("react-notion-x/build/third-party/equation").then(
      (m) => m.Equation
    ),
  { ssr: false }
);
const Modal = dynamic(
  () =>
    import("react-notion-x/build/third-party/modal").then((m) => m.Modal),
  { ssr: false }
);

export default function NotionXRenderer({
  recordMap,
}: {
  recordMap: ExtendedRecordMap;
}) {
  return (
    <NotionRenderer
      recordMap={recordMap}
      fullPage={false}
      darkMode={true}
      disableHeader={true}
      components={{ Code, Collection, Equation, Modal }}
    />
  );
}
