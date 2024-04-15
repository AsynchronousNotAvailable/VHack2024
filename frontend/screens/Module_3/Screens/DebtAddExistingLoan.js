import React, { useRef, useState, useContext, useEffect } from 'react';
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
    Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { fonts, sw, sh } from '../../../styles/GlobalStyles';
import AppBar from '../Utils/AppBar';
import { TextInput as TextInputPaper } from 'react-native-paper';
import { BottomButton } from '../Utils/RenderBottomButton';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';

// import { InputOutline, InputStandard } from 'react-native-input-outline';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
    },
    contentContainer: {
        flex: 1,
    },
    inputContainer: {
        // flex: 1,
        margin: sw(20),
    },
    inputPaper: {
        width: '100%',
        backgroundColor: 'rgba(110, 113, 124, 0.05)',
        fontFamily: fonts.interRegular,
        borderRadius: 10,
        paddingTop: sh(8),
        paddingBottom: sh(5),
        marginVertical: sh(6),
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
    },
});

function DebtAddExistingLoan({ navigation, route }) {
    const [loanName, setLoanName] = useState('');
    const [loanAmount, setLoanAmount] = useState('');
    const [tenureYears, setTenureYears] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [repaymentDate, setRepaymentDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(true);

    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(Platform.OS === 'ios');
        if (selectedDate) {
            setRepaymentDate(selectedDate);
        }
    };

    const currentDate = new Date();

    // Reference for all constant
    const loanAmountRef = useRef(null);
    const tenureYearsRef = useRef(null);
    const interestRateRef = useRef(null);
    const [error, setError] = useState(undefined);

    const validateInputs = () => {
        let isValid = true;
        if (!/^\d+(\.\d{1,2})?$/.test(loanAmount) || parseFloat(loanAmount) <= 0) {
            Alert.alert('Error', 'Loan amount must be a positive number.');
            isValid = false;
        } else if (!/^\d+(\.\d{1,2})?$/.test(tenureYears) || parseFloat(tenureYears) <= 0) {
            Alert.alert('Error', 'Tenure must be a positive number with up to 2 decimal points only.');
            isValid = false;
        } else if (parseFloat(interestRate) < 0 || parseFloat(interestRate) > 100) {
            Alert.alert('Error', 'Interest rate must be between 0 and 100.');
            isValid = false;
        }
        return isValid;
    };

    const DebtAddExistingLoan2Page = () => {
        if (validateInputs()) {
            navigation.navigate('DebtAddExistingLoan2', {
                loanName: loanName,
                loanAmount: loanAmount,
                tenureYears: tenureYears,
                interestRate: interestRate,
                repaymentDate: repaymentDate,
                mockData1: route.params.mockData1,
                setMockData1: route.params.setMockData1,
            });
        }
    };

    const PreviousPage = () => {
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* <AppBar
                    title="Add Loan"
                    navigation={PreviousPage}
                /> */}
                <View style={styles.contentContainer}>
                    <View style={styles.inputContainer}>
                        <TextInputPaper
                            style={styles.inputPaper}
                            placeholder="Loan Name"
                            label="Loan Name"
                            mode="outlined"
                            keyboardType="default"
                            returnKeyType="next"
                            autoCapitalize="none"
                            onChangeText={(loanName) => {
                                setLoanName(loanName);
                            }}
                            onSubmitEditing={() => {
                                loanAmountRef.current?.focus();
                            }}
                        />
                        <TextInputPaper
                            style={styles.inputPaper}
                            placeholder="RM"
                            label="Enter Loan Amount"
                            mode="outlined"
                            ref={loanAmountRef}
                            keyboardType="numeric"
                            returnKeyType="next"
                            autoCapitalize="none"
                            onChangeText={(loanAmount) => {
                                setLoanAmount(loanAmount);
                            }}
                            onSubmitEditing={() => {
                                tenureYearsRef.current?.focus();
                            }}
                        />
                        <TextInputPaper
                            style={styles.inputPaper}
                            placeholder="Yrs"
                            label="Enter Tenure (Years)"
                            mode="outlined"
                            ref={tenureYearsRef}
                            keyboardType="numeric"
                            returnKeyType="next"
                            autoCapitalize="none"
                            onChangeText={(tenureYears) => {
                                setTenureYears(tenureYears);
                            }}
                            onSubmitEditing={() => {
                                interestRateRef.current?.focus();
                            }}
                        />
                        <TextInputPaper
                            style={styles.inputPaper}
                            placeholder="%"
                            label="Enter Interest Rate"
                            mode="outlined"
                            ref={interestRateRef}
                            keyboardType="numeric"
                            returnKeyType="next"
                            autoCapitalize="none"
                            onChangeText={(interestRate) => {
                                setInterestRate(interestRate);
                            }}
                            onSubmitEditing={() => {
                                startingYearRef.current?.focus();
                            }}
                        />
                        {/* <TextInputPaper
                            style={styles.inputPaper}
                            placeholder=""
                            label="Start From (Year)"
                            mode="outlined"
                            ref={startingYearRef}
                            keyboardType="numeric"
                            returnKeyType="next"
                            autoCapitalize="none"
                            onChangeText={(startingYear) => {
                                setStartingYear(startingYear);
                            }}
                        /> */}
                        <View>
                            <TextInputPaper
                                style={styles.inputPaper}
                                placeholder="Select Repayment Date"
                                label="Select Repayment Date"
                                mode="outlined"
                                editable={false}
                                value={
                                    repaymentDate
                                        ? repaymentDate.toLocaleDateString()
                                        : currentDate.toLocaleDateString()
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
                </View>
            </ScrollView>
            <BottomButton
                value="Continue"
                navigation={DebtAddExistingLoan2Page}
            />
        </SafeAreaView>
    );
}

export default DebtAddExistingLoan;
