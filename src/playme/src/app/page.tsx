// components
import SideBar from "../components/Navigation/SideBar";

export default async function HomePage() {
  return (
    <>
      <div className="flex">
        <SideBar/>
      </div>
      <div>
        <h1>Home Page</h1>
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
      </div>
    </>
  );
}