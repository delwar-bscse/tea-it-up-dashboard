/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldError, UseFormRegister } from "react-hook-form";

type TextareaFieldProps = {
  name: string;
  title: string;
  placeholder?: string;
  type?: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  rows?: number;
};

const TextareaField = ({
  title,
  name,
  placeholder,
  register,
  error,
  rows = 4,
}: TextareaFieldProps) => {
  return (
    <div className="space-y-3">
      <label className="block text-[11px] font-bold tracking-[0.1em] text-[#9CA3AF] uppercase">{title}</label>
      <div className="relative group">
        <textarea
          {...register(name)}
          placeholder={placeholder}
          className={`w-full bg-gray-50 border-2 rounded-lg py-3 px-6 text-[14px] text-gray-600 placeholder:text-gray-400 outline-none transition-all focus:border-[#0B3B0B]/10 focus:bg-white
        ${error
              ? "border-red-400 focus:ring-red-100 bg-red-50/30"
              : "border-transparent focus:ring-gray-200"
            }`}
          rows={rows}
        />

        {error && (
          <p className="text-sm font-medium text-red-500 mt-2 px-1">
            {error.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default TextareaField;