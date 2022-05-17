import React from 'react';
import { IFactory } from '../../@types/inputs';
import BoolInput from '../BoolInput/boolInput';
import MoreInput from '../MoreInput/moreInput';
import Select from '../Select/select';
import SimpleInput from '../SimpleInput/simpleInput';

const InputFactory = ({ name, show_name, type, api, search }: IFactory) => {
  switch (type) {
    case 'simple':
      return <SimpleInput name={name} show_name={show_name} />;
    case 'more':
      return <MoreInput name={name} show_name={show_name} />;
    case 'select':
      return (
        <Select name={name} show_name={show_name} api={api} search={search} />
      );
    case 'boolean':
      return <BoolInput name={name} show_name={show_name} />;
    default:
      return <div />;
  }
};

export default InputFactory;
