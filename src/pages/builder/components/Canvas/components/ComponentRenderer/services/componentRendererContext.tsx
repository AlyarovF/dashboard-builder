import React, {
  FC,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { BuilderComponent } from "../../../../../../../common/types/common";
import invariant from "tiny-invariant";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import {
  attachClosestEdge,
  Edge,
  extractClosestEdge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { disableNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/disable-native-drag-preview";
import useBuilderContext from "../../../../../services/builderContext";

const Context = ({ id }: BuilderComponent) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const handleRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);
  const [closestEdge, setClosestEdge] = useState<Edge | null>(null);
  const [size, setSize] = useState<{ width: number; height: number }>();
  const initialPosition = useRef({ x: 0, y: 0 });
  const initialSize = useRef({ width: 0, height: 0 });

  const {
    actions: { resizeBlock },
  } = useBuilderContext();

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
          return { type: "block", id };
        },
        onDragStart() {
          setIsDragging(true);
        },
        onDrop() {
          setIsDragging(false);
        },
      }),
      dropTargetForElements({
        element: element,
        getData: ({ input, element, source }) => {
          const data = { type: source.data.type, id };
          return attachClosestEdge(data, {
            input,
            element,
            allowedEdges: ["left", "right"],
          });
        },
        getIsSticky: () => true,
        onDragEnter: (args) => {
          if (args.self.data.type !== "resizing")
            setClosestEdge(extractClosestEdge(args.self.data));
        },
        onDrag: (args) => {
          if (args.self.data.type !== "resizing")
            setClosestEdge(extractClosestEdge(args.self.data));
        },
        onDragLeave: () => {
          setClosestEdge(null);
        },
        onDrop: () => {
          setClosestEdge(null);
        },
      })
    );
  }, [id]);

  useEffect(() => {
    const handleElement = handleRef.current;
    invariant(handleElement);

    const cleanUp = draggable({
      element: handleElement,
      onGenerateDragPreview({ nativeSetDragImage }) {
        disableNativeDragPreview({ nativeSetDragImage });
      },
      getInitialData() {
        return { type: "resizing", id };
      },
      onDragStart: ({ location }) => {
        initialPosition.current = {
          x: location.current.input.pageX,
          y: location.current.input.pageY,
        };
      },
      onDrag: ({ location }) => {
        const currentX = location.current.input.pageX;
        const currentY = location.current.input.pageY;

        const dx = currentX - initialPosition.current.x;
        const dy = currentY - initialPosition.current.y;

        setSize((prevSize) => {
          const width = Math.max(
            initialSize.current.width,
            (prevSize?.width || 0) + dx
          );
          const height = Math.max(
            initialSize.current.height,
            (prevSize?.height || 0) + dy
          );
          resizeBlock(id, width, height);
          return {
            width,
            height,
          };
        });

        // Update initial position to the current for smooth resizing
        initialPosition.current = { x: currentX, y: currentY };
      },
      onDrop: () => {
        // console.log("Resizing stopped");
      },
    });

    return () => cleanUp();
  }, []);

  useEffect(() => {
    const element = cardRef.current;
    if (element) {
      const rect = element.getBoundingClientRect();
      initialPosition.current = { x: rect.left, y: rect.top };
      initialSize.current = { width: rect.width, height: rect.height };
      setSize({ width: rect.width, height: rect.height });
    }
  }, []);

  return {
    state: { cardRef, isDragging, closestEdge, handleRef, size },
    actions: {},
  };
};

const ComponentRendererContext = createContext<any>({ state: {}, actions: {} });

export const ComponentRendererContextProvider: FC<{
  children: React.ReactNode;
  block: BuilderComponent;
}> = ({ children, block }) => {
  const value = Context(block);
  return (
    <ComponentRendererContext.Provider value={value}>
      {children}
    </ComponentRendererContext.Provider>
  );
};

export default function useComponentRendererContext() {
  return useContext<ReturnType<typeof Context>>(ComponentRendererContext);
}
