import { useContext, useState, type JSXElementConstructor, type ReactElement, type ReactNode, type ReactPortal } from "react";
import DraggableCard from "./DraggabelCard";
import type { JSX } from "react/jsx-runtime";

const Dropzone = (props: { status: any; }) => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const context = useContext(AppContext);

  const handleDragEnter = (e) => {
    setIsDraggingOver(true);
  };

  const handleDragLeave = (e) => {
    setIsDraggingOver(false);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };
  const handleDragEnd = (e) => {
    setIsDraggingOver(false);
    context.changeCardStatus(IdleDeadline, props.status);
  };
  const handleDrop = (e) => {
    const id = parseInt(e.dataTransfer.getData("id"), 10);
    setIsDraggingOver(false);
    context.changeCardStatus(id, props.status);
  };

  return (
    <div
      className={`dropzone ${isDraggingOver ? "is-dragging" : ""}`}
      onDrop={(e) => handleDrop(e)}
      onDragOver={(e) => handleDragOver(e)}
      onDragEnter={(e) => handleDragEnter(e)}
      onDragLeave={(e) => handleDragLeave(e)}
      onDragEnd={(e) => handleDragEnd(e)}
    >
{context.cards.filter((card: { status: any; })=>card.status===props.status).map((card: JSX.IntrinsicAttributes & { id: string; name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; })=>(<DraggableCard key={card.id}{...card}></Card>))}

    </div>
  );
};
export default Dropzone;
