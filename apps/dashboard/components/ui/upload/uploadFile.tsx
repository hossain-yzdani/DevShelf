"use client";

import { useState, useRef } from "react";
import { Upload, X, File, Image, Loader2 } from "lucide-react";

interface FileUploadProps {
  type: "poster" | "file";
  onUploadComplete: (url: string) => void;
  onUploadError?: (error: string) => void;
  className?: string;
  accept?: string; 
  maxSize?: string;
}

const ACCEPT_MAP = {
  poster: "image/jpeg,image/png,image/webp",
  file: "application/pdf,video/mp4,video/webm,audio/mpeg,audio/mp3",
};

const MAX_SIZE_MAP = {
  poster: 5 * 1024 * 1024, // 5MB
  file: 256 * 1024 * 1024, // 256MB
};

export function FileUpload({
  type,
  onUploadComplete,
  onUploadError,
  className = "",
}: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (selectedFile: File) => {
    setIsUploading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const endpoint = type === "poster" ? "/uploads/poster" : "/uploads/file";
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "خطا در آپلود");
      }

      const data = await response.json();
      onUploadComplete(data.url);
    } catch (error: any) {
      onUploadError?.(error.message);
    } finally {
      setIsUploading(false);
      setProgress(0);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // بررسی حجم
    if (selectedFile.size > MAX_SIZE_MAP[type]) {
      onUploadError?.(
        `حجم فایل بیش از حد مجاز است (حداکثر ${MAX_SIZE_MAP[type] / 1024 / 1024}MB)`,
      );
      return;
    }

    setFile(selectedFile);

    // ایجاد پیش‌نمایش برای تصاویر
    if (type === "poster" && selectedFile.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }

    handleUpload(selectedFile);
  };

  const handleRemove = () => {
    setFile(null);
    setPreview(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const getIcon = () => {
    if (type === "poster") return <Image size={24} className="text-gray-500" />;
    return <File size={24} className="text-gray-500" />;
  };

  return (
    <div className={`w-full ${className}`}>
      {!file ? (
        <label
          className={`
          relative flex flex-col items-center justify-center w-full 
          h-32 border-2 border-dashed border-white/10 rounded-xl 
          bg-[#0A0A0A] hover:border-white/30 transition cursor-pointer
        `}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {getIcon()}
            <p className="text-sm text-gray-400 mt-2">
              <span className="font-medium">کلیک کنید</span> یا فایل را بکشید
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {type === "poster"
                ? "تصویر (JPEG, PNG, WEBP)"
                : "PDF, ویدیو, صدا"}
            </p>
          </div>
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            accept={ACCEPT_MAP[type]}
            onChange={handleFileChange}
          />
        </label>
      ) : (
        <div className="relative w-full h-32 rounded-xl border border-white/10 bg-[#0A0A0A] overflow-hidden">
          {isUploading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 z-10 gap-2">
              <Loader2 size={32} className="text-white animate-spin" />
              <span className="text-white text-sm">در حال آپلود...</span>
              <div className="w-48 h-1 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={preview}
              alt="پیش‌نمایش"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              <div className="flex flex-col items-center">
                <File size={24} className="text-gray-500" />
                <p className="text-gray-400 text-sm mt-1 max-w-50 truncate">
                  {file.name}
                </p>
                <p className="text-gray-500 text-xs">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
          )}

          <button
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1 rounded-full bg-black/70 hover:bg-red-500/80 transition z-20"
          >
            <X size={16} className="text-white" />
          </button>
        </div>
      )}
    </div>
  );
}
