import React from "react";
import {
	AuthFlow,
	AuthFooter,
	AuthH1,
	AuthH2,
} from "../../../components/inputFields/AuthFlow";
import FormButton from "../../../components/inputFields/FormButton";
import InputField from "../../../components/inputFields/InputField";
import { useNavigate } from "react-router-dom";
import OtpInput from "../../../components/inputFields/OtpInput";
export default function SignUpOtp() {
	const navigate = useNavigate();
	return (
		<>
			<AuthH1>Verify Email</AuthH1>
			<AuthH2>
				Enter the otp sent to
				<br />{" "}
				<span className=" text-[#8378FF] ">sahilanand716@gmail.com edit</span>
			</AuthH2>
			<OtpInput />
			<div className="text-center mt-[30px] mb-[50px]">
				Didn't Recieve the OTP ?<br />
				<span className=" text-[#8378FF] ">Resend Otp</span>{" "}
			</div>
			<AuthFooter
				right="Continue"
				left="Skip"
				rightOnClick={() => {
					navigate("/signup/password");
				}}
				leftOnClick={() => {
					navigate("/signup/otp");
				}}
			/>
		</>
	);
}
