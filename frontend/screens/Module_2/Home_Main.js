import React from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DebtFreeCountdownCard from './Components/DebtFreeCountdownCard';
import MonthlyPayment from './Components/MonthlyPayment';
import ServicesList from './Components/ServicesList';
import { colors, fonts, sh, sw } from '../../styles/GlobalStyles';
import axios from 'axios';
import { useContext, useEffect } from 'react';
import { GlobalContext } from '../../context';

function Home_Main({ navigation }) {
    const { userId, setTransactions} = useContext(GlobalContext);
    const username = 'Jason';

    const handleNotificationPress = () => {
        navigation.navigate('Notifications');
    };

    const goDebtPage = () => {
        navigation.navigate('Debt');
    };


    // pre-load transaction data
    const fetchAllTransactions = async () => {
        try {
            const response = await axios.get(`http://192.168.100.14:3000/transactions/${userId}`);
            console.log(response.data);
            
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
        
    }

    useEffect(() => { 
        console.log("Hi");
        fetchAllTransactions();
        // setTransactions(data);
    }, [])

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

            <DebtFreeCountdownCard />
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
        marginBottom: sh(20)
    },
});

export default Home_Main;
