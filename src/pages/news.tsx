import { InfiniteScroll, List, PullToRefresh, Selector, Space } from "antd-mobile";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import NewsAbsence from "../components/news/news-absence";
import NewsCe from "../components/news/news-ce";
import NewsCommunication from "../components/news/news-communication";
import NewsMarks from "../components/news/news-marks";
import NewsOther from "../components/news/news-other";
import NewsSar from "../components/news/news-sar";
import { News as N } from "../model/news";
import { useAppStore } from "../store";

export default function News() {
	const { t } = useTranslation();
	const { getFilteredNews, allTags } = useAppStore();

	const grouped = Object.groupBy(getFilteredNews(), (news) => news.date.toLocaleDateString());
	const groups = Object.entries(grouped);

	const onRefresh = async () => { };
	const loadMore = async () => { };
	const hasMore = false;

	const renderItem = useCallback((news: N) => {
		switch(news.type) {
			case "absence": return <NewsAbsence news={news} />;
			case "ce": return <NewsCe news={news} />;
			case "sar": return <NewsSar news={news} />;
			case "marks": return <NewsMarks news={news} />;
			case "communication": return <NewsCommunication news={news} />;
			case "other": return <NewsOther news={news} />;
		}
	}, []);

	return (
		<>
			<Space direction="vertical" block>
				<h1>{t("news")}</h1>

				<Selector
					style={{
						'--border-radius': '100px',
						'--border': 'solid transparent 1px',
						'--checked-border': 'solid var(--adm-color-primary) 1px',
						'--padding': '4px 12px',
						fontSize: '0.75rem',
						overflowX: "auto",
						display: "flex",
					}}
					showCheckMark={false}
					multiple={true}
					options={allTags.map((tag) => ({
						label: (
							<div
								key={tag}
								style={{
									display: 'flex',
									alignItems: 'center',
									padding: '4px 12px',
									borderRadius: '20px',
								}}>
								{tag}
							</div>
						),
						value: tag
					}))}
				/>

				<PullToRefresh onRefresh={onRefresh}>
					{groups.map(([date, newsGroup]) => (
						<List key={date}>
							<div style={{
								padding: '10px',
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
