import * as yup from "yup";

const addrecordValidationSchema = yup.object().shape({
	// name: yup.string().required("Name is Required"),
	// mutationNumber: yup.string().required("Aadhar Number is required"),
	// state: yup.string().required("Feild is Required"),
	// district: yup.string().required("Feild is Required"),
	// tehsil: yup.string().required("Feild is Required"),
	// village: yup.string().required("Feild is Required"),
	// pincode: yup.string().required("Feild is Required"),
	// latitude: yup.string().required("Feild is Required"),
	// longitude: yup.string().required("Feild is Required"),
	// area: yup.string().required("Feild is Required"),
	// price: yup.string().required("price is required"),
	// isForSale: yup.boolean().required("this feild is required"),
	// supportDoc: yup.string().required("Support Document is required"),
});

export default addrecordValidationSchema;
