import { Line, LineConfig } from "@ant-design/charts";
import { FC } from "react";
import { LineChartProps } from "../../../common/types/blocks";

const LineChart: FC<LineChartProps> = ({ data }) => {
  const config: LineConfig = {
    data,
    padding: "auto",
    xField: "year", // Defines the x-axis field
    yField: "value", // Defines the y-axis field
    xAxis: {
      title: {
        text: "Year",
      },
    },
    yAxis: {
      title: {
        text: "Value",
      },
    },
    smooth: true, // Makes the line smooth
    point: {
      size: 5,
      shape: "diamond",
    },
    tooltip: {
      showMarkers: true,
    },
    interactions: [{ type: "marker-active" }],
  };
  return <Line {...config} width={300} height={300} />;
};

export default LineChart;
