import { getUserByEmail } from '../gqlFunctions/userTable'
import { API } from 'aws-amplify';
import * as mutations from '../graphql/mutations'
import * as queries from '../graphql/queries';


export const isAdminFetch = async (InputEmail) => {
    // const isAdminStatus = getUserByEmail(InputEmail.email)
    const userData = await API.graphql({ query: queries.getUser, variables: { email: InputEmail } });
    const x = userData.data.getUser.isAdmin
    console.log(userData.data)
    console.log(x)
}