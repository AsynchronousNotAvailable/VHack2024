import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

function ProposalCard({ onAccept }) {
    const handleAccept = () => {
        onAccept();
    };

    return (
        <View style={[styles.card, styles.sender]}>
            <Text style={styles.message}>Payment pause for 2 months</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.acceptButton]} onPress={handleAccept}>
                    <Text style={styles.buttonText}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.rejectButton]}>
                    <Text style={styles.buttonText}>Reject</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        margin: 20
    },
    sender: {
        alignSelf: 'flex-start',
        marginLeft: 20,
        backgroundColor: '#F8F9FE',
        maxWidth: '70%',
        borderBottomLeftRadius: 0,
    },
    message: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        flex: 1,
        paddingVertical: 10,
        margin: 5,
        borderRadius: 20,
        alignItems: 'center',
    },
    acceptButton: {
        backgroundColor: '#c8e6c9', // Light green color
    },
    rejectButton: {
        backgroundColor: '#ffcdd2', // Light red color
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ProposalCard;
