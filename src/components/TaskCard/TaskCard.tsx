import {
  Card,
  CardAction,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { Calendar, CircleUser, GripVertical, Trash2 } from "lucide-react";
import type { Task } from "@/types/card.types";
import { format } from "date-fns";

export default function TaskCard({
  task,
  onDelete,
  onEdit,
}: {
  task: Task;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}) {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData(`status-${task.status}`, "");
  };

  return (
    <Card
      className="task-card mx-4 p-4 flex flex-col gap-0.5 h-auto min-h-32"
      draggable={true}
      onDragStart={handleDragStart}
    >
      <CardHeader>
        <CardTitle className="w-full flex justify-between items-center hover:underline hover:cursor-pointer">
          <div className="flex justify-start items-center gap-4">
            <GripVertical className="size-4 text-muted-foreground hover:cursor-pointer"></GripVertical>
            <span onClick={() => onEdit(task)}>{task.title}</span>
          </div>
          <CardAction>
            <Button
              variant="iconGhost"
              size="icon"
              className="text-muted-foreground"
              onClick={(_e: React.MouseEvent<HTMLButtonElement>) => {
                onDelete(task.id);
              }}
            >
              <Trash2 className="text-muted-foreground size-4 stroke-[2.5]"></Trash2>
            </Button>
          </CardAction>
        </CardTitle>
      </CardHeader>
      <CardContent className="w-full text-muted-foreground flex flex-col gap-1 justify-start items-start">
        <p className="text-xs">{task.description}</p>
        <div className="flex gap-4 justify-center items-center">
          <CircleUser className="size-3"></CircleUser>
          <p className="text-xs">
            {task.responsibility && task.responsibility !== "none"
              ? task.responsibility
              : "Niemand"}
          </p>
        </div>
        <div className="flex justify-center items-center gap-2">
          <Calendar className="size-3"></Calendar>
          <p className="text-xs">
            {task.deadline
              ? format(new Date(task.deadline), "dd.MM.yyyy")
              : "Keine Frist"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
