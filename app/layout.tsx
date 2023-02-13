import SessionProvider from "../components/SessionProvider";
import SideBar from "../components/SideBar";
import { getServerSession } from "next-auth";
import "../styles/globals.css";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import Login from "../components/Login";
import ClientProvider from "../components/ClientProvider";

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getServerSession(authOptions);

	return (
		<html>
			<head />
			<body>
				<SessionProvider session={session}>
					<>
						{!session ? (
							<div className="flex justify-center items-center w-screen min-h-screen md:h-screen bg-black">
								<Login />
							</div>
						) : (
							<div className="flex justify-center md:items-center w-screen h-screen  md:bg-black font-mono">
								{/* Sidebar */}
								<div className="h-full w-full md:w-11/12 2xl:w-3/4 flex flex-col items-center md:py-8 md:flex-row ">
									<div className="w-full fixed top-0 md:static  md:max-w-xs">
										<SideBar />
									</div>
									{/*Client Provider  - Notification */}
									<ClientProvider />
									{/*  */}
									<div className="w-full h-full md:h-auto bg-[#BB84E8]/80 flex-1 md:rounded-r-3xl ">
										{children}
									</div>
								</div>
							</div>
						)}
					</>
				</SessionProvider>
			</body>
		</html>
	);
}
