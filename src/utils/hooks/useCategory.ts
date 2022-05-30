import { useEffect, useContext } from 'react';
import {
  CategoryContextType,
  Property,
  SpecificCategory,
} from '../../@types/category';
import { CategoryContext } from '../../context/categoryContext';
import { API, BARCODE_PROPERTY, CORE_PROPERTY, URL } from '../constant';
import useAuthReq from './useReq';
import useUser from './useUser';

const useCategory = () => {
  const { ctg, set } = useContext(CategoryContext) as CategoryContextType;
  const { send } = useAuthReq('GET', `${API}${URL.CATEGORIES}`, '');

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

  const getCategory = (name: string): SpecificCategory => {
    if (!ctg?.categories) return { required: [], properties: [] };
    const { categories } = ctg;
    const alkoholCategories = categories.reduce<SpecificCategory>(
      (prev, curr) => {
        if (![name, CORE_PROPERTY].includes(curr.title)) return { ...prev };
        const { properties, required } = curr;
        const prop = filterProp(properties, ['kind', BARCODE_PROPERTY]);

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
    send({})
      .then((data) => data.json())
      .then((data) => set(data));
  }, []);

  return { getNames, getCategory, ctg };
};

export default useCategory;
