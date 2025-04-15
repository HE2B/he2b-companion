import { Skeleton } from "antd-mobile";

export default function LoadingLayout() {
	return (
		<>
			<Skeleton.Title animated />
			<Skeleton.Paragraph lineCount={5} animated />
		</>
	);
}
