import { cookies } from 'next/headers';
import { decode } from "next-auth/jwt";
import { getUserByEmail } from "../components/Auth/AuthHelper";
import UserCard from '../components/Features/User/UserCard';


const getUserSessionData = async () =>{
  const nextCookies = cookies();
  const rawToken = nextCookies.get("next-auth.session-token")?.value ?? nextCookies.get("__Secure-next-auth.session-token")?.value;
  
  return await decode({
    token: rawToken as unknown as string,
    secret: process.env.JWT_SECRET as string,
  });

}

async function getUserByEmailFromSession() {

  const session = await getUserSessionData();

  let user : any;

  const userEmailFormSession = session?.email;

  if(userEmailFormSession){
    user = await getUserByEmail(userEmailFormSession);
  }

  return user;
}

export default async function HomePage() {

  const user = await getUserByEmailFromSession();
  
  return (
    <div className="content-center">
      <div className="grid place-items-center">
        <p>HELLO {user?.email}</p>
        <UserCard key={user?.id} user={user} />
      </div>
    </div>
  );

}
