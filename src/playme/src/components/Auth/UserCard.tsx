import { DefaultSession } from "next-auth";

export function UserCard({ user }: { user: DefaultSession["user"] }) {
  return (
    <div className="text-center">
      <div className="m-10 content-center">
        <div className="grid place-items-center">
          <div className="">
            <a
              className="block max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {user?.name}
              </h5>
              <p className="font-small text-gray-700 dark:text-gray-400">
                {user?.email}
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
