import { InfiniteScroll, List, PullToRefresh, Selector, Space } from "antd-mobile";

const news = [
	{
		id: 1,
		topic: "absence",
		date: "2021-09-01",
	},
	{
		id: 2,
		topic: "ce",
		date: "2021-09-01",
	},
	{
		id: 3,
		topic: "sar",
		date: "2021-09-02",
	},
	{
		id: 4,
		topic: "absence",
		date: "2021-09-02",
	},
	{
		id: 5,
		topic: "marks",
		date: "2021-09-03",
	},
	{
		id: 6,
		topic: "communication",
		date: "2021-09-03",
	},
	{
		id: 7,
		topic: "other",
		date: "2021-09-04",
	},
];

export default function News() {
	const topics = [...new Set(news.map(news => news.topic)).values()];

	// const filtered = news.filter(news => news.topic === "absence");
	const filtered = news;
	const sorted = filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
	const grouped = Object.groupBy(sorted, news => news.date) as Record<string, { id: number; topic: string; date: string; }[]>;
	const groups = Object.entries(grouped);

	const onRefresh = async () => { };

	const loadMore = async () => { };
	const hasMore = false;

	return <>
		<Space
			direction="vertical"
			block={true}>
			<h1>News</h1>

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

				{groups.map(([date, news]) => <>
					<List
						header={date}
						key={date}>
						{news.map(news => <>
							<List.Item key={news.id}>
								{news.topic}
							</List.Item >
						</>)}
					</List>
				</>)}
				<InfiniteScroll
					loadMore={loadMore}
					hasMore={hasMore} />

			</PullToRefresh>
		</Space>
	</>;
}
