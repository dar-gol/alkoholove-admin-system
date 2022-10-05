import React, { useEffect, useState } from "react";
import { CustomCreatable, CustomSelect } from "./CustomSelect.styled";
import { Type } from "./ICustomInput";

interface Props {
  [k: string]: any;
}

const Select = ({ ...rest }: Props) => {
  const [type, setType] = useState<Type>("default");
  const [active, setActive] = useState<boolean>(false);

  const activeHandler = () => setActive(true);
  const blurHandler = () => setActive(false);

  const stateHandler = (): Type => {
    if (active) return "written active";
    if (!active && rest.value) return `written`;
    if (!active && !rest.value) return `default`;
    return "default";
  };

  useEffect(() => {
    setType(stateHandler());
  }, [rest.value, active]);

  const getSelect = () => {
    if (rest.type === "creatable")
      return (
        <CustomCreatable
          onFocus={activeHandler}
          onBlur={blurHandler}
          className={`${type}`}
          {...rest}
        />
      );
    return (
      <CustomSelect
        onFocus={activeHandler}
        onBlur={blurHandler}
        className={`${type}`}
        {...rest}
      />
    );
  };

  return getSelect();
};

export default Select;
