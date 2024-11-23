import React from "react";

function RadioGroup({ options, selectedOption, onChange }) {
	return (
		<div className=" px-[16px] py-[8px] border-solid rounded-[16px] mb-[6px]">
			<p className="font-medium text-[12px] text-[#80809a]">Gender</p>
			<div className="flex gap-[12px] items-end  ">
				{options.map((option, index) => (
					<div className=" pt-[6px] flex gap-1 " key={index}>
						<input
							id={option}
							className=""
							type="radio"
							value={option}
							checked={selectedOption === option}
							onChange={() => onChange(option)}
						/>
						<label
							htmlFor={option}
							className={selectedOption === option ? "font-medium" : ""}
						>
							{option}
						</label>
					</div>
				))}
			</div>
		</div>
	);
}

export default RadioGroup;
