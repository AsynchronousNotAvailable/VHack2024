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

function ProfileReport({navigation}) {
    const ProfileMainPage = () => {
        navigation.navigate('ProfileMain');
    };
    const PreviousPage = () => {
        navigation.goBack();
    };

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [attachment, setAttachment] = useState('');

    const descriptionRef = useRef(null);
    const attachmentRef = useRef(null);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* <AppBar
                    title="Report a Problem"
                    navigation={PreviousPage}
                /> */}
                <View style={styles.contentContainer}>
                    <View style={styles.inputContainer}>
                        <TextInputPaper
                            style={styles.inputPaper}
                            placeholder="Title"
                            label="Title"
                            mode="outlined"
                            keyboardType="default"
                            returnKeyType="next"
                            autoCapitalize="none"
                            onChangeText={(title) => {
                                setTitle(title);
                            }}
                            onSubmitEditing={() => {
                                descriptionRef.current?.focus();
                            }}
                        />
                        <TextInputPaper
                            style={styles.inputPaper}
                            placeholder="Description"
                            label="Description"
                            mode="outlined"
                            ref={descriptionRef}
                            keyboardType="default"
                            returnKeyType="next"
                            autoCapitalize="none"
                            onChangeText={(description) => {
                                setDescription(description);
                            }}
                            onSubmitEditing={() => {
                                attachmentRef.current?.focus();
                            }}
                        />
                        <TextInputPaper
                            style={styles.inputPaper}
                            placeholder="Add Attachment"
                            label="Add Attachment"
                            mode="outlined"
                            ref={attachmentRef}
                            keyboardType="default"
                            returnKeyType="next"
                            autoCapitalize="none"
                            onChangeText={(attachment) => {
                                setAttachment(attachment);
                            }}
                        />
                    </View>
                </View>
            </ScrollView>
            <BottomButton
                value="Submit"
                navigation={ProfileMainPage}
            />
        </SafeAreaView>
    );
}

export default ProfileReport;
