import React from 'react';
import { IFactory } from '../../@types/inputs';
import BoolInput from '../BoolInput/boolInput';
import MoreInput from '../MoreInput/moreInput';
import Select from '../Select/select';
import DoubleInput from '../SimpleInput/DoubleInput';
import NumberInput from '../SimpleInput/NumberInput';
import TextInput from '../SimpleInput/TextInput';

const InputFactory = ({
  name,
  title,
  type,
  required,
  placeholder,
}: IFactory) => {
  switch (type) {
    case 'string':
      return (
        <TextInput
          name={name}
          title={title}
          required={false}
          placeholder={placeholder}
        />
      );
    case 'array':
      return (
        <Select
          name={name}
          title={title}
          required={false}
          placeholder={placeholder}
        />
      );
    case 'bool':
      return (
        <BoolInput
          name={name}
          title={title}
          required={false}
          placeholder={placeholder}
        />
      );
    case 'int':
    case 'long':
      return (
        <NumberInput
          name={name}
          title={title}
          required={false}
          placeholder={placeholder}
        />
      );
    case 'double':
      return (
        <DoubleInput
          name={name}
          title={title}
          required={false}
          placeholder={placeholder}
        />
      );
    default:
      return <div />;
  }
};

export default InputFactory;
