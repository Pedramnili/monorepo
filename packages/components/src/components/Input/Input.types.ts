import {FC, InputHTMLAttributes, ReactNode} from "react";

export type InputComponent = FC<InputProps> & {
  Picker: FC<InputPickerProps>;
  WithButtonIcon: FC<InputWithButtonProps>;
};

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  error?: string;
  className?: string;
  loading?: boolean;
}

export interface InputPickerItem {
  label: string;
  value: string;
}

export type InputPickerProps = InputProps & {
  placeholder?: string;
  value?: string;
  isOpen?: boolean;
  items: InputPickerItem[];
  onChange?: ({value , label} : {value: string , label: string}) => void;
  onOpenChange?: (open: boolean) => void;
}


export type InputWithButtonProps = InputProps & {
  buttonLabel?: string;
  button?: ReactNode;
  onButtonClick?: () => void;
  icon: ReactNode;
  variantBtn?: ButtonVariant
};


export type ButtonVariant = "success" | "danger" | "gray" | "warning";
