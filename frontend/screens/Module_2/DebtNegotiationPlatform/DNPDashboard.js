import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Button, StyleSheet } from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import PersonalLoanCard from '../Components/PersonalLoanCard';
import { colors, fonts, sh, sw } from "../../../styles/GlobalStyles";


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
                expiration="22/4/2026"
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
        borderColor: '#5F84A1',
        backgroundColor: '#f0f0f0',
        paddingVertical: sh(10)
    },
    activeTabStyle: {
        backgroundColor: '#5F84A1',
    },
    tabTextStyle: {
        color: '#5F84A1',
        fontFamily: fonts.interSemiBold,
        fontSize: 16
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
        marginVertical: sh(5),
        marginHorizontal: sw(5),
        paddingVertical: sh(30),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    cardEmail: {
        color: 'grey',
        marginBottom: 10,
    },

    loanProposal: {
        fontSize: 16,
        marginVertical: 10,
        textAlign: 'center',
    },
    negotiationButton: {
        backgroundColor: '#FFF9DD',
        borderRadius: 20,
        padding: 10,
        alignItems: 'center',
    },
    negotiationButtonText: {
        fontSize: 16,
        color: '#000000',
    },
    addButton: {
        backgroundColor: '#5F84A1',
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
        marginHorizontal: sw(10),
    },
    addButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default NegotiationsPage;
