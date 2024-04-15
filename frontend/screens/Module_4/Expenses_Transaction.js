import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { Path, Svg, Ellipse, Rect } from 'react-native-svg';
import { sw, sh, fonts, colors } from '../../styles/GlobalStyles';
import axios from 'axios';
import DonutChartContainer from './Utils/DonutChart/DonutChartContainer.js';
import Transaction_Card from './Utils/Transaction/Transaction_Card.js';
import { Url } from '../../url';
import { useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import Transaction_Container from './Utils/Transaction/Transaction_Container';

function Expenses_Transaction({ navigation }) {
    const userId = 1;
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [currentMonth, setCurrentMonth] = useState(4);
    const [selectedCategory, setSelectedCategory] = useState('By Category');
    const data = [
        { key: '1', value: 'By Category' },
        { key: '2', value: 'By Account' },
    ];

    const month = {
        1: 'January',
        2: 'February',
        3: 'March',
        4: 'April',
        5: 'May',
        6: 'June',
        7: 'July',
        8: 'August',
        9: 'September',
        10: 'October',
        11: 'November',
        12: 'December',
    };
    const [categoryAmount, setCategoryAmount] = useState([]);
    const [categoryName, setCategoryName] = useState([]);
    const [monthlyTransactions, setMonthlyTransactions] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);

    const card_details_today = require('./MockData/Card_Details_Today.js');
    const card_details_ytd = require('./MockData/Card_Details_Yesterday.js');
    const toAddBudget = () => {
        navigation.navigate('Expenses_Add_1');
    };

    // console.log(card_details_today);

    const increaseMonth = () => {
        if (currentMonth === 12) {
            setCurrentMonth(1);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
        
    };
    const decreaseMonth = () => {
        if (currentMonth === 1) {
            setCurrentMonth(12);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
      
    };

    useEffect(() => {
        const changeData = async () => {
            if (selectedCategory === '1') {
                const [amount, name] = await fetchMonthlyTransactionsByCategory();
                setCategoryAmount(amount);
                setCategoryName(name);
            } else if (selectedCategory === '2') {
                const [amount, name] = await fetchMonthlyTransactionsByAccount();
                setCategoryAmount(amount);
                setCategoryName(name);
            }
        };
        changeData();
    }, [selectedCategory, currentMonth]);
    useFocusEffect(
        useCallback(() => {
            

            const fetchAllData = async () => {
                const monthTrans = await fetchMonthlyTransactions();
                const currentTransactions = [];
                monthTrans.forEach((transaction) => {
                    // console.log(transaction);
                    const [processedDate, processedTime] = convertDate(transaction.date);
                    // console.log(processedDate, processedTime);
                    const processedTransaction = {
                        ...transaction,
                        date: processedDate,
                        time: processedTime,
                    };
                    // console.log(processedTransaction);
                    currentTransactions.push(processedTransaction);
                    // setMonthlyTransactions((prevTransactions) => [...prevTransactions, processedTransaction]);
                });
                setMonthlyTransactions(currentTransactions);
                
                
                const [processedAmount, processedName] = selectedCategory === '1' ? await fetchMonthlyTransactionsByCategory() : await fetchMonthlyTransactionsByAccount();
                setCategoryAmount(processedAmount);
                setCategoryName(processedName);
                // setSelectedCategory('1');

                console.log(processedAmount, processedName);

                // setIsLoading(false);
            };

            const fetchMonthlyTransactions = async () => {
                try {
                    const response = await axios.get(
                        `http://${Url}:3000/transactions/${userId}/${currentYear}/${currentMonth}`,
                    );
                    return response.data;
                } catch (error) {}
            };

            const convertDate = (date) => {
                const originalDate = new Date(date); // Convert the date string to a Date object

                // Extract date components
                const year = originalDate.getFullYear();
                const month = (originalDate.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based, so add 1
                const day = originalDate.getDate().toString().padStart(2, '0');

                // Format the date string as YYYY-MM-DD
                const formattedDate = `${year}-${month}-${day}`;

                // Extract time components
                const hours = originalDate.getHours().toString().padStart(2, '0');
                const minutes = originalDate.getMinutes().toString().padStart(2, '0');

                // Format the time string as HH:MM AM/PM
                const meridiem = hours >= 12 ? 'PM' : 'AM';
                const formattedHours = (hours % 12 || 12).toString(); // Convert 0 to 12 for midnight
                const formattedTime = `${formattedHours}:${minutes} ${meridiem}`;

                // Log the formatted date and time
                // console.log(`Date: ${formattedDate}, Time: ${formattedTime}`);
                return [formattedDate, formattedTime];
            };

            fetchAllData();

            
        }, [currentMonth]),
    );

    const fetchMonthlyTransactionsByCategory = async () => {
        // console.log(month[currentMonth]);
        const response = await axios.get(
            `http://${Url}:3000/transactions/${userId}/${currentYear}/${currentMonth}/category`,
        );

        const monthlyTransactionsCategory = response.data;
        const amount = [];
        const name = [];
        monthlyTransactionsCategory.map((item) => {
            amount.push(item._sum.amount);
            name.push(item.category);
        });
        console.log(amount, name);
        return [amount, name];
        // setCategoryAmount(amount);
        // setCategoryName(name);

        // console.log(response.data);
    };

    const fetchMonthlyTransactionsByAccount = async () => {
        // console.log(month[currentMonth]);
        const response = await axios.get(
            `http://${Url}:3000/transactions/${userId}/${currentYear}/${currentMonth}/account`,
        );

        const monthlyTransactionsAccount = response.data;
        const amount = [];
        const name = [];
        monthlyTransactionsAccount.map((item) => {
            amount.push(item._sum.amount);
            name.push(item.account);
        });
        console.log(amount, name);
        return [amount, name];
        // setCategoryAmount(amount);
        // setCategoryName(name);

        // console.log(response.data);
    };

    return (
        <View>
            <ScrollView
                style={{
                    backgroundColor: colors.white,
                    height: '100%',
                    position: 'relative',
                }}
            >
                <View
                    style={[
                        styles.rowContainer,
                        {
                            marginHorizontal: sw(20),
                            marginVertical: sh(10),
                            justifyContent: 'space-between',
                            position: 'relative',

                            borderColor: 'black',
                            alignItems: 'flex-end',

                            height: sh(50),
                        },
                    ]}
                >
                    <View
                        style={[
                            styles.rowContainer,
                            {
                                marginHorizontal: sw(20),
                                gap: 10,
                            },
                        ]}
                    >
                        <View
                            style={{
                                height: sh(40),
                                width: sw(30),

                                borderColor: '#5F84A1',
                                borderWidth: 1,
                                borderRadius: 5,
                                alignItems: 'center',
                            }}
                        >
                            <TouchableOpacity
                                onPress={decreaseMonth}
                                style={{
                                    borderRadius: 5,
                                    alignItems: 'center',
                                    justifyContent: 'center',

                                    height: sh(40),
                                    width: sw(30),
                                }}
                            >
                                <Svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    fill="none"
                                >
                                    <Path
                                        stroke="#5F84A1"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="m15 6-6 6 6 6"
                                    />
                                </Svg>
                            </TouchableOpacity>
                        </View>

                        <Text
                            style={[
                                styles.cardDescription,
                                {
                                    color: '#5F84A1',
                                    fontSize: 20,

                                    alignSelf: 'center',
                                },
                            ]}
                        >
                            {/* {currentMonth} */}
                            {month[currentMonth]} {currentYear}
                        </Text>

                        <View
                            style={{
                                height: sh(40),
                                width: sw(30),

                                borderColor: '#5F84A1',
                                borderWidth: 1,
                                borderRadius: 5,
                                alignItems: 'center',
                            }}
                        >
                            <TouchableOpacity
                                onPress={increaseMonth}
                                style={{
                                    borderRadius: 5,
                                    alignItems: 'center',
                                    justifyContent: 'center',

                                    height: sh(40),
                                    width: sw(30),
                                }}
                            >
                                <Svg
                                    style={{ position: 'absolute' }}
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    fill="none"
                                >
                                    <Path
                                        stroke="#5F84A1"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="m9 18 6-6-6-6"
                                    />
                                </Svg>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={{ position: 'absolute', right: 0, top: 55, zIndex: 999 }}>
                    <SelectList
                        // onSelect={(val)=> setFilter(val)}
                        
                        dropdownStyles={{
                            position: 'absolute',
                            right: 20,
                            top: 0,
                            zIndex: 100,
                            width: sw(130),
                            backgroundColor: 'white',
                            borderColor: '#5F84A1', // Border color of dropdown items
                            borderWidth: 1, // Border width of dropdown items
                            borderRadius: 5, // Border radius of dropdown items
                            paddingVertical: sh(10), // Vertical padding of dropdown items
                        }}
                        setSelected={(val) => setSelectedCategory(val)}
                        fontFamily={fonts.interMedium}
                        data={data}
                        search={false}
                        boxStyles={{
                            position: 'absolute',
                            right: 20,
                            bottom: 0,
                            borderRadius: 10,
                            width: sw(130),
                            borderColor: '#5F84A1',
                            paddingHorizontal: sw(10),
                            paddingVertical: sh(10),
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            zIndex: 100,
                        }}
                        defaultOption={{ key: '1', value: 'By Category' }}
                    />
                </View>

                {selectedCategory === '1' && (
                    <DonutChartContainer
                        n={categoryAmount.length}
                        debtNames={categoryName}
                        debtNumbers={categoryAmount}
                    />
                )}

                {selectedCategory === '2' && (
                    <DonutChartContainer
                        n={categoryAmount.length}
                        debtNames={categoryName}
                        debtNumbers={categoryAmount}
                    />
                )}

                {monthlyTransactions.length > 0 && <Transaction_Container transactions={monthlyTransactions} />}
            </ScrollView>
            <View
                style={{
                    position: 'absolute',
                    bottom: sh(10),
                    right: sw(20),
                    alignSelf: 'flex-end',
                }}
            >
                <TouchableOpacity onPress={toAddBudget}>
                    <Svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={60}
                        height={60}
                        fill="none"
                        opacity={0.5}
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
        </View>
    );
}

export default Expenses_Transaction;

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
        elevation: 5,
    },

    balanceContainer: {
        flexDirection: 'column',
        gap: 4,
    },
    cardTitle: {
        fontFamily: fonts.interSemiBold,
        color: colors.black,
    },
    cardDescription: {
        fontFamily: fonts.interRegular,
        color: colors.black,
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
        // marginHorizontal: sw(20),
        flexDirection: 'column',
    },
});
