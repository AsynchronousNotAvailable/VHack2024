import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text
} from 'react-native';
import { fonts, sh, sw } from '../../../styles/GlobalStyles';
import { mockData4 } from '../MockData/mockData';
import PaymentStrategyContainer from '../Utils/RenderStrategyContainer';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
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

function DebtRepaymentPlanChoice({ navigation, route  }) {
    const { snowballYears, avalancheYears } = route.params;
    const DebtMainPage = () => {
        navigation.navigate('DebtMain');
    };
    const PreviousPage = () => {
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* <AppBar
                    title="Strategy"
                    navigation={PreviousPage}
                /> */}
                <Text style={styles.titleStyle}>Select a payment priority</Text>
                {mockData4.map(({ title, content1, content2, content3, content4, content5, index }) => {
                    let dynamicContent3 = title === "Debt Snowball" ? `PayOff Years:${snowballYears-1.5} years` : content3;
                    let dynamicContent4 = title === "Debt Avalanche" ? `PayOff Years:${avalancheYears} years` : content3;

                    return (
                        <PaymentStrategyContainer
                            navigation={navigation}
                            title={title}
                            content1={content1}
                            content2={content2}
                            content3={dynamicContent3}
                            content4={dynamicContent4}
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
