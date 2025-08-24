import React, {
    memo,
    useCallback,
} from 'react';

import {
    InteractionManager,
    StyleProp,
    View,
    ViewStyle,
} from 'react-native';

import useBoolean from '@src/hooks/useBoolean';
import {
    AVATAR_UPLOAD_SIZE,
    IMAGE_SOURCE,
    openAndCropImage,
} from '@src/utils/cropImageUtil';
import { logError } from '@src/utils/logger';

import ImageComponent, { ImageComponentProps } from '../ImageComponent';
import TouchableComponent from '../TouchableComponent';
import SelectPhotoOptionDialog from './SelectPhotoOptionDialog';

export const SELECT_OPTIONS = {
    FROM_GALLERY: 1,
    FROM_CAMERA: 2,
    DELETE_PHOTO: 3,
};

export interface CropImageResponse {
    width: number
    height: number
    name: string
    path: string
    uri?: string
    size: number
    mime: string
}

interface ImageSelectComponentProps extends ImageComponentProps {
    onSelectImage: (_image: CropImageResponse) => void,
    onDeleteImage?: () => void,
    containerStyle?: StyleProp<ViewStyle>,
    component?: React.ReactNode,
    title: string
}

const ImageSelectComponent = ({ onSelectImage, onDeleteImage, containerStyle, component, title, ...rest } : ImageSelectComponentProps) => {

    const [isShowDialog, showDialog, hideDialog] = useBoolean(false);

    const handleSelectOption = useCallback(async (option: number) => {
        try {
            let result;

            if (option === SELECT_OPTIONS.FROM_CAMERA) {
                result = await openAndCropImage(IMAGE_SOURCE.CAMERA, AVATAR_UPLOAD_SIZE.WIDTH, AVATAR_UPLOAD_SIZE.HEIGHT);
            } else if (option === SELECT_OPTIONS.FROM_GALLERY) {
                result = await openAndCropImage(IMAGE_SOURCE.GALLERY, AVATAR_UPLOAD_SIZE.WIDTH, AVATAR_UPLOAD_SIZE.HEIGHT);
            } else {
                onDeleteImage && onDeleteImage();
            }

            hideDialog();

            if (result) {
                InteractionManager.runAfterInteractions(() => {
                    onSelectImage(result);
                });
            }
        } catch (error) {
            hideDialog();
            logError('error', error);
        }
    }, [hideDialog, onDeleteImage, onSelectImage]);

    return (
        <View style={containerStyle}>
            <TouchableComponent
                onPress={showDialog}
            >
                {component ? component : (
                <ImageComponent
                    {...rest}
                />
            )}
            </TouchableComponent>

            <SelectPhotoOptionDialog
                title={title}
                hideModal={hideDialog}
                isShow={isShowDialog}
                // showDeleteButton={!isEmptyOrUndefined(rest?.source?.uri)}
                showDeleteButton={false}
                onSelectOption={(option) => handleSelectOption(option)}
            />
        </View>
    );
};

export default memo(ImageSelectComponent);
