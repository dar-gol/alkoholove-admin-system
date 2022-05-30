import { useEffect, useContext, useState } from 'react';
import {
  CategoryContextType,
  Property,
  SpecificCategory,
} from '../../@types/category';
import { CategoryContext } from '../../context/categoryContext';
import { API, BARCODE_PROPERTY, CORE_PROPERTY, URL } from '../constant';
import useAuthReq from './useReq';
import { IPageInfo } from '../../@types/pagination';
import { IReq } from '../../@types/fetch';

const initPageInfo: IPageInfo = {
  limit: 10,
  offset: 0,
  total: 10,
  number: 0,
} as const;

const useCategory = () => {
  const { ctg, set } = useContext(CategoryContext) as CategoryContextType;
  const { send } = useAuthReq('GET', `${API}${URL.CATEGORIES}`, '');
  const initPage = ctg?.page_info
    ? { ...ctg?.page_info, number: 0 }
    : initPageInfo;
  const [page, setPage] = useState<IPageInfo>(initPage);

  const update = (req: IReq = {}) => {
    send({ ...req })
      .then((data) => data.json())
      .then((data) => {
        set(data);
        setPage((prev) => ({ ...prev, ...data.page_info }));
      });
  };

  const changePage = (index: number) => {
    const shift = index * page.limit;
    setPage((prev) => ({
      ...prev,
      number: index,
    }));
    update({
      url: `${API}${URL.CATEGORIES}?limit=${page.limit}&offset=${shift}`,
    });
  };

  const changePageSize = (limit: number) => {
    setPage((prev) => ({
      ...prev,
      limit,
      number: 0,
    }));
    update({
      url: `${API}${URL.CATEGORIES}?limit=${limit}&offset=0`,
    });
  };

  const remove = (id: string) => {
    const copy = ctg?.categories?.filter((category) => category.id !== id);
    set({ categories: copy || null, page_info: page });
  };

  const filterProp = (arr: Property[], name: string[]) =>
    arr.filter((el: Property) => !name.includes(el.name));

  const getNames = (): string[] => {
    if (!ctg?.categories) return [];
    const { categories } = ctg;
    return categories.reduce<string[]>((prev, curr) => {
      if (curr.title === CORE_PROPERTY) return [...prev];
      return [...prev, curr.title];
    }, []);
  };

  const getID = (name: string): string => {
    const index = ctg?.categories?.findIndex(
      (category) => category.title === name
    );
    if (!index) return '';
    const id = ctg?.categories?.[index].id;
    return id || '';
  };

  const getCategory = (
    name: string,
    onlySpecial: boolean = false,
    isFiltered: boolean = true
  ): SpecificCategory => {
    if (!ctg?.categories) return { required: [], properties: [] };
    const { categories } = ctg;
    const alkoholCategories = categories.reduce<SpecificCategory>(
      (prev, curr) => {
        if (![name, !onlySpecial ? CORE_PROPERTY : ''].includes(curr.title))
          return { ...prev };
        const { properties, required } = curr;
        const prop = filterProp(properties, [
          'kind',
          'rate_count',
          'rate_value',
          'avg_rating',
          isFiltered ? BARCODE_PROPERTY : '',
        ]);

        return {
          required: [...prev.required, ...(required || [])],
          properties: [...prev.properties, ...prop],
        };
      },
      { required: [], properties: [] }
    );
    return alkoholCategories;
  };

  useEffect(() => {
    if (ctg !== null) return;
    update();
  }, []);

  return {
    getNames,
    getCategory,
    ctg,
    remove,
    changePageSize,
    changePage,
    page,
    getID,
    update,
  };
};

export default useCategory;
