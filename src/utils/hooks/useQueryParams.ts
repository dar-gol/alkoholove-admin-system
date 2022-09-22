import { useSearchParams } from "react-router-dom";

const useQueryParams = () => {
  const [query, setSearch] = useSearchParams();
  const searchObj = Object.fromEntries(new URLSearchParams(query));

  const updateParam = (name: string, value: any) => {
    setSearch({ ...searchObj, [name]: value });
  };

  const hasParam = (key: string) => query.has(key);

  return { query: searchObj, updateParam, hasParam };
};

export default useQueryParams;
