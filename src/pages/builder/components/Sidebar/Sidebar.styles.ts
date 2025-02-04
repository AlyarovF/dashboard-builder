import { Space } from "antd";
import styled from "styled-components";

export const StyledMenu = styled(Space)`
  height: 100%;
  width: 100%;
  padding: 5px;
  .menu-item {
    padding: 15px;
    cursor: pointer;
    border-radius: 5px;
    transition: all 0.3s ease-in-out;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
    &:hover {
      background-color: #f0f0f0;
    }
    .menu-item-icon {
      color: #0c539b;
    }
    .menu-item-label {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .menu-item-collapsed {
    justify-content: center;
    gap: 0px;
    .menu-item-label {
      opacity: 0;
      width: 0;
    }
  }
`;
