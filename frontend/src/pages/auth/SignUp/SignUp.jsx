import React from "react";
import {
	AuthFlow,
	AuthH1,
	AuthH2,
} from "../../../components/inputFields/AuthFlow";
import InputField from "../../../components/inputFields/InputField";
import FormButton from "../../../components/inputFields/FormButton";
import OtpInput from "../../../components/inputFields/OtpInput";
import { Outlet, Route, Routes } from "react-router-dom";
import SignUpDetails from "./SignUpDetails";
import SignUpOtp from "./SignUpOtp";
import SignUpUsername from "./SignUpUsername";
import SignUpPassword from "./SignUpPassword";
export default function SignUp() {
	return (
		<AuthFlow>
			<Routes>
				<Route path="/" element={<SignUpDetails />} />
				<Route path="/otp" element={<SignUpOtp />} />
				<Route path="username" element={<SignUpUsername />} />
				<Route path="password" element={<SignUpPassword />} />
			</Routes>
			<Outlet />
		</AuthFlow>
	);
}
