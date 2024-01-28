import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Please enter your username"),
    password: Yup.string().required("Please enter your password"),
  });

  const handleSubmit = (values, { setSubmitting, setFieldError }) => {
    fetch("http://localhost:5555/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        setSubmitting(false);

        if (data.error) {
          setFieldError("general", data.error);
          return;
        }

        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Error:", error);
        setFieldError("general", "An unexpected error occurred");
        setSubmitting(false);
      });
  };

  return (
    <div>
      <h2>Login</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div>
            <label htmlFor="username">Username:</label>
            <Field
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
            />
            <ErrorMessage name="username" component="div" className="error" />
          </div>

          <div>
            <label htmlFor="password">Password:</label>
            <Field
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
            />
            <ErrorMessage name="password" component="div" className="error" />
          </div>

          <div>
            <button type="submit">Login</button>
          </div>

          <p>
            Don't have an account? <Link to="/register">Register here</Link>.
          </p>

          <ErrorMessage
            name="general"
            component="div"
            style={{ color: "red" }}
          />
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
