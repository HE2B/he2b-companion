export interface Class {
	classCode: string;
	className: string;
	endTime: Date;
	id: string; // TODO: remove, this will come from the firestore document
	room: string;
	startTime: Date;
	teacherMatricule: string;
	teacherName: string;
}
