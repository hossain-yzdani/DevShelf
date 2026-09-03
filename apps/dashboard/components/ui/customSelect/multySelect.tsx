"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";

interface Option {
  value: any;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  value: any[];
  onChange: (value: any[]) => void;
  placeholder?: string;
  className?: string;
}

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder = "انتخاب کنید...",
  className = "",
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const toggleOption = (optionValue: any) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  const removeOption = (optionValue: any) => {
    onChange(value.filter((v) => v !== optionValue));
  };

  const selectedLabels = options
    .filter((opt) => value.includes(opt.value))
    .map((opt) => opt.label);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-[#171717] border border-white/5 rounded-xl px-4 py-2.5 text-[#F5F5F5] flex items-center justify-between hover:border-white/10 transition text-sm min-h-11"
      >
        <div className="flex flex-wrap items-center gap-1.5 flex-1">
          {selectedLabels.length > 0 ? (
            selectedLabels.map((label, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#0A0A0A] text-[#F5F5F5] rounded-lg text-xs"
              >
                {label}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    const opt = options.find((o) => o.label === label);
                    if (opt) removeOption(opt.value);
                  }}
                  className="hover:text-purple-300 transition"
                >
                  <X size={14} />
                </button>
              </span>
            ))
          ) : (
            <span className="text-gray-500">{placeholder}</span>
          )}
        </div>
        {isOpen ? (
          <ChevronUp size={16} className="text-gray-400 shrink-0 mr-2" />
        ) : (
          <ChevronDown size={16} className="text-gray-400 shrink-0 mr-2" />
        )}
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-[#171717] border border-white/5 rounded-xl overflow-hidden shadow-lg max-h-60 overflow-y-auto">
          {options.map((option) => {
            const isSelected = value.includes(option.value);
            return (
              <button
                key={option.label}
                type="button"
                onClick={() => toggleOption(option.value)}
                className={`w-full text-right px-4 py-2.5 text-sm transition flex items-center justify-between ${
                  isSelected
                    ? "bg-[#0A0A0A] text-[#F5F5F5]"
                    : "text-gray-400 hover:text-[#F5F5F5] hover:bg-white/5"
                }`}
              >
                <span>{option.label}</span>
                {isSelected && <span className="text-gray-400 text-xs">✓</span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}