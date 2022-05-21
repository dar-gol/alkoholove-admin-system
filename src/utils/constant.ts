import { IFactory } from '../@types/inputs';

export const API = 'http://localhost:8008';
export const test = '';
export const ADD_INPUTS: IFactory[] = [
  {
    name: 'barcode_list',
    show_name: 'Kod kreskowy',
    type: 'more',
  },
  {
    name: 'name',
    show_name: 'Nazwa',
    type: 'simple',
  },
  {
    name: 'kind',
    show_name: 'Rodzaj',
    type: 'simple',
  },
  {
    name: 'type',
    show_name: 'Typ',
    type: 'simple',
  },
  {
    name: 'alcohol_by_volume',
    show_name: 'Ilość promili',
    type: 'simple',
  },
  {
    name: 'manufacturer',
    show_name: 'Producent',
    type: 'simple',
  },
  {
    name: 'description',
    show_name: 'Opis',
    type: 'simple',
  },
  {
    name: 'color',
    show_name: 'Kolor',
    type: 'simple',
  },
  {
    name: 'serving_temperature',
    show_name: 'Temperatura podania',
    type: 'simple',
  },
  {
    name: 'region_id',
    show_name: 'Region',
    type: 'region',
    api: 'regions',
    isMulti: false,
  },
  {
    name: 'food_ids',
    show_name: 'Posiłki',
    type: 'select',
    api: 'foods',
    isMulti: true,
  },
  {
    name: 'aroma_ids',
    show_name: 'Aromaty',
    type: 'select',
    api: 'flavours',
    isMulti: true,
  },
  {
    name: 'taste_ids',
    show_name: 'Smak',
    type: 'select',
    api: 'flavours',
    isMulti: true,
  },
  {
    name: 'finish_ids',
    show_name: 'Finish',
    type: 'select',
    api: 'flavours',
    isMulti: true,
  },
  {
    name: 'ingredient_ids',
    show_name: 'Składniki',
    type: 'select',
    api: 'foods',
    isMulti: true,
  },
  {
    name: 'bitterness_ibu',
    show_name: 'IBU',
    type: 'simple',
  },
  {
    name: 'srm',
    show_name: 'Kolor (SRM)',
    type: 'simple',
  },
  {
    name: 'extract',
    show_name: 'Ekstrakt',
    type: 'simple',
  },
  {
    name: 'fermentation',
    show_name: 'Fermentacja',
    type: 'simple',
  },
  {
    name: 'is_filtered',
    show_name: 'Filtrowany',
    type: 'boolean',
  },
  {
    name: 'is_pasteurized',
    show_name: 'Pasteryzowany',
    type: 'boolean',
  },
  {
    name: 'age',
    show_name: 'Wiek',
    type: 'simple',
  },
  {
    name: 'year',
    show_name: 'Rocznik',
    type: 'simple',
  },
  {
    name: 'vine_stock',
    show_name: 'Winorosl',
    type: 'simple',
  },
];
