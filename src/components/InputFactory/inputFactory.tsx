import React from 'react';
import { IFactory } from '../../@types/inputs';
import BoolInput from '../BoolInput/boolInput';
import MoreInput from '../MoreInput/moreInput';
import Select from '../Select/select';
import DoubleInput from '../SimpleInput/DoubleInput';
import NumberInput from '../SimpleInput/NumberInput';
import Textarea from '../SimpleInput/Textarea';
import TextInput from '../SimpleInput/TextInput';

const InputFactory = ({
  name,
  title,
  type,
  required,
  placeholder,
}: IFactory) => {
  if (name === 'description')
    return (
      <Textarea
        name={name}
        title={title}
        required={required}
        placeholder={placeholder}
      />
    );
  if (type === 'string')
    return (
      <TextInput
        name={name}
        title={title}
        required={required}
        placeholder={placeholder}
      />
    );
  if (type === 'array')
    return (
      <Select
        name={name}
        title={title}
        required={required}
        placeholder={placeholder}
      />
    );
  if (type === 'bool')
    return (
      <BoolInput
        name={name}
        title={title}
        required={required}
        placeholder={placeholder}
      />
    );
  if (type === 'int' || type === 'long')
    return (
      <NumberInput
        name={name}
        title={title}
        required={required}
        placeholder={placeholder}
      />
    );
  if (type === 'double')
    return (
      <DoubleInput
        name={name}
        title={title}
        required={required}
        placeholder={placeholder}
      />
    );
  return <div />;
};

export default InputFactory;
