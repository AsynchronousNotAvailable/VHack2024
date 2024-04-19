import React, { useState, useContext, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DebtFreeCountdownCard from './Components/DebtFreeCountdownCard';
import MonthlyPayment from './Components/MonthlyPayment';
import ServicesList from './Components/ServicesList';
import { colors, fonts, sh, sw } from '../../styles/GlobalStyles';
import axios from 'axios';
import { GlobalContext } from '../../context';
import { Url } from '../../url';

function Home_Main({ navigation }) {
    const { userId, setTransactions } = useContext(GlobalContext);
    const [user, setUser] = useState([]);
    const [debtFreeDate, setDebtFreeDate] = useState(null);
    const username = 'Jason';

    const handleNotificationPress = () => {
        navigation.navigate('Notifications');
    };

    const goDebtPage = () => {
        navigation.navigate('Debt');
    };

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

    // pre-load transaction data
    const fetchAllTransactions = async () => {
        try {
            const response = await axios.get(`http://192.168.100.14:3000/transactions/${userId}`);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };

    const fetchData = async () => {
        const user = await fetchUserDetails();
        setUser(user);

        if (user.strategy == 'SNOWBALL' && user.extra_payment != null) {
            setDebtFreeDate(user.debt_free_date);
        } else if (user.strategy == 'AVALANCHE' && user.extra_payment != null) {
            setDebtFreeDate(user.debt_free_date);
        } else {
            console.log('Normal!');
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <ScrollView style={styles.container}>
            <View style={{ height: sh(100), backgroundColor: '#DFEEF8', paddingTop: sh(40) }}>
                <View style={styles.headerContainer}>
                    <Text style={styles.welcomeText}>Welcome {username}!</Text>
                    <TouchableOpacity onPress={handleNotificationPress}>
                        <Ionicons
                            name="notifications-outline"
                            size={24}
                            color="black"
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <DebtFreeCountdownCard debtFreeDate={debtFreeDate} />
            <TouchableHighlight
                underlayColor={colors.aliceBlue}
                style={styles.selectContainer}
                onPress={goDebtPage}
            >
                <MonthlyPayment />
            </TouchableHighlight>

            <ServicesList navigation={navigation} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        // borderColor: 'black',
        // borderWidth: 1,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // borderColor: 'black',
        // borderWidth: 1,
        padding: 15,
        // backgroundColor: '#DFEEF8',
    },
    welcomeText: {
        fontSize: 22,
        fontWeight: 'bold',
        paddingLeft: 10,
    },
    selectContainer: {
        paddingHorizontal: sw(20),
        alignItems: 'center',
        marginBottom: sh(20),
    },
});

export default Home_Main;
