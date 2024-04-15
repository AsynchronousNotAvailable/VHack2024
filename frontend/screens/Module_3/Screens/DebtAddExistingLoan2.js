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
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import { Url } from '../../../url.js';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    titleStyle: {
        fontSize: sw(18),
        fontFamily: fonts.interSemiBold,
        margin: sw(20),
    },
    loanBreakdownContainer: {
        flex: 1,
        flexDirection: 'column',
        marginHorizontal: sw(20),
        backgroundColor: '#F6F8FA',
        borderRadius: sw(6),
        marginBottom: sh(40),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    loanBreakdownContentContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#F6F8FA',
        justifyContent: 'space-between',
        margin: sw(15),
    },
    paymentBreakdownContainer: {
        flex: 1,
        flexDirection: 'column',
        marginHorizontal: sw(20),
        backgroundColor: '#F6F8FA',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
    },
    paymentBreakdownContentContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        // borderRadius: sw(6),
        paddingHorizontal: sw(15),
        paddingVertical: sh(20),
        backgroundColor: '#F6F8FA',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    smallTitleStyle: {
        color: '#A4A9AE',
    },
    smallTextStyle: {
        marginTop: sh(70),
        color: '#A4A9AE',
        textAlign: 'center',
    },
});

const tallyDiscountedValueWithLoan = (random_preset_repayment_amount, discounting_factors, loan, installment_month) => {
    let repaymentAmount = random_preset_repayment_amount;
    const discounted_value = [];
    for (let i = 0; i < installment_month; i++) {
        discounted_value.push(random_preset_repayment_amount * discounting_factors[i]);
    }
    let sum_discounted_value = discounted_value.reduce((total, a) => total + a, 0);

    while (Math.abs(sum_discounted_value - loan) > 0.01) {
        const discounted_value = [];
        for (let i = 0; i < installment_month; i++) {
            discounted_value.push(repaymentAmount * discounting_factors[i]);
        }
        sum_discounted_value = discounted_value.reduce((total, a) => total + a, 0);
        if (sum_discounted_value < loan) {
            repaymentAmount += Math.random() * ((loan - sum_discounted_value) / installment_month);
        } else {
            repaymentAmount -= Math.random() * ((sum_discounted_value - loan) / installment_month);
        }
    }
    return repaymentAmount;
};

const calculateMonthlyLoanRepaymentAmount = (loan_interest_rate, loan_installment_month, loan_amount) => {
    const monthlyInterestRate = Math.pow(1 + loan_interest_rate / 100, 1 / 12) - 1;
    const installment_month = loan_installment_month;
    const amount = loan_amount;
    const accumulation_interest = [];
    for (let i = 1; i <= installment_month; i++) {
        accumulation_interest.push(Math.pow(1 + monthlyInterestRate, i));
    }
    const discounting_factors = [];
    for (let i = 0; i < installment_month; i++) {
        discounting_factors.push(1 / accumulation_interest[i]);
    }
    const random_preset_repayment_amount = amount / installment_month;
    const monthlyRepaymentAmount = tallyDiscountedValueWithLoan(
        random_preset_repayment_amount,
        discounting_factors,
        amount,
        installment_month,
    );
    return monthlyRepaymentAmount;
};

