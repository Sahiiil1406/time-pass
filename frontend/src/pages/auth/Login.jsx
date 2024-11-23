import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/inputFields/InputField";
import { Link } from "react-router-dom";
import FormButton from "../../components/inputFields/FormButton";
import OtpInput from "../../components/inputFields/OtpInput";
import axios from "axios";
import { useDispatch } from "react-redux";
import login from "../../feature/signup/authSlice";

export default function Login() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const login = async () => {
		const res = await axios.post("http://localhost:1406/user/login", {
			email,
			password,
		});
		if (res.data.token) {
			document.cookie = `token=${res.data.token}`;

			navigate("/feed");
		}
	};

	const navigate = useNavigate();
	return (
		<div className=" h-full w-full flex">
			<div
				style={{
					background: `url("/loginBg.png")`,
					objectFit: `contain`,
					backgroundPosition: "left",
					backgroundSize: "cover",
					backgroundRepeat: "no-repeat",
				}}
				className=" flex-1 h-full"
			>
				hi
			</div>
			<div className="h-full w-[540px] flex items-center justify-center flex-col">
				<img src="/hLogo.png" className="w-[200px] mb-[60px]" alt="" />
				<InputField
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Email or Username"
					className="max-w-[320px] w-full"
				/>
				<InputField
					onChange={(e) => setPassword(e.target.value)}
					type="Password"
					placeholder="Password"
					className="max-w-[320px] w-full mt-[12px]"
				/>

				<FormButton onClick={login} className="mt-[18px] max-w-[320px]">
					Log In
				</FormButton>
				<Link
					to="/forgotPassword"
					className="text-[#8378FF] my-[24px] font-regular text-[14px]"
				>
					Forgot Password?
				</Link>

				<div className="flex mx-[20px] max-w-[320px] w-full items-center">
					<div className="flex-1 bg-slate-200 h-[1px]"></div>
					<p className="text-slate-500 mx-4 text-[14px]">OR</p>
					<div className="flex-1 bg-slate-200 h-[1px]"></div>
				</div>

				<Link
					to="/signup"
					className="text-[#AFAFAF] my-[24px] font-regular text-[14px] text-center "
				>
					Don’t have an account ?<br />
					<b className="font-semibold text-[#8378FF]"> Sign Up</b>
				</Link>
			</div>
		</div>
	);
}
