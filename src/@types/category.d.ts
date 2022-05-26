import { IPageInfo } from "./pagination";

type Required = string;

type Metadata = {
  bsonType: string | string[];
  description: string;
  items?: {
    bsonType: string;
  }
}

type Property = {
  name: string,
  metadata: Metadata
}

export interface ICategory {
  id: string;
  properties: Property[]
  title: string;
  required: Required[]
}

export type CategoriesObject = {
  categories: ICategory[] | null;
  page_info: IPageInfo
}

export type SpecificCategory = {
  required: Required[],
  properties: Property[]
}

export interface CategoryContextType {
  ctg: CategoriesObject | null;
  set: (categories: CategoriesObject) => void;
}