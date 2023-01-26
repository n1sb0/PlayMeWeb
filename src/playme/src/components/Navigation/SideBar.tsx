import { signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import {
  FaBars,
  FaBomb,
  FaHome,
  FaSignOutAlt,
  FaUserFriends,
} from "react-icons/fa";
import Divider from "../Features/Basic/Divider";

const SideBar = () => {
  const { data: session, status } = useSession();
  const [showMenu, setShowMenu] = useState(false);



  if (!showMenu) {
    return (
      <>
        <div className="fixed top-0 left-0 mr-4 h-screen w-16 overflow-hidden">
          <button
            className="block rounded-full p-2 text-white hover:scale-100"
            onClick={() => setShowMenu(!showMenu)}
          >
            <a className="sidebar-icon group">
              <FaBars size="20" />
              <span className="sidebar-tooltip group-hover:scale-100">
                Show/Hide
              </span>
            </a>
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <div
        className={`fixed top-0 left-0 mr-4 h-screen w-16 bg-gray-900 text-white shadow-lg overflow-hidden ${
          showMenu ? "block" : "hidden sm:block"
        }`}
      >
        <nav className="flex h-full flex-col items-center">
          <button
            className="block rounded-full p-2 text-white hover:scale-100"
            onClick={() => setShowMenu(!showMenu)}
          >
            <a className="sidebar-icon group">
              <FaBars size="20" />
              <span className="sidebar-tooltip group-hover:scale-100">
                Show/Hide
              </span>
            </a>
          </button>
          <Divider />
          <SideBarIcon icon={<FaHome size="28" />} text={"Home"} link={"/"} />
          <Divider />
          <SideBarIcon
            icon={<FaUserFriends size="20" />}
            text={"Users"}
            link={"/users"}
          />
          {status === "authenticated" ? (
            <button type="button" onClick={() => signOut()}>
              <SideBarIcon
                icon={<FaSignOutAlt size="20" />}
                text={"Sign Out"}
              />
            </button>
          ) : (
            ""
          )}
        </nav>
      </div>
    </>
  );
};

const SideBarIcon = ({
  icon = <FaBomb size="28" />,
  text = "tooltip 💡",
  link = "/",
}) => (
  <a className="sidebar-icon group" href={link}>
    {icon}
    <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
  </a>
);
export default SideBar;
