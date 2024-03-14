import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, TextInput } from "react-native";
import { colors, fonts, sh, sw } from "../../../styles/GlobalStyles";
import React, { useState } from 'react';
import PersonalLoanCard from "../Components/PersonalLoanCard";

function InputForm() {
    const [reason, setReason] = useState('');
    const [email, setEmail] = useState('');

    return (
        <View style={styles.container}>
            <TextInput
                value={reason}
                onChangeText={setReason}
                placeholder="Reason"
                style={styles.input}
            />
            <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                style={styles.input}
                keyboardType="email-address"
            />
        </View>
    );
}

function DNP4({ navigation }) {
    const handleSelection = () => {
        navigation.navigate("Chat with Creditor");
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
                    Connect with Creditors
                </Text>

                <Text style={[styles.label, { paddingTop: 10 }]}>Selected Solution:</Text>


                <View style={{ width: "75%" }}>
                    <View style={[styles.selectContainer, { borderColor: "#EFF1F5" }]}>
                        <Text style={styles.optionText}>Request a payment pause for 3 months</Text>
                    </View>
                </View>
                <InputForm />



                <Text style={[styles.description, { paddingTop: 1 }]}>
                    Enter creditor’s email, if creditor is not in our platform, an automated invite will be send
                </Text>
                <View style={{ width: "75%" }}>
                    <View style={styles.doccard}>
                        <Image
                            source={require('../../../assets/Module_2/docicon.png')}
                            style={styles.icon}
                        />
                        <Text style={styles.text}>PaymentPauseRequestSD2.docx</Text>
                    </View>

                </View>
                <Text style={[styles.description, { paddingTop: 10 }]}>
                    You can use this auto generated template, you may use it if you could not connect Creditors through DebtFree
                </Text>

                <Text style={[styles.description, { paddingTop: 40 }]}>
                    Chat with Creditor
                </Text>
                <TouchableOpacity onPress={handleSelection}>
                    <Image
                        source={require("../../../assets/images/landing_progress_complete.png")}
                    ></Image>
                </TouchableOpacity>

                {/* <View style={{ marginTop: sh(20), marginEnd: sw(30), alignSelf: "flex-end" }}>
                </View> */}
            </View>
        </ScrollView >
    );
}

export default DNP4;

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
    doccard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 10,
        marginVertical: 5,
        backgroundColor: "#F6F8FA",
    },
    icon: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    text: {
        flex: 1,
        fontSize: 16,
        fontWeight: '400',
        color: '#000',
    },
    container: {
        padding: 20,
    },
    input: {
        width: 300,
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
        fontSize: 16,
    },
});
