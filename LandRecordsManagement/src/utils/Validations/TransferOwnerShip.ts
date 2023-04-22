import * as yup from 'yup'

export const transferOwnerValidationSchema = yup.object().shape({
  mutationNumber: yup.string().required('Mutation Number is Required'),
  aadharNumber: yup
    .string()
    .min(12, ({ min }) => `Password must be ${min} characters`)
    .max(12, ({ max }) => `Password must be ${max} characters`)
    .required('Aadhar Number is required'),
})

