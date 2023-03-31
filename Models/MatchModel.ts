import mongoose from "mongoose";
import { Matches, UserData } from "../allInterface";

interface matchData extends Matches, mongoose.Document {}

const matchSchema = new mongoose.Schema(
	{
		TeamA: {
			type: String,
		},

		TeamB: {
			type: String,
		},

		TeamScoresA: Number,
		TeamScoresB: Number,

		PreditOdd: {
			type: Number,
		},

		startTime: {
			type: String,
		},

		startDate: {
			type: String,
		},

		isStart: {
			type: Boolean,
			default: false,
		},

		isStop: {
			type: Boolean,
			default: false,
		},

		endTime: {
			type: String,
		},

		predict: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "predicts",
			},
		],
	},
	{ timestamps: true },
);

export default mongoose.model<matchData>("matches", matchSchema);
