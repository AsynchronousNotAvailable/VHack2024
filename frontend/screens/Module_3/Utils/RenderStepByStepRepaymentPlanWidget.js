import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import { sw, sh, fonts } from '../../../styles/GlobalStyles';
import NetflixSVG from './NetflixSVG';
import TnbSVG from './TnbSVG';
import CarSVG from './CarSVG';
import HouseSVG from './HouseSVG';
import UnifiSVG from './UnifiSVG';
import PersonalSVG from './PersonalSVG';
import EducationSVG from './EducationSVG';
import LoanSVG from './LoanSVG';

const styles = StyleSheet.create({
    widgetContainer: {
        flex: 1,
        flexDirection: 'column',
        width: '90%',
        marginHorizontal: sh(20),
        paddingVertical: sh(16),
        margin: sh(10),
        backgroundColor: '#F6F7FA',
        borderRadius: sw(10),
        justifyContent: 'space-between',
        shadowOffset: { width: 0, height: 0 },
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    contentContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: sw(20),
        marginVertical: sh(2),
    },
    titleText: {
        fontSize: sw(16),
        fontFamily: fonts.interMedium,
        color: 'black',
    },
    payoffText: {
        fontSize: sw(12),
        fontFamily: fonts.interRegular,
        color: 'white',
    },
    monthlyPaymentText: {
        fontSize: sw(14),
        fontFamily: fonts.interRegular,
        color: 'black',
        marginBottom: sh(4),
    },
    smallText: {
        fontSize: sw(12),
        fontFamily: fonts.interRegular,
        color: '#49464C',
    },
    payoffContainer: {
        backgroundColor: '#5F84A1',
        paddingVertical: sh(6),
        paddingHorizontal: sw(12),
        borderTopRightRadius: sh(10),
        borderTopLeftRadius: sh(10),
        borderBottomRightRadius: sh(10),
    },
});

const RenderStepByStepRepaymentPlanWidget = ({ loanName, payment_month_remaining, payment_end_date, index }) => {
    return (
        <Animated.View
            style={styles.widgetContainer}
            entering={FadeInDown.delay(index * 200)}
            exiting={FadeOutDown}
        >
            <View style={[styles.contentContainer]}>
                <Text style={styles.titleText}>{loanName}</Text>
                <View style={styles.payoffContainer}>
                    <Text style={styles.payoffText}>Payoff</Text>
                </View>
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.monthlyPaymentText}>Monthly Payment x{payment_month_remaining}</Text>
                <Text style={styles.smallText}>{payment_end_date}</Text>
            </View>
        </Animated.View>
    );
};

export default RenderStepByStepRepaymentPlanWidget;
