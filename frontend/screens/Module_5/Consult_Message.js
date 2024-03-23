import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import placeholderImage from '../../assets/images/avatar.png';
import { useNavigation } from '@react-navigation/native';
import { fonts, sh, sw } from "../../styles/GlobalStyles";
import { Ionicons } from '@expo/vector-icons';

const users = [
    { id: 1, name: 'AI Chatbot', msg: 'Your personalised 24/7 companion', image: require('../../assets/images/chatbot.png') },
    { id: 2, name: 'Teressa Smith', msg: "Hey, can i ask something?", image: require('../../assets/images/teressa.png') },
    { id: 3, name: 'Evelyn Thomas', msg: "Thanks for your information.", image: require('../../assets/images/evelyn.png') },
];

const CommunityMessage = () => {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredUsers, setFilteredUsers] = useState(users);

    const handleChat = (item) => {
        if (item.id === 1) {
            navigation.navigate('Consult_AIChatbot', { username: item.name, item });
        } else {
            navigation.navigate('Consult_Chatscreen', { username: item.name, item });
        }
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        const filtered = users.filter(user =>
            user.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredUsers(filtered);
    };

    const renderUserItem = ({ item }) => (
        <TouchableOpacity
            style={styles.userItem}
            onPress={() => handleChat(item)}
        >
            <View style={styles.rowContainer}>
                <Image source={item.image ? item.image : placeholderImage} style={styles.profilePic} />
                <View style={styles.textContainer}>
                    <Text style={styles.userName}>{item.name}</Text>
                    <Text style={styles.message}>{item.msg}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );


    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <Ionicons name="search-outline" size={24} color="#9D9FA0" style={{ marginLeft: 20 }} />
                <TextInput
                    style={styles.searchText}
                    placeholder="Search messages..."
                    onChangeText={handleSearch}
                    value={searchQuery}
                    onEndEditing={() => handleSearch(searchQuery)}
                />
            </View>
            <View style={styles.userList}>
                <FlatList
                    data={filteredUsers}
                    renderItem={renderUserItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: sh(48),
        width: sw(368),
        borderRadius: 16,
        backgroundColor: '#F6F7FA',
        marginTop: sh(20),
        marginBottom: sh(8),
        marginHorizontal: sw(24),
    },
    searchText: {
        fontFamily: fonts.interRegular,
        fontSize: sw(16),
        flex: 1,
        paddingLeft: sw(12),
        color: "#9D9FA0"
    },
    userItem: {
        paddingVertical: sh(14),
        marginHorizontal: sw(18),
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
    },
    textContainer: {
        paddingLeft: sw(18),
        paddingTop: sh(3),
    },
    userName: {
        fontFamily: fonts.interSemiBold,
        fontSize: sw(18),
    },
    message: {
        fontFamily: fonts.interRegular,
        fontSize: sw(15),
        color: "#8C8C8C",
    },
    profilePic: {
        width: sw(56),
        height: sh(60),
        borderRadius: 30,
    },
    rowContainer: {
        flexDirection: 'row',
        paddingLeft: sw(12),
        paddingVertical: sh(6),
    },
});

export default CommunityMessage;