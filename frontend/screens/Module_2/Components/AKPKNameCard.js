import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { colors, fonts, sh, sw } from "../../../styles/GlobalStyles";

function AKPKNameCard() {
    return (
        <View style={styles.card}>
            <Image
                source={require('../../../assets/Module_2/AKPKsiti.png')}
                style={styles.avatar}
            />
            <View style={styles.textContainer}>
                <Text style={styles.name}>Siti Noorhayati</Text>
                <Text style={styles.role}>AKPK Officer</Text>
            </View>
            <TouchableOpacity style={styles.approvedButton}>
                <Text style={styles.approvedText}>Approved</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
        marginVertical: sh(10),
        margin: 25,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    role: {
        fontSize: 14,
        color: '#666',
    },
    approvedButton: {
        backgroundColor: '#CAFDEA',
        borderRadius: 15,
        paddingVertical: 5,
        paddingHorizontal: 15,
    },
    approvedText: {
        color: '#000000',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default AKPKNameCard;
