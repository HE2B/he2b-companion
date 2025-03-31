import { MarksNews } from "../../model/news";

export default function NewsMarks({ news }: NewsMarksProps) {
	return (
		<>
			Marks News
		</>
	);
}

export interface NewsMarksProps {
	news: MarksNews;
}
