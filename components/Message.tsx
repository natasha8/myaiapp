import { DocumentData } from "firebase/firestore";

type Props = {
	message: DocumentData;
};

function Message({ message }: Props) {
	const isMYAI = message.user.name === "MYAI";

	return (
		<div
			className={`m-2 p-4 border rounded-xl ${
				isMYAI && "bg-purplePlain/50"
			}`}
		>
			<div className="flex items-center space-x-4 ">
				<img
					src={message.user.avatar}
					alt="avatar"
					className="rounded-full h-16 w-16 my-2"
				/>
				<div className="whitespace-pre-line">{message.text}</div>
			</div>
		</div>
	);
}

export default Message;
