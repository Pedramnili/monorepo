export type Placement = "bottom-left" | "bottom-right" | "top-left" | "top-right";
export type ViewMode = "days" | "months" | "years" | "clock";

export interface DatePickerProps {
  placeholder?: string;
  placement?: Placement;
  showTime?: boolean;
  value?: Date | null;
  onChange?: (date: Date | null) => void;
}