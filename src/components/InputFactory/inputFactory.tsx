import React from 'react';
import { IFactory } from '../../@types/inputs';
import BoolInput from '../BoolInput/boolInput';
import MoreInput from '../MoreInput/moreInput';
import RegionInput from '../regionInput/regionInput';
import Select from '../Select/select';
import SimpleInput from '../SimpleInput/simpleInput';

const InputFactory = ({ name, show_name, type, api, isMulti }: IFactory) => {
  switch (type) {
    case 'simple':
      return <SimpleInput name={name} show_name={show_name} />;
    case 'more':
      return <MoreInput name={name} show_name={show_name} />;
    case 'select':
      return (
        <Select name={name} show_name={show_name} api={api} isMulti={isMulti} />
      );
    case 'boolean':
      return <BoolInput name={name} show_name={show_name} />;
    case 'region':
      return <RegionInput />;
    default:
      return <div />;
  }
};

export default InputFactory;
