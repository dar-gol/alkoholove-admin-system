import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import Select from "react-select";

import { InputText, Row } from "../../styles/global.styled";
import useQueryParams from "../../utils/hooks/useQueryParams";

interface IOption {
  value: number;
  label: string;
}

interface IProps {
  setLimit: (limit: number) => void;
  update: (input: string) => void;
  isSearch?: boolean;
}

const options: IOption[] = [
  {
    value: 10,
    label: "10 wierszy na stronę",
  },
  {
    value: 25,
    label: "25 wierszy na stronę",
  },
  {
    value: 50,
    label: "50 wierszy na stronę",
  },
  {
    value: 100,
    label: "100 wierszy na stronę",
  },
];

const genOptionValue = (value: string) => {
  if (!value) return options[0];
  return {
    value: parseInt(value, 10),
    label: `${value} wierszy na stronę`,
  };
};

const Searcher: React.FC<IProps> = ({ setLimit, update, isSearch }) => {
  const { query, updateParam } = useQueryParams();
  const [input, setInput] = useState<string | null>(null);

  const selectHandler = (option: IOption | null) => {
    updateParam("limit", option?.value);
    setLimit(option?.value || 10);
  };

  const searchHandler = (e: BaseSyntheticEvent) => {
    const { value } = e.target;
    updateParam("search", value);
    setInput(value || "");
  };

  useEffect(() => {
    const delayFn = setTimeout(() => {
      if (input !== null) update(input);
    }, 1000);
    return () => clearTimeout(delayFn);
  }, [input]);

  useEffect(() => {
    setInput(query.search || "");
    setLimit(parseInt(query.limit, 10) || 10);
  }, []);

  return (
    <Row justifyContent="space-between" margin="0 10px">
      <Select
        options={options}
        defaultValue={genOptionValue(query.limit)}
        onChange={selectHandler}
      />
      {isSearch && (
        <InputText
          placeholder="Szukaj..."
          onChange={searchHandler}
          value={input || ""}
        />
      )}
    </Row>
  );
};

Searcher.defaultProps = { isSearch: true };

export default Searcher;
