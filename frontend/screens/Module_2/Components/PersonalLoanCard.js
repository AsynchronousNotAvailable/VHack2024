import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors, fonts, sh, sw } from "../../../styles/GlobalStyles";

function PersonalLoanCard() {
    return (
        <View style={styles.card}>
            <View style={styles.iconContainer}>
                <Image
                    source={require('../../../assets/Module_2/personalloan.png')}
                    style={styles.icon}
                />
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.mainText}>Personal Loan</Text>
                <Text style={styles.secondaryText}>Expires 22/4/2026</Text>
            </View>
            <View style={styles.amountContainer}>
                <Text style={styles.mainText}>RM 10008</Text>
                <Text style={styles.secondaryText}>Total RM25000</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginVertical: sh(15),
    },
    iconContainer: {
        marginRight: 15,
    },
    icon: {
        width: 40,
        height: 40,
    },
    infoContainer: {
        justifyContent: 'center',
        flex: 1,
    },
    amountContainer: {
        alignItems: 'flex-end',
    },
    mainText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    secondaryText: {
        fontSize: 12,
        color: '#666',
    },
});

export default PersonalLoanCard;
