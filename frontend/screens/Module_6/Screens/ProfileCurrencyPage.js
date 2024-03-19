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
import { Dropdown } from 'react-native-element-dropdown';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    contentContainer: {
        flex: 1,
        marginHorizontal: sw(20),
    },
    dropdown: {
        width: '100%',
        backgroundColor: 'rgba(110, 113, 124, 0.05)',
        fontFamily: fonts.interRegular,
        borderRadius: 5,
        paddingVertical: sh(10),
        paddingHorizontal: sw(10),
        marginVertical: sh(20),
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        borderColor: 'black',
        borderWidth: 0.5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});

function ProfileCurrencyPage({navigation}) {
    const PreviousPage = () => {
        navigation.goBack();
    };

    const [showDropDown, setShowDropDown] = useState(false);
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const data = [
        { label: 'EUR', value: '1' },
        { label: 'CHF', value: '2' },
        { label: 'JPY', value: '3' },
        { label: 'AUD', value: '4' },
        { label: 'NZD', value: '5' },
        { label: 'GBP', value: '6' },
        { label: 'MYR', value: '7' },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <AppBar
                    title="Currency"
                    navigation={PreviousPage}
                />
                <View style={styles.contentContainer}>
                    <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={data}
                        search
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'MYR - Malaysia (RM)' : 'MYR'}
                        searchPlaceholder="Currency..."
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={(item) => {
                            setValue(item.value);
                            setIsFocus(false);
                        }}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default ProfileCurrencyPage;
