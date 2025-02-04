import { Layout, Space } from "antd";
import styled from "styled-components";

export const Container = styled(Layout.Content)`
  user-select: "none";
  overflow-y: scroll;
  position: relative;
  padding: 10px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
  transition: all 0.3s ease-in-out;
`;

export const StyledSpace = styled(Space)`
  position: absolute;
  bottom: 20px;
  right: 20px;
`;
