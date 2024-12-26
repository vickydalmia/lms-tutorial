"use client";
import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import { useMemo } from "react";

import "react-quill-new/dist/quill.snow.css";

interface EditorProps {
  onChange: (value: string) => void;
  value: string;
}

export const Editor = ({ onChange, value }: EditorProps) => {
  const ReactQuill = useMemo(
    () =>
      dynamic(() => import("react-quill-new"), {
        ssr: false,
        loading: () => <Loader2 className="w-full flex justify-center items-center animate-spin" />,
      }),
    []
  );

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      className="bg-white"
    />
  );
};
