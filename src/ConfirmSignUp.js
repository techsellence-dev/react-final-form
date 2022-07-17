import React from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextError from "./TextError";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import "./App.css";
import { Amplify, Auth } from "aws-amplify";
import awsconfig from "./aws-exports";
import confirmSignUpAut from "./ConfirmSignUpAut";
import { Typography } from "@mui/material";
Amplify.configure(awsconfig);

const initialValues = {
  username: "",
  code: "",
};

//substitute to writing validations
const validationSchema = Yup.object({
  username: Yup.string().email("Invalid Email").required("Required!"),
  code: Yup.string().required("Required!"),
});

function ConfirmSignUp() {
  const navigate = useNavigate();
  let codeMismatch = false;
  const onSubmit = async (values, onSubmitProps) => {
    try {
      await confirmSignUpAut(values.username, values.code);
      navigate("/signin");
      onSubmitProps.setSubmitting(false);
      onSubmitProps.resetForm();
    } catch (error) {
      switch (error) {
        case "CodeMismatchException":
          console.log("code is wrong");
          codeMismatch = true;
          //handle code mismatch, display to the user, ask the user if the code needs to be resend
          break;
        case "UserNotFoundException":
          console.log("email is not registered");
          navigate("/");
          //send the user to sign up page
          break;
        default:
          throw error;
      }
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {(formik) => {
        return (
          <div className="Box">
            <Form>
              <h1>Confirm Sign up </h1>
              <br></br>
              <br></br>
              <h3>Enter the code recieved on your email to confirm sign up</h3>
              <div>
                <label>Username:</label>
                <TextField
                  variant="outlined"
                  label="username"
                  size="small"
                  type="text"
                  id="username"
                  name="username"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                  helperText="Enter your username"
                />
                <ErrorMessage name="username" component={TextError} />
              </div>
              <br></br>
              <div>
                <label>Code:</label>
                <TextField
                  variant="outlined"
                  label="Code"
                  type="text"
                  id="code"
                  name="code"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.code}
                  helperText="Enter your registered password"
                />
                <ErrorMessage name="code" component={TextError} />
                {codeMismatch ? (
                  <Typography color={"error"}>
                    There is a code mismatch
                  </Typography>
                ) : (
                  ""
                )}

                {/* the above should go away the moment user clicks the code text field and makes the form !dirty*/}
              </div>

              <br></br>
              <div>
                <Button
                  color="primary"
                  variant="contained"
                  disabled={
                    formik.isSubmitting || !(formik.dirty && formik.isValid)
                  }
                  type="submit"
                >
                  Submit
                </Button>
                |
                <Button
                  color="primary"
                  variant="contained"
                  type="reset"
                  disabled={!formik.dirty}
                >
                  Reset
                </Button>
              </div>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
}
export default ConfirmSignUp;
