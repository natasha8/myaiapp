import { DocumentData } from "firebase/firestore";

type Props = {
	message: DocumentData;
};

function Message({ message }: Props) {
	const isMYAI = message.user.name === "MYAI";

	return (
		<div className={`${isMYAI && "bg-black"}`}>
			<div className="flex  items-center space-x-4 px-4 my-4 max-w-2xl border rounded-xl">
				<img
					src={message.user.avatar}
					alt="avatar"
					className="rounded-full h-16 w-16 my-2"
				/>
				<p>{message.user.text}</p>
			</div>
		</div>
	);
}

export default Message;
