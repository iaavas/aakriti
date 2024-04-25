import dynamic from "next/dynamic";
export const DynamicCanvas = dynamic(
  () => import("@/app/components/canvas/Canvas"),
  {
    ssr: false,
  }
);
