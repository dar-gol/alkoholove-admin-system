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
