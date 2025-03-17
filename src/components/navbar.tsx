import { Avatar, TabBar } from "antd-mobile";
import { useState } from "react";
import { TbCalendarWeekFilled, TbHomeFilled, TbNews, TbUserFilled } from "react-icons/tb";
import { useNavigate } from "react-router";
import { useAppStore } from "../store";

export default function Navbar() {
	const { user } = useAppStore();

	const tabs = [
		{
			key: "home",
			title: "Home",
			path: "/home",
			icon: <TbHomeFilled />,
		},
		{
			key: "schedule",
			title: "Schedule",
			path: "/schedule",
			icon: <TbCalendarWeekFilled />,
		},
		{
			key: "news",
			title: "News",
			path: "/news",
			icon: <TbNews />,
		},
		{
			key: "profile",
			title: "Profile",
			path: "/profile",
			// icon: <TbUserFilled />,
			icon: <Avatar
				src={user?.photoURL ?? ""}
				fallback={<TbUserFilled />}
				style={{ '--size': '1.5rem' }}
			/>
		},
	] as const;

	const [activeKey, setActiveKey] = useState<typeof tabs[number]["key"]>(tabs[0].key);
	const navigate = useNavigate();

	const handleTabChange = (key: typeof tabs[number]["key"]) => {
		setActiveKey(key);
		navigate(tabs.find(item => item.key === key)!.path);
	};

	return <>
		<TabBar activeKey={activeKey} onChange={handleTabChange as any}>
			{tabs.map(item => (
				<TabBar.Item
					icon={item.icon}
					title={item.title}
					key={item.key}
					onClick={() => handleTabChange(item.key)}
				/>
			))}
		</TabBar>
	</>;
}
