import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@base-ui/react/button";
import { Plus } from "lucide-react";
import TaskCard from "../TaskCard/TaskCard";
import type { Board } from "@/types/card.types";

export default function StatusCards({ board }: { board: Board }) {
  return (
    <div className="details-list w-full h-64 grid grid-cols-3 gap-4">
      <Card className="border border-black rounded-md h-64 bg-gray-50">
        <CardHeader className="border-b border-black">
          <CardTitle className="w-full flex justify-between items-center">
            <div className="flex justify-start items-center gap-1">
              <h3 className="text-sm font-semibold">ToDo</h3>
              <CardDescription>Anzahl</CardDescription>
            </div>
            <CardAction>
              <Button className="hover:bg-cyan-50">
                <Plus size={16} strokeWidth={2.5}></Plus>
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
      <Card className="border border-black rounded-md h-64 bg-gray-50">
        <CardHeader className="border-b border-black pb-2">
          <CardTitle className="w-full flex justify-between items-center">
            <div className="flex justify-start items-center gap-1">
              <h3 className="text-sm font-semibold">In Progress</h3>
              <CardDescription>Anzahl</CardDescription>
            </div>
            <CardAction>
              <Button className="hover:bg-cyan-50">
                <Plus size={16} strokeWidth={2.5}></Plus>
              </Button>
            </CardAction>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          <p className="text-xs text-center">Keine Tasks vorhanden.</p>
          <div className="task-container"></div>
        </CardContent>
      </Card>
      <Card className="border border-black rounded-md h-64 bg-gray-50">
        <CardHeader className="border-b border-black pb-2">
          <CardTitle className="w-full flex justify-between items-center">
            <div className="flex justify-start items-center gap-1">
              <h3 className="text-sm font-semibold">Done</h3>
              <CardDescription>Anzahl</CardDescription>
            </div>
            <CardAction>
              <Button className="hover:bg-cyan-50">
                <Plus size={16} strokeWidth={2.5}></Plus>
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
