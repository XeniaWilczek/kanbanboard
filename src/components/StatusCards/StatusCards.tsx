import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@base-ui/react/button";
import { Plus } from "lucide-react";
import TaskCard from "../TaskCard/TaskCard";

export default function StatusCards() {
  return (
    <div className="details-list w-full h-64 grid grid-cols-3 gap-4 bg-amber-600">
      <Card className="border border-black rounded-md h-64">
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
        <TaskCard></TaskCard>
      </Card>
      <Card className="border border-black rounded-md h-64">
        <CardHeader className="border-b border-black pb-2">
          <CardTitle className="w-full flex justify-between items-center">
            <div className="flex justify-start items-center gap-1">
              <h3 className="text-sm font-semibold">In Bearbeitung</h3>
              <CardDescription>Anzahl</CardDescription>
            </div>
            <CardAction>
              <Button className="hover:bg-cyan-50">
                <Plus size={16} strokeWidth={2.5}></Plus>
              </Button>
            </CardAction>
          </CardTitle>
        </CardHeader>
        <CardDescription>
          <p className="text-xs text-center">Keine Tasks vorhanden.</p>
          <div></div>
        </CardDescription>
      </Card>
      <Card className="border border-black rounded-md h-64">
        <CardHeader className="border-b border-black pb-2">
          <CardTitle className="w-full flex justify-between items-center">
            <div className="flex justify-start items-center gap-1">
              <h3 className="text-sm font-semibold">Erledigt</h3>
              <CardDescription>Anzahl</CardDescription>
            </div>
            <CardAction>
              <Button className="hover:bg-cyan-50">
                <Plus size={16} strokeWidth={2.5}></Plus>
              </Button>
            </CardAction>
          </CardTitle>
        </CardHeader>
        <CardDescription>
          <p className="text-xs text-center">Keine Tasks vorhanden.</p>
          <div></div>
        </CardDescription>
      </Card>
    </div>
  );
}
