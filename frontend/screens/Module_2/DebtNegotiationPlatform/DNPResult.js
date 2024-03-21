import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, TextInput } from "react-native";
import { colors, fonts, sh, sw } from "../../../styles/GlobalStyles";
import React, { useState } from 'react';
import PersonalLoanCard from "../Components/PersonalLoanCard";
import AKPKNameCard from "../Components/AKPKNameCard";


function DNPResult({ navigation }) {
    const handleSelection = () => {
        navigation.navigate("Home_Main");
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
                    Agreement and Confirmation
                </Text>

                <Text style={[styles.label, { paddingTop: 10 }]}>Accepted Solution:</Text>


                <View style={{ width: "75%" }}>
                    <View style={[styles.selectContainer, { borderColor: "#EFF1F5" }]}>
                        <Text style={styles.optionText}>Payment pause for 2 months</Text>
                    </View>
                </View>



                <View style={{ width: "75%" }}>
                    <View style={styles.doccard}>
                        <Image
                            source={require('../../../assets/Module_2/docicon.png')}
                            style={styles.icon}
                        />
                        <Text style={styles.text}>MBBMYJason15Agreement.docx</Text>
                    </View>

                </View>

                <Text style={[styles.text, { paddingTop: 30 }]}>Valid by</Text>
                <AKPKNameCard />

                <Text style={[styles.description, { paddingTop: 40 }]}>
                    Confirm
                </Text>
                <TouchableOpacity onPress={handleSelection}>
                    <Image
                        source={require("../../../assets/images/landing_progress_complete.png")}
                    ></Image>
                </TouchableOpacity>
            </View>
        </ScrollView >
    );
}

export default DNPResult;

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