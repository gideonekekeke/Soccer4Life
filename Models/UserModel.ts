import mongoose from "mongoose";
import { UserData } from "../allInterface";

interface IData extends UserData, mongoose.Document {}

const userSchema = new mongoose.Schema(
	{
		userName: {
			type: String,
		},

		email: {
			type: String,
		},

		password: {
			type: String,
		},

		isAdmin: {
			type: Boolean,
			default: false,
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

export default mongoose.model<IData>("users", userSchema);
