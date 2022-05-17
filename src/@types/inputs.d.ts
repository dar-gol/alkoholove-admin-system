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
  search?: string;
}

export interface IFactory {
  name: string;
  show_name: string;
  type: 'simple' | 'more' | 'select' | 'boolean';
  search?: string;
  api?: string | undefined;
  key?: string;
}
