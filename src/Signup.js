import * as React from "react";
import { Form, Field } from "react-final-form";
import { Link } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import { TextField } from "@mui/material";
import "./Style.css";

const required = (value) => (value ? undefined : "Required");
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function SignUp() {
  const [sent, setSent] = React.useState("Submit");
  const sub = (formObj) => {
    console.log("Submitting , Please wait...");
    console.log(formObj);
    setSent("submitting");
  };

  const [Email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const emailvalid = () => {
    console.log("email valid function");
    const regEx = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    if (regEx.test(Email)) {
      setMessage("Email is valid");
    } else if (!regEx.test(Email)) {
      setMessage("Email is not valid");
    } else {
      setMessage("");
    }
  };
  const handleOnChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="Content">
      <Form
        onSubmit={async (values) => {
          await sleep(1000);
          alert("Submitted Successfully!");
          window.alert(JSON.stringify(values, undefined, 2));
        }}
        validate={(values) => {
          console.log("inside validate");
          const errors = {};
        //   if (!values.Email) {
        //     errors.Email = "Required";
        //   }
          if (!values.Fusername) {
            errors.username = "Required";
          }
          if (!values.Lusername) {
            errors.username = "Required";
          }
          if (!values.password) {
            errors.password = "Required";
          }
          if (!values.confirm) {
            errors.confirm = "Required";
          } else if (values.confirm !== values.password) {
            errors.confirm = "Must match";
          }
          console.log(errors);
          return errors;
        }}
      >
        {({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <h1 className="h">SIGN UP :</h1>
            <br></br>
            <br></br>
            {/* field 3 */}
            <Field name="Email" validate={required}>
              {({ input, meta }) => (
                <Stack >
                  <label className="Label">
                    <strong>Email: </strong>
                  </label>
                  <TextField
                    {...input}
                    type="text"
                    variant="outlined"
                    size="small"
                    id="outlined-required"
                    label="Email"
                    autoComplete="email"
                    value={Email}
                    onChange={handleOnChange}
                    onMouseOut={emailvalid}
                    autoFocus
                  /> 
            {message}
            {meta.touched && meta.error && <span>{ meta.error }</span>}
                </Stack>
              )}
            </Field>
            {/* <Field name="Email" validate={required}>
              {({ input, meta }) => (
                <div>
                  <label>Email: </label>
                  <TextField
                    {...input}
                    type="email"
                    variant="outlined"
                    size="small"
                    id="outlined-required"
                    label="Email"
                    required
                    autoFocus
                  />
                  {meta.touched && meta.error && <span>{meta.error}</span>}
                </div>
              )}
            </Field> */}
            <br></br>
            {/* field 1 */}
            <Field name="Fusername" validate={required}>
              {({ input, meta }) => (
                <div>
                  <label>First Name: </label>
                  <TextField
                    {...input}
                    type="text"
                    helperText="Enter your first name / This is your username"
                    variant="outlined"
                    size="small"
                    id="outlined-required"
                    label="First name"
                  />
                  {meta.touched && meta.error && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <br></br>
            {/* field 2 */}
            <Field name="Lusername" validate={required}>
              {({ input, meta }) => (
                <div>
                  <label>Last Name: </label>
                  <TextField
                    {...input}
                    type="text"
                    helperText="Enter your last name"
                    variant="outlined"
                    size="small"
                    id="outlined-required"
                    label="Last name"
                  />
                  {meta.touched && meta.error && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <br></br>
            {/* field 7 & 8 */}
            <Field name="password">
              {({ input, meta }) => (
                <div>
                  <label>Password: </label>
                  <TextField
                    type="password"
                    {...input}
                    variant="filled"
                    size="small"
                    id="outlined-required"
                    label="enter"
                  />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <br></br>
            <Field name="confirm">
              {({ input, meta }) => (
                <div>
                  <label>Confirm Password: </label>
                  <TextField
                    helperText="enter the same as the above field"
                    type="password"
                    {...input}
                    variant="filled"
                    size="small"
                    id="outlined-required"
                    label="confirm"
                  />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <br></br>
            <Button
              disabled={submitting || pristine}
              variant="contained"
              onClick={sub}
              type="submit"
            >
              {sent}
            </Button>
            |
            <Button
              variant="contained"
              type="button"
              onClick={form.reset}
              disabled={submitting || pristine}
            >
              Reset
            </Button>
            <p>
              Already have an account? |
              <Link style={{ textDecoration: "none" }} to="/signin">
                {" "}
                Sign In{" "}
              </Link>
            </p>
          </form>
        )}
      </Form>
    </div>
  );
}
export default SignUp;
