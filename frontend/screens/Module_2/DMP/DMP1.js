import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from "react-native";
import { colors, fonts, sh, sw } from "../../../styles/GlobalStyles";

function DMP1({ navigation }) {
    // Simplified selection function that navigates to the next page
    const handleSelection = () => {
        navigation.navigate("Debt Management Programme2");
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
                    Describe Your Financial Situation
                </Text>
                <Image
                    source={require("../../../assets/Module_2/dmp1.png")}
                    style={styles.imageStyle}
                />
                <Text style={styles.description}>
                    Select the option that best describes your current state. This will help us guide you to the most appropriate services.
                </Text>

                <View style={{ width: "75%" }}>
                    <TouchableOpacity onPress={handleSelection}>
                        <View style={[styles.selectContainer, { borderColor: "#EFF1F5" }]}>
                            <Text style={styles.optionText}>Struggling with Credit Card Debt</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleSelection}>
                        <View style={[styles.selectContainer, { borderColor: "#EFF1F5" }]}>
                            <Text style={styles.optionText}>Facing Home Loan Arrears</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleSelection}>
                        <View style={[styles.selectContainer, { borderColor: "#EFF1F5" }]}>
                            <Text style={styles.optionText}>Difficulty Paying Personal Loans</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleSelection}>
                        <View style={[styles.selectContainer, { borderColor: "#EFF1F5" }]}>
                            <Text style={styles.optionText}>Need Help Managing Multiple Debts</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleSelection}>
                        <View style={[styles.selectContainer, { borderColor: "#EFF1F5" }]}>
                            <Text style={styles.optionText}>Other</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ marginTop: sh(20), marginEnd: sw(30), alignSelf: "flex-end" }}>
                    {/* This button can be removed or repurposed since selection now navigates */}
                </View>
            </View>
        </ScrollView>
    );
}

export default DMP1;

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
