import clsx from "clsx";
import {CheckboxProps} from "./Checkbox.types";



export const Checkbox  = ({checked, defaultChecked, onChange, label, disabled, className = ""} : CheckboxProps) => {

  const classNameLabel = clsx(
    "flex justify-center items-center gap-2 cursor-pointer select-none rtl:flex-row-reverse",
    disabled ? "opacity-50 cursor-not-allowed" : "",
    className,
  )

  const classNameInput = clsx("peer cursor-pointer h-4 w-4 appearance-none rounded border border-gray-400 checked:bg-blue-600 checked:border-blue-600 relative")

  return (
    <label className={classNameLabel}>
      <div className={"relative h-4 w-4"}>
        <input type="checkbox" checked={checked} className={classNameInput} defaultChecked={defaultChecked} disabled={disabled} onChange={(e) => onChange?.(e.target.checked)}/>
        <svg className="pointer-events-none absolute top-0 left-0 w-4 h-4 text-white hidden peer-checked:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
          <path d="M5 13l4 4L19 7"/>
        </svg>
      </div>
      <span className="pointer-events-none text-sm">{label}</span>
    </label>
  );
};
