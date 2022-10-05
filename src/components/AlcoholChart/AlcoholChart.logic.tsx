import React from "react";
import { IChartData } from "./AlcoholChart.types";
import AlcoholChartView from "./AlcoholChart.view";

interface Props {
  chartData: IChartData[];
}

const AlcoholChartLogic = ({ chartData }: Props) => {
  const data = chartData.filter((metadata) => metadata.name !== "core");
  return <AlcoholChartView chartData={data} />;
};

export default AlcoholChartLogic;
