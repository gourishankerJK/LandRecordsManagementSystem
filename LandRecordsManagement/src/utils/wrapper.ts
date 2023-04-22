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
					console.log(error);
					error = JSON.parse(error.message.substring(start, end + 1));
				}

				let temp = error.message.split(":")[1];
				if(!toast.isActive(temp)) toast.error(temp , {toastId : temp , autoClose: 2000});
				
			}
			err = error;
			console.log(err);
		}
		return { err, result };
	};


	