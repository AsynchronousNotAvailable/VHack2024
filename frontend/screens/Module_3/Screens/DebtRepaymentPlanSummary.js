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
} from 'react-native';
import { TextInput as TextInputPaper } from 'react-native-paper';
import { fonts, sw, sh } from '../../../styles/GlobalStyles';
import AppBar from '../Utils/AppBar';
import RenderRepaymentPlanSummaryItem from '../Utils/RenderRepaymentPlanSummaryItem';
import DebtRepaymentPlanSummaryImage from '../Utils/DebtRepaymentPlanSummaryImage';
import { mockData3 } from '../MockData/mockData';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    titleStyle: {
        fontSize: sw(18),
        fontFamily: fonts.interSemiBold,
        marginVertical: sh(20),
        marginHorizontal: sw(20),
    },
    repaymentPlanContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '90%',
        height: sh(250),
        marginHorizontal: sw(20),
        marginVertical: sh(10),
        backgroundColor: '#F6F7FA',
        borderRadius: sw(10),
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.05,
    },
    repaymentPlanContainerTitle: {
        fontSize: sw(16),
        fontFamily: fonts.interMedium,
        fontWeight: 'bold',
        color: 'black',
        margin: sw(16),
    },
    inputPaperContainer: {
        flex: 1,
        marginHorizontal: sw(20),
    },
    inputPaper: {
        width: '100%',
        backgroundColor: 'rgba(110, 113, 124, 0.05)',
        fontFamily: fonts.interRegular,
        borderRadius: 10,
        paddingVertical: sh(4),
        marginBottom: sh(4),
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
    },
});

function DebtRepaymentPlanSummary({ navigation }) {
    const [extraPayment, setExtraPayment] = useState(0);

    const DebtRepaymentPlanChoicePage = () => {
        navigation.navigate('DebtRepaymentPlanChoice');
    };
    const PreviousPage = () => {
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* <AppBar
                    title="Repayment Plan"
                    navigation={PreviousPage}
                /> */}
                <Text style={styles.titleStyle}>Extra Monthly Payment</Text>
                <View style={styles.inputPaperContainer}>
                    <TextInputPaper
                        style={styles.inputPaper}
                        placeholder="RM"
                        label="Extra Payment"
                        mode="outlined"
                        keyboardType="default"
                        returnKeyType="next"
                        autoCapitalize="none"
                        onChangeText={(extraPayment) => {
                            setExtraPayment(extraPayment);
                        }}
                    />
                </View>
               
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: sh(20),
                        
                        zIndex: 99,
                    }}
                    onPress={DebtRepaymentPlanChoicePage}
                >
                    <DebtRepaymentPlanSummaryImage />
                </TouchableOpacity>
                <Text style={styles.titleStyle}>Plan summary</Text>
                {mockData3.map(({ image, itemName, firstTitle, firstContent, secondTitle, secondContent, index }) => {
                    return (
                        <RenderRepaymentPlanSummaryItem
                            image={image}
                            itemName={itemName}
                            firstTitle={firstTitle}
                            firstContent={firstContent}
                            secondTitle={secondTitle}
                            secondContent={secondContent}
                            index={index}
                            key={index}
                        />
                    );
                })}
                <Text style={[styles.titleStyle, { marginTop: sh(40) }]}>Step-by-Step Repayment Plan</Text>
                <View style={styles.repaymentPlanContainer}>
                    <Text style={styles.repaymentPlanContainerTitle}>House Loan</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default DebtRepaymentPlanSummary;
