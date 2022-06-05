import { IPageInfo } from './pagination';

export type Suggestion = {
  barcode: string;
  descriptions: string[];
  id: string;
  kind: string;
  name: string;
  user_ids: string[];
};

export type Suggestions = Suggestion[];

export type SuggResponse = {
  suggestions: Suggestions;
  page_info: IPageInfo;
};
