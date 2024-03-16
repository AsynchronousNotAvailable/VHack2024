import React, { useRef, useState } from 'react';
import {
    Keyboard,
    ScrollView,
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    SafeAreaView,
    ImageSourcePropType,
} from 'react-native';
import { fonts, sw, sh } from '../../../styles/GlobalStyles';
import AppBar from '../Utils/AppBar';
import { BottomButton } from '../Utils/RenderBottomButton';
import { Provider, TextInput as TextInputPaper } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        flexDirection: 'column',
        margin: sw(20),
    },
    inputPaper: {
        width: '100%',
        backgroundColor: 'rgba(110, 113, 124, 0.05)',
        fontFamily: fonts.interRegular,
        borderRadius: 10,
        paddingVertical: sh(4),
        marginVertical: sh(6),
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
    },
    dropdown: {
        width: '100%',
        backgroundColor: 'rgba(110, 113, 124, 0.05)',
        fontFamily: fonts.interRegular,
        borderRadius: 5,
        paddingVertical: sh(10),
        paddingHorizontal: sw(10),
        marginVertical: sh(20),
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        borderColor: 'black',
        borderWidth: 0.5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});

function DebtAddUpcomingBill() {
    const [upcomingBillName, setUpcomingBillName] = useState<string>('');
    const [upcomingBillAmount, setUpcomingBillAmount] = useState<string>('');
    const [showDropDown, setShowDropDown] = useState(false);

    const upcomingBillAmountRef = useRef<TextInput>(null);

    const [value, setValue] = useState<string | null>(null);
    const [isFocus, setIsFocus] = useState<boolean>(false);

    const data = [
        { label: 'Item 1', value: '1' },
        { label: 'Item 2', value: '2' },
        { label: 'Item 3', value: '3' },
        { label: 'Item 4', value: '4' },
        { label: 'Item 5', value: '5' },
        { label: 'Item 6', value: '6' },
        { label: 'Item 7', value: '7' },
        { label: 'Item 8', value: '8' },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <AppBar title="Add Upcoming Bills" />
                <View style={styles.contentContainer}>
                    <TextInputPaper
                        style={styles.inputPaper}
                        placeholder="Electricity Bill"
                        label="Upcoming Bill Name"
                        mode="outlined"
                        keyboardType="default"
                        returnKeyType="next"
                        autoCapitalize="none"
                        onChangeText={(upcomingBillName: string) => {
                            setUpcomingBillName(upcomingBillName);
                        }}
                        onSubmitEditing={() => {
                            upcomingBillAmountRef.current?.focus();
                        }}
                    />
                    <TextInputPaper
                        style={styles.inputPaper}
                        placeholder="RM"
                        label="Enter Amount"
                        mode="outlined"
                        ref={upcomingBillAmountRef}
                        keyboardType="default"
                        returnKeyType="next"
                        autoCapitalize="none"
                        onChangeText={(upcomingBillAmount: string) => {
                            setUpcomingBillAmount(upcomingBillAmount);
                        }}
                        // onSubmitEditing={() => {
                        //     loanAmountRef.current?.focus();
                        // }}
                    />
                    <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={data}
                        search
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'Repeat Option' : '...'}
                        searchPlaceholder="Option..."
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={(item) => {
                            setValue(item.value);
                            setIsFocus(false);
                        }}
                    />
                </View>
            </ScrollView>
            <BottomButton value="Add" />
        </SafeAreaView>
    );
}

export default DebtAddUpcomingBill;
