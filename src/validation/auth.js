import * as Yup from "yup";

const mobileValidation = Yup.string()
  .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits")
  .required("Mobile number is required");

export const signinSchema = Yup.object({
  mobile: mobileValidation,
  password: Yup.string().required("Please enter your password!"),
});

export const signupSchema = Yup.object({
  mobile: mobileValidation,
  newPassword: Yup.string().required("Please enter your password!"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], "Passwords must match")
    .required("Password and Confirm password should matched!"),
});

export const referSchema = Yup.object({
  referrerCode: Yup.string().required("Please enter your referal code!"),
});

export const forgotPassSchema = Yup.object({
  mobile: mobileValidation,
  newPassword: Yup.string().required("Please enter your password!"),
});


