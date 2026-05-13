import StatusCard from "@/components/StatusCard/StatusCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDetailReducer } from "@/hooks/useDetailReducer";
import { getBoard } from "@/lib/api";
import type { Board } from "@/types/card.types";
import { ArrowLeft, Check, Pencil, X } from "lucide-react";
import { useReducer, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function DetailView() {
  const { id } = useParams<{ id: string }>();
  const requiredBoard: Board = getBoard(id || "") || {
    id: id || "",
    title: "Standard-Board",
    tasks: [],
  };

  const [details, detailsDispatch] = useReducer(
    useDetailReducer,
    requiredBoard,
  );

  const [edit, setEdit] = useState(false);
  const [boardTitle, setBoardTitle] = useState("");

  function handleSaveTitleClick() {
    detailsDispatch({
      type: "UPDATE_TITLE",
      payload: { title: boardTitle },
    });
    setEdit(false);
  }

  function handleCancelTitleClick() {
    setEdit(false);
  }

  function showEditField() {
    if (edit) {
      return (
        <div className="flex gap-2 justify-center items-center">
          <Input
            type="text"
            placeholder="Boardnamen bearbeiten"
            value={boardTitle}
            onChange={(event) => setBoardTitle(event.target.value)}
          ></Input>
          <Button
            variant="iconGhost"
            size="icon"
            onClick={handleSaveTitleClick}
          >
            <Check className="size-5 stroke-2.5"></Check>
          </Button>
          <Button
            onClick={handleCancelTitleClick}
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
          <h1 className="text-2xl font-bold">{details.title}</h1>
          <Button
            onClick={() => {
              setBoardTitle(details.title);
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
          tasks={details.tasks.filter((t) => t.status === "ToDo")}
          detailDispatch={{
            type: "UPDATE_TITLE",
            payload: {
              title: "",
            },
          }}
        ></StatusCard>
        <StatusCard
          title={"InProgress"}
          tasks={details.tasks.filter((t) => t.status === "InProgress")}
          detailDispatch={{
            type: "UPDATE_TITLE",
            payload: {
              title: "",
            },
          }}
        ></StatusCard>
        <StatusCard
          title={"Done"}
          tasks={details.tasks.filter((t) => t.status === "Done")}
          detailDispatch={{
            type: "UPDATE_TITLE",
            payload: {
              title: "",
            },
          }}
        ></StatusCard>
      </div>
    </div>
  );
}
