import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { fonts, sh, sw } from "../../styles/GlobalStyles";
import { Ionicons } from '@expo/vector-icons';

const Consult_Advisors = ({ navigation, route }) => {
    const { advisors } = route.params;
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredAdvisors, setFilteredAdvisors] = useState(advisors);

    const handleSearch = (query) => {
        setSearchQuery(query);
        const filtered = advisors.filter(advisor =>
            advisor.name.toLowerCase().includes(query.toLowerCase()) ||
            advisor.designation.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredAdvisors(filtered);
    };

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
            <View style={styles.searchContainer}>
                <Ionicons name="search-outline" size={24} color="#9D9FA0" style={{ marginLeft: 20 }} />
                <TextInput
                    style={styles.searchText}
                    placeholder="Search advisors..."
                    value={searchQuery}
                    onChangeText={handleSearch}
                    onEndEditing={() => handleSearch(searchQuery)}
                />
            </View>
            <FlatList
                data={filteredAdvisors}
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
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: sh(48),
        width: sw(370),
        borderRadius: 16,
        backgroundColor: '#F6F7FA',
        marginTop: sh(20),
        marginBottom: sh(12),
        marginHorizontal: sw(20),
    },
    searchText: {
        fontFamily: fonts.interRegular,
        fontSize: sw(16),
        flex: 1,
        paddingLeft: sw(12),
        color: "#9D9FA0"
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

export default Consult_Advisors;
