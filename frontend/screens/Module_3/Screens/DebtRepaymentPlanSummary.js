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
import { TextInput as TextInputPaper } from 'react-native-paper';
import { fonts, sw, sh, logo } from '../../../styles/GlobalStyles';
import AppBar from '../Utils/AppBar';
import RenderRepaymentPlanSummaryItem from '../Utils/RenderRepaymentPlanSummaryItem';
import DebtRepaymentPlanSummaryImage from '../Utils/DebtRepaymentPlanSummaryImage';
import RenderStepByStepRepaymentPlanWidget from '../Utils/RenderStepByStepRepaymentPlanWidget';
import { mockData3 } from '../MockData/mockData';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import { GlobalContext } from '../../../context';
import { Url } from '../../../url';

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    titleStyle: {
        fontSize: sw(18),
        fontFamily: fonts.interSemiBold,
        marginVertical: sh(20),
        marginHorizontal: sw(20),
    },
    repaymentPlanContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '90%',
        height: sh(250),
        marginHorizontal: sw(20),
        marginVertical: sh(10),
        backgroundColor: '#F6F7FA',
        borderRadius: sw(10),
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.05,
    },
    repaymentPlanSelectStrategyContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        height: sh(100),
        marginHorizontal: sw(20),
        marginVertical: sh(10),
        backgroundColor: '#F6F7FA',
        borderRadius: sw(10),
    },
    repaymentPlanContainerSelectStrategyTitle: {
        fontSize: sw(15),
        fontFamily: fonts.interRegular,
        fontWeight: 'bold',
        color: '#8C949A',
        margin: sw(20),
    },
    repaymentPlanContainerTitle: {
        fontSize: sw(16),
        fontFamily: fonts.interMedium,
        fontWeight: 'bold',
        color: 'black',
        margin: sw(16),
    },
    inputPaperContainer: {
        flex: 1,
        marginHorizontal: sw(20),
    },
    inputPaper: {
        width: '100%',
        backgroundColor: 'rgba(110, 113, 124, 0.05)',
        fontFamily: fonts.interRegular,
        borderRadius: 10,
        paddingVertical: sh(4),
        marginBottom: sh(4),
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
    },
});

