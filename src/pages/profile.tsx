import { Button, Space } from "antd-mobile";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { useAppStore } from "../store";

export default function Profile() {
	const { logout, user, getEmail } = useAppStore();
	const { t } = useTranslation();

	return (
		<>
			<h1>{t("profile")}</h1>

			<Space
				direction="vertical"
				block>

				<div>
					<h2>{user?.displayName}</h2>
					<h4>{getEmail()}</h4>
				</div>

				<br />

				<Space
					direction="vertical"
					block>

					<Link
						to="/personal-info"
						style={linkStyle}>
						<Button
							block
							style={linkButtonStyle}>
							{t("personal_info")}
						</Button>
					</Link>

					<Link
						to="/marks"
						style={linkStyle}>
						<Button
							block
							style={linkButtonStyle}>
							Marks
						</Button>
					</Link>

					<Link
						to="/settings"
						style={linkStyle}>
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
		</>
	);
}

const linkStyle = {
	textDecoration: "none",
};
const linkButtonStyle = {
	"--background-color": "var(--adm-color-border)",
};
