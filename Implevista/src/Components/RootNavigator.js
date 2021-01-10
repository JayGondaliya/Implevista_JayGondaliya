import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeContainer from '../Containers/HomeContainer';

export const BASE_STACK = createStackNavigator()
export default function BASE_STACK_NAVIGATOR(){
    return(
        <NavigationContainer>
            <BASE_STACK.Navigator initialRouteName={'Home'} headerMode={'none'}>
                <BASE_STACK.Screen name={'Home'} component={HomeContainer}/>
            </BASE_STACK.Navigator>
        </NavigationContainer>
    )
}