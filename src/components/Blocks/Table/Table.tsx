import { Table as AntDTable } from "antd";
import { FC } from "react";
import { TableProps } from "../../../common/types/blocks";

const Table: FC<TableProps> = (props) => {
  return <AntDTable {...props} />;
};

export default Table;
