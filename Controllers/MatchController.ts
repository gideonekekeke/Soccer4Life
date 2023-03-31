import { Request, Response } from "express";
import { ErrorDefiner } from "../Handlers/ErrorDefiner";
import { HTTPCode } from "../Handlers/httpStatus";
import MatchModel from "../Models/MatchModel";
import PredictModel from "../Models/PredictModel";
import UserModel from "../Models/UserModel";

export const GetMatches = async (req: Request, res: Response) => {
	try {
		const getMatch = await MatchModel.find();

		return res.status(HTTPCode.OK).json({
			message: "successfull",
			data: getMatch,
		});
	} catch (err) {
		new ErrorDefiner({
			name: "app error",
			message: `cannot get matches`,
			status: HTTPCode.NOT_FOUND,
			isSuccess: false,
		});
	}
};

export const GetSingleMatch = async (req: Request, res: Response) => {
	try {
		const getMatch = await MatchModel.findById(req.params.id).populate(
			"predict",
		);

		return res.status(HTTPCode.OK).json({
			message: "successfull",
			data: getMatch,
		});
	} catch (err) {
		new ErrorDefiner({
			name: "app error",
			message: `cannot get user`,
			status: HTTPCode.NOT_FOUND,
			isSuccess: false,
		});
	}
};

export const createMatch = async (req: Request, res: Response) => {
	try {
		const { TeamA, TeamB, PreditOdd, startTime, startDate, endTime } = req.body;
		const user = await UserModel.findById(req.params.id);
		console.log(user);
		if (user?.isAdmin) {
			const creating = await MatchModel.create({
				TeamA,
				TeamB,
				PreditOdd,
				startTime,
				startDate,
				endTime,
				TeamScoresA: 0,
				TeamScoresB: 0,
			});
			return res.status(HTTPCode.OK).json({
				message: "successfull",
				data: creating,
			});
		} else {
			return res.status(HTTPCode.NOT_FOUND).json({
				message: "only admin have permission for this",
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

export const AdminKickOffMatch = async (req: Request, res: Response) => {
	try {
		const user = await UserModel.findById(req.params.id);
		const getMatch = await MatchModel.findById(req.params.matchId);
		console.log(user);
		if (user?.isAdmin) {
			await MatchModel.findByIdAndUpdate(getMatch?._id, {
				isStart: true,
			});

			setTimeout(async () => {
				await MatchModel.findByIdAndUpdate(getMatch?._id, {
					isStop: true,
					isStart: false,
				});
			}, 300000);

			return res.status(HTTPCode.OK).json({
				message: "successfull",
			});
		} else {
			return res.status(HTTPCode.NOT_FOUND).json({
				message: "only admin have permission for this",
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

export const AdminUpdateScore = async (req: Request, res: Response) => {
	try {
		const { a, b } = req.body;
		const user = await UserModel.findById(req.params.id);
		const getMatch = await MatchModel.findById(req.params.matchId);
		console.log(user);
		if (user?.isAdmin && getMatch?.isStart) {
			await MatchModel.findByIdAndUpdate(getMatch?._id, {
				TeamScoresA: a,
				TeamScoresB: b,
			});

			// setTimeout(async () => {
			// await MatchModel.findByIdAndUpdate(getMatch?._id, {
			// isStop: true,
			// isStart: false,
			// });
			// }, 60000);

			return res.status(HTTPCode.OK).json({
				message: "successfull",
			});
		} else {
			return res.status(HTTPCode.NOT_FOUND).json({
				message: "match has ended",
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
