import React, { useRef, useState } from 'react';
import {
    Keyboard,
    ScrollView,
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    SafeAreaView,
    GestureResponderEvent,
} from 'react-native';
import { fonts, sw, sh } from '../../../styles/GlobalStyles';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import { Url } from '../../../url';

const styles = StyleSheet.create({
    widgetContainer: {
        flex: 1,
        flexDirection: 'column',
        marginHorizontal: sw(20),
        marginVertical: sh(10),
        paddingVertical: sh(10),
        backgroundColor: '#F6F7FA',
        borderRadius: sw(10),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    topContainer: {
        flexDirection: 'row',
        borderBottomColor: '#E5E5E5',
        borderBottomWidth: sw(1),
        marginHorizontal: sw(20),
        paddingVertical: sh(10),
    },
    titleStyle: {
        fontSize: sw(20),
        fontWeight: '500',
        color: '#5F84A1',
    },
    contentContainer: {
        flex: 1,
        flexDirection: 'column',
        marginHorizontal: sw(20),
        marginVertical: sh(10),
    },
    contentTextStyle: {
        fontSize: sw(14),
        fontFamily: fonts.interRegular,
        color: 'black',
        marginVertical: sh(4),
    },
    buttonContainer: {
        backgroundColor: '#5F84A1',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: sh(10),
        paddingHorizontal: sw(50),
        borderRadius: sw(20),
        zIndex: 99,
    },
    buttonText: {
        fontSize: sw(14),
        fontFamily: fonts.interMedium,
        color: 'white',
    },
    footer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: sh(16),
    },
});

export const SmallBottomButton = ({ value, navigation }) => {
    return (
        <View style={styles.footer}>
            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={navigation}
            >
                <Text style={styles.buttonText}>{value}</Text>
            </TouchableOpacity>
        </View>
    );
};

const PaymentStrategyContainer = ({
    userId,
    navigation,
    title,
    content1,
    content2,
    content3,
    content4,
    content5,
    index,
    debt_free_date,
    extraPayment,
    fetchData,
}) => {
    const updateSnowballStrategy = async () => {
        try {
            await axios.patch(`http://${Url}:3000/users/update/${userId}`, {
                extra_payment: parseFloat(extraPayment),
                strategy: 'SNOWBALL',
            });
        } catch (error) {
            console.error('Error updating loan:', error);
        }
    };

    const updateAvalancheStrategy = async () => {
        try {
            await axios.patch(`http://${Url}:3000/users/update/${userId}`, {
                extra_payment: parseFloat(extraPayment),
                strategy: 'AVALANCHE',
                debt_free_date: debt_free_date,
            });
        } catch (error) {
            console.error('Error updating loan:', error);
        }
    };

    const DebtMainPage = () => {
        title == 'Debt Snowball' ? updateSnowballStrategy() : updateAvalancheStrategy();
        fetchData();
        navigation.navigate('DebtRepaymentPlanSummary');
    };

    return (
        <Animated.View
            style={styles.widgetContainer}
            entering={FadeInDown.delay(index * 200)}
            exiting={FadeOutDown}
        >
            <View style={styles.topContainer}>
                <Text style={styles.titleStyle}>{title}</Text>
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.contentTextStyle}>{content1}</Text>
                <Text style={styles.contentTextStyle}>{content2}</Text>
                <Text style={styles.contentTextStyle}>{content3}</Text>
                <Text style={styles.contentTextStyle}>{content4}</Text>
                <Text style={styles.contentTextStyle}>{content5}</Text>
                <SmallBottomButton
                    value="Select"
                    navigation={DebtMainPage}
                />
            </View>
        </Animated.View>
    );
};

export default PaymentStrategyContainer;
