import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { colors, fonts, sh, sw } from "../../../styles/GlobalStyles";



function LoanCalculatorScreen({ navigation }) {
    const [purchaseType, setPurchaseType] = useState('house');
    const [loanAmount, setLoanAmount] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [tenure, setTenure] = useState('');
    const [downPayment, setDownPayment] = useState('');
    const [monthlyPayment, setMonthlyPayment] = useState(null);

    const monthlyIncome = 6000;

    const calculateLoan = () => {
        const principal = parseFloat(loanAmount) - parseFloat(downPayment || '0');
        const interest = parseFloat(interestRate) / 100 / 12;
        const payments = parseFloat(tenure) * 12;

        const x = Math.pow(1 + interest, payments);
        const monthly = principal * x * interest / (x - 1);

        if (isFinite(monthly)) {
            const monthlyPaymentValue = monthly.toFixed(2);
            setMonthlyPayment(monthlyPaymentValue);

            navigation.navigate('LoanResults', {
                monthlyIncome,
                loanAmount,
                interestRate,
                tenure,
                monthlyPayment: monthlyPaymentValue,
                stressLevel,
                stressLevelText,
            });
        } else {
            Alert.alert("Error", "Please check your inputs and try again.");
        }
    };

    const stressLevel = monthlyPayment ? (monthlyPayment / monthlyIncome) * 100 : 0;
    const stressLevelText = stressLevel >= 30 ? 'High Stress' : 'Low Stress';

    const StressGauge = ({ level }) => {
        const gaugeWidth = `${Math.min(Math.max(level, 0), 100)}%`;
        const gaugeColor = level >= 75 ? 'red' : level >= 50 ? 'orange' : 'green';

        return (
            <View style={styles.stressGaugeContainer}>
                <View style={[styles.stressGaugeIndicator, { width: gaugeWidth, backgroundColor: gaugeColor }]} />
            </View>
        );
    };





    return (

        <ScrollView style={styles.container}>
            <Text style={styles.header}>What’s Your Next Big Purchase?</Text>
            <Picker
                selectedValue={purchaseType}
                style={styles.input}
                onValueChange={(itemValue, itemIndex) => setPurchaseType(itemValue)}
            >
                <Picker.Item label="Car" value="car" />
                <Picker.Item label="House" value="house" />
                <Picker.Item label="Others" value="others" />
            </Picker>

            <Text style={styles.title}>Calculate Your Loan</Text>

            <Text style={styles.header}>Your Monthly Income : {monthlyIncome}</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>RM</Text>
                <TextInput
                    style={styles.input}
                    value={loanAmount}
                    onChangeText={setLoanAmount}
                    placeholder="Enter Loan Amount"
                    keyboardType="numeric"
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Yrs</Text>
                <TextInput
                    style={styles.input}
                    value={tenure}
                    onChangeText={setTenure}
                    placeholder="Enter Tenure (Years)"
                    keyboardType="numeric"
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>%</Text>
                <TextInput
                    style={styles.input}
                    value={interestRate}
                    onChangeText={setInterestRate}
                    placeholder="Enter Interest Rate"
                    keyboardType="numeric"
                />
            </View>
            <TouchableOpacity onPress={calculateLoan} style={styles.calculateButton}>
                <Text style={styles.buttonText}>Calculate</Text>
            </TouchableOpacity>
            {/* {monthlyPayment && (
                <View style={styles.resultContainer}>
                    <StressGauge level={stressLevel} />
                    <Text style={[styles.stressLevelText, { color: stressLevel >= 50 ? 'red' : 'green' }]}>
                        Stress Level: {stressLevelText} ({stressLevel.toFixed(2)}% of income)
                    </Text>
                    <Text style={styles.resultText}>Monthly Income: RM{monthlyIncome.toFixed(2)}</Text>
                    <Text style={styles.resultText}>Loan Amount: RM{loanAmount}</Text>
                    <Text style={styles.resultText}>Interest: {interestRate}%</Text>
                    <Text style={styles.resultText}>Tenure: {tenure} years</Text>
                    <Text style={styles.resultText}>Monthly Payment: RM{monthlyPayment}</Text>
                </View>
            )} */}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 15,
        color: '#444',
        textAlign: 'center',
        fontFamily: fonts.interMedium,
    },
    picker: {
        height: 50,
        marginBottom: 20,
        fontFamily: fonts.interMedium,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 30,
        fontFamily: fonts.interMedium,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#fff',
    },
    inputLabel: {
        paddingHorizontal: 12,
        fontSize: 18,
        color: '#333',
        fontFamily: fonts.interMedium,
    },
    input: {
        flex: 1,
        height: 50,
        fontSize: 18,
        color: '#333',
        paddingHorizontal: 12,
    },
    calculateButton: {
        backgroundColor: '#5F84A1',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
    },
    buttonText: {
        fontSize: 18,
        color: '#ffffff',
        fontWeight: 'bold',
        fontFamily: fonts.interMedium,
    },


    resultText: {
        marginTop: 20,
        fontSize: 18,
        color: '#333',
    },
    stressGaugeContainer: {

        height: 20,
        width: '100%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#e6e6e6',
        marginTop: 20,
    },
    stressGaugeIndicator: {
        height: '100%',
        borderRadius: 9,
    },
    resultContainer: {
        padding: 20,
        marginTop: 20,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        alignItems: 'center',
    },
    stressLevelText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#333',
    },
});


export default LoanCalculatorScreen;
