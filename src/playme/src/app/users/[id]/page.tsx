import User from "../../../components/Features/User";
import UsersList from "../../../components/Features/UsersList";

// {next: {revalidate: 10}} will recall db every 10 sec (ISR)
async function getUser(userId: number) {
  const apiUrl = process.env.BASE_API_URL + `Users/GetUser/${userId}`;
  const result = await fetch(apiUrl, { cache: "no-store" });

  console.log("user", apiUrl);

  const data = await result.json();
  return data as any;
}


const getFriends = async (userId: number) => {
  const apiUrl = process.env.BASE_API_URL + `FriendShip/GetFriends/${userId}`;
  const result = await fetch(apiUrl, { cache: "no-store" });

  const data = await result.json();
  return data as any;
};


export default async function UserPage({ params } : any) {
  const user = await getUser(params.id);
  const friends = await getFriends(params.id)
  
  console.log("friends", friends);

  return (
    <div>
      <div className="text-cennter">
      <h1 className="mb-3 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        User Info:
      </h1>
        <User key={user.id} user={user}/>
      </div>

      <br />
      <h1 className="mb-3 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        User Friends:
      </h1>
      <UsersList key={friends.id} users={friends}/>
    </div>
  );
}
