import { StatisticProps } from "antd/es/statistic";
import type { TableProps as AntDTableProps } from "antd";

export interface StatisticsProps extends StatisticProps {
  style?: {
    width: number;
    height: number;
  };
}

export interface PieChartProps {
  title: string;
  data: { type: string; value: number }[];
  style?: {
    width: number;
    height: number;
  };
}

export interface LineChartProps {
  title: string;
  data: { year: string; value: number }[];
  style?: {
    width: number;
    height: number;
  };
}

export interface BarChartProps {
  title: string;
  data: { category: string; value: number }[];
  style?: {
    width: number;
    height: number;
  };
}

export interface TableProps extends AntDTableProps<unknown> {
  style?: {
    width: number;
    height: number;
  };
}

export interface PhotoProps {
  title: string;
  src: string;
  style?: {
    width: number;
    height: number;
  };
}
