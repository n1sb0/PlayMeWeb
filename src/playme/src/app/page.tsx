// components
import Login from "../components/Auth/Login";

export default async function HomePage() {
  return (
      <div className="content-center">
        <div className="grid place-items-center">
          <Login />
        </div>
      </div>
  );
}
