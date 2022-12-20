import { BsPlus, BsFillLightningFill, BsGearFill } from "react-icons/bs";
import { FaHome, FaUserFriends } from "react-icons/fa";
import { text } from "stream/consumers";
import Divider from "../Features/Basic/Divider";

const SideBar = () => {
  return (
    <div className="fixed top-0 left-0 m-0 flex h-screen w-16 flex-col bg-gray-900 text-white shadow-lg">
      <SideBarIcon icon={<FaHome size="28" />} text={'Home'} link={'/'} />
      <Divider />
      <SideBarIcon icon={<FaUserFriends size="20" />} text={'Users'} link={'/users'} />
    </div>
  );
};

const SideBarIcon = ({ icon, text = 'tooltip 💡', link='/' }) => (
    <a className="sidebar-icon group" href={link}>
      {icon}
      <span className="sidebar-tooltip group-hover:scale-100">
        {text}
      </span>
    </a>
  );

// const Divider = () => <hr className="sidebar-hr" />;
export default SideBar;
