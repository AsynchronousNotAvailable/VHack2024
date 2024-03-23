import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    TouchableWithoutFeedback,
    Switch,
    Keyboard,
} from "react-native";
import React, { useState } from "react";
import { colors, sw, sh, fonts } from "../../styles/GlobalStyles.js";


const Expenses_Add_Budget = () => {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [isEnabled1, setIsEnabled1] = useState(false);
    const [isEnabled2, setIsEnabled2] = useState(false);

    const toggleSwitch1 = () => {
        setIsEnabled1(!isEnabled1);
    };

    const toggleSwitch2 = () => {
        setIsEnabled2(!isEnabled2);
    };

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View
                style={{
                    backgroundColor: colors.white,
                    height: "100%",
                }}
            >
                <View
                    style={[
                        styles.columnContainer,
                        { marginVertical: sh(30), marginHorizontal: sw(20) },
                    ]}
                >
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
                            categporyInput = input;
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
                            Keyboard.dismiss();
                        }}
                    />
                </View>
                <View
                    style={[
                        styles.columnContainer,
                        { marginHorizontal: sw(20), gap: 5 },
                    ]}
                >
                    <Text style={[styles.titleText, { fontSize: 18 }]}>
                        Notifications
                    </Text>
                    <View style={[styles.columnContainer, { gap: 20 }]}>
                        <View
                            style={[
                                styles.rowContainer,
                                { gap: 5, justifyContent: "space-between" },
                            ]}
                        >
                            <View style={styles.columnContainer}>
                                <Text
                                    style={[styles.titleText, { fontSize: 16 }]}
                                >
                                    Budget Overspent
                                </Text>
                                <Text
                                    style={[
                                        styles.subTitleText,
                                        { color: "#9D9FA0" },
                                    ]}
                                >
                                    Notify when amount has exceeded the budget
                                </Text>
                            </View>
                            <Switch
                                style={{ alignSelf: "flex-end" }}
                                trackColor={{
                                    false: "#767577",
                                    true: "#5F84A1",
                                }}
                                thumbColor={isEnabled1 ? "#FCFCFC" : "#FCFCFC"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch1}
                                value={isEnabled1}
                            />
                        </View>
                        <View style={styles.divider}></View>
                        <View
                            style={[
                                styles.rowContainer,
                                { gap: 5, justifyContent: "space-between" },
                            ]}
                        >
                            <View style={styles.columnContainer}>
                                <Text
                                    style={[styles.titleText, { fontSize: 16 }]}
                                >
                                    Risk Of Overspending
                                </Text>
                                <Text
                                    style={[
                                        styles.subTitleText,
                                        { color: "#9D9FA0" },
                                    ]}
                                >
                                    Notify when budget is trending to be
                                    overspent
                                </Text>
                            </View>
                            <Switch
                                style={{ alignSelf: "flex-end" }}
                                trackColor={{
                                    false: "#767577",
                                    true: "#5F84A1",
                                }}
                                thumbColor={isEnabled2 ? "#FCFCFC" : "#FCFCFC"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch2}
                                value={isEnabled2}
                            />
                        </View>
                        <View style={styles.divider}></View>
                    </View>
                </View>

                <TouchableOpacity
                    style={[styles.button, { alignSelf: "center" }]}
                    // onPress={handleAuth}
                >
                    <Text style={styles.signUpText}>Save</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default Expenses_Add_Budget;

const styles = StyleSheet.create({
    columnContainer: { flexDirection: "column" },
    rowContainer: { flexDirection: "row" },
    titleText: {
        fontFamily: fonts.interMedium,
        color: colors.black,
    },
    subTitleText: {
        fontFamily: fonts.interRegular,
        color: colors.black,
    },
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
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: "#DADADA",
    },
});
