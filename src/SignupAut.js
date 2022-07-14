import { Auth } from 'aws-amplify';


async function signUpAut(username, password,name) {
    try {
        const { user } = await Auth.signUp({
            username,
            password,
            name
            
        });
        console.log(user);
    } catch (error) {
        console.log('error signing up:', error);
    }
}
export default signUpAut