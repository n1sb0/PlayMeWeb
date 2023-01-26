"use client";

import "../assets/css/globals.css";
import SideBar from "../components/Navigation/SideBar";
import ProvidersWrapper from "../components/Auth/ProvidersWrapper";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html className="dark">
        <head></head>
        <body>
          <main>
            <div className=" text-gray-200 dark:bg-slate-800 dark:text-gray-200 sm:text-center">
              <ProvidersWrapper>
                <SideBar />
                <div className="flex min-h-screen flex-col items-center">
                  {children}
                </div>
              </ProvidersWrapper>
            </div>
          </main>
        </body>
      </html>
    </>
  );
}
