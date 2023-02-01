import { signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import {
  FaBars,
  FaBomb,
  FaHome,
  FaSignOutAlt,
  FaToolbox,
  FaUserFriends,
} from "react-icons/fa";
import Divider from "../Features/Basic/Divider";

const SideBar = () => {
  const { data: session, status } = useSession();
  const [showMenu, setShowMenu] = useState(false);

  if (!showMenu) {
    return (
      <>
      <div className="fixed h-16 w-screen">
        <div className="absolute left-2 top-0">
          <button
            className="hover:scale-100"
            onClick={() => setShowMenu(!showMenu)}
          >
            <SideBarIcon
              icon={<FaBars size="20" />}
              text={"Sign Out"}
              newIconClass="sidebar-icon-menu"
              link="#"
            />
          </button>
        </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div
        className={`fixed top-0 left-0 mr-4 h-screen w-16 overflow-hidden bg-gray-900 text-white shadow-lg ${
          showMenu ? "block" : "hidden sm:block"
        }`}
      >
        <nav className="flex h-full flex-col items-center read-only:scale-100">
          <button
            className="block rounded-full text-white hover:scale-100"
            onClick={() => setShowMenu(!showMenu)}
          >
            <SideBarIcon
              icon={<FaBars size="20" />}
              text={"Sign Out"}
              newIconClass="sidebar-icon-menu"
              link="#"
            />
          </button>
          <Divider />
          <SideBarIcon icon={<FaHome size="28" />} text={"Home"} link={"/"} />
          <Divider />
          <SideBarIcon icon={<FaUserFriends size="20" />} text={"Users"} link={"/users"} />
          <SideBarIcon icon={<FaToolbox size="20" />} text={"Test"} link={"/test"} />

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
  newIconClass = "sidebar-icon",
}) => (
  <a className={`${newIconClass} group`} href={link}>
    {icon}
    <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
  </a>
);
export default SideBar;
