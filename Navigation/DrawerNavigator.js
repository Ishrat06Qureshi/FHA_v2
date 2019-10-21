import React , { Component } from "react"
import {  createStackNavigator , createDrawerNavigator } from "react-navigation";
import Order from "../Components/Order";
import Profile from "../Components/Profile";
import EditProfile from "../Components/EditProfile";
import {HomeStack, ProfileStack} from "./StackNavigators"
import TabBar from "./tabNavigation";
import * as styles from "../Styles"
import { Entypo } from "@expo/vector-icons";
import CustomMainHeader from "../Components/CustomMainHeader";
import mainHome from "../Components/mainHome"

const DashboardStack = createStackNavigator({
    DashboardTabNavigator  : mainHome 
} , {
    defaultNavigationOptions : ({ navigation }) => {
        return {
            headerLeft:  
            // <Entypo name = "menu" size  = {25}  
            // style = { styles.menu_styles } 
            //  onPress = {() => navigation.openDrawer()}/>
            <CustomMainHeader screenProps = { navigation }/>
        }
    }
})

const AppDrawerNavigator = createDrawerNavigator({
    Home:DashboardStack
})

export default AppDrawerNavigator