import { ChatBubbleLeftIcon, TrashIcon } from "@heroicons/react/24/solid";
import { collection, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { MouseEventHandler, useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";

type Props = {
	id: string;
	handler: MouseEventHandler;
};
const ChatRow = ({ id, handler }: Props) => {
	const pathname = usePathname();
	const router = useRouter();
	const { data: session } = useSession();
	const [active, setActive] = useState(false);
	const [messages] = useCollection(
		collection(db, "users", session?.user?.email!, "chats", id, "messages")
	);

	useEffect(() => {
		if (!pathname) return;
		setActive(pathname.includes(id));
	}, [pathname]);

	const deleteChat = async () => {
		try {
			await deleteDoc(
				doc(db, "users", session?.user?.email!, "chats", id)
			);
			router.replace("/");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Link
			href={`/chat/${id}`}
			className={`chatRow justify-center border rounded-xl ${
				active && "bg-mediumPurple font-bold"
			}`}
		>
			<div
				className="w-full flex justify-between space-x-2"
				onClick={handler}
			>
				<ChatBubbleLeftIcon className="h-6 w-6" />
				<p className="flex-1 truncate">
					{messages?.docs[messages?.docs.length - 1]?.data().text ||
						"Empty Chat"}
				</p>
				<TrashIcon
					className="h-6 w-6 text-gray-500 hover:text-red-500"
					onClick={deleteChat}
				/>
			</div>
		</Link>
	);
};

export default ChatRow;
