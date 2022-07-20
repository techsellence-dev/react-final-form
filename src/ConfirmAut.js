import { Auth } from 'aws-amplify';


async function confirmAut(email, code, password) {
    console.log(email, code, password)
    await Auth.forgotPasswordSubmit(email, code, password)
        .then(data => console.log(data))
        .catch(err => {
            console.log(err)
            throw (err);
        });

}
export default confirmAut