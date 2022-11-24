// {next: {revalidate: 10}} will recall db every 10 sec (ISR)
async function getUser(userId: number) {
  const apiUrl = process.env.BASE_API_URL + `Users/GetUser/?id=${userId}`;
  const result = await fetch(apiUrl, { next: { revalidate: 10 } });

  const data = await result.json();
  return data as any;
}

export default async function UserPage({ params } : any) {
  const user = await getUser(params.id);
  //console.log("user", user);

  return (
    <div>
      <div className="text-cennter">
        <h1>User Page:</h1>
      </div>

      <div>
        <h2>{user.id}</h2>
        <h3>{user.name}</h3>
        <h5>{user.lastname}</h5>
        <p>{user.email}</p>
      </div>
    </div>
  );
}
