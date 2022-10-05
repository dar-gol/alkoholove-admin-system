import { IPageInfo } from "./pagination";

export type Required = string;

export type Types = "string" | "int" | "double" | "array" | "bool" | "long";

export type Type = string | [string, boolean | "null"];

export type Metadata = {
  bsonType: Type;
  description: string;
  title: string;
  items?: {
    bsonType: string;
  };
};

export type Property = {
  name: string;
  metadata: Metadata;
};

export interface ICategory {
  id: string;
  properties: Property[];
  title: string;
  required: Required[] | null;
}

export type CategoriesObject = {
  categories: ICategory[] | null;
  page_info: IPageInfo;
};

export type SpecificCategory = {
  core: {
    required: Required[];
    properties: Property[];
  };
  additional: {
    required: Required[];
    properties: Property[];
  };
};

export interface CategoryContextType {
  ctg: CategoriesObject | null;
  set: (categories: CategoriesObject) => void;
}
