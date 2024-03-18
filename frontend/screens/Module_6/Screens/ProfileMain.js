import React, { useContext } from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { GlobalContext } from '../../../context';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { sw, sh, colors } from '../../../styles/GlobalStyles';
import Animated from 'react-native-reanimated';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Module6RootStackNavigatorParamsList from '../Utils/Module6StackParamsProps';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
    },
    upperHalfCircle: {
        position: 'absolute',
        top: sh(-300),
        width: sw(500),
        height: sh(500),
        backgroundColor: '#DFEEF8',
        borderRadius: sw(100),
        justifyContent: 'center',
        alignItems: 'center',
    },
});

function ProfileMain(route) {
    const { currentUsername, setCurrentUsername } = useContext(GlobalContext);
    const { setIsAuth } = route.params;
    const handleLogout = () => {
        setIsAuth(false);
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.upperHalfCircle}></View>
                <Text>Profile</Text>
                <Text>Username: {currentUsername}</Text>

                <TouchableOpacity onPress={handleLogout}>
                    <Text>Logout</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

export default ProfileMain;
