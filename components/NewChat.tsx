import { BsPlusLg } from "react-icons/bs";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { db } from "../firebase";

function NewChat() {
	const { data: session } = useSession();

	const router = useRouter();

	const createChat = async () => {
		try {
			const doc = await addDoc(
				collection(db, "users", session?.user?.email!, "chats"),
				{
					messages: [],
					userId: session?.user?.email!,
					createdAt: serverTimestamp(),
				}
			);
			router.push(`/chat/${doc.id}`);
		} catch (error) {
			toast.error("OPS...Something went wrong");
		}
	};

	return (
		<div
			className="flex items-center border rounded-xl bg-mediumPurple/20 mt-8 mb-4 p-2 space-x-2"
			onClick={createChat}
		>
			<BsPlusLg className="w-8 h-8  px-2" />

			<p className="uppercase font-bold text-2xl">new chat</p>
		</div>
	);
}

export default NewChat;
