import { Plus } from "lucide-react";
import BoardCard from "../../components/BoardCard/BoardCard";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import type { Board } from "@/types/card.types";
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
import { Field } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function BoardList() {
  const [boards, setBoards] = useState<Board[]>([
    {
      id: "1",
      title: "Test",
      tasks: [
        {
          id: "1",
          title: "Testtitle",
          status: "ToDo",
          description: "Testdescription",
        },
      ],
    },
  ]);

  const [newBoardTitle, setNewBoardTitle] = useState("");

  function handleCreateBoardClick() {
    if (newBoardTitle.trim().length === 0) return;

    const newBoard: Board = {
      id: String(Math.random()),
      title: newBoardTitle,
      tasks: [],
    };

    setBoards((prevBoards) => [...prevBoards, newBoard]);
    setNewBoardTitle("");
  }

  //Hinzufügen: p-Element "Noch keine Boards vorhanden", wenn die Liste leer ist
  //Update im LocalStorage nach Erstellen eines Boards hinzufügen
  //Popup soll sich nach dem Erstellen autmatisch schließen
  return (
    <>
      <div className="board-overview w-[80vw] h-auto mx-auto pt-6 flex flex-col gap-4">
        <div className="board-heading-and-button w-full flex justify-between items-center">
          <h1 className="text-2xl font-bold">Meine Boards</h1>
          <Dialog>
            <DialogTrigger
              render={
                <Button variant="cyan">
                  <Plus className="size-4 stroke-[2.5]"></Plus>
                  <span>Neues Board</span>
                </Button>
              }
            />
            <DialogContent className="sm:max-w-sm">
              <DialogHeader>
                <DialogTitle className="text-base font-semibold">
                  Neues Board erstellen:
                </DialogTitle>
                <DialogDescription className="text-xs">
                  Gib dem Board einen Namen. Es werden drei Spalten erstellt:
                  ToDo, InProgress und Done.
                </DialogDescription>
              </DialogHeader>
              <Field>
                <Label htmlFor="boardname-1" className="text-sm font-semibold">
                  Boardname:
                </Label>
                <Input
                  id="boardname-1"
                  name="boardname"
                  placeholder="Board-Name"
                  value={newBoardTitle}
                  onChange={(e) => setNewBoardTitle(e.target.value)}
                  className="placeholder: font-normal text-base"
                />
              </Field>
              <DialogFooter>
                <DialogClose
                  render={
                    <Button variant="outline" className="hover:bg-cyan-50">
                      Abbrechen
                    </Button>
                  }
                />
                <Button
                  variant="cyan"
                  type="submit"
                  onClick={handleCreateBoardClick}
                >
                  Erstellen
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div className="board-list w-full h-auto grid grid-cols-3 gap-4 bg-white">
          {boards.map((board) => {
            return <BoardCard key={board.id} board={board}></BoardCard>;
          })}
        </div>
      </div>
    </>
  );
}
