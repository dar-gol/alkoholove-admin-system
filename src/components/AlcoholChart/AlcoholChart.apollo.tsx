import React, { useEffect, useState } from "react";
import { AlcoholsObject, IAlcohol } from "../../@types/alcohol";
import { CategoriesObject, ICategory } from "../../@types/category";
import { API, URL } from "../../utils/constant";
import useAuthReq from "../../utils/hooks/useReq";
import LoadingModal from "../modal/LoadingModal";
import AlcoholChartLogic from "./AlcoholChart.logic";
import { IChartData } from "./AlcoholChart.types";

const initReq = [
  "POST",
  `${API}${URL.SEARCH_ALCOHOLS}?limit=0&offset=0`,
  null,
  {
    accept: "application/json",
    "Content-Type": "application/json",
  },
] as const;

const AlcoholChartApollo = () => {
  const [chartData, setChartData] = useState<IChartData[]>([]);
  const { send } = useAuthReq(...initReq);

  const getCategories = () =>
    send({
      method: "GET",
      url: `${API}${URL.GET_CATEGORIES}?limit=0`,
    }).then((res: Response) => res.json()) as Promise<CategoriesObject>;

  const getAlcoholByKind = (kind: string) =>
    send({
      body: JSON.stringify({
        kind,
      }),
    }).then((data) => data.json()) as Promise<AlcoholsObject>;

  const prepareChartData = (total: number, name: string) => ({
    name,
    total,
  });

  const getAlcoholMetadata = async (categoryNames: string[]) => {
    const metadata = categoryNames.map((categoryName: string) =>
      getAlcoholByKind(categoryName).then(({ page_info }: AlcoholsObject) =>
        prepareChartData(page_info.total, categoryName)
      )
    );
    return Promise.all(metadata);
  };
  const init = async () => {
    const data = await getCategories();
    const categoryNames = data.categories?.map(({ title }: ICategory) => title);
    const metadata = await getAlcoholMetadata(categoryNames || []);
    setChartData(metadata);
  };

  useEffect(() => {
    init();
  }, []);

  if (!chartData.length)
    return (
      <LoadingModal title="Proszę czekać, przygotowujemy dane..." isOpen />
    );
  return <AlcoholChartLogic chartData={chartData} />;
};

export default AlcoholChartApollo;
