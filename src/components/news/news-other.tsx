import { Card } from "antd-mobile";
import { OtherNews } from "../../model/news";
import { useAppStore } from "../../store";

export default function NewsOther({ news }: NewsOtherProps) {
	const { getTagsColor } = useAppStore();

	return (
		<>
			<Card
				style={{
					display: 'flex',
					flexDirection: 'row',
					borderRadius: '10px',
					border: 'solid 0.5px var(--adm-border-color)',
					boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
					backgroundColor: 'var(--adm-background-color)',
					color: 'var(--adm-text-color)',
					overflow: 'hidden',
				}}
			>
				<div style={{
					width: '5px',
					height: '74%',
					backgroundColor: getTagsColor(news.tags),
					position: 'absolute',
					marginLeft: '-11px',
					marginTop: '-12px',
					borderTopLeftRadius: '10px',
					borderBottomLeftRadius: '10px',
					overflow: 'hidden',
				}} />

				<div style={{ flex: 1 }}>
					<b>{news.title}</b>
					<br />
					<i>{news.description}</i>
				</div>
			</Card>
		</>
	);
}

export interface NewsOtherProps {
	news: OtherNews;
}
