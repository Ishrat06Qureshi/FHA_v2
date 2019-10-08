import React , { Component } from "react";
import { View , Text , ScrollView  , TouchableOpacity } from "react-native";
import {Ionicons , 
    MaterialCommunityIcons,
    Feather} from "@expo/vector-icons";
import {  Heading_style , bold_Text } from "../Styles";
import CustomText from "./CustomText"
import { connect } from "react-redux"


class Profile extends Component {
    
   render() {
      const { email,
         customerNumber,
        
         companyName,
        
         contactPersonName,
         phoneNumber,
         lineOne,
         lineTwo,
         city,
         province,
         postalCode, } = this.props.userData
       return( <View>
            <View >
                <Feather  name="user"  size = {35 }  color = "orange" style  = {{justifyContent:"center" , 
                alignSelf:"center" , marginTop:15  }}/>
                <TouchableOpacity onPress = { () => this.props.navigation.navigate("EditProfile")}>
                <MaterialCommunityIcons  name="pencil-circle-outline"  size = {35 }  color = "orange" style  = {{justifyContent:"center" , 
                alignSelf:"center" , marginTop:15  }}/>
                </TouchableOpacity>
                
                
                <View style = {{ justifyContent:"center" , alignSelf:"center" , marginTop:20 , marginBottom:25}}>
            <Text style = { bold_Text }>{companyName}</Text>
            </View>
            <ScrollView>
                
             <CustomText
                label = "Customer Number"
                text = { customerNumber }
             />
              <CustomText
                label = "Contact Person Name"
                text = { contactPersonName }
             />
              <CustomText
                label = "Email"
                text = { email }
             />
              <CustomText
                label = "Office Address"
                text = {`${lineOne} , ${city} , ${province} , ${postalCode}`}
             />
              <CustomText
                label = "Phone Number"
                text = { phoneNumber }
             />

              </ScrollView>
                 </View>
       </View>)
   }
}

const mapStateToProps = () => {
   return({
      userData:state.UserDataReducer.UserData
     })
}
export default connect( mapStateToProps , null )(Profile)