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
import { deleteBoard, getBoards, insertBoard } from "@/lib/api";
import { useBoardReducer } from "@/hooks/useBoardReducer";
import type { Board } from "@/types/card.types";
// NEU: Importiere den useUsernameContext, um an Token und userId zu kommen
import { useUsernameContext } from "@/context/usernameContext";

export default function BoardList() {
  const [boards, boardsDispatch] = useReducer(useBoardReducer, []);
  const [newBoardTitle, setNewBoardTitle] = useState("");

  // NEU: Hole token und userId direkt aus dem Context
  const { token, userId } = useUsernameContext();

  // 1. Daten laden (getBoards benötigt jetzt das echte Token aus dem Context)
  useEffect(() => {
    async function loadData() {
      // Wenn das Token noch im Hintergrund generiert wird, warten wir kurz
      if (!token) return;

      const fetchedBoards = await getBoards(token); // Echtes Token übergeben
      boardsDispatch({ type: "SET_BOARDS", payload: fetchedBoards });
    }
    loadData();
  }, [token]); // Triggert automatisch neu, sobald das Token bereitsteht

  // 2. Board erstellen (insertBoard benötigt Token und echte user_id)
  async function handleCreateBoardClick() {
    if (newBoardTitle.trim().length === 0) return;

    const newBoard = {
      id: "",
      title: newBoardTitle,
      created_at: new Date().toISOString(),
      user_id: userId ?? "", // <-- Nutzt die echte, automatische UUID von Supabase
      tasks: [],
    } as Board;

    // API-Funktion mit echtem Token und der echten userId aufrufen
    const insertedBoard = await insertBoard(
      newBoard,
      token ?? "",
      userId ?? "",
    );

    if (insertedBoard) {
      boardsDispatch({ type: "CREATE_BOARD", payload: insertedBoard as Board });
      setNewBoardTitle("");
    }
  }

  // 3. Board löschen (deleteBoard benötigt jetzt das echte Token)
  async function handleDeleteBoardClick(id: string) {
    try {
      if (!token) return;
      await deleteBoard(id, token); // Echtes Token übergeben
      boardsDispatch({ type: "DELETE_BOARD", payload: { id } });
    } catch (error) {
      console.error("Error deleting board:", error);
    }
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
