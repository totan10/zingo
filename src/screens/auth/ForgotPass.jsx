import React, { useState } from "react";
import IsNotAuthenticate from "../../redirect/IsNotAuthenticate";
import { forgotPassSchema } from "../../validation/auth";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { dbObject } from "../../helper/constant";
import { toast } from "react-toastify";
import { toastOptions } from "../../components/toaster/Toaster";
import "./auth.css";
import Spinner from "../../components/spinner/Spinner";

const initialValues = {
  mobile: "",
  newPassword: "",
};

const ForgotPass = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: forgotPassSchema,
      onSubmit: async (values) => {
        try {
          setLoading(true);
          const formData = new FormData();
          for (const key in values) {
            formData.append(key, values[key]);
          }
          const config = {
            headers: {
              "Content-Type": "multipart/form-data", // Set the content type to form data
            },
          };

          const { data } = await dbObject.post(
            "/users/forgot-password.php",
            formData,
            config
          );
          if (!data.error) {
            toast.success(data.message, toastOptions);

            setTimeout(() => {
              navigate("/signin");
            }, 1000);
          } else {
            toast.error(data.message, toastOptions);
          }

          setLoading(false);
        } catch (error) {
          setLoading(true);
          console.log(error);
          toast.error("Internal server error", toastOptions);
          setLoading(false);
        }
      },
    });

  return (
    <IsNotAuthenticate>
      {loading && <Spinner />}

      <div className="login-dark">
        <form onSubmit={handleSubmit} method="post" className="container">
          <h2 className="sr-only">
            Forgot <span>Password</span>
          </h2>

          <div className="form-group mt-4">
            <input
              autoComplete="off"
              className="form-control"
              type="text"
              name="mobile"
              placeholder="Mobile"
              value={values.mobile}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.mobile && touched.mobile ? (
              <small style={{ color: "red" }}>{errors.mobile}</small>
            ) : null}
          </div>

          <div className="form-group mt-2">
            <input
              autoComplete="off"
              className="form-control"
              type="password"
              name="newPassword"
              placeholder="Create Password"
              value={values.newPassword}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.newPassword && touched.newPassword ? (
              <small style={{ color: "red" }}>{errors.newPassword}</small>
            ) : null}
          </div>

          <div className="form-group mt-4">
            <button className="btn btn-primary btn-block" type="submit">
              Update
            </button>
          </div>

          <Link to={"/signin"} className="signIn_SignUp">
            Remember password? <span>Sign In</span>
          </Link>
        </form>
      </div>
    </IsNotAuthenticate>
  );
};

export default ForgotPass;
