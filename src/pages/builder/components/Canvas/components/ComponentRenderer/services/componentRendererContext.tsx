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

// Context function for managing drag-and-drop functionality in a block
const Context = ({ id }: BuilderComponent) => {
  const cardRef = useRef<HTMLDivElement | null>(null); // Ref to track the card element
  const handleRef = useRef(null); // Ref to track the resize handle element

  const [isDragging, setIsDragging] = useState(false); // State to track if the card is being dragged
  const [closestEdge, setClosestEdge] = useState<Edge | null>(null); // State to track the closest edge while dragging
  const [size, setSize] = useState<{ width: number; height: number }>(); // State to store the size of the card
  const initialPosition = useRef({ x: 0, y: 0 }); // Initial position of the mouse for resizing
  const initialSize = useRef({ width: 0, height: 0 }); // Initial size of the card before resizing

  const {
    state: { isPreview },
    actions: { resizeBlock },
  } = useBuilderContext(); // Destructure resize action from builder context

  // UseEffect for setting up draggable and drop target behavior
  useEffect(() => {
    const element = cardRef.current;
    invariant(element); // Ensures element exists

    return combine(
      draggable({
        element, // Card element for dragging
        canDrag() {
          return !isPreview; // Allow dragging by default
        },
        getInitialData() {
          return { type: "block", id }; // Returns data when drag starts
        },
        onDragStart() {
          setIsDragging(true); // Set dragging state to true when dragging starts
        },
        onDrop() {
          setIsDragging(false); // Reset dragging state on drop
        },
      }),
      dropTargetForElements({
        element: element, // Card element as drop target
        getData: ({ input, element, source }) => {
          const data = { type: source.data.type, id }; // Prepare data for drop event
          return attachClosestEdge(data, {
            input,
            element,
            allowedEdges: ["left", "right"], // Allow only left and right edges for drop
          });
        },
        getIsSticky: () => true, // Set sticky property for drop
        onDragEnter: (args) => {
          if (args.self.data.type !== "resizing")
            setClosestEdge(extractClosestEdge(args.self.data)); // Extract closest edge during drag enter
        },
        onDrag: (args) => {
          if (args.self.data.type !== "resizing")
            setClosestEdge(extractClosestEdge(args.self.data)); // Update closest edge during drag
        },
        onDragLeave: () => {
          setClosestEdge(null); // Reset closest edge on drag leave
        },
        onDrop: () => {
          setClosestEdge(null); // Reset closest edge on drop
        },
      })
    );
  }, [id]); // Run this effect when `id` changes

  // UseEffect for setting up the draggable resize handle
  useEffect(() => {
    const handleElement = handleRef.current;
    invariant(handleElement); // Ensures handle element exists

    const cleanUp = draggable({
      element: handleElement, // Resize handle element for drag behavior
      onGenerateDragPreview({ nativeSetDragImage }) {
        disableNativeDragPreview({ nativeSetDragImage }); // Disable native drag preview
      },
      getInitialData() {
        return { type: "resizing", id }; // Return resizing data for drag
      },
      onDragStart: ({ location }) => {
        initialPosition.current = {
          x: location.current.input.pageX, // Set initial X position for resizing
          y: location.current.input.pageY, // Set initial Y position for resizing
        };
      },
      onDrag: ({ location }) => {
        const currentX = location.current.input.pageX; // Get current X position
        const currentY = location.current.input.pageY; // Get current Y position

        const dx = currentX - initialPosition.current.x; // Calculate X difference
        const dy = currentY - initialPosition.current.y; // Calculate Y difference

        setSize((prevSize) => {
          // Calculate new width and height during drag
          const width = Math.max(
            initialSize.current.width,
            (prevSize?.width || 0) + dx
          );
          const height = Math.max(
            initialSize.current.height,
            (prevSize?.height || 0) + dy
          );
          resizeBlock(id, width, height); // Call resize action from context
          return { width, height }; // Return new size
        });

        // Update initial position for smooth resizing
        initialPosition.current = { x: currentX, y: currentY };
      },
      onDrop: () => {
        // Resize stopped, additional logic can be added if needed
      },
    });

    return () => cleanUp(); // Cleanup draggable on component unmount
  }, []);

  // UseEffect to initialize size and position of the card
  useEffect(() => {
    const element = cardRef.current;
    if (element) {
      const rect = element.getBoundingClientRect(); // Get the card's bounding rect
      initialPosition.current = { x: rect.left, y: rect.top }; // Set initial position based on bounding rect
      initialSize.current = { width: rect.width, height: rect.height }; // Set initial size
      setSize({ width: rect.width, height: rect.height }); // Set initial size state
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
