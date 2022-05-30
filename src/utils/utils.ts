import { Type } from '../@types/category';
import { inputType } from '../@types/inputs';
import { INPUT_TYPE } from './constant';

export const unloadType = (type: Type): [string, boolean] => {
  if (typeof type === 'string') return [type, true];
  return [type[0], type[1] === 'null' ? false : type[1]];
};

export const getType = (type: Type) => {
  const [kind, required] = unloadType(type);
  return {
    type: (INPUT_TYPE.includes(kind) ? kind : 'string') as inputType,
    required,
  };
};

export const createImageName = (name: string, type: string): string =>
  `${name.replaceAll(' ', '_')}_${type}.png`;

type FormDataType = Array<[string, string | Blob]>;

export const createFormData = (tuples: FormDataType) => {
  const formData = new FormData();

  tuples.forEach((tuple: [string, string | Blob]) => {
    formData.append(tuple[0], tuple[1]);
  });

  return formData;
};

// export const createAlcoholName = (name: string): string => {

// }
