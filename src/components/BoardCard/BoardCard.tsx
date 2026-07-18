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

export default function BoardCard({
  board,
  onDelete,
}: {
  board: Board;
  onDelete: (id: string) => void;
}) {
  return (
    <Link to={`/boardlist/${board.id}`}>
      <Card className="transition-shadow hover:shadow-md hover:cursor-pointer">
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle className="hover:underline">{board.title}</CardTitle>
            <CardAction>
              <Button
                variant="iconGhost"
                size="icon"
                onClick={(_e: React.MouseEvent<HTMLButtonElement>) => {
                  // Verhindert, dass der Link zur Detailansicht beim Anklicken des Löschen-Buttons ausgelöst wird
                  _e.preventDefault();
                  _e.stopPropagation();
                  onDelete(board.id);
                }}
              >
                <Trash2 className="size-4 stroke-[2.5] text-muted-foreground"></Trash2>
              </Button>
            </CardAction>
          </div>
          <CardDescription className="flex items-center gap-0.5 col-span-full">
            <span>3 Spalten</span>
            <Dot className="stroke-1.5 size-4"></Dot>
            <span>{board.tasks.length} Tasks</span>
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
