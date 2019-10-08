import React , { Component } from "react";
 import { View , Text  , FlatList , ScrollView  } from "react-native";
 import Company from "./Company";
import Customer from "./Customer";
import Address  from "./AddressComponent"
import validation_functions from "../utils/validation_functions";
import { NavigationEvents } from 'react-navigation';
import Input from "./Input";
import Button from "./Button";
import axios from "axios";
import { connect } from "react-redux";
import UserDataAction from "../Actions/UserDataAction"
import { disable_Button_Style ,
  disable_Text_Style , 
  enable_Button_Style ,
   enable_Text_Style} from "../Styles"
 const initialState = {
   
 
  
  }
  let  checkFields = []
 
  class EditProfile extends Component {
      constructor(props) {
        super(props)
        this.state = {
          email:this.props.userData.email,
          customerNumber:this.props.userData.customerNumber,
          companyName:this.props.userData.companyName,
          contactPersonName:this.props.userData.contactPersonName,
          phoneNumber:this.props.userData.phoneNumber,
          lineOne:this.props.userData.lineOne,
          city:this.props.userData.city,
          province:this.props.userData.province,
          postalCode:this.props.userData.postalCode,
          serverError:"",
          isLoading : false
        }
      }

      handleInputChange = ( fieldName , value) => {
        if (!checkFields.includes(fieldName)) 
            {
              checkFields.push(fieldName)
            }   
        this.setState(({ [fieldName] : value}))
        validation_functions.updateValidators( fieldName , value )
      
      }

      handleNext = () => {
        const  { token , userData } = this.props
        let UpdatedData = []
        //  const  {  email,
        //   customerNumber,
          
        //   companyName,
        
        //   contactPersonName,
        //   phoneNumber , lineOne ,  city, province , postalCode} = this.state
        // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDg0OGZhM2VkNjdhZjdlMDc4ZGI5ZWEiLCJpYXQiOjE1NjkwNzkxNDQsImV4cCI6MTU2OTA4MDM0NH0.2HloKaZ9IklrI012rPzksvbdGcnrQlD31m_oL74O6XU"
        // axios.put(`http://13.59.64.244:3000/api/user/edit/${userData.userID}`, {
        //   email , customerNumber , companyName , officeAddress:`${lineOne} , ${city} , ${province} , ${postalCode}`  , 
        //   contactPersonName , phoneNumber
        // },
        // { headers: {"Authorization" : `Bearer ${token}`} }).
        // then(( response ) =>  console.log(response.data)).catch ( err => console.log(err.response.data))

         checkFields.map(( key) => {
          //  UpdatedData.push({[key]:this.state[key]})
          UpdatedData.push({
            key,
            value:this.state[key]
          })
         })

        this.props.updatedData(UpdatedData)
        this.props.navigation.navigate("Home")

        
      }

     render() {
      const { 
        email,
      customerNumber,
     
      companyName,
     
      contactPersonName,
      phoneNumber,
      lineOne,
      lineTwo,
      city,
      province,
      postalCode, } = this.state
      
      const disable = validation_functions.isFormValid(checkFields)
      
   
         return( <View style ={{  flex:1 , 
          justifyContent:"center" ,
          alignItems:"center"}}>   

            <NavigationEvents
                  onDidBlur={() => this.setState(({...initialState}))}
                  />
                  
                      
                         <ScrollView
                          contentContainerStyle = {{justifyContent:"center" , marginTop:25}}
                          showsVerticalScrollIndicator = { false }

                         >
                         <Input
                            label = "COMPANY NAME"
                            placeHolderText="fastening housing atlantic"
                            isSecureTextEntry = { false}
                            onChangeText= { this.handleInputChange}
                            errorName = "companyName" 
                            keyBoardType = "default"
                            value = { companyName}
                           
                            /> 
                          <Input
                            label = "CONTACT PERSON NAME"
                            placeHolderText="Dev"
                            isSecureTextEntry = { false}
                            onChangeText= {this.handleInputChange}
                            errorName = "contactPersonName" 
                            keyBoardType = "default"
                            value = { contactPersonName }
                          
                            />  
                           <Input
                            label = "PHONE NUMBER"
                            placeHolderText="0123456789"
                            isSecureTextEntry = { false}
                            onChangeText= { this.handleInputChange}
                            errorName = "phoneNumber" 
                            keyBoardType = "phone-pad"
                            value = { phoneNumber } 
                            
                            />  
                            
                             <Input
                            label = "CUSTOMER NUMBER (optional)"
                            placeHolderText="45321"
                            isSecureTextEntry = { false}
                            onChangeText= { this.handleInputChange}
                            errorName = "customerNumber"
                            keyBoardType = "phone-pad"
                            value = {customerNumber}
                            
                             />  
                             <Input
                            label = "EMAIL"
                            placeHolderText="john22@gmail.com"
                            isSecureTextEntry = { false}
                            onChangeText= { this.handleInputChange} 
                            errorName = "email" 
                            value = { email } 
                            
                            />

                            <Text> Address </Text>

                            <Input
                              label = "Line 1"
                              placeHolderText=""
                              isSecureTextEntry = { false}
                              onChangeText= { this.handleInputChange}
                              errorName = "lineOne" 
                              keyBoardType = "default"
                              value = { lineOne } 
                              
                              />  

                             <Input
                              label = "City"
                              placeHolderText="Toronto"
                              isSecureTextEntry = { false}
                              onChangeText= { this.handleInputChange}
                              errorName = "city" 
                              keyBoardType = "default"
                              value = { city }
                            
                              />  

                            <Input
                              label = "Province"
                              placeHolderText="Alberta"

                              isSecureTextEntry = { false}
                              onChangeText= { this.handleInputChange}
                              errorName = "province" 
                              keyBoardType = "default"
                              value = { province }
                            
                              />  
                                <Input
                              label = "Postal Code"
                              placeHolderText="M4B 1B3"
                              isSecureTextEntry = { false}
                              onChangeText= { this.handleInputChange}
                              errorName = "postalCode" 
                              keyBoardType = "default"
                              value = { postalCode }
                          
                              />  

          <Button 
           onPressMethod = {this.handleNext }
           text = "Edit"
           buttonStyle = {disable ? enable_Button_Style : disable_Button_Style}
           textStyle = { disable ? enable_Text_Style  :disable_Text_Style}
           disable = { !disable? false : true}
           />
           <View style = {{ height:200 , width:"100%"}}>

           </View>
           {/* {/* <View style = {{ height:200 , width:"100%"}}>

</View> */}
<View style = {{ height:200 , width:"100%"}}>

</View> 
         
         
           
                      </ScrollView>
                         {/* <Customer
                          handleInputChange = { this.handleInputChange}
                          handleNext = { this.JumpStepTwo}
                         /> */}
                  
                    </View> 
                )
     }
 }

 const mapDispatchToProps = ( dispatch ) => {
    return({
      updatedData:(data) => dispatch(UserDataAction.EDIT_PROFILE(data))
    })
 }

 const mapStateToProps = ( state ) => {
       console.log("state" , state )
   return({
    token: state.tokenReducer.token,
    userData:state.UserDataReducer.UserData
   })
   

 }
 export default  connect(mapStateToProps, mapDispatchToProps)(EditProfile)