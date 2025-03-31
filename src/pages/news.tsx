import { InfiniteScroll, List, PullToRefresh, Selector, Space, Card } from "antd-mobile";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

// News data
const news = [
  { id: 1, date: "2021-09-01", topic: "absence de personnel", tag: "Absence" },
  { id: 2, date: "2021-09-01", topic: "conseils étudiants", tag: "CE" },
  { id: 3, date: "2021-09-02", topic: "sar", tag: "SAR" },
  { id: 4, date: "2021-09-02", topic: "absence de prof", tag: "Absence" },
  { id: 5, date: "2021-09-03", topic: "marques", tag: "marks" },
  { id: 6, date: "2021-09-03", topic: "communication administratif", tag: "Communication" },
  { id: 7, date: "2021-09-04", topic: "Autres informations", tag: "Other" },
  { id: 8, date: "2022-09-04", topic: "Journée sportive", tag: "Sport" },
  { id: 9, date: "2023-05-24", topic: "Monsieur ABE Absent", tag: "Absence" },
];

// Mapping tag to a color
const tagColors = {
  "Absence": "#FF4D4F", // Rouge
  "CE": "#40A9FF", // Blue
  "SAR": "#7E4B8B", // Mauve
  "marks": "#FFD700", // Jaune
  "Communication": "#28A745", // Vert
  "Other": "#8E8E8E", // Gris
  "Sport": "#FF9F00", // Orange
};

export default function News() {
  const { t } = useTranslation();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const matchDarkMode = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(matchDarkMode.matches);

    matchDarkMode.addEventListener("change", (e) => {
      setIsDarkMode(e.matches);
    });

    return () => {
      matchDarkMode.removeEventListener("change", () => {});
    };
  }, []);

  const tags = [...new Set(news.map(news => news.tag)).values()];

  const filtered = news;
  const sorted = filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const grouped = Object.groupBy(sorted, (newsItem) => newsItem.date);

  const groups = Object.entries(grouped);

  const onRefresh = async () => {};
  const loadMore = async () => {};
  const hasMore = false;

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
  }}
  showCheckMark={false}
  multiple={true}
  options={tags.map((tag) => ({
    label: (
      <div style={{
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
              <div style={{ padding: '10px', fontWeight: 'bold' }}>
                {t('Actualité du: {{date}}', { date })}
              </div>
              {newsGroup.map((newsItem) => {
                const tagColor = tagColors[newsItem.tag] || "#000000";

                return (
                  <List.Item key={newsItem.id}>
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
                        backgroundColor: "#40A9FF",
						            position: 'absolute',
                        marginLeft: '-11px',
                        marginTop: '-12px',	
                        borderTopLeftRadius: '10px',
                        borderBottomLeftRadius: '10px',
                        overflow: 'hidden',
                      }}>
                      </div>

                      <div style={{ flex: 1 }}>
                        <div style={{fontWeight: 'bold' }}>
                          {t('{{tag}}', { tag: newsItem.tag })}
                        </div>
                        <div style={{ fontStyle: 'italic' }}>{newsItem.topic}</div>
                      </div>
                    </Card>
                  </List.Item>
                );
              })}
            </List>
          ))}
          <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
        </PullToRefresh>
      </Space>
    </>
  );
}
