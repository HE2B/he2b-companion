import { Navigate, Outlet } from "react-router";
import Navbar from "../components/navbar";
import { useAppStore } from "../store";

export default function LoggedInLayout() {
	const { isLoggedIn } = useAppStore();

	return !isLoggedIn()
		? <Navigate to="/login" />
		: <div style={{
			display: "flex",
			flexDirection: "column",
			height: "calc(100% - calc(env(safe-area-inset-top) * 1) - calc(env(safe-area-inset-bottom) * 1))",
			justifyContent: "space-between",
			marginInline: "1rem",
		}}>
			<div style={{
				overflowY: "auto",
			}}>
				<Outlet />
			</div>
			<Navbar />
		</div>;
}
