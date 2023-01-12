import UsersList from "../../components/Features/User/UsersList";

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
      <h1 className="text-3xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        Users
      </h1>
      <UsersList key={users.id} users={users} />
    </div>
  );
}
