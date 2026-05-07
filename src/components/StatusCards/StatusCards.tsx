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
import type { Board } from "@/types/card.types";
import { Button } from "../ui/button";

export default function StatusCards({ board }: { board: Board }) {
  return (
    <div className="details-list w-full h-64 grid grid-cols-3 gap-4">
      <Card className="h-64 bg-gray-50">
        <CardHeader className="border-b rounded-b-none border-black">
          <CardTitle className="w-full flex justify-between items-center">
            <div className="flex justify-start items-center gap-1">
              <h3>ToDo</h3>
              <CardDescription className="font-normal">Anzahl</CardDescription>
            </div>
            <CardAction>
              <Button variant="iconGhost" size="icon">
                <Plus className="size-5 stroke-[2.5]"></Plus>
              </Button>
            </CardAction>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {board.tasks
            .filter((t) => t.status === "ToDo")
            .map((t) => (
              <TaskCard key={t.id} task={t} />
            ))}
        </CardContent>
      </Card>
      <Card className="border h-64 bg-gray-50">
        <CardHeader className="border-b rounded-b-none border-black pb-2">
          <CardTitle className="w-full flex justify-between items-center">
            <div className="flex justify-start items-center gap-1">
              <h3>In Progress</h3>
              <CardDescription className="font-normal">Anzahl</CardDescription>
            </div>
            <CardAction>
              <Button variant="iconGhost" size="icon">
                <Plus className="size-5 stroke-2.5"></Plus>
              </Button>
            </CardAction>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          <p className="text-xs text-center">Keine Tasks vorhanden.</p>
          <div className="task-container"></div>
        </CardContent>
      </Card>
      <Card className="h-64 bg-gray-50">
        <CardHeader className="border-b rounded-b-none border-black pb-2">
          <CardTitle className="w-full flex justify-between items-center">
            <div className="flex justify-start items-center gap-1">
              <h3>Done</h3>
              <CardDescription className="font-normal">Anzahl</CardDescription>
            </div>
            <CardAction>
              <Button variant="iconGhost" size="icon">
                <Plus className="size-5 stroke-2.5"></Plus>
              </Button>
            </CardAction>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          <p className="text-xs text-center">Keine Tasks vorhanden.</p>
          <div className="task-container"></div>
        </CardContent>
      </Card>
    </div>
  );
}
