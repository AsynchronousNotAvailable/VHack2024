import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Button, StyleSheet } from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import PersonalLoanCard from '../Components/PersonalLoanCard';


function NegotiationCard({ title, email, amount, total, expiration, proposal, isCreditor }) {
    return (
        <View style={styles.card}>
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.cardEmail}>{email}</Text>
            <PersonalLoanCard />
            <Text style={styles.loanProposal}>{proposal}</Text>
            <TouchableOpacity style={styles.negotiationButton}>
                <Text style={styles.negotiationButtonText}>Negotiation in Progress</Text>
            </TouchableOpacity>
            {isCreditor && (
                <TouchableOpacity style={styles.optionsButton}>
                </TouchableOpacity>
            )}
        </View>
    );
}

function NegotiationsPage({ navigation }) {
    const [selectedTab, setSelectedTab] = useState(0);

    return (
        <ScrollView style={styles.container}>
            <SegmentedControlTab
                values={['Debtor', 'Creditor']}
                selectedIndex={selectedTab}
                onTabPress={setSelectedTab}
                tabsContainerStyle={styles.tabsContainer}
                tabStyle={styles.tabStyle}
                activeTabStyle={styles.activeTabStyle}
                tabTextStyle={styles.tabTextStyle}
                activeTabTextStyle={styles.activeTabTextStyle}
            />

            <Text style={styles.sectionHeader}>ONGOING</Text>
            <NegotiationCard
                title={selectedTab === 0 ? 'HLB @ MY' : 'Jason Tang'}
                email={selectedTab === 0 ? 'loan@hlbb.hongleong.com.my' : 'jason30102000@gmail.com'}
                amount="3000"
                total="5000"
                expiration="1/3/2025"
                proposal="Proposed: Extend the loan term from 24 months to 48 months"
                isCreditor={selectedTab === 1}
            />


            {/* <Text style={styles.sectionHeader}>ENDED</Text> */}

            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('Debt Negotiation Platform1')}>
                <Text style={styles.addButtonText}>Add New</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        padding: 20,
    },
    tabsContainer: {
        margin: 10,
        alignSelf: 'center',
    },
    tabStyle: {
        borderColor: '#007bff',
        backgroundColor: '#f0f0f0',
    },
    activeTabStyle: {
        backgroundColor: '#007bff',
    },
    tabTextStyle: {
        color: '#007bff',
    },
    activeTabTextStyle: {
        color: '#fff',
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        marginLeft: 10,
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 20,
        marginVertical: 5,
        marginHorizontal: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    cardEmail: {
        color: 'grey',
        marginBottom: 10,
    },
    loanInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    loanText: {
        fontSize: 16,
    },
    loanAmount: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    loanTotal: {
        fontSize: 14,
        color: 'grey',
    },
    loanExpiration: {
        fontSize: 14,
        color: 'grey',
    },
    loanProposal: {
        fontSize: 16,
        marginVertical: 10,
    },
    negotiationButton: {
        backgroundColor: '#dedede',
        borderRadius: 20,
        padding: 10,
    },
    negotiationButtonText: {
        fontSize: 16,
        color: '#007bff',
    },
    addButton: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
    },
    addButtonText: {
        color: '#ffffff',
        fontSize: 18,
    },
});

export default NegotiationsPage;
