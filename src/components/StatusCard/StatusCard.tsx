import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus } from "lucide-react";
import TaskCard from "../TaskCard/TaskCard";
import type { Task } from "@/types/card.types";
import { Button } from "../ui/button";
import { useState } from "react";

export default function StatusCard({
  title,
  tasks,
}: {
  title: string;
  tasks: Task[];
}) {
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  function handleDragOver(e: { preventDefault: () => void }) {
    e.preventDefault();
    setIsDraggingOver(true);
  }
  const handleDragLeave = (e) => {
    setIsDraggingOver(false);
  };
  const handleDragEnter = (e) => {
    setIsDraggingOver(true);
  };
  const handleDrop = (e) => {
    const id = parseInt(e.dataTransfer.getData("id"), 10);
    setIsDraggingOver(false);
  };

  return (
    //verhindern, dass man dasselbe Task-Element erneut in dieselbe StatusCard schieben kann
    <Card
      className={`w-full h-auto bg-gray-50 ${isDraggingOver ? "border border-dashed border-cyan-400 rounded-md" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDragEnter={handleDragEnter}
      onDrop={handleDrop}
    >
      <CardHeader className="border-b rounded-b-none border-black">
        <CardTitle className="w-full flex justify-between items-center">
          <div className="flex justify-start items-center gap-1">
            <span>{title}</span>
            <CardDescription className="font-normal">
              ({tasks.length})
            </CardDescription>
          </div>
          <Button variant="ghost" size="icon">
            <Plus className="size-5 stroke-[2.5]" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 flex flex-col gap-3">
        {tasks.length === 0 && !isDraggingOver && (
          <div className="text-sm text-gray-400 text-center py-6 font-medium">
            Keine Tasks vorhanden.
          </div>
        )}
        {tasks.length > 0 && (
          <div className="flex flex-col gap-2">
            {tasks.map((t) => (
              <TaskCard key={t.id} task={t} />
            ))}
          </div>
        )}
        {isDraggingOver && (
          <div className="w-full h-20 flex items-center justify-center text-sm font-semibold text-cyan-400 border border-dashed border-cyan-400 rounded-md bg-cyan-100/70 animate-pulse">
            Hier ablegen
          </div>
        )}
      </CardContent>
    </Card>
  );
}
