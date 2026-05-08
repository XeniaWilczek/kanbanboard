import StatusCard from "@/components/StatusCard/StatusCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Board } from "@/types/card.types";
import { ArrowLeft, Check, Pencil, X } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function DetailView() {
  const { id } = useParams();
  const [edit, setEdit] = useState(false);
  const [boardName, setBoardName] = useState("Boardname");
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

  function showEditField() {
    if (edit) {
      return (
        <div className="flex gap-2 justify-center items-center">
          <Input
            type="text"
            placeholder="Boardnamen bearbeiten..."
            value={boardName}
            onChange={(event) => setBoardName(event.target.value)}
          ></Input>
          <Button
            variant="iconGhost"
            size="icon"
            onClick={() => setEdit(false)}
          >
            <Check className="size-5 stroke-2.5"></Check>
          </Button>
          <Button
            onClick={() => setEdit(false)}
            variant="iconGhost"
            size="icon"
          >
            <X className="size-5 stroke-2.5"></X>
          </Button>
        </div>
      );
    } else {
      return (
        <>
          <h1 className="text-2xl font-bold">{boardName}</h1>
          <Button
            onClick={() => {
              console.log("click");
              setEdit(true);
            }}
            variant="iconGhost"
            size="icon"
          >
            <Pencil className="size-5 stroke-2.5"></Pencil>
          </Button>
        </>
      );
    }
  }

  return (
    <div className="details w-[80vw] h-auto mx-auto p-6 flex flex-col gap-4">
      <div className="details-heading-and-buttons w-fit flex justify-start items-center gap-2">
        <Link to="/">
          <Button variant="iconGhost">
            <ArrowLeft className="size-5 stroke-2.5"></ArrowLeft>
          </Button>
        </Link>
        {showEditField()}
      </div>
      <div className="flex gap-4">
        <StatusCard
          title={"ToDo"}
          tasks={boards[0].tasks.filter((t) => t.status === "ToDo")}
        ></StatusCard>
        <StatusCard
          title={"InProgress"}
          tasks={boards[0].tasks.filter((t) => t.status === "InProgress")}
        ></StatusCard>
        <StatusCard
          title={"Done"}
          tasks={boards[0].tasks.filter((t) => t.status === "Done")}
        ></StatusCard>
      </div>
    </div>
  );
}
