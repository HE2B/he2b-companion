import { Avatar, TabBar, Badge, Space } from "antd-mobile";
import { useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { TbCalendarWeekFilled, TbHomeFilled, TbNews, TbUserFilled, TbChartLine } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router";
import { useAppStore } from "../store";
import { path, title } from "framer-motion/client";

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
			title: t("marks"),
			path: "/marks",
			icon: (
				<Badge content="12" color="red">
					<TbChartLine />
				</Badge>
			),
		},
		{
			title: t("news"),
			path: "/news",
			icon: (
			<Badge content="2" color="red">
				<TbNews />
			</Badge>
			),
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

	return (
		<>
			<TabBar activeKey={location.pathname} style={{paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 10px)"}}>
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
		</>
	);
}
