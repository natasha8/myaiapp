import SideBar from "../components/SideBar";
import "../styles/globals.css";
export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html>
			<head />
			<body>
				<div className="flex w-screen h-screen">
					{/* Sidebar */}
					<div className="bg-ice max-w-xs h-screen overflow-y-auto md:min-w-[15rem]">
						<SideBar />
					</div>
					{/*Client Provider  - Notification */}

					{/*  */}
					<div className="bg-mediumPurple flex-1">{children}</div>
				</div>
			</body>
		</html>
	);
}
