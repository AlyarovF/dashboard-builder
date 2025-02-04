import { autoScrollForElements } from "@atlaskit/pragmatic-drag-and-drop-auto-scroll/element";
import { extractClosestEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { getReorderDestinationIndex } from "@atlaskit/pragmatic-drag-and-drop-hitbox/util/get-reorder-destination-index";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import {
  BaseEventPayload,
  ElementDragType,
} from "@atlaskit/pragmatic-drag-and-drop/dist/types/internal-types";
import {
  dropTargetForElements,
  monitorForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { reorder } from "@atlaskit/pragmatic-drag-and-drop/reorder";
import { message } from "antd";
import React, {
  FC,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import invariant from "tiny-invariant";
import { v4 } from "uuid";
import { COMPONENTS } from "../../../common/constants/builder";
import { BuilderComponent } from "../../../common/types/common";

// Context for managing builder state and actions
const Context = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Initialize state with saved blocks from localStorage
  const [blocks, setBlocks] = useState<BuilderComponent[]>(
    JSON.parse(localStorage.getItem("blocks") || "[]")
  );
  const [isDraggedOver, setIsDraggedOver] = useState(false);
  const [isPreview, setIsPreview] = useState(false);

  // Add a new component to the builder
  const addComponent = useCallback(
    ({
      type,
      destinationIndex,
    }: {
      type: BuilderComponent["type"];
      destinationIndex: number;
    }) => {
      const foundBlock: BuilderComponent | undefined = COMPONENTS.find(
        (component) => component.type === type
      );
      if (foundBlock) {
        const newBlock = { ...foundBlock, id: v4(), icon: undefined };
        setBlocks((prev) => {
          let updatedBlocks = [...prev];
          if (prev.length > 0) {
            updatedBlocks.splice(destinationIndex, 0, newBlock);
          } else {
            updatedBlocks = [newBlock];
          }
          return updatedBlocks;
        });
      } else message.error("Component not found");
    },
    [setBlocks]
  );

  // Reorder blocks within the builder
  const reorderBlock = useCallback(
    ({
      startIndex,
      finishIndex,
    }: {
      startIndex: number;
      finishIndex: number;
    }) => {
      const updatedBlocks = reorder({
        list: blocks,
        startIndex,
        finishIndex,
      });

      setBlocks(updatedBlocks);
    },
    [blocks]
  );

  // Resize a specific block by updating its width and height
  const resizeBlock = useCallback(
    (id: string, width: number, height: number) => {
      const foundBlock = blocks.find((block) => block.id === id);
      if (foundBlock) {
        const updatedBlock = {
          ...foundBlock,
          props: {
            ...foundBlock.props,
            style: {
              width,
              height,
            },
          },
        } as BuilderComponent;
        setBlocks((prev) =>
          prev.map((block) => (block.id === id ? updatedBlock : block))
        );
      }
    },
    [blocks, setBlocks]
  );

  // Handle dropping of new or existing blocks in the builder
  const handleDrop = useCallback(
    ({ source, location }: BaseEventPayload<ElementDragType>) => {
      const destination = location.current.dropTargets.length;
      if (!destination) return;

      const draggedBlockId = source.data.id;
      const draggedBlockIndex = blocks.findIndex(
        (block) => block.id === draggedBlockId
      );

      if (source.data.type === "new-block") {
        const blockType = source.data.block_type as BuilderComponent["type"];

        if (location.current.dropTargets.length === 2) {
          const [destinationBlockRecord] = location.current.dropTargets;
          const destinationBlock = destinationBlockRecord.data;
          const destinationBlockId = destinationBlock.id;

          const indexOfTarget = blocks.findIndex(
            (card) => card.id === destinationBlockId
          );

          const closestEdgeOfTarget = extractClosestEdge(destinationBlock);

          const destinationIndex =
            closestEdgeOfTarget === "right" ? indexOfTarget + 1 : indexOfTarget;
          addComponent({ type: blockType, destinationIndex });
          return;
        }

        addComponent({ type: blockType, destinationIndex: blocks.length - 1 });
      }

      if (source.data.type === "block") {
        if (location.current.dropTargets.length === 1) {
          const destinationIndex = getReorderDestinationIndex({
            startIndex: draggedBlockIndex,
            indexOfTarget: blocks.length - 1,
            closestEdgeOfTarget: null,
            axis: "horizontal",
          });
          reorderBlock({
            startIndex: draggedBlockIndex,
            finishIndex: destinationIndex,
          });
          return;
        }

        if (location.current.dropTargets.length === 2) {
          const [destinationBlockRecord] = location.current.dropTargets;
          const destinationBlock = destinationBlockRecord.data;
          const destinationBlockId = destinationBlock.id;

          const indexOfTarget = blocks.findIndex(
            (card) => card.id === destinationBlockId
          );

          const closestEdgeOfTarget = extractClosestEdge(destinationBlock);

          const destinationIndex = getReorderDestinationIndex({
            startIndex: draggedBlockIndex,
            indexOfTarget,
            closestEdgeOfTarget,
            axis: "horizontal",
          });

          reorderBlock({
            startIndex: draggedBlockIndex,
            finishIndex: destinationIndex,
          });
          return;
        }
      }
    },
    [reorderBlock, blocks, addComponent]
  );

  // Toggle active state of a block
  const handleActiveBlock = useCallback(
    (id: string) => {
      setBlocks((prev) =>
        prev.map((block) => ({
          ...block,
          active: block.id === id ? !block.active : false,
        }))
      );
    },
    [setBlocks]
  );

  // Delete a specific block
  const handleDeleteBlock = useCallback(
    (id: string) => {
      setBlocks((prev) => prev.filter((block) => block.id !== id));
    },
    [setBlocks]
  );

  // Duplicate a specific block
  const handleDuplicateBlock = useCallback(
    (id: string) => {
      const foundBlockIndex = blocks.findIndex((block) => block.id === id);
      const newBlock = { ...blocks[foundBlockIndex], id: v4(), active: false };
      setBlocks((prev) => {
        const updatedBlocks = [...prev];
        updatedBlocks.splice(foundBlockIndex + 1, 0, newBlock);
        return updatedBlocks;
      });
    },
    [setBlocks, blocks]
  );

  // Save blocks to localStorage
  const handleSubmit = useCallback(() => {
    localStorage.setItem("blocks", JSON.stringify(blocks));
    message.success("Saved successfully");
  }, [blocks]);

  // Preview handlers
  const handlePreview = () => setIsPreview(true);
  const handleClosePreview = () => setIsPreview(false);

  // Delete all blocks
  const handleDeleteAll = () => setBlocks([]);

  // Initialize drag-and-drop functionality and auto-scroll
  useEffect(() => {
    const container = containerRef.current;
    invariant(container);

    return combine(
      monitorForElements({
        onDrop: handleDrop,
        canMonitor: () => !isPreview,
      }),
      dropTargetForElements({
        element: container,
        onDragStart: () => setIsDraggedOver(true),
        onDragEnter: () => setIsDraggedOver(true),
        onDragLeave: () => setIsDraggedOver(false),
        onDrop: () => setIsDraggedOver(false),
        getData: () => ({ id: "container" }),
        canDrop: () => !isPreview,
      }),
      autoScrollForElements({
        element: container,
        getConfiguration: () => ({
          maxScrollSpeed: "fast",
        }),
      })
    );
  }, [handleDrop, isPreview]);

  return {
    state: { blocks, containerRef, isDraggedOver, isPreview },
    actions: {
      handleActiveBlock,
      handleDeleteBlock,
      handleDuplicateBlock,
      handleSubmit,
      handlePreview,
      handleClosePreview,
      handleDeleteAll,
      resizeBlock,
    },
  };
};

const BuilderContext = createContext<any>({ state: {}, actions: {} });

export const BuilderContextProvider: FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const value = Context();
  return (
    <BuilderContext.Provider value={value}>{children}</BuilderContext.Provider>
  );
};

export default function useBuilderContext() {
  return useContext<ReturnType<typeof Context>>(BuilderContext);
}
