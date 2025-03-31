import { CommunicationNews } from "../../model/news";

export default function NewsCommunication({ news }: NewsCommunicationProps) {
	return (
		<>
			Communication News
		</>
	);
}

export interface NewsCommunicationProps {
	news: CommunicationNews;
}
