import { ErrorBuilder } from "./ErrorBuilder";

export const ErrorHandler = (err: any, res: any) => {
	ErrorBuilder(err, res);
};
