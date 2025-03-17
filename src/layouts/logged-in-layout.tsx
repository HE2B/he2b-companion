import { Space } from "antd-mobile";
import { Navigate, Outlet } from "react-router";
import Navbar from "../components/navbar";
import { useAppStore } from "../store";

export default function LoggedInLayout() {
	const { user } = useAppStore();

	return !user
		? <Navigate to="/login" />
		: <Space
			direction="vertical"
			block={true}
			style={{
				marginInline: "1rem",
				height: "calc(100% - calc(env(safe-area-inset-top) * 1) - calc(env(safe-area-inset-bottom) * 1))"
			}}>
			<Outlet />
			<Navbar />
		</Space>;
}
