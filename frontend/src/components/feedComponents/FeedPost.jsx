import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FiShare } from "react-icons/fi";
import { RiChat3Line } from "react-icons/ri";
import { useState } from "react";
import { IconContext } from "react-icons";
import PostPoll from "./PostPoll";

export default function FeedPost() {
	const [liked, setLiked] = useState(false);
	return (
		<div className="w-full max-w-[600px] mb-[20px] bg-[#FCFCFF] p-[30px] rounded-[30px] ">
			<div className="flex gap-[20px] items-center">
				<img
					src="https://media.licdn.com/dms/image/D5603AQEamguVr4e5UA/profile-displayphoto-shrink_400_400/0/1701718025399?e=1721865600&v=beta&t=OXrFUElsE3TCp7yhGt085lMMaIMIgpdRh_SeJ8tIRbA"
					alt=""
					className="rounded-full w-[40px] h-[40px] object-cover"
				/>
				<div>
					<p className="font-medium text-[16px] mb-[5px]">Sahil Mengji</p>
					<div className="flex gap-[10px] items-center">
						<div className="bg-[#daf2ff] text-[#003F63] font-semibold rounded-[5px] text-sm  px-[6px] py-[2px]">
							💬 THREAD
						</div>
						<p className="text-xs">• 7 days Ago</p>
					</div>
				</div>
			</div>
			<div className="mt-[20px] text-[18px] text-medium ">
				<p>
					The 🌞 sun painted skies, 🌺 flowers danced, 🦋 butterflies fluttered.
					Birds chirped, leaves rustled, a distant 🏰 castle stood. A meandering
					river, 📸 ... See more
				</p>
			</div>
			<div className="overflow-x-scroll flex gap-4 mt-[20px] scrollbar-hidden snap-x snap-mandatory">
				<img
					className="rounded-lg h-[300px]"
					src="https://petapixel.com/assets/uploads/2017/12/winter-morning-shadows-black-and-white-landscape-800x533.jpg"
					alt=""
				/>
				<img
					className="rounded-lg h-[300px]"
					src="https://about.rte.ie/wp-content/uploads/2023/06/Eye-on-Nature-4-640x480.jpg"
					alt=""
				/>
				<img
					className="rounded-lg h-[300px]"
					src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGhvdG9ncmFwaHl8ZW58MHx8MHx8fDA%3D"
					alt=""
				/>
			</div>

			<div>
				<PostPoll
					options={[
						{ name: "Engineering Graphics", votes: 70 },
						{ name: "Mathematics", votes: 5 },
					]}
				/>
			</div>
			<div className="flex mt-[20px] text-lg font-medium gap-8 items-center ">
				<div
					className={`flex  items-center gap-2 cursor-pointer ${
						liked ? "text-[#FF4E83]" : ""
					} `}
					onClick={() => {
						setLiked((liked) => !liked);
					}}
				>
					{liked ? (
						<IconContext.Provider
							value={{ color: "#ff4e83", className: "global-class-name" }}
						>
							<AiFillHeart
								size={24}
								color="#ff4e83"
								style={{ color: "#ff4e83" }}
							/>
						</IconContext.Provider>
					) : (
						<AiOutlineHeart size={24} />
					)}
					121
				</div>
				<div className="flex  items-center gap-1 cursor-pointer">
					<RiChat3Line size={22} />
					34
				</div>
				<div className="cursor-pointer">
					<FiShare size={20} />
				</div>
			</div>
		</div>
	);
}
