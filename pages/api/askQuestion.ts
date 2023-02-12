// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import query from "../../lib/queryApi";
import type { NextApiRequest, NextApiResponse } from "next";
import admin from "firebase-admin";
import { adminDb } from "../../firebaseAdmin";
import { toast } from "react-hot-toast";

type Data = {
	answer: string;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const { prompt, chatId, session } = req.body;

	const model = "text-davinci-003";

	try {
		if (!prompt) {
			res.status(400).json({ answer: "Please provide a prompt!" });
			return;
		}
		if (!chatId) {
			res.status(400).json({ answer: "Please enter a chat!" });
			return;
		}

		const response = await query(prompt, chatId, model);
		console.log("RESPONSE TEXT", response);
		const message: Message = {
			text: response,
			createdAt: admin.firestore.Timestamp.now(),
			user: {
				_id: "MYAI",
				name: "MYAI",
				avatar: "https://i.ibb.co/wRMymzV/homerobot.png",
			},
		};

		await adminDb
			.collection("users")
			.doc(session?.user?.email)
			.collection("chats")
			.doc(chatId)
			.collection("messages")
			.add(message);

		res.status(200).json({
			answer: message.text,
		});
	} catch (error) {
		toast.error("MYAI can't respond!");
	}
}
