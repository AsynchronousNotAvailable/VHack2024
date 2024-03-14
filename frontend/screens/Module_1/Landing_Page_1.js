import {
    Image,
    StyleSheet,
    Text,
    View,
    Animated,
    TouchableOpacity,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { useFonts } from "expo-font";
import { colors, fonts, sh, sw } from "../../styles/GlobalStyles";

function Landing_Page_1({ navigation, route }) {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const { firstLaunch } = route.params;
    const nextPage = () => {
        if (firstLaunch) {
            navigation.navigate("SignUp");
        }
        else {
            navigation.navigate("Login");
        }
        
    }
    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();



    }, []);

    return (
        // <View style={{ backgroundColor: colors.aliceBlue }}>
        //     <Text style={{ fontFamily: fonts.interBlack }}>Landing Page 1</Text>
        //     <Text style={{ fontFamily: fonts.interExtraLight }}>
        //         Landing Page 1
        //     </Text>
        //     <Text style={{ fontFamily: fonts.interLight }}>Landing Page 1</Text>
        //     <Text style={{ fontFamily: fonts.interMedium }}>
        //         Landing Page 1
        //     </Text>
        //     <Text style={{ fontFamily: fonts.interRegular }}>
        //         Landing Page 1
        //     </Text>
        //     <Text style={{ fontFamily: fonts.interSemiBold }}>
        //         Landing Page 1
        //     </Text>
        //     <Text style={{ fontFamily: fonts.interThin }}>Landing Page 1</Text>
        //     <Text style={{ fontFamily: fonts.openSansBold }}>
        //         Landing Page 1
        //     </Text>
        //     <TouchableOpacity
        //         style={styles.button}
        //         onPress={() => navigation.navigate("Landing2")}
        //     >
        //         <Text style={styles.buttonText}>Next</Text>
        //     </TouchableOpacity>
        // </View>

        <View
            style={{
                backgroundColor: colors.white,
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Animated.Image
                source={require("../../assets/images/debtfree.png")}
                style={{
                    opacity: fadeAnim,
                }}
            />
            <Text style={styles.title}>Debt Free</Text>
            <Text style={styles.subtitle}>
                Your Journey to Debt-Free Starts Here
            </Text>

            <TouchableOpacity style={styles.button} onPress={nextPage}>
                <Text style={styles.btnText}>Start</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Landing_Page_1;

// const styles = StyleSheet.create({
//     buttonText: {
//         fontFamily: fonts.openSansBold,
//         fontSize: 16,
//         color: "black", // Adjust text color if necessary
//         textAlign: "center", // Center text horizontally
//         opacity: 1,
//     },
//     button: {
//         backgroundColor: colors.aliceBlue,
//         paddingVertical: sh(12), // Add more padding vertically
//         paddingHorizontal: sw(20), // Add more padding horizontally
//         borderRadius: 8, // Add border radius for rounded corners
//         borderWidth: 2, // Add border width
//         borderColor: colors.black, // Add border color
//         marginHorizontal: 20, // Add margin to the left and right
//         marginTop: sh(20), // Optional: Add margin to the top
//         alignItems: "center", // Align content horizontally (center text)
//         justifyContent: "center", // Align content vertically (center text)
//     },
// });

const styles = StyleSheet.create({
    title: {
        fontFamily: fonts.interSemiBold,
        fontSize: 32,
        color: "#0F4D66",
        marginBottom: sh(10)
    },
    subtitle: {
        fontFamily: fonts.interRegular,
        fontSize: 14,
        color: "#5B5B5E",
    },
    button: {
        backgroundColor: "#5F84A1",
        paddingVertical: sh(13),
        paddingHorizontal: sw(20),
        marginTop: sh(60),
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
