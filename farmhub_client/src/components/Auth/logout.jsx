import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  }, [navigate]);

  const initialValues = {};

  const validationSchema = Yup.object({});

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
  };

  return (
    <div>
      <p>Logging out...</p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form />
      </Formik>
    </div>
  );
};

export default Logout;
