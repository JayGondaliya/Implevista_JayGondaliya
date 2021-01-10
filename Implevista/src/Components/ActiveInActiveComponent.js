import React from 'react';
import { View } from 'react-native';

function ActiveInActiveComponent(props){
    return(
        <View>
            <View style={{width: props.componentWidth || 100 }}>

            </View>
        </View>
    )
}

export default ActiveInActiveComponent;