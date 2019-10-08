import * as actionTypes from "../Actions/actionTypes";
 
const EditProfile = (  checklist ) => {
    return ({
        type:actionTypes.EDIT_PROFILE,
        checklist
    })
   }
   
   export default  EditProfile 