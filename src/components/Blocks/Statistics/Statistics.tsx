import { Statistic } from "antd";
import { FC } from "react";
import { StatisticsProps } from "../../../common/types/blocks";
import { ArrowUpOutlined } from "@ant-design/icons";

const Statistics: FC<StatisticsProps> = (props) => {
  return <Statistic {...props} prefix={<ArrowUpOutlined />} />;
};

export default Statistics;
