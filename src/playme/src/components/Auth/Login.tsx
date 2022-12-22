"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { UserCard } from "./UserCard";

export default function Login() {
  const { data: session, status } = useSession();

  return (
    <>
      {status === "authenticated" ? (
        <UserCard user={session?.user} />
      ) : (
        <button type="button" className="login-button" onClick={() => signIn()}>
          Sign In
        </button>
      )}
    </>
  );
}
