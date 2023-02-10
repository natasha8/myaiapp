import SessionProvider from "../components/SessionProvider";
import SideBar from "../components/SideBar";
import { getServerSession } from "next-auth";
import "../styles/globals.css";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import Login from "../components/Login";

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getServerSession(authOptions);
	console.log(session, "session");
	return (
		<html>
			<head />
			<body>
				<SessionProvider session={session}>
					{!session ? (
						<Login />
					) : (
						<div className="flex w-screen h-screen">
							{/* Sidebar */}
							<div className="bg-ice max-w-xs h-screen overflow-y-auto md:min-w-[15rem]">
								<SideBar />
							</div>
							{/*Client Provider  - Notification */}

							{/*  */}
							<div className="bg-mediumPurple flex-1">
								{children}
							</div>
						</div>
					)}
				</SessionProvider>
			</body>
		</html>
	);
}
