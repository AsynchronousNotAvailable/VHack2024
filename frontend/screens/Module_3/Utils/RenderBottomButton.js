import React from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, GestureResponderEvent } from 'react-native';
import { fonts, sw, sh } from '../../../styles/GlobalStyles';

// import { InputOutline, InputStandard } from 'react-native-input-outline';

const styles = StyleSheet.create({
    buttonContainer: {
        width: '100%',
        backgroundColor: '#5F84A1',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: sh(20),
        borderRadius: sw(10),
        zIndex: 99,
    },
    buttonText: {
        fontSize: sw(15),
        fontFamily: fonts.interSemiBold,
        color: 'white',
    },
    footer: {
        flex: 1,
        flexDirection: 'row',
        margin: sw(20),
        position: 'absolute',
        top: sh(600),
    },
});

export const BottomButton = ({ value, navigation }) => {
    return (
        <View style={styles.footer}>
            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={navigation}
            >
                <Text style={styles.buttonText}>{value}</Text>
            </TouchableOpacity>
        </View>
    );
};
