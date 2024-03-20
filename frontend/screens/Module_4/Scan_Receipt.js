import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Svg, { Path } from "react-native-svg";
import { fonts, sh } from "../../styles/GlobalStyles";

const Scan_Receipt = ({ navigation }) => {
    
    const transactionDetails = {
        date: new Date(),
        account: "Personal",
        category: "Student Loan",
        description: "student loan for 3rd semester",
        amount: 20000
    }
    
    useEffect(() => {
        //when mount, hide the tab bar
        navigation
            .getParent()
            ?.setOptions({ tabBarStyle: { display: "none" } });

        const timeout = setTimeout(() => {
            navigation.navigate("Expenses_Add_1", {transactionDetails: transactionDetails});
        }, 2000);

        

        //when unmount, show the tab bar
        return () => {
            clearTimeout(timeout);
            navigation
                .getParent()
                ?.setOptions({ tabBarStyle: { display: "flex" } });
        };
    }, []);
    return (
        <View
            style={{
                backgroundColor: "#5F84A1",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Svg
                xmlns="http://www.w3.org/2000/svg"
                width={214}
                height={194}
                fill="none"
            >
                <Path
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={12}
                    d="M7 167V67c0-11.046 8.954-20 20-20h5a20 20 0 0 0 16-8L70.2 9.4A6 6 0 0 1 75 7h64a6 6 0 0 1 4.8 2.4L166 39a20 20 0 0 0 16 8h5c11.046 0 20 8.954 20 20v100c0 11.046-8.954 20-20 20H27c-11.046 0-20-8.954-20-20Z"
                />
                <Path
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={12}
                    d="M107 147c22.091 0 40-17.909 40-40s-17.909-40-40-40c-22.092 0-40 17.909-40 40s17.908 40 40 40Z"
                />
            </Svg>

            <Text
                style={{
                    marginTop: sh(30),
                    fontFamily: fonts.interMedium,
                    fontSize: 22,
                    color: "white",
                }}
            >
                Scanning receipt...
            </Text>
        </View>
    );
};

export default Scan_Receipt;
