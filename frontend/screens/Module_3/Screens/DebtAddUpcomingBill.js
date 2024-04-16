import React, { useRef, useState, useEffect, useContext } from 'react';
import {
    Platform,
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
import DateTimePicker from '@react-native-community/datetimepicker';
import { fonts, sw, sh, logo } from '../../../styles/GlobalStyles';
import AppBar from '../Utils/AppBar';
import { BottomButton } from '../Utils/RenderBottomButton';
import { TextInput as TextInputPaper } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import { Url } from '../../../url.js';

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

function DebtAddUpcomingBill({ navigation, route }) {
    const currentDate = new Date();

    const { mockData2, setMockData2 } = route.params;
    const [upcomingBillName, setUpcomingBillName] = useState('');
    const [upcomingBillAmount, setUpcomingBillAmount] = useState('');
    const [showDropDown, setShowDropDown] = useState(false);

    const upcomingBillAmountRef = useRef(null);

    const [repeatingOptionsValue, setRepeatingOptionsValue] = useState('MONTHLY');
    const [repaymentDate, setRepaymentDate] = useState(new Date());
    console.log('Repayment Date: ' + repaymentDate);
    const [displayDate, setDisplayDate] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(true);
    const [isFocus, setIsFocus] = useState(false);

    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(Platform.OS === 'ios');
        if (selectedDate) {
            setRepaymentDate(selectedDate);
        }
    };

    const data = [
        { label: 'Every Day', value: 'DAILY' },
        { label: 'Every Month', value: 'MONTHLY' },
        { label: 'Every Year', value: 'YEARLY' },
    ];

    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();
        return `${day}/${month}/${year}`;
    };

    const addDays = (date) => {
        date.setDate(date.getDate() + 1);
        return {
            displayDate: formatDate(date),
            storeDate: date,
        };
    };

    const addMonths = (date) => {
        date.setMonth(date.getMonth() + 1);
        return {
            displayDate: formatDate(date),
            storeDate: date,
        };
    };

    const addYears = (date) => {
        date.setFullYear(date.getFullYear() + 1);
        return {
            displayDate: formatDate(date),
            storeDate: date,
        };
    };

    const handleAddBills = async () => {
        try {
            const newBills = {
                name: upcomingBillName,
                amount: parseFloat(upcomingBillAmount),
                repeating_option: repeatingOptionsValue,
                bill_status: 'UNPAID',
                userId: 1,
                repayment_date: repaymentDate,
            };
            console.log(newBills);
            const response = await axios.post(`http://${Url}:3000/bills/new`, newBills);
        } catch (error) {
            console.error(error.message);
        }
    };

    const DebtMainPage = () => {
        handleAddBills();
        const newData = {
            image: logo.bill_logo,
            backgroundColor: '#CFFAEA',
            itemName: upcomingBillName,
            paymentDate: displayDate,
            upcomingBills: upcomingBillAmount,
            index: mockData2.length + 2,
        };
        setMockData2([...mockData2, newData]);
        navigation.navigate('DebtSummary');
    };
    const PreviousPage = () => {
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* <AppBar
                    title="Add Upcoming Bills"
                    navigation={PreviousPage}
                /> */}
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
                        keyboardType="numeric"
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
                        value={repeatingOptionsValue}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={(item) => {
                            setRepeatingOptionsValue(item.value);
                            setIsFocus(false);
                            switch (item.label) {
                                case 'Every Day':
                                    date = addDays(repaymentDate, parseInt(item.value));
                                    break;
                                case 'Every Month':
                                    date = addMonths(repaymentDate, parseInt(item.value));
                                    break;
                                case 'Every Year':
                                    date = addYears(repaymentDate, parseInt(item.value));
                                    break;
                                default:
                                    date = addMonths(repaymentDate, parseInt(item.value));
                                    break;
                            }
                            setDisplayDate(date.displayDate);
                            setRepaymentDate(date.storeDate);
                        }}
                    />
                    <View>
                        <TextInputPaper
                            style={styles.inputPaper}
                            placeholder="Select Repayment Date"
                            label="Select Repayment Date"
                            mode="outlined"
                            editable={false}
                            value={
                                repaymentDate ? repaymentDate.toLocaleDateString() : currentDate.toLocaleDateString()
                            }
                        />
                        {showDatePicker && (
                            <DateTimePicker
                                value={repaymentDate ? repaymentDate : currentDate}
                                mode="date"
                                minimumDate={currentDate}
                                is24Hour={true}
                                display="default"
                                onChange={handleDateChange}
                            />
                        )}
                    </View>
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
