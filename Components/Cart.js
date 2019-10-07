import React , { Component } from "react";
import { View , Text  , FlatList , Alert , ScrollView } from "react-native";
import { connect } from "react-redux";
import CustomText from "./CustomText";
import { Heading_style , Red_Button , White_Text , 
  Red_Square_button,
   White_Square_button,
   Red_Text,
   enable_Button_Style,enable_Text_Style, disable_Button_Style, disable_Text_Style
  } from "../Styles";
import Button from "./Button";
import validation_functions from "../utils/validation_functions"; 
import AddressForm from "./AddressForm";
import axios from "axios"
import { NavigationEvents } from 'react-navigation';
import Input from "./Input";
import DeleteItem from "../Actions/EmptyOrder"

const initialState = {
  orderPlace:false,
  lineOne:"",
  city:"",
  province:"",
  postalCode:"",
  showAddress:false,
  sameAsOffice:false,
  Different:false,
  isDefaultAddress:false,
  SameAsOfficeActive:false,
  DifferentActive:false
  
}
const DefaultAddress = "1 moore Road, Darthmouth , Nova Scotia MB-123"
class Cart extends Component {
  
   state = {...initialState }
    

   handleInputChange = ( fieldName , value) => {
    this.setState(({ [fieldName] : value}))
    validation_functions.updateValidators( fieldName , value )
  
  }
    Proceed= () => {
        this.setState(({ orderPlace: true }))
    }
   
    

    placeOrder = () => {
      const { items , userData , DeleteItem  } = this.props
      const { sameAsOffice, lineOne, city, province, postalCode } = this.state
      const shippingAddress =  sameAsOffice ? userData.officeAddress :  `${lineOne},${city} , ${province},${postalCode}`
      axios.post("http://13.59.64.244:3000/api/order" , {createdBy:userData.userID , shippingAddress, productDetail:items}).
      then(( response) => {
        if ( response.status === 200) {
          DeleteItem()
          Alert.alert(
            'Order Confirmation',
            'Your order has been received , FHA will shortly contact you',
            [
              
              
              {text: 'OK', onPress: () => this.props.navigation.navigate("Home")},
            ],
            {cancelable: false},
          );
        }
      } ).catch ( err => console.log(err.response.data))
    }


    SameOfficeAddress = (  ) => {
      console.log("change office address ")
      this.setState(({ 
        showAddress:true,
        sameAsOffice:true,
        isDefaultAddress:true,
        SameAsOfficeActive:true,
        differentOfficeAddress:false
         
      }))
    }

    differentOfficeAddress = (  ) => {
   
      this.setState(({ 
        showAddress:true,
        sameAsOffice:false,
        SameAsOfficeActive:false,
        differentOfficeAddress:true
      }))
    }
    
