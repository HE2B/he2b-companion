import { ReactNode } from "react";

export type ReactI18NextChildren = ReactNode;

export interface BaseNews {
	id: string;
	date: Date;
	tags: NewsType[];
}

export interface AbsenceNews extends BaseNews {
	description: ReactI18NextChildren | Iterable<ReactI18NextChildren>;
	title: ReactI18NextChildren | Iterable<ReactI18NextChildren>;
	type: "absence";

	teacherName: string;
	teacherMonogram: string;
	teacherGender: string;
	className: string;
	classCode: string;
	classStartTime: Date;
	classEndTime: Date;
	groupCode: string;
}

export interface CeNews extends BaseNews {
	type: "ce";

	title: string;
	description?: string;
	image?: string;
}

export interface SarNews extends BaseNews {
	type: "sar";

	title: string;
	description?: string;
	image?: string;
}

export interface MarksNews extends BaseNews {
	description: ReactI18NextChildren | Iterable<ReactI18NextChildren>;
	title: ReactI18NextChildren | Iterable<ReactI18NextChildren>;
	type: "marks";

	className: string;
	classCode: string;
}

export interface CommunicationNews extends BaseNews {
	type: "communication";

	title: string;
	description?: string;
	image?: string;
}

export interface OtherNews extends BaseNews {
	type: "other";

	title: string;
	description?: string;
	image?: string;
}

export interface SportNews extends BaseNews {
	type: "sport";

	title: string;
	description?: string;
	image?: string;
}

export type News =
	| AbsenceNews
	| CeNews
	| SarNews
	| MarksNews
	| CommunicationNews
	| OtherNews
	| SportNews;

export enum NewsType {
	ABSENCE = "absence",
	CE = "ce",
	SAR = "sar",
	MARKS = "marks",
	COMMUNICATION = "communication",
	OTHER = "other",
	SPORT = "sport",
}
