import { useEffect, useState } from "react";
import { Body, Header, IReq, Method, Url } from "../../@types/fetch";
import { IPageInfo } from "../../@types/pagination";
import useQueryParams from "./useQueryParams";
import useAuthReq from "./useReq";
import useUser from "./useUser";

const initalPageInfo: IPageInfo = {
  limit: 10,
  offset: 0,
  total: 10,
  number: 0,
} as const;

let requests: number = 0;

type requestArray = [Method, Url, Body, Header?];

interface Content {
  id: string;
  [k: string]: unknown;
}

type DataType = { [k: string]: Content[] } & {
  page_info: IPageInfo;
};

const useContents = (
  initReq: requestArray,
  listObjectName: string,
  initPageInfo?: IPageInfo
) => {
  const { get } = useUser();
  const [contents, setContents] = useState<Content[] | null>(null);
  const [name, setName] = useState<string>("");
  const [body, setBody] = useState<string | null>(null);
  const [page, setPage] = useState<IPageInfo>(initPageInfo || initalPageInfo);
  const { send } = useAuthReq(...initReq);
  const { query, updateParam } = useQueryParams();

  const getKind = (kind?: string | null) => {
    if (kind) return JSON.stringify({ kind });
    if (!kind && body) return JSON.stringify({ kind: body });
    return null;
  };

  const getPhrase = (input: string | null) => {
    if (input === null && name) return `&phrase=${name}`;
    if (input) return `&phrase=${input}`;
    return "";
  };

  const search = (input: string | null, kind?: string | null) => {
    if (typeof input === "string") setName(getPhrase(input));
    if (kind) setBody(kind);
    if (kind === null) setBody(null);
  };

  const changePage = (index: number) => {
    updateParam("offset", index);
    setPage((prev) => ({
      ...prev,
      number: index,
    }));
  };

  const changePageSize = (limit: number) => {
    setPage((prev) => ({
      ...prev,
      limit,
      number: 0,
    }));
  };

  const remove = (id: string) => {
    setContents(null);
    setContents(
      (prev) => prev && [...prev.filter((content) => content.id !== id)]
    );
  };

  const update = (req: IReq = {}, metadata: { subscribed: boolean }) => {
    setPage((prev) => ({ ...prev, isLoading: true }));
    requests += 1;
    const number = requests;
    send({ ...req })
      .then((data: Response) => data.json())
      .then((data: DataType) => {
        if (metadata.subscribed && number === requests) {
          const { offset, total, limit } = data.page_info;
          if (total !== 0 && offset > total) {
            changePage(parseInt((total / limit).toString(), 10) || 0);
          }
          const preparedContent = offset > total ? null : data[listObjectName];
          setContents(preparedContent);
          setPage((prev) => ({ ...prev, ...data.page_info, isLoading: false }));
        }
      })
      .catch((e) => {
        if (metadata.subscribed)
          setPage((prev) => ({ ...prev, isLoading: false }));
        console.error(e);
      });
  };

  const refresh = () => {
    const shift = page.number * page.limit;
    const metadata = {
      subscribed: true,
    };
    update(
      {
        url: `${initReq[1]}?limit=${page.limit}&offset=${shift}${name}`,
        body: getKind(),
      },
      metadata
    );
  };

  useEffect(() => {
    if (!get().access_token) return () => {};
    const shift = page.number * page.limit;
    const metadata = {
      subscribed: true,
    };
    update(
      {
        url: `${initReq[1]}?limit=${page.limit}&offset=${shift}${name}`,
        body: getKind(),
      },
      metadata
    );

    return () => {
      metadata.subscribed = false;
    };
  }, [name, body, page.number, page.limit]);

  useEffect(() => {
    const metadata = {
      subscribed: true,
    };
    if (get().access_token) update({}, metadata);
    return () => {
      metadata.subscribed = false;
    };
  }, [get().access_token]);

  return {
    search,
    remove,
    changePageSize,
    changePage,
    contents,
    page,
    refresh,
  };
};

export default useContents;
