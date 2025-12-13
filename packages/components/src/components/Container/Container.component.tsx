import React, {ReactNode} from "react";
import clsx from "clsx";


export const Container = ({theme = "dark", className, children}: ContainerProps) => {
  return (
    <main
      className={clsx(
        "w-screen h-screen overflow-hidden transition-colors duration-200 bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100",
        className,
        theme === "dark" ? "dark" : ""
      )}
    >
      {children}
    </main>
  );
}


type Theme = "light" | "dark";

interface ContainerProps {
  theme?: Theme;
  className?: string;
  children?: ReactNode;
}

