import { NextFunction, Request, Response } from "express";

export const asyncHandler = (fx: any) => {
	return fx((req: Request, res: Response, next: NextFunction) => {
		return Promise.resolve(fx(req, res, next)).catch(next);
	});
};
