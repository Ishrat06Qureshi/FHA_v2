import React from "react";
import {  createBottomTabNavigator,  createStackNavigator  , createAppContainer  } from "react-navigation";
import {AntDesign , MaterialIcons , Octicons ,  Entypo , 
    FontAwesome} from "@expo/vector-icons";

import Home from "../Components/newHome";
import OrderList from "../Components/Order";
import Logout from "../Components/Logout";
import Search from "../Components/Search";
import Cart from "../Components/Cart";
import EditProfile from "../Components/EditProfile";
import Profile from "../Components/Profile"
import {HomeStack, ProfileStack} from "./StackNavigators"
import OrderDetails from "../Components/OrderDetails"
import NewOrderDetails from "../Components/NewOrderDetails"
import * as styles from "../Styles"
import CustomMainHeader from "../Components/CustomMainHeader"



const NewProfileStack  = createStackNavigator({
     Profile,
     EditProfile
})

const OrderStack = createStackNavigator({
    OrderList,
    NewOrderDetails
})
const SearchStack = createStackNavigator({
    Search:{
        screen:Search,
        navigationOptions: ({ navigation }) => {
            return {
               
                headerLeft:<CustomMainHeader screenProps = { navigation }/>
            }
    }
}
})
const CartStack = createStackNavigator({
    Cart:{
        screen:Cart,
        navigationOptions: ({ navigation }) => {
            return {
                
                headerLeft:<CustomMainHeader screenProps = { navigation }/>
            }
    }
}
})
const TabBar = createBottomTabNavigator(
    {
            Home: {
            screen : HomeStack,
            navigationOptions : () => ({  tabBarIcon: ({tintColor}) => (
            <Octicons name='tools' size={25} color={tintColor} /> )})
            },
            Search:{ 
            screen : SearchStack,
            navigationOptions : () => ({  tabBarIcon: ({tintColor}) => (
                <FontAwesome name = 'search' size={25} color={tintColor} /> )})
            },
          
            Cart:{ 
            screen : CartStack, 
            navigationOptions : () => ({  tabBarIcon: ({tintColor}) => (
                <MaterialIcons name = 'add-shopping-cart' size={25} color={tintColor} /> )})
            },
            // Profile:{ 
            //     screen : NewProfileStack, 
            //     navigationOptions : () => ({  tabBarIcon: ({tintColor}) => (
            //         <Ionicons name = 'ios-person' size={25} color={tintColor} /> )})
            //     },
            //  Order:{ 
            //         screen : OrderStack, 
            //         navigationOptions : () => ({  tabBarIcon: ({tintColor}) => (
            //             <MaterialCommunityIcons name = 'chart-histogram' size={25} color={tintColor} /> )})
            //         },
            Logout : {
            screen:Logout , 
            navigationOptions : () => ({  tabBarIcon: ({tintColor}) => (
                <AntDesign name='logout' size={25} color={tintColor} />)})
            }
   } ,
   {
            tabBarOptions: {
            activeTintColor: '#DA011D',
            inactiveTintColor: '#707070',
            style:{ height: 70}
            }  
  }
  )

  export default  createAppContainer(TabBar)