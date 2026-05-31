import StatusCard from "@/components/StatusCard/StatusCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDetailReducer } from "@/hooks/useDetailReducer";
import { getBoardById, updateBoard } from "@/lib/api";
import { ArrowLeft, Check, Pencil, X } from "lucide-react";
import { useEffect, useReducer, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function DetailView() {
  const { id } = useParams<{ id: string }>();
  const [board, dispatchBoard] = useReducer(useDetailReducer, undefined);

  const [edit, setEdit] = useState(false);
  const [boardTitle, setBoardTitle] = useState("");

  async function fetchBoard() {
    const board = await getBoardById(id ?? "");
    dispatchBoard({ type: "SET_BOARD", payload: board });
  }
  useEffect(() => {
    fetchBoard();
  }, []);

  function handleCancelTitleClick() {
    setEdit(false);
  }

  async function handleSaveTitleClick() {
    if (!board) return;

    const updatedBoard = await updateBoard(board.id, { title: boardTitle });

    if (updatedBoard) {
      dispatchBoard({ type: "SET_BOARD", payload: updatedBoard });
      setEdit(false);
    }
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
          <h1 className="text-2xl font-bold">{board?.title ?? ""}</h1>
          <Button
            onClick={() => {
              setBoardTitle(board?.title ?? "");
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
  if (!board) {
    return <div>Loading...</div>;
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
          boardId={board.id}
          tasks={board.tasks.filter(
            (t: { status: string }) => t.status === "ToDo",
          )}
          detailsDispatch={dispatchBoard}
        ></StatusCard>
        <StatusCard
          title={"InProgress"}
          boardId={board.id}
          tasks={board.tasks.filter(
            (t: { status: string }) => t.status === "InProgress",
          )}
          detailsDispatch={dispatchBoard}
        ></StatusCard>
        <StatusCard
          title={"Done"}
          boardId={board.id}
          tasks={board.tasks.filter(
            (t: { status: string }) => t.status === "Done",
          )}
          detailsDispatch={dispatchBoard}
        ></StatusCard>
      </div>
    </div>
  );
}
