import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dot, Trash2 } from "lucide-react";

export default function BoardCard() {
  return (
    <Card className="flex flex-col gap-2 sborder border-black rounded-md transition-shadow hover:shadow-md hover:cursor-pointer">
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-sm font-semibold hover:underline">
          Board-Name
        </CardTitle>
        <CardAction>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-destructive hover:bg-cyan-50"
          >
            <Trash2 size={16}></Trash2>
          </Button>
        </CardAction>
      </CardHeader>
      <CardDescription className="flex justify-start items-center gap-0.5 text-xs px-6 pt-1">
        <span>3 Spalten</span>
        <Dot strokeWidth={1.5} size={16}></Dot>
        <span>0 Tasks</span>
      </CardDescription>
    </Card>
  );
}
