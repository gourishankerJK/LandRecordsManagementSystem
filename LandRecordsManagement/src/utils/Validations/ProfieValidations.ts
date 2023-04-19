import * as yup from 'yup'

const profileValidationSchema = yup.object().shape({
  name: yup.string().required('Name is Required'),
  dob: yup.date().required('Date of Birth is required'),
  aadhar: yup
    .string()
    .min(12, ({ min }) => `Password must be ${min} characters`)
    .max(12, ({ max }) => `Password must be ${max} characters`)
    .required('Aadhar Number is required'),
  profileimg: yup
    .string()
    .required('Profile Image is Required to proceed further'),
  officialdoc: yup
    .string()
    .required('Official Doc is Required to proceed further'),
})

export default profileValidationSchema
