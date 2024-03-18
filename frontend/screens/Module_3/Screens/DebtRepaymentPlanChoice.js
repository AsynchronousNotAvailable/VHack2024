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
    ImageSourcePropType,
} from 'react-native';
import { fonts, sw, sh } from '../../../styles/GlobalStyles';
import AppBar from '../Utils/AppBar';
import { mockData4 } from '../MockData/mockData';
import PaymentStrategyContainer from '../Utils/RenderStrategyContainer';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleStyle: {
        fontSize: sw(18),
        fontFamily: fonts.interRegular,
        fontWeight: 'bold',
        marginVertical: sh(20),
        marginHorizontal: sw(20),
        textAlign: 'center',
    },
});

function DebtRepaymentPlanChoice({navigation}) {
    const DebtMainPage = () => {
        navigation.navigate('DebtMain');
    };
    const PreviousPage = () => {
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <AppBar
                    title="Strategy"
                    navigation={PreviousPage}
                />
                <Text style={styles.titleStyle}>Select a payment priority</Text>
                {mockData4.map(({ title, content1, content2, content3, content4, content5, index }) => {
                    return (
                        <PaymentStrategyContainer
                            navigation={navigation}
                            title={title}
                            content1={content1}
                            content2={content2}
                            content3={content3}
                            content4={content4}
                            content5={content5}
                            index={index}
                            key={index}
                        />
                    );
                })}
            </ScrollView>
        </SafeAreaView>
    );
}

export default DebtRepaymentPlanChoice;
