"use client";
import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import { useMemo } from "react";

import "react-quill-new/dist/quill.snow.css";

interface PreviewProps {
  value: string;
}

export const Preview = ({ value }: PreviewProps) => {
  const ReactQuill = useMemo(
    () =>
      dynamic(() => import("react-quill-new"), {
        ssr: false,
        loading: () => (
          <Loader2 className="w-full flex items-center justify-center animate-spin" />
        ),
      }),
    []
  );

  return <ReactQuill theme="bubble" value={value} readOnly />;
};
