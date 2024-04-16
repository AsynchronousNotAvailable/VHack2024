import React, { useContext, useEffect, useState } from 'react';
import DonutChartContainer from '../Utils/DonutChartContainer';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { sw, sh, colors, fonts } from '../../../styles/GlobalStyles';
import Animated from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import DebtMainBottomImage from '../Utils/DebtMainBottomImage';
import * as Progress from 'react-native-progress';
import axios from 'axios';
import { GlobalContext } from '../../../context';
import { Url } from '../../../url';
// Can be passed into DonutChartContainer if we wanna make it dynamic
// const chart_data = {
//     labels: ['Netflix', 'Unifi', 'Electric', 'Car', 'House'],
//     data: [206.4, 361.19, 412.79, 644.99, 1212.58],
//     backgroundColor: ['#E5D8FF', '#FFF0D4', '#FDCED0', '#CAFDEA', '#BCDAFC'],
// };

const styles = StyleSheet.create({
    container: {
        alignContent: 'center',
    },
    twoBoxesContainer: {
        marginTop: sh(10),
        flex: 1,
        flexDirection: 'row',

        justifyContent: 'space-between',
    },
    boxContainer: {
        flex: 1,
        flexDirection: 'column',
        borderColor: '#82B5B2',
        borderWidth: sw(2),
        borderRadius: sw(10),
        backgroundColor: 'transparent',
        padding: sw(10),
        margin: sw(10),
    },
    boxContainer2: {
        flex: 1,
        flexDirection: 'column',
        borderColor: '#F27F71',
        borderWidth: sw(2),
        borderRadius: sw(10),
        backgroundColor: 'transparent',
        padding: sw(10),
        margin: sw(10),
    },
    monthlyLoansTitleText: {
        color: '#82B5B2',
        fontSize: sw(15),
        fontWeight: 'bold',
        margin: sw(5),
    },
    monthlyLoansText: {
        color: '#82B5B2',
        fontSize: sw(20),
        fontWeight: 'bold',
        margin: sw(5),
    },
    overdueTitleText: {
        color: '#F27F71',
        fontSize: sw(15),
        fontWeight: 'bold',
        margin: sw(5),
    },
    overdueText: {
        color: '#F27F71',
        fontSize: sw(20),
        fontWeight: 'bold',
        margin: sw(5),
    },
    totalDebtAndSeeAllButton: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: sw(10),
        marginVertical: sh(5),
    },
    seeAllButton: {
        borderColor: '#E1E3E8',
        borderWidth: sw(2),
        borderRadius: sw(20),
        backgroundColor: 'transparent',
        paddingHorizontal: sw(10),
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: sw(10),
    },
    totalDebtAmount: {
        fontSize: sw(30),
        fontWeight: 'bold',
        paddingHorizontal: sw(10),
        marginHorizontal: sw(10),
    },
    balanceProgressBar: {
        height: sh(20),
        flexDirection: 'row',
        width: '90%',
        backgroundColor: '#FCA59A',
        borderColor: 'transparent',
        borderWidth: 2,
        borderRadius: 10,
        marginVertical: sh(10),
        marginHorizontal: sw(20),
    },
    principlePaidAndBalanceContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: sw(20),
        marginVertical: sh(15),
    },
    principlePaidAndBalanceText: {
        fontSize: sw(20),
        fontWeight: '400',
        padding: sw(10),
    },
    bottomTextContainer: {
        flex: 0.7,
        flexDirection: 'column',
    },
    bottomImageContainer: {
        flex: 0.2,
    },
});

const principlePaidAndBalanceTextColour = (colourCode, fontSize) => {
    return StyleSheet.create({
        principlePaidAndBalanceText: {
            color: `${colourCode}`,
            fontSize: sw(`${fontSize}`),
            fontWeight: '400',
            // padding: sw(5),
            marginBottom: sh(2),
        },
    });
};

const progressBarStyles = (percentage) => {
    return StyleSheet.create({
        principleProgressBar: {
            backgroundColor: '#82B5B2',
            width: `${percentage}%`, // Set width as percentage string
            borderRadius: sw(10),
        },
    });
};

const monthlyLoansText = 3120.35;
const overdueAmount = 661.43;
const totalDebt = 570000;
const principlePaid = 170701;
const balance = 399299;
const progressBarNumber = (principlePaid / (principlePaid + balance)) * 100;
const progressBarPercentage = progressBarStyles(progressBarNumber);
const greenPrinciplePaidText = principlePaidAndBalanceTextColour('#82B5B2', 15);
const redBalanceText = principlePaidAndBalanceTextColour('#F27F71', 15);
const greenPrinciplePaidNumber = principlePaidAndBalanceTextColour('#82B5B2', 20);
const redBalanceNumber = principlePaidAndBalanceTextColour('#F27F71', 20);

