import React from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
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
        <Bar
          dataKey="total"
          fill="#F79E64"
          onClick={(data: { name: string }, index: any) =>
            navigate(`/alcohol/${data.name}`)
          }
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default AlcoholChartView;
