import React from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from "./Home";
import Game from "./Game";

export default function App() {
    return (
        <NavigationContainer>
            <NavStack/>
        </NavigationContainer>
    )
}

const Stack = createStackNavigator();

const NavStack = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen
                name="Home"
                component={Home}
            />
            <Stack.Screen
                name="Game"
                component={Game}/>
        </Stack.Navigator>
    );
};