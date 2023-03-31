import { Request, Response } from "express";
import { ErrorDefiner } from "../Handlers/ErrorDefiner";
import { HTTPCode } from "../Handlers/httpStatus";
import UserModel from "../Models/UserModel";
import MatchModel from "../Models/MatchModel";
import PredictModel from "../Models/PredictModel";
import mongoose from "mongoose";

export const PredictNow = async (req: Request, res: Response) => {
	try {
		const getUsers: any = await UserModel.findById(req.params.id);
		const getMatch: any = await MatchModel.findById(req.params.matchId);
		const { user, predictionScoreA, predictionScoreB, predictTime, matchId } =
			req.body;

		if (getMatch?.isStart) {
			const createPredict = await PredictModel.create({
				user: getUsers?._id,
				predictionScoreA,
				predictionScoreB,
				predictTime: new Date(),
				matchId: getMatch?._id,
				name: getUsers?.userName,
			});

			await getUsers?.predict?.push(
				new mongoose.Types.ObjectId(createPredict?._id),
			);
			getUsers?.save();

			await getMatch?.predict?.push(
				new mongoose.Types.ObjectId(createPredict?._id),
			);
			getMatch?.save();

			return res.status(HTTPCode.OK).json({
				message: "successfull",
			});
		} else {
			return res.status(404).json({
				message: "match has not started",
			});
		}
	} catch (err) {
		new ErrorDefiner({
			name: "app error",
			message: `cannot get user`,
			status: HTTPCode.NOT_FOUND,
			isSuccess: false,
		});
	}
};
