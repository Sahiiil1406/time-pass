// Import React and any necessary hooks
import React from "react";
import { FaEllipsisVertical } from "react-icons/fa6";
import InterestPill from "./InterestPill";
import NavBar from "../../components/layouts/NavBar";

export default function Profile() {
	return (
		<div className="w-full h-full flex justify-center mt-[100px]">
			<div className="w-full pt-[50px] max-w-[1000px] mx-[40px]">
				<div className="  flex gap-[80px]">
					<div className="flex items-center">
						{" "}
						<div
							style={{ border: "5px solid #DFDCFF" }}
							className="p-[5px] rounded-full relative"
						>
							<img
								src="https://media.licdn.com/dms/image/D5603AQEamguVr4e5UA/profile-displayphoto-shrink_400_400/0/1701718025399?e=1721865600&v=beta&t=OXrFUElsE3TCp7yhGt085lMMaIMIgpdRh_SeJ8tIRbA "
								alt=""
								className="rounded-full max-w-[200px]"
							/>
							<img
								src="verifiedlight.png"
								alt=""
								className="absolute bottom-[-5px] right-[-5px] w-[70px]"
							/>
						</div>
					</div>
					<div className="space-y-[16px]">
						<div className="flex justify-between items-start">
							<div>
								<h1 className="font-medium text-2xl flex gap-[6px] items-center">
									Sahil Mengji{" "}
									<img src="verifiedlight.png" className="w-[40px]" alt="" />{" "}
								</h1>
								<h2 className="font-medium text-lg text-[#828282]">
									@sahilmengji
								</h2>
							</div>
							<div className="flex gap-[10px] items-center">
								<button className="px-[24px] py-[12px] bg-[#9187FF] font-medium rounded-full text-white">
									Following ✓
								</button>
								<button
									style={{ border: "1px solid #e0e0e0" }}
									className="px-[24px] py-[12px] bg-[#F9F9F9] font-medium rounded-full text-[#303030] mr-[6px]"
								>
									Message
								</button>
								<FaEllipsisVertical size={24} />
							</div>
						</div>
						<p className="text-[#6A6A6A] text-lg">
							<b className="text-black font-semibold">75 </b>connections |{"  "}
							<b className="text-black font-semibold">105 </b>followers |{"  "}
							<b className="text-black font-semibold">115 </b>
							collabrations
						</p>
						<p
							style={{ border: "1px solid #e0e0e0" }}
							className="bg-[#f9f9f9] px-[16px] py-[6px]  rounded-full inline-block"
						>
							🏫 National Institute of technology Karnatak...
						</p>
						<p>
							"Hustle, heart, and a little bit of art 🎨 Finding beauty in the
							chaos 🌪️Life’s a journey, make it an adventure 🌟 Born to stand
							out, not to fit in 🌈Unapologetically myself. 💁‍♀️.... Read more
						</p>
					</div>
				</div>
				<div className="intrests mt-[40px]">
					<InterestPill
						items={[
							"Web Development",
							"AI",
							"React",
							"Technology",
							"Engineering",
							"Hackathons",
							"Content Creation",
							"Travel",
							"App Development",
							"Computer Science",
							"DSA",
							"Cricket",
							"Entrepreneurship",
							"Cloud Computing",
							"Cyber Security",
							"Data Science",
							"Machine Learning",
							"Blockchain",
							"Robotics",
						]}
					/>
				</div>
			</div>
		</div>
	);
}
