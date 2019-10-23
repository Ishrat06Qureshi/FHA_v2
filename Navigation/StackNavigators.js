import React from "react"
import { createStackNavigator} from "react-navigation"

import Home from "../Components/newHome";
import AllProducts from "../Components/AllProducts";
import Profile from "../Components/Profile";
import EditProfile from "../Components/EditProfile";
import TabBar from "./tabNavigation"
import { Entypo } from "@expo/vector-icons";
import * as styles from "../Styles";
import CustomMainHeader from "../Components/CustomMainHeader"
export const HomeStack = createStackNavigator({
    Home : {
        screen: Home,
        navigationOptions: ({ navigation }) => {
         return {
             header:null,
             headerLeft: <CustomMainHeader screenProps = { navigation }/>
         }
        }
    },
    AllProducts : {
        screen: AllProducts,
}
})

const ProfileViewStack = createStackNavigator({
    Profile : {
        screen: Profile,
        navigationOptions: {
        header: null} ,
    },
    EditProfile : {
        screen: EditProfile,
        navigationOptions: {
        header: null} ,
    }
})
export const ProfileStack = createStackNavigator({
    Profile:{
        screen:ProfileViewStack,
        navigationOptions: {
            header: null} ,
    }
})




