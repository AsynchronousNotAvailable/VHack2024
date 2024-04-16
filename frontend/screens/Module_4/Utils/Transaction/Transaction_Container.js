import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { sw, sh, fonts, colors } from '../../../../styles/GlobalStyles';
import Transaction_Card from './Transaction_Card';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

const Transaction_Container = ({ transactions }) => {
    const TODAY = new Date();
    
    const getDate = (originalDate) => {
        const year = originalDate.getFullYear();
        const month = (originalDate.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based, so add 1
        const day = originalDate.getDate().toString().padStart(2, '0');

        // Format the date string as YYYY-MM-DD
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    }

    const getYesterday = (originalDate) => {
        const year = originalDate.getFullYear();
        const month = (originalDate.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based, so add 1
        const day = originalDate.getDate().toString().padStart(2, '0')-1;

        // Format the date string as YYYY-MM-DD
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
        
    }
    
    // console.log(getDate(TODAY), getYesterday(TODAY));
    let today = getDate(TODAY);
    let yesterday = getYesterday(TODAY);

    let todayTransactions = []
    let yesterdayTransactions = []
    let otherDayTransactions = []

    const dailyTransactions = [];
    let dict = {   
    }
    transactions.forEach((transaction) => {
        // console.log(transaction.date);
        if (!dict[transaction.date]) {
            dict[transaction.date] = [transaction];
        }
        else {
            dict[transaction.date].push(transaction);
        }
        
    })
    
    //sort by descending
    let sortedDict = Object.entries(dict)
    .sort(([dateA], [dateB]) => new Date(dateB) - new Date(dateA))
    .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
    }, {});

    const adjustTimeFormat = (timeString) => {
        // Split the time string into hours, minutes, and AM/PM
        const [time, period] = timeString.split(' ');
        const [hours, minutes] = time.split(':');

        // Convert hours to 24-hour format
        let adjustedHours = parseInt(hours, 10);
        if (period === 'PM' && adjustedHours !== 12) {
            adjustedHours += 12;
        } else if (period === 'AM' && adjustedHours === 12) {
            adjustedHours = 0;
        }

        // Format the time string as "HH:mm:ss"
        return `${adjustedHours.toString().padStart(2, '0')}:${minutes}:00`;
    };


    return (
        <View style={[styles.columnContainer, { marginHorizontal: sw(20), marginVertical: sh(10) }]}>
            {Object.keys(sortedDict).map((date) => (
                <View key={date}>
                    <Text style={[styles.cardTitle, { fontSize: 18, marginBottom: sh(10) }]}>
                        {date === getDate(TODAY) ? 'Today' : date === getYesterday(TODAY) ? 'Yesterday' : date}
                    </Text>
                    {sortedDict[date]
                        .sort(
                            (a, b) =>
                                new Date(`${getDate(TODAY)}T${adjustTimeFormat(b.time)}`) -
                                new Date(`${getDate(TODAY)}T${adjustTimeFormat(a.time)}`),
                        )
                        .map((item, index) => (
                            <Transaction_Card
                                key={index}
                                category={item.category}
                                description={item.description}
                                type={item.type}
                                amount={item.amount}
                                time={item.time}
                            />
                        ))}
                </View>
            ))}

            
        </View>
    );
};

export default Transaction_Container;
const styles = StyleSheet.create({
    cardContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        paddingHorizontal: sw(24),
        paddingVertical: sh(15),
        marginVertical: sh(15),
        marginHorizontal: sw(20),
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

    balanceContainer: {
        flexDirection: 'column',
        gap: 4,
    },
    cardTitle: {
        fontFamily: fonts.interSemiBold,
        color: colors.black,
    },
    cardDescription: {
        fontFamily: fonts.interRegular,
        color: colors.black,
    },
    rowContainer: { flexDirection: 'row' },
    columnContainer: { flexDirection: 'column' },
    subTitleContainer: {
        flexDirection: 'row',
        gap: 5,
    },
    subTitleText: {
        fontFamily: fonts.interMedium,
        color: colors.white,
    },
    chartContainer: {
        // marginHorizontal: sw(20),
        flexDirection: 'column',
    },
});
