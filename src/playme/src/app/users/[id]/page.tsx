import User from "../../../components/Features/User/User";
import UsersList from "../../../components/Features/User/UsersList";

// {next: {revalidate: 10}} will recall db every 10 sec (ISR)
async function getUser(userId: number) {
  const apiUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL_AZURE}Users/GetUser/${userId}`;
  const result = await fetch(apiUrl, { cache: "no-store" });

  const data = await result.json();
  return data as any;
}

const getFriends = async (userId: number) => {
  const apiUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL_AZURE}FriendShip/GetFriends/${userId}`;
  const result = await fetch(apiUrl, { cache: "no-store" });

  const data = await result.json();
  return data as any;
};

export default async function UserPage({ params }: any) {
  const user = await getUser(params.id);
  const friends = await getFriends(params.id);

  return (
    <div>
      <div className="text-center">
        <h1 className="text-3xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          User Info:
        </h1>
        <div className="m-10 content-center">
          <div className="grid place-items-center">
            <User key={user.id} user={user} />
          </div>
        </div>
      </div>

      <h1 className="text-3xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        User Friends:
      </h1>
      <UsersList key={friends.id} users={friends} />
    </div>
  );
}
