export interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (value: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}