function DebtRepaymentPlanSummary({ navigation }) {
    const [extraPayment, setExtraPayment] = useState(0);

    const { userId } = useContext(GlobalContext);
    const [bills, setBills] = useState([]);
    const [loans, setLoans] = useState([]);
    const [user, setUser] = useState([]);
    const [planSummaryComponents, setPlanSummaryComponents] = useState([]);
    const [stepByStepPlan, setStepByStepPlan] = useState([]);

    const fetchUserDetails = async () => {
        try {
            const response = await axios.get(`http://${Url}:3000/users/${userId}`);
            // console.log(response.data);
            const user = response.data;
            const { strategy, debt_free_date, extra_payment } = user;
            const extractedData = { strategy, debt_free_date, extra_payment };
            return extractedData;
        } catch (error) {
            console.error('Error fetching bills:', error);
        }
    };

    const fetchAllBills = async () => {
        try {
            const response = await axios.get(`http://${Url}:3000/bills/${userId}`);
            // console.log(response.data);
            const bills = response.data;
            const transformedBills = bills.map((bill) => ({
                name: bill.name,
                amount: bill.amount,
                repeating_option: bill.repeating_option,
                bill_status: bill.bill_status,
                repayment_date: bill.repayment_date,
            }));
            return transformedBills;
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
                end_date: loan.end_date,
                installment_month: loan.installment_month,
                payment_remaining: loan.payment_remaining,
                interest_rate: loan.interest_rate,
                loan_status: loan.loan_status,
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

    const calculateMonthlyLoanRepaymentAmount = (loan) => {
        const monthlyInterestRate = Math.pow(1 + loan.interest_rate / 100, 1 / 12) - 1;
        const installment_month = loan.installment_month;
        const amount = loan.amount;
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

    const calculateTotalMonthlyBills = (bill) => {
        const bill_name = bill.name;
        const bill_amount = bill.amount;
        const bill_repeating_option = bill.repeating_option;

        // Depends on the options available
        if (bill_repeating_option == 'MONTHLY') {
            return bill_amount;
        } else if (bill_repeating_option == 'YEARLY') {
            return bill_amount / 12;
        } else if (bill_repeating_option == 'DAILY') {
            return bill_amount * 30;
        }
    };

    const calculatePayoffComponent = (loans, label, useMax = true) => {
        const list = loans.map((loan) => new Date(loan[label]));
        const date = new Date(useMax ? Math.max(...list) : Math.min(...list));
        const currentDate = new Date();
        const timeDifference = date.getTime() - currentDate.getTime();
        const years = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365));
        const months = Math.floor((timeDifference % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
        let displayString;
        if (years < 1 && months < 1) {
            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            displayString = `${days} days`;
        } else {
            displayString = `${years} yr ${months} mo`;
        }
        return displayString;
    };

    const calculateMonthlyInterest = (loan) => {
        const monthlyPaymentIncludingInterest = calculateMonthlyLoanRepaymentAmount(loan);
        const totalLoanAmount = loan.amount;
        const totalInstallmentMonth = loan.installment_month;
        const monthlyPaymentWithoutInterest = totalLoanAmount / totalInstallmentMonth;
        const monthlyInterest = monthlyPaymentIncludingInterest - monthlyPaymentWithoutInterest;
        return Math.round(monthlyInterest * 100) / 100;
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

    const calculateInterestComponent = (loans) => {
        const currentDate = new Date();
        const next30DaysDate = new Date(currentDate);
        next30DaysDate.setDate(next30DaysDate.getDate() + 30);

        let totalInterestNext30Days = 0;
        let totalInterestRemainingMonths = 0;

        loans.forEach((loan) => {
            const repaymentDate = new Date(loan.repayment_date);
            const daysDifference = Math.ceil((repaymentDate - currentDate) / (1000 * 60 * 60 * 24));

            if (daysDifference <= 30) {
                totalInterestNext30Days += loan.monthly_interest_amount;
            }
            totalInterestRemainingMonths += loan.monthly_interest_amount * loan.monthly_payment_remaining;
        });

        return {
            totalInterestNext30Days: Math.round(totalInterestNext30Days * 100) / 100,
            totalInterestRemainingMonths: Math.round(totalInterestRemainingMonths * 100) / 100,
        };
    };

    const calculatePaymentComponent = (mergedPaymentList) => {
        const currentDate = new Date();
        const next30DaysDate = new Date(currentDate);
        next30DaysDate.setDate(next30DaysDate.getDate() + 30);

        let totalPaymentsNext30Days = 0;
        let totalPaymentsRemaining = 0;

        mergedPaymentList.forEach((item) => {
            const repaymentDate = new Date(item.repayment_date);
            const daysDifference = Math.ceil((repaymentDate - currentDate) / (1000 * 60 * 60 * 24));

            if (daysDifference <= 30) {
                totalPaymentsNext30Days += item.payment;
            }
            totalPaymentsRemaining += item.payment * item.payment_remaining;
        });

        return {
            totalPaymentsNext30Days: Math.round(totalPaymentsNext30Days * 100) / 100,
            totalPaymentsRemaining: Math.round(totalPaymentsRemaining * 100) / 100,
        };
    };

    const calculateNormalStrategy = (loans, bills) => {
        displayEndDateString = calculatePayoffComponent(loans, 'end_date', (useMax = true));
        displayRepaymentString = calculatePayoffComponent(loans, 'repayment_date', (useMax = false));

        const loanInterestLists = loans.map((loan) => ({
            name: loan.name,
            monthly_interest_amount: calculateMonthlyInterest(loan),
            monthly_payment_remaining: loan.payment_remaining,
            repayment_date: loan.repayment_date,
        }));

        const interestComponents = calculateInterestComponent(loanInterestLists);

        const mergedPaymentList = [
            ...loans.map((loan) => ({
                name: loan.name,
                repayment_date: loan.repayment_date,
                payment_remaining: loan.payment_remaining,
                payment: calculateMonthlyLoanRepaymentAmount(loan),
            })),
            ...bills.map((bill) => ({
                name: bill.name,
                repayment_date: bill.repayment_date,
                payment: bill.amount,
                payment_remaining: 1,
            })),
        ];

        const paymentComponents = calculatePaymentComponent(mergedPaymentList);

        const updatedNormalPlanSummaryComponents = [
            {
                image: logo.repayment_plan_summary_logo_1,
                itemName: 'Payoff',
                firstTitle: 'Next debt',
                firstContent: displayRepaymentString,
                secondTitle: 'All debts',
                secondContent: displayEndDateString,
                index: 1,
            },
            {
                image: logo.repayment_plan_summary_logo_2,
                itemName: 'Interest',
                firstTitle: 'Next 30 days',
                firstContent: `RM ${interestComponents['totalInterestNext30Days'].toFixed(2)}`,
                secondTitle: 'Total',
                secondContent: `RM ${interestComponents['totalInterestRemainingMonths'].toFixed(2)}`,
                index: 2,
            },
            {
                image: logo.repayment_plan_summary_logo_3,
                itemName: 'Payments',
                firstTitle: 'Next 30 days',
                firstContent: `RM ${paymentComponents['totalPaymentsNext30Days'].toFixed(2)}`,
                secondTitle: 'Total',
                secondContent: `RM ${paymentComponents['totalPaymentsRemaining'].toFixed(2)}`,
                index: 3,
            },
        ];

        return updatedNormalPlanSummaryComponents;
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
        const currentDate = new Date();

        const calculateDateDifference = (date, currentDate) => {
            const timeDifference = date.getTime() - currentDate.getTime();
            const years = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365));
            const months = Math.floor((timeDifference % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
            let dateString;
            if (years < 1 && months < 1) {
                const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
                dateString = `${days} days`;
            } else {
                dateString = `${years} yr ${months} mo`;
            }
            return dateString;
        };

        const earliestDateString = calculateDateDifference(earliestDate, currentDate);
        const latestDateString = calculateDateDifference(latestDate, currentDate);
        const millisecondsDifference = latestDate.getTime() - currentDate.getTime();
        const monthDifference = millisecondsDifference / (1000 * 60 * 60 * 24 * 30);
        const totalInterestSaved = snowballItems.reduce((total, loan) => total + loan.interest_saved, 0);

        return {
            stepByStepItems: snowballItems,
            time_to_first_debt_paid_off: earliestDateString,
            time_to_all_debt_paid_off: latestDateString,
            month_difference: Math.floor(monthDifference),
            interest_saved: Math.round(totalInterestSaved * 100) / 100,
        };
    };

    const calculateSnowballStrategy = (loans, bills, extraPayment) => {
        let extraPayment_final = 0;
        if (extraPayment == null) {
            extraPayment_final = 0;
        } else {
            extraPayment_final = extraPayment;
        }
        const snowballItems = calculateSnowball(loans, extraPayment_final);
        const displayRepaymentString = calculatePayoffComponent(loans, 'repayment_date', (useMax = false));
        const displayEndDateString = snowballItems['time_to_all_debt_paid_off'];

        const interest_saved_per_month =
            Math.round((snowballItems['interest_saved'] / snowballItems['month_difference']) * 100) / 100;
        const loanInterestLists = loans.map((loan) => ({
            name: loan.name,
            monthly_interest_amount: calculateMonthlyInterest(loan),
            monthly_payment_remaining: loan.payment_remaining,
            repayment_date: loan.repayment_date,
        }));

        const interestComponents = calculateInterestComponent(loanInterestLists);
        const interest_next_30_days =
            Math.round((interestComponents['totalInterestNext30Days'] - interest_saved_per_month) * 100) / 100;
        const interest_total =
            Math.round((interestComponents['totalInterestRemainingMonths'] - snowballItems['interest_saved']) * 100) /
            100;

        const mergedPaymentList = [
            ...loans.map((loan) => ({
                name: loan.name,
                repayment_date: loan.repayment_date,
                payment_remaining: loan.payment_remaining,
                payment: calculateMonthlyLoanRepaymentAmount(loan),
            })),
            ...bills.map((bill) => ({
                name: bill.name,
                repayment_date: bill.repayment_date,
                payment: bill.amount,
                payment_remaining: 1,
            })),
        ];
        const paymentComponents = calculatePaymentComponent(mergedPaymentList);
        const payment_next_30_days =
            Math.round((paymentComponents['totalPaymentsNext30Days'] - interest_saved_per_month) * 100) / 100;
        const payment_total =
            Math.round((paymentComponents['totalPaymentsRemaining'] - snowballItems['interest_saved']) * 100) / 100;

        const updatedNormalPlanSummaryComponents = [
            {
                image: logo.repayment_plan_summary_logo_1,
                itemName: 'Payoff',
                firstTitle: 'Next debt',
                firstContent: displayRepaymentString,
                secondTitle: 'All debts',
                secondContent: displayEndDateString,
                index: 1,
            },
            {
                image: logo.repayment_plan_summary_logo_2,
                itemName: 'Interest',
                firstTitle: 'Next 30 days',
                firstContent: `RM ${interest_next_30_days}`,
                secondTitle: 'Total',
                secondContent: `RM ${interest_total}`,
                index: 2,
            },
            {
                image: logo.repayment_plan_summary_logo_3,
                itemName: 'Payments',
                firstTitle: 'Next 30 days',
                firstContent: `RM ${payment_next_30_days}`,
                secondTitle: 'Total',
                secondContent: `RM ${payment_total}`,
                index: 3,
            },
        ];

        return updatedNormalPlanSummaryComponents;
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
        const currentDate = new Date();

        const calculateDateDifference = (date, currentDate) => {
            const timeDifference = date.getTime() - currentDate.getTime();
            const years = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365));
            const months = Math.floor((timeDifference % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
            let dateString;
            if (years < 1 && months < 1) {
                const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
                dateString = `${days} days`;
            } else {
                dateString = `${years} yr ${months} mo`;
            }
            return dateString;
        };

        const earliestDateString = calculateDateDifference(earliestDate, currentDate);
        const latestDateString = calculateDateDifference(latestDate, currentDate);
        const millisecondsDifference = latestDate.getTime() - currentDate.getTime();
        const monthDifference = millisecondsDifference / (1000 * 60 * 60 * 24 * 30);
        const totalInterestSaved = avalancheItems.reduce((total, loan) => total + loan.interest_saved, 0);

        return {
            stepByStepItems: avalancheItems,
            time_to_first_debt_paid_off: earliestDateString,
            time_to_all_debt_paid_off: latestDateString,
            month_difference: Math.floor(monthDifference),
            interest_saved: Math.round(totalInterestSaved * 100) / 100,
        };
    };

    const calculateAvalancheStrategy = (loans, bills, extraPayment) => {
        let extraPayment_final = 0;
        if (extraPayment == null) {
            extraPayment_final = 0;
        } else {
            extraPayment_final = extraPayment;
        }

        const avalancheItems = calculateAvalanche(loans, extraPayment_final);
        const displayRepaymentString = calculatePayoffComponent(loans, 'repayment_date', (useMax = false));
        const displayEndDateString = avalancheItems['time_to_all_debt_paid_off'];

        const interest_saved_per_month =
            Math.round((avalancheItems['interest_saved'] / avalancheItems['month_difference']) * 100) / 100;
        const loanInterestLists = loans.map((loan) => ({
            name: loan.name,
            monthly_interest_amount: calculateMonthlyInterest(loan),
            monthly_payment_remaining: loan.payment_remaining,
            repayment_date: loan.repayment_date,
        }));

        const interestComponents = calculateInterestComponent(loanInterestLists);
        const interest_next_30_days =
            Math.round((interestComponents['totalInterestNext30Days'] - interest_saved_per_month) * 100) / 100;
        const interest_total =
            Math.round((interestComponents['totalInterestRemainingMonths'] - avalancheItems['interest_saved']) * 100) /
            100;

        const mergedPaymentList = [
            ...loans.map((loan) => ({
                name: loan.name,
                repayment_date: loan.repayment_date,
                payment_remaining: loan.payment_remaining,
                payment: calculateMonthlyLoanRepaymentAmount(loan),
            })),
            ...bills.map((bill) => ({
                name: bill.name,
                repayment_date: bill.repayment_date,
                payment: bill.amount,
                payment_remaining: 1,
            })),
        ];
        const paymentComponents = calculatePaymentComponent(mergedPaymentList);
        const payment_next_30_days =
            Math.round((paymentComponents['totalPaymentsNext30Days'] - interest_saved_per_month) * 100) / 100;
        const payment_total =
            Math.round((paymentComponents['totalPaymentsRemaining'] - avalancheItems['interest_saved']) * 100) / 100;

        const updatedNormalPlanSummaryComponents = [
            {
                image: logo.repayment_plan_summary_logo_1,
                itemName: 'Payoff',
                firstTitle: 'Next debt',
                firstContent: displayRepaymentString,
                secondTitle: 'All debts',
                secondContent: displayEndDateString,
                index: 1,
            },
            {
                image: logo.repayment_plan_summary_logo_2,
                itemName: 'Interest',
                firstTitle: 'Next 30 days',
                firstContent: `RM ${interest_next_30_days}`,
                secondTitle: 'Total',
                secondContent: `RM ${interest_total}`,
                index: 2,
            },
            {
                image: logo.repayment_plan_summary_logo_3,
                itemName: 'Payments',
                firstTitle: 'Next 30 days',
                firstContent: `RM ${payment_next_30_days}`,
                secondTitle: 'Total',
                secondContent: `RM ${payment_total}`,
                index: 3,
            },
        ];

        return updatedNormalPlanSummaryComponents;
    };

    const prepareStepByStepPlan = (items) => {
        const formatDate = (dateString) => {
            const date = new Date(dateString);
            const options = { month: 'long', day: 'numeric', year: 'numeric' };
            return date.toLocaleDateString('en-US', options);
        };
        const currentDate = new Date();
        let stepByStepPlan = [];
        let index = 0;
        items.forEach((loan) => {
            const loanEndDate = new Date(loan.loan_end_date);
            const monthsDifference =
                (loanEndDate.getFullYear() - currentDate.getFullYear()) * 12 +
                (loanEndDate.getMonth() - currentDate.getMonth());
            const formattedLoanEndDate = formatDate(loanEndDate);
            stepByStepPlan.push({
                name: loan.name,
                endDate: loanEndDate,
                formattedEndDate: formattedLoanEndDate,
                monthDifference: monthsDifference,
                index: index,
            });
            index++;
        });

        stepByStepPlan.sort((a, b) => {
            return a.endDate - b.endDate;
        });

        // Reassign index property based on the sorted sequence
        stepByStepPlan.forEach((item, i) => {
            item.index = i;
        });

        return stepByStepPlan;
    };

    const fetchData = async () => {
        const bills = await fetchAllBills();
        const loans = await fetchAllLoans();
        setBills(bills);
        setLoans(loans);

        const payoffSummaryList = loans.map((loan) => ({
            name: loan.name,
            amount: loan.amount,
            end_date: loan.end_date,
            installment_month: loan.installment_month,
            payment_remaining: loan.payment_remaining,
            interest_rate: loan.interest_rate,
            loan_status: loan.loan_status,
            repayment_date: loan.repayment_date,
        }));

        const user = await fetchUserDetails();
        setUser(user);
        console.log(user);

        if (user.strategy == 'SNOWBALL' && user.extra_payment != null) {
            const snowballItems = calculateSnowball(loans, user.extra_payment);
            const updatedStepByStepPlan = prepareStepByStepPlan(snowballItems['stepByStepItems']);
            const updatedNormalPlanSummaryComponents = calculateSnowballStrategy(loans, bills, user.extra_payment);
            setStepByStepPlan(updatedStepByStepPlan);
            setPlanSummaryComponents(updatedNormalPlanSummaryComponents);
        } else if (user.strategy == 'AVALANCHE' && user.extra_payment != null) {
            const avalancheItems = calculateAvalanche(loans, user.extra_payment);
            const updatedStepByStepPlan = prepareStepByStepPlan(avalancheItems['stepByStepItems']);
            const updatedNormalPlanSummaryComponents = calculateAvalancheStrategy(loans, bills, user.extra_payment);
            console.log(updatedStepByStepPlan);
            setStepByStepPlan(updatedStepByStepPlan);
            setPlanSummaryComponents(updatedNormalPlanSummaryComponents);
        } else {
            const updatedNormalPlanSummaryComponents = calculateNormalStrategy(loans, bills);
            setPlanSummaryComponents(updatedNormalPlanSummaryComponents);
        }
    };

    useEffect(() => {
        console.log('DebtMain component mounted');
        fetchData();
    }, []);

    const handleWidgetPress = () => {
        fetchData();
    };

    const DebtRepaymentPlanChoicePage = () => {
        navigation.navigate('DebtRepaymentPlanChoice', {
            extraPayment: extraPayment,
            fetchHomeScreenData: handleWidgetPress,
        });
    };
    const PreviousPage = () => {
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* <AppBar
                    title="Repayment Plan"
                    navigation={PreviousPage}
                /> */}
                <Text style={styles.titleStyle}>Extra Monthly Payment</Text>
                <View style={styles.inputPaperContainer}>
                    <TextInputPaper
                        style={styles.inputPaper}
                        placeholder="RM"
                        label="Extra Payment"
                        mode="outlined"
                        keyboardType="numeric"
                        returnKeyType="next"
                        autoCapitalize="none"
                        onChangeText={(extraPayment) => {
                            setExtraPayment(extraPayment);
                        }}
                    />
                </View>

                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: sh(20),

                        zIndex: 99,
                    }}
                    onPress={DebtRepaymentPlanChoicePage}
                >
                    <DebtRepaymentPlanSummaryImage />
                </TouchableOpacity>
                <Text style={styles.titleStyle}>Plan summary</Text>
                {planSummaryComponents.map(
                    ({ image, itemName, firstTitle, firstContent, secondTitle, secondContent, index }) => {
                        return (
                            <RenderRepaymentPlanSummaryItem
                                image={image}
                                itemName={itemName}
                                firstTitle={firstTitle}
                                firstContent={firstContent}
                                secondTitle={secondTitle}
                                secondContent={secondContent}
                                index={index}
                                key={index}
                            />
                        );
                    },
                )}
                <Text style={[styles.titleStyle, { marginTop: sh(40) }]}>Step-by-Step Repayment Plan</Text>
                {user.strategy === 'SNOWBALL' ? (
                    <React.Fragment>
                        {stepByStepPlan.map(({ name, endDate, formattedEndDate, monthDifference, index }) => (
                            <RenderStepByStepRepaymentPlanWidget
                                loanName={name}
                                payment_month_remaining={monthDifference}
                                payment_end_date={formattedEndDate}
                                index={index}
                            />
                        ))}
                    </React.Fragment>
                ) : user.strategy === 'AVALANCHE' ? (
                    <React.Fragment>
                        {stepByStepPlan.map(({ name, endDate, formattedEndDate, monthDifference, index }) => (
                            <RenderStepByStepRepaymentPlanWidget
                                loanName={name}
                                payment_month_remaining={monthDifference}
                                payment_end_date={formattedEndDate}
                                index={index}
                            />
                        ))}
                    </React.Fragment>
                ) : (
                    <View style={styles.repaymentPlanSelectStrategyContainer}>
                        <Text style={styles.repaymentPlanContainerSelectStrategyTitle}>
                            - Please select a strategy -
                        </Text>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

export default DebtRepaymentPlanSummary;
