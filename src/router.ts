import { createBrowserRouter } from "react-router";

import App from "./app";

import LoggedInLayout from "./layouts/logged-in-layout";
import LoggedOutLayout from "./layouts/logged-out-layout";

import Home from "./pages/home";
import Schedule from "./pages/schedule";
import Settings from "./pages/settings";

const lazyLoadComp = (path: string) => async () => {
	const { default: Component } = await import(`./pages/${path}.tsx`);
	return { Component };
};

export const router = createBrowserRouter([
	{
		path: "/",
		Component: App,
		children: [
			{
				path: "login",
				Component: LoggedOutLayout,
				children: [
					{ path: "", lazy: lazyLoadComp("login") },
				],
			},
			{
				path: "",
				Component: LoggedInLayout,
				children: [
					{ index: true, Component: Home },
					{ path: "home", Component: Home },
					{ path: "schedule", Component: Schedule },
					{ path: "marks", lazy: lazyLoadComp("marks") },
					{ path: "news", lazy: lazyLoadComp("news") },
					{ path: "profile", lazy: lazyLoadComp("profile") },
					{ path: "settings", Component: Settings },
					{ path: "personal-info", lazy: lazyLoadComp("personal-info") },
				],
			},
		],
	},
]);
