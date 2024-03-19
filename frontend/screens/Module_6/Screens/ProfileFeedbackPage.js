import React, { useContext, useState, useRef, useCallback } from 'react';
import { ScrollView, StyleSheet, View, Text, TextInput, TouchableOpacity, Image, StatusBar } from 'react-native';
import { GlobalContext } from '../../../context';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { sw, sh, colors, fonts } from '../../../styles/GlobalStyles';
import Animated from 'react-native-reanimated';
import AppBar from '../../Module_3/Utils/AppBar';
import { BottomButton } from '../../Module_3/Utils/RenderBottomButton';
import { TextInput as TextInputPaper } from 'react-native-paper';
import { Rating } from '@kolking/react-native-rating';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    contentContainer: {
        flex: 1,
        margin: sw(20),
    },
    textStyle: {
        flex: 1,
        fontFamily: fonts.interRegular,
        fontSize: sw(16),
        marginBottom: sh(6)
    },
    emojiContainer:{
        paddingVertical: sh(4),
        marginTop: sh(6),
        marginBottom: sh(8),
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

function ProfileFeedbackPage({navigation}) {
    const ProfileMainPage = () => {
        navigation.navigate('ProfileMain');
    };
    const PreviousPage = () => {
        navigation.goBack();
    };

    const [rating, setRating] = useState(0);
    const handleChange = useCallback(
        (value) => setRating(Math.round((rating + value) * 5) / 10),
        [rating],
    );
    const [comment, setComment] = useState('');

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <AppBar
                    title="Send feedback"
                    navigation={PreviousPage}
                />
                <View style={styles.contentContainer}>
                    <Text style={styles.textStyle}>How do you rate our app?</Text>
                    <Rating size={40} rating={rating} variant='emoji' onChange={handleChange} style={styles.emojiContainer}/>
                </View>
                <View style={styles.contentContainer}>
                    <Text style={styles.textStyle}>Share your thoughts</Text>
                    <TextInputPaper
                            style={styles.inputPaper}
                            placeholder="Comment"
                            label="Comment"
                            mode="outlined"
                            keyboardType="default"
                            returnKeyType="next"
                            autoCapitalize="none"
                            onChangeText={(comment) => {
                                setComment(comment);
                            }}
                        />
                </View>
            </ScrollView>
            <BottomButton
                value="Submit"
                navigation={ProfileMainPage}
            />
        </SafeAreaView>
    );
}

export default ProfileFeedbackPage;
