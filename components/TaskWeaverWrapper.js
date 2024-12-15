"use client";

import dynamic from "next/dynamic";

const TaskWeaver = dynamic(() => import("./TaskWeaver"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen flex items-center justify-center">
      <p>Loading...</p>
    </div>
  ),
});

export default function TaskWeaverWrapper() {
  return (
    <div className="w-full h-screen">
      <TaskWeaver />
    </div>
  );
}
