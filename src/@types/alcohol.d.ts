import { IPageInfo } from "./pagination.d";

export type IAroma = string;

export type IBarcode = string;

export type IRegion = string;

export type ICountry = string;

export type IFood = string;

export type ITaste = string;

export type IFinishes = string;

export type IIngredients = string;

export type IKeywords = string;

export type IAdditionalProperty = {
  name: string;
  display_name: string;
  value: number | string | string[] | number[];
};

export interface IAlcohol {
  name: string;
  kind: string;
  type: string;
  alcohol_by_volume: number;
  description: string;
  color: string;
  manufacturer: string;
  country: ICountry;
  region: IRegion;
  food: IFood[];
  finish: IFinishes[];
  aroma: IAroma[];
  taste: ITaste[];
  id: string;
  barcode: IBarcode[];
  keywords: IKeywords[];
  avg_rating: number;
  rate_count: number;
  rate_value: number;
  additional_properties: IAdditionalProperty[];
}

export type Alcohols = IAlcohol[];

export type AlcoholsObject = {
  alcohols: IAlcohol[] | null;
  page_info: IPageInfo;
};
