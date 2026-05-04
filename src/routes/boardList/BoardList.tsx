import { Plus } from "lucide-react";
import BoardCard from "../../components/BoardCard/BoardCard";
import { Button } from "@/components/ui/button";

export default function BoardList() {
  //Hinzufügen: p-Element "Noch keine Boards vorhanden", wenn die Liste leer ist
  //Link zur Detailansicht hinzufügen
  return (
    <>
      <div className="board-overview w-[80vw] h-auto mx-auto p-6 flex flex-col gap-4">
        <div className="board-heading-and-button w-full flex justify-between items-center">
          <h1 className="text-2xl font-bold">Meine Boards</h1>
          <Button className="flex justify-center items-center gap-1 text-sm text-black font-semibold p-2 rounded-sm bg-cyan-400 hover:bg-cyan-300">
            <Plus size={16} strokeWidth={2.5}></Plus>
            Neues Board
          </Button>
        </div>
        <div className="board-list w-full h-auto grid grid-cols-3 gap-4 bg-white">
          <BoardCard></BoardCard>
          <BoardCard></BoardCard>
          <BoardCard></BoardCard>
        </div>
      </div>
    </>
  );
}
