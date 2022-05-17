import React, { useContext } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import AsyncCreatableSelect from 'react-select/async-creatable';
import { IProps, Option } from '../../@types/inputs';
import { UserContextType } from '../../@types/user';
import { UserContext } from '../../context/userContext';
import { Col } from '../../styles/global.styled';
import { API } from '../../utils/constant';
import { get, post } from '../../utils/fetch';

const Select = ({ name, show_name, api, onCreate, isMulti }: IProps) => {
  const { user } = useContext(UserContext) as UserContextType;
  const { control } = useFormContext();

  const promiseOptions = async (inputValue: string) => {
    const searchUrl = inputValue ? `?name=${inputValue}` : '';
    const res = await get({
      url: `${API}/${api}${searchUrl}`,
      header: {
        Authorization: `Bearer ${user.access_token}`,
      },
    });

    if (api)
      return res[api].map((r: { name: string; id: number }) => ({
        label: r.name,
        value: r.id,
      }));
    return [];
  };

  const createOption = (inputValue: any) => {
    post({
      url: `${API}/${api}?name=${inputValue}`,
      header: {
        Authorization: `Bearer ${user.access_token}`,
      },
      body: {},
    });
  };

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
            // cacheOptions
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
