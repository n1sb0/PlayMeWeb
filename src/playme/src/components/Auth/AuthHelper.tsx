import { Session } from "next-auth";
import { decode } from "next-auth/jwt";
import { getSession } from "next-auth/react";
import { cookies, headers } from "next/headers";

const getSessionToken = async () => {
  const rawToken = cookies().get("next-auth.session-token")?.value;

  const token = await decode({
    token: rawToken as unknown as string,
    secret: process.env.JWT_SECRET as string,
  });

  return token as any;
}

// export async function getSession(cookie: string): Promise<Session | null> {
//   const response = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/session`, {
//     headers: { cookie },
//   });

//   if (!response?.ok) {
//     return null;
//   }

//   const session = await response.json();
//   return Object.keys(session).length > 0 ? session : null;
// }

// const isAuth = async () => {
//   const cookie = headers().get("cookie");
//   if (!cookie) return false;

//   const session = await getSession(cookie);
//   return !!session?.user;
// }


// export function getToken() {
//   return cookies().get("next-auth.session-token")?.value;
// }

// export function getCsrfToken() {
//   return cookies().get("next-auth.csrf-token")?.value;
// }

// export function getCallbackUrl() {
//   const callbackUrl = cookies().get("next-auth.callback-url")?.value;
//   if (!callbackUrl) return;

//   const decodedUrl = decodeURIComponent(callbackUrl);
//   const { searchParams } = new URL(decodedUrl);

//   return searchParams.get("callbackUrl") ?? decodedUrl;
// }

export {getSessionToken}