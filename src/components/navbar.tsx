import { Avatar, TabBar } from "antd-mobile";
import { useEffect } from "react";
import { TbCalendarWeekFilled, TbHomeFilled, TbNews, TbUserFilled } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router";
import { useAppStore } from "../store";

export default function Navbar() {
	const { user } = useAppStore();
	const tabs = [
		{
			title: "Home",
			path: "/home",
			icon: <TbHomeFilled />,
		},
		{
			title: "Schedule",
			path: "/schedule",
			icon: <TbCalendarWeekFilled />,
		},
		{
			title: "News",
			path: "/news",
			icon: <TbNews />,
		},
		{
			title: "Profile",
			path: "/profile",
			// icon: <TbUserFilled />,
			icon: <Avatar
				src={user?.user.photoURL ?? ""}
				fallback={<TbUserFilled />}
				style={{ '--size': '1.5rem' }}
			/>
		},
	] as const;

	const location = useLocation();
	useEffect(() => { }, [location]);

	const navigate = useNavigate();

	return <>
		<TabBar activeKey={location.pathname}>
			{tabs.map(item => (
				<TabBar.Item
					icon={item.icon}
					title={item.title}
					key={item.path}
					onClick={() => navigate(item.path)}
				/>
			))}
		</TabBar>
	</>;
}
