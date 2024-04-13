import React, { useContext, useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import axios from 'axios';
import { sw, sh, fonts, colors } from '../../styles/GlobalStyles';
import { LinearGradient } from 'expo-linear-gradient';
import { LineChart } from 'react-native-gifted-charts';
import { Path, Circle, Svg, Ellipse } from 'react-native-svg';
import { AreaChart, XAxis } from 'react-native-svg-charts';
import * as Progress from 'react-native-progress';

import * as shape from 'd3-shape';
import { GlobalContext } from '../../context';
import BudgetCard from './Utils/BudgetCard';

function Expenses_Main({ navigation }) {
    const { userId } = useContext(GlobalContext);
    const [transactions, setTransactions] = useState([]);
    const [transactionsCategory, setTransactionsCategory] = useState([]);
    const [budgets, setBudgets] = useState([]);
    let totalIncome = 0;
    let totalExpense = 0;
    let totalBalance = 0;
    const toTransactionPage = () => {
        navigation.navigate('Expenses_Transaction');
    };

    const toAddBudget = () => {
        navigation.navigate('Expenses_Add_1');
    };

    const toAddBudgetBottom = () => {
        navigation.navigate('Expenses_Budget');
    };

    // const data = [50, 10, 40, 95, 30, 24, 85, 91, 35, 53, 53, 24];
    // const xLabels = [
    //     "Jan",
    //     "Feb",
    //     "Mar",
    //     "Apr",
    //     "May",
    //     "Jun",
    //     // "Jul",
    //     // "Aug",
    //     // "Sep",
    //     // "Oct",
    //     // "Nov",
    //     // "Dec",
    // ];
    const data = [{ value: 35 }, { value: 40 }, { value: 30 }, { value: 15 }, { value: 30 }, { value: 20 }];

    const xAxisLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

    const yLabels = ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];

    const Line = ({ line }) => (
        <Path
            key={'line'}
            d={line}
            stroke={'rgb(95, 132, 161)'}
            fill={'none'}
        />
    );

    //calculate total income, expense and balance
    transactions.forEach((transaction) => {
        if (transaction.type === 'EXPENSE') {
            totalExpense += transaction.amount;
        } else {
            totalIncome += transaction.amount;
        }
    });

    totalBalance = totalIncome - totalExpense;

    

    const fetchAllTransactions = async () => {
        try {
            const response = await axios.get(`http://192.168.100.14:3000/transactions/${userId}`);
            // console.log(response.data);
            
            return response.data;
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };

    const fetchTransactionCategory = async () => {
        try {
            const response = await axios.get(`http://192.168.100.14:3000/transactions/category/${userId}`);
            // console.log(response.data);
            const transactionsCategory = response.data;
            const transformedTransactionsCat = transactionsCategory.map((transaction) => ({
                spent: transaction._sum.amount,
                category: transaction.category,
            }));
            console.log(transformedTransactionsCat);
            return transformedTransactionsCat;
        } catch (error) {
            console.error('Error fetching transactions category:', error);
        }
    };

    const fetchAllBudgets = async () => {
        try {
            const response = await axios.get(`http://192.168.100.14:3000/budgets/category/${userId}`);
            // console.log(response.data);
            const budgets = response.data;
            const transformedBudgets = budgets.map((budget) => ({
                amount: budget._sum.amount,
                category: budget.category,
            }));

            return transformedBudgets;
        } catch (error) {
            console.error('Error fetching budgets:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const transactions = await fetchAllTransactions();
            const transactionsCategory = await fetchTransactionCategory();
            const budgets = await fetchAllBudgets();
            setTransactions(transactions);
            setTransactionsCategory(transactionsCategory);
            setBudgets(budgets);
            

            if(budgets.length > 0 && transactionsCategory.length > 0) {
                const updatedBudgets = budgets.map((budget) => {
                    const transaction = transactionsCategory.find(
                        (transaction) => transaction.category === budget.category,
                    );
                    if (transaction) {
                        return { ...budget, spent: transaction.spent };
                    }
                    return budget;
                });
                console.log(updatedBudgets);
                setBudgets(updatedBudgets);
            }
        }
        fetchData();
    }, []);

    // useEffect(() => {
    //     if (transactionsCategory.length > 0 && budgets.length > 0) {
    //         const updatedBudgets = budgets.map((budget) => {
    //             const transaction = transactionsCategory.find(
    //                 (transaction) => transaction.category === budget.category,
    //             );
    //             if (transaction) {
    //                 return { ...budget, spent: transaction.spent };
    //             }
    //             return budget;
    //         });
    //         setBudgets(updatedBudgets);
    //     }
    // }, [transactionsCategory, budgets]);

    return (
        <ScrollView style={{ backgroundColor: colors.white, height: '100%' }}>
            <View style={{ height: sh(230), backgroundColor: '#DFEEF8', paddingTop: sh(60), marginBottom: sh(70) }}>
                <Text style={{ fontFamily: fonts.interSemiBold, fontSize: 22, alignSelf: 'center' }}>Expenses</Text>
                <LinearGradient
                    style={styles.cardContainer}
                    colors={['#7499B6', '#5F84A1', '#314452']}
                    start={{ x: 0.4, y: -0.9 }}
                    end={{ x: 0, y: 0 }}
                    locations={[0, 0.3, 1]}
                >
                    <View style={styles.balanceContainer}>
                        <Text style={[styles.cardTitle, { fontSize: 18 }]}>Total Balance</Text>
                        <Text style={[styles.cardDescription, { fontSize: 30 }]}>RM {totalBalance}</Text>
                    </View>

                    <View style={styles.rowContainer}>
                        <View style={[styles.columnContainer, { flex: 1 }]}>
                            <View style={styles.subTitleContainer}>
                                <Image source={require('../../assets/images/expenses_arrow_up.png')} />
                                <Text style={[styles.subTitleText, { fontSize: 16, color: '#D0DAE5' }]}>Income</Text>
                            </View>
                            <Text style={[styles.subTitleText, { fontSize: 20 }]}>RM {totalIncome}</Text>
                        </View>
                        <View style={styles.columnContainer}>
                            <View style={styles.subTitleContainer}>
                                <Image source={require('../../assets/images/expenses_arrow_down.png')} />
                                <Text style={[styles.subTitleText, { fontSize: 16, color: '#D0DAE5' }]}>Expenses</Text>
                            </View>
                            <Text style={[styles.subTitleText, { fontSize: 20 }]}>RM {totalExpense}</Text>
                        </View>
                    </View>
                </LinearGradient>
            </View>

            <View
                style={[
                    styles.rowContainer,
                    {
                        marginHorizontal: sw(20),
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                    },
                ]}
            >
                <Text style={[styles.cardTitle, { color: colors.black, fontSize: 18, flex: 1 }]}>
                    Transactions History
                </Text>
                <TouchableOpacity onPress={toTransactionPage}>
                    <Text
                        style={[
                            {
                                fontFamily: fonts.interMedium,
                                color: '#5F84A1',
                                fontSize: 18,
                            },
                        ]}
                    >
                        See All
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={[styles.chartContainer]}>
                <View style={styles.rowContainer}>
                    {/* <YAxis
                        svg={{
                            fill: "",
                            fontSize: 15,
                        }}
                        contentInset={{ top: 20, bottom: 20 }}
                        data={yLabels}
                        min={0}
                        max={100}
                        numberOfTicks={yLabels.length}
                        formatLabel={(value) => `${value}`}
                    /> */}
                    {/* <AreaChart
                        style={{
                            height: sh(230),
                            marginHorizontal: sw(20),
                            flex: 1,
                        }}
                        data={data}
                        contentInset={{ top: 30, bottom: 30 }}
                        curve={shape.curveNatural}
                        svg={{ fill: "rgba(95, 132, 161, 0.3)" }}
                        // yAccessor={({ item }) => item.value}
                        // xAccessor={({ item }) => item.month}
                    >
                        {/* <Grid /> 

                        <Line />
                    </AreaChart> */}

                    <LineChart
                        isAnimated
                        areaChart
                        color="#07BAD1"
                        curved
                        data={data}
                        width={sw(400)}
                        rulesLength={sw(330)}
                        maxValue={50}
                        startFillColor="rgb(46, 217, 255)"
                        startOpacity={0.8}
                        endFillColor="rgb(203, 241, 250)"
                        endOpacity={0.3}
                        xAxisLabelTexts={xAxisLabels}
                        yAxisTextStyle={[styles.cardDescription, { color: '#666666' }]}
                        xAxisLabelTextStyle={[styles.cardDescription, { color: '#666666' }]}
                        spacing={60}
                        // hideYAxisText
                        noOfSections={5}
                        xAxisThickness={0}
                        yAxisThickness={0}
                    />
                </View>
                {/* <XAxis
                    data={xLabels}
                    contentInset={{ left: 30, right: 30 }}
                    svg={{
                        fill: "rgb(102,102,102)",
                        fontSize: 15,
                    }}
                    numberOfTicks={xLabels.length}
                    formatLabel={(value, index) => xLabels[index]}
                /> */}
            </View>

            {/* details parent frame */}
            <View
                style={[
                    styles.columnContainer,
                    {
                        paddingVertical: sh(10),
                        paddingHorizontal: sw(20),
                        gap: 5,
                        position: 'relative',
                        borderTopLeftRadius: 25,
                        borderTopRightRadius: 25,
                        backgroundColor: '#fafafa',
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                    },
                ]}
            >
                {/* details header frame */}
                <View style={[styles.columnContainer]}>
                    <Text style={[styles.cardTitle, { color: colors.black, fontSize: 18 }]}>Budgets</Text>
                    <View
                        style={[
                            styles.rowContainer,
                            {
                                justifyContent: 'space-between',

                                alignItems: 'center',
                            },
                        ]}
                    >
                        <Text style={[styles.subTitleText, { color: '#91919F', flex: 1 }]}>This month</Text>
                        <View
                            style={[
                                styles.rowContainer,
                                {
                                    gap: 15,
                                },
                            ]}
                        >
                            <View style={[styles.rowContainer, { gap: 1, alignItems: 'center' }]}>
                                <Svg
                                    height="24"
                                    width="24"
                                >
                                    <Circle
                                        cx="11"
                                        cy="11"
                                        r="8"
                                        fill="#B5FFE3"
                                    />
                                </Svg>
                                <Text style={[styles.subTitleText, { color: '#91919F' }]}>In limit</Text>
                            </View>
                            <View style={[styles.rowContainer, { gap: 1, alignItems: 'center' }]}>
                                <Svg
                                    height="24"
                                    width="24"
                                >
                                    <Circle
                                        cx="11"
                                        cy="11"
                                        r="8"
                                        fill="#FFD1D3"
                                    />
                                </Svg>
                                <Text style={[styles.subTitleText, { color: '#91919F' }]}>Overspend</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* details frame */}

                {budgets.length > 0 &&
                    budgets.map((budget) => (
                        <BudgetCard
                            key={budget.category}
                            category={budget.category}
                            usedAmount={budget.spent}
                            totalAmount={budget.amount}
                        />
                    ))}

                

                {/* details frame */}
               

                <TouchableOpacity onPress={toAddBudgetBottom}>
                    <View
                        style={{
                            marginTop: sh(10),
                            paddingHorizontal: sw(15),
                            paddingVertical: sh(30),
                            backgroundColor: 'rgba(128, 128, 128, 0.1)',
                            width: '40%',
                            borderRadius: 10,
                            justifyContent: 'center',
                        }}
                    >
                        <Text
                            style={[
                                styles.cardTitle,
                                {
                                    color: '#5F84A1',
                                    fontSize: 16,
                                    position: 'absolute',
                                    alignSelf: 'center',
                                },
                            ]}
                        >
                            Add Budget +
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View
                style={{
                    position: 'absolute',
                    bottom: 5,
                    right: 15,
                    alignSelf: 'flex-end',
                }}
            >
                <TouchableOpacity onPress={toAddBudget}>
                    <Svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={60}
                        height={60}
                        fill="none"
                        opacity={0.4}
                    >
                        <Ellipse
                            cx={30.526}
                            cy={29.698}
                            fill="#5F84A1"
                            rx={29.474}
                            ry={29.698}
                        />
                        <Path
                            fill="#000"
                            stroke="#FCFCFC"
                            strokeWidth={2.5}
                            d="M31.085 30.067H29.84v11.864a.071.071 0 0 1-.067.07.07.07 0 0 1-.046-.02.072.072 0 0 1-.02-.05V30.067H17.931a.07.07 0 0 1-.07-.067.071.071 0 0 1 .07-.067h11.774V18.145a.07.07 0 0 1 .115-.029.072.072 0 0 1 .019.029v11.788H41.665l.048-.004c.01 0 .02 0 .029.004l.409-1.185-.41 1.185a.07.07 0 0 1 .042.039l1.139-.502-1.139.502a.07.07 0 0 1 .006.028h1.245-1.245a.072.072 0 0 1-.047.067.07.07 0 0 1-.029.004l-.048-.004h-10.58Z"
                        />
                    </Svg>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

export default Expenses_Main;

const styles = StyleSheet.create({
    cardContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        paddingHorizontal: sw(24),
        paddingVertical: sh(15),
        marginVertical: sh(15),
        marginHorizontal: sw(20),
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10,
    },
    balanceContainer: {
        flexDirection: 'column',
        gap: 4,
    },
    cardTitle: {
        fontFamily: fonts.interSemiBold,

        color: colors.white,
    },
    cardDescription: {
        fontFamily: fonts.interSemiBold,
        color: colors.white,
    },
    rowContainer: { flexDirection: 'row' },
    columnContainer: { flexDirection: 'column' },
    subTitleContainer: {
        flexDirection: 'row',
        gap: 5,
    },
    subTitleText: {
        fontFamily: fonts.interMedium,
        color: colors.white,
    },
    chartContainer: {
        // marginHorizontal: sw(10),
        // borderColor: "black",
        // borderWidth: 1,
        padding: sw(20),
        flexDirection: 'column',
    },
});
