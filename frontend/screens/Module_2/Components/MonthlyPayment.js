import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, fonts, sh, sw } from "../../../styles/GlobalStyles";

function monthlyBills() {
    const monthlyBills = "2579.95";
    const monthlyLoans = "2113.39";

    return (
        <View style={styles.card}>
            <View style={styles.column}>
                <MaterialCommunityIcons name="currency-usd" size={24} color="red" />
                <View style={styles.textContainer}>
                    <Text style={styles.label}>Monthly Payment</Text>
                    <Text style={styles.value}>RM {monthlyBills}</Text>
                </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.column}>
                <MaterialCommunityIcons name="bank" size={24} color="orange" />
                <View style={styles.textContainer}>
                    <Text style={styles.label}>Monthly Loans</Text>
                    <Text style={styles.value}>RM {monthlyLoans}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 18,
        paddingRight: 32,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
        margin: 8,
        marginLeft: 15,
        marginRight: 15,
    },
    divider: {
        height: '100%',
        width: 1,
        backgroundColor: '#ddd',
        marginHorizontal: 16,
    },
    column: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textContainer: {
        marginLeft: 8,
    },
    label: {
        fontFamily: 'InterMedium',
        fontSize: 14,
        color: '#333',
    },
    value: {
        fontFamily: 'InterSemiBold',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
});

export default monthlyBills;
