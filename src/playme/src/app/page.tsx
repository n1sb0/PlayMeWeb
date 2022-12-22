// components
import Login from "../components/Auth/Login";

export default async function HomePage() {
  return (
    <div className="text-center">
      <div className="m-10 content-center">
        <div className="grid place-items-center">
          <h3 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
            Welcome!
          </h3>
          <Login />
        </div>
      </div>
    </div>
  );
}
