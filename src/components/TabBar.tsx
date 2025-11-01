import { useState } from 'react';
import TextComponent from './TextComponent';
import {
    StyleSheet, TouchableOpacity, View
} from 'react-native';
import useDimens, { DimensType } from '@src/hooks/useDimens';
import useThemeColors from '@src/themes/useThemeColors';
import { useTranslation } from 'react-i18next';

interface TabBarProps {
    tabs: Array<{ name: string; id: string }>;
    initialId?: string;
    isShowFilters?: boolean;
    containerStyle?: any;
    onChangeTab?: (id: string) => void;
    titleStyle?: any;
    activeTitleStyle?: any;
    onFilterPress?: () => void;
    isTransparent?: boolean;
}

export const TabBar = (props: TabBarProps) => {
    const { tabs, initialId, onChangeTab, onFilterPress } = props;
    const Dimens = useDimens();
    const themeColors = useThemeColors();
    const styles = stylesF(Dimens, themeColors);
    const { t } = useTranslation();

    const [activeTab, setActiveTab] = useState<string>(initialId || tabs[0].id);

    const handleTabPress = (id: string) => {
        setActiveTab(id);
        onChangeTab?.(id);
    };

    return (
        <View style={[styles.container, props.containerStyle]}>
            <View style={[styles.background, props.isTransparent && styles.transparentBackground]} />
            <View style={styles.tabsContainer}>
                {tabs.map((tab, i) => {
                    const isActive = activeTab === tab.id;
                    return (
                        <TouchableOpacity
                            key={i}
                            onPress={() => handleTabPress(tab.id)}
                            style={[styles.tabButton, isActive && styles.activeTab]}
                        >
                            <TextComponent
                                style={[
                                    styles.tabText,
                                    props.titleStyle,
                                    props.isTransparent && styles.whiteText,
                                    isActive && styles.activeText,
                                    isActive && props.activeTitleStyle,
                                ]}
                            >
                                {t(tab.name)}
                            </TextComponent>
                        </TouchableOpacity>
                    );
                })}
            </View>
            {props.isShowFilters && (
                <TouchableOpacity
                    onPress={onFilterPress}
                    style={styles.filterButton}
                />
            )}
        </View>
    );
};

const stylesF = (Dimens: DimensType, themeColors: ReturnType<typeof useThemeColors>) => StyleSheet.create({
    container: {
        height: Dimens.H_40,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: Dimens.RADIUS_24,
        backgroundColor: 'transparent',
        gap: Dimens.W_8,
        position: 'relative',
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: Dimens.RADIUS_24,
    },
    transparentBackground: {
        opacity: 0.3,
    },
    tabsContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: '100%',
        justifyContent: 'space-between',
    },
    tabButton: {
        height: '100%',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: Dimens.W_8,
        borderRadius: Dimens.RADIUS_24,
    },
    activeTab: {
        backgroundColor: themeColors.color_active_tab_bar,
    },
    tabText: {
        fontSize: Dimens.FONT_12,
        color: themeColors.color_text_2,
    },
    whiteText: {
        color: 'white',
    },
    activeText: {
        color: 'white',
    },
    filterButton: {
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Dimens.RADIUS_24,
        backgroundColor: '#D9D9D9',
        padding: Dimens.W_8,
        paddingHorizontal: Dimens.W_16,
    },
});