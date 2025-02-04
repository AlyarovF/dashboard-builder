import {
  faEdit,
  faEye,
  faFloppyDisk,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FloatButton, Layout, Tooltip } from "antd";
import React from "react";
import Canvas from "../components/Canvas/ui";
import Sidebar from "../components/Sidebar/Sidebar";
import useBuilderContext from "../services/builderContext";
import { Container } from "./Builder.styles";

const Builder: React.FC = () => {
  const {
    state: { containerRef, isDraggedOver, isPreview },
    actions: {
      handleSubmit,
      handlePreview,
      handleClosePreview,
      handleDeleteAll,
    },
  } = useBuilderContext();
  return (
    <Layout ref={containerRef} style={{ position: "relative" }}>
      {!isPreview && <Sidebar />}
      <Container
        style={{
          height: "calc(100vh - 70px)",
          backgroundColor: isDraggedOver ? "#e9e9e9" : "transparent",
        }}
      >
        <Canvas />
      </Container>
      <FloatButton.Group
        shape="square"
        style={{ insetInlineEnd: 20, bottom: 20 }}
      >
        <Tooltip title={isPreview ? "Edit" : "Preview"} placement="left">
          <FloatButton
            icon={<FontAwesomeIcon icon={isPreview ? faEdit : faEye} />}
            onClick={isPreview ? handleClosePreview : handlePreview}
          />
        </Tooltip>
        {!isPreview && (
          <>
            <Tooltip title="Delete all" placement="left">
              <FloatButton
                icon={<FontAwesomeIcon icon={faTrash} />}
                onClick={handleDeleteAll}
              />
            </Tooltip>
            <Tooltip title="Save" placement="left">
              <FloatButton
                type="primary"
                icon={<FontAwesomeIcon icon={faFloppyDisk} />}
                onClick={handleSubmit}
              />
            </Tooltip>
          </>
        )}
      </FloatButton.Group>
    </Layout>
  );
};

export default Builder;
