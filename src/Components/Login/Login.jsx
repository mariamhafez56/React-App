import axios from "axios";
import { useFormik } from "formik";

import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { AuthContext } from "../../Contexts/AuthContext";

export default function Login() {
  let navigate = useNavigate();
  let [errorMessage, setErrorMessage] = useState("");
  let [isLoading, setIsLoading] = useState(false);
  let { setUserLoggedIn } = useContext(AuthContext);

  // useEffect(() => {
  //   if (userLoggedIn) {
  //     navigate("/home");
  //   }
  // });
  async function login() {
    setErrorMessage("");
    console.log(formik.values);
    setIsLoading(true);
    let { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", formik.values)
      .catch((err) => {
        setErrorMessage(err.response.data.message);
        setIsLoading(false);
      });
    if ((data.message = "sucess")) {
      localStorage.setItem("token", data.token);
      setUserLoggedIn(true);

      navigate("/home");
    }
    setIsLoading(false);
  }

  let valdiation = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        "Enter valid email"
      ),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
        "Password must have special character, letter, number and must be greater than 7"
      ),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: login,
    validationSchema: valdiation,
  });
  return (
    <>
      <div className="w-75 m-auto my-5">
        <h1>Login Now: </h1>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="email">Email: </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="form-control mb-3"
            type="email"
            id="email"
            name="email"
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger"> {formik.errors.email}</div>
          ) : null}

          <label htmlFor="password">Password: </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className="form-control mb-3"
            type="password"
            id="password"
            name="password"
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger"> {formik.errors.password}</div>
          ) : null}

          {errorMessage ? (
            <div className="alert alert-danger">{errorMessage}</div>
          ) : null}
          {isLoading ? (
            <button
              disabled
              type="button"
              className="btn bg-main text-white ms-auto d-block"
            >
              {" "}
              <i className="fas fa-spinner fa-spin"></i>{" "}
            </button>
          ) : (
            <button
              type="submit"
              className="btn bg-main text-white ms-auto d-block"
            >
              Login
            </button>
          )}
        </form>
      </div>
    </>
  );
}
