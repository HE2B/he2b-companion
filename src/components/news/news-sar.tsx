import { SarNews } from "../../model/news";

export default function NewsSar({ news }: NewsSarProps) {
	return (
		<>
			News from SAR
		</>
	);
}

export interface NewsSarProps {
	news: SarNews;
}
