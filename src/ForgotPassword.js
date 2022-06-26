import * as React from 'react'
import { Form, Field } from 'react-final-form'
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import './Style.css';


const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Forgot() {
    const [sent, setSent] = React.useState('Send Code');
    const sub = (formObj) => {
        console.log("Submitting , Please wait...");
        console.log(formObj)
        setSent("Please Wait");
    };
    const [Email, setEmail] = React.useState("")
    const [message, setMessage] = React.useState("")
    const emailvalid = () => {
        const regEx = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g
        if (regEx.test(Email)) {
            setMessage("Email is valid")
        } else if (!regEx.test(Email)) {
            setMessage("Email is not valid  ")
        } 
    }
    const handleOnChange = (e) => {
        setEmail(e.target.value);
    };

    return (
        <div className='Content'>

            <Form
                onSubmit={async (values) => {
                    await sleep(1000);
                    alert("Submitted Successfully!");
                }}
            >

                {({ handleSubmit, form, submitting, pristine, values }) => (


                    <form onSubmit={handleSubmit}><h3>Forgot Password:</h3><br></br>

                        <p>A verification code will be sent to your email address shortly</p><br></br>


                        {/* field 3 */}
                        <Field name="Email">
                            {({ input, meta }) => (
                                <div>
                                    <label className='Label'><strong>Email:</strong></label>
                                    <TextField
                                        {...input}
                                        type="email"
                                        variant="filled"
                                        size="small"
                                        id="outlined-required"
                                        label='Email'
                                        autoComplete="email"
                                        value={Email}
                                        onChange={handleOnChange}
                                        onMouseOut={emailvalid}
                                        autoFocus
                                    />
                                    {message}
                                    {meta.touched && meta.error && <span>{meta.error}</span>}
                                </div>)}
                        </Field><br></br>

                        <Button id='btn'
                            disabled={submitting}
                            variant="contained"
                            onClick={sub}
                            type="submit"
                        >
                            {sent}
                        </Button>

                        <br></br>
                        <br></br>
                        <Link style={{ textDecoration: 'none' }} to="/signin"> Back to Sign In </Link>
                        <br></br>
                        <br></br>

                    </form>

                )}
            </Form>



        </div>


    )
}

export default Forgot