 render() {

  
     const { orderPlace ,
        lineOne,
     city,
     province,
     postalCode,
     showAddress,
    sameAsOffice,
    isDefaultAddress , differentOfficeAddress } = this.state
     const disable = validation_functions.isFormValid(["lineOne","city","province" , "postalCode" ])
     const { items } = this.props
    console.log( lineOne , city , province , postalCode )
      return(
       
        
          <View>
             <NavigationEvents
      onDidBlur={() => this.setState(({...initialState}))}
      />
             { orderPlace ? <View>
              <View style = {{ justifyContent:"center" , alignSelf:"center" , marginTop:50 , marginBottom:25}}>
            <Text style = { Heading_style }> Place Order</Text>
            </View>
            <Text style = {{ justifyContent:"center", textAlign:"center"}}>Shipping Address </Text>
              
              
            <View style = {{  justifyContent:"center" }}>
            <View style  ={{ flexDirection:"row" , justifyContent:"space-around" , marginTop:20 , marginBottom:30}}>
                     <Button  
                    
                      text  = " same as office"
                      onPressMethod = {this.SameOfficeAddress}
                      disable = {true}
                      buttonStyle = {sameAsOffice ? Red_Square_button:White_Square_button}
                      textStyle = { sameAsOffice ?White_Text : Red_Text}
                     />
                      <Button
                  
                       text  = "different "
                       onPressMethod = { this.differentOfficeAddress}
                       disable = {true}
                       buttonStyle = {differentOfficeAddress ? Red_Square_button:White_Square_button  }
                       textStyle = {differentOfficeAddress? White_Text : Red_Text }
                      />
                      </View>
                      { showAddress ? sameAsOffice ? 
                      <View style = {{ justifyContent:"center", alignSelf:"center"}}>
                      <Input
                         label = ""
                         placeHolderText="shipping address"
                         isSecureTextEntry = { false}
                         onChangeText= { this.handleInputChange}
                         errorName = "shippingAddress" 
                         defaultAnswer = { this.props.userData.officeAddress}
                         edit = { false}
                      />
                      <View style = {{ justifyContent:"center" , alignSelf:"center"}}>
                       <Button 
                              onPressMethod = { this.placeOrder }
                              text = "Submit"
                              buttonStyle = { enable_Button_Style }
                              textStyle = {enable_Text_Style }
                              disable = { true }
                              />
                        </View>
                      </View>
                      
                      : <ScrollView contentContainerStyle = {{ justifyContent:"center" , alignSelf:"center"}}>

                        <Input
                        label = "Line 1"
                        placeHolderText="1 Moore Rd,"
                        isSecureTextEntry = { false}
                        onChangeText= { this.handleInputChange}
                        errorName = "lineOne" 
                        keyBoardType = "default"
                        value = { lineOne }
                        />  
                        
                          <Input
                        label = "City"
                        placeHolderText="Darthmouth"
                        isSecureTextEntry = { false}
                        onChangeText= { this.handleInputChange}
                        errorName = "city" 
                        keyBoardType = "default"
                        value = { city }
                        />  
                    
                            <Input
                              label = "Province"
                              placeHolderText="Nova Scotia"
                              isSecureTextEntry = { false}
                              onChangeText= { this.handleInputChange}
                              errorName = "province" 
                              keyBoardType = "default"
                              value = { province }
                              />  
                                <Input
                              label = "Postal Code"
                              placeHolderText="eg B3B 1J1"
                              isSecureTextEntry = { false}
                              onChangeText= { this.handleInputChange}
                              errorName = "postalCode" 
                              keyBoardType = "default"
                              value = { postalCode }
                              />  
                              
                               <View style = {{ justifyContent:"center", alignSelf:"center"}}>
                               <Button 
                              onPressMethod = { this.placeOrder }
                              text = "Submit"
                              buttonStyle = {disable ? enable_Button_Style : disable_Button_Style}
                              textStyle = { disable ? enable_Text_Style  :disable_Text_Style}
                              disable = { disable}
                              />
                                 </View> 
                                <View style = {{ height:150 , width:"100%"}}></View>
                                <View style = {{ height:150 , width:"100%"}}></View>
                                <View style = {{ height:150 , width:"100%"}}></View>
                                <View style = {{ height:150 , width:"100%"}}></View>
                                <View style = {{ height:150 , width:"100%"}}></View>
                                <View style = {{ height:150 , width:"100%"}}></View>
                      </ScrollView> : null }
                  
                  
             
            </View>
                
             </View> :   <View>
           <View style = {{ justifyContent:"center" , alignSelf:"center" , marginTop:50 , marginBottom:25}}>
            <Text style = { Heading_style }> Cart Details</Text>
            </View>

            { items.length ?  <View style = {{justifyContent:"center"}}>
            <FlatList
             data = { items }
             renderItem = {Item}
             keyExtractor = {( item , index ) => item+index }
         
            />
            <View style = {{ justifyContent:"center", alignItems:"center"  , marginTop:150}}>
              <Button 
               onPressMethod = {this.Proceed}
               text = "Proceed"
               buttonStyle = { enable_Button_Style}
               textStyle = { enable_Text_Style }
               disable = { true }
               
               />
               </View>
            </View>: <View style = {{ justifyContent:"center" , alignItems:"center"}}>
                <Text> No Products available</Text>
            </View>
          
          
          
          }
           
           
           
           
      </View>  }
          </View>
        
        
           
           
      )
 }
}

const Item = ( {item} ) => {
    console.log( "item" , item )
    return( <View style = {{ flex:1 , flexDirection:"row", justifyContent:"center" , alignSelf:"center" , marginLeft:20}}>
        <View style = {{ flex:2}}>
        <CustomText
     label =  "Product Code"
     text = {item.productId}
    />
        </View>
 
   <View style = {{ flex:1}}>
   <CustomText
     label =  "Quantity"
     text = {item.quantity}
    />
   </View>
    
    <View style = {{ flex:1}}>
        
    <CustomText
     label =  "UOM"
     text = {item.UOM}
    />
    </View>
</View>)
}
const mapStateToProps = ( state ) => {
    console.log("state" , state )
    return({
      items:state.orderReducer.items,
      userData:state.UserDataReducer.UserData
    })
  }

  const mapDispatchToProps = ( dispatch  ) => {

    return({
      DeleteItem : (  ) => dispatch(DeleteItem())
   
    })
  } 
export default connect(mapStateToProps , mapDispatchToProps  )(Cart)