import { Navigate, Outlet } from "react-router";
import Navbar from "../components/navbar";
import { useAppStore } from "../store";

export default function LoggedInLayout() {
	const { isLoggedIn } = useAppStore();

	if(!isLoggedIn()) {
		return <Navigate to="/login" />;
	}

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				height: "calc(100% - env(safe-area-inset-top) - env(safe-area-inset-bottom))",
				justifyContent: "space-between",
				marginInline: "1rem",
			}}
		>

			<div style={{
				overflowY: "auto",
				flex: 1,
				display: "flex",
				flexDirection: "column",
			}}>
				<Outlet />
			</div>

			<Navbar />

		</div>
	);
}
