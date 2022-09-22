import React, { useEffect, useState } from "react";
import { CategoriesObject, ICategory } from "../../@types/category";
import LoadingModal from "../../components/modal/LoadingModal";
import { API, URL } from "../../utils/constant";
import useAlcohols from "../../utils/hooks/useAlcohols";
import useAuthReq from "../../utils/hooks/useReq";
import AlcoholListLogic from "./AlcoholList.logic";

const initReq = [
  "GET",
  `${API}${URL.GET_CATEGORIES}?limit=0&offset=0`,
  null,
  {
    accept: "application/json",
    "Content-Type": "application/json",
  },
] as const;

const AlcoholListApollo = () => {
  const { search, changePageSize, changePage, alcohols, page } = useAlcohols();
  const [categories, setCategories] = useState<
    { label: string; value: string }[]
  >([]);
  const { send } = useAuthReq(...initReq);

  const getCategories = () =>
    send({}).then((res: Response) => res.json()) as Promise<CategoriesObject>;

  const init = async () => {
    const data = await getCategories();
    const categoryNames = data.categories?.map(({ title }: ICategory) => ({
      label: title,
      value: title,
    }));
    setCategories(categoryNames || []);
  };

  useEffect(() => {
    init();
  }, []);

  const isLoaded = () => {
    if (alcohols?.length && categories?.length) return true;
    return false;
  };

  if (!isLoaded())
    return (
      <LoadingModal isOpen title="Proszę czekać. Przygotowywujemy stronę..." />
    );

  return (
    <AlcoholListLogic
      page={page}
      alcohols={alcohols || []}
      changePage={changePage}
      categories={categories}
    />
  );
};

export default AlcoholListApollo;
