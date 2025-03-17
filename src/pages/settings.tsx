import { Form, Segmented } from "antd-mobile";
import { SegmentedLabeledOption } from "antd-mobile/es/components/segmented/segmented";
import { TbMoon, TbSun } from "react-icons/tb";
import { useAppStore } from "../store";
import { Theme } from "../store/theme-store";

export default function Settings() {
	const { theme, setTheme } = useAppStore();

	const themes: Record<Theme, SegmentedLabeledOption & { value: Theme; }> = {
		light: {
			label: "Light",
			value: "light",
			icon: <TbSun />,
		},
		dark: {
			label: "Dark",
			value: "dark",
			icon: <TbMoon />,
		},
	};

	return <>
		<h1>Settings</h1>

		<Form layout="vertical">
			<Form.Item label="Theme">
				<Segmented
					options={Object.values(themes)}
					value={theme}
					onChange={setTheme as any}
					block
				/>
			</Form.Item>
		</Form>
	</>;
}
