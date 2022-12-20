"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import {UserCard} from "./UserCard";

export default function Login() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <button type="button" className="login-button" onClick={() => signOut()}>Sign out</button>
        <UserCard user={session?.user}/>
      </>
    );
  }
  return (
    <>
      <button type="button" className="login-button" onClick={() => signIn()}>
        Sign In With Google
      </button>
    </>
  );
}
