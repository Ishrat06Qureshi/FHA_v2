import React from "react";
import { View, Text, ScrollView } from "react-native";
import CustomTextWithIcon from "./CustomTextWithIcon";
import CustomText from "./CustomText"
import * as Styles from "../Styles";
import  { 
    Entypo,
    AntDesign, 
    Feather
} from "@expo/vector-icons"
const data = [1 ,2 ,3, 4,5 , 6, 7,8,10,11,12,13,14,15,16,17,18,19,20]
const  NewOrderDetails  = ( props ) => {
    return( <View style = { Styles.newContainer}>
            
           <View style = {{ flex:1.5 , marginTop:50}}>
               <View style = {{ alignSelf:"center"}}>
               <Text style = {Styles.Heading_style }> Order Details </Text>
               </View>
              
              
              <View>
               <View style = {{ flexDirection:"row"}}>
                  <Text>P.O</Text>
                  <Text>45789</Text>
              </View>
              </View>
             
             
               <CustomTextWithIcon
                 IconComponent = {() =>  <AntDesign name= "barcode" size = {25}  color = "#DA011D"/>}
                 label = "Customer Number"
                 text = { 45981 }
               />

                 <CustomTextWithIcon
                  IconComponent = {() =>    <Entypo name = "calendar" size = {20} color = "#DA011D"/>}
                  label = "Date of Order"
                  text = { "2019-10-04"}
               />
               <CustomTextWithIcon
                  IconComponent = {() =>    <Entypo name = "address" size = {20} color = "#DA011D"/>}
                  label = "Shipping Address"
                  text = "1 Moore Rd, Dartmouth, NS B3B 1J1, Canada"
               />
              
              
               
            
          </View>
          <View style = { { flex:3}}>
                 <CustomTextWithIcon
                  IconComponent = {() =>    <Feather name = "shopping-cart" size = {20} color = "#DA011D"/>}
                  label = "List of Items"
                  text = ""/>
                  <ScrollView>
                      {data.map(( item ) => {
                          return(   <View 
                            style = {{ 
                                // borderColor:"red"  ,
                                //  borderWidth:1,
                                  height:50 ,
                                   width:"100%",
                                   flexDirection:"row" ,
                                   justifyContent:'space-around'}}>
                            <CustomText
                                  label = "Product Code"
                                  text = "as1234"/>
                              
                    
                              <CustomText
                                  label = "Quantity"
                                  text = "5"/>
                   
                  
                   
                              <CustomText
                                  label = "UOM"
                                  text = "foot"
                              />
      
                            </View> )
                      })}
                    
                    

                  </ScrollView>

          </View>



    </View>)

}

// const Items = ( props ) => {
//     const {  productCode , Quantity , UOM} = props
//     return(
//             <View style = {{ flexDirection:"row" , 
            
//             }}>
              
               
//                   <CustomText
//                   label = "Product Code"
//                   text = { productCode}/>
               
              
//                 <CustomText
//                     label = "Quantity"
//                     text = { Quantity }/>
             
            
             
//                   <CustomText
//                       label = "UOM"
//                       text = {UOM}
//                   />
              
//               </View>
//     )
// }

export default NewOrderDetails 