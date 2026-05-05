import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { CircleUser, GripVertical, Trash2 } from "lucide-react";

export default function TaskCard() {
  return (
    <Card className="task-card flex-col gap-2 border border-black rounded-md h-32 py-0">
      <CardHeader>
        <CardTitle className="w-full flex justify-between items-center">
          <div className="flex justify-start items-center gap-1">
            <CardDescription>
              <GripVertical
                size={16}
                className="hover:cursor-pointer"
              ></GripVertical>
            </CardDescription>
            <h3 className="text-sm font-semibold hover:underline hover:cursor-pointer">
              ToDo
            </h3>
          </div>
          <CardAction>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-destructive hover:bg-cyan-50"
            >
              <Trash2 size={14}></Trash2>
            </Button>
          </CardAction>
        </CardTitle>
      </CardHeader>
      <CardDescription className=" w-full flex flex-col gap-2 justify-start items-start">
        <span className="text-xs">Aufgabe</span>
        <div className="flex gap-2 justify-center items-center">
          <CircleUser size="12"></CircleUser>

          <span className="text-xs">Nutzer</span>
        </div>
        <span className="text-xs">Frist</span>
      </CardDescription>
    </Card>
  );
}
