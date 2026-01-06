import {FC, ReactNode} from "react";


export type ButtonComponent = FC<IButtonProps> & {
  Toggle: FC<ToggleActionButtonProps>;
  Icon: FC<IconButtonProps>;
  WithIcon : FC<WithIconButtonProps>;
};

export interface IButtonProps {
  children?: ReactNode;
  variant?: ButtonVariant
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
}

export interface ToggleActionButtonProps {
  isActive: boolean;
  onClick: () => void;
  activeText: string;
  inactiveText: string;
  variant?: "gray" | "zinc";
  className?: string;
}

export interface IconButtonProps {
  icon: ReactNode;
  onClick?: () => void;
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
}

export interface WithIconButtonProps {
  icon: ReactNode;
  children?: ReactNode;
  onClick?: () => void;
  variant?: ButtonVariant
  iconPosition?: "left" | "right";
  className?: string;
  disabled?: boolean;
  loading?: boolean;
}

export type ButtonVariant = "success" | "danger" | "gray" | "warning";
