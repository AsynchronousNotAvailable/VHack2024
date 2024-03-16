import React from 'react';
import DonutChartContainer from '../Utils/DonutChartContainer';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { sw, sh, colors } from '../../../styles/GlobalStyles';
import Animated from 'react-native-reanimated';
// Can be passed into DonutChartContainer if we wanna make it dynamic
// const chart_data = {
//     labels: ['Netflix', 'Unifi', 'Electric', 'Car', 'House'],
//     data: [206.4, 361.19, 412.79, 644.99, 1212.58],
//     backgroundColor: ['#E5D8FF', '#FFF0D4', '#FDCED0', '#CAFDEA', '#BCDAFC'],
// };

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    twoBoxesContainer: {
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
        borderRadius: sw(10),
        backgroundColor: 'transparent',
        padding: sw(10),
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
        marginVertical: sh(5),
    },
    principlePaidAndBalanceText: {
        fontSize: sw(20),
        fontWeight: '400',
        padding: sw(10),
    },
});

const principlePaidAndBalanceTextColour = (colourCode: string, fontSize: number) => {
    return StyleSheet.create({
        principlePaidAndBalanceText: {
            color: `${colourCode}`,
            fontSize: sw(`${fontSize}`),
            fontWeight: '400',
            padding: sw(5),
        },
    });
};

const progressBarStyles = (percentage: number) => {
    return StyleSheet.create({
        principleProgressBar: {
            backgroundColor: '#82B5B2',
            width: `${percentage}%`, // Set width as percentage string
            borderRadius: sw(10),
        },
    });
};

const monthlyLoans: number = 2113.39;
const overdueAmount: number = 541.73;
const principlePaid: number = 250000;
const balance: number = 400000;
const progressBarNumber: number = (principlePaid / (principlePaid + balance)) * 100;
const progressBarPercentage = progressBarStyles(progressBarNumber);
const greenPrinciplePaidText = principlePaidAndBalanceTextColour('#82B5B2', 15);
const redBalanceText = principlePaidAndBalanceTextColour('#F27F71', 15);
const greenPrinciplePaidNumber = principlePaidAndBalanceTextColour('#82B5B2', 20);
const redBalanceNumber = principlePaidAndBalanceTextColour('#F27F71', 20);

function DebtMain() {
    return (
        <LinearGradient
            colors={['#DFEEF8', '#FFFFFF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={{ flex: 1 }}
        >
            <SafeAreaView style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <DonutChartContainer />
                    <View style={styles.twoBoxesContainer}>
                        <View style={styles.boxContainer}>
                            <Text style={styles.monthlyLoansTitleText}>Monthly Loans</Text>
                            <Text style={styles.monthlyLoansText}>RM{monthlyLoans}</Text>
                        </View>
                        <View style={styles.boxContainer2}>
                            <Text style={styles.overdueTitleText}>Overdue</Text>
                            <Text style={styles.overdueText}>RM{overdueAmount}</Text>
                        </View>
                    </View>
                    <View style={styles.totalDebtAndSeeAllButton}>
                        <Text style={{ fontSize: sw(20), fontWeight: 'bold', padding: sw(10) }}>Total Debts</Text>
                        <TouchableOpacity style={styles.seeAllButton}>
                            <Text style={{ alignItems: 'center', justifyContent: 'center' }}>See All</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.totalDebtAmount}>RM 650,000</Text>
                    <View style={styles.balanceProgressBar}>
                        <Animated.View style={progressBarPercentage.principleProgressBar} />
                    </View>
                    <View style={styles.principlePaidAndBalanceContainer}>
                        <View>
                            <Text style={greenPrinciplePaidText.principlePaidAndBalanceText}>Total Debts</Text>
                            <Text style={greenPrinciplePaidNumber.principlePaidAndBalanceText}>RM{principlePaid}</Text>
                        </View>
                        <View>
                            <Text style={redBalanceText.principlePaidAndBalanceText}>Balance</Text>
                            <Text style={redBalanceNumber.principlePaidAndBalanceText}>RM{balance}</Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: sh(-10),
                        }}
                    >
                        <Image
                            source={require('../../../assets/images/Module_3_First_Page_Image1.png')}
                            resizeMode="contain"
                            style={{ flex: 1 }}
                        />
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
}

export default DebtMain;