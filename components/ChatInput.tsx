"use client";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import {
	addDoc,
	collection,
	orderBy,
	query,
	serverTimestamp,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import { toast } from "react-hot-toast";
import { db } from "../firebase";
import useSWR from "swr";

type Props = {
	chatId: string;
};

function ChatInput({ chatId }: Props) {
	const [prompt, setPrompt] = useState("");
	const { data: session } = useSession();

	//useSWR
	//const model = "davinci";
	const { data: model } = useSWR("models", {
		fallbackData: "text-davinci-003",
	});

	const sendPrompt = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!prompt) return;

		const input = prompt.trim();
		setPrompt("");
		// console.log("input", input);

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

		const notification = toast.loading("MYAI is thinking...");

		await fetch("/api/askQuestion", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ prompt: input, chatId, model, session }),
		})
			.then(() => {
				toast.success("MYAI has responded!", {
					id: notification,
				});
			})
			.catch((err) => {
				toast.error("Sorry MYAI can't reply!");
			});
	};

	return (
		<div className="w-full bg-purplePlain p-4 ring-none outline-none rounded-b-3xl md:rounded-bl-none">
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
		</div>
	);
}

export default ChatInput;
