import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { saveGalleryPrivacy } from '../Utils/AsyncStorageHelper';
import { Switch } from 'react-native-switch';
import IMColors from '../Utils/Colors';
import { Fonts } from '../Utils/FontConstant';


function GalleryOverViewComponent(props) {

    const onChangePrivacyValue = (value) => {
        props.onChangePrivacyFlag(value)
    }

    return (
        <View style={[styles.mainContainer, props.style]}>
            <Text style={styles.txtTitleStyle}>
                {"Photo Gallery"}
            </Text>
            <View style={styles.subContainer}>
                <Text style={styles.txtModeStyle}>
                    {"Secret mode"}
                </Text>
                <Switch
                    value={props.isSwitchOn}
                    onValueChange={onChangePrivacyValue}
                    disabled={false}
                    activeText={'active'}
                    inActiveText={'InActive'}
                    backgroundActive={'green'}
                    backgroundInactive={'gray'}
                    circleActiveColor={'#30a566'}
                    circleInActiveColor={'#000000'} />

            </View>
        </View>
    )
}

export default GalleryOverViewComponent;

const styles = StyleSheet.create({
    mainContainer: { padding: widthPercentageToDP("6%"), borderRadius: 10, backgroundColor: IMColors.white },
    subContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    txtTitleStyle: { fontFamily: Fonts.satisfy, fontSize: widthPercentageToDP("6%"), marginBottom: widthPercentageToDP("10%") },
    txtModeStyle: { fontFamily: Fonts.satisfy, fontSize: widthPercentageToDP("4%") }
})