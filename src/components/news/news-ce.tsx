import { CeNews } from "../../model/news";

export default function NewsCe({ news }: NewsCeProps) {
	return (
		<>
			News from CE
		</>
	);
}

export interface NewsCeProps {
	news: CeNews;
}
