import mongoose from "mongoose";
import { Matches, PredictData, UserData } from "../allInterface";

interface predictData extends PredictData, mongoose.Document {}

const matchSchema = new mongoose.Schema(
	{
		user: {
			type: String,
		},

		matchId: {
			type: String,
		},

		predictionScoreA: Number,
		predictionScoreB: Number,
		name: String,

		predictTime: {
			type: String,
		},
	},
	{ timestamps: true },
);

export default mongoose.model<predictData>("predicts", matchSchema);
