export interface Name {
  name: string;
}

export interface Option {
  label: string;
  value: number;
}

export interface IProps {
  name: string;
  show_name: string;
  api?: string;
  onCreate?: (inputValue: string) => void;
  isMulti?: boolean;
}

export interface IFactory {
  name: string;
  show_name: string;
  type: 'simple' | 'more' | 'select' | 'boolean' | 'region';
  api?: string | undefined;
  key?: string;
  isMulti?: boolean;
}
