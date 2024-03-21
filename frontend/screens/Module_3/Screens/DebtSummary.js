import React, {useState, useEffect} from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    SafeAreaView,
} from 'react-native';
import { sw, sh } from '../../../styles/GlobalStyles';
import AppBar from '../Utils/AppBar';
import PlusButton from '../Utils/RenderSummaryPlusButton';
import RenderWidget1 from '../Utils/RenderSummaryWidget1';
import RenderWidget2 from '../Utils/RenderSummaryWidget2';
import { mockData1, mockData2 } from '../MockData/mockData';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: sh(10),
        borderBottomColor: '#E5E5E5',
        borderBottomWidth: sw(1),
    },
    subtitleContainer: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: sw(20),
        marginTop: sh(16),
        marginBottom: sh(8),
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    color: {
        width: sw(20),
        height: sh(20),
        borderRadius: sw(10),
    },
    text: {
        fontSize: sw(20),
        fontWeight: '500',
        color: 'black',
    },
    chevronLeftStyle: {
        position: 'absolute',
        top: sh(10),
        left: sw(20),
        aspectRatio: 1,
        width: sw(30),
    },
});

const mockData_1 = mockData1
const mockData_2 = mockData2

function DebtSummary({navigation}) {
    const [mockData1, setMockData1] = useState(mockData_1);
    const [mockData2, setMockData2] = useState(mockData_2);

    const updateMockData1 = (newData) => {
        setMockData1(newData);
    };

    const updateMockData2 = (newData) => {
        setMockData2(newData);
    };

    const sortedMockData1 = [...mockData1].sort((a, b) => {
        const dateA = new Date(a.expiryDate.split('/').reverse().join('-'));
        const dateB = new Date(b.expiryDate.split('/').reverse().join('-'));   
        return dateA - dateB;
    });

    const sortedMockData2 = [...mockData2].sort((a, b) => {
        const dateA = new Date(a.paymentDate.split('/').reverse().join('-'));
        const dateB = new Date(b.paymentDate.split('/').reverse().join('-'));   
        return dateA - dateB;
    });

    const DebtAddExistingLoanPage = () => {
        navigation.navigate('DebtAddExistingLoan', {
            mockData1: mockData1,
            setMockData1: updateMockData1
        });
    };
    const DebtAddUpcomingBillPage = () => {
        navigation.navigate('DebtAddUpcomingBill', {
            mockData2: mockData2,
            setMockData2: updateMockData2
        });
    };
    const PreviousPage = () => {
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <AppBar
                    title="Debt Summary"
                    navigation={PreviousPage}
                />
                <View style={styles.subtitleContainer}>
                    <Text style={styles.text}>Current Loans</Text>
                    <PlusButton navigation={DebtAddExistingLoanPage} />
                </View>
                {sortedMockData1.map(({ image, backgroundColor, itemName, expiryDate, currentLoan, totalLoan, index }) => {
                    return (
                        <RenderWidget1
                            image={image}
                            backgroundColor={backgroundColor}
                            itemName={itemName}
                            expiryDate={expiryDate}
                            currentLoan={currentLoan}
                            totalLoan={totalLoan}
                            index={index}
                            key={index}
                        />
                    );
                })}
                <View style={styles.subtitleContainer}>
                    <Text style={styles.text}>Upcoming Bills</Text>
                    <PlusButton navigation={DebtAddUpcomingBillPage} />
                </View>
                {sortedMockData2.map(({ image, backgroundColor, itemName, paymentDate, upcomingBills, index }) => {
                    return (
                        <RenderWidget2
                            image={image}
                            backgroundColor={backgroundColor}
                            itemName={itemName}
                            paymentDate={paymentDate}
                            upcomingBills={upcomingBills}
                            index={index}
                            key={index}
                        />
                    );
                })}
                <View style={{ height: sh(16) }}></View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default DebtSummary;
