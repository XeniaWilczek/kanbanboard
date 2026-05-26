import { Plus } from "lucide-react";
import BoardCard from "../../components/BoardCard/BoardCard";
import { Button } from "@/components/ui/button";
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
import { useEffect, useReducer, useState } from "react";
import { getBoards } from "@/lib/api";
import { useBoardReducer } from "@/hooks/useBoardReducer";
import type { Board } from "@/types/card.types";

export default function BoardList() {
  const [boards, boardsDispatch] = useReducer(useBoardReducer, []);
  const [newBoardTitle, setNewBoardTitle] = useState("");

  useEffect(() => {
    async function loadData() {
      const fetchedBoards = await getBoards();
      boardsDispatch({ type: "SET_BOARDS", payload: fetchedBoards });
    }
    loadData();
  }, []);

  function handleCreateBoardClick() {
    if (newBoardTitle.trim().length === 0) return;

    const newBoard: Board = {
      id: String(Math.random()),
      title: newBoardTitle,
      tasks: [],
    };
    boardsDispatch({ type: "SET_BOARD", payload: boards });
    setNewBoardTitle("");
  }

  function handleDeleteBoardClick(id: string) {
    boardsDispatch({ type: "DELETE_BOARD", payload: { id } });
  }

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
                <Label htmlFor="boardname" className="text-sm font-semibold">
                  Boardname:
                </Label>
                <Input
                  id="boardname"
                  name="boardname"
                  placeholder="Board-Name"
                  type="text"
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
                <DialogClose
                  render={
                    <Button
                      variant="cyan"
                      type="submit"
                      onClick={handleCreateBoardClick}
                    >
                      Erstellen
                    </Button>
                  }
                ></DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div className="board-list w-full h-auto grid grid-cols-3 gap-4 bg-white">
          {boards.length === 0 && (
            <p className="text-gray-400 text-center py-8 col-span-3">
              Noch keine Boards vorhanden.
            </p>
          )}

          {boards.length > 0 &&
            boards.map((board) => (
              <BoardCard
                key={board.id}
                board={board}
                onDelete={handleDeleteBoardClick}
              />
            ))}
        </div>
      </div>
    </>
  );
}
