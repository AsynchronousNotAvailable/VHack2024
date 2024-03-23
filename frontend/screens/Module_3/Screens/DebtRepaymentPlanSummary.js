import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { fonts, sh, sw } from '../../../styles/GlobalStyles';
import { mockData3 } from '../MockData/mockData';
import DebtRepaymentPlanSummaryImage from '../Utils/DebtRepaymentPlanSummaryImage';
import RenderRepaymentPlanSummaryItem from '../Utils/RenderRepaymentPlanSummaryItem';
import SliderComponent from '../Utils/SliderComponent';
import { calculateDebtAvalanche, calculateDebtSnowball } from '../Utils/repaymentStrategies';






const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    titleStyle: {
        fontSize: sw(18),
        fontFamily: fonts.interSemiBold,
        marginVertical: sh(20),
        marginHorizontal: sw(20),
    },
    repaymentPlanContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '90%',
        height: sh(250),
        marginHorizontal: sw(20),
        marginVertical: sh(10),
        backgroundColor: '#F6F7FA',
        borderRadius: sw(10),
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.05,
    },
    repaymentPlanContainerTitle: {
        fontSize: sw(16),
        fontFamily: fonts.interMedium,
        fontWeight: 'bold',
        color: 'black',
        margin: sw(16),
    },
    inputPaperContainer: {
        flex: 1,
        marginHorizontal: sw(20),
    },
    inputPaper: {
        width: '100%',
        backgroundColor: 'rgba(110, 113, 124, 0.05)',
        fontFamily: fonts.interRegular,
        borderRadius: 10,
        paddingVertical: sh(4),
        marginBottom: sh(4),
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
    },
    resultText: {
        fontSize: sw(16),
        marginHorizontal: sw(20),
        marginBottom: sh(10),
    },
});

function DebtRepaymentPlanSummary({ navigation }) {
    const [extraPayment, setExtraPayment] = useState(0);
    const [snowballResults, setSnowballResults] = useState({ timeToPayOff: '', totalInterestPaid: '' });
    const [avalancheResults, setAvalancheResults] = useState({ timeToPayOff: '', totalInterestPaid: '' });

    const loans = [
        { currentLoan: 250000, totalLoan: 500000, interestRate: 4.0 }, // House Loan
        { currentLoan: 10700, totalLoan: 45000, interestRate: 3.4 }, // Car Loan
        { currentLoan: 10008, totalLoan: 25000, interestRate: 5.5 }, // Personal Loan
    ];


    useEffect(() => {
        const snowball = calculateDebtSnowball(loans, extraPayment);
        const avalanche = calculateDebtAvalanche(loans, extraPayment);
        setSnowballResults(snowball);
        setAvalancheResults(avalanche);
    }, [extraPayment]);


    const DebtRepaymentPlanChoicePage = () => {
        navigation.navigate('DebtRepaymentPlanChoice', {
            snowballYears: snowballResults.timeToPayOff,
            avalancheYears: avalancheResults.timeToPayOff,
        });
    };
    
    const PreviousPage = () => {
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.titleStyle}>Extra Monthly Payment</Text>
                <SliderComponent extraPayment={extraPayment} setExtraPayment={setExtraPayment} />


                <Text style={styles.resultText}>
                    Snowball Method: {snowballResults.timeToPayOff-1.5} years
                </Text>
                <Text style={styles.resultText}>
                    Avalanche Method: {avalancheResults.timeToPayOff} years
                </Text>
                
                <Text style={styles.titleStyle}>Plan summary</Text>
                {mockData3.map(({ image, itemName, firstTitle, firstContent, secondTitle, secondContent, index }) => (
                    <RenderRepaymentPlanSummaryItem
                        key={index}
                        image={image}
                        itemName={itemName}
                        firstTitle={firstTitle}
                        firstContent={firstContent}
                        secondTitle={secondTitle}
                        secondContent={secondContent}
                        index={index}
                    />
                ))}
               
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: sh(20),
                        
                        zIndex: 99,
                    }}
                    onPress={DebtRepaymentPlanChoicePage}
                >
                    <DebtRepaymentPlanSummaryImage />
                </TouchableOpacity>

                <Text style={[styles.titleStyle, { marginTop: sh(40) }]}>Step-by-Step Repayment Plan</Text>
                <View style={styles.repaymentPlanContainer}>
                    <Text style={styles.repaymentPlanContainerTitle}>House Loan</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default DebtRepaymentPlanSummary;
