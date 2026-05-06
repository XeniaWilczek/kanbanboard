import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Board } from "@/types/card.types";
import { Dot, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function BoardCard({ board }: { board: Board }) {
  return (
    <Link to={`/boardlist/${board.id}`}>
      <Card className="transition-shadow hover:shadow-md hover:cursor-pointer">
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle className="hover:underline">{board.title}</CardTitle>
            <CardAction>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-destructive hover:bg-cyan-50"
              >
                <Trash2 className="size-4"></Trash2>
              </Button>
            </CardAction>
          </div>
          <CardDescription className="flex items-center gap-0.5 col-span-full text-xs">
            <span>3 Spalten</span>
            <Dot strokeWidth={1.5} size={16}></Dot>
            <span>{board.tasks.length} Tasks</span>
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
