import React, { ReactNode } from "react";
import {
  CategoryContextType,
  ICategory,
  CategoriesObject,
} from "../@types/category";

export const CategoryContext = React.createContext<CategoryContextType | null>(
  null
);

const CategoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [ctg, setCategory] = React.useState<CategoriesObject | null>(null);

  const set = (category: React.SetStateAction<CategoriesObject | null>) => {
    setCategory(category);
  };

  return (
    <CategoryContext.Provider value={{ ctg, set }}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;
