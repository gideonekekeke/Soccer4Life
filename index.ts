import express from "express";
import { middlewares } from "./middleware";
import "./utils/db";
const port: number = 2020;

const app = express();
middlewares(app);

const server = app.listen(port, () => {
	console.log("listening on port");
});

process.on("uncaughtException", () => {
	process.exit(1);
});

process.on("unhandledRejection", (res: any) => {
	server.close(() => {
		process.exit(1);
	});
});
