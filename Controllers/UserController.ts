import { Request, Response } from "express";
import { ErrorDefiner } from "../Handlers/ErrorDefiner";
import { ErrorHandler } from "../Handlers/ErrorHandler";
import { HTTPCode } from "../Handlers/httpStatus";
import UserModel from "../Models/UserModel";

export const GetUsers = async (req: Request, res: Response) => {
	try {
		const getUsers = await UserModel.find();

		return res.status(HTTPCode.OK).json({
			message: "successfull",
			data: getUsers,
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

export const GetUser = async (req: Request, res: Response) => {
	try {
		const getUsers = await UserModel.findById(req.params.id);

		return res.status(HTTPCode.OK).json({
			message: "successfull",
			data: getUsers,
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

export const createUser = async (req: Request, res: Response) => {
	try {
		const { userName, email, password } = req.body;
		const user = await UserModel.findOne({ userName: userName });
		if (!user) {
			const creating = await UserModel.create({
				userName,
				email,
				password,
			});
			return res.status(HTTPCode.OK).json({
				message: "successfull",
				data: creating,
			});
		} else {
			return res.status(HTTPCode.NOT_FOUND).json({
				message: "an account with this user already exists",
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
