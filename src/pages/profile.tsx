import { Button, Space } from "antd-mobile";
import { Link } from "react-router";
import { useAppStore } from "../store";

export default function Profile() {
	const { logout, user } = useAppStore();

	return <>
		<h1>Profile</h1>
		<Space
			direction="vertical"
			block={true}
			justify="center">

			<div>
				<h2>👋 {user?.displayName}</h2>
				<h4>{user?.email}</h4>
			</div>


			<Link to="/settings" style={{ textDecoration: 'none' }}>
				<Button
					block
					style={{ '--background-color': '#DDDDDD' }}>
					Settings
				</Button>
			</Link>

			<Button
				block
				fill="outline"
				color="danger"
				onClick={logout}>
				Logout
			</Button>
		</Space>
	</>;
}
