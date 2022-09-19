import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { IChartData } from "./AlcoholChart.types";

interface Props {
  chartData: IChartData[];
}

const AlcoholChartView = ({ chartData }: Props) => {
  const t = 1;
  return (
    <ResponsiveContainer width="100%" height="80%">
      <BarChart
        width={500}
        height={300}
        data={chartData}
        margin={{
          top: 30,
          right: 20,
          left: 10,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="total" fill="#F79E64" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default AlcoholChartView;
