import { IPageInfo } from './pagination';

export interface IError {
  description: string;
  id: string;
  user_id: string;
}

export interface IErrors {
  reported_errors: IError[];
  page_info: IPageInfo;
}
