"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, X } from "lucide-react";

interface MessageProps {
  type: "success" | "error";
  message: string;
  onClose: () => void;
  duration?: number;
}

export default function Message({
  type,
  message,
  onClose,
  duration = 3000,
}: MessageProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const isSuccess = type === "success";

  return (
    <div
      className={`
        fixed bottom-6 left-1/2 -translate-x-1/2 z-50
        flex items-center gap-3 px-5 py-3 rounded-xl
        glass border backdrop-blur-md
        ${
          isSuccess
            ? "border-green-500/30 text-green-400"
            : "border-red-500/30 text-red-400"
        }
        animate-in fade-in slide-in-from-bottom-4 duration-300
      `}
    >
      {isSuccess ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
      <span className="text-sm">{message}</span>
      <button onClick={onClose} className="ml-2 hover:opacity-70 transition">
        <X size={14} />
      </button>
    </div>
  );
}
