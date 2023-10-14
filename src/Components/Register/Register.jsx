import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
// import { AuthContext } from "../../Contexts/AuthContext";
// import { useContext } from "react";

export default function Register() {
  let navigate = useNavigate();
  let [errorMessage, setErrorMessage] = useState("");
  let [isLoading, setIsLoading] = useState(false);

  // let { userLoggedIn } = useContext(AuthContext);

  // useEffect(() => {
  //   if (userLoggedIn) {
  //     navigate("/home");
  //   } else {
  //     console.log("hhhh");
  //   }
  // });
  async function register() {
    setErrorMessage("");
    console.log(formik.values);
    setIsLoading(true);
    let { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", formik.values)
      .catch((err) => {
        setErrorMessage(err.response.data.message);
        setIsLoading(false);
      });
    if ((data.message = "sucess")) {
      navigate("/login");
    }
    setIsLoading(false);
  }

  let valdiation = Yup.object({
    name: Yup.string()
      .required("Name is Required")
      .min(3, "Min Length 3 characters")
      .max(20, "Max length 20 characters "),

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
    rePassword: Yup.string()
      .required("RePassword is required")
      .oneOf([Yup.ref("password")], "pass and repass Should Match"),
    phone: Yup.string()
      .required("Phone number in required")
      .matches(/^01[0125][0-9]{8}$/, "Enter valid number"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "4455",
      phone: "",
    },
    onSubmit: register,
    validationSchema: valdiation,
  });
  return (
    <>
      <div className="w-75 m-auto my-5">
        <h1>Register Now: </h1>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="name">Name: </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className="form-control mb-3"
            type="text"
            id="name"
            name="name"
          />
          {formik.errors.name && formik.touched.name ? (
            <div className="alert alert-danger"> {formik.errors.name}</div>
          ) : null}

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

          <label htmlFor="repassword">Re Password: </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.rePassword}
            className="form-control mb-3"
            type="password"
            id="rePassword"
            name="rePassword"
          />
          {formik.errors.repassword && formik.touched.rePassword ? (
            <div className="alert alert-danger">
              {" "}
              {formik.errors.rePassword}
            </div>
          ) : null}

          <label htmlFor="phone">Phone: </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            className="form-control mb-3"
            type="tel"
            id="phone"
            name="phone"
          />
          {formik.errors.phone && formik.touched.phone ? (
            <div className="alert alert-danger"> {formik.errors.phone}</div>
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
              Register
            </button>
          )}
        </form>
      </div>
    </>
  );
}
