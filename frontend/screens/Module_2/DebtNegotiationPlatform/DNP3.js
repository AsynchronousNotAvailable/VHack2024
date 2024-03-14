import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from "react-native";
import { colors, fonts, sh, sw } from "../../../styles/GlobalStyles";
import PersonalLoanCard from "../Components/PersonalLoanCard";

function DNP3({ navigation }) {
    const handleSelection = () => {
        navigation.navigate("Debt Negotiation Platform4");
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
                    Tailored Suggestions for You
                </Text>
                <View style={{ width: "75%" }}>
                    <PersonalLoanCard />
                </View>

                <Text style={[styles.label, { paddingTop: 10 }]}>Loan Breakdown</Text>
                <View style={styles.infocard}>

                    <View style={styles.row}>
                        <Text style={[styles.label, { right: 30 }]}>Interest</Text>
                        <Text style={[styles.value, { left: 30 }]}>9%</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={[styles.label, { right: 30 }]}>Monthly Payment    </Text>
                        <Text style={[styles.value, { left: 30 }]}>RM1,311.77</Text>
                    </View>
                </View>

                <Text style={[styles.description, { paddingTop: 10 }]}>
                    Based on the information provided, here are our AI-driven strategies for your negotiation.
                </Text>
                <View style={{ width: "75%" }}>
                    <TouchableOpacity onPress={handleSelection}>
                        <View style={[styles.selectContainer, { borderColor: "#EFF1F5" }]}>
                            <Text style={styles.optionText}>Request a payment pause for 3 months</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleSelection}>
                        <View style={[styles.selectContainer, { borderColor: "#EFF1F5" }]}>
                            <Text style={styles.optionText}>Negotiate a reduced interest rate from 9% to 7%</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleSelection}>
                        <View style={[styles.selectContainer, { borderColor: "#EFF1F5" }]}>
                            <Text style={styles.optionText}>Extend the loan term from 24 months to 48 months</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ marginTop: sh(20), marginEnd: sw(30), alignSelf: "flex-end" }}>
                </View>
            </View>
        </ScrollView>
    );
}

export default DNP3;

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
        fontSize: 14,
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
    infocard: {
        backgroundColor: '#fff',
        padding: 20,
        paddingHorizontal: 30,
        borderRadius: 8,
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 1 },
        // shadowOpacity: 0.22,
        // shadowRadius: 2.22,
        // elevation: 3,
        backgroundColor: "#F6F8FA",
        marginVertical: 8,
        marginHorizontal: 16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingEnd: 20,
        alignItems: 'center',
        paddingVertical: 4,
        paddingHorizontal: 20,
    },
    label: {
        fontSize: 16,
        color: '#333',
    },
    value: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
});
