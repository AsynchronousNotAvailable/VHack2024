import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';


function LoanResultsScreen({ route }) {
    const { monthlyIncome, loanAmount, interestRate, tenure, monthlyPayment } = route.params;
    const monthlyBills = 3630.20;
    const netIncome = monthlyIncome - monthlyBills - monthlyPayment;

    const getPurchaseAdvice = (stressLevel) => {
        let advice;
        if (stressLevel >= 50) {
            advice = "Your monthly loan payment consumes about " + stressLevel.toFixed(2) + "% of your net income, nearing the affordability limit. This commitment might limit funds for other needs and savings, risking financial stress.";
        } else if (stressLevel >= 35) {
            advice = "Your monthly loan payment accounts for approximately " + stressLevel.toFixed(2) + "% of your monthly net income. While this is manageable, it's advisable to maintain a cautious budget to accommodate other living expenses and savings.";
        } else if  (stressLevel >= 35){
            advice = "Your monthly loan payment represents about " + stressLevel.toFixed(2) + "% of your monthly net income. This is within a comfortable range, allowing for savings and other expenses without straining your finances.";
        
        }
        return advice;
    };

    const canAfford = netIncome > 0;
    const stressLevel = canAfford ? (monthlyPayment / netIncome) * 100 : 100; 
    const stressLevelText = !canAfford ? 'Unaffordable' :
                            stressLevel >= 50 ? 'Stressful Purchase' :
                            stressLevel >= 35 ? 'Manageable Purchase' : 'Comfortable Purchase';
    
    const purchaseAdvice = !canAfford ?
        "Based on your net income, this loan is unaffordable. It's crucial to consider loans that align with your financial capabilities to avoid debt stress." :
        getPurchaseAdvice(stressLevel);

    const totalPayments = monthlyPayment * tenure * 12;
    const totalInterest = totalPayments - loanAmount;




    const StressGauge = ({ level }) => {
        const gaugeWidth = `${Math.min(Math.max(level, 0), 100)}%`;
        const gaugeColor = level >= 50 ? 'red' : level >= 35 ? 'orange' : 'green';

        return (
            <View style={styles.stressGaugeContainer}>
                <View style={[styles.stressGaugeIndicator, { width: gaugeWidth, backgroundColor: gaugeColor }]} />
            </View>
        );
    };




    return (
        <ScrollView style={styles.container}>

            <Text style={styles.header}>Stress Test Results</Text>
            <StressGauge level={canAfford ? stressLevel : 100} />
<Text style={[styles.stressLevelText, { color: canAfford ? (stressLevel >= 50 ? 'red' : stressLevel >= 35 ? 'orange' : 'green') : 'red' }]}>
    Stress Level: {stressLevelText} {canAfford ? `(${stressLevel.toFixed(2)}% of net income)` : ""}
</Text>
            <Text style={styles.adviceDescription}>{purchaseAdvice}</Text>
            <Text style={styles.adviceDescription}>
                Net Income (Income - Monthly Bills - New Loan): RM{monthlyIncome.toFixed(2)} - RM{monthlyBills} -RM{monthlyPayment} = RM{netIncome.toFixed(2)}
            </Text>
            <View style={styles.resultContainer}>
                <Text style={styles.resultText}>Monthly Payment: RM{monthlyPayment}</Text>

                <Text style={styles.resultText}>Loan Amount: RM{loanAmount}</Text>
                <Text style={styles.resultText}>Total Interest: RM{totalInterest.toFixed(2)}</Text>
                <Text style={styles.resultText}>Total Payment: RM{totalPayments.toFixed(2)}</Text>
                <Text style={styles.resultText}>Interest: {interestRate}%</Text>

                <Text style={styles.resultText}>Tenure: {tenure} years</Text>


            </View>
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
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    adviceDescription: {
        fontSize: 15,
        marginTop: 20,
        marginBottom: 20,
        color: '#333',
        textAlign: 'center',
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
        marginTop: 0,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        shadowColor: "#EFF1F5",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 4,
        alignItems: 'left',
    },
    stressLevelText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#333',
        textAlign: 'center',

    },

});

export default LoanResultsScreen;