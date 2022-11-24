/* eslint-disable @next/next/no-head-element */

import Link from "next/link";
import "../assets/css/global.css";

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
            <div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
                  <a
                    href="/"
                    className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                    aria-current="page"
                  >
                    Home
                  </a>

                  <a
                    href="/users"
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Users
                  </a>
                </div>
              </div>
              <div className=" dark:bg-slate-800 text-gray-500 dark:text-gray-400 sm:text-center">
                {children}
              </div>
            </div>
          </main>
          {/* FOOTER */}
          <footer className="rounded-lg bg-white p-4 shadow dark:bg-gray-800 md:flex md:items-center md:justify-between md:p-6">
            <span className="text-sm text-gray-500 dark:text-gray-400 sm:text-center">
              © 2022{" "}
              <a href="/" className="hover:underline">
                PlayMe™
              </a>
              . All Rights Reserved.
            </span>
            <ul className="mt-3 flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
              <li>
                <a href="/about" className="mr-4 hover:underline md:mr-6 ">
                  About
                </a>
              </li>
              <li>
                <a href="/privacy" className="mr-4 hover:underline md:mr-6">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </footer>
        </body>
      </html>
    </>
  );
}
