"use client";
import { AuntieWindup } from "../components/Greetings";

function HomePage() {
	return (
		<div className="h-full flex flex-col text-white items-center justify-center ">
			<div className="w-11/12 h-full flex items-center justify-center flex-wrap">
				<AuntieWindup />
			</div>
		</div>
	);
}

export default HomePage;
