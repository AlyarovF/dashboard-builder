import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { Button, Layout } from "antd";
import React, { useEffect, useRef, useState } from "react";
import invariant from "tiny-invariant";
import { COMPONENTS } from "../../../../common/constants/builder";
import { StyledMenu } from "./Sidebar.styles";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

const DraggableComponent: React.FC<{
  type: string;
  label: string;
  collapsed: boolean;
  icon: React.ReactNode;
}> = ({ type, label, collapsed, icon }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const element = cardRef.current;
    invariant(element);

    return combine(
      draggable({
        element,
        canDrag() {
          return true;
        },
        getInitialData() {
          return { type: "new-block", block_type: type };
        },
        onDragStart() {
          setIsDragging(true);
        },
        onDrop() {
          setIsDragging(false);
        },
      })
    );
  }, [type]);

  return (
    <div
      ref={cardRef}
      className={`draggable-component menu-item ${
        isDragging && "menu-item-dragging"
      } ${collapsed && "menu-item-collapsed"}`}
    >
      <div className="menu-item-icon">{icon}</div>
      <p className="menu-item-label">{label}</p>
    </div>
  );
};

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout.Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      width={250}
      trigger={null}
      style={{ backgroundColor: "white" }}
    >
      <StyledMenu direction="vertical" size={5}>
        {COMPONENTS?.map((component) => (
          <DraggableComponent
            key={component.type}
            type={component.type}
            label={component.label}
            collapsed={collapsed}
            icon={component.icon}
          />
        ))}
      </StyledMenu>
      <Button
        type="dashed"
        shape="circle"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: "16px",
          position: "absolute",
          width: "40px",
          height: "40px",
          right: "20px",
          bottom: 20,
        }}
      />
    </Layout.Sider>
  );
};

export default Sidebar;
