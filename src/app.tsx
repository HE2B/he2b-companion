import { ConfigProvider, SafeArea } from "antd-mobile";
import enUS from "antd-mobile/es/locales/en-US";
import { Route, Routes } from "react-router";

import Login from "./pages/login";
import News from "./pages/news";
import Profile from "./pages/profile";
import Schedule from "./pages/schedule";

import PWABadge from "./PWABadge";
import LoggedInLayout from "./layouts/logged-in-layout";
import LoggedOutLayout from "./layouts/logged-out-layout";
import Home from "./pages/home";
import Marks from "./pages/marks";
import PersonalInfo from "./pages/personal-info";
import Settings from "./pages/settings";

export default function App() {
	return (
		<>
			<ConfigProvider locale={enUS}>
				<SafeArea position="top" />
				<Routes>
					<Route path="/login" element={<LoggedOutLayout />}>
						<Route path="" element={<Login />} />
					</Route>
					<Route path="/" element={<LoggedInLayout />}>
						<Route path="home" element={<Home />} />
						<Route path="schedule" element={<Schedule />} />
						<Route path="news" element={<News />} />
						<Route path="profile" element={<Profile />} />
						<Route path="settings" element={<Settings />} />
						<Route path="marks" element={<Marks />} />
						<Route path="personal-info" element={<PersonalInfo />} />
					</Route>
				</Routes>
				<PWABadge />
				<SafeArea position="bottom" />
			</ConfigProvider>
		</>
	);
}
