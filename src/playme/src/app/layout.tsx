"use client";
import "../assets/css/globals.css";

// components
// import Footer from "../components/Navigation/Footer";
// import Header from "../components/Navigation/Header";
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
            {/* <Header/> */}
            <div className=" text-gray-200 dark:bg-slate-800 dark:text-gray-200 sm:text-center">
              <ProvidersWrapper>
                <SideBar />
                <div className="content-container">
                  <div className="grid h-screen place-items-center">
                    {children}
                  </div>
                </div>
              </ProvidersWrapper>
            </div>
          </main>
          {/* <Footer /> */}
        </body>
      </html>
    </>
  );
}
