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

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    },
    loanBreakdownContentContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: sw(15),
    },
    paymentBreakdownContainer: {
        flex: 1,
        flexDirection: 'column',
        marginHorizontal: sw(20),
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
    },
    paymentBreakdownContentContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: sw(6),
        paddingHorizontal: sw(15),
        paddingVertical: sh(20),
        marginVertical: sh(10),
        backgroundColor: 'white',
    },
    smallTitleStyle: {
        color: '#A4A9AE',
    },
    smallTextStyle: {
        marginTop: sh(50),
        color: '#A4A9AE',
        textAlign: 'center',
    },
});

function DebtAddExistingLoan2({navigation, route}) {
    const { loanName, loanAmount, tenureYears, interestRate, startingYear, mockData1, setMockData1 } = route.params;

    var now = new Date();
    if (now.getMonth() == 11) {
        var nextMonth = new Date(now.getFullYear() + 1, 0, now.getDate());
    } else {
        var nextMonth = new Date(now.getFullYear(), now.getMonth() + 2, now.getDate());
    }

    const interestAmount = (loanAmount*(interestRate/100)).toFixed(2)
    const endYear = (nextMonth.getFullYear()+Number(tenureYears))
    const monthlyPayment = (Number(loanAmount) + Number(interestAmount)) / (12*tenureYears)
    const expiryDate = now.getDate()+'/'+nextMonth.getMonth()+'/'+(Number(nextMonth.getFullYear())+Number(tenureYears))

    const DebtSummary = () => {
        const newData = {
                image: logo.school_logo,
                backgroundColor: '#CFFAEA',
                itemName: loanName,
                expiryDate: expiryDate,
                currentLoan: 0,
                totalLoan: loanAmount,
                index: mockData1.length+2,
        }
        setMockData1([...mockData1, newData]);
        navigation.navigate('DebtSummary');
    };
    const PreviousPage = () => {
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <AppBar
                    title="Add Loan"
                    navigation={PreviousPage}
                />
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
                        <Text style={{ fontFamily: fonts.interSemiBold }}>{nextMonth.getMonth()}/{endYear}</Text>
                    </View>
                </View>
                <Text style={styles.titleStyle}>Payment Breakdown</Text>
                <View style={styles.paymentBreakdownContainer}>
                    <View style={styles.paymentBreakdownContentContainer}>
                        <Text style={styles.smallTitleStyle}>Upcoming Payment</Text>
                        <Text style={{ fontFamily: fonts.interSemiBold }}>{nextMonth.getMonth()}/{startingYear}</Text>
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
            />
        </SafeAreaView>
    );
}

export default DebtAddExistingLoan2;
