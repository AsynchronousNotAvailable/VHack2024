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
import { TextInput as TextInputPaper } from 'react-native-paper';
import { BottomButton } from '../Utils/RenderBottomButton';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import RootStackNavigatorParamsList from '../Utils/Module3StackParamsProps';

// import { InputOutline, InputStandard } from 'react-native-input-outline';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
    },
    inputContainer: {
        flex: 1,
        margin: sw(20),
    },
    inputPaper: {
        width: '100%',
        backgroundColor: 'rgba(110, 113, 124, 0.05)',
        fontFamily: fonts.interRegular,
        borderRadius: 10,
        paddingVertical: sh(4),
        marginVertical: sh(6),
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
    },
});

function DebtAddExistingLoan() {
    const [loanName, setLoanName] = useState<string>('');
    const [loanAmount, setLoanAmount] = useState<string>('');
    const [tenureYears, setTenureYears] = useState<string>('');
    const [interestRate, setInterestRate] = useState<string>('');
    const [startingYear, setStartingYear] = useState<string>('');

    // Reference for all constant
    const loanAmountRef = useRef<TextInput>(null);
    const tenureYearsRef = useRef<TextInput>(null);
    const interestRateRef = useRef<TextInput>(null);
    const startingYearRef = useRef<TextInput>(null);
    const [error, setError] = useState<string | undefined>(undefined);

    const navigation = useNavigation<StackNavigationProp<RootStackNavigatorParamsList>>();
    const DebtAddExistingLoan2Page = () => {
        navigation.navigate('DebtAddExistingLoan2');
    };
    const PreviousPage = () => {
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <AppBar
                    title="Add Loan"
                    navigation={PreviousPage}
                />
                <View style={styles.contentContainer}>
                    <View style={styles.inputContainer}>
                        <TextInputPaper
                            style={styles.inputPaper}
                            placeholder="Loan Name"
                            label="Loan Name"
                            mode="outlined"
                            keyboardType="default"
                            returnKeyType="next"
                            autoCapitalize="none"
                            onChangeText={(loanName: string) => {
                                setLoanName(loanName);
                            }}
                            onSubmitEditing={() => {
                                loanAmountRef.current?.focus();
                            }}
                        />
                        <TextInputPaper
                            style={styles.inputPaper}
                            placeholder="RM"
                            label="Enter Loan Amount"
                            mode="outlined"
                            ref={loanAmountRef}
                            keyboardType="default"
                            returnKeyType="next"
                            autoCapitalize="none"
                            onChangeText={(loanAmount: string) => {
                                setLoanAmount(loanAmount);
                            }}
                            onSubmitEditing={() => {
                                tenureYearsRef.current?.focus();
                            }}
                        />
                        <TextInputPaper
                            style={styles.inputPaper}
                            placeholder="Yrs"
                            label="Enter Tenure (Years)"
                            mode="outlined"
                            ref={tenureYearsRef}
                            keyboardType="default"
                            returnKeyType="next"
                            autoCapitalize="none"
                            onChangeText={(tenureYears: string) => {
                                setTenureYears(tenureYears);
                            }}
                            onSubmitEditing={() => {
                                interestRateRef.current?.focus();
                            }}
                        />
                        <TextInputPaper
                            style={styles.inputPaper}
                            placeholder="%"
                            label="Enter Interest Rate"
                            mode="outlined"
                            ref={interestRateRef}
                            keyboardType="default"
                            returnKeyType="next"
                            autoCapitalize="none"
                            onChangeText={(interestRate: string) => {
                                setInterestRate(interestRate);
                            }}
                            onSubmitEditing={() => {
                                startingYearRef.current?.focus();
                            }}
                        />
                        <TextInputPaper
                            style={styles.inputPaper}
                            placeholder=""
                            label="Start From (Year)"
                            mode="outlined"
                            ref={startingYearRef}
                            keyboardType="default"
                            returnKeyType="next"
                            autoCapitalize="none"
                            onChangeText={(startingYear: string) => {
                                setStartingYear(startingYear);
                            }}
                            onSubmitEditing={() => {
                                startingYearRef.current?.focus();
                            }}
                        />
                    </View>
                </View>
            </ScrollView>
            <BottomButton
                value="Continue"
                navigation={DebtAddExistingLoan2Page}
            />
        </SafeAreaView>
    );
}

export default DebtAddExistingLoan;
