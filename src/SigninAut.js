import { useState } from 'react';
import { Navigate , Route} from 'react-router-dom';
import { Auth } from 'aws-amplify';
import confirmsignup from './ConfirmSignUp'

async function signinAut(username, password) {
    try {
        const user = await Auth.signIn(username, password);
    } catch (err) {
       console.log(err)
       throw(err)
    }
}

export default signinAut