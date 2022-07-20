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
       throw(error)
    }
}
export default signUpAut