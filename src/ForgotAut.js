import { Auth } from 'aws-amplify';


async function forgotAut(email) {
    console.log(email)
    await Auth.forgotPassword(email)
        .then(data => console.log(data))
        .catch(err => {
            console.log(err)
            throw(err);
        });

}
export default forgotAut