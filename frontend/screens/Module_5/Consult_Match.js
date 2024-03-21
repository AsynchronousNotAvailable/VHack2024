import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Slider } from 'react-native-elements';
import { fonts, sh, sw } from "../../styles/GlobalStyles";
import { Ionicons } from '@expo/vector-icons';

const CustomButton = ({ value, onPress, selected }) => {
    return (
        <TouchableOpacity
            style={[styles.button, selected && styles.selectedButton]}
            onPress={() => onPress(value)}
        >
            <Text style={[styles.buttonText, selected && { color: '#5F84A1' }]}>{value}</Text>
        </TouchableOpacity>
    );
};

const Consult_Match = ({ navigation, route }) => {
    const [financialChallenges, setFinancialChallenges] = useState([]);
    const [adviceSeeking, setAdviceSeeking] = useState([]);
    const [knowledgeLevel, setKnowledgeLevel] = useState("Intermediate");
    const [debtAmount, setDebtAmount] = useState(0);
    const [selectedAdvices, setSelectedAdvices] = useState([]);
    const { advisors } = route.params;

    const handleFinancialChallenges = (challenge) => {
        if (financialChallenges.includes(challenge)) {
            setFinancialChallenges(financialChallenges.filter(item => item !== challenge));
        } else {
            setFinancialChallenges([...financialChallenges, challenge]);
        }
    };

    const handleAdviceSeeking = (advice) => {
        if (adviceSeeking.includes(advice)) {
            setAdviceSeeking(adviceSeeking.filter(item => item !== advice));
            setSelectedAdvices(selectedAdvices.filter(item => item !== advice));
        } else {
            setAdviceSeeking([...adviceSeeking, advice]);
            setSelectedAdvices([...selectedAdvices, advice]);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.question}>What specific financial challenges are you currently facing?</Text>
            <View style={styles.buttonContainer}>
                {['Debt management and repayment', 'Budgeting & Saving', 'Investment planning', 'Retirement planning', 'Other'].map((challenge, index) => (
                    <CustomButton
                        key={index}
                        value={challenge}
                        onPress={handleFinancialChallenges}
                        selected={financialChallenges.includes(challenge)}
                    />
                ))}
            </View>
            <Text style={styles.question}>What advice are you seeking?</Text>
            <View style={styles.buttonContainer}>
                {['Debt Consolidation', 'Credit Counselling', 'Debt Settlement', 'Financial Planning', 'Investment Strategies', 'Other'].map((advice, index) => (
                    <CustomButton
                        key={index}
                        value={advice}
                        onPress={handleAdviceSeeking}
                        selected={adviceSeeking.includes(advice)}
                    />
                ))}
            </View>
            <Text style={styles.question}>Rate your current understanding of debt management / financial planning?</Text>
            <View style={styles.buttonContainer}>
                {['Beginner', 'Intermediate', 'Advanced'].map((level, index) => (
                    <CustomButton
                        key={index}
                        value={level}
                        onPress={setKnowledgeLevel}
                        selected={knowledgeLevel === level}
                    />
                ))}
            </View>
            <Text style={styles.question}>What is the total amount of debt you are looking to manage?</Text>
            <View style={styles.sliderContainer}>
                <Slider
                    value={debtAmount}
                    onValueChange={(value) => setDebtAmount(value)}
                    minimumValue={0}
                    maximumValue={1000000}
                    step={1000}
                    thumbTintColor="#F2F4F7"
                    minimumTrackTintColor="#5F84A1"
                    maximumTrackTintColor='#E4E4E6'
                />
                <Text style={styles.sliderValue}>RM {debtAmount}</Text>
            </View>
            <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Consult_TopMatch', { advisors: advisors, selectedAdvices: selectedAdvices })}>
                <Text style={styles.nextText}>Next</Text>
                <Ionicons name="chevron-forward-outline" size={22} color="#FFFFFF" />
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingTop: 14,
    },
    question: {
        fontFamily: fonts.interSemiBold,
        fontSize: sw(17),
        marginBottom: sh(6),
        marginLeft: sw(10),
    },
    buttonContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: sh(18),
    },
    button: {
        margin: 4,
        paddingVertical: sh(10),
        paddingHorizontal: sw(15),
        backgroundColor: '#F6F7FA',
        borderRadius: 20,
        borderColor: '#FFFFFF',
        borderWidth: 1,
    },
    selectedButton: {
        borderColor: '#5F84A1',
        borderWidth: 1,
    },
    buttonText: {
        fontSize: sw(16),
        color: '#8C97A7',
    },
    sliderValue: {
        fontFamily: fonts.interRegular,
        fontSize: sw(16),
        color: "#9D9FA0",
        marginLeft: sw(4),
    },
    sliderContainer: {
        marginLeft: sw(12),
        marginRight: sw(24),
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: sw(124),
        paddingVertical: sh(11),
        marginLeft: sw(244),
        backgroundColor: '#5F84A1',
        borderRadius: 40,
    },
    nextText: {
        fontFamily: fonts.interLight,
        fontSize: sw(18),
        color: '#FFFFFF',
        marginRight: sw(18),
        marginLeft: sw(18),
    }
});

export default Consult_Match;
