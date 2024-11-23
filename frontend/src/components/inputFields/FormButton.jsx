import React from "react";

export default function FormButton({
	children,
	onClick = () => {},
	className = "",
}) {
	return (
		<button
			onClick={onClick}
			className={`w-full  text-white font-medium bg-[#8378FF] rounded-full py-[16px] hover:bg-[#978eff] duration-200 ${className}`}
		>
			{children}
		</button>
	);
}
