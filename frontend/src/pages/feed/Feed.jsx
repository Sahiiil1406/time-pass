import React from "react";
import FeedPost from "../../components/feedComponents/FeedPost";
import FeedAdd from "../../components/feedComponents/FeedAdd";
export default function Feed() {
	return (
		<div className="flex">
			<div className="w-[70%] h-full overflow-y-scroll flex items-center flex-col pt-[100px] bg-[#F1F1F1]" >
				<FeedPost />
				<FeedPost />
				<FeedPost />
				<FeedPost />
			</div>
			<div className="w-[30%] bg-[#F1F1F1]"><FeedAdd /></div>
		</div>
	);
}
