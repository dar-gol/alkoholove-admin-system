export type Type =
  | "default"
  | "default "
  | "default success"
  | "default error"
  | "default active"
  | "written "
  | "written"
  | "written success"
  | "written error"
  | "written active";
export type RightIcon = "icon-Error" | "icon-Success" | "";

export type State = "success" | "error" | "";

export interface CustomInputProps {
  state: State;
  placeholder: string;
  error: string;
  icon?: string;
  isAutoCompleted?: boolean;
  [k: string]: any;
}

export interface ISelectValue<T> {
  label: string;
  value: T;
}
