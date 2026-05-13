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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FieldLabel } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CalendarIcon, Plus } from "lucide-react";
import TaskCard from "../TaskCard/TaskCard";
import type { Board, Task } from "@/types/card.types";
import { Button } from "../ui/button";
import { useState, type Dispatch } from "react";
import type { DetailAction } from "@/hooks/useDetailReducer";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "../ui/textarea";

export default function StatusCard({
  title,
  tasks,
  detailsDispatch,
}: {
  title: string;
  tasks: Task[];
  detailsDispatch: Dispatch<DetailAction>;
}) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [responsibility, setResponsibility] = useState("none");

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
      //Funktion zum Ablegen eines Tasks in anderer Spalte hinzufügen
    }
  }
  function handleCreateTaskClick() {
    if (!newTaskTitle.trim()) return;
    //Task-Type bekommt zwei weitere EIgenschaften: responsibility und deadline
    const taskCard: Task = {
      id: String(Math.random()),
      title: newTaskTitle,
      status: title as "ToDo" | "InProgress" | "Done",
      description: "",
    };

    detailsDispatch({
      type: "CREATE_TASK",
      payload: { task: taskCard },
    });
    setNewTaskTitle("");
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
                  <Button variant="iconGhost" size="icon">
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
                    htmlFor="task-description"
                    className="text-sm font-semibold"
                  >
                    Beschreibung:
                  </Label>
                  <Textarea
                    id="task-description"
                    name="task-description"
                    placeholder="Was soll erledigt werden?"
                    //value={newTaskDescription}
                    //onChange={(e) => setNewTaskDescription(e.target.value)}
                    className="placeholder:font-normal text-base"
                  />
                </Field>
                <Field>
                  <Label
                    htmlFor="task-responsibility"
                    className="text-sm font-semibold"
                  >
                    Zugewiesen an:
                  </Label>
                  <Select
                  //useState hinzufügen
                  // onValueChange={(value) => setResponsibility(value)}
                  //value={responsibility}
                  >
                    <SelectTrigger
                      id="task-responsibility"
                      name="task-responsibility"
                    >
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="none">---</SelectItem>
                      <SelectItem value="Person 1">Person 1</SelectItem>
                      <SelectItem value="Person 2">Person 2</SelectItem>
                      <SelectItem value="Person 2">Person 3</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>

                <Field>
                  <FieldLabel
                    htmlFor="task-deadline"
                    className="text-sm font-semibold"
                  >
                    Deadline:
                  </FieldLabel>
                  <Popover>
                    <PopoverTrigger
                      render={
                        <Button
                          variant="outline"
                          data-empty={!new Date()}
                          className="justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
                        />
                      }
                    >
                      <CalendarIcon />
                      {new Date() ? (
                        format(new Date(), "dd.MM.yyyy")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={new Date()}
                        //onSelect={}
                      />
                    </PopoverContent>
                  </Popover>
                </Field>
                <DialogFooter>
                  <DialogClose
                    render={
                      <Button variant="outline" className="hover:bg-cyan-50">
                        Abbrechen
                      </Button>
                    }
                  />
                  <DialogClose>
                    <Button
                      variant="cyan"
                      type="submit"
                      onClick={handleCreateTaskClick}
                    >
                      Erstellen
                    </Button>
                  </DialogClose>
                </DialogFooter>
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
