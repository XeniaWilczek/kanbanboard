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
import type { Task } from "@/types/card.types";
import { Button } from "../ui/button";
import { useState, type Dispatch } from "react";
import type { DetailAction } from "@/hooks/useDetailReducer";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "../ui/textarea";
import TaskDialog from "../TaskDialog/TaskDialog";
import { isBefore, startOfDay } from "date-fns";

export default function StatusCard({
  title,
  tasks,
  detailsDispatch,
}: {
  title: string;
  tasks: Task[];
  detailsDispatch: Dispatch<DetailAction>;
}) {
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [responsibility, setResponsibility] = useState("none");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState(new Date());
  const hasPassed = deadline
    ? isBefore(startOfDay(deadline), startOfDay(new Date()))
    : false;
  const [isEditTaskOpen, setIsEditTaskOpen] = useState(false);
  const [editTask, setEditTask] = useState<Task | undefined>();
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

  function handleDragLeave(_e: React.DragEvent<HTMLDivElement>) {
    setIsDraggingOver(false);
  }

  function handleDragEnter(_e: React.DragEvent<HTMLDivElement>) {
    setIsDraggingOver(true);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    const statusType = e.dataTransfer.types.find((type) =>
      type.startsWith("status-"),
    );
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

    const taskCard: Task = {
      id: String(Math.random()),
      title: newTaskTitle,
      status: title as "ToDo" | "InProgress" | "Done",
      description: description,
      responsibility: responsibility,
      deadline: deadline,
    };

    detailsDispatch({
      type: "CREATE_TASK",
      payload: { task: taskCard },
    });
    setNewTaskTitle("");
    setDescription("");
    setResponsibility("none");
    setDeadline(new Date());
  }

  function handleDeleteTaskClick(id: string) {
    detailsDispatch({ type: "DELETE_TASK", payload: { taskId: id } });
  }

  function handleEditTaskClick(task: Task) {
    setEditTask(task);
    setIsEditTaskOpen(true);
  }
  function handleUpdateTaskSubmit(updatedTask: Task) {
    detailsDispatch({
      type: "UPDATE_TASK",
      payload: { task: updatedTask },
    });
    setIsEditTaskOpen(false);
    setEditTask(undefined);
  }
  return (
    <>
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
                      className="placeholder:font-normal text-base"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
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
                      value={responsibility}
                      //Typabsicherung bei Select-Komponente
                      onValueChange={(value: string | null) =>
                        setResponsibility(value ?? "")
                      }
                    >
                      <SelectTrigger
                        id="task-responsibility"
                        name="task-responsibility"
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">---</SelectItem>
                        <SelectItem value="Niemand">Niemand</SelectItem>
                        <SelectItem value="Nutzer">Nutzer</SelectItem>
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
                            data-empty={!deadline}
                            className="justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
                          />
                        }
                      >
                        <CalendarIcon
                          className={`mr-2 h-4 w-4 ${hasPassed ? "text-destructive" : ""}`}
                        />
                        {deadline ? (
                          format(deadline, "dd.MM.yyyy")
                        ) : (
                          <span>Wähle ein Datum aus.</span>
                        )}
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={deadline}
                          onSelect={(date) => {
                            if (date) {
                              setDeadline(date);
                            }
                          }}
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
                    <DialogClose
                      render={
                        <Button
                          variant="cyan"
                          type="submit"
                          onClick={handleCreateTaskClick}
                        >
                          Erstellen
                        </Button>
                      }
                    />
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
                  onDelete={handleDeleteTaskClick}
                  onEdit={handleEditTaskClick}
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
      {editTask ? (
        <TaskDialog
          key={editTask.id ?? String(Math.random())}
          task={editTask}
          open={isEditTaskOpen}
          handleOpenChange={setIsEditTaskOpen}
          handleUpdateTaskSubmit={handleUpdateTaskSubmit}
        />
      ) : null}
    </>
  );
}
