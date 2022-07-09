import { Auth } from 'aws-amplify';

async function signinAut(username,password) {
    try {
        const user = await Auth.signIn(username, password);
    } catch (error) {
        alert('error signing in', error);
    }
}

export default signinAut