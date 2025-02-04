import { StatisticProps } from "antd";
import {
  BarChartProps,
  LineChartProps,
  PhotoProps,
  PieChartProps,
  StatisticsProps,
  TableProps,
} from "./blocks";

export enum COMPONENT_TYPES {
  STATISTICS = "statistics",
  PIE_CHART = "pie-chart",
  LINE_CHART = "line-chart",
  BAR_CHART = "bar-chart",
  TABLE = "table",
  PHOTO = "photo",
}

type BuilderComponentBase = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  active?: boolean;
  children?: BuilderComponent[];
};

export type BuilderComponent = BuilderComponentBase &
  (
    | {
        type: COMPONENT_TYPES.STATISTICS;
        props: StatisticsProps;
      }
    | {
        type: COMPONENT_TYPES.PIE_CHART;
        props: PieChartProps;
      }
    | {
        type: COMPONENT_TYPES.LINE_CHART;
        props: LineChartProps;
      }
    | {
        type: COMPONENT_TYPES.BAR_CHART;
        props: BarChartProps;
      }
    | {
        type: COMPONENT_TYPES.TABLE;
        props: TableProps;
      }
    | {
        type: COMPONENT_TYPES.PHOTO;
        props: PhotoProps;
      }
  );
