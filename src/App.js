import React, { useState } from "react";
import { Form, Field } from "react-final-form";
import "./App.css";
const required = (value) => (value ? undefined : "Required");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const Popp = async (values) => {
  await sleep(1000);
  alert("Submitted Successfully!");
  window.alert(JSON.stringify(values, undefined, 2));
};

const sub = () => {
  console.log("Submitting , Please wait...");
};

function App() {
  const [buttonText, setButtonText] = useState("Click");
  function handleClick() {
    setButtonText("Submitting");
  }
  return (
    <div className="App">
      <header className="App-header">
        <Form onSubmit={Popp}>
          {({ handleSubmit, values, submitting }) => (
            <form onSubmit={handleSubmit}>
              <div>
                <label>First Name : </label>
                <Field
                  name="firstName"
                  component="input"
                  placeholder="First Name"
                  validate={required}
                />
              </div>

              <div>
                <label>Last Name :</label>
                <Field
                  name="lastName"
                  component="input"
                  placeholder="Last Name"
                  validate={required}
                />
              </div>
              <div>
                <label className="l"> Email Id : </label>
                <Field
                  name="email"
                  component="input"
                  placeholder="Email"
                  validate={required}
                />
              </div>
              <button
                className="btn"
                type="submit"
                disabled={submitting}
                //  onClick ={handleClick}
                onClick={sub}
              >
                {/* {buttonText} */}
                Submit
              </button>

              <pre>{JSON.stringify(values, undefined, 2)}</pre>
            </form>
          )}
        </Form>
      </header>
    </div>
  );
}

export default App;
