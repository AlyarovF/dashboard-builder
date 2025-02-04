import { Pie, PieConfig } from "@ant-design/charts";
import { FC } from "react";
import { PieChartProps } from "../../../common/types/blocks";

const PieChart: FC<PieChartProps> = ({ data }) => {
  const config: PieConfig = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 1,
    label: {
      type: "spider",
      labelHeight: 28,
      content: "{name}\n{percentage}",
    },
    interactions: [{ type: "element-active" }],
  };
  return <Pie {...config} width={300} height={300} />;
};

export default PieChart;
