import { Navigate, Outlet } from "react-router";
import { useAppStore } from "../store";

export default function LoggedInLayout() {
	const { user } = useAppStore();

	return !user
		? <Outlet />
		: <Navigate to="/home" />;
}
