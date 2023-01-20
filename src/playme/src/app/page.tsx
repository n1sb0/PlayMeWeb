import { cookies } from 'next/headers';
import { decode } from "next-auth/jwt";
import { getUserByEmail } from "../components/Auth/AuthHelper";
import UserCard from '../components/Features/User/UserCard';
import { getSession } from 'next-auth/react'


const getUserSessionData = async () =>{
  const nextCookies = cookies();
  const rawToken = nextCookies.get('next-auth.session-token')?.value;
  console.log('session Home Page raw',rawToken)
  const session = await decode({
    token: rawToken as unknown as string,
    secret: process.env.JWT_SECRET as string,
  });

  return session;
}

async function getUserByEmailFromSession() {

  const session = await getUserSessionData();

  let user : any;

  const userEmailFormSession = session?.user !== undefined && session.user.email ? session.user.email : session?.email;

  if(userEmailFormSession){
    user = await getUserByEmail(userEmailFormSession);
  }

  return user as any;
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
