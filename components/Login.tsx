"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

const Login = () => {
	return (
		<div className="w-screen h-screen flex flex-col justify-center items-center bg-ice space-y-8">
			<Image
				src="https://i.ibb.co/gTczLQn/myai.png"
				alt="logo_myai"
				width={400}
				height={400}
			/>
			<button
				className="font-bold text-3xl animate-pulse uppercase rounded-full border-2 p-4 border-purplePlain bg-purplePlain/20"
				onClick={() => signIn("google")}
			>
				Enter with Google
			</button>
			<button
				className="font-bold text-3xl animate-pulse uppercase rounded-full border-2 p-4 border-purplePlain bg-purplePlain/20"
				onClick={() => signIn("github")}
			>
				Enter with Github
			</button>
		</div>
	);
};

export default Login;
