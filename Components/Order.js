import React  , { Component } from "react";
import { View , Text , FlatList , TouchableOpacity  } from "react-native";


import OrderCard from "./OrderCard"
import {  Heading_style } from "../Styles";
import { Card } from "native-base";
import axios from "axios"
import {  connect } from "react-redux"

 class OrderList extends Component {
    state = {
        data:[]
    }
  componentDidMount () {
      const { id } = this.props.userData
      axios.get(`http://13.59.64.244:3000/api/userorder/${id}`).
      then(( response) => this.setState(({ data:response.data}))).
      catch( err => console.log(err.response.data) )


  }

_renderItem = ({item}) => {
  
    return(    
    <OrderCard
      orderDetails = {item}
      label = "View Details"
    />)
}
    render() {
        const {data } = this.state
        return( <View style = {{ flex:1 , justifyContent:"center"}}>
        <View style = {{ justifyContent:"center" , alignSelf:"center" , marginTop:50 , marginBottom:25}}>
        <Text style = { Heading_style }> Your Orders</Text>
        </View>
         
         
        <FlatList
         data = { data }
         renderItem = { this._renderItem}
         keyExtractor = {(item, index) => item.poNumber}
        />
        
        
    </View> )
    }
        
}
 

const mapStateToProps = ( state ) => {
  return({
    userData:state.UserDataReducer.UserData
  })
}
export default connect( mapStateToProps , null )(OrderList)
