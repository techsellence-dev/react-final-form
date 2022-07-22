import React from "react";
import { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextError from "./TextError";
import { useAuth } from "./Protected2";
import TogglePassword from './TogglePassword'
import { Link, useNavigate, useLocation } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityIcon from "@mui/icons-material/VisibilityOutlined";
import "./App.css";
import { Amplify, Auth } from "aws-amplify";
import awsconfig from "./aws-exports";
import signinAut from "./SigninAut";
Amplify.configure(awsconfig);

const validationSchema = Yup.object({
  username: Yup.string().email("Invalid Email").required("Required!"),
  password: Yup.string().required("Required!"),
});

function SignIn() {
  const { setAuth } = useAuth();
  const [pwdtxt, setTxt] = useState('Show Password')
  const [err, shwErr] = useState();
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(<VisibilityOffIcon />);
  const location = useLocation();


  const initialValues = {
    username: location.state?.email ?? "",
    password: "",
  };
  const TogglePassword = (values) => {
    if (type === 'password') {
      setIcon(<VisibilityIcon />)
      setType('text')
      setTxt('Hide Password')
    }
    else {
      setIcon(<VisibilityOffIcon />)
      setType('password')
      setTxt('Show Password')
    }
  };
  const navigate = useNavigate();
  const handleSubmit = async (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm();
    try {
      await signinAut(values.username, values.password);
      navigate("/home");
    } catch (err) {
      switch (err?.code) {
        case "UserNotFoundException":
          console.log("Email is not registered");
          alert("Email is not registered");
          navigate("/");
          break;
        case "UserNotConfirmedException":
          console.log("Confirm user");
          alert("Confirm user");
          navigate("/confirmsignup");
          break;
        case "NotAuthorizedException":
          shwErr("Incorrect password.");
      }
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {(formik) => {
        return (
          <div className="Box">
            <Form>
              <h1>Sign In </h1>
              <br></br>
              <br></br>
              <div>
                <label>Email:</label>
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
                  helperText="Enter your registered email"
                />
                <ErrorMessage name="username" component={TextError} />
              </div>
              <br></br>
              <div>
                <label>Password:</label>
                <TextField
                  variant="outlined"
                  label="password"
                  type={type}
                  id="password"
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                <ErrorMessage name="password" component={TextError} />
              </div>
              <div className="toggle">
                <Button
                  color="secondary"
                  size="small"
                  type="button"
                  onClick={TogglePassword}
                  startIcon={icon}
                >
                  {pwdtxt}
                </Button>
              </div>
              <p>{err}</p>
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

              <p>
                Forgot password? |{" "}
                <Link style={{ textDecoration: "none" }} to="/forgot">
                  {" "}
                  forgot password
                </Link>
              </p>
              <p>
                Don't have an account |{" "}
                <Link style={{ textDecoration: "none" }} to="/">
                  {" "}
                  Sign Up
                </Link>
              </p>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
}
export default SignIn;
