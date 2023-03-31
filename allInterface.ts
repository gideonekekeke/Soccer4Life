export interface UserData {
	userName: string;
	email: string;
	password: string;
	isAdmin: boolean;
	predict: PredictData[];
}
//
export interface PredictData {
	user: string;
	predictionScoreA: number;
	predictionScoreB: number;
	predictTime: string;
	matchId: string;
	name: string;
}

export interface Matches {
	TeamA: string;
	TeamB: string;
	TeamScoresA: number;
	TeamScoresB: number;
	PreditOdd: number;
	startTime: string;
	startDate: string;
	isStart: boolean;
	isStop: boolean;
	endTime: string;
	predict: PredictData[];
}
