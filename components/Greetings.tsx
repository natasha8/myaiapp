import { useSession } from "next-auth/react";
import { Linebreaker, Pace, WindupChildren } from "windups";
import NewChat from "./NewChat";

export const AuntieWindup = () => {
	const { data: session } = useSession();
	return (
		<div className="w-full h-full flex flex-col justify-center items-center">
			<div className="h-[15rem]">
				<img src="https://i.ibb.co/wRMymzV/homerobot.png" />
			</div>
			<div className="w-2/3 space-y-4 md:space-y-8">
				<WindupChildren>
					<Pace getPace={(char) => (char === " " ? 400 : 40)}>
						<div className="text-lg md:text-6xl text-black font-bold">
							{`WELCOME ${session?.user?.name!}`}
						</div>
						<div className="md:text-4xl font-mono">
							{`my name is MYAI your personal AI assistant.`}
						</div>

						<div className="text-black font-extrabold">
							<NewChat />
						</div>
					</Pace>
				</WindupChildren>
			</div>
		</div>
	);
};
