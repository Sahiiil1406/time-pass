import React, { useState } from "react";
import {
	AuthFlow,
	AuthFooter,
	AuthH1,
	AuthH2,
} from "../../../components/inputFields/AuthFlow";
import { useNavigate } from "react-router-dom";
import FormButton from "../../../components/inputFields/FormButton";
import InputField from "../../../components/inputFields/InputField";

import DatePickerInput from "../../../components/inputFields/DatePickerInput";
import RadioGroup from "../../../components/inputFields/RadioGroup";
export default function SignUpDetails() {
	const navigate = useNavigate();

	const [selectedOption, setSelectedOption] = useState("");
	const options = ["Male", "Female", "Other"];

	const handleOptionChange = (option) => {
		setSelectedOption(option);
	};
	return (
		<>
			<AuthH1>Sign Up </AuthH1>
			<AuthH2>
				Create an account and start
				<br /> spilling the beans
			</AuthH2>
			<InputField placeholder="Full Name" />
			<InputField placeholder="Email or Phone Number" />
			<DatePickerInput className="w-full" />
			<RadioGroup
				options={options}
				selectedOption={selectedOption}
				onChange={handleOptionChange}
			/>
			<AuthFooter
				right="Continue"
				left="Skip"
				rightOnClick={() => {
					navigate("/signup/otp");
				}}
				leftOnClick={() => {
					navigate("/signup/otp");
				}}
			/>
		</>
	);
}
