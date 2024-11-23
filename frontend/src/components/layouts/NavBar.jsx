import React, { Children } from "react";
import { BiGroup, BiHomeAlt } from "react-icons/bi";
import { FaHome, FaUser, FaCog, FaInfoCircle } from "react-icons/fa";
import { FaRegBell } from "react-icons/fa6";
import { GoHome, GoSearch } from "react-icons/go";
import { HiMenu } from "react-icons/hi";
import { IoChatbubbleOutline, IoSearch } from "react-icons/io5";
import { MdOutlineAddBox } from "react-icons/md";
import { RiChat3Line } from "react-icons/ri";
import { TbCards } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
const NavBar = ({ children }) => {
	const navigate = useNavigate();
	return (
		<div className="w-full h-full flex pl-20">
			<div
				style={{ border: "1px solid #e0e0e0" }}
				className="group fixed top-0 left-0 h-full flex flex-col items-center bg-white text-white transition-width duration-300 w-20 hover:w-64 px-3 gap-2"
			>
				<div
					className=" py-3 px-3    w-full   flex items-center transition-all duration-300  overflow-hidden rounded-xl cursor-pointer gap-2 mt-[40px] mb-[20px]"
					onClick={() => navigate("/feed")}
				>
					<div className="min-w-[32px] min-h-[32px] max-w-[32px] max-h-[32px] flex  items-center justify-center">
						<img src="navl1.png" alt="" />
					</div>

					<p className="label group-hover:inline hidden ml-2 text-slate-700 text-lg font-medium">
						<img src="navl2.png" className="h-[32px] min-w-[120px]" alt="" />
					</p>
				</div>
				<NavElement icon={<BiHomeAlt size={32} />} label="Home" to="/feed" />
				<NavElement
					icon={<IoSearch size={32} strokeWidth={1} />}
					label="Search"
					to="/feed"
				/>
				<NavElement icon={<TbCards size={32} />} label="Swypes" to="/feed" />
				<NavElement
					icon={<BiGroup size={32} />}
					label="Communities"
					to="/feed"
				/>
				<NavElement icon={<RiChat3Line size={28} />} label="Chat" to="/feed" />

				<NavElement
					icon={<FaRegBell size={28} />}
					label="Notifications"
					to="/feed"
				/>
				<NavElement
					icon={<MdOutlineAddBox size={32} />}
					label="Notifications"
					to="/feed"
				/>

				<NavElement
					icon={<BiGroup size={32} />}
					label="Profile"
					to="/profile"
				/>

				<div
					className=" py-3 px-3    w-full  hover:bg-gray-100 flex items-center transition-all duration-300  overflow-hidden rounded-xl cursor-pointer gap-2   mt-[200px] mb-[20px]"
					onClick={() => navigate("/feed")}
				>
					<div className="min-w-[32px] min-h-[32px] max-w-[32px] max-h-[32px] flex  items-center justify-center">
						<HiMenu size={32} />
					</div>

					<p className="label group-hover:inline hidden ml-2 text-slate-700 text-lg font-medium">
						More
					</p>
				</div>
			</div>
			<div className="w-full h-full">{children}</div>
		</div>
	);
};

export default NavBar;

function NavElement({ icon, label = "home", to = "/login", className = "" }) {
	const navigate = useNavigate();
	return (
		<div
			className={`${className} py-3 px-3   hover:bg-gray-100 w-full   flex items-end  transition-all duration-300  overflow-hidden rounded-xl cursor-pointer gap-2`}
			onClick={() => navigate(to)}
		>
			<div className="w-[32px] h-[32px] flex  items-center">{icon}</div>

			<p className="label group-hover:inline hidden ml-2 text-slate-700 text-lg font-medium">
				{label}
			</p>
		</div>
	);
}
