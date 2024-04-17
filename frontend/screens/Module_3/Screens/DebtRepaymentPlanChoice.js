import React, { useRef, useState, useEffect, useContext } from 'react';
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
import { fonts, sw, sh } from '../../../styles/GlobalStyles';
import AppBar from '../Utils/AppBar';
import { mockData4 } from '../MockData/mockData';
import PaymentStrategyContainer from '../Utils/RenderStrategyContainer';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import { GlobalContext } from '../../../context';
import { Url } from '../../../url';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    titleStyle: {
        fontSize: sw(18),
        fontFamily: fonts.interRegular,
        fontWeight: 'bold',
        marginVertical: sh(20),
        marginHorizontal: sw(20),
        textAlign: 'center',
    },
});

function DebtRepaymentPlanChoice({ navigation, route }) {
    const { extraPayment, fetchHomeScreenData } = route.params;

    const { userId } = useContext(GlobalContext);
    const [loans, setLoans] = useState([]);
    const [user, setUser] = useState([]);
    const [totalMonthlyLoanAmount, setTotalMonthlyLoanAmount] = useState(0);
    const [totalOverdueAmount, setTotalOverdueAmount] = useState(0);
    const [totalDebt, setTotalDebt] = useState(0);
    const [totalPrinciple, setTotalPrinciple] = useState(0);
    const [totalBalance, setTotalBalance] = useState(0);
    const [totalMonthlyPayment, setTotalMonthlyPayment] = useState(0);
    const [paymentStrategyChoice, setPaymentStrategyChoice] = useState([]);

    const fetchUserDetails = async () => {
        try {
            const response = await axios.get(`http://${Url}:3000/users/${userId}`);
            // console.log(response.data);
            const user = response.data;
            const { strategy, debt_free_date } = user;
            const extractedData = { strategy, debt_free_date };
            return extractedData;
        } catch (error) {
            console.error('Error fetching bills:', error);
        }
    };

    const fetchAllLoans = async () => {
        try {
            const response = await axios.get(`http://${Url}:3000/loans/${userId}`);
            // console.log(response.data);
            const loans = response.data;
            const transformedLoans = loans.map((loan) => ({
                name: loan.name,
                amount: loan.loan_amount,
                installment_month: loan.installment_month,
                payment_remaining: loan.payment_remaining,
                interest_rate: loan.interest_rate,
                repayment_date: loan.repayment_date,
            }));
            return transformedLoans;
        } catch (error) {
            console.error('Error fetching loans:', error);
        }
    };

    const tallyDiscountedValueWithLoan = (
        random_preset_repayment_amount,
        discounting_factors,
        loan,
        installment_month,
    ) => {
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

    const calculateMonthlyLoanRepaymentAmount = (loan, remaining = false) => {
        const monthlyInterestRate = Math.pow(1 + loan.interest_rate / 100, 1 / 12) - 1;
        const installment_month = loan.installment_month;
        const amount = remaining ? loan.remaining_amount : loan.amount;
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

    const calculateTotalLoanPayment = (loan) => {
        const installment_month = loan.installment_month;
        const monthlyRepaymentAmount = calculateMonthlyLoanRepaymentAmount(loan);
        const totalPayment = monthlyRepaymentAmount * installment_month;
        return totalPayment;
    };

    const calculateTotalBalance = (loan) => {
        const remaining_month = loan.payment_remaining;
        const monthlyRepaymentAmount = calculateMonthlyLoanRepaymentAmount(loan);
        const totalBalance = monthlyRepaymentAmount * remaining_month;
        return totalBalance;
    };

    const calculateInstallmentMonths = (loan, monthlyRepaymentAmount) => {
        const monthlyInterestRate = Math.pow(1 + loan.interest_rate / 100, 1 / 12) - 1;
        const loanAmount = loan.amount;
        // Formula to calculate installment month
        const n =
            Math.log(monthlyRepaymentAmount / (monthlyRepaymentAmount - loanAmount * monthlyInterestRate)) /
            Math.log(1 + monthlyInterestRate);
        return Math.round(n * 100) / 100;
    };

    const calculateMonthlyInterest = (loan) => {
        const monthlyPaymentIncludingInterest = calculateMonthlyLoanRepaymentAmount(loan);
        const totalLoanAmount = loan.amount;
        const totalInstallmentMonth = loan.installment_month;
        const monthlyPaymentWithoutInterest = totalLoanAmount / totalInstallmentMonth;
        const monthlyInterest = monthlyPaymentIncludingInterest - monthlyPaymentWithoutInterest;
        return Math.round(monthlyInterest * 100) / 100;
    };

    const calculateSnowball = (loans, extraPayment) => {
        const snowballList = loans.map((loan) => ({
            name: loan.name,
            amount: loan.amount,
            total_amount: calculateTotalLoanPayment(loan),
            remaining_amount: calculateMonthlyLoanRepaymentAmount(loan) * loan.payment_remaining,
            installment_month: loan.installment_month,
            payment_remaining: loan.payment_remaining,
            interest_rate: loan.interest_rate,
            repayment_date: loan.repayment_date,
        }));

        const sortedList = snowballList.sort((a, b) => a.remaining_amount - b.remaining_amount);
        const snowballItems = [];
        let previousMonths = 0;
        sortedList.forEach((loan) => {
            const monthlyPayment = calculateMonthlyLoanRepaymentAmount(loan);
            const adjustedMonthlyPayment = monthlyPayment + parseFloat(extraPayment);
            let initialMonthsToPayOff = calculateInstallmentMonths(loan, monthlyPayment);
            const monthsToPayOff = calculateInstallmentMonths(loan, adjustedMonthlyPayment);
            const monthsToPayOffAfterPreviousItem = monthsToPayOff + previousMonths;
            const interestSavedInitial =
                initialMonthsToPayOff * monthlyPayment - monthsToPayOff * adjustedMonthlyPayment;
            const interestSavedinTotal =
                interestSavedInitial - (interestSavedInitial / monthsToPayOffAfterPreviousItem) * previousMonths;

            previousMonths = monthsToPayOff;
            const repaymentDate = new Date(loan.repayment_date);
            const monthsPaid = loan.installment_month - loan.payment_remaining;
            const startDate = new Date(repaymentDate);
            startDate.setMonth(startDate.getMonth() - monthsPaid);
            const payoffDate = new Date(startDate);
            payoffDate.setMonth(payoffDate.getMonth() + Math.floor(monthsToPayOffAfterPreviousItem));

            snowballItems.push({
                name: loan.name,
                loan_end_date: payoffDate,
                interest_saved: interestSavedinTotal,
            });
        });

        const dates = snowballItems.map((loan) => new Date(loan.loan_end_date));
        const earliestDate = new Date(Math.min(...dates));
        const latestDate = new Date(Math.max(...dates));
        const options = { month: 'long', year: 'numeric' };
        const earliestDateString = earliestDate.toLocaleString('en-US', options);
        const latestDateString = latestDate.toLocaleString('en-US', options);
        const totalInterestSaved = snowballItems.reduce((total, loan) => total + loan.interest_saved, 0);

        return {
            time_to_first_debt_paid_off: earliestDateString,
            time_to_all_debt_paid_off: latestDateString,
            interest_saved: Math.round(totalInterestSaved * 100) / 100,
        };
    };

    const calculateAvalanche = (loans, extraPayment) => {
        const avalancheList = loans.map((loan) => ({
            name: loan.name,
            amount: loan.amount,
            total_amount: calculateTotalLoanPayment(loan),
            remaining_amount: calculateMonthlyLoanRepaymentAmount(loan) * loan.payment_remaining,
            installment_month: loan.installment_month,
            payment_remaining: loan.payment_remaining,
            interest_rate: loan.interest_rate,
            repayment_date: loan.repayment_date,
        }));

        const sortedList = avalancheList.sort((a, b) => b.remaining_amount - a.remaining_amount);
        const avalancheItems = [];
        let previousMonths = 0;
        sortedList.forEach((loan) => {
            const monthlyPayment = calculateMonthlyLoanRepaymentAmount(loan);
            const adjustedMonthlyPayment = monthlyPayment + parseFloat(extraPayment);
            let initialMonthsToPayOff = calculateInstallmentMonths(loan, monthlyPayment);
            const monthsToPayOff = calculateInstallmentMonths(loan, adjustedMonthlyPayment);
            const interestSavedinTotal =
                initialMonthsToPayOff * monthlyPayment - monthsToPayOff * adjustedMonthlyPayment;
            previousMonths = monthsToPayOff;

            const repaymentDate = new Date(loan.repayment_date);
            const monthsPaid = loan.installment_month - loan.payment_remaining;
            const startDate = new Date(repaymentDate);
            startDate.setMonth(startDate.getMonth() - monthsPaid);
            const payoffDate = new Date(startDate);
            payoffDate.setMonth(payoffDate.getMonth() + Math.floor(monthsToPayOff));

            avalancheItems.push({
                name: loan.name,
                loan_end_date: payoffDate,
                interest_saved: interestSavedinTotal,
            });
        });

        const dates = avalancheItems.map((loan) => new Date(loan.loan_end_date));
        const earliestDate = new Date(Math.min(...dates));
        const latestDate = new Date(Math.max(...dates));
        const options = { month: 'long', year: 'numeric' };
        const earliestDateString = earliestDate.toLocaleString('en-US', options);
        const latestDateString = latestDate.toLocaleString('en-US', options);
        const totalInterestSaved = avalancheItems.reduce((total, loan) => total + loan.interest_saved, 0);

        return {
            time_to_first_debt_paid_off: earliestDateString,
            time_to_all_debt_paid_off: latestDateString,
            interest_saved: Math.round(totalInterestSaved * 100) / 100,
        };
    };

    const fetchData = async () => {
        const loans = await fetchAllLoans();
        setLoans(loans);

        const totalMonthlyLoanAmount = loans.reduce(
            (total, loan) => total + calculateMonthlyLoanRepaymentAmount(loan),
            0,
        );
        setTotalMonthlyLoanAmount(Math.round(totalMonthlyLoanAmount, 2));

        const totalDebt = loans.reduce((total, loan) => {
            const totalPayment = calculateTotalLoanPayment(loan);
            return total + totalPayment;
        }, 0);
        setTotalDebt(Math.round(totalDebt, 0));

        const totalBalance = loans.reduce((total, loan) => {
            const totalPayment = calculateTotalBalance(loan);
            return total + totalPayment;
        }, 0);
        setTotalBalance(Math.round(totalBalance, 0));
        setTotalPrinciple(Math.round(totalDebt - totalBalance, 0));

        const totalMonthlyPayment = totalMonthlyLoanAmount;
        setTotalMonthlyPayment(totalMonthlyPayment);

        const snowballItems = calculateSnowball(loans, extraPayment);
        const avalanchelItems = calculateAvalanche(loans, extraPayment);

        const updatedPaymentStrategyChoice = [
            {
                userId: userId,
                title: 'Debt Snowball',
                content1: 'Prioritize lowest balance first',
                content2: 'The most quick wins',
                content3: `Time to first debt paid off: ${snowballItems['time_to_first_debt_paid_off']}`,
                content4: `Time to all debt paid off: ${snowballItems['time_to_all_debt_paid_off']}`,
                content5: `Interest saved: RM ${snowballItems['interest_saved']}`,
                index: 1,
            },
            {
                userId: userId,
                title: 'Debt Avalanche',
                content1: 'Prioritize lowest balance first',
                content2: 'The most quick wins',
                content3: `Time to first debt paid off: ${avalanchelItems['time_to_first_debt_paid_off']}`,
                content4: `Time to all debt paid off: ${avalanchelItems['time_to_all_debt_paid_off']}`,
                content5: `Interest saved: RM ${avalanchelItems['interest_saved']}`,
                index: 2,
            },
        ];

        const user = await fetchUserDetails();
        setUser(user);

        setPaymentStrategyChoice(updatedPaymentStrategyChoice);
    };

    useEffect(() => {
        console.log('DebtMain component mounted');
        fetchData();
    }, []);

    const handleWidgetPress = () => {
        fetchHomeScreenData();
        fetchData();
    };

    const DebtMainPage = () => {
        navigation.navigate('DebtMain');
    };
    const PreviousPage = () => {
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* <AppBar
                    title="Strategy"
                    navigation={PreviousPage}
                /> */}
                <Text style={styles.titleStyle}>Select a payment priority</Text>
                {paymentStrategyChoice.map(
                    ({ userId, title, content1, content2, content3, content4, content5, index }) => {
                        return (
                            <PaymentStrategyContainer
                                userId={userId}
                                navigation={navigation}
                                title={title}
                                content1={content1}
                                content2={content2}
                                content3={content3}
                                content4={content4}
                                content5={content5}
                                index={index}
                                key={index}
                                extraPayment={extraPayment}
                                fetchData={handleWidgetPress}
                            />
                        );
                    },
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

export default DebtRepaymentPlanChoice;
