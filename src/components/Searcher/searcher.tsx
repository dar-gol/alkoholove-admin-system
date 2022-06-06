import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { InputText, Row } from '../../styles/global.styled';

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
    label: '10 wierszy na stronę',
  },
  {
    value: 25,
    label: '25 wierszy na stronę',
  },
  {
    value: 50,
    label: '50 wierszy na stronę',
  },
  {
    value: 100,
    label: '100 wierszy na stronę',
  },
];

const Searcher: React.FC<IProps> = ({ setLimit, update, isSearch }) => {
  const [input, setInput] = useState('');
  useEffect(() => {
    const delayFn = setTimeout(() => {
      update(input);
    }, 1000);
    return () => clearTimeout(delayFn);
  }, [input]);

  return (
    <Row justifyContent="space-between" margin="0 10px">
      <Select
        options={options}
        defaultValue={options[0]}
        onChange={(option: IOption | null) => setLimit(option?.value || 10)}
      />
      {isSearch && (
        <InputText
          placeholder="Szukaj..."
          onChange={(e) => setInput(e.target.value)}
        />
      )}
    </Row>
  );
};

Searcher.defaultProps = { isSearch: true };

export default Searcher;
