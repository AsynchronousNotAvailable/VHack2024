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
import { mockData3 } from '../MockData/mockData';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import { GlobalContext } from '../../../context';

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
    const [planSummaryComponents, setPlanSummaryComponents] = useState([]);

    const fetchAllBills = async () => {
        try {
            const response = await axios.get(`http://192.168.100.14:3000/bills/${userId}`);
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
            const response = await axios.get(`http://192.168.100.14:3000/loans/${userId}`);
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

    const fetchData = async () => {
        const bills = await fetchAllBills();
        const loans = await fetchAllLoans();
        setBills(bills);
        setLoans(loans);

        const payoffSummaryList = loans.map((loan) => ({
            name: loan.name,
            amount: loan.loan_amount,
            end_date: loan.end_date,
            installment_month: loan.installment_month,
            payment_remaining: loan.payment_remaining,
            interest_rate: loan.interest_rate,
            loan_status: loan.loan_status,
            repayment_date: loan.repayment_date,
        }));

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

        const updatedPlanSummaryComponents = [
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

        setPlanSummaryComponents(updatedPlanSummaryComponents);
    };

    useEffect(() => {
        console.log('DebtMain component mounted');
        fetchData();
    }, []);

    const DebtRepaymentPlanChoicePage = () => {
        navigation.navigate('DebtRepaymentPlanChoice');
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
                        keyboardType="default"
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
                <View style={styles.repaymentPlanContainer}>
                    <Text style={styles.repaymentPlanContainerTitle}>House Loan</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default DebtRepaymentPlanSummary;
