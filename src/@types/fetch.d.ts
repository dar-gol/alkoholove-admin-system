export interface IPost {
  url: string;
  body: object;
  header?: object;
}

export type Post = {
  url: string;
  body: string | FormData | URLSearchParams;
  header: object;
};

export interface IGet {
  url: string;
  header?: object;
}

export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';
export type Url = string;
export type Header = object;
export type Body = string | FormData | URLSearchParams | null;

export interface IReq {
  method?: Method;
  url?: Url;
  header?: Header;
  body?: Body;
}
