"use client";
import { BsArrowDownCircle } from "react-icons/bs";
import { collection, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import Message from "./Message";

type Props = {
	chatId: string;
};
const Chat = ({ chatId }: Props) => {
	const { data: session } = useSession();

	const [messages] = useCollection(
		session &&
			query(
				collection(
					db,
					"users",
					session?.user?.email!,
					"chats",
					chatId,
					"messages"
				),
				orderBy("createdAt", "asc")
			)
	);

	return (
		<div className="flex-1 space-y-4 mt-20 md:mt-0 h-2/3">
			{messages?.empty && (
				<>
					<p className="mt-10 text-center text-white text-xl">
						Type a prompt in below to get started!
					</p>
					<BsArrowDownCircle className="h-8 w-8 min-w-full mx-auto mt-5 text-white animate-bounce" />
				</>
			)}
			<div className="h-full scrollbar-thin scrollbar-thumb-white scrollbar-track-transparent overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full px-2">
				{messages?.docs.map((message) => (
					<Message key={message.id} message={message.data()} />
				))}
			</div>
		</div>
	);
};

export default Chat;
