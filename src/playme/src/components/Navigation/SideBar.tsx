import { signOut, useSession } from "next-auth/react";
import React from "react";
import { FaHome, FaSignOutAlt, FaUserFriends } from "react-icons/fa";
import Divider from "../Features/Basic/Divider";

const SideBar = () => {
  const { data: session, status } = useSession();
  return (
    <div className="fixed top-0 left-0 m-0 flex h-screen w-16 flex-col bg-gray-900 text-white shadow-lg">
      <SideBarIcon icon={<FaHome size="28" />} text={"Home"} link={"/"} />
      <Divider />
      <SideBarIcon icon={<FaUserFriends size="20" />} text={"Users"} link={"/users"}/>
      {status === "authenticated" ? (<button type="button" onClick={() => signOut()}><SideBarIcon icon={<FaSignOutAlt size="20" />} text={"Sign Out"} /></button>) : ("")}
    </div>
  );
};

const SideBarIcon = ({ icon, text = "tooltip 💡", link = "/" }) => (
  <a className="sidebar-icon group" href={link}>
    {icon}
    <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
  </a>
);

// const Divider = () => <hr className="sidebar-hr" />;
export default SideBar;
