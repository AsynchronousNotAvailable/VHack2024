import React, { useContext, useState } from "react";
import {
    Keyboard,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { GlobalContext } from "../../context";
import { colors, fonts, sh, sw } from "../../styles/GlobalStyles";

function SignUp({ navigation }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const { currentUsername, setCurrentUsername } = useContext(GlobalContext);
    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View style={styles.mainContainer}>
                <Text style={styles.title}>Create Your Account</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    keyboardType="default"
                    returnKeyType="next"
                    autoCapitalize="none"
                    onChangeText={(username) => {
                        // Handle text input changes here
                        setUsername(username);
                    }}
                    onSubmitEditing={() => {
                        emailInput.focus();
                    }}
                />

                <TextInput
                    ref={(input) => {
                        emailInput = input;
                    }}
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="default"
                    returnKeyType="next"
                    autoCapitalize="none"
                    onChangeText={(email) => {
                        // Handle text input changes here
                        setEmail(email);
                    }}
                    onSubmitEditing={() => {
                        passwordInput.focus();
                    }}
                />

                <TextInput
                    ref={(input) => {
                        passwordInput = input;
                    }}
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={true}
                    autoCapitalize="none"
                    onChangeText={(password) => {
                        // Handle text input changes here
                        setPassword(password);
                    }}
                    onSubmitEditing={() => {
                        confirmPasswordInput.focus();
                    }}
                />

                <TextInput
                    ref={(input) => {
                        confirmPasswordInput = input;
                    }}
                    style={styles.input}
                    placeholder="Confirm Password"
                    secureTextEntry={true}
                    autoCapitalize="none"
                    onChangeText={(confirm_password) => {
                        // Handle text input changes here
                        setConfirmPassword(confirm_password);
                    }}
                    onSubmitEditing={dismissKeyboard}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("Login")}
                >
                    <Text style={styles.signUpText}>Sign Up</Text>
                </TouchableOpacity>

                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                    }}
                >
                    <Text style={styles.toLoginText}>
                        Already Have An Account?{" "}
                    </Text>
                    <TouchableOpacity
                        style={{
                            fontFamily: fonts.interRegular,
                        }}
                        onPress={() => navigation.navigate("Login")}
                    >
                        <Text
                            style={{
                                color: "#5F84A1",
                                fontFamily: fonts.interRegular,
                            }}
                        >
                            Log In
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

export default SignUp;

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: colors.white,
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
    },
    title: {
        fontFamily: fonts.interSemiBold,
        fontSize: 32,
        color: "#0F4D66",
        marginBottom: sh(30),
    },
    input: {
        paddingVertical: sh(13),
        paddingHorizontal: sw(20),
        borderRadius: 10,
        borderColor: "#5F84A1",
        borderWidth: 1,
        color: "black",
        fontSize: 18,
        marginVertical: sh(15),
        width: "70%",
        fontFamily: fonts.interRegular,
    },
    button: {
        backgroundColor: "#5F84A1",
        paddingVertical: sh(13),
        paddingHorizontal: sw(20),
        marginTop: sh(60),
        marginBottom: sh(20),
        borderRadius: 10,
        width: "60%",
        alignItems: "center",
        justifyContent: "center",
    },
    signUpText: {
        fontFamily: fonts.interSemiBold,
        fontSize: 18,
        color: colors.white,
    },
    toLoginText: {
        fontFamily: fonts.interSemiBold,
        color: colors.black,
    },
});
