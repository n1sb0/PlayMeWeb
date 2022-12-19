/* eslint-disable @next/next/no-head-element */

import Link from "next/link";
import "../assets/css/global.css";

// components
import Footer from "../components/Navigation/Footer";
import Header from "../components/Navigation/Header";
import SideBar from "../components/Navigation/SideBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html className="dark">
        <head>
          <link href="/dist/output.css" rel="stylesheet" />
        </head>
        <body>
          <main>
            {/* <Header/> */}
            <div className=" text-gray-200 dark:bg-slate-800 dark:text-gray-200 sm:text-center">
                <SideBar />
                <div className="content-container">
                  <div className="grid place-items-center h-screen">
                    {children}
                  </div>
              </div>
            </div>
          </main>
          {/* <Footer /> */}
        </body>
      </html>
    </>
  );
}
