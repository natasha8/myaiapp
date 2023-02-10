"use client";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import { db } from "../firebase";

type Props = {
	chatId: string;
};

const ChatInput = ({ chatId }: Props) => {
	const [prompt, setPrompt] = useState("");
	const { data: session } = useSession();

	//useSWR
	const model = "davinci";

	const sendPrompt = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!prompt) return;

		const input = prompt.trim();
		setPrompt("");

		const message: Message = {
			text: input,
			createdAt: serverTimestamp(),
			user: {
				_id: session?.user?.email!,
				name: session?.user?.name!,
				avatar:
					session?.user?.image! ||
					`https://ui-avatar.com/api/?name=${session?.user?.name}`,
			},
		};

		try {
			await addDoc(
				collection(
					db,
					"users",
					session?.user?.email!,
					"chats",
					chatId,
					"messages"
				),
				message
			);
			await fetch("/api/askQuestion", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ prompt: input, chatId, model, session }),
			}).then((res) => {
				toast.success("ChatGPT has responded!", {
					id: notification,
				});
			});
		} catch (error) {}
	};

	return (
		<div className="w-full bg-purplePlain mx-auto p-4 ring-none outline-none">
			<form onSubmit={sendPrompt} className="flex items-center space-x-2">
				<input
					type="text"
					className="bg-transparent focus:outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-300"
					onChange={(e) => setPrompt(e.target.value)}
					value={prompt}
					placeholder="Type your message here"
					disabled={!session}
				/>
				<button
					disabled={!prompt || !session}
					className="bg-ice hover:opacity-50 text-white font-bold py-2 px-4 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
					type="submit"
				>
					<PaperAirplaneIcon className="w-6 h-6" />
				</button>
			</form>
			<div></div>
		</div>
	);
};

export default ChatInput;
