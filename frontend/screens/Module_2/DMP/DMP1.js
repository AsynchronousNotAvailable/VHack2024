import { View, Text, TouchableOpacity, TouchableHighlight, Image, StyleSheet, ScrollView } from "react-native";
import { colors, fonts, sh, sw } from "../../../styles/GlobalStyles";

function DMP1({ navigation }) {
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

                <View style={{ width: '80%' }}>
                    {['Struggling with Credit Card Debt', 'Facing Home Loan Arrears', 'Difficulty Paying Personal Loans', 'Need Help Managing Multiple Debts', 'Other'].map((option, index) => (
                        <TouchableHighlight
                            key={index}
                            underlayColor={colors.aliceBlue}
                            style={styles.selectContainer}
                            onPress={handleSelection}
                        >
                            <Text style={styles.optionText}>{option}</Text>
                        </TouchableHighlight>
                    ))}
                </View>

                <View style={{ marginTop: sh(20), marginEnd: sw(30), alignSelf: "flex-end" }}>
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
