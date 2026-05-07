import type {
  DragEvent,
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  ReactPortal,
} from "react";

export default function DraggableCard() {
  
}) => {
  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("id", props.id);
  };

  return (
    <div
      draggable={true}
      className="draggableCard"
      onDragStart={(e) => {
        handleDragStart(e);
      }}
    >
      {props.name}
    </div>
  );
};


