import { StyleSheet } from 'react-native';

export const convertFontWeightToFontFamily = (style: any) => {
    let fontWeight;
    let fontFamily;
    let fontStyle = '';

    if (Array.isArray(style)) {
        fontWeight = StyleSheet.flatten(style)?.fontWeight;
        fontFamily = StyleSheet.flatten(style)?.fontFamily;
        fontStyle = StyleSheet.flatten(style)?.fontStyle;
    } else {
        fontWeight = style?.fontWeight;
        fontFamily = style?.fontFamily;
        fontStyle = style?.fontStyle;
    }

    if (fontFamily) {
        return fontFamily;
    } else {
        let fFamily = '';
        switch (fontWeight) {
            case '100':
                fFamily =  'SFProDisplay-Ultralight';
                break;
            case '200':
                fFamily =  'SFProDisplay-Thin';
                break;
            case '300':
                fFamily =  'SFProDisplay-Light';
                break;
            case '400':
                fFamily =  'SFProDisplay-Regular';
                break;
            case '500':
                fFamily =  'SFProDisplay-Medium';
                break;
            case '600':
                fFamily =  'SFProDisplay-Semibold';
                break;
            case '700':
                fFamily =  'SFProDisplay-Bold';
                break;
            case '800':
                fFamily =  'SFProDisplay-Heavy';
                break;
            case '900':
                fFamily =  'SFProDisplay-Black';
                break;
            default:
                fFamily =  'SFProDisplay-Regular';
                break;
        }
        return fFamily + (fontStyle === 'italic' ? 'Italic' : '');
    }
};