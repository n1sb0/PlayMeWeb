import { SessionProvider } from "next-auth/react";

export default function ProvidersWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      {children}
      {/* {children} Our entire app. Allows to have our app to use NextAuth */}
    </SessionProvider>
  );
}