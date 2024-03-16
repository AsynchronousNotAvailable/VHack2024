import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
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
        bottom: sh(10),
    },
});

interface buttonValue {
    value: string;
}

export const BottomButton = ({ value }: buttonValue) => {
    return (
        <View style={styles.footer}>
            <TouchableOpacity style={styles.buttonContainer}>
                <TextInput style={styles.buttonText}>{value}</TextInput>
            </TouchableOpacity>
        </View>
    );
};
