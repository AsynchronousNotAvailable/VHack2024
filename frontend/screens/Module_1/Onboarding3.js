import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useState } from "react";
import { colors, fonts, sh, sw } from "../../styles/GlobalStyles";

function Onboarding3({ route }) {
    const { setIsAuth, setFirstLaunch } = route.params;

    const toHome = () => {
        setIsAuth(true);
        setFirstLaunch(false);
    };
    return (
        <View style={styles.mainContainer}>
            <Text style={styles.title}>Debt Free</Text>
            <Image
                source={require("../../assets/images/landing_budget.png")}
            ></Image>
            <Text
                style={[
                    styles.title,
                    {
                        fontFamily: fonts.interSemiBold,
                        fontSize: 22,
                        marginTop: sh(25),
                    },
                ]}
            >
                You're All Set
            </Text>
            <Text style={styles.description}>
                Dive into your personalized dashboard, track your spending, and
                start making progress towards your financial goals today.
            </Text>

            <View style={styles.button}>
                <TouchableOpacity onPress={toHome}>
                    <Text style={styles.btnText}>Explore The App</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Onboarding3;

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
    btnText: {
        fontFamily: fonts.interSemiBold,
        fontSize: 18,
        color: colors.white,
    },
});
