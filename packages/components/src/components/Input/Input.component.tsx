import clsx from "clsx";
import React, {useEffect, useRef, useState} from "react";
import {Button} from "../Button/Button.component";
import {Loading} from "../Loading/Loading.component";
import {InputComponent, InputPickerProps, InputProps, InputWithButtonProps} from "./Input.types";


export const Input: InputComponent = ({label, error, className, loading, ...props}: InputProps) => {
  return (
    <div className="flex flex-col gap-1 w-full relative">
      {label && (
        <label className="text-sm text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      {
        loading ? <div className={"px-3 py-1 rounded-xl border border-gray-300 dark:border-gray-600"}><Loading size={16}/></div> :
          <input {...props}
                 className={clsx(
                   "placeholder-gray-400 dark:placeholder-gray-500",
                   "px-3 py-1 rounded-xl text-sm outline-none",
                   "bg-gray-100 dark:bg-gray-800 ",
                   "border border-gray-300 dark:border-gray-600",
                   "focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
                   error &&
                   "border-red-500 focus:ring-red-500 focus:border-red-500",
                   className
                 )}
          />
      }
      {error && (
        <div className="absolute right-0 top-9 w-50 h-8 bg-red-500 dark:bg-red-500 rounded-xl shadow-lg py-2 px-4 animate-scale-fade origin-top-right z-50 text-right">
          <div className="absolute top-[-5px] right-4 w-3 h-3 bg-white dark:bg-red-500 rotate-45 rounded-xs"/>
          <span className="absolute text-xs">{error}</span>
        </div>
      )}
    </div>
  );
};

Input.Picker = function Picker({label, placeholder, value, error, isOpen: controlledOpen, onOpenChange, onChange, items, className, loading}: InputPickerProps) {

  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : open;

  const setIsOpen = (v: boolean) => {
    if (!isControlled) setOpen(v);
    onOpenChange?.(v);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="flex flex-col gap-1 w-full relative">
      {label && (
        <label className="text-sm text-gray-700 dark:text-gray-300 mb-1 block">
          {label}
        </label>
      )}
      {loading ? <div className={"px-3 py-1 rounded-xl border border-gray-300 dark:border-gray-600"}><Loading size={16}/></div> :
        <input
          readOnly
          value={value}
          placeholder={placeholder}
          onClick={() => setIsOpen(!isOpen)}
          className={clsx(
            "px-3 py-1 rounded-xl border text-sm outline-none cursor-pointer",
            "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100",
            "border-gray-300 dark:border-gray-600",
            "focus:ring-2 focus:ring-blue-500",
            className
          )}
        />}
      {!loading && <svg onClick={() => setIsOpen(!isOpen)} className={clsx("w-4 h-4 transition-transform duration-300 rotate-90 absolute left-2 top-2 cursor-pointer",
        isOpen && "rotate-270")} fill="none" stroke="currentColor" strokeWidth={2}
                        viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
      </svg>}
      {isOpen && (
        <div className="absolute z-51 top-[34px] w-full rounded-2xl border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 shadow-lg overflow-hidden">
          {items.map((item) => (
            <div
              key={item.value}
              onClick={() => {
                onChange?.({value: item.value, label: item.label});
                setIsOpen(false);
              }}
              className={clsx(
                "px-3 py-2 text-sm cursor-pointer transition-colors",
                "hover:bg-gray-100 dark:hover:bg-gray-700",
                item.value === value &&
                "bg-blue-100 dark:bg-blue-600 text-blue-700 dark:text-white"
              )}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
      {error && (
        <div className="absolute right-0 top-9 w-50 h-8 bg-red-500 dark:bg-red-500 rounded-xl shadow-lg py-2 px-4 animate-scale-fade origin-top-right z-50 text-right">
          <div className="absolute top-[-5px] right-4 w-3 h-3 bg-white dark:bg-red-500 rotate-45 rounded-xs"/>
          <span className="absolute text-xs">{error}</span>
        </div>
      )}
    </div>
  );
};

Input.WithButtonIcon = function WithButton({label, error, icon, className, variantBtn, loading, buttonLabel, button, onButtonClick, disabled, ...props}: InputWithButtonProps) {
  return (
    <div className="flex flex-col gap-1 w-full relative">
      {label && (<label className="text-sm text-gray-700 dark:text-gray-300">{label}</label>)}
      <div className="relative flex items-center">
        {loading ? (<div className="px-3 py-1 w-full rounded-xl border border-gray-300 dark:border-gray-600"><Loading size={16}/></div>) : (
          <>
            <input{...props} disabled={disabled}
                  className={clsx("w-full ps-3 py-1 rounded-xl text-sm outline-none",
                    "bg-gray-100 dark:bg-gray-800",
                    "border border-gray-300 dark:border-gray-600",
                    "placeholder-gray-400 dark:placeholder-gray-500",
                    "focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
                    error && "border-red-500 focus:ring-red-500 focus:border-red-500",
                    className
                  )}
            />
            <Button.WithIcon icon={icon} disabled={disabled} onClick={onButtonClick} variant={variantBtn} className={"absolute left-0 top-0 h-full w-1/6 rounded-br-none rounded-tr-none"}/>
          </>
        )}
      </div>
      {error && (
        <div className="absolute right-0 top-9 w-50 h-8 bg-red-500 rounded-xl shadow-lg py-2 px-4 animate-scale-fade z-50 text-right">
          <div className="absolute top-[-5px] right-4 w-3 h-3 bg-red-500 rotate-45"/>
          <span className="absolute text-xs">{error}</span>
        </div>
      )}
    </div>
  );
};
