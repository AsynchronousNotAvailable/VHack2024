import React from 'react';
import DonutChartContainer from '../Utils/DonutChartContainer';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { sw, sh, colors, fonts } from '../../../styles/GlobalStyles';
import Animated from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import DebtMainBottomImage from '../Utils/DebtMainBottomImage';
import * as Progress from 'react-native-progress';
// Can be passed into DonutChartContainer if we wanna make it dynamic
// const chart_data = {
//     labels: ['Netflix', 'Unifi', 'Electric', 'Car', 'House'],
//     data: [206.4, 361.19, 412.79, 644.99, 1212.58],
//     backgroundColor: ['#E5D8FF', '#FFF0D4', '#FDCED0', '#CAFDEA', '#BCDAFC'],
// };

const styles = StyleSheet.create({
    container: {
        alignContent: 'center',
    },
    twoBoxesContainer: {
        marginTop: sh(10),
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
        borderRadius: sw(20),
        backgroundColor: 'transparent',
        paddingHorizontal: sw(10),
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: sw(10),
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
        marginVertical: sh(15),
    },
    principlePaidAndBalanceText: {
        fontSize: sw(20),
        fontWeight: '400',
        padding: sw(10),
    },
    bottomTextContainer: {
        flex: 0.7,
        flexDirection: 'column',
    },
    bottomImageContainer: {
        flex: 0.2,
    },
});

const principlePaidAndBalanceTextColour = (colourCode, fontSize) => {
    return StyleSheet.create({
        principlePaidAndBalanceText: {
            color: `${colourCode}`,
            fontSize: sw(`${fontSize}`),
            fontWeight: '400',
            // padding: sw(5),
            marginBottom: sh(2),
        },
    });
};

const progressBarStyles = (percentage) => {
    return StyleSheet.create({
        principleProgressBar: {
            backgroundColor: '#82B5B2',
            width: `${percentage}%`, // Set width as percentage string
            borderRadius: sw(10),
        },
    });
};

const monthlyLoansText = 3120.35;
const overdueAmount = 661.43;
const totalDebt = 570000;
const principlePaid = 170701;
const balance = 399299;
const progressBarNumber = (principlePaid / (principlePaid + balance)) * 100;
const progressBarPercentage = progressBarStyles(progressBarNumber);
const greenPrinciplePaidText = principlePaidAndBalanceTextColour('#82B5B2', 15);
const redBalanceText = principlePaidAndBalanceTextColour('#F27F71', 15);
const greenPrinciplePaidNumber = principlePaidAndBalanceTextColour('#82B5B2', 20);
const redBalanceNumber = principlePaidAndBalanceTextColour('#F27F71', 20);

function DebtMain({ navigation }) {
    const DebtSummaryPage = () => {
        navigation.navigate('DebtSummary');
    };
    const DebtRepaymentPlanSummaryPage = () => {
        navigation.navigate('DebtRepaymentPlanSummary');
    };

    return (
        <LinearGradient
            colors={['#DFEEF8', '#FFFFFF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={{ flex: 1 }}
        >
            <SafeAreaView style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text
                        style={{
                            alignSelf: 'center',
                            fontSize: 22,
                            fontFamily: fonts.interSemiBold,
                            marginBottom: sh(20),
                        }}
                    >
                        Debt
                    </Text>
                    <DonutChartContainer />
                    <View style={styles.twoBoxesContainer}>
                        <View style={styles.boxContainer}>
                            <Text style={styles.monthlyLoansTitleText}>Monthly Loans</Text>
                            <Text style={styles.monthlyLoansText}>RM{monthlyLoansText}</Text>
                        </View>
                        <View style={styles.boxContainer2}>
                            <Text style={styles.overdueTitleText}>Overdue</Text>
                            <Text style={styles.overdueText}>RM{overdueAmount}</Text>
                        </View>
                    </View>
                    <View style={styles.totalDebtAndSeeAllButton}>
                        <Text style={{ fontSize: sw(20), padding: sw(10) }}>Total Debts</Text>
                        <TouchableOpacity
                            style={styles.seeAllButton}
                            onPress={DebtSummaryPage}
                        >
                            <Text style={{ alignItems: 'center', justifyContent: 'center' }}>See All</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={[styles.totalDebtAmount, { marginBottom: sh(5) }]}>RM {totalDebt}</Text>
                    <View style={{ alignItems: 'center' }}>
                        {/* <Animated.View style={progressBarPercentage.principleProgressBar} /> */}
                        <Progress.Bar
                            backgroundColor="#FCA59A"
                            progress={0.5}
                            color="#B5FFE3"
                            width={sw(370)}
                            height={sh(15)}
                            borderWidth={0}
                        />
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
                            // marginBottom: sh(-10),
                            marginBottom: sh(10),
                            zIndex: 99,
                        }}
                        onPress={DebtRepaymentPlanSummaryPage}
                    >
                        <View
                            style={{
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,
                                elevation: 5,
                            }}
                        >
                            <DebtMainBottomImage />
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
}

export default DebtMain;
