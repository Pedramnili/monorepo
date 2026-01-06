import clsx from "clsx";
import {Loading} from "../Loading/Loading.component";
import {ButtonComponent, IButtonProps, IconButtonProps, ToggleActionButtonProps, WithIconButtonProps} from "./Button.types";


export const Button: ButtonComponent = ({onClick, variant = "gray", disabled, className, loading, children}: IButtonProps) => {

  const VARIANTS = {
    success:
      "bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700",
    danger :
      "bg-red-700 hover:bg-red-800 dark:bg-red-600 dark:hover:bg-red-700",
    warning:
      "bg-yellow-700 hover:bg-yellow-800 dark:bg-yellow-600 dark:hover:bg-yellow-700",
    gray   :
      "bg-gray-600 hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600",
  }[variant]

  return (
    <button disabled={loading || disabled}
            className={clsx(
              "px-4 py-1 text-gray-100 rounded-xl cursor-pointer w-50",
              VARIANTS,
              disabled && "opacity-50 cursor-not-allowed",
              loading && "cursor-default!",
              className
            )} onClick={onClick}>
      {loading ? <Loading size={16}/> : children}
    </button>
  );
};


Button.Toggle = function Toggle({isActive, onClick, activeText, inactiveText, variant = "gray", className}: ToggleActionButtonProps) {

  const baseClasses =
    "text-sm px-2 py-1 text-gray-100 rounded-xl cursor-pointer h-8 w-50 transition-colors";

  const inactiveColor =
    variant === "zinc"
      ? "bg-zinc-600 hover:bg-zinc-700"
      : "bg-gray-600 hover:bg-gray-700";

  const activeColor = "bg-red-700 hover:bg-red-800";

  return (
    <button
      onClick={onClick}
      className={clsx(
        baseClasses,
        isActive ? activeColor : inactiveColor,
        className
      )}
    >
      {isActive ? activeText : inactiveText}
    </button>
  )
}


Button.Icon = function Icon({icon, onClick, variant = "gray", size = "md", className, disabled,}: IconButtonProps) {

  const VARIANTS = {
    success:
      "text-green-700 hover:text-green-800 dark:text-green-600 dark:hover:text-green-700",
    danger :
      "text-red-700 hover:text-red-800 dark:text-red-600 dark:hover:text-red-700",
    warning:
      "text-yellow-700 hover:text-yellow-800 dark:text-yellow-600 dark:hover:text-yellow-700",
    gray   :
      "text-gray-600 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-400",
  }[variant];

  const SIZES = {
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-lg",
  }[size];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "inline-flex items-center justify-center rounded-xl cursor-pointer",
        VARIANTS,
        SIZES,
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {icon}
    </button>
  );
};


Button.WithIcon = function WithIcon({icon, children, onClick, variant = "gray", iconPosition = "left", className, loading, disabled,}: WithIconButtonProps) {

  const VARIANTS = {
    success:
      "bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700",
    danger :
      "bg-red-700 hover:bg-red-800 dark:bg-red-600 dark:hover:bg-red-700",
    warning:
      "bg-yellow-700 hover:bg-yellow-800 dark:bg-yellow-600 dark:hover:bg-yellow-700",
    gray   :
      "bg-gray-600 hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600",
  }[variant];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "inline-flex items-center justify-center gap-2 px-2 py-1 rounded-xl text-gray-100 cursor-pointer",
        VARIANTS,
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {
        loading ? <Loading size={16}/> : <>
          {iconPosition === "left" && (<span className="flex items-center text-current">{icon}</span>)}
          {children && <span className="whitespace-nowrap">{children}</span>}
          {iconPosition === "right" && (<span className="flex items-center text-current">{icon}</span>)}
        </>
      }

    </button>
  );
};
