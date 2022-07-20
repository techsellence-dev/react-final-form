import { Auth } from 'aws-amplify';


async function forgotAut(email) {
    console.log(email)
    Auth.forgotPassword(email)
        .then(data => console.log(data))
        .catch(err => console.log(err));

}
export default forgotAut