import { Application } from "express";
import express from "express";
import cors from "cors";
import { ErrorHandler } from "./Handlers/ErrorHandler";
import { ErrorDefiner } from "./Handlers/ErrorDefiner";
import { HTTPCode } from "./Handlers/httpStatus";
import Users from "./Routes/UserRoutes";
import Match from "./Routes/MatchRoute";
import Preds from "./Routes/PredictRoutes";

export const middlewares = (app: Application) => {
	app
		.use(express.json())
		.use(cors())
		.use("/api/user", Users)
		.use("/api/match", Match)
		.use("/api/predict", Preds)

		.use("*", (req, res) => {
			new ErrorDefiner({
				name: "app error",
				message: `this route ${req.originalUrl} does not exists`,
				status: HTTPCode.NOT_FOUND,
				isSuccess: false,
			});
		})

		.use(ErrorHandler);
};
