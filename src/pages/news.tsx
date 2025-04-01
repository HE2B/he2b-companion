import { InfiniteScroll, List, PullToRefresh, Selector, Space } from "antd-mobile";
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
<<<<<<< HEAD
	const { getFilteredNews, tagFilters, toggleTagFilter, tagColors } = useAppStore();
=======
	const { getFilteredNews, allTags } = useAppStore();
>>>>>>> 73e8be6c56dde6cfe40efd6ff5a5edc60859b342

	const grouped = Object.groupBy(getFilteredNews(), (news) => news.date.toLocaleDateString());
	const groups = Object.entries(grouped);

	const onRefresh = async () => { };
	const loadMore = async () => { };
	const hasMore = false;

	// Get all available tags from NewsType
	const availableTags = useMemo(() => {
		return Object.values(NewsType);
	}, []);

	const renderItem = useCallback((news: N) => {
		switch(news.type) {
			case "absence": return <NewsAbsence news={news} />;
			case "ce": return <NewsCe news={news} />;
			case "sar": return <NewsSar news={news} />;
			case "marks": return <NewsMarks news={news} />;
			case "communication": return <NewsCommunication news={news} />;
			case "other": return <NewsOther news={news} />;
			case "sport": return <NewsSport news={news} />;
		}
	}, []);

	const handleTagChange = (values: string[]) => {
		// For each value in the selected values, toggle if not already present
		values.forEach(tag => {
			if (!tagFilters.includes(tag)) {
				toggleTagFilter(tag);
			}
		});
		
		// For each tag in tagFilters, if not in values, toggle it off
		tagFilters.forEach(tag => {
			if (!values.includes(tag)) {
				toggleTagFilter(tag);
			}
		});
	};

	return (
		<>
			<Space direction="vertical" block>
				<h1>{t("news")}</h1>

<<<<<<< HEAD
				<div className="tag-selector-container">
					{availableTags.map((tag) => (
						<div 
							key={tag}
							className={`tag-item ${tagFilters.includes(tag) ? 'selected' : ''}`}
							style={{
								backgroundColor: tagColors[tag],
								color: ['#FF4D4F', '#FFD700', '#FF8C00'].includes(tagColors[tag]) ? '#000' : '#fff',
								padding: '4px 12px',
								borderRadius: '100px',
								margin: '0 4px 8px 0',
								display: 'inline-block',
								cursor: 'pointer',
								fontSize: '0.75rem',
								border: tagFilters.includes(tag) 
									? 'solid var(--adm-color-primary) 1px' 
									: 'solid transparent 1px',
							}}
							onClick={() => toggleTagFilter(tag)}
						>
							{t(tag.toLowerCase())}
						</div>
					))}
				</div>
=======
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
>>>>>>> 73e8be6c56dde6cfe40efd6ff5a5edc60859b342

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