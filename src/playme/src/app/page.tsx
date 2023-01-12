import { UserCard } from "../components/Auth/UserCard";
import { getSessionToken } from "../components/Auth/AuthHelper";
import { NextResponse } from "next/server";

export default async function HomePage() {
  // const session = await getSessionToken();
  
  return (
    <div className="content-center">
      <div className="grid place-items-center">
        <p>HELLO</p>
        {/* <UserCard user={session?.user} /> */}
      </div>
    </div>
  );

}
