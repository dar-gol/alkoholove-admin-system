import { useEffect, useContext } from 'react';
import { CategoryContextType, Property, SpecificCategory } from '../../@types/category';
import { CategoryContext } from '../../context/categoryContext';
import { API, CORE_PROPERTIES, URL } from '../constant';
import { get } from '../fetch';
import useUser from './useUser';

const useCategory = () => {
  const { ctg, set } = useContext(CategoryContext) as CategoryContextType;
  const user = useUser();

  const filterProp = (arr: Property[], name: string) =>
    arr.filter((el: Property) => el.name !== name); 

  const getNames = (): string[] => {
    if (!ctg?.categories) return []
    const { categories } = ctg;
    return categories.reduce<string[]>((prev, curr) => {
      if (curr.title === CORE_PROPERTIES) return [...prev];
      return [...prev, curr.title]
    }, [])
  }

  const getCategory = (name: string): SpecificCategory => {
    if (!ctg?.categories) return { required: [], properties: [] };
    const { categories } = ctg;
    const alkoholCategories = categories.reduce<SpecificCategory>((prev, curr) => {
      if (!(curr.title === name || curr.title === CORE_PROPERTIES)) return {...prev}
      const { properties, required } = curr;
      const prop = filterProp(properties, 'kind');
      return {
        required: [
          ...prev.required,
          ...required
        ],
        properties: [
          ...prev.properties,
          ...prop
        ]
      }
    }, {required: [], properties: []})
    return alkoholCategories
  }

  useEffect(() => {
    if (ctg !== null || !user.get().access_token) return;
    get({
      url: `${API}${URL.CATEGORIES}`,
      header: {
        Authorization: `Bearer ${user.get().access_token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => set(res));
  }, [user.get().access_token]);

  return {getNames, getCategory};
};

export default useCategory;