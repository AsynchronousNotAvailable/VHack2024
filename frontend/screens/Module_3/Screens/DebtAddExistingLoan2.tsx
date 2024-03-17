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
    ImageSourcePropType,
} from 'react-native';
import { fonts, sw, sh } from '../../../styles/GlobalStyles';
import AppBar from '../Utils/AppBar';
import { BottomButton } from '../Utils/RenderBottomButton';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import RootStackNavigatorParamsList from '../Utils/Module3StackParamsProps';

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

function DebtAddExistingLoan2() {
    const navigation = useNavigation<StackNavigationProp<RootStackNavigatorParamsList>>();
    const DebtMainPage = () => {
        navigation.navigate('DebtMain');
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
                        <Text style={styles.smallTitleStyle}>Loan Amount</Text>
                        <Text style={{ fontFamily: fonts.interSemiBold }}>RM340,000.00</Text>
                    </View>
                    <View style={styles.loanBreakdownContentContainer}>
                        <Text style={styles.smallTitleStyle}>Interest</Text>
                        <Text style={{ fontFamily: fonts.interSemiBold }}>RM209,630.70</Text>
                    </View>
                    <View style={styles.loanBreakdownContentContainer}>
                        <Text style={styles.smallTitleStyle}>End Date</Text>
                        <Text style={{ fontFamily: fonts.interSemiBold }}>15/4/2054</Text>
                    </View>
                </View>
                <Text style={styles.titleStyle}>Payment Breakdown</Text>
                <View style={styles.paymentBreakdownContainer}>
                    <View style={styles.paymentBreakdownContentContainer}>
                        <Text style={styles.smallTitleStyle}>Upcoming Payment</Text>
                        <Text style={{ fontFamily: fonts.interSemiBold }}>15/4</Text>
                    </View>
                    <View style={styles.paymentBreakdownContentContainer}>
                        <Text style={styles.smallTitleStyle}>Monthly Payment</Text>
                        <Text style={{ fontFamily: fonts.interSemiBold }}>RM1,526.75</Text>
                    </View>
                </View>
                <Text style={styles.smallTextStyle}>Auto added to your upcoming bills after confirmation</Text>
            </ScrollView>
            <BottomButton
                value="Add"
                navigation={DebtMainPage}
            />
        </SafeAreaView>
    );
}

export default DebtAddExistingLoan2;
