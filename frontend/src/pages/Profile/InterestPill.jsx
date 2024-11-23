import React, { useState } from "react";

// Define the color pattern
const colorClasses = [
	"bg-[#ECFFDA] ",
	"bg-[#FFE9DA] ",
	"bg-[#E8E5FF]",
	"bg-[#FFF7DA] ",
];

const generateColorClasses = (length) => {
	const result = [];
	let previousColor = null;

	for (let i = 0; i < length; i++) {
		let availableColors = colorClasses.filter(
			(color) => color !== previousColor
		);
		let randomColor =
			availableColors[Math.floor(Math.random() * availableColors.length)];
		result.push(randomColor);
		previousColor = randomColor;
	}

	return result;
};

const Pill = ({ text, colorClass }) => (
	<span className={`text-sm   px-[16px] py-[8px] rounded-full  ${colorClass}`}>
		{text}
	</span>
);

// Pills component
export default function InterestPill({ items }) {
	const [showAll, setShowAll] = useState(false);

	const colorClassList = generateColorClasses(items.length);
	const displayedItems = showAll ? items : items.slice(0, 12);

	return (
		<div className="flex flex-wrap  mt-4 gap-[8px]">
			{displayedItems.map((item, index) => (
				<Pill key={index} text={item} colorClass={colorClassList[index]} />
			))}
			{items.length > 12 && !showAll && (
				<button
					className=" text-gray-800 text-sm font-semibold px-4 py-2 rounded-full "
					onClick={() => setShowAll(true)}
				>
					View More
				</button>
			)}
			{items.length > 12 && showAll && (
				<button
					className=" text-gray-800 text-sm font-semibold px-4 py-2 rounded-full "
					onClick={() => setShowAll(false)}
				>
					Hide All
				</button>
			)}
		</div>
	);
}

// Example usage
