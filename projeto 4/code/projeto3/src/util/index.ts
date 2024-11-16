export function createHistoryPayloadForStudent(studentId: number, advantageId: number, coins: number, type: string) {
	return {
		coins,
		type,
		student: { id: studentId },
		advantage: { id: advantageId },
		date: new Date(),
	};
}

export function createGenericHistoryPayloadForStudent(studentId: number, coins: number, type: string) {
	return {
		coins,
		type,
		student: { id: studentId },
		date: new Date(),
	};
}