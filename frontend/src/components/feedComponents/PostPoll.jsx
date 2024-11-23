import React, { useState } from "react";

const PostPoll = ({ options }) => {
	const [votes, setVotes] = useState(options);
	const [selectedOption, setSelectedOption] = useState(null);

	const handleVote = (index) => {
		if (selectedOption === index) return; // Do nothing if the same option is clicked again

		const newVotes = [...votes];
		if (selectedOption !== null) {
			newVotes[selectedOption].votes -= 1; // Decrement the previous vote
		}
		newVotes[index].votes += 1; // Increment the new vote
		setVotes(newVotes);
		setSelectedOption(index);
	};

	const totalVotes = votes.reduce((sum, option) => sum + option.votes, 0);

	return (
		<div className="w-full   rounded-lg my-[30px]">
			{votes.map((option, index) => (
				<div
					key={index}
					onClick={() => handleVote(index)}
					className={`py-[1.5px] px-[2px]  border-solid mb-3 rounded-[18px] ${
						selectedOption == index
							? "border-slate-600 border"
							: "border-slate-200 border"
					}`}
				>
					<div className="flex items-center justify-between   rounded-[16px] py-[20px] px-[30px] cursor-pointer relative overflow-hidden w-full h-full ">
						<div
							style={{
								transition: "500ms width",
								width:
									selectedOption !== null
										? totalVotes > 0
											? ((option.votes / totalVotes) * 100).toFixed(2) + "%"
											: 0
										: "0",
							}}
							className={` h-full  absolute top-0 left-0 ${
								selectedOption == index ? "bg-[#a49cff]" : "bg-[#d9d6ff]"
							} flex rounded-[15px]`}
						></div>
						<div
							className={` h-full w-full absolute top-0 left-0 py-[20px] px-[20px] flex justify-between`}
						>
							<div className="font-semibold">{option.name}</div>{" "}
							<div>
								{selectedOption != null && (
									<span className="text-black opacity-40 font-medium">{` ${
										totalVotes > 0
											? ((option.votes / totalVotes) * 100).toFixed(2)
											: 0
									}%`}</span>
								)}
							</div>
						</div>
						<div>.</div>
					</div>
				</div>
			))}
			<div className=" mt-4 flex justify-end  px-[10px] gap-[20px] text-slate-200">
				<div className="text-gray-500 cursor-pointer">
					{" "}
					Total Votes: {totalVotes}
				</div>
				<div
					className="text-gray-500 cursor-pointer"
					onClick={() => {
						setSelectedOption(null);
					}}
				>
					Deselect Vote
				</div>
			</div>
		</div>
	);
};

export default PostPoll;
