import React, { useEffect, useState } from "react";
import { Alcohols, IAlcohol } from "../../@types/alcohol";
import { IReq } from "../../@types/fetch";
import { IPageInfo } from "../../@types/pagination";
import { API, URL } from "../constant";
import useQueryParams from "./useQueryParams";
import useAuthReq from "./useReq";
import useUser from "./useUser";

const initPageInfo: IPageInfo = {
  limit: 10,
  offset: 0,
  total: 10,
  number: 0,
} as const;

const initReq = [
  "POST",
  `${API}${URL.SEARCH_ALCOHOLS}?limit=10&offset=0`,
  null,
] as const;

const useAlcohols = () => {
  const { get } = useUser();
  const [alcohols, setAlcohols] = useState<Alcohols | null>(null);
  const [name, setName] = useState<string>("");
  const [page, setPage] = useState<IPageInfo>(initPageInfo);
  const { send } = useAuthReq(...initReq);

  const update = (req: IReq = {}) => {
    send({ ...req })
      .then((data: Response) => data.json())
      .then((data: { alcohols: Alcohols; page_info: IPageInfo }) => {
        setAlcohols(data.alcohols);
        setPage((prev) => ({ ...prev, ...data.page_info }));
      })
      .catch((e) => console.error(e));
  };

  const search = (input: string) => {
    const phrase = input ? `&phrase=${input}` : "";
    const shift = page.number * page.limit;
    update({
      url: `${API}${URL.SEARCH_ALCOHOLS}?limit=${page.limit}&offset=${shift}${phrase}`,
    });
    setName(phrase);
  };

  const changePage = (index: number) => {
    const shift = index * page.limit;
    setPage((prev) => ({
      ...prev,
      number: index,
    }));
    update({
      url: `${API}${URL.SEARCH_ALCOHOLS}?limit=${page.limit}&offset=${shift}${name}`,
    });
  };

  const changePageSize = (limit: number) => {
    setPage((prev) => ({
      ...prev,
      limit,
      number: 0,
    }));
    update({
      url: `${API}${URL.SEARCH_ALCOHOLS}?limit=${limit}&offset=0${name}`,
    });
  };

  const remove = (id: string) => {
    setAlcohols((prev: any): any => [
      ...prev.filter((alcohol: IAlcohol) => alcohol.id !== id),
    ]);
  };

  useEffect(() => {
    if (get().access_token) update();
  }, [get().access_token]);

  return {
    search,
    remove,
    changePageSize,
    changePage,
    alcohols,
    page,
  };
};

export default useAlcohols;