function DebtMain({ navigation }) {
    const DebtSummaryPage = () => {
        navigation.navigate('DebtSummary');
    };
    const DebtRepaymentPlanSummaryPage = () => {
        navigation.navigate('DebtRepaymentPlanSummary');
    };

    const { userId } = useContext(GlobalContext);
    const [bills, setBills] = useState([]);
    const [loans, setLoans] = useState([]);
    const [totalMonthlyLoanAmount, setTotalMonthlyLoanAmount] = useState(0);
    const [totalOverdueAmount, setTotalOverdueAmount] = useState(0);
    const [totalDebt, setTotalDebt] = useState(0);
    const [totalPrinciple, setTotalPrinciple] = useState(0);
    const [totalBalance, setTotalBalance] = useState(0);
    const [totalMonthlyBill, setTotalMonthlyBill] = useState(0);
    const [totalMonthlyPayment, setTotalMonthlyPayment] = useState(0);
    const [mergedLoansAndBills, setMergedLoansAndBills] = useState([{ name: 'placeholder', amount: 0 }]);

    const fetchAllBills = async () => {
        try {
            const response = await axios.get(`http://${Url}:3000/bills/${userId}`);
            // console.log(response.data);
            const bills = response.data;
            const transformedBills = bills.map((bill) => ({
                name: bill.name,
                amount: bill.amount,
                repeating_option: bill.repeating_option,
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
                installment_month: loan.installment_month,
                payment_remaining: loan.payment_remaining,
                interest_rate: loan.interest_rate,
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

    const fetchData = async () => {
        const bills = await fetchAllBills();
        const loans = await fetchAllLoans();
        setBills(bills);
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

        const totalMonthlyBill = bills.reduce((total, bill) => {
            const totalPayment = calculateTotalMonthlyBills(bill);
            return total + totalPayment;
        }, 0);
        setTotalMonthlyBill(totalMonthlyBill);

        const totalMonthlyPayment = totalMonthlyLoanAmount + totalMonthlyBill;
        setTotalMonthlyPayment(totalMonthlyPayment);

        const loanRepayments = loans.map((loan) => ({
            name: loan.name,
            amount: calculateMonthlyLoanRepaymentAmount(loan),
        }));

        const mergedList = [
            ...loanRepayments.map((loan) => ({
                name: loan.name,
                amount: loan.amount,
            })),
            ...bills.map((bill) => ({
                name: bill.name,
                amount: bill.amount,
            })),
        ];

        setMergedLoansAndBills(mergedList);
    };

    useEffect(() => {
        console.log('DebtMain component mounted');
        fetchData();
    }, []);

    console.log(mergedLoansAndBills);

    return (
        <LinearGradient
            colors={['#DFEEF8', '#FFFFFF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={{ flex: 1 }}
        >
            <SafeAreaView style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text
                        style={{
                            alignSelf: 'center',
                            fontSize: 22,
                            fontFamily: fonts.interSemiBold,
                            marginBottom: sh(20),
                        }}
                    >
                        Debt
                    </Text>
                    <DonutChartContainer mergedLoansAndBills={mergedLoansAndBills} />
                    <View style={styles.twoBoxesContainer}>
                        <View style={styles.boxContainer}>
                            <Text style={styles.monthlyLoansTitleText}>Monthly Loans</Text>
                            <Text style={styles.monthlyLoansText}>RM{totalMonthlyLoanAmount}</Text>
                        </View>
                        <View style={styles.boxContainer2}>
                            <Text style={styles.overdueTitleText}>Overdue</Text>
                            <Text style={styles.overdueText}>RM{totalOverdueAmount}</Text>
                        </View>
                    </View>
                    <View style={styles.totalDebtAndSeeAllButton}>
                        <Text style={{ fontSize: sw(20), padding: sw(10) }}>Total Debts</Text>
                        <TouchableOpacity
                            style={styles.seeAllButton}
                            onPress={DebtSummaryPage}
                        >
                            <Text style={{ alignItems: 'center', justifyContent: 'center' }}>See All</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={[styles.totalDebtAmount, { marginBottom: sh(5) }]}>RM {totalDebt}</Text>
                    <View style={{ alignItems: 'center' }}>
                        {/* <Animated.View style={progressBarPercentage.principleProgressBar} /> */}
                        <Progress.Bar
                            backgroundColor="#FCA59A"
                            progress={0.5}
                            color="#B5FFE3"
                            width={sw(370)}
                            height={sh(15)}
                            borderWidth={0}
                        />
                    </View>
                    <View style={styles.principlePaidAndBalanceContainer}>
                        <View>
                            <Text style={greenPrinciplePaidText.principlePaidAndBalanceText}>Principle paid</Text>
                            <Text style={greenPrinciplePaidNumber.principlePaidAndBalanceText}>RM{totalPrinciple}</Text>
                        </View>
                        <View>
                            <Text style={redBalanceText.principlePaidAndBalanceText}>Balance</Text>
                            <Text style={redBalanceNumber.principlePaidAndBalanceText}>RM{totalBalance}</Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            // marginBottom: sh(-10),
                            marginBottom: sh(10),
                            zIndex: 99,
                        }}
                        onPress={DebtRepaymentPlanSummaryPage}
                    >
                        <View
                            style={{
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,
                                elevation: 5,
                            }}
                        >
                            <DebtMainBottomImage />
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
}

export default DebtMain;
