"use client";
import Image from "next/image";
import NewChat from "./NewChat";
import { signOut, useSession } from "next-auth/react";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import ChatRow from "./ChatRow";
import ModelSelection from "./ModelSelection";

function SideBar() {
	const { data: session } = useSession();
	//console.log("user", session?.user);

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
					<div className="hidden lg:inline">
						<ModelSelection />
					</div>

					<div className="flex flex-col space-y-4 my-4">
						{loading && (
							<div className="animate-pulse text-center text-white">
								<p>Loading Chats...</p>
							</div>
						)}

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
