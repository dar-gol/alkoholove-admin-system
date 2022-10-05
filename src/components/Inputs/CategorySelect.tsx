import React, { useEffect, useState } from "react";
import { CategoriesObject, ICategory } from "../../@types/category";
import { API, URL } from "../../utils/constant";
import useAuthReq from "../../utils/hooks/useReq";
import { ISelectValue } from "./ICustomInput";
import Select from "./Select";

const initReq = [
  "GET",
  `${API}${URL.GET_CATEGORIES}?limit=0&offset=0`,
  null,
  {
    accept: "application/json",
    "Content-Type": "application/json",
  },
] as const;

interface Props {
  isAll?: boolean;
  [k: string]: any;
}

const CategorySelect = ({ isAll = true, ...rest }: Props) => {
  const [categories, setCategories] = useState<
    { label: string; value: string }[]
  >([]);
  const { send } = useAuthReq(...initReq);

  const getCategories = () =>
    send({}).then((res: Response) => res.json()) as Promise<CategoriesObject>;

  const init = async () => {
    const data = await getCategories();
    const allElement = isAll ? [{ label: "Wszystko", value: "-" }] : [];
    const categoryNames = data.categories?.reduce<ISelectValue<string>[]>(
      (prev, curr) => [
        ...prev,
        {
          label: curr.title,
          value: curr.title,
        },
      ],
      allElement
    );
    setCategories(categoryNames || []);
  };

  useEffect(() => {
    init();
  }, []);

  return <Select options={categories} {...rest} placeholder={rest.title} />;
};

export default CategorySelect;
