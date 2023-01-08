import React, { useEffect, useState } from "react";
import { CustomCreatable, CustomSelect } from "./CustomSelect.styled";
import { Type } from "./ICustomInput";
import { get, post } from "../../utils/fetch";
import { API } from "../../utils/constant";

interface Props {
  [k: string]: any;
}

interface IOptions {
  label: string;
  value: string;
}

const Select = ({ ...rest }: Props) => {
  const [type, setType] = useState<Type>("default");
  const [active, setActive] = useState<boolean>(false);
  const [options, setOptions] = useState<IOptions[]>([]);

  const activeHandler = () => setActive(true);
  const blurHandler = () => setActive(false);

  const stateHandler = (): Type => {
    if (active) return "written active";
    if (!active && rest.value) return `written`;
    if (!active && !rest.value) return `default`;
    return "default";
  };

  const prepOptions = (ops: string[]): IOptions[] =>
    ops.map((op) => ({ label: op, value: op }));

  const getOptions = async () => {
    if (!rest.name) return;
    const valueOptions = (await post({
      url: `${API}/alcohols/search_values?field_name=${rest.name}&limit=0`,
      body: "",
      header: {
        accept: "application/json",
      },
    }).then((data) => data.json())) as string[];
    if (options instanceof Array) {
      setOptions(prepOptions(valueOptions));
    }
  };

  const checkOptions = () => {
    if (rest.options?.length !== 0) return rest.options;
    return options;
  };

  useEffect(() => {
    setType(stateHandler());
    getOptions();
  }, [rest.value, active]);

  const getSelect = () => {
    if (rest.type === "creatable")
      return (
        <CustomCreatable
          onFocus={activeHandler}
          onBlur={blurHandler}
          className={`${type}`}
          {...rest}
          options={checkOptions()}
        />
      );
    return (
      <CustomSelect
        onFocus={activeHandler}
        onBlur={blurHandler}
        className={`${type}`}
        {...rest}
        options={checkOptions()}
      />
    );
  };

  return getSelect();
};

export default Select;
