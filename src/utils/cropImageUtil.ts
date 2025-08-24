import ImagePicker, { Image } from 'react-native-image-crop-picker';

import { Colors } from '@src/configs';

import ImageResizer from '@bam.tech/react-native-image-resizer';
import { CropImageResponse } from '@src/components/imageSelect/ImageSelectComponent';

export const IMAGE_SOURCE = {
    CAMERA: 0,
    GALLERY: 1,
};

export const AVATAR_UPLOAD_SIZE = {
    WIDTH: 600,
    HEIGHT: 600,
};

const openAndCropImageFromGallery = async (width: number, height: number) => await ImagePicker.openPicker({
    mediaType: 'photo',
    useFrontCamera: true,
    multiple: false,
    maxFiles: 1,
    cropping: false,
    showCropFrame: true,
    freeStyleCropEnabled: true,
    showCropGuidelines: true,
    compressImageQuality: 1,
    cropperCancelText: 'Close',
    cropperChooseText: 'Ok',
    width: width,
    height: height,
    cropperActiveWidgetColor: Colors.COLOR_PRIMARY,
    cropperStatusBarColor: Colors.COLOR_BLACK,
    cropperToolbarColor: Colors.COLOR_BLACK,
    cropperToolbarWidgetColor: Colors.COLOR_WHITE,
    cropperCircleOverlay: true,
});

const openAndCropImageFromCamera = async (width: number, height: number) => await ImagePicker.openCamera({
    mediaType: 'photo',
    useFrontCamera: true,
    multiple: false,
    cropping: false,
    showCropFrame: true,
    freeStyleCropEnabled: true,
    showCropGuidelines: true,
    compressImageQuality: 1,
    cropperCancelText: 'Close',
    cropperChooseText: 'Ok',
    width: width,
    height: height,
    cropperActiveWidgetColor: Colors.COLOR_PRIMARY,
    cropperStatusBarColor: Colors.COLOR_BLACK,
    cropperToolbarColor: Colors.COLOR_BLACK,
    cropperToolbarWidgetColor: Colors.COLOR_WHITE,
    cropperCircleOverlay: true,
});

const resizeImage = async (imageObj: Image, width: number, height: number) => {
    const path = imageObj.path;

    return await ImageResizer.createResizedImage(
            path,
            width,
            height,
            'PNG',
            100,
            0)
            .then((res) => ({ ...res, mime: imageObj.mime, name: res.name || 'image.png' }))
            .catch(() => ({
                width: imageObj.width,
                height: imageObj.height,
                name: imageObj.filename || 'image.png',
                path: imageObj.path,
                uri: imageObj.sourceURL,
                size: imageObj.size,
                mime: imageObj.mime,
            }));
};

export const openAndCropImage = async (imageFrom: number , width: number, height: number): Promise<CropImageResponse> => {
    let response;

    if (imageFrom === IMAGE_SOURCE.CAMERA) {
        response = await openAndCropImageFromCamera(width, height);
    } else {
        response = await openAndCropImageFromGallery(width, height);
    }

    console.log('response', response);

    const resizeResponse = await resizeImage(response, 612, 816);

    console.log('resizeResponse', resizeResponse);

    return resizeResponse;
};