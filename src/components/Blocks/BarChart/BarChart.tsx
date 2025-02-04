import { Bar, BarConfig } from "@ant-design/charts";
import { FC } from "react";
import { BarChartProps } from "../../../common/types/blocks";

const BarChart: FC<BarChartProps> = ({ data }) => {
  const config: BarConfig = {
    data,
    xField: "value", // Horizontal axis (values)
    yField: "category", // Vertical axis (categories)
    seriesField: "category", // Colors each bar differently
    colorField: "category",
    legend: {
      position: "top-left",
    },
    barStyle: {
      radius: [5, 5, 0, 0], // Rounded top corners
    },
    label: {
      position: "right", // Label inside the bars
      style: {
        fill: "#000",
        fontSize: 12,
      },
    },
    tooltip: {
      showMarkers: false,
    },
    interactions: [{ type: "active-region" }],
  };
  return <Bar {...config} width={300} height={300} />;
};

export default BarChart;
