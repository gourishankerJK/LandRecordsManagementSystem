import * as yup from "yup";

const addrecordValidationSchema = yup.object().shape({
	name: yup.string().required("Name is Required"),
	mutationNumber: yup.string().required("Aadhar Number is required"),
	location : yup.object().shape({
		state: yup.string().required("state is Required"),
		district: yup.string().required("district is Required"),
		tehsil: yup.string().required("tehsil is Required"),
		village: yup.string().required("village is Required"),
		pincode: yup.string().required("pincode is Required"),
		latitude: yup.string().required("latitude is Required"),
		longitude: yup.string().required("longitude is Required"),
		area: yup.string().required("Area is Required")
	}),
	
	price: yup.string().required("price is required"),
	supportDoc: yup.string().required("Support Document is required"),
});

export default addrecordValidationSchema;
