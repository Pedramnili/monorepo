import {FC, MouseEventHandler, ReactNode} from "react";


export type SidebarComponent = FC<SidebarProps> & {
  Menu: FC<SidebarMenuProps>;
  Item: FC<SidebarItemProps>;
};

export interface SidebarProps {
  isOpen?: boolean;
  pin?: boolean;
  setIsOpen?: (open: boolean) => void;
  setPin?: (open: boolean) => void;
  className?: string;
  icon?: ReactNode;
  iconPin?: ReactNode;
  text?: string;
  children?: ReactNode
  as?: any
  to?: any
}

export interface SidebarMenuProps {
  icon?: ReactNode;
  label: string;
  children?: ReactNode;
  className?: string;
  defaultOpen?: boolean;
  open?: boolean,
  setOpen?: (open: boolean) => void;
  active: boolean,
  as?: any
  to?: any
}

export interface SidebarItemProps {
  colorActive?: "gray" | "green" | "red" | "blue" | "emerald"
  href?: string;
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  icon?: ReactNode;
  as: any
  to: any
  active: boolean
}