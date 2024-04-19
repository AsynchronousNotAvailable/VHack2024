import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { sw, sh, logo } from '../../../styles/GlobalStyles';
import AppBar from '../Utils/AppBar';
import PlusButton from '../Utils/RenderSummaryPlusButton';
import RenderWidget1 from '../Utils/RenderSummaryWidget1';
import RenderWidget2 from '../Utils/RenderSummaryWidget2';
import { mockData1, mockData2 } from '../MockData/mockData';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import { GlobalContext } from '../../../context';
import { Url } from '../../../url';

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    topContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: sh(10),
        borderBottomColor: '#E5E5E5',
        borderBottomWidth: sw(1),
    },
    subtitleContainer: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: sw(20),
        marginTop: sh(16),
        marginBottom: sh(8),
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: 'black',
        // borderWidth: 1,
    },
    color: {
        width: sw(20),
        height: sh(20),
        borderRadius: sw(10),
    },
    text: {
        fontSize: sw(20),
        fontWeight: '500',
        color: 'black',
    },
    chevronLeftStyle: {
        position: 'absolute',
        top: sh(10),
        left: sw(20),
        aspectRatio: 1,
        width: sw(30),
    },
});

const mockData_1 = mockData1;
const mockData_2 = mockData2;

const tinycolor = require('tinycolor2');
const generateRandomColors = (length) => {
    const randomColors = [];

    for (let i = 0; i < length; i++) {
        const randomColor = tinycolor.random().toHexString();
        randomColors.push(randomColor);
    }

    return randomColors;
};

const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
};

