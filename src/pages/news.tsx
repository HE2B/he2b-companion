import { InfiniteScroll, List, PullToRefresh, Selector, Space } from "antd-mobile";
import { useTranslation } from "react-i18next";

const news = [
	{ id: 1, date: "2021-09-01", topic: "absence" },
	{ id: 2, date: "2021-09-01", topic: "ce" },
	{ id: 3, date: "2021-09-02", topic: "sar" },
	{ id: 4, date: "2021-09-02", topic: "absence" },
	{ id: 5, date: "2021-09-03", topic: "marks" },
	{ id: 6, date: "2021-09-03", topic: "communication" },
	{ id: 7, date: "2021-09-04", topic: "other" },
];

export default function News() {
	const { t } = useTranslation();
	const topics = [...new Set(news.map(news => news.topic)).values()];

	const filtered = news;
	const sorted = filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
	const grouped = Object.groupBy(sorted, news => news.date) as Record<string, { id: number; topic: string; date: string; }[]>;
	const groups = Object.entries(grouped);

	const onRefresh = async () => { };
	const loadMore = async () => { };
	const hasMore = false;

	return (
		<>
			<Space
				direction="vertical"
				block>

				<h1>{t("news")}</h1>

				<Selector
					style={{
						'--border-radius': '100px',
						'--border': 'solid transparent 1px',
						'--checked-border': 'solid var(--adm-color-primary) 1px',
						'--padding': '4px 12px',
						fontSize: '0.75rem',
					}}
					showCheckMark={false}
					multiple={true}
					options={topics.map(topic => ({ label: topic, value: topic }))}
				/>

				<PullToRefresh onRefresh={onRefresh}>
					{groups.map(([date, news]) => (
						<List header={date} key={date}>
							{news.map(news => (
								<List.Item key={news.id}>
									{news.topic}
								</List.Item>
							))}
						</List>
					))}
					<InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
				</PullToRefresh>

			</Space>
		</>
	);
}
