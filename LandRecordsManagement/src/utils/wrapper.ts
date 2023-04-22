import { toast } from "react-toastify";

type AsyncFunction<any> = (...args: any[]) => Promise<any>;

export const wrapper =
	<any>(fn: AsyncFunction<any>): AsyncFunction<any> =>
	async (...args: any[]): Promise<any> => {
		let result = [], err;
		try {
			result = await fn(...args);
		} catch (error) {
			if (error?.__proto__?.name === "Error") {
				const start = error.message.indexOf("{");
				const end = error.message.indexOf("}");
				if (start && end) {
					error = JSON.parse(error.message.substring(start, end + 1));
				}
				toast.error(error.message.split(":")[1]);
			}
			err = error;
		}
		return { err, result };
	};
