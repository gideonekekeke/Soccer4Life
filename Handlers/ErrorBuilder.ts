import { Request, Response } from "express";
import { ErrorDefiner } from "./ErrorDefiner";
import { HTTPCode } from "./httpStatus";

export const ErrorBuilder = (err: ErrorDefiner, res: Response) => {
	res.status(HTTPCode.INTERNAL_SERVER_ERROR).json({
		name: err.name,
		message: err.message,
		status: err.status,
		stack: err.stack,
		error: err,
	});
};
