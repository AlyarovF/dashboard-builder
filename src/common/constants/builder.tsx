import {
  faArrowUpRightDots,
  faChartBar,
  faChartPie,
  faLineChart,
  faPhotoFilm,
  faTable,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BuilderComponent, COMPONENT_TYPES } from "../types/common";

export const COMPONENTS: BuilderComponent[] = [
  {
    id: "1",
    type: COMPONENT_TYPES.STATISTICS,
    icon: <FontAwesomeIcon icon={faArrowUpRightDots} />,
    label: "Statistic",
    props: {
      title: "Active",
      value: 11.28,
      precision: 2,
      valueStyle: { color: "#3f8600" },
      suffix: "%",
    },
  },
  {
    id: "2",
    type: COMPONENT_TYPES.PIE_CHART,
    icon: <FontAwesomeIcon icon={faChartPie} />,
    label: "Pie Chart",
    props: {
      title: "User Distribution",
      data: [
        { type: "A", value: 400 },
        { type: "B", value: 300 },
        { type: "C", value: 300 },
      ],
    },
  },
  {
    id: "3",
    type: COMPONENT_TYPES.LINE_CHART,
    icon: <FontAwesomeIcon icon={faLineChart} />,
    label: "Line Chart",
    props: {
      title: "User Growth",
      data: [
        { year: "1991", value: 3 },
        { year: "1992", value: 4 },
        { year: "1993", value: 3.5 },
        { year: "1994", value: 5 },
        { year: "1995", value: 4.9 },
        { year: "1996", value: 6 },
        { year: "1997", value: 7 },
        { year: "1998", value: 9 },
        { year: "1999", value: 13 },
      ],
    },
  },
  {
    id: "4",
    type: COMPONENT_TYPES.BAR_CHART,
    icon: <FontAwesomeIcon icon={faChartBar} />,
    label: "Bar Chart",
    props: {
      title: "Product Sales",
      data: [
        { category: "A", value: 100 },
        { category: "B", value: 300 },
        { category: "C", value: 200 },
      ],
    },
  },
  {
    id: "5",
    type: COMPONENT_TYPES.TABLE,
    icon: <FontAwesomeIcon icon={faTable} />,
    label: "Table",
    props: {
      columns: [
        { title: "Name", dataIndex: "name" },
        { title: "Age", dataIndex: "age" },
        { title: "Address", dataIndex: "address" },
      ],
      dataSource: [
        {
          key: "1",
          name: "John Brown",
          age: 32,
          address: "New York No. 1 Lake Park",
        },
        {
          key: "2",
          name: "Jim Green",
          age: 42,
          address: "London No. 1 Lake Park",
        },
        {
          key: "3",
          name: "Joe Black",
          age: 32,
          address: "Sidney No. 1 Lake Park",
        },
      ],
    },
  },
  {
    id: "6",
    type: COMPONENT_TYPES.PHOTO,
    icon: <FontAwesomeIcon icon={faPhotoFilm} />,
    label: "Photo",
    props: {
      title: "Photo Gallery",
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv2X0sN17jO4yNiNPuPIUOEvh_OSUT_WjBjg&s",
    },
  },
];
