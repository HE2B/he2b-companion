import { Card } from "antd-mobile";
import { SarNews } from "../../model/news";
import { useAppStore } from "../../store";

export default function NewsSar({ news }: NewsSarProps) {
	const { getTagsColor } = useAppStore();
	var tag = news.tags[0].toUpperCase();
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
				overflow: 'hidden !important',
				borderLeft: `10px solid ${getTagsColor(news.tags)}`,
			}}
		>
		<div style={{ flex: 1,padding:"10px" }}>
			<p style={{fontSize: 9, color: "gray"}}>{tag}</p>
			<b style={{borderTop: "1px solid gray", paddingTop: "8px"}}>{news.title}</b>
			<br />
			<i>{news.description}</i>
		</div>

		</Card>
		</>
	);
}

export interface NewsSarProps {
	news: SarNews;
}
