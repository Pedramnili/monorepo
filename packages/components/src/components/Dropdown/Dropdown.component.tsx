import {FC, useState, useRef, useEffect, ReactNode} from "react";


export const Dropdown: FC<IProps> = ({avatar, items, className = ""}) => {

  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      <button onClick={() => setOpen((v) => !v)}
              className="w-8 h-8 border-2 border-gray-400 rounded-full overflow-hidden cursor-pointer bg-gray-300 flex items-center justify-center">
        {avatar}
      </button>
      {/* Dropdown */}
      {open && (
        <div
          className="
            absolute right-0 rtl:left-[-6px] rtl:right-auto
            mt-2 w-44
            bg-white dark:bg-gray-800
            border border-gray-200 dark:border-gray-700
            rounded-lg shadow-lg py-2
            animate-scale-fade origin-top-right
            z-50
          "
        >
          {/* Triangle */}
          <div
            className="absolute top-[-5px] right-4 rtl:left-4 rtl:right-auto w-3 h-3 bg-white dark:bg-gray-800 rotate-45 border-l border-t border-gray-200 dark:border-gray-700"/>
          {items.map((item, idx) => {
            return (
              <button
                key={idx}
                onClick={() => {
                  item.onClick?.();
                  if (item.closable) {
                    setOpen(item.closable);
                  } else {
                    setOpen(false);
                  }
                }}
                className={`
                 cursor-pointer
                  w-full text-left px-4 py-2 text-sm
                  text-gray-700 dark:text-gray-200
                  hover:bg-gray-200 dark:hover:bg-gray-700
                `}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};


type DropdownItem = {
  label: string | ReactNode;
  closable?: boolean;
  onClick?: () => void;
};

interface IProps {
  avatar: ReactNode;
  items: DropdownItem[];
  className?: string;
}