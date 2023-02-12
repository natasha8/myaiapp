"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
	return (
		<div className="w-5/6 md:w-full max-w-2xl rounded-3xl md:rounded-full py-12 flex flex-col justify-center items-center bg-ice space-y-8">
			<Image
				src="https://i.ibb.co/G9xJj1T/final-Logo.png"
				alt="logo_myai"
				width={400}
				height={400}
			/>
			<div className="space-x-2">
				<button
					className="font-bold text-3xl animate-pulse uppercase rounded-full border-2 p-4 border-purplePlain bg-purplePlain/20"
					onClick={() => signIn("google")}
				>
					<FcGoogle />
				</button>
				<button
					className="font-bold text-3xl animate-pulse uppercase rounded-full border-2 p-4 border-purplePlain bg-purplePlain/20"
					onClick={() => signIn("github")}
				>
					<FaGithub />
				</button>
			</div>
		</div>
	);
};

export default Login;
