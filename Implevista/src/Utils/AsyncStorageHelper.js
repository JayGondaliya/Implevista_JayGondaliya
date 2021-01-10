import AsyncStorage from "@react-native-community/async-storage";

export function saveGalleryDetails(details, onSuccess, onFailure) {
    AsyncStorage.setItem("images", JSON.stringify(details)).then(
        success => onSuccess(success),
        err => onFailure(err)
    );
}

export function getGalleryDetails(onSuccess, onFailure) {
    AsyncStorage.getItem("images").then(
        res => {
            if (res != "" && res != null && res != undefined) {
                onSuccess(JSON.parse(res));
            } else {
                onFailure("Value Null");
            }
        },
        err => onFailure(err)
    );
}

export function saveGalleryPrivacy(details, onSuccess, onFailure) {
    AsyncStorage.setItem("privacy", JSON.stringify(details)).then(
        success => {
            onSuccess(success)
        },
        err => {
            onFailure(err)
        }
    );
}

export function getGalleryPrivacy(onSuccess, onFailure) {
    AsyncStorage.getItem("privacy").then(
        res => {
            if (res != "" && res != null && res != undefined) {
                onSuccess(JSON.parse(res));
            } else {
                onSuccess(false);
            }
        },
        err => onFailure(err)
    );
}