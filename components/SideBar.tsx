"use client";
import Image from "next/image";
import NewChat from "./NewChat";
import { signOut, useSession } from "next-auth/react";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import ChatRow from "./ChatRow";

function SideBar() {
	const { data: session } = useSession();

	const [chat, loading, error] = useCollection(
		session &&
			query(
				collection(db, "users", session?.user?.email!, "chats"),
				orderBy("createdAt", "asc")
			)
	);

	return (
		<div className="p-2 flex flex-col h-screen">
			<div className="flex-1">
				<div className="flex flex-col ">
					{/*new chat */}
					<Image
						src="https://i.ibb.co/gTczLQn/myai.png"
						alt="logo_myai"
						width={400}
						height={400}
					/>
					<NewChat />

					<div className="space-y-4">
						{/*chatlist */}
						{chat?.docs.map((chat) => (
							<ChatRow key={chat.id} id={chat.id} />
						))}
					</div>
				</div>
			</div>
			{session && (
				<img
					onClick={() => signOut()}
					src={session.user?.image!}
					alt="avatar"
					className="h-20 w-20 rounded-full mx-auto mb-2 hover:opacity-50 cursor-pointer"
				/>
			)}
		</div>
	);
}

export default SideBar;
