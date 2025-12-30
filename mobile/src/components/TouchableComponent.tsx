import React, {
    FC,
    memo,
    ReactNode,
    useCallback,
} from 'react';

import { debounce } from 'lodash';
import {
    TouchableOpacity,
    TouchableOpacityProps,
} from 'react-native';

interface IProps extends TouchableOpacityProps {
    children?: ReactNode;
    onPress?: any;
}

const TouchableComponent: FC<IProps> = ({ children, onPress, ...rest }) => {
    const handlePress = useCallback( debounce(() => {
        onPress && onPress();
    }, 500, { leading: true, trailing: false, maxWait: 500 }), [onPress]);

    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.5}
            {...rest}
        >
            {children}
        </TouchableOpacity>
    );
};

export default memo(TouchableComponent);
