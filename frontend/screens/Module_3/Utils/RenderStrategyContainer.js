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

const styles = StyleSheet.create({
    widgetContainer: {
        flex: 1,
        flexDirection: 'column',
        marginHorizontal: sw(20),
        marginVertical: sh(10),
        paddingVertical: sh(10),
        backgroundColor: '#F6F7FA',
        borderRadius: sw(10),
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
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

export const SmallBottomButton = ({value, navigation}) => {
    return (
        <View style={styles.footer}>
            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={navigation}
            >
                <TextInput style={styles.buttonText}>{value}</TextInput>
            </TouchableOpacity>
        </View>
    );
};

const PaymentStrategyContainer = ({navigation, title, content1, content2, content3, content4, content5, index}) => {
    const DebtMainPage = () => {
        navigation.navigate('DebtMain');
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
