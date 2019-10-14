import React from "react";
import { View , Text } from "react-native";
import { bold_Text} from "../Styles";
const CustomTextWithIcon = ( props ) => {
    const { label , text , IconComponent } = props
   return( <View>
       <View style = {{ flexDirection:"row" , justifyContent:"flex-start"}}>
           <IconComponent/>
          <Text style = { {...bold_Text } }> {label}</Text>
          </View>
          <Text style = {{ paddingLeft:25}}> { text }</Text>
   </View>)
}

export default CustomTextWithIcon