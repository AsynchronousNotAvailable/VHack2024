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
} from 'react-native';
import { fonts, sw, sh, logo } from '../../../styles/GlobalStyles';
import AppBar from '../Utils/AppBar';
import { BottomButton } from '../Utils/RenderBottomButton';
import { TextInput as TextInputPaper } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

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

function DebtAddUpcomingBill({navigation, route}) {
    const {mockData2, setMockData2} = route.params
    const [upcomingBillName, setUpcomingBillName] = useState('');
    const [upcomingBillAmount, setUpcomingBillAmount] = useState('');
    const [showDropDown, setShowDropDown] = useState(false);

    const upcomingBillAmountRef = useRef(null);

    const [value, setValue] = useState(null);
    const [paymentDate, setPaymentDate] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const data = [
        { label: 'Every Day', value: '1' },
        { label: 'Every Week', value: '2' },
        { label: 'Every Month', value: '3' },
        { label: 'Every Year', value: '4' },
    ];

    const addDays = (date, days) => {
        const result = new Date(date);
        result.setDate(result.getDate() + 1);
        return formatDate(result);
    };

    const addWeeks = (date, weeks) => {
        const result = new Date(date);
        result.setDate(result.getDate() + 7);
        return formatDate(result);
    };

    const addMonths = (date, months) => {
        const result = new Date(date);
        result.setMonth(result.getMonth() + 1);
        return formatDate(result);
    };

    const addYears = (date, years) => {
        const result = new Date(date);
        result.setFullYear(result.getFullYear() + 1);
        return formatDate(result);
    };

    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0'); 
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
        const year = (date.getFullYear()).toString(); 
        return `${day}/${month}/${year}`;
    };

    const DebtMainPage = () => {
        const newData = {
            image: logo.school_logo,
            backgroundColor: '#CFFAEA',
            itemName: upcomingBillName,
            paymentDate: paymentDate,
            upcomingBills: upcomingBillAmount,
            index: mockData2.length+2,
        }
        setMockData2([...mockData2, newData]);
        navigation.navigate('DebtSummary');
    };
    const PreviousPage = () => {
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <AppBar
                    title="Add Upcoming Bills"
                    navigation={PreviousPage}
                />
                <View style={styles.contentContainer}>
                    <TextInputPaper
                        style={styles.inputPaper}
                        placeholder="Electricity Bill"
                        label="Upcoming Bill Name"
                        mode="outlined"
                        keyboardType="default"
                        returnKeyType="next"
                        autoCapitalize="none"
                        onChangeText={(upcomingBillName) => {
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
                        onChangeText={(upcomingBillAmount) => {
                            setUpcomingBillAmount(upcomingBillAmount);
                        }}
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
                            const now = new Date();
                            switch (item.label) {
                                case 'Every Day':
                                    newDate = addDays(now, parseInt(item.value));
                                    break;
                                case 'Every Week':
                                    newDate = addWeeks(now, parseInt(item.value));
                                    break;
                                case 'Every Month':
                                    newDate = addMonths(now, parseInt(item.value));
                                    break;
                                case 'Every Year':
                                    newDate = addYears(now, parseInt(item.value));
                                    break;
                                default:
                                    newDate = now;
                                    break;
                            }
                            setPaymentDate(newDate)
                        }}
                    />
                </View>
            </ScrollView>
            <BottomButton
                value="Add"
                navigation={DebtMainPage}
            />
        </SafeAreaView>
    );
}

export default DebtAddUpcomingBill;
