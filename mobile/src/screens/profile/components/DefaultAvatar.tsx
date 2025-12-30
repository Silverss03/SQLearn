import React, { useCallback, useMemo } from 'react';
import {
    View, StyleSheet, StyleProp, ViewStyle
} from 'react-native';
import TextComponent from '@src/components/TextComponent';
import useDimens, { DimensType } from '@src/hooks/useDimens';
import useThemeColors from '@src/themes/useThemeColors';

interface AvatarProps {
  fullName?: string;
  size?: number;
  textColor?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

const DefaultAvatar: React.FC<AvatarProps> = ({
    fullName,
    size = 64,
    textColor = '#FFFFFF',
    containerStyle
}) => {
    const Dimens = useDimens();
    const themeColors = useThemeColors();
    const styles = stylesF(Dimens);
    // Avatar background color keys in theme
    const avatarBgKeys = useMemo(
            () => ['avatar_bg_1', 'avatar_bg_2', 'avatar_bg_3', 'avatar_bg_4', 'avatar_bg_5', 'avatar_bg_6', 'avatar_bg_7'],
            []
    );
    // Generate initials: 2 letters from first two words, or duplicate first letter if only one word
    const getInitials = useMemo(() => (name?: string): string => {
        if (!name) return '';
        const words = name.trim().split(/\s+/);
        if (words.length >= 2) {
            return (words[0][0] + words[words.length - 1][0]).toUpperCase();
        } else if (words.length === 1) {
            return (words[0][0] + words[0][0]).toUpperCase();
        }
        return '';
    }, []);

    // Stable hash function to convert string to a number index
    const getColorIndexFromName = useCallback((name: string = '', max: number): number => {
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = ((hash << 5) - hash) + name.charCodeAt(i);
            hash |= 0; // Convert to 32bit integer
        }
        return Math.abs(hash) % max;
    }, []);

    const bgColor = useMemo(() => {
        const index = getColorIndexFromName(fullName, avatarBgKeys.length);
        return (themeColors as Record<string, string>)[avatarBgKeys[index]] || '#B2EBF2';
    }, [getColorIndexFromName, fullName, avatarBgKeys, themeColors]);

    const initials = getInitials(fullName);

    return (
        <View
            style={[
                styles.avatarContainer,
                {
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    backgroundColor: bgColor,
                },
                containerStyle
            ]}
        >
            <TextComponent
                style={[
                    styles.initialsText,
                    {
                        color: textColor,
                        fontSize: size * 0.4,
                    },
                ]}
            >
                {initials}
            </TextComponent>
        </View>
    );
};

const stylesF = (_Dimens: DimensType) =>
    StyleSheet.create({
        avatarContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 3,
        },
        initialsText: {
            fontWeight: '500',
            textAlign: 'center',
        },
    });

export default DefaultAvatar;
