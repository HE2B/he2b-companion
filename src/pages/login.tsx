import { Button, Image, Space } from "antd-mobile";
import { FcGoogle } from "react-icons/fc";
import { useAppStore } from "../store";

import img from "../assets/bienvenue.png";

export default function Login() {
	const { login } = useAppStore();

	return <>
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
				onClick={login}>
				<Space>
					<FcGoogle size={22} />
					Log in with Google
				</Space>
			</Button>
		</Space>
		<style>
			{`
			body {
				background-color: #E9B4CC;
			}
			`}
		</style>
	</>;
}
