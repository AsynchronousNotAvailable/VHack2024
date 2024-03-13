import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

function MonthlyPayment() {
    return (
        <View style={styles.card}>
            <View style={styles.section}>
                <MaterialIcons name="attach-money" size={24} color="red" />
                <Text style={styles.textTitle}>Monthly Payment</Text>
                <Text style={styles.textAmount}>RM 2579.95</Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.section}>
                <MaterialIcons name="account-balance-wallet" size={24} color="orange" />
                <Text style={styles.textTitle}>Monthly Loans</Text>
                <Text style={styles.textAmount}>RM 2113.39</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        alignItems: 'center',
        justifyContent: 'space-around',
        margin: 10,
    },
    section: {
        alignItems: 'center',
    },
    separator: {
        height: '100%',
        width: 1,
        backgroundColor: '#ddd',
    },
    textTitle: {
        marginTop: 4,
        fontSize: 16,
        fontWeight: 'bold',
    },
    textAmount: {
        fontSize: 16,
        color: '#555',
    },
});

export default MonthlyPayment;
