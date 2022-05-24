import React, { useContext, useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import AsyncCreatableSelect from 'react-select/async-creatable';
import { IProps, Option } from '../../@types/inputs';
import { UserContextType } from '../../@types/user';
import { UserContext } from '../../context/userContext';
import { Col } from '../../styles/global.styled';
import { API } from '../../utils/constant';
import useAuthReq from '../../utils/hooks/useReq';

const Select = ({ name, show_name, api, onCreate, isMulti }: IProps) => {
  const { user } = useContext(UserContext) as UserContextType;
  const { control } = useFormContext();
  const { send } = useAuthReq('POST', '', '');

  const promiseOptions = async (inputValue: string) => {
    const searchUrl = inputValue ? `?name=${inputValue}` : '';
    const res = await send({method: 'GET', url: `${API}/${api}${searchUrl}`}).then(data => data.json())
    
    if (api)
      return res[api].map((r: { name: string; id: number }) => ({
        label: r.name,
        value: r.id,
      }));
    return [];
  };

  const createOption = (inputValue: any) => send({ method: 'POST', url: `${API}/${api}?name=${inputValue}` })

  return user.access_token ? (
    <Col flex="1">
      <p>{show_name}:</p>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <AsyncCreatableSelect
            {...field}
            isClearable
            defaultOptions
            placeholder="Wprowadz dane"
            isMulti={isMulti}
            loadOptions={promiseOptions}
            onCreateOption={onCreate || createOption}
            theme={(theme) => ({
              ...theme,
              borderRadius: 20,
            })}
          />
        )}
      />
    </Col>
  ) : (
    <div />
  );
};

export default Select;
