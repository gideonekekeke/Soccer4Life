import { HTTPCode } from "./httpStatus";

interface argsError {
	name: string;
	message: string;
	status: HTTPCode;
	isSuccess: boolean;
}

export class ErrorDefiner extends Error {
	public readonly name: string;
	public readonly message: string;
	public readonly status: HTTPCode;
	public readonly isSuccess: boolean = true;

	constructor(args: argsError) {
		super(args.message);

		Object.setPrototypeOf(this, new.target.prototype);
		this.name = args.name || "Error";
		this.message = args.message;

		if (this.isSuccess !== undefined) {
			this.isSuccess = args.isSuccess;
		}

		Error.captureStackTrace(this);
	}
}
