import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    Keyboard,
    StyleSheet,
    TouchableWithoutFeedback,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { useState } from "react";
import Svg, { Circle, Path } from 'react-native-svg';
import { colors, fonts, sh, sw } from "../../styles/GlobalStyles";
function Onboarding1({ navigation }) {
    const [value, setValue] = useState("");
    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };
    const nextPage = () => {
        navigation.navigate("Onboarding2");
    };
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.wrapper}
        >
            <TouchableWithoutFeedback onPress={dismissKeyboard}>
                <View style={styles.mainContainer}>
                    <Text style={styles.title}>Debt Free</Text>
                    <Image source={require('../../assets/images/landing_bank.png')}></Image>
                    <Text
                        style={[
                            styles.title,
                            {
                                fontFamily: fonts.interSemiBold,
                                fontSize: 22,
                                marginTop: sh(10),
                            },
                        ]}
                    >
                        Enter Monthly Income
                    </Text>
                    <Text style={styles.description}>
                        Understanding your monthly income helps us create a tailored debt management plan that fits your
                        lifestyle.
                        {'\n'}
                    </Text>
                    <Text style={styles.description}>
                        Please enter your{' '}
                        <Text style={{ fontFamily: fonts.interBlack }}>total monthly income after taxes</Text>
                    </Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="number-pad"
                        autoCapitalize="none"
                        value={`RM ${value}`}
                        onChangeText={(text) => setValue(`${text.substring(3)}`)}
                    />

                    <View
                        style={{
                            // borderWidth: 2,
                            // borderColor: "black",
                            marginTop: sh(50),
                            marginEnd: sw(20),
                            alignSelf: 'flex-end',
                        }}
                    >
                        <TouchableOpacity onPress={nextPage}>
                            <Svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={68}
                                height={68}
                                fill="none"
                                
                            >
                                <Circle
                                    cx={34}
                                    cy={34}
                                    r={33}
                                    stroke="#5F84A1"
                                    strokeWidth={2}
                                    opacity={0.15}
                                />
                                <Path
                                    stroke="#5F84A1"
                                    strokeWidth={2}
                                    d="M34 1a33 33 0 0 1 0 66"
                                />
                                <Circle
                                    cx={34}
                                    cy={34}
                                    r={26}
                                    fill="#5F84A1"
                                />
                                <Path
                                    fill="#fff"
                                    d="M29.375 43.6a1.214 1.214 0 0 1-.375-.888c0-.341.125-.637.375-.887L36.7 34.5l-7.35-7.35a1.187 1.187 0 0 1-.35-.875c0-.35.125-.65.375-.9s.546-.375.888-.375c.341 0 .637.125.887.375l8.4 8.425c.1.1.171.208.213.325.041.117.062.242.062.375s-.02.258-.062.375a.883.883 0 0 1-.213.325l-8.425 8.425c-.233.233-.52.35-.862.35-.342 0-.638-.125-.888-.375Z"
                                />
                            </Svg>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

export default Onboarding1;

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    mainContainer: {
        backgroundColor: colors.white,
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        display: "flex",
        paddingHorizontal: sw(10)
    },
    title: {
        fontFamily: fonts.interSemiBold,
        fontSize: 32,
        color: "#0F4D66",
        marginBottom: sh(30),
    },
    description: {
        fontFamily: fonts.interRegular,
        marginHorizontal: sw(30),
        textAlign: "center",
        fontSize: 16
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
        marginBottom: sh(10),
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
