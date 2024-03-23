import React, { useContext, useState, useRef } from 'react';
import { ScrollView, StyleSheet, View, Text, TextInput, TouchableOpacity, Image, StatusBar } from 'react-native';
import { GlobalContext } from '../../../context';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { sw, sh, colors, fonts } from '../../../styles/GlobalStyles';
import Animated from 'react-native-reanimated';
import AppBar from '../../Module_3/Utils/AppBar';
import { BottomButton } from '../../Module_3/Utils/RenderBottomButton';
import { TextInput as TextInputPaper } from 'react-native-paper';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    contentContainer: {
        flex: 1,
    },
    inputContainer: {
        flex: 1,
        margin: sw(20),
    },
    inputPaper: {
        width: '100%',
        backgroundColor: 'rgba(110, 113, 124, 0.05)',
        fontFamily: fonts.interRegular,
        borderRadius: 10,
        paddingVertical: sh(4),
        marginVertical: sh(6),
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
    },
});

function ProfileEditPage({navigation}) {
    const ProfileMainPage = () => {
        navigation.navigate('ProfileMain');
    };
    const PreviousPage = () => {
        navigation.goBack();
    };

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Reference for all constant
    const emailRef = useRef(null);
    const phoneNumberRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const [error, setError] = useState(undefined);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* <AppBar
                    title="Add Loan"
                    navigation={PreviousPage}
                /> */}
                <View style={styles.contentContainer}>
                    <View style={styles.inputContainer}>
                        <TextInputPaper
                            style={styles.inputPaper}
                            placeholder="Username"
                            label="Username"
                            mode="outlined"
                            keyboardType="default"
                            returnKeyType="next"
                            autoCapitalize="none"
                            onChangeText={(username) => {
                                setUsername(username);
                            }}
                            onSubmitEditing={() => {
                                emailRef.current?.focus();
                            }}
                        />
                        <TextInputPaper
                            style={styles.inputPaper}
                            placeholder="Email"
                            label="Email"
                            mode="outlined"
                            ref={emailRef}
                            keyboardType="default"
                            returnKeyType="next"
                            autoCapitalize="none"
                            onChangeText={(email) => {
                                setEmail(email);
                            }}
                            onSubmitEditing={() => {
                                phoneNumberRef.current?.focus();
                            }}
                        />
                        <TextInputPaper
                            style={styles.inputPaper}
                            placeholder="Phone Number"
                            label="Phone Number"
                            mode="outlined"
                            ref={phoneNumberRef}
                            keyboardType="default"
                            returnKeyType="next"
                            autoCapitalize="none"
                            onChangeText={(phoneNumber) => {
                                setPhoneNumber(phoneNumber);
                            }}
                            onSubmitEditing={() => {
                                passwordRef.current?.focus();
                            }}
                        />
                        <TextInputPaper
                            style={styles.inputPaper}
                            placeholder="Password"
                            label="Password"
                            mode="outlined"
                            ref={passwordRef}
                            keyboardType="default"
                            returnKeyType="next"
                            autoCapitalize="none"
                            onChangeText={(password) => {
                                setPassword(password);
                            }}
                            onSubmitEditing={() => {
                                confirmPasswordRef.current?.focus();
                            }}
                        />
                        <TextInputPaper
                            style={styles.inputPaper}
                            placeholder="Confirm your password"
                            label="Confirm your password"
                            mode="outlined"
                            ref={confirmPasswordRef}
                            keyboardType="default"
                            returnKeyType="next"
                            autoCapitalize="none"
                            onChangeText={(confirmPassword) => {
                                setConfirmPassword(confirmPassword);
                            }}
                        />
                    </View>
                </View>
            </ScrollView>
            <BottomButton
                value="Update"
                navigation={ProfileMainPage}
            />
        </SafeAreaView>
    );
}

export default ProfileEditPage;
