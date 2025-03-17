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
				<h2>👋 {user?.user.displayName}</h2>
				<h4>{user?.user.email}</h4>
			</div>

			<Space
				direction="vertical"
				block={true}
				justify="center">
				<Link to="/personal-info" style={linkStyle}>
					<Button
						block
						style={linkButtonStyle}>
						Personal Info
					</Button>
				</Link>
				<Link to="/marks" style={linkStyle}>
					<Button
						block
						style={linkButtonStyle}>
						Marks
					</Button>
				</Link>
				<Link to="/settings" style={linkStyle}>
					<Button
						block
						style={linkButtonStyle}>
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
		</Space>
	</>;
}

const linkStyle = { textDecoration: 'none' };
const linkButtonStyle = { '--background-color': 'var(--adm-color-border)' };
