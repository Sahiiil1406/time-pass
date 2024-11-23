import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DatePickerInput(props) {
	const {
		state = "",
		onChange,
		className = "",
		description = "",
		...inputProps
	} = props;

	const [active, setActive] = useState(false);
	const [selectedDate, setSelectedDate] = useState(null);

	function handleDateChange(date) {
		setSelectedDate(date);

		if (onChange) {
			// Format date as dd/mm/yyyy
			const formattedDate = date.toLocaleDateString("en-GB");
			onChange({
				target: {
					value: formattedDate,
				},
			});
		}
	}

	function handleInputFocus() {
		setActive(true);
	}

	function handleInputBlur() {
		setActive(false);
	}
	return (
		<div className={`relative w-full ${className}`}>
			<p
				className={`unselectable text-[#71718E] duration-200 absolute pointer-events-none z-20 ${
					active
						? " top-[12px] text-[10px] font-medium left-[16px] text-[]"
						: " top-[20px] left-[24px]"
				}`}
			>
				Date of Birth
			</p>
			<DatePicker
				className={`min-w-full h-full focus:outline-none border-[2px] border-solid rounded-[16px] bg-[#FBFBFB] placeholder:text-[#71718E] focus:border-black
          ${
						active
							? "pb-[10px] pt-[24px] pl-[16px]"
							: "pb-[16px] pt-[20px] pl-[16px]"
					}`}
				selected={selectedDate}
				maxDate={new Date()}
				onChange={handleDateChange}
				onFocus={handleInputFocus}
				dateFormat="dd/MM/yyyy"
				placeholderText={active ? "dd/mm/yyyy" : ""}
				{...inputProps}
			/>
			<p className="text-[12px] m-[5px] ">{description}</p>
		</div>
	);
}