function DebtSummary({ navigation }) {
    const { userId } = useContext(GlobalContext);
    const [bills, setBills] = useState([]);
    const [loans, setLoans] = useState([]);
    const [totalMonthlyLoanAmount, setTotalMonthlyLoanAmount] = useState(0);
    const [totalOverdueAmount, setTotalOverdueAmount] = useState(0);
    const [totalDebt, setTotalDebt] = useState(0);
    const [totalPrinciple, setTotalPrinciple] = useState(0);
    const [totalBalance, setTotalBalance] = useState(0);
    const [loanLists, setLoanLists] = useState([]);
    const [billLists, setBillLists] = useState([]);

    const fetchAllBills = async () => {
        try {
            const response = await axios.get(`http://${Url}:3000/bills/${userId}`);
            // console.log(response.data);
            const bills = response.data;
            const transformedBills = bills.map((bill) => ({
                id: bill.id,
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
                id: loan.id,
                name: loan.name,
                end_date: loan.end_date,
                amount: loan.loan_amount,
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
        return Math.round(monthlyRepaymentAmount * 100) / 100;
    };

    const calculateTotalLoanPayment = (loan) => {
        const installment_month = loan.installment_month;
        const monthlyRepaymentAmount = calculateMonthlyLoanRepaymentAmount(loan);
        const totalPayment = monthlyRepaymentAmount * installment_month;
        return Math.round(totalPayment, 2);
    };

    const calculateTotalBalance = (loan) => {
        const remaining_month = loan.payment_remaining;
        const monthlyRepaymentAmount = calculateMonthlyLoanRepaymentAmount(loan);
        const totalBalance = monthlyRepaymentAmount * remaining_month;
        return Math.round(totalBalance, 2);
    };

    const calculateTotalPaidValue = (loan) => {
        const installment_month = loan.installment_month;
        const remaining_month = loan.payment_remaining;
        const paid_month = installment_month - remaining_month;
        const monthlyRepaymentAmount = calculateMonthlyLoanRepaymentAmount(loan);
        const totalPaidValue = Math.round(monthlyRepaymentAmount * paid_month, 2);
        return totalPaidValue;
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

    const fetchData = async () => {
        const bills = await fetchAllBills();
        const loans = await fetchAllLoans();
        setBills(bills);
        setLoans(loans);

        const totalMonthlyLoanAmount = loans.reduce(
            (total, loan) => total + calculateMonthlyLoanRepaymentAmount(loan),
            0,
        );
        setTotalMonthlyLoanAmount(totalMonthlyLoanAmount);

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

        let loanIndex = 1;
        const updatedLoanLists = loans.map((loan) => {
            return {
                image: logo.loan_logo,
                backgroundColor: '#FDD5D7',
                itemName: loan.name,
                expiryDate: formatDate(new Date(loan.end_date)),
                currentLoan: calculateTotalBalance(loan),
                totalLoan: calculateTotalLoanPayment(loan),
                index: loanIndex++,
            };
        });
        setLoanLists(updatedLoanLists);

        let billIndex = 1;
        const mergedBillList = [
            ...loans.map((loan) => ({
                userId: userId,
                itemId: loan.id,
                image: logo.loan_logo,
                backgroundColor: '#FDD5D7',
                itemName: loan.name,
                displayDate: formatDate(new Date(loan.repayment_date)),
                paymentDate: loan.repayment_date,
                paymentRemaining: loan.payment_remaining,
                upcomingBills: calculateMonthlyLoanRepaymentAmount(loan),
                index: billIndex++,
            })),
            ...bills.map((bill) => ({
                userId: userId,
                itemId: bill.id,
                image: logo.bill_logo,
                backgroundColor: '#BDDCFF',
                itemName: bill.name,
                displayDate: formatDate(new Date(bill.repayment_date)),
                paymentDate: bill.repayment_date,
                paymentRemaining: 0,
                upcomingBills: Math.round(bill.amount * 100) / 100,
                index: billIndex++,
            })),
        ];

        setBillLists(mergedBillList);
    };

    useEffect(() => {
        fetchData();
        console.log('DebtMain component mounted');
    }, []);

    const handleWidgetPress = () => {
        fetchData();
    };

    const sortedLoanLists = [...loanLists].sort((a, b) => {
        const dateA = new Date(a.expiryDate.split('/').reverse().join('-'));
        const dateB = new Date(b.expiryDate.split('/').reverse().join('-'));
        return dateA - dateB;
    });

    const sortedBillLists = [...billLists].sort((a, b) => {
        const dateA = new Date(a.paymentDate.split('/').reverse().join('-'));
        const dateB = new Date(b.paymentDate.split('/').reverse().join('-'));
        return dateA - dateB;
    });

    const DebtAddExistingLoanPage = () => {
        navigation.navigate('DebtAddExistingLoan', {
            mockData1: loanLists,
            setMockData1: setLoanLists,
        });
    };
    const DebtAddUpcomingBillPage = () => {
        navigation.navigate('DebtAddUpcomingBill', {
            mockData2: billLists,
            setMockData2: setBillLists,
        });
    };
    const PreviousPage = () => {
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ marginHorizontal: sw(10) }}
            >
                {/* <AppBar
                    title="Debt Summary"
                    navigation={PreviousPage}
                /> */}
                <View style={styles.subtitleContainer}>
                    <Text style={styles.text}>Current Loans</Text>
                    <PlusButton navigation={DebtAddExistingLoanPage} />
                </View>
                {sortedLoanLists.map(
                    ({ image, backgroundColor, itemName, expiryDate, currentLoan, totalLoan, index }) => {
                        return (
                            <RenderWidget1
                                image={image}
                                backgroundColor={backgroundColor}
                                itemName={itemName}
                                expiryDate={expiryDate}
                                currentLoan={currentLoan}
                                totalLoan={totalLoan}
                                index={index}
                                key={index}
                            />
                        );
                    },
                )}
                <View style={styles.subtitleContainer}>
                    <Text style={styles.text}>Upcoming Bills</Text>
                    <PlusButton navigation={DebtAddUpcomingBillPage} />
                </View>
                {sortedBillLists.map(
                    ({
                        userId,
                        itemId,
                        image,
                        backgroundColor,
                        itemName,
                        displayDate,
                        paymentDate,
                        paymentRemaining,
                        upcomingBills,
                        index,
                    }) => {
                        return (
                            <RenderWidget2
                                userId={userId}
                                itemId={itemId}
                                image={image}
                                backgroundColor={backgroundColor}
                                itemName={itemName}
                                displayDate={displayDate}
                                paymentDate={paymentDate}
                                paymentRemaining={paymentRemaining}
                                upcomingBills={upcomingBills}
                                index={index}
                                key={index}
                                fetchData={handleWidgetPress}
                            />
                        );
                    },
                )}
                <View style={{ height: sh(16) }}></View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default DebtSummary;
