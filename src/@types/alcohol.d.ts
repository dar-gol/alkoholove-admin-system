export interface IAroma {
  id: number;
  name: string;
}

export interface IBarcode {
  barcode: string;
}

export interface ICountry {
  id: number;
  name: number;
}

export interface IRegion {
  id: number;
  name: string;
  country: ICountry;
}

export interface IFood {
  id: number;
  name: string;
}

export interface ITaste {
  id: number;
  name: string;
}

export interface IFinishes {
  id: number;
  name: string;
}

export interface IIngredients {
  id: number;
  name: string;
}

export interface IAlcohol {
  age: number;
  alcohol_by_volume: number;
  alcohol_id: number;
  aromas: IAroma[];
  barcodes: IBarcode[];
  name: string;
  kind: string;
  type: string;
  manufacturer: string;
  rating: number;
  image_name: string;
  description: string;
  color: string;
  serving_temperature: string;
  region: IRegion;
  foods: IFood[];
  tastes: ITaste[];
  finishes: IFinishes[];
  ingredients: IIngredients[];
  bitterness_ibu: number;
  srm: number;
  extract: number;
  fermentation: string;
  is_filtered: boolean;
  is_pasteurized: boolean;
  year: number;
  vine_stock: string;
}

export interface IPageInfo {
  limit: number;
  offset: number;
  total: number;
}

export type Alcohols = {
  alcohols: IAlcohol[];
  page_info: IPageInfo;
};
