import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <>
      <div>
        Root: oberer Balken, der den Link zu BoardList und den Link zu Profile
        enthält
      </div>

      <Outlet></Outlet>
    </>
  );
}
