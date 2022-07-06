import { Auth } from 'aws-amplify';


async function confirmAut(email, code , password) {
    console.log(email, code, password)
    Auth.forgotPasswordSubmit(email, code, password)
        .then(data => console.log(data))
        .catch(err => console.log(err));
   
}
export default confirmAut