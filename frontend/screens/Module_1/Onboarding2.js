import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useState } from "react";
import { colors, fonts, sh, sw } from "../../styles/GlobalStyles";
function Onboarding2({ navigation }) {
    const [isPressed1, setIsPressed1] = useState(false);
    const [isPressed2, setIsPressed2] = useState(false);
    const [isPressed3, setIsPressed3] = useState(false);

    const selectContainer1 = () => {
        setIsPressed1(!isPressed1);
    };
    const selectContainer2 = () => {
        setIsPressed2(!isPressed2);
    };
    const selectContainer3 = () => {
        setIsPressed3(!isPressed3);
    };
    const nextPage = () => {
        navigation.navigate("Onboarding3");
    };
    return (
        <View style={styles.mainContainer}>
            <Text style={styles.title}>Debt Free</Text>
            <Image
                source={require("../../assets/images/landing_finance.png")}
            ></Image>
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
                Define Your Financial Goals
            </Text>
            <Text style={styles.description}>
                Everyone's financial journey is unique.{"\n"}What's your main
                goal with DebtFree?
            </Text>

            <View
                style={{
                    width: "75%",
                }}
            >
                <TouchableOpacity onPress={selectContainer1}>
                    <View
                        style={[
                            styles.selectContainer,
                            { borderColor: isPressed1 ? "purple" : "#EFF1F5" },
                        ]}
                    >
                        <Text
                            style={{
                                fontFamily: fonts.interMedium,
                                fontSize: 18,
                            }}
                        >
                            Reduce My Debt
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={selectContainer2}>
                    <View
                        style={[
                            styles.selectContainer,
                            { borderColor: isPressed2 ? "purple" : "#EFF1F5" },
                        ]}
                    >
                        <Text
                            style={{
                                fontFamily: fonts.interMedium,
                                fontSize: 18,
                            }}
                        >
                            Manage My Expenses Better
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={selectContainer3}>
                    <View
                        style={[
                            styles.selectContainer,
                            { borderColor: isPressed3 ? "purple" : "#EFF1F5" },
                        ]}
                    >
                        <Text
                            style={{
                                fontFamily: fonts.interMedium,
                                fontSize: 18,
                            }}
                        >
                            Save for a big purchase
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View
                style={{
                    marginTop: sh(20),
                    marginEnd: sw(30),
                    alignSelf: "flex-end",
                }}
            >
                <TouchableOpacity onPress={nextPage}>
                    <Image
                        source={require("../../assets/images/landing_progress_complete.png")}
                    ></Image>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Onboarding2;

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: colors.white,
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        display: "flex",
        paddingHorizontal: sw(10),
    },
    title: {
        fontFamily: fonts.interSemiBold,
        fontSize: 32,
        color: "#0F4D66",
        marginBottom: sh(15),
        marginTop: sh(30),
    },
    description: {
        fontFamily: fonts.interRegular,
        fontSize: 16,
        marginHorizontal: sw(30),
        textAlign: "center",
        marginBottom: sh(10),
    },
    selectContainer: {
        paddingVertical: sh(15),
        paddingHorizontal: sw(20),
        width: "100%",
        borderRadius: 10,
        marginVertical: sh(15),
        borderColor: "#EFF1F5",
        borderWidth: 2,
        alignItems: "center",
    },
});
