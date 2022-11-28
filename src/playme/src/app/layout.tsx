/* eslint-disable @next/next/no-head-element */

import Link from "next/link";
import "../assets/css/global.css";

// components
import Footer from "../components/Navigation/Footer";
import Header from "../components/Navigation/Header";

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
            <Header/>
            <div className=" text-gray-500 dark:bg-slate-800 dark:text-gray-400 sm:text-center">
              {children}
            </div>
          </main>
          <Footer />
        </body>
      </html>
    </>
  );
}
