import React from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    SafeAreaView,
    ImageSourcePropType,
} from 'react-native';
import { sw, sh } from '../../../styles/GlobalStyles';
import AppBar from '../Utils/AppBar';
import PlusButton from '../Utils/RenderSummaryPlusButton';
import RenderWidget1 from '../Utils/RenderSummaryWidget1';
import RenderWidget2 from '../Utils/RenderSummaryWidget2';
import { mockData1, mockData2 } from '../MockData/mockData';

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

function DebtSummary() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <AppBar title="Debt Summary" />
                <View style={styles.subtitleContainer}>
                    <Text style={styles.text}>Current Loans</Text>
                    <PlusButton />
                </View>
                {mockData1.map(({ image, backgroundColor, itemName, expiryDate, currentLoan, totalLoan, index }) => {
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
                    <PlusButton />
                </View>
                {mockData2.map(({ image, backgroundColor, itemName, paymentDate, upcomingBills, index }) => {
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
