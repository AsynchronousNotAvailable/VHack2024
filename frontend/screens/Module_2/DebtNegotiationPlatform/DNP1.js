import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from "react-native";
import { colors, fonts, sh, sw } from "../../../styles/GlobalStyles";
import PersonalLoanCard from "../Components/PersonalLoanCard";

function DNP1({ navigation }) {
    const handleSelection = () => {
        navigation.navigate("Debt Negotiation Platform2");
    };

    //
    //
    // NEED GET THE LOANS CARD FROM DEBT MODULE
    //
    //
    //
    //
    //
    //
    // NEED GET THE LOANS CARD FROM DEBT MODULE
    //
    //
    //
    //THIS ONE DONT HAVE "ALL ABOVE" OPTION


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
                    Choose related loans
                </Text>
                <Image
                    source={require("../../../assets/Module_2/dmp2.png")}
                    style={styles.imageStyle}
                />
                <Text style={styles.description}>
                    Choose the loan you want to negotiate
                </Text>

                <View style={{ width: "75%" }}>
                    <TouchableOpacity onPress={handleSelection}>
                        <PersonalLoanCard />
                    </TouchableOpacity>
                </View>

                <View style={{ marginTop: sh(20), marginEnd: sw(30), alignSelf: "flex-end" }}>
                </View>
            </View>
        </ScrollView>
    );
}

export default DNP1;

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
