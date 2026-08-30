"use client";

import { useState, useRef, useEffect, Dispatch, SetStateAction } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Option {
  value: any;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: any;
  placeholder?: string;
  className?: string;
}

export function CustomSelect({
  options,
  value,
  onChange,
  placeholder = "انتخاب کنید...",
  className = "",
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-[#171717] border border-white/5 rounded-xl px-4 py-2.5 text-[#F5F5F5] flex items-center justify-between hover:border-white/10 transition text-sm"
      >
        <span className="truncate">{selectedOption?.label || placeholder}</span>
        {isOpen ? (
          <ChevronUp size={16} className="text-gray-400 shrink-0" />
        ) : (
          <ChevronDown size={16} className="text-gray-400 shrink-0" />
        )}
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-[#171717] border border-white/5 rounded-xl overflow-hidden shadow-lg">
          {options.map((option) => (
            <button
              key={option.label}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`w-full text-right px-4 py-2.5 text-sm transition ${
                option.value === value
                  ? "bg-[#0A0A0A] text-[#F5F5F5]"
                  : "text-gray-400 hover:text-[#F5F5F5] hover:bg-white/5"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
