type Props = {
	chatId: string;
};
const Chat = ({ chatId }: Props) => {
	return <div className="flex-1">{chatId}</div>;
};

export default Chat;
