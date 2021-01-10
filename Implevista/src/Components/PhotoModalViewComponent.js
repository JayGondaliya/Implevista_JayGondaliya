import React from 'react'
import { Image, Modal, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { widthPercentageToDP } from 'react-native-responsive-screen';
import ImagePicker from 'react-native-image-picker';
import Assets from '../assets';
import IMColors from '../Utils/Colors';

const options = {
    title: "Select avatar",
    takePhotoButtonTitle: "Capture photo",
    chooseFromLibraryButtonTitle: "Select from library",
    cancelButtonTitle: "Cancel",
    quality: 1.0,
    maxWidth: 500,
    maxHeight: 500,
    storageOptions: {
        skipBackup: true,
        path: 'images',
        cameraRoll: true,
        waitUntilSaved: true,
    },
};

export default class PhotoModalViewComponent extends React.Component {

    constructor(props) {
        super(props)

    }

    state = {
        shouldShowModal: this.props.isModalVisible,
        avatarSource: undefined,
        name: ""
    };

    UNSAFE_componentWillReceiveProps(newProps) {
        if (!newProps.isModalVisible) {
            this.setState({
                name: "",
                avatarSource: undefined,
                shouldShowModal: newProps.isModalVisible
            })
        } else {
            this.setState({
                name: newProps.data.name || "",
                avatarSource: newProps.data.image || undefined,
                shouldShowModal: newProps.isModalVisible
            });
        }
    }


    render() {
        return (
            <Modal
                visible={this.state.shouldShowModal}
                animationType="slide"
                transparent={true}
                onRequestClose={this.onRequestCloseHandler}
                style={styles.modalStyle}>
                <View
                    style={styles.mainViewStyle}>
                    <View style={styles.subViewContainerStyle}>
                        <TouchableOpacity onPress={this.buttonAddPicturePressed} >
                            <Image
                                style={styles.imageStyle}
                                resizeMode={'center'}
                                source={this.state.avatarSource && !this.props.isText
                                    ? { uri: this.state.avatarSource.uri }
                                    : this.state.avatarSource && !this.props.isPrivacy
                                        ? { uri: this.state.avatarSource }
                                        : this.props.placeholder || Assets.cameraPlaceholder} />
                        </TouchableOpacity>
                        {this.props.isText ?
                            <Text style={styles.textStyle}>{this.state.name}</Text> :
                            <View style={styles.inputViewStyle}>
                                <TextInput
                                    value={this.state.name}
                                    style={styles.textInputStyle}
                                    placeholder={'Enter name'}
                                    placeholderTextColor={IMColors.lightGrey}
                                    onChangeText={this.onChangeTextHandler}
                                />

                            </View>
                        }
                        <View style={styles.buttonContainerStyle}>
                            {this.state.avatarSource !== undefined && this.state.name !== "" && !this.props.isText ?
                                <TouchableOpacity style={styles.saveButtonStyle}
                                    onPress={this.onSaveImageHandler}
                                >
                                    <Text style={styles.saveTxtStyle}>{"Save image"}</Text>
                                </TouchableOpacity>
                                : null}
                            <TouchableOpacity style={styles.saveButtonStyle}
                                onPress={this.onCancelImageHandler}
                            >
                                <Text style={styles.saveTxtStyle}>{"Cancel"}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }

    onRequestCloseHandler = () => {
        if (Platform.OS !== 'android' && this.props.onRequestClose !== undefined) {
            this.props.onRequestClose();
        } else if (Platform.OS == 'android' && this.props.shouldDismissModalOnBackButton) {
            this.props.onRequestClose();
        } else {
            console.log('Hardware back button pressed, do nothing.');
        }
    }

    buttonAddPicturePressed = () => {
        ImagePicker.showImagePicker(options, this.onImageSelectionHandler);
    }

    onImageSelectionHandler = (response) => {

        if (response.didCancel) {
            console.log('User cancelled image picker');
        } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
        } else {
            this.setState({ avatarSource: response });
        }
    }
    onSaveImageHandler = () => {
        let params = {
            image: this.state.avatarSource.uri,
            name: this.state.name
        }
        this.props.onRequestSuccess(params)
    }

    onCancelImageHandler = () => {
        this.props.onRequestClose()
    }

    onChangeTextHandler = (text) => {
        this.setState({
            name: text
        })
    }
}

const styles = StyleSheet.create({
    //Modal Style
    modalStyle: {
        flex: 1,
    },
    //Main top view
    mainViewStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    subViewContainerStyle: { alignItems: 'center', backgroundColor: IMColors.white, padding: 10 },
    imageStyle: { width: widthPercentageToDP("80%"), height: widthPercentageToDP("80%") },
    textStyle: { marginVertical: 20 },
    inputViewStyle: { justifyContent: 'center', alignItems: 'center' },
    buttonContainerStyle: { flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 20 },
    saveButtonStyle: { backgroundColor: IMColors.primary, borderRadius: 10, marginHorizontal: 5 },
    saveTxtStyle: { marginHorizontal: 20, marginVertical: 10, color: IMColors.white },
    textInputStyle: { marginVertical: 20, width: widthPercentageToDP("70%"), paddingVertical: 10, paddingHorizontal: 5, borderBottomWidth: 1, borderColor: IMColors.primary }
});