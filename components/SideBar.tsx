"use client";
import Image from "next/image";
import NewChat from "./NewChat";
import { signOut, useSession } from "next-auth/react";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import ChatRow from "./ChatRow";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { GrClose } from "react-icons/gr";

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
	console.log("CHAT", chat);

	const [open, setOpen] = useState(false);

	const handleChats = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
		setOpen(!open);
	};

	console.log("OPEN", open);

	return (
		<>
			<div className="p-2 flex justify-center items-center md:flex-col md:h-[80vh] bg-ice rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none">
				<div className="w-full flex-1">
					<div className="hidden md:flex flex-col pt-4">
						<Image
							src="https://i.ibb.co/G9xJj1T/final-Logo.png"
							alt="logo_myai"
							width={400}
							height={400}
						/>
						<NewChat />

						<div className="flex flex-col space-y-4 my-4">
							{loading && (
								<div className="animate-pulse text-center text-white">
									<p>Loading Chats...</p>
								</div>
							)}

							{/*chatlist */}
							{chat?.docs.map((chat) => (
								<ChatRow
									key={chat.id}
									id={chat.id}
									handler={handleChats}
								/>
							))}
						</div>
					</div>
					<div className="w-full flex  items-center md:hidden">
						<BsThreeDotsVertical
							className="w-10 h-10"
							onClick={handleChats}
						/>
						<Image
							src="https://i.ibb.co/G9xJj1T/final-Logo.png"
							alt="logo_myai"
							width={200}
							height={200}
						/>
					</div>
				</div>
				{session && (
					<img
						onClick={() => signOut()}
						src={session.user?.image!}
						alt="avatar"
						className="w-14 h-14 md:h-20 md:w-20 rounded-full mx-auto mb-2 hover:opacity-50 cursor-pointer"
					/>
				)}
				{open && (
					<div className="md:hidden absolute z-50 w-11/12 top-28 bg-ice pb-4">
						<div className="w-full pl-4 pt-2 flex justify-end pr-4">
							<GrClose
								className="w-8 h-8 p-2 bg-white rounded-full"
								onClick={handleChats}
							/>
						</div>
						<div className="px-4">
							<NewChat />
						</div>

						<div className="px-4 space-y-2">
							{chat?.docs.map((chat) => (
								<ChatRow
									key={chat.id}
									id={chat.id}
									handler={handleChats}
								/>
							))}
						</div>
						{!chat?.docs && (
							<div className="w-11/12 uppercase text-2xl font-extrabold bg-white/50 rounded-xl">
								Non ci sono chat salvate
							</div>
						)}
					</div>
				)}
			</div>
		</>
	);
}

export default SideBar;
