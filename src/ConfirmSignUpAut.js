import { Auth } from "aws-amplify";

async function confirmSignUpAut(username, code) {
  try {
    await Auth.confirmSignUp(username, code);
  } catch (error) {
    console.log("error signing up:");
    console.log(error.code);

    throw error.code;
  }
}
export default confirmSignUpAut;
