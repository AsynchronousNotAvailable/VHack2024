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

function Login({ navigation, route }) {
    const { setIsAuth, firstLaunch } = route.params;
    // const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { currentUsername, setCurrentUsername, setUserId } = useContext(GlobalContext);
    const handleAuth = () => {
        if (email != "") {
            setCurrentUsername(email);
        }
        if (firstLaunch) {
            navigation.navigate("Onboarding1");
        }
        else {
            setIsAuth(true);
            setUserId(1);
        }
        
    };

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View style={styles.mainContainer}>
                <Text style={styles.title}>Welcome Back!</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="default"
                    returnKeyType="next"
                    autoCapitalize="none"
                    onChangeText={(text) => {
                        // Handle text input changes here
                        setEmail(text);
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
                    keyboardType="default"
                    returnKeyType="next"
                    secureTextEntry
                    autoCapitalize="none"
                    onChangeText={(password) => {
                        // Handle text input changes here
                        setPassword(password);
                    }}
                    onSubmitEditing={() => {
                        dismissKeyboard;
                    }}
                />

                <TouchableOpacity style={styles.button} onPress={handleAuth}>
                    <Text style={styles.signUpText}>Login</Text>
                </TouchableOpacity>

                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                    }}
                >
                    <Text style={styles.toLoginText}>
                        Don't have an account?{" "}
                    </Text>
                    <TouchableOpacity
                        style={{
                            fontFamily: fonts.interRegular,
                        }}
                        onPress={() => navigation.navigate("SignUp")}
                    >
                        <Text
                            style={{
                                color: "#5F84A1",
                                fontFamily: fonts.interRegular,
                            }}
                        >
                            Sign Up
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

export default Login;

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
