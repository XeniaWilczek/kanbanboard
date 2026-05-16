import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { CalendarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "../ui/textarea";
import type { Task } from "@/types/card.types";
import { isBefore, startOfDay } from "date-fns";

export default function TaskDialog({
  task,
  open,
  handleOpenChange,
  handleUpdateTaskSubmit,
}: {
  task: Task;
  open: boolean;
  handleOpenChange: (open: boolean) => void;
  handleUpdateTaskSubmit: (updatedTask: Task) => void;
}) {
  const [newTaskTitle, setNewTaskTitle] = useState<string>(task.title);
  const [responsibility, setResponsibility] = useState<string>(
    task.responsibility ?? "none",
  );
  const [description, setDescription] = useState<string>(
    task.description ?? "",
  );
  const [deadline, setDeadline] = useState<Date>(
    task.deadline ? new Date(task.deadline) : new Date(),
  );
  const hasPassed = deadline
    ? isBefore(startOfDay(deadline), startOfDay(new Date()))
    : false;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold">
            Task bearbeiten:
          </DialogTitle>
          <DialogDescription className="text-xs">
            Bearbeite die ausgewählte Aufgabe.
          </DialogDescription>
        </DialogHeader>
        <Field>
          <Label htmlFor="taskname" className="text-sm font-semibold">
            Taskname:
          </Label>
          <Input
            id="taskname"
            name="taskname"
            placeholder="Tasknamen bearbeiten"
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            className="placeholder: font-normal text-base"
          />
        </Field>
        <Field>
          <Label htmlFor="task-description" className="text-sm font-semibold">
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
            <SelectTrigger id="task-responsibility" name="task-responsibility">
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
          <FieldLabel htmlFor="task-deadline" className="text-sm font-semibold">
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
                onClick={() => {
                  handleUpdateTaskSubmit({
                    ...task,
                    title: newTaskTitle,
                    description: description,
                    responsibility: responsibility,
                    deadline: deadline,
                  });
                }}
              >
                Aktualisieren
              </Button>
            }
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
