import { Card } from "antd";
import styled from "styled-components";

export const StyledCard = styled(Card)`
  cursor: "pointer";
  position: "relative";
  .resizer {
    position: absolute;
    width: 16px;
    height: 16px;
    bottom: 1px;
    right: 1px;
    cursor: se-resize;
    border-bottom-right-radius: 8px;
    border: 2px dotted #aaaaaa;
    border-top: transparent;
    border-left: transparent;
  }
`;
