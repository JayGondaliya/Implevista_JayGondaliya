import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import Assets from '../assets'
import IMColors from '../Utils/Colors'

export function AddButtonComponent(props) {
    return (
        <View style={styles.mainContainer}>
            <TouchableOpacity style={styles.buttonStyle}
                onPress={props.onPress}
            >
                <Image source={Assets.add} />
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    mainContainer: { alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
    buttonStyle: { backgroundColor: IMColors.addButtonColor, padding: 10, borderRadius: 22 }
})