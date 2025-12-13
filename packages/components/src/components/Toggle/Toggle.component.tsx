import { FC } from "react";


export const Toggle: FC<ToggleProps> = ({ checked, onChange, className }) => {
  return (
    <button
      onClick={() => onChange ? onChange(!checked) : null}
      className={`
        relative inline-flex items-center
        cursor-pointer
        w-11 h-6 rounded-full
        transition-colors 
        ${checked ? "bg-green-500" : "bg-gray-300"}
        ${className ?? ""}
      `}
    >
      <span
        className={`
          absolute left-0.5 top-0.5
          w-5 h-5 rounded-full bg-white
          transition-all
          ${checked ? "translate-x-5" : "translate-x-0"}
        `}
      />
    </button>
  );
};


interface ToggleProps {
  checked: boolean;
  onChange?: (value: boolean) => void;
  className?: string;
}
