import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    TouchableWithoutFeedback,
    Switch,
    Keyboard,
} from 'react-native';
import React, { useState } from 'react';
import { colors, sw, sh, fonts } from '../../styles/GlobalStyles.js';
import { SelectList } from 'react-native-dropdown-select-list';
import axios from 'axios';
import { Url } from '../../url.js';

const Expenses_Add_Budget = ({ navigation }) => {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [account, setAccount] = useState('');
    const [isEnabled1, setIsEnabled1] = useState(false);
    const [isEnabled2, setIsEnabled2] = useState(false);
    const [dropdownShown1, setDropdownShown1] = useState(false);
    const [dropdownShown2, setDropdownShown2] = useState(false);
    const accountOptions = [
        { key: '1', value: 'Cash' },
        { key: '2', value: 'Credit Card' },
        { key: '3', value: 'Debit Card' },
        { key: '4', value: 'E-wallet' },
    ];

    const categoryOptions = [
        { key: '1', value: 'Food' },
        { key: '2', value: 'Shopping' },
        { key: '3', value: 'Housing' },
        { key: '4', value: 'Transportation' },
        { key: '5', value: 'Education' },
        { key: '6', value: 'Entertainment' },
        { key: '7', value: 'Health' },
        { key: '8', value: 'Other' },
    ];

    const toggleSwitch1 = () => {
        setIsEnabled1(!isEnabled1);
    };

    const toggleSwitch2 = () => {
        setIsEnabled2(!isEnabled2);
    };

    const dismissKeyboard = () => {
        Keyboard.dismiss();
        setDropdownShown1(false);
        setDropdownShown2(false);
     
    };

    
    const handleDropDownCategory = () => {
        console.log('clicked also');
         Keyboard.dismiss();
        setDropdownShown1(!dropdownShown1);
        setDropdownShown2(false);
    };

    const handleDropDownAccount = () => {
        console.log('clicked also');
        Keyboard.dismiss();
        setDropdownShown2(!dropdownShown2);
        setDropdownShown1(false);
    };

    const handleAddBudget = async () => {
        try {
            const newBudget = {
                name: name,
                amount: parseFloat(amount),
                category: category.toUpperCase(),
                account: account.toUpperCase(),
                userId: 1,
            };
            console.log(newBudget);
            const response = await axios.post(`http://${Url}:3000/budgets/new`, newBudget);
            console.log(response.status);
            if (response.status === 201) {
                navigation.goBack();
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View
                style={{
                    backgroundColor: colors.white,
                    height: '100%',
                }}
            >
                <View style={[styles.columnContainer, { marginVertical: sh(30), marginHorizontal: sw(20) }]}>
                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        keyboardType="default"
                        returnKeyType="next"
                        autoCapitalize="none"
                        placeholderTextColor="#DADADA"
                        value={name}
                        onChangeText={(text) => {
                            setName(text);
                        }}
                        onSubmitEditing={() => {
                            amountInput.focus();
                        }}
                        onFocus={() => {
                            setDropdownShown1(false);
                            setDropdownShown2(false);
                        }}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Amount"
                        keyboardType="number-pad"
                        returnKeyType="next"
                        autoCapitalize="none"
                        value={amount}
                        placeholderTextColor="#DADADA"
                        onChangeText={(text) => {
                            // Handle text input changes here
                            setAmount(text);
                        }}
                        ref={(input) => {
                            amountInput = input;
                        }}
                        onFocus={() => {
                            setDropdownShown1(false);
                            setDropdownShown2(false);
                        }}
                        onSubmitEditing={() => {
                            categoryInput.focus();
                        }}
                    />
                    {/* 
                    <TextInput
                        style={styles.input}
                        placeholder="Category"
                        keyboardType="default"
                        returnKeyType="next"
                        autoCapitalize="none"
                        value={category}
                        placeholderTextColor="#DADADA"
                        onChangeText={(text) => {
                            // Handle text input changes here
                            setCategory(text);
                        }}
                        ref={(input) => {
                            categporyInput = input;
                        }}
                        onSubmitEditing={() => {
                            descriptionInput.focus();
                        }}
                    /> */}

                    {/* <TextInput
                        style={styles.input}
                        placeholder="Account"
                        keyboardType="default"
                        returnKeyType="next"
                        autoCapitalize="none"
                        value={account}
                        placeholderTextColor="#DADADA"
                        onChangeText={(text) => {
                            // Handle text input changes here
                            setAccount(text);
                        }}
                        ref={(input) => (descriptionInput = input)}
                        onSubmitEditing={() => {
                            Keyboard.dismiss();
                        }}
                    /> */}
                    <View style={{ position: 'relative' }}>
                        <TouchableOpacity
                            onPress={handleDropDownCategory}
                            style={{
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
                            setSelected={(val) => setCategory(val)}
                            data={categoryOptions}
                            dropdownShown={dropdownShown1}
                            search={false}
                            save="value"
                            placeholder="Select Category"
                        />
                    </View>

                    <View style={{ position: 'relative' }}>
                        <TouchableOpacity
                            onPress={handleDropDownAccount}
                            style={{
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
                            setSelected={(val) => setAccount(val)}
                            data={accountOptions}
                            dropdownShown={dropdownShown2}
                            search={false}
                            save="value"
                            placeholder="Select Account"
                        />
                    </View>
                </View>
                <View style={[styles.columnContainer, { marginHorizontal: sw(20), gap: 5 }]}>
                    <Text style={[styles.titleText, { fontSize: 18 }]}>Notifications</Text>
                    <View style={[styles.columnContainer, { gap: 20 }]}>
                        <View style={[styles.rowContainer, { gap: 5, justifyContent: 'space-between' }]}>
                            <View style={styles.columnContainer}>
                                <Text style={[styles.titleText, { fontSize: 16 }]}>Budget Overspent</Text>
                                <Text style={[styles.subTitleText, { color: '#9D9FA0' }]}>
                                    Notify when amount has exceeded the budget
                                </Text>
                            </View>
                            <Switch
                                style={{ alignSelf: 'flex-end' }}
                                trackColor={{
                                    false: '#767577',
                                    true: '#5F84A1',
                                }}
                                thumbColor={isEnabled1 ? '#FCFCFC' : '#FCFCFC'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch1}
                                value={isEnabled1}
                            />
                        </View>
                        <View style={styles.divider}></View>
                        <View style={[styles.rowContainer, { gap: 5, justifyContent: 'space-between' }]}>
                            <View style={styles.columnContainer}>
                                <Text style={[styles.titleText, { fontSize: 16 }]}>Risk Of Overspending</Text>
                                <Text style={[styles.subTitleText, { color: '#9D9FA0' }]}>
                                    Notify when budget is trending to be overspent
                                </Text>
                            </View>
                            <Switch
                                style={{ alignSelf: 'flex-end' }}
                                trackColor={{
                                    false: '#767577',
                                    true: '#5F84A1',
                                }}
                                thumbColor={isEnabled2 ? '#FCFCFC' : '#FCFCFC'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch2}
                                value={isEnabled2}
                            />
                        </View>
                        <View style={styles.divider}></View>
                    </View>
                </View>

                <TouchableOpacity
                    style={[styles.button, { alignSelf: 'center' }]}
                    onPress={handleAddBudget}
                >
                    <Text style={styles.signUpText}>Save</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default Expenses_Add_Budget;

const styles = StyleSheet.create({
    columnContainer: { flexDirection: 'column' },
    rowContainer: { flexDirection: 'row' },
    titleText: {
        fontFamily: fonts.interMedium,
        color: colors.black,
    },
    subTitleText: {
        fontFamily: fonts.interRegular,
        color: colors.black,
    },
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
    signUpText: {
        fontFamily: fonts.interSemiBold,
        fontSize: 20,
        color: colors.white,
    },
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: '#DADADA',
    },
});
