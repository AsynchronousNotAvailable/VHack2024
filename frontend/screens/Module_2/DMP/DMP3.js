import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, Linking } from "react-native";
import { colors, fonts, sh, sw } from "../../../styles/GlobalStyles";

function DMP3({ navigation }) {

    const handleSelection = () => {
        navigation.navigate("Debt Management Programme3");
    };

    const handleSelection1 = () => {
        navigation.navigate("Debt Negotiation Platform");
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

                <View style={{ width: "75%" }}>
                    <TouchableOpacity onPress={openLink}>
                        <View style={[styles.selectContainer, { borderColor: "#EFF1F5" }]}>
                            <Text style={styles.optionText}>Debt Restructuring</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleSelection1}>
                        <View style={[styles.selectContainer, { borderColor: "#EFF1F5" }]}>
                            <Text style={styles.optionText}>DebtFree Negotiation for
                                Debt Relief Plan</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleSelection}>
                        <View style={[styles.selectContainer, { borderColor: "#EFF1F5" }]}>
                            <Text style={styles.optionText}>Voluntary Arrangement</Text>
                        </View>
                    </TouchableOpacity>

                    <Text style={styles.description}>
                        Need further assistance?
                    </Text>

                    <TouchableOpacity onPress={handleSelection}>
                        <View style={[styles.selectContainer, { borderColor: "#EFF1F5" }]}>
                            <Text style={styles.optionText}>Debt Counselling</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ marginTop: sh(20), marginEnd: sw(30), alignSelf: "flex-end" }}>
                </View>
            </View>
        </ScrollView>
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
        paddingVertical: sh(15),
        paddingHorizontal: sw(20),
        width: "100%",
        borderRadius: 10,
        marginVertical: sh(10),
        borderColor: "#EFF1F5",
        borderWidth: 2,
        alignItems: "center",
    },
    optionText: {
        fontFamily: fonts.interMedium,
        fontSize: 18,
    },
    imageStyle: {
        width: sw(200),
        height: sh(200),
        resizeMode: 'contain',
    },
});
