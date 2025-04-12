import { NoticeBar } from "antd-mobile";
import { useAppStore } from "../store";

export default function NetworkStatusBar() {
	const { online } = useAppStore();

	return (
		<div style={{
			marginInline: "-1rem",
		}}>
			{!online && (
				<NoticeBar content="No Access to the Internet" color="error" />
			)}
		</div>
	);
}
