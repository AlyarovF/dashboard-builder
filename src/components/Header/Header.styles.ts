import { Layout } from "antd";
import styled from "styled-components";

export const StyledHeader = styled(Layout.Header)`
  padding: 0px;
  background-color: white;
  border-block-end: 1px solid #f5f5f5;
  display: flex;
  align-items: center;
  .fido-container {
    width: 250px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #064f96;
    height: 100%;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    .fido-title {
      color: white;
      margin: 0;
      cursor: pointer;
    }
    &:hover {
      background-color: rgb(9, 96, 184);
    }
  }
  .header {
    width: calc(100% - 250px);
    padding: 0px 20px;
  }
`;
