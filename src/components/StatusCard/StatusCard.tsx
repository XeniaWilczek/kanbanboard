import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Select } from "@/components/ui/select";
import { Field } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import TaskCard from "../TaskCard/TaskCard";
import type { Board, Task } from "@/types/card.types";
import { Button } from "../ui/button";
import { useState } from "react";
import type { DetailAction } from "@/hooks/useDetailReducer";
import type { text } from "stream/consumers";

export default function StatusCard({
  title,
  tasks,
  detailDispatch,
}: {
  title: string;
  tasks: Task[];
  detailDispatch: DetailAction;
}) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const taskCard: Task = {
    id: String(Math.random()),
    title: newTaskTitle,
    status: "ToDo" | "InProgress" | "Done",
    description: "",
  };

  const [isDraggingOver, setIsDraggingOver] = useState(false);

  function isTaskInTasks(status: string): boolean {
    return status.toLowerCase() === title.toLowerCase();
  }

  function handleDraggingOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();

    //Es wird nach dem key gesucht, statt nach dem Value
    const statusType = e.dataTransfer.types.find((type) =>
      type.startsWith("status-"),
    );

    if (!statusType) return;

    const taskStatus = statusType.replace("status-", "");
    console.log(statusType);

    if (isTaskInTasks(taskStatus)) {
      setIsDraggingOver(false);
    } else {
      setIsDraggingOver(true);
    }
  }

  function handleDragLeave(e: React.DragEvent<HTMLDivElement>) {
    setIsDraggingOver(false);
  }

  function handleDragEnter(e: React.DragEvent<HTMLDivElement>) {
    setIsDraggingOver(true);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    const statusType = e.dataTransfer.types.find((type) =>
      type.startsWith("status-"),
    );
    console.log(statusType);
    if (!statusType) return;

    const taskStatus = statusType.replace("status-", "");
    console.log(statusType);
    if (isTaskInTasks(taskStatus)) {
      setIsDraggingOver(false);
    } else {
      //Call funktion to move task to this column
    }
  }
  function handleCreateTaskClick() {
    detailsDispatch({
      type: "CREATE_TASK",
      payload: { title: boardName },
    });
  }
  function handleDeleteTaskClick() {}

  return (
    <Card
      className={`w-full h-auto bg-gray-50 ${isDraggingOver ? "border border-dashed border-cyan-400 rounded-md" : ""}`}
      onDragOver={handleDraggingOver}
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
          <CardAction>
            <Dialog>
              <DialogTrigger
                render={
                  <Button
                    variant="iconGhost"
                    size="icon"
                    onClick={handleCreateTaskClick}
                  >
                    <Plus className="size-5 stroke-[2.5]" />
                  </Button>
                }
              ></DialogTrigger>
              <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                  <DialogTitle className="text-base font-semibold">
                    Neuen Task erstellen:
                  </DialogTitle>
                  <DialogDescription className="text-xs">
                    Erstelle eine neue Aufgabe für diese Spalte.
                  </DialogDescription>
                </DialogHeader>
                <Field>
                  <Label htmlFor="taskname" className="text-sm font-semibold">
                    Taskname:
                  </Label>
                  <Input
                    id="taskname"
                    name="taskname"
                    placeholder="Tasknamen erstellen"
                    type="text"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    className="placeholder: font-normal text-base"
                  />
                </Field>
                <Field>
                  <Label
                    htmlFor="taskdescription"
                    className="text-sm font-semibold"
                  >
                    Beschreibung:
                  </Label>
                  <Input
                    id="taskdescription"
                    name="taskdescription"
                    placeholder="Was soll erledigt werden?"
                    type="text"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    className="placeholder: font-normal text-base"
                  />
                </Field>
                <Field>
                  <Label
                    htmlFor="responsibility"
                    className="text-sm font-semibold"
                  >
                    Zugewiesen an:
                  </Label>
                  <Select
                    id="responsibility"
                    name="boardname"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    className="placeholder: font-normal text-base"
                  />
                </Field>
                <Field>
                  <Label
                    htmlFor="boardname-1"
                    className="text-sm font-semibold"
                  >
                    Boardname:
                  </Label>
                  <Input
                    id="boardname-1"
                    name="boardname"
                    placeholder="Board-Name"
                    value={newBoardTitle}
                    onChange={(e) => setNewBoardTitle(e.target.value)}
                    className="placeholder: font-normal text-base"
                  />
                </Field>
              </DialogContent>
            </Dialog>
          </CardAction>
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
              <TaskCard
                key={t.id}
                task={t}
                handleDeleteTaskClick={function (): void {
                  throw new Error("Function not implemented.");
                }}
                detailDispatch={{
                  type: "UPDATE_TITLE",
                  payload: {
                    title: "",
                  },
                }}
              />
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
