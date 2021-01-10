import React from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Assets from '../assets';
import IMColors from '../Utils/Colors';
import GalleryOverViewComponent from '../Components/GalleryOverViewComponent';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import PhotoModalViewComponent from '../Components/PhotoModalViewComponent';
import { getGalleryDetails, getGalleryPrivacy, saveGalleryDetails, saveGalleryPrivacy } from '../Utils/AsyncStorageHelper';
import { Fonts } from '../Utils/FontConstant';
import { AddButtonComponent } from '../Components/AddButtonComponent';


class HomeContainer extends React.Component {
    constructor(props) {
        super(props)
        this.arrayOfImageDetails = []
        this.selectedImageData = ""

    }
    state = {
        isImageModalOpen: false,
        isPrivacy: false
    }
    componentDidMount() {
        getGalleryPrivacy((data) => {
            this.setState({ isPrivacy: data })
            getGalleryDetails((data) => {
                console.log("aray :::::: ", data)
                this.arrayOfImageDetails = data
                this.forceUpdate()
            }, () => { })
            saveGalleryPrivacy(data, () => { }, () => { })
        },
            (error) => {
                console.log("Error ::::: ", error)
            })

    }

    onRequestCloseHandler = () => {
        this.setState({
            isImageModalOpen: false
        })
        this.selectedImageData = ""
    }

    onRequestSuccess = (data) => {
        this.arrayOfImageDetails.push(data)
        saveGalleryDetails(this.arrayOfImageDetails, () => { }, () => { })

        this.onRequestCloseHandler()
    }

    OnOpenImageModal = (item) => {

        this.setState({
            isImageModalOpen: true
        })
        this.selectedImageData = item.name !== undefined ? item : ""
    }

    privacyflagHandle = (value) => {
        saveGalleryPrivacy(value, () => { }, () => { })
        this.setState({
            isPrivacy: value
        })
        // this.state.isPrivacy = value
    }

    imagedataRender = ({ item, index }) => {
        return (
            <TouchableOpacity
                style={[styles.buttonStyle, { marginTop: index % 2 ? - 50 : 50 }]}
                activeOpacity={1.0}
                onPress={() => this.OnOpenImageModal(item)}
            >
                <Image style={styles.imageStyle} source={this.state.isPrivacy ? Assets.cameraPlaceholder : { uri: item.image }} />
                <Text
                    style={styles.textStyle}
                    numberOfLines={2}
                >{item.name}</Text>
            </TouchableOpacity>
        )
    }
    render() {
        return (
            <View style={styles.mainContainer}>
                <PhotoModalViewComponent
                    data={this.selectedImageData}
                    isPrivacy={this.state.isPrivacy}
                    isModalVisible={this.state.isImageModalOpen}
                    onRequestClose={this.onRequestCloseHandler}
                    onRequestSuccess={this.onRequestSuccess}
                    isText={this.selectedImageData !== "" ? true : false}
                />
                <View style={styles.commonStyle} >
                    <Image style={styles.commonStyle} source={Assets.header} resizeMode={'stretch'} />
                </View>
                <GalleryOverViewComponent style={styles.galleryStyle} isSwitchOn={this.state.isPrivacy} onChangePrivacyFlag={this.privacyflagHandle} />
                <FlatList
                    data={this.arrayOfImageDetails}
                    contentContainerStyle={{ alignItems: 'center' }}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => { item, index }}
                    renderItem={this.imagedataRender}
                />
                <AddButtonComponent
                    onPress={this.OnOpenImageModal}
                />

            </View>
        )
    }
}
export default HomeContainer;

const styles = StyleSheet.create({
    mainContainer: { flex: 1, backgroundColor: IMColors.offWhite },
    buttonStyle: { marginHorizontal: 20, padding: 10, backgroundColor: IMColors.white, borderRadius: 10 },
    galleryStyle: { marginHorizontal: 30, marginTop: - widthPercentageToDP("20%") },
    commonStyle: { flex: 1 },
    imageStyle: { width: 50, height: 50, borderRadius: 10, overflow: 'hidden' },
    textStyle: { width: 50, marginVertical: 20, fontFamily: Fonts.satisfy, color: IMColors.error }
})