import { Button } from "@/components/ui/button";
import { CircleUser, LayoutDashboard } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

export default function Root() {
  return (
    <>
      <div className="banner w-screen h-[10vh] bg-black">
        <div className="w-[80vw] h-full flex justify-between items-center mx-auto">
          <Link to="/">
            <Button className="group flex justify-center items-center gap-2">
              <LayoutDashboard className="size-6 text-gray-300 group-hover:text-cyan-300 transition-colors"></LayoutDashboard>
              <span className="text-lg font-semibold">Boards</span>
            </Button>
          </Link>
          <Link to="/profile">
            <Button className="group flex justify-center items-center gap-2">
              <CircleUser className="size-4 text-gray-300 group-hover:text-cyan-300 transition-colors"></CircleUser>
              <span className="text-xs font-semibold">Nutzer</span>
            </Button>
          </Link>
        </div>
      </div>
      <main>
        <Outlet></Outlet>
      </main>
    </>
  );
}
