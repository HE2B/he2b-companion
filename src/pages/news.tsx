import { InfiniteScroll, List, PullToRefresh, Space, Tag } from "antd-mobile";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import NewsAbsence from "../components/news/news-absence";
import NewsCe from "../components/news/news-ce";
import NewsCommunication from "../components/news/news-communication";
import NewsMarks from "../components/news/news-marks";
import NewsOther from "../components/news/news-other";
import NewsSar from "../components/news/news-sar";
import NewsSport from "../components/news/news-sport";
import { News as N, NewsType } from "../model/news";
import { useAppStore } from "../store";

export default function News() {
	const { t } = useTranslation();
	const { getFilteredNews, tagFilters, toggleTagFilter, tagColors } = useAppStore();

	const grouped = Object.groupBy(getFilteredNews(), (news) => news.date.toLocaleDateString());
	const groups = Object.entries(grouped);

	const onRefresh = async () => { };
	const loadMore = async () => { };
	const hasMore = false;

	const availableTags = useMemo(() => {
		return Object.values(NewsType);
	}, []);

	const renderItem = useCallback((news: N) => {
		const t = news.type;
		switch(t) {
			case "absence": return <NewsAbsence news={news} />;
			case "ce": return <NewsCe news={news} />;
			case "sar": return <NewsSar news={news} />;
			case "marks": return <NewsMarks news={news} />;
			case "communication": return <NewsCommunication news={news} />;
			case "other": return <NewsOther news={news} />;
			case "sport": return <NewsSport news={news} />;
			default: t satisfies never;
		}
	}, []);

	return (
		<>
			<Space direction="vertical" block>
				<h1>{t("news")}</h1>

				<Space direction="horizontal" block wrap style={{ "--gap": "8px" }}>
					{availableTags.map((tag) => (
						<Tag
							color={tagColors[tag]}
							round
							fill={tagFilters.includes(tag) ? "solid" : "outline"}
							key={tag}
							style={{
								color: "var(--adm-color-text)",
								padding: '4px 12px',
								"--border-radius": "5px",
							}}
							onClick={() => toggleTagFilter(tag)}
						>
							{t(tag.toLowerCase())}
						</Tag>
					))}
				</Space>

				<PullToRefresh onRefresh={onRefresh}>
					{groups.map(([date, newsGroup]) => (
						<List key={date}>
							<div style={{
								padding: '15px',
								fontWeight: 'bold',
							}}>
								{date}
							</div>

							{newsGroup?.map((news) =>
								<List.Item key={news.id}>
									{renderItem(news)}
								</List.Item>
							)}
						</List>
					))}
					<InfiniteScroll
						loadMore={loadMore}
						hasMore={hasMore} />
				</PullToRefresh>
			</Space>
		</>
	);
}
