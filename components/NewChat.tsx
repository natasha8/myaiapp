import { PlusIcon } from "@heroicons/react/24/solid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
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
			console.error(error);
			alert(error);
		}
	};

	return (
		<div className="w-20" onClick={createChat}>
			<PlusIcon />
		</div>
	);
}

export default NewChat;
