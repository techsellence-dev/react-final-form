
import { API } from 'aws-amplify';
import * as mutations from '../graphql/mutations'
import * as queries from '../graphql/queries';


// email, name, isAdmin, phone, superviserEmail, isApproved, isEmailApproved, isPhoneVerified, isGooleSignIn,isFacebookSignIn ,isGeneralAuthSignIn

// create instance of userDetails in App.js
 export const createNewUser = async (userDetails) => {
     try {
         const addUser = await API.graphql({ query: mutations.createUser, variables: { input: userDetails } })
         console.log("User has been added", addUser.data.createUser);
     } catch (error) {
         console.log("error in creating ", error);
         throw new Error(error)

     }
 }

//create instance of Mail in App.js
export const deleteUserByMail = async (Mail) => {
    try {
        const deletedUser = await API.graphql({ query: mutations.deleteUser, variables: {input: Mail} })
        console.log("Deleted User is ", deletedUser.data.deleteUser);
    } catch (error) {
        console.log("Error in deleting ", error);
        throw new Error(error)

    }
}

//create instance of supEmail in App.js
export const deleteUserBySupMail = async (userSupEmail) => {
    try {
        const userSupData = await API.graphql({ query: queries.userBySuperWisedID, variables: {superwiserEmail: userSupEmail } });
        console.log("User details by supervisor email", userSupData.data.userBySuperWisedID)
        const listItems = userSupData.data.userBySuperWisedID.items;
        console.log(listItems.length)
      for(var i=0 ; i<listItems.length ; i++)
      {
          console.log(i)
          console.log(listItems[i].email)
          const deleteList = {
              email: listItems[i].email,                  
              _version: listItems[i]._version
            }
          const deleteTheUser = await API.graphql({ query: mutations.deleteUser, variables: { input: deleteList} });
          console.log("Deleted User is ", deleteTheUser.data.deleteUser);
      }
     //   var len =  arrr.length;    
    }
    catch (error){
        console.log("Error in getUser", error);
        throw new Error(error)

    }
}



export const getUserByEmail = async(userEmail) => {

    try {
            const userData = await API.graphql({ query: queries.getUser, variables: {email: userEmail }});
            const x = userData.data.getUser;
            console.log(x)
            console.log("User details by email", userData.data.getUser)
    }
    catch(error) {
           console.log("Error in getUser");
           throw new Error(error)

          }
}

// create instance of userSupEmail in App.js
      export const getUserBySupMail = async (userSupEmail) => {

          try {
              const userSupData = await API.graphql({ query: queries.userBySuperWisedID, variables: {superwiserEmail: userSupEmail } });
              console.log("User details by supervisor email", userSupData.data.userBySuperWisedID)
          }
          catch (error){
              console.log("Error in getUser", error);
              throw new Error(error)

          }
      }

// create instance of updatedData in App.js
     export  const updateUserInfo = async(user)=>{
      try {
        console.log("Get user to update ")
          const getUpdateUser = await API.graphql({query:queries.getUser, variables:{email: user.email}})
          console.log("Get user to update ",getUpdateUser.data.getUser)
          const updatedUser=await API.graphql({query:mutations.updateUser,variables:{input: user}});
          console.log("Updated user is ",updatedUser.data.updateUser);
      }catch (error) {
          console.log("Error in updating ",error);
          throw new Error(error)

      }
  }















           
