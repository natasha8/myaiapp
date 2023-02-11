import { DocumentData } from "firebase/firestore";

type Props = {
	message: DocumentData;
};

function Message({ message }: Props) {
	const isMYAI = message.user.name === "MYAI";

	return (
		<div
			className={`p-4 border rounded-xl ${isMYAI && "bg-purplePlain/50"}`}
		>
			<div className="flex  items-center space-x-4 max-w-2xl ">
				<img
					src={message.user.avatar}
					alt="avatar"
					className="rounded-full h-16 w-16 my-2"
				/>
				<p>{message.text}</p>
			</div>
		</div>
	);
}

export default Message;
