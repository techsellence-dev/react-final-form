import React from 'react'
import { render } from 'react-dom'
import { Form, Field } from 'react-final-form'
import './Style.css';
import './App.css'

const required = value => (value ? undefined : 'Required')
const minValue = min => value =>
  value >= min ? undefined : `Should be greater than ${min}`
const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined)
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))



const App = () => (
  <div className="App">

    <Form
      onSubmit={(formObj) => {
        console.log(formObj)
        alert("Submitting")
      }}
      

      validate={values => {
        const errors = {}
        if (!values.Fusername) {
          errors.username = 'Required'
        }
        if (!values.Lusername) {
          errors.username = 'Required'
        }
        if (!values.Email) {
          errors.Email = 'Required'
        }
        if (!values.age) {
          errors.age = 'Required'
        } if (!values.password) {
          errors.password = 'Required'
        } if (!values.confirm) {
          errors.confirm = 'Required'
        } else if (values.confirm != values.password) {
          errors.confirm = 'Must match'
        }
        return errors
      }}


      render={({ handleSubmit, form, submitting, pristine,values }) => (
        <form onSubmit={handleSubmit}>

          {/* field 1 */}
          <Field name="Fusername" >
            {({ input, meta }) => (

              <div>
                <label>First Name:</label>
                <input type="text" {...input} />
                {meta.touched && meta.error && <span>{meta.error}</span>}
              </div>)}
          </Field><br></br>


          {/* field 2 */}
          <Field name="Lusername">
            {({ input, meta }) => (

              <div>
                <label>Last Name: </label>
                <input type="text" {...input} />
                {meta.touched && meta.error && <span>{meta.error}</span>}
              </div>)}

          </Field><br></br>



          {/* field 3 */}
          <Field name="Email">
            {({ input, meta }) => (

              <div>
                <label>Email: </label>
                <input type="email" {...input} />
                {meta.touched && meta.error && <span>{meta.error}</span>}
              </div>)}
          </Field><br></br>



          {/*field 4  */}
          <Field name="age" validate={composeValidators(required, minValue(18))} >
            {({ input, meta }) =>
            (<div>
              <label>Age</label>
              <input {...input} type="Number" />
              {meta.touched && meta.error && <span>{meta.error}</span>}
            </div>)}
          </Field><br></br>


          {/* field 5 */}
          <Field name="bio" >
            {({ input, meta }) =>
            (<div>
              <label>Bio</label>
              <textarea placeholder="(optional)" {...input} />
              {meta.touched && meta.error && <span>{meta.error}</span>}
            </div>)}

          </Field><br></br>


          {/* field 6 */}
          <label>Favorite Color</label><br></br>
          <Field name="favouritecolor" component="select">
            <option />
            <option value="#ff0000">❤️ Red</option>
            <option value="#00ff00">💚 Green</option>
            <option value="#0000ff">💙 Blue</option>
          </Field><br></br><br></br>


          {/* field 7 & 8 */}
          <Field name="password">
            {({ input, meta }) => (
              <div>
                <label>Password:</label>
                <input {...input} type="password" placeholder="Password" />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field><br></br>

          <Field name="confirm">
            {({ input, meta }) => (
              <div>
                <label>Confirm: </label>
                <input {...input} type="password" placeholder="Confirm" />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field><br></br>



          {/* buttons */}
          <div className="buttons">
            <button type="submit" disabled={submitting || pristine}>
              Submit
            </button>
            <button
              type="button"
              onClick={form.reset}
              disabled={submitting || pristine} >
              Reset
            </button>
          </div>
        </form>
      )}
    />
  </div>
)

export default App;
