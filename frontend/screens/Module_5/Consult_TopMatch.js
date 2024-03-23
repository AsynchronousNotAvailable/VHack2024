import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { fonts, sh, sw } from "../../styles/GlobalStyles";
import { Ionicons } from '@expo/vector-icons';
import { HeaderBackButton } from '@react-navigation/elements';

const Consult_TopMatch = ({ navigation, route }) => {
    const { advisors, selectedAdvices } = route.params;
    const [filteredAdvisors, setFilteredAdvisors] = useState([]);

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerLeft: (props) => (
                <View style={{ marginLeft: sw(-14) }}>
                    <HeaderBackButton
                        {...props}
                        onPress={() => {
                            navigation.navigate('Consult_Main');
                        }}
                    />
                </View>
            )
        });
    });

    useEffect(() => {
        const filtered = advisors.filter(advisor => {
            const designation = advisor.designation.toLowerCase();
            console.log("Selected advices:", selectedAdvices);
            return selectedAdvices.some(selectedAdvice => {
                switch (selectedAdvice) {
                    case 'Debt Consolidation':
                        return designation.includes('debt advisor') || designation.includes('debt consolidation specialist') || designation.includes('debt relief specialist');
                    case 'Credit Counselling':
                        return designation.includes('credit counsellor');
                    case 'Financial Planning':
                        return designation.includes('financial advisor') || designation.includes('certified financial planner');
                    case 'Debt Settlement':
                        return designation.includes('debt settlement specialist') || designation.includes('Debt Settlement Advisor') || designation.includes('Debt Management Consultant');
                    case 'Investment Strategies':
                        return designation.includes('investment advisor') || designation.includes('investment strategist') || designation.includes('investment analyst');
                    default:
                        return true;
                }
            });
        });
        setFilteredAdvisors(filtered);
    }, [selectedAdvices, advisors]);

    const renderAdvisorItem = ({ item }) => (
        <TouchableOpacity
            style={styles.advisorCard}
            onPress={() => navigation.navigate('Consult_AdvisorDetails', { advisor: item })}
        >
            <View style={styles.advisorRow}>
                <View style={styles.leftContent}>
                    <Image source={item.profileImage} style={styles.profileImage} />
                </View>
                <View style={styles.rightContent}>
                    <View style={styles.ratingContainer}>
                        <Ionicons name="star" size={16} color="yellow" style={{ marginRight: 5 }} />
                        <Text style={styles.rating}>{item.rating}</Text>
                    </View>
                    <View>
                        <Text style={styles.advisorName}>{item.name}</Text>
                        <Text style={styles.advisorDesignation}>{item.designation}</Text>
                    </View>
                </View>
            </View>
            <Text style={styles.description}>{item.description}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Top Matched Consultants</Text>
            <Text style={styles.subheading}>Based on similarity of interests and goals</Text>
            <FlatList
                data={filteredAdvisors.slice(0, 3)}
                renderItem={renderAdvisorItem}
                keyExtractor={(item) => item.name}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    heading: {
        fontFamily: fonts.interSemiBold,
        fontSize: sw(22),
        marginHorizontal: sw(24),
        marginTop: sh(20),
    },
    subheading: {
        fontFamily: fonts.interRegular,
        fontSize: sw(16),
        marginHorizontal: sw(24),
        marginBottom: sh(20),
    },
    advisorCard: {
        width: sw(368),
        height: sh(150),
        backgroundColor: 'white',
        marginHorizontal: sw(20),
        marginVertical: sh(10),
        paddingHorizontal: sw(10),
        borderRadius: 10,
        shadowColor: '#535990',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.07,
        elevation: 5,
        shadowRadius: 25,
    },
    advisorName: {
        fontFamily: fonts.interSemiBold,
        fontSize: sw(17),
        marginBottom: sh(2),
    },
    advisorDesignation: {
        fontFamily: fonts.interLight,
        fontSize: sw(14),
    },
    profileImage: {
        width: sw(63),
        height: sh(68),
        borderRadius: sw(65) / 2,
        marginBottom: sh(8),
        marginTop: sh(16),
    },
    cardContent: {
        flexDirection: 'column',
    },
    advisorRow: {
        flexDirection: 'row',
    },
    leftContent: {
        marginHorizontal: 10,
    },
    rightContent: {
        flex: 1,
        marginTop: sh(22),
        marginLeft: sw(6),
    },
    ratingContainer: {
        position: 'absolute',
        top: 1,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    rating: {
        fontSize: sw(14),
        fontFamily: fonts.interLight,
    },
    description: {
        fontFamily: fonts.interRegular,
        alignItems: 'center',
        fontSize: sw(14),
        marginHorizontal: sw(14),
    },
});

export default Consult_TopMatch;
