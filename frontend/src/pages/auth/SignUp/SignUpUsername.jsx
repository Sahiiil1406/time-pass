import React from "react";
import {
	AuthFlow,
	AuthH1,
	AuthH2,
} from "../../../components/inputFields/AuthFlow";
import FormButton from "../../../components/inputFields/FormButton";
import InputField from "../../../components/inputFields/InputField";
export default function SignUpUsername() {
	return (
		<>
			<AuthH1>Sign Up </AuthH1>
			<AuthH2>
				Create an account and start
				<br /> spilling the beans
			</AuthH2>
			<InputField placeholder="Full Name" />
			<InputField placeholder="Email or Phone Number" className=" mt-[12px]" />
			<InputField placeholder="username" className=" mt-[12px]" />
			<InputField
				type="password"
				placeholder="Password"
				className=" mt-[12px]"
			/>

			<FormButton className="mt-[18px]">Sign Up</FormButton>
		</>
	);
}
