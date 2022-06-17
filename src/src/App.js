import * as React from 'react'
import { render } from 'react-dom'
import { Form, Field } from 'react-final-form'
import './Style.css';
import './App.css'
import { setSelectionRange } from '@testing-library/user-event/dist/utils';
import FormButton from './FormButton';
import SignIn from './Signin';
import Phone from './Phone';


const required = value => (value ? undefined : 'Required')
const minValue = min => value =>
  value >= min ? undefined : `Should be greater than ${min}`
const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined)







function App() {
  return (
    <div>

      <FormButton Fusername="First Name:"
                     Lusername="Last Name:"
                     Email="Email: "
                     age="Age"
                     bio="Bio"
                     favouritecolor="Favourite Color: "
                     password="Password: "
                     confirm="Confirm Password: "/>

                     <Phone/>

      {/* <SignIn /> */}






    </div>
  )
}





export default App;
