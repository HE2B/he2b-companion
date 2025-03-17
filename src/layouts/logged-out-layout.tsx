import { Navigate, Outlet } from "react-router";
import { useAppStore } from "../store";

export default function LoggedInLayout() {
	const { isLoggedIn } = useAppStore();

	return !isLoggedIn()
		? <Outlet />
		: <Navigate to="/home" />;
}
