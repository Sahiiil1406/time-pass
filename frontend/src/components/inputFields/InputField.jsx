import React from "react";
import { useState } from "react";
export default function InputField(props) {
	const {
		type = "text",
		state = "",
		placeholder = "",
		onChange,
		className = "",
		description = "",
		...inputProps
	} = props;

	const [active, setActive] = useState(false);
	function handleOnChange(e) {
		e.preventDefault();
		if (e.target.value != "") {
			setActive(true);
		} else {
			setActive(false);
		}
	}

	return (
		<div className={`relative ${className}`}>
			<p
				className={`unselectable text-[#71718E]  duration-200 absolute pointer-events-none ${
					active
						? " top-[12px] text-[10px] font-medium left-[16px] text-[]"
						: " top-[20px] left-[24px]"
				}`}
			>
				{placeholder}
			</p>
			<input
				className={` w-full h-full focus:outline-none border-[2px] border-solid rounded-[16px]  bg-[#FBFBFB] placeholder:text-[#71718E]   focus:border-black
                ${
									active
										? " pb-[10px] pt-[24px] px-[16px]"
										: " pb-[16px] pt-[20px] px-[16px]"
								}   
                 
                
                 
                                `}
				type={type}
				placeholder=""
				onChange={handleOnChange}
				{...inputProps}
			/>

			<p className="text-[12px] m-[5px] ">{description}</p>
		</div>
	);
}
