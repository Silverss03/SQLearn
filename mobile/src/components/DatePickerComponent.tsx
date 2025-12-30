import React, {
    FC,
    useCallback,
    useRef,
} from 'react';

import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import DatePicker from 'react-native-date-picker';

import ButtonComponent from '@src/components/ButtonComponent';
import DialogComponent from '@src/components/DialogComponent';
import { Colors } from '@src/configs';
import useDimens, { DimensType } from '@src/hooks/useDimens';

interface ModalProps {
    isShow: boolean,
    hideModal: () => void,
    date: Date,
    minDate?: Date,
    maxDate?: Date,
    onDateChange: (_date: Date) => void
}

const DatePickerComponent: FC<ModalProps> = ({ isShow, hideModal, date, onDateChange, minDate, maxDate }) => {
    const Dimens = useDimens();
    const styles = stylesF(Dimens);

    const { t } = useTranslation();

    const currentDate = useRef(date);

    const onChange = useCallback((date: Date) => {
        currentDate.current = date;
    }, []);

    const onSelectDate = useCallback(() => {
        hideModal();
        onDateChange(currentDate.current);
    }, [hideModal, onDateChange]);

    return (
        <DialogComponent
            hideModal={hideModal}
            isVisible={isShow}
            containerStyle={styles.container}
        >
            <DatePicker
                date={date}
                mode='date'
                minimumDate={minDate}
                maximumDate={maxDate}
                onDateChange={onChange}
            />

            <ButtonComponent
                onPress={onSelectDate}
                title={t('Select')}
                style={styles.buttonA}
            />

            <ButtonComponent
                onPress={hideModal}
                title={t('Cancel')}
                styleTitle={styles.btnBTitle}
                style={styles.buttonB}
            />
        </DialogComponent>
    );
};

export default DatePickerComponent;

const stylesF = (Dimens: DimensType) => StyleSheet.create({
    container: {
        borderRadius: Dimens.RADIUS_16,
        paddingVertical: Dimens.H_24
    },
    btnBTitle: {
        color: Colors.COLOR_PRIMARY
    },
    buttonB: {
        borderRadius: Dimens.RADIUS_999,
        backgroundColor: 'transparent',
    },
    buttonA: {
        borderRadius: Dimens.RADIUS_999,
        marginTop: Dimens.H_16,
        marginBottom: Dimens.H_8
    },

});