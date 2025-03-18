import { Avatar, TabBar } from "antd-mobile";
import { useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { TbCalendarWeekFilled, TbHomeFilled, TbNews, TbUserFilled } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router";
import { useAppStore } from "../store";

export default function Navbar() {
	const { t } = useTranslation();
	const { user } = useAppStore();

	const tabs = [
		{
			title: t("home"),
			path: "/home",
			icon: <TbHomeFilled />,
		},
		{
			title: t("calendar"),
			path: "/schedule",
			icon: <TbCalendarWeekFilled />,
		},
		{
			title: t("news"),
			path: "/news",
			icon: <TbNews />,
		},
		{
			title: t("profile"),
			path: "/profile",
			icon: <Avatar
				src={user?.photoURL ?? ""}
				fallback={<TbUserFilled />}
				style={{ '--size': '1.5rem' }}
			/>
		},
	] as const;

	const location = useLocation();
	useEffect(() => { }, [location, user]);

	const navigate = useNavigate();

	return <>
		<TabBar activeKey={location.pathname}>
			{tabs.map(item => (
				<TabBar.Item
					icon={item.icon}
					title={item.title}
					key={item.path}
					onClick={() => navigate(item.path)}
					style={{ padding: 15 }}
				/>
			))}
		</TabBar>
	</>;
}
