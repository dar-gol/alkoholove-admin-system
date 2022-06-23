export type IAroma = string;

export type IBarcode = string;

export type IRegion = string;

export type ICountry = string;

export type IFood = string;

export type ITaste = string;

export type IFinishes = string;

export type IIngredients = string;

export type IKeywords = string;

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
  id: number;
  barcode: IBarcode[];
  keywords: IKeywords[];
}

export type Alcohols = IAlcohol[];
