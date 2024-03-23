import React, { useContext } from 'react';
import { ScrollView, StyleSheet, View, Text, TextInput, TouchableOpacity, Image, StatusBar } from 'react-native';
import { GlobalContext } from '../../../context';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { sw, sh, colors, fonts } from '../../../styles/GlobalStyles';
import Animated from 'react-native-reanimated';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ProfileNotificationMockData } from '../MockData/ProfileMockData';
import RenderNotificationContainer from '../Utils/RenderNotificationContainer';
import AppBar from '../../Module_3/Utils/AppBar';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
});

function ProfileNotificationPage({navigation}) {
    const PreviousPage = () => {
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* <AppBar title='Notifications' navigation={PreviousPage}/> */}
                <View style={{height: sh(16)}}></View>
                {ProfileNotificationMockData.map(({title, content}) => {
                    return (
                        <RenderNotificationContainer 
                            title={title}
                            content={content}
                        />
                    )
                })}
            </ScrollView>
        </SafeAreaView>
    );
}

export default ProfileNotificationPage;
