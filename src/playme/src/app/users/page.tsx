import UsersList from "../../components/Features/User/UsersList";
import {getSessionToken} from "../../components/Auth/AuthHelper"
import HomePage from "../page";

const getUsers = async () => {
  const apiUrl = process.env.BASE_API_URL + "Users/GetUsers";
  const result = await fetch(apiUrl, { cache: "no-store" });

  const data = await result.json();
  return data as any;
};

export default async function UsersPage() {
  const users = await getUsers();
  const session =  await getSessionToken();

  if(session)
  return (
    <div>
      <h1 className="text-3xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        Users
      </h1>
      <UsersList key={users.id} users={users} />
    </div>
  );

  return (HomePage());
  
}
