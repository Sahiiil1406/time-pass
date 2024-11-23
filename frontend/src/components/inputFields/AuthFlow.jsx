import React, { Children } from "react";

export function AuthFlow({ children }) {
	return (
		<div className="w-full h-full flex flex-col items-center overflow-y-scroll ">
			<div
				style={{
					boxShadow: "box-shadow: rgba(99, 99, 99, 0.1) 0px 0px 8px 0px;",
				}}
				className="shadow1 w-full my-[100px] p-[40px] max-w-[460px]  rounded-[30px] relative"
			>
				{children}
				<img
					src="/formlogo.png"
					className="absolute w-[100px] top-[-30px] right-[-30px]"
					alt=""
				/>
			</div>
		</div>
	);
}

export function AuthH1({ children, className = "" }) {
	return <h1 className={`text-2xl font-medium ${className}`}>{children} </h1>;
}

export function AuthH2({ children, className = "" }) {
	return (
		<p className={`mt-[10px] text-[#8a8a8a] leading-5 mb-[40px]${className}`}>
			{children}
		</p>
	);
}

export function AuthFooter({
	left = "",
	right = "",
	leftOnClick = () => {},
	rightOnClick = () => {},
	rightDisabled = false,
}) {
	return (
		<div className="mt-[40px] flex flex-row-reverse justify-between w-full items-center font-medium ">
			<div
				onClick={rightOnClick}
				className={`duration-200 px-[40px] py-[16px]  rounded-full ${
					rightDisabled
						? "border border-slate-200 text-slate-400 pointer-events-none"
						: "bg-[#8378FF] hover:bg-[#978eff] text-white cursor-pointer"
				} `}
			>
				{right}
			</div>

			{left == "" ? (
				<div></div>
			) : (
				<div
					onClick={leftOnClick}
					className="text-[#8378FF] px-[20px] py-[16px] cursor-pointer"
				>
					{left}
				</div>
			)}
		</div>
	);
}
