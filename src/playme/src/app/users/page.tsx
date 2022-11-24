import Link from "next/link";

const getUsers = async () => {
  const apiUrl = process.env.BASE_API_URL + "Users/GetUsers";
  const result = await fetch(apiUrl, { cache: "no-store" });

  const data = await result.json();
  return data as any;
};

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div>
      <h1 className="mb-3 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        Users
      </h1>
      <div className="... grid h-56 grid-cols-3 content-center gap-4">
        {users?.map((user) => {
          return <User key={user.id} user={user} />;
        })}
      </div>
    </div>
  );
}

function User({ user }: any) {
  const { id, email, name, lastname, password } = user || {};

  return (
    <div className="">
      <a
        href={`/users/${id}`}
        className="block max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {name} {lastname}
        </h5>
        <p className="font-small text-gray-700 dark:text-gray-400">{email}</p>
      </a>
    </div>
  );
}
