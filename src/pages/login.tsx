import { Button, Image, Space } from "antd-mobile";
import { FcGoogle } from "react-icons/fc";
import { useAppStore } from "../store";

import { useTranslation } from "react-i18next";
import img from "../assets/bienvenue.png";

export default function Login() {
	const { t } = useTranslation();
	const { login } = useAppStore();

	return (
		<>
			<Space
				direction="vertical"
				block={true}
				justify="center"
				align="center"
				style={{
					'--gap': '2rem',
					height: "100%",
				}}>

				<Image
					src={img}
					height={200}
					fit="cover" />

				<Button
					block
					size="large"
					shape="rounded"
					onClick={login}
					style={{ "--border-color": "var(--adm-color-text)" }}>
					<Space>
						<FcGoogle size={22} />
						{t("sign_in_with_google")}
					</Space>
				</Button>

			</Space>

			<style>
				{`
			html[data-prefers-color-scheme="dark"] body {
				background-color:hsl(333, 54.60%, 12.00%);
			}
			html:not([data-prefers-color-scheme="dark"]) body {
				background-color:hsl(333, 54.60%, 81.00%);
			}
			`}
			</style>
		</>
	);
}
