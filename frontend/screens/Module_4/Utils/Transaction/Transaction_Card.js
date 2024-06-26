import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { sw, sh, fonts, colors } from '../../../../styles/GlobalStyles';
import ShoppingSVG from './ShoppingSVG';
import EntertainmentSVG from './EntertainmentSVG';
import FoodSVG from './FoodSVG';
import SalarySVG from './SalarySVG';
import TransportationSVG from './TransportationSVG';
import ScholarshipSVG from './ScholarshipSVG';
import OtherSVG from './OtherSVG';
import IncomeOtherSVG from './IncomeOtherSVG';
import HousingSVG from './HousingSVG';
import HealthSVG from './HealthSVG';
import EducationSVG from './EducationSVG';
import GiftSVG from './GiftSVG';
const Transaction_Card = ({ category, description, amount, type, time }) => {
    return (
        <View
            style={[
                styles.rowContainer,
                {
                    paddingHorizontal: sw(10),
                    paddingVertical: sh(10),
                    gap: 10,
                    justifyContent: 'space-between',
                },
            ]}
        >
            <View style={[styles.rowContainer, { gap: 15 }]}>
                {category === 'SHOPPING' && <ShoppingSVG />}
                {category === 'ENTERTAINMENT' && <EntertainmentSVG />}
                {category === 'FOOD' && <FoodSVG />}
                {category === 'TRANSPORTATION' && <TransportationSVG />}
                {category === 'SCHOLARSHIP' && <ScholarshipSVG />}
                {category === 'OTHER' && type === 'EXPENSE' && <OtherSVG />}
                {category === 'OTHER' && type === 'INCOME' && <IncomeOtherSVG />}
                {category === 'HEALTH' && <HealthSVG />}
                {category === 'HOUSING' && <HousingSVG />}
                {category === 'EDUCATION' && <EducationSVG />}
                {category === 'GIFTS' && <GiftSVG />}
                {category === 'SALARY' && <SalarySVG />}

                <View style={[styles.columnContainer, { justifyContent: 'space-between' }]}>
                    <Text style={[styles.cardTitle, { marginTop: sh(5) }]}>{description}</Text>
                    <Text
                        style={[
                            styles.cardDescription,
                            {
                                alignSelf: 'flex-start',
                                marginBottom: sh(5),
                                color: '#91919F',
                            },
                        ]}
                    >
                        {category}
                    </Text>
                </View>
            </View>

            <View
                style={[
                    styles.columnContainer,
                    {
                        justifyContent: 'space-between',
                    },
                ]}
            >
                <Text
                    style={
                        type === 'EXPENSE'
                            ? [
                                  styles.cardTitle,
                                  {
                                      marginTop: sh(5),
                                      alignSelf: 'flex-end',
                                      color: '#FD3C4A',
                                  },
                              ]
                            : [
                                  styles.cardTitle,
                                  {
                                      marginTop: sh(5),
                                      alignSelf: 'flex-end',
                                      color: '#00A86B',
                                  },
                              ]
                    }
                >
                    {type === 'EXPENSE' ? `-RM ${amount}` : `+RM ${amount}`}
                </Text>
                <Text
                    style={[
                        styles.cardDescription,
                        {
                            alignSelf: 'flex-end',
                            marginBottom: sh(5),
                            alignSelf: 'flex-end',
                            color: '#91919F',
                        },
                    ]}
                >
                    {time}
                </Text>
            </View>
        </View>
    );
};

export default Transaction_Card;

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
