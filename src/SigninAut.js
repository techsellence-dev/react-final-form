import { Auth } from 'aws-amplify';
import {useState} from 'react'

async function signinAut(username,password) {
    try {
        const user = await Auth.signIn(username, password);
    } catch (err) {
        if (!err?.response) {
            console.log('No Server Response');
        } else if (err.response?.status === 400) {
            console.log('Missing Username or Password');
        } else if (err.response?.status === 401) {
            console.log('Unauthorized');
        } else {
            console.log('Login Failed');
        }
    }
}

export default signinAut