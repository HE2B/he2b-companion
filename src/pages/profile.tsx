import { Button, Space } from "antd-mobile";
import { Link } from "react-router";
import { useAppStore } from "../store";
import { useTranslation } from "react-i18next"; // Import i18n

export default function Profile() {
	const { logout, user } = useAppStore();
		const { t, i18n } = useTranslation(); // Traduction et changement de langue
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

			<Space
				direction="vertical"
				block={true}
				justify="center">
				<Link to="/personal-info" style={linkStyle}>
					<Button
						block
						style={linkButtonStyle}>
						{t("pinfo")}
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
						{t("settings")}
					</Button>
				</Link>
				<Button
					block
					fill="outline"
					color="danger"
					onClick={logout}>
					{t("logout")}
				</Button>
			</Space>
		</Space>
	</>;
}

const linkStyle = { textDecoration: 'none' };
const linkButtonStyle = { '--background-color': 'var(--adm-color-border)' };
