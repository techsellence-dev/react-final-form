import React from 'react'
import { TextField } from '@mui/material';
import { Form, Field } from 'react-final-form'


const required = value => (value ? undefined : 'Required')


function Password() {
  return (
    <div>

          <Field name="password">
              {({ input, meta }) => (
                  <div>
                      <label>Password</label>
                      <TextField
                          type="password"
                          {...input}
                          variant="filled"
                          size="small"
                          id="outlined-required"
                          label="enter" />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
              )}
          </Field><br></br>











    </div>
  )
}

export default Password
