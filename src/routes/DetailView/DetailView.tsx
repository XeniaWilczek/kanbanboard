import StatusCard from "@/components/StatusCards/StatusCards";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Pencil } from "lucide-react";
import { Link } from "react-router-dom";

export default function DetailView() {
  return (
    <div className="details w-[80vw] h-auto mx-auto p-6 flex flex-col gap-4 bg-cyan-600">
      <div className="details-heading-and-buttons w-fit flex justify-start items-center gap-2">
        <Link to="/">
          <ArrowLeft size={28} strokeWidth={2.5}></ArrowLeft>
        </Link>
        <h1 className="text-2xl font-bold">Bordname</h1>
        <Button variant="ghost" size="icon" className="hover:bg-cyan-50">
          <Pencil size={28} strokeWidth={2.5}></Pencil>
        </Button>
      </div>
      <StatusCard></StatusCard>
    </div>
  );
}
