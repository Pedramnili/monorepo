import clsx from "clsx";
import {ReactNode} from "react";

export const Sidenav = ({className, children}: SidenavProps) => {
  return (
    <header className={clsx( "w-full h-12 pb-2", className)}>
      <nav className={"h-full flex items-center justify-between px-2"}>
        {children}
      </nav>
    </header>
  );
};

interface SidenavProps {
  className?: string;
  logo?: ReactNode;
  children?: ReactNode; // center section
  right?: ReactNode; // right section
}