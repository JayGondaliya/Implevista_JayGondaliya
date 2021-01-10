import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View, Animated } from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import Assets from '../assets';
import IMColors from '../Utils/Colors';
import { Fonts } from '../Utils/FontConstant';

function ActiveInActiveComponent(props) {

    const [flag, setFlag] = useState(false)

    useEffect(() => {
        setFlag(props.value)
    }, [props])
    return (
        <View style={{ flexDirection: flag ? 'row-reverse' : 'row', alignItems: 'center', borderRadius: 10, backgroundColor: IMColors.offWhite }}>
            <TouchableOpacity
                style={{ backgroundColor: IMColors.error, borderRadius: 10, overflow: 'hidden', alignSelf: 'flex-start' }}
                onPress={() => props.onValueChange(!flag)}>
                <Image style={{ width: props.imageWidth || 35, height: props.imageHeight || 35 }} resizeMode={'cover'} source={Assets.fly_image} />
            </TouchableOpacity>
            <Text style={{ marginHorizontal: widthPercentageToDP("5"), color: IMColors.error, fontFamily: Fonts.satisfy, fontSize: widthPercentageToDP("3") }}>{flag ? "Actively" : "InActive"}</Text>
        </View>
    )
}

export default ActiveInActiveComponent;