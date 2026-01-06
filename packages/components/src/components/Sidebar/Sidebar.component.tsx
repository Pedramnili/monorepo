import {useState} from "react";
import {SidebarComponent, SidebarItemProps, SidebarMenuProps, SidebarProps} from "./Sidebar.types";
import clsx from "clsx";
import "./Sidebar.css"


export const Sidebar : SidebarComponent = ({as: Component = "div", to, isOpen, setIsOpen, className, icon, text, iconPin, setPin, pin, children}: SidebarProps) => {
  return (
    <nav
      onMouseEnter={() => !pin ? setIsOpen ? setIsOpen(true) : null : null}
      onMouseLeave={() => !pin ? setIsOpen ? setIsOpen(false) : null : null}
      className={clsx(
        "transition-all duration-300 overflow-hidden h-screen flex flex-col justify-start z-50 my-bg",
        "bg-gray-100 text-gray-800 border-gray-300",
        "dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600",
        "border-e-1 rounded-e-2xl",
        !pin ? "absolute rtl:right-0 left-0" : "",
        isOpen === undefined ? "w-58" : isOpen ? "w-64" : "w-16",
        className
      )}
    >
      <div className="mt-6 mx-4 pb-6 border-b-1 dark:border-gray-600 border-gray-300">
        <div className="flex justify-between items-center h-8">
          <Component to={to} className="flex flex-nowrap items-center gap-4 h-8 text-gray-800! dark:text-gray-100! hover:no-underline! focus:no-underline!">
            {icon}
            <h4 className={"text-nowrap"}>{text}</h4>
          </Component>
          <div className={"border-1! rounded-3xl! dark:border-gray-600 border-gray-300"} onClick={() => setPin ? setPin(!pin) : null}>{iconPin}</div>
        </div>
      </div>
      <nav className={clsx("mx-2! mb-2 mt-3  flex flex-col gap-2")}>
        {children}
      </nav>
    </nav>
  );
};

Sidebar.Menu = function SidebarMenu({icon, active, label, children, className, open, setOpen}: SidebarMenuProps) {
  const [openIN, setOpenIN] = useState(false);
  return (
    <div className="flex flex-col w-full">
      <div onClick={() => setOpen ? setOpen(!open) : setOpenIN(!openIN)} className={
        clsx("flex items-center justify-between w-full hover:bg-gray-400/20! rounded-xl! transition duration-300 ease-in-out p-2", className)}>
        <div className="w-64 flex flex-nowrap items-center gap-6">
          {icon && <span className={`text-xl ${active && "text-emerald-400!"}`}>{icon}</span>}
          <span className={"font-medium"}>{label}</span>
        </div>
        <svg className={clsx(
          "w-4 h-4 transition-transform duration-300 rotate-90",
          open === undefined ? openIN && "rotate-270" : open && "rotate-270"
        )}
             fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
        </svg>
      </div>
      <div className={clsx(
        "flex flex-col gap-1 overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out",
        open === undefined ? openIN ? "transition duration-300 ease-in-out  mt-2 ps-4" : "h-0" : open ? "transition duration-300 ease-in-out  mt-2 ps-4" : "h-0",
      )}>
        {children}
      </div>
    </div>
  );
};

Sidebar.Item = function SidebarItem({as: Component = "a", active, to, icon, children, className, onClick, colorActive = "blue", ...rest}: SidebarItemProps) {
  const props = {
    ...rest,
    onClick,
    className: clsx(
      "hover:bg-gray-400/20! rounded-e-xl transition duration-300 ease-in-out hover:no-underline! focus:no-underline! py-2 pr-2 pl-3 relative",
      active ? `dark:text-emerald-400! text-emerald-500!` : "text-gray-800! dark:text-gray-100!",
      !icon && "pl-14",
      className
    ),
  };
  return (
    <Component to={to} {...props}>
      <div className="w-64 flex flex-nowrap items-center gap-6 ">
        {icon}
        <span className="font-medium">{children}</span>
      </div>
    </Component>
  );
};


