import StatusCards from "@/components/StatusCards/StatusCards";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Check, Pencil, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function DetailView() {
  const [edit, setEdit] = useState(false);
  const [boardName, setBoardName] = useState("Boardname");

  function showEditField() {
    console.log(edit);
    if (edit) {
      return (
        <div className="flex gap-2 justify-center items-center">
          <Input
            type="text"
            value={boardName}
            onChange={(event) => setBoardName(event.target.value)}
            className="text-2xl font-bold border-2 border-gray-300 rounded-sm focus-visible:border-cyan-400 focus-visible:ring-0 focus-visible:ring-offset-0"
          ></Input>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setEdit(false)}
            className="hover:bg-cyan-50"
          >
            <Check
              size={28}
              strokeWidth={2.5}
              className="hover:bg-cyan-50"
            ></Check>
          </Button>
          <Button
            onClick={() => setEdit(false)}
            variant="ghost"
            size="icon"
            className="hover:bg-cyan-50"
          >
            <X size={28} strokeWidth={2.5} className="hover:bg-cyan-50"></X>
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
            variant="ghost"
            size="icon"
            className="hover:bg-cyan-50"
          >
            <Pencil size={28} strokeWidth={2.5}></Pencil>
          </Button>
        </>
      );
    }
  }

  return (
    <div className="details w-[80vw] h-auto mx-auto p-6 flex flex-col gap-4">
      <div className="details-heading-and-buttons w-fit flex justify-start items-center gap-2">
        <Link to="/">
          <ArrowLeft size={28} strokeWidth={2.5}></ArrowLeft>
        </Link>
        {showEditField()}
      </div>
      <StatusCards></StatusCards>
    </div>
  );
}