function DebtAddExistingLoan2({ navigation, route }) {
    const { loanName, loanAmount, tenureYears, interestRate, repaymentDate, mockData1, setMockData1 } = route.params;

    const startingYear = repaymentDate.getFullYear();

    var now = repaymentDate;
    if (now.getMonth() == 11) {
        var nextMonth = new Date(now.getFullYear() + 1, 0, now.getDate());
    } else {
        var nextMonth = new Date(now.getFullYear(), now.getMonth() + 2, now.getDate());
    }

    const installment_month = Math.ceil(tenureYears * 12);
    const monthlyLoanRepaymentAmount = calculateMonthlyLoanRepaymentAmount(interestRate, installment_month, loanAmount);
    const totalRepaymentAmountAfterInterest = monthlyLoanRepaymentAmount * installment_month;

    const interestAmount = (totalRepaymentAmountAfterInterest - loanAmount).toFixed(2);
    const endYear = nextMonth.getFullYear() + Number(tenureYears);
    const monthlyPayment = (Number(loanAmount) + Number(interestAmount)) / (12 * tenureYears);
    const expiryDate =
        now.getDate() + '/' + nextMonth.getMonth() + '/' + (Number(nextMonth.getFullYear()) + Number(tenureYears));

    const expiryDateObj = new Date(endYear, nextMonth.getMonth(), now.getDate());
    const expiryDateISOString = expiryDateObj.toISOString();

    const handleAddLoan = async () => {
        try {
            const newBudget = {
                name: loanName,
                end_date: expiryDateISOString,
                loan_amount: parseFloat(loanAmount),
                installment_month: installment_month,
                payment_remaining: installment_month,
                interest_rate: parseInt(interestRate),
                loan_status: 'UNPAID',
                userId: 1,
                repayment_date: repaymentDate,
            };
            console.log(newBudget);
            const response = await axios.post(`http://${Url}:3000/loans/new`, newBudget);
        } catch (error) {
            console.error(error.message);
        }
    };

    const DebtSummary = () => {
        handleAddLoan();
        const newData = {
            image: logo.loan_logo,
            backgroundColor: '#FDD5D7',
            itemName: loanName,
            expiryDate: expiryDate,
            currentLoan: 0,
            totalLoan: loanAmount,
            index: mockData1.length + 2,
        };
        setMockData1([...mockData1, newData]);
        navigation.navigate('DebtSummary');
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
                <Text style={styles.titleStyle}>Loan Breakdown</Text>
                <View style={styles.loanBreakdownContainer}>
                    <View style={styles.loanBreakdownContentContainer}>
                        <Text style={styles.smallTitleStyle}>Loan Name</Text>
                        <Text style={{ fontFamily: fonts.interSemiBold }}>{loanName}</Text>
                    </View>
                    <View style={styles.loanBreakdownContentContainer}>
                        <Text style={styles.smallTitleStyle}>Loan Amount</Text>
                        <Text style={{ fontFamily: fonts.interSemiBold }}>RM{loanAmount}</Text>
                    </View>
                    <View style={styles.loanBreakdownContentContainer}>
                        <Text style={styles.smallTitleStyle}>Interest</Text>
                        <Text style={{ fontFamily: fonts.interSemiBold }}>RM{interestAmount}</Text>
                    </View>
                    <View style={styles.loanBreakdownContentContainer}>
                        <Text style={styles.smallTitleStyle}>End Date</Text>
                        <Text style={{ fontFamily: fonts.interSemiBold }}>
                            {nextMonth.getMonth()}/{endYear}
                        </Text>
                    </View>
                </View>
                <Text style={styles.titleStyle}>Payment Breakdown</Text>
                <View style={styles.paymentBreakdownContainer}>
                    <View style={styles.paymentBreakdownContentContainer}>
                        <Text style={styles.smallTitleStyle}>Upcoming Payment</Text>
                        <Text style={{ fontFamily: fonts.interSemiBold }}>
                            {nextMonth.getMonth()}/{startingYear}
                        </Text>
                    </View>
                    <View style={styles.paymentBreakdownContentContainer}>
                        <Text style={styles.smallTitleStyle}>Monthly Payment</Text>
                        <Text style={{ fontFamily: fonts.interSemiBold }}>{monthlyPayment.toFixed(2)}</Text>
                    </View>
                </View>
                <Text style={styles.smallTextStyle}>Auto added to your upcoming bills after confirmation</Text>
            </ScrollView>
            <BottomButton
                value="Add"
                navigation={DebtSummary}
                action={handleAddLoan}
            />
        </SafeAreaView>
    );
}

export default DebtAddExistingLoan2;
