import { Auth } from "aws-amplify";
import { createNewUser } from "./gqlFunctions/userTable";

async function signUpAut(username, password, name) {
  try {
    const { user } = await Auth.signUp({
      username,
      password,
      name,
    });
    console.log(user);
    const data = {
      email: username,
      name: name,
      isAdmin: false,
      phone: "8888888888",
      superwiserEmail: "hhhh122334@gmail.com",
      isApproved: true,
      isEmailApproved: true,
      isPhoneVerified: true,
      isGooleSignIn: true,
      isFacebookSignIn: false,
      isGeneralAuthSignIn: false,
    };
    createNewUser(data);
  } catch (error) {
    console.log(error.code);
    throw error.code;
  }
}
export default signUpAut;
