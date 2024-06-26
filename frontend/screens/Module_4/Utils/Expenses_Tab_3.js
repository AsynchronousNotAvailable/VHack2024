import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Platform
} from "react-native";
import Svg, { Path } from "react-native-svg";
import React, { useState } from 'react';
import { SelectList } from 'react-native-dropdown-select-list';
import { colors, sw, sh, fonts } from "../../../styles/GlobalStyles.js";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Keyboard } from "react-native";

const Expenses_Tab_3 = ({
    openCalendar,
    openDate,
    date,
    fromInput,
    setFromInput,
    toInput,
    setToInput,
    description,
    setDescription,
    amount,
    setAmount,
    handleDateChange,
    formatDate,
    goBackToPreviousPage,
    closeDropDown1,
    dropdownShown1,
    toggleDropDown1,
    closeDropDown2,
    dropdownShown2,
    toggleDropDown2
}) => {
    const [accountOptions, setAccountOptions] = useState([
        { key: '1', value: 'Personal', disabled: false },
        { key: '2', value: 'Education', disabled: false },
    ]);
    // let accountOptions = [
    //     { key: '1', value: 'Personal', disabled: false },
    //     { key: '2', value: 'Education', disabled: false },
    // ];
    const handleDropDownFrom = () => {
        Keyboard.dismiss();
        // setDropdownShown2(!dropdownShown2);
        // setDropdownShown1(false);
        toggleDropDown1();
        closeDropDown2();
    };

    const handleDropDownTo = () => {
        Keyboard.dismiss();
        // setDropdownShown2(!dropdownShown2);
        // setDropdownShown1(false);
        toggleDropDown2();
        closeDropDown1();
    };
    return (
        <View style={[styles.columnContainer]}>
            <View
                style={{
                    justifyContent: 'center',
                }}
            >
                <TextInput
                    style={[styles.input]}
                    placeholder="20/03/2024"
                    value={formatDate(date)}
                    editable={false}
                    placeholderTextColor="#DADADA"
                />
                <TouchableOpacity
                    onPress={openCalendar}
                    style={{
                        position: 'absolute',
                        right: sw(40),
                        width: sw(24),
                        height: sh(25),
                    }}
                >
                    <Svg
                        style={{ position: 'absolute' }}
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={25}
                        fill="none"
                    >
                        <Path
                            stroke="#5F84A1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M15.333 4.222V2m0 2.222v2.222m0-2.222h-5M2 10.89v10c0 1.227.995 2.222 2.222 2.222h15.556A2.222 2.222 0 0 0 22 20.89v-10H2ZM2 10.89V6.444c0-1.228.995-2.223 2.222-2.223h2.222M6.445 2v4.444M22 10.89V6.444a2.222 2.222 0 0 0-2.222-2.223h-.556"
                        />
                    </Svg>
                </TouchableOpacity>
            </View>
            <View style={{ position: 'relative' }}>
                <TouchableOpacity
                    onPress={handleDropDownFrom}
                    style={{
                        // backgroundColor: 'grey',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 99,
                        maxHeight: sh(70),
                    }}
                >
                    {/* This TouchableOpacity covers the entire area of SelectList */}
                </TouchableOpacity>
                <SelectList
                    onSelect={() => accountOptions.forEach((item) => { 
                        console.log(item.value, fromInput);
                        if (item.value === fromInput) {
                            item.disabled = true;
                        }
                        else {
                            item.disabled = false;
                        }
                        
                        console.log(accountOptions);
                        setAccountOptions(accountOptions);
                    })}
                    boxStyles={[styles.input, { marginVertical: sh(15) }]}
                    dropdownStyles={styles.dropdownInput}
                    inputStyles={styles.textInput}
                    dropdownTextStyles={styles.textInput}
                    setSelected={(val) => setFromInput(val)}
                    data={accountOptions}
                    dropdownShown={dropdownShown1}
                    search={false}
                    save="value"
                    placeholder="Select From Account"
                />
            </View>
            {/* <TextInput
                style={styles.input}
                placeholder="From"
                keyboardType="default"
                returnKeyType="next"
                autoCapitalize="none"
                placeholderTextColor="#DADADA"
                ref={(input) => {
                    fromInput = input;
                }}
                value={fromInput}
                onChangeText={(text) => {
                    setFromInput(text);
                }}
                onSubmitEditing={() => {
                    toInput.focus();
                }}
            /> */}

            <View style={{ position: 'relative' }}>
                <TouchableOpacity
                    onPress={handleDropDownTo}
                    style={{
                        // backgroundColor: 'grey',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 99,
                        maxHeight: sh(70),
                    }}
                >
                    {/* This TouchableOpacity covers the entire area of SelectList */}
                </TouchableOpacity>
                <SelectList
                    boxStyles={[styles.input, { marginVertical: sh(15) }]}
                    dropdownStyles={styles.dropdownInput}
                    inputStyles={styles.textInput}
                    dropdownTextStyles={styles.textInput}
                    setSelected={(val) => setToInput(val)}
                    data={accountOptions}
                    dropdownShown={dropdownShown2}
                    search={false}
                    save="value"
                    placeholder="Select To Account"
                />
            </View>

            {/* <TextInput
                style={styles.input}
                placeholder="To"
                keyboardType="default"
                returnKeyType="next"
                autoCapitalize="none"
                value={toInput}
                placeholderTextColor="#DADADA"
                onChangeText={(text) => {
                    setToInput(text);
                }}
                ref={(input) => {
                    toInput = input;
                }}
                onSubmitEditing={() => {
                    descriptionInput.focus();
                }}
            /> */}

            <TextInput
                style={styles.input}
                placeholder="Description"
                keyboardType="default"
                returnKeyType="next"
                autoCapitalize="none"
                value={description}
                placeholderTextColor="#DADADA"
                onChangeText={(text) => {
                    setDescription(text);
                }}
                ref={(input) => (descriptionInput = input)}
                onSubmitEditing={() => {
                    amountInput.focus();
                }}
            />
            <TextInput
                style={styles.input}
                placeholder="Amount"
                keyboardType="number-pad"
                returnKeyType="next"
                autoCapitalize="none"
                value={amount.toString()}
                placeholderTextColor="#DADADA"
                onChangeText={(text) => {
                    setAmount(text);
                }}
                ref={(input) => {
                    amountInput = input;
                }}
                onSubmitEditing={() => {
                    Keyboard.dismiss();
                }}
            />

            <TouchableOpacity
                style={[styles.button, { alignSelf: 'center' }]}
                onPress={goBackToPreviousPage}
            >
                <Text style={styles.btnText}>Save</Text>
            </TouchableOpacity>

            {openDate &&
                (Platform.OS === 'ios' ? (
                    <View
                        style={{
                            position: 'absolute',
                            alignSelf: 'center',
                            backgroundColor: 'rgba(208, 208, 208, 1)',
                            borderRadius: 20,
                            padding: 10,
                        }}
                    >
                        <DateTimePicker
                            mode="date"
                            display="inline"
                            value={date}
                            onChange={handleDateChange}
                        />
                    </View>
                ) : (
                    <DateTimePicker
                        mode="date"
                        display="inline"
                        value={date}
                        onChange={handleDateChange}
                    />
                ))}
        </View>
    );
};

export default Expenses_Tab_3;

const styles = StyleSheet.create({
    columnContainer: { flexDirection: 'column' },

    dropdownInput: {
        alignSelf: 'center',
        paddingVertical: sh(0),
        paddingHorizontal: sw(10),
        borderRadius: 10,
        borderColor: '#DADADA',
        borderWidth: 1,
        width: '90%',
    },
    input: {
        alignSelf: 'center',
        paddingVertical: sh(13),
        paddingHorizontal: sw(20),
        borderRadius: 10,
        borderColor: '#DADADA',
        borderWidth: 1,
        fontSize: 18,
        marginVertical: sh(15),
        width: '90%',
        color: 'black',
        fontFamily: fonts.interRegular,
    },
    textInput: {
        fontSize: 18,
        width: '90%',
        color: 'black',
        fontFamily: fonts.interRegular,
    },
    button: {
        backgroundColor: '#5F84A1',
        paddingVertical: sh(13),
        paddingHorizontal: sw(20),
        marginTop: sh(30),
        borderRadius: 10,
        width: '60%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnText: {
        fontFamily: fonts.interSemiBold,
        fontSize: 20,
        color: colors.white,
    },
});
