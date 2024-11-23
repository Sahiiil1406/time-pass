import React from "react";
import {
	AuthFlow,
	AuthFooter,
	AuthH1,
	AuthH2,
} from "../../../components/inputFields/AuthFlow";
import { useNavigate } from "react-router-dom";
import FormButton from "../../../components/inputFields/FormButton";
import InputField from "../../../components/inputFields/InputField";
export default function SignUpPassword() {
	const navigate = useNavigate();
	return (
		<>
			<AuthH1>Set Password</AuthH1>
			<AuthH2>
				Set a secure password
				<br /> to protect your account
			</AuthH2>

			<InputField
				type="password"
				placeholder="Enter Password"
				className=" mt-[12px] mb-[30px]"
				description="Password must be 8 Characters long , contain a Uppercase letter and a Special character."
			/>
			<InputField
				type="password"
				placeholder="Repeat Password"
				className=" mt-[12px]"
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
