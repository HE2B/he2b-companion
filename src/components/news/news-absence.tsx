import { Card } from "antd-mobile";
import { AbsenceNews } from "../../model/news";

export default function NewsAbsence({ news }: NewsAbsenceProps) {
	return <>
		<Card title={`[ABSENCE] ${news.teacherMonogram} - `} />
	</>;
}

export interface NewsAbsenceProps {
	news: AbsenceNews;
}
