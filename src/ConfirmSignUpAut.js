import { Auth } from 'aws-amplify';


async function confirmSignUpAut(username,code) {
    console.log(username,code)
    try {
        const { user } = await Auth.confirmSignUp(
           username,
           code,
        );
        console.log(user);
    } catch (error) {
        console.log('error signing up:', error);
    }
}
export default confirmSignUpAut