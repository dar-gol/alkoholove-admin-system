export interface IOption {
  label: string;
  value: string | number;
}

export type Options = {
  [name: string]: Option;
};

export interface IProps {
  name: string;
  title: string;
  required: boolean;
}

export type inputType = 'string' | 'array' | 'bool' | 'int' | 'double' | 'long';

export interface IFactory extends IProps {
  type: inputType;
  key?: string;
}
