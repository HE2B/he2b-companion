import { Card } from "antd-mobile";

export default function AbsentTeacherCard(props: AbsentTeacherCardProps) {
	return <>
		<Card title={`[ABSENCE] ${props.teacherMonogram} - `} />
	</>;
}

export interface AbsentTeacherCardProps {
	teacherName: string;
	teacherGender: "male" | "female";
	teacherMonogram: string;
	classStartTime: Date;
	classCode: string;
	className: string;
}
