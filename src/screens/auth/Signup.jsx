import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import IsNotAuthenticate from "../../redirect/IsNotAuthenticate";
import { signupSchema } from "../../validation/auth";
import { useFormik } from "formik";
import { dbObject } from "../../helper/constant";
import { toast } from "react-toastify";
import Toaster, { toastOptions } from "../../components/toaster/Toaster";
import "./auth.css";
import { auth, provider } from "../../firebase.config";
import { signInWithPopup } from "firebase/auth";
import { AppContext } from "../../context/AppContext";
import Spinner from "../../components/spinner/Spinner";

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(AppContext);

  useEffect(() => {
    if (!location?.state?.referrerCode) {
      return navigate("/auth-refer");
    }
  }, [location, navigate]);

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const body = {
        email: result?.user?.email,
        uid: result?.user?.uid,
        referrerCode: location?.state?.referrerCode,
      };

      const formData = new FormData();
      for (const key in body) {
        formData.append(key, body[key]);
      }
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await dbObject.post(
        "/users/register-with-google.php",
        formData,
        config
      );

      if (!data.error) {
        toast.success(data.message, toastOptions);
        toast.success(data.message, toastOptions);
        setUser(data.response);
      } else {
        toast.error(data.message, toastOptions);
      }
      console.log(data);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const initialValues = {
    newPassword: "",
    confirmPassword: "",
    mobile: "",
    referrerCode: location?.state?.referrerCode,
  };

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signupSchema,
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
            "/users/register-with-mobile.php",
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
      <Toaster />
      <div className="login-dark">
        <form onSubmit={handleSubmit} method="post" className="container">
          <h2 className="sr-only text-center">Sign Up</h2>

          <div onClick={handleGoogleSignup} className="google-auth">
            <i className="bi bi-google"></i>

            <span>Sign up with Google</span>
          </div>

          <p className="mb-0 mt-4 text-center" style={{ color: "#95999d" }}>
            Or
          </p>

          <div className="form-group mt-2">
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

          <div className="form-group mt-2">
            <input
              autoComplete="off"
              className="form-control"
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={values.confirmPassword}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.confirmPassword && touched.confirmPassword ? (
              <small style={{ color: "red" }}>{errors.confirmPassword}</small>
            ) : null}
          </div>

          <div className="form-group mt-4">
            <button className="btn btn-primary btn-block" type="submit">
              Sign Up
            </button>
          </div>

          <Link to={"/signin"} className="signIn_SignUp">
            Already have an account? <span>Sign In</span>
          </Link>
        </form>
      </div>
    </IsNotAuthenticate>
  );
};

export default Signup;
