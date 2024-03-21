import { View, Text, TouchableHighlight, Image, StyleSheet, ScrollView, Linking } from "react-native";
import { colors, fonts, sh, sw } from "../../../styles/GlobalStyles";

function DMP3({ navigation }) {

    const handleSelection = () => {
        navigation.navigate("Debt Management Programme3");
    };

    const handleSelection1 = () => {
        navigation.navigate("Debt Negotiation Platform");
    };

    const handleSelection3 = () => {
        navigation.navigate("Consult");
    };

    const openLink = async () => {
        const url = 'https://www.akpk.org.my/debt-management-programme';
        try {
            const supported = await Linking.canOpenURL(url);
            if (supported) {
                await Linking.openURL(url);
            } else {
                console.error("Can't handle URL: " + url);
            }
        } catch (error) {
            console.error("An error occurred", error);
        }
    };


    const openLinkvoluntary = async () => {
        const url = 'https://www.akpk.org.my/faq-details/17';
        try {
            const supported = await Linking.canOpenURL(url);
            if (supported) {
                await Linking.openURL(url);
            } else {
                console.error("Can't handle URL: " + url);
            }
        } catch (error) {
            console.error("An error occurred", error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <View style={styles.mainContainer}>
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
                    Based on your situation
                </Text>
                <Image
                    source={require("../../../assets/Module_2/dmp3.png")}
                    style={styles.imageStyle}
                />
                <Text style={styles.description}>
                    Here are some steps you can take right now.
                </Text>

                <View style={{ width: "75%", alignSelf: "center" }}>
                    <TouchableHighlight
                        underlayColor={colors.aliceBlue}
                        style={styles.selectContainer}
                        onPress={openLink}>
                        <Text style={styles.optionText}>Debt Restructuring</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                        underlayColor={colors.aliceBlue}
                        style={styles.selectContainer}
                        onPress={handleSelection1}>
                        <Text style={styles.optionText}>DebtFree Negotiation for Debt Relief Plan</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                        underlayColor={colors.aliceBlue}
                        style={styles.selectContainer}
                        onPress={openLinkvoluntary}>
                        <Text style={styles.optionText}>Voluntary Arrangement</Text>
                    </TouchableHighlight>

                    <Text style={[styles.description, { paddingTop: 30 }]}>
                        Need further assistance?
                    </Text>

                    <TouchableHighlight
                        underlayColor={colors.aliceBlue}
                        style={styles.selectContainer}
                        onPress={handleSelection3}>
                        <Text style={styles.optionText}>Debt Counselling</Text>
                    </TouchableHighlight>
                </View>


                <View style={{ marginTop: sh(20), marginEnd: sw(30), alignSelf: "flex-end" }}>
                </View>
            </View>
        </ScrollView >
    );
}

export default DMP3;

const styles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1,
        justifyContent: "top",
        backgroundColor: colors.white,
    },
    mainContainer: {
        backgroundColor: colors.white,
        alignItems: "center",
    },
    title: {
        fontFamily: fonts.interSemiBold,
        fontSize: 32,
        color: "#0F4D66",
        marginBottom: sh(0),
        marginTop: sh(0),
    },
    description: {
        fontFamily: fonts.interRegular,
        fontSize: 16,
        marginHorizontal: sw(30),
        textAlign: "center",
        marginBottom: sh(10),
    },
    selectContainer: {
        paddingHorizontal: sw(20),
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 15,
        paddingVertical: 15,
        marginVertical: 8,
        shadowColor: '#535990',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 4,
    },
    optionText: {
        fontFamily: fonts.interMedium,
        fontSize: 17,
        textAlign: 'center',
    },
    imageStyle: {
        width: sw(200),
        height: sh(200),
        resizeMode: 'contain',
    },
});
