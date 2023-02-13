import Chat from "../../../components/Chat";
import ChatInput from "../../../components/ChatInput";

type Props = {
	params: {
		id: string;
	};
};
function ChatPage({ params: { id } }: Props) {
	return (
		<div className="flex flex-col w-full h-full md:h-[90vh] overflow-hidden ">
			<Chat chatId={id} />
			<ChatInput chatId={id} />
		</div>
	);
}

export default ChatPage;
