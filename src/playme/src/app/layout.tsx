/* eslint-disable @next/next/no-head-element */

import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html>
        <head>
        </head>
        <body>
          <main>

            {children}
          </main>

          <footer >
            <div>
              <p>Copyright &copy; 2022</p>
            </div>
          </footer>
        </body>
      </html>
    </>
  );
}
