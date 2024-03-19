import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
} from "react-native";
import React from "react";
import { colors, sw, sh, fonts } from "../../../styles/GlobalStyles.js";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Keyboard } from "react-native";

const Expenses_Tab_2 = ({
    openCalendar,
    openDate,
    setOpenDate,
    date,
    setDate,
    account,
    setAccount,
    category,
    setCategory,
    description,
    setDescription,
    amount,
    setAmount,
    handleDateChange,
}) => {
    return (
        <View style={[styles.columnContainer]}>
            <TouchableOpacity onPress={openCalendar}>
                <TextInput
                    style={styles.input}
                    placeholder="20/03/2024"
                    value={date.toDateString()}
                    editable={false}
                    placeholderTextColor="#DADADA"
                />
            </TouchableOpacity>
            <TextInput
                style={styles.input}
                placeholder="Account"
                keyboardType="default"
                returnKeyType="next"
                autoCapitalize="none"
                placeholderTextColor="#DADADA"
                ref={(input) => {
                    accountInput = input;
                }}
                value={account}
                onChangeText={(text) => {
                    setAccount(text);
                }}
                onSubmitEditing={() => {
                    categoryInput.focus();
                }}
            />
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
                    categoryInput = input;
                }}
                onSubmitEditing={() => {
                    descriptionInput.focus();
                }}
            />

            <TextInput
                style={styles.input}
                placeholder="Description"
                keyboardType="default"
                returnKeyType="next"
                autoCapitalize="none"
                value={description}
                placeholderTextColor="#DADADA"
                onChangeText={(text) => {
                    // Handle text input changes here
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
                    // Handle text input changes here
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
                style={[styles.button, { alignSelf: "center" }]}
                // onPress={handleAuth}
            >
                <Text style={styles.signUpText}>Save</Text>
            </TouchableOpacity>

            {openDate && (
                <DateTimePicker
                    mode="date"
                    display="spinner"
                    value={date}
                    onChange={handleDateChange}
                />
            )}
        </View>
    );
};

export default Expenses_Tab_2;

const styles = StyleSheet.create({
    columnContainer: { flexDirection: "column" },

    input: {
        alignSelf: "center",
        paddingVertical: sh(13),
        paddingHorizontal: sw(20),
        borderRadius: 10,
        borderColor: "#DADADA",
        borderWidth: 1,
        fontSize: 18,
        marginVertical: sh(15),
        width: "90%",
        color: "black",
        fontFamily: fonts.interRegular,
    },
    button: {
        backgroundColor: "#5F84A1",
        paddingVertical: sh(13),
        paddingHorizontal: sw(20),
        marginTop: sh(30),
        borderRadius: 10,
        width: "60%",
        alignItems: "center",
        justifyContent: "center",
    },
    signUpText: {
        fontFamily: fonts.interSemiBold,
        fontSize: 20,
        color: colors.white,
    },
});
