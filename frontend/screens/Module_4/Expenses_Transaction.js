import React, { useState } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { Picker, Item } from "@react-native-picker/picker";
import { sw, sh, fonts, colors } from "../../styles/GlobalStyles";
import { LinearGradient } from "expo-linear-gradient";
import { Path, Circle, Svg, Ellipse } from "react-native-svg";
import { AreaChart, Grid, YAxis, XAxis } from "react-native-svg-charts";
import * as Progress from "react-native-progress";

import * as shape from "d3-shape";

function Expenses_Transaction({ navigation }) {
    const [currentMonth, setCurrentMonth] = useState("March");
    const [selectedCategory, setSelectedCategory] = useState("key1");
    const data = [
        { key: "1", value: "Mobiles" },
        { key: "2", value: "Appliances" },
        { key: "3", value: "Cameras" },
    ];
    return (
        <ScrollView
            style={{
                backgroundColor: colors.white,
                height: "100%",
                position: "relative",
            }}
        >
            <View
                style={[
                    styles.rowContainer,
                    {
                        marginHorizontal: sw(20),
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderColor: "black",
                        borderWidth: 1,
                        position: "relative",
                    },
                ]}
            >
                <View
                    style={[
                        styles.rowContainer,
                        {
                            gap: 5,
                            borderColor: "black",
                            borderWidth: 1,
                            alignSelf: "flex-start",
                        },
                    ]}
                >
                    <TouchableOpacity>
                        <Text
                            style={[
                                styles.cardDescription,
                                { color: "#5F84A1", fontSize: 20 },
                            ]}
                        >
                            &lt;
                        </Text>
                    </TouchableOpacity>
                    <Text
                        style={[
                            styles.cardDescription,
                            { color: "#5F84A1", fontSize: 20 },
                        ]}
                    >
                        {currentMonth}
                    </Text>
                    <TouchableOpacity>
                        <Text
                            style={[
                                styles.cardDescription,
                                { color: "#5F84A1", fontSize: 20 },
                            ]}
                        >
                            &gt;
                        </Text>
                    </TouchableOpacity>
                </View>

                <View
                    style={{
                        position: "relative",
                        zIndex: 99,
                        right: 0,
                        bottom: 0,
                    }}
                >
                    <SelectList
                        dropdownStyles={{
                            position: "relative",
                            top: 0,
                            left: 0,
                            zIndex: 99,
                            backgroundColor: "white", // Background color of dropdown items
                            borderColor: "#5F84A1", // Border color of dropdown items
                            borderWidth: 1, // Border width of dropdown items
                            borderRadius: 5, // Border radius of dropdown items
                            paddingHorizontal: sw(10), // Horizontal padding of dropdown items
                            paddingVertical: sh(10), // Vertical padding of dropdown items
                        }}
                        setSelected={(val) => setSelectedCategory(val)}
                        fontFamily={fonts.interMedium}
                        data={data}
                        search={false}
                        boxStyles={{
                            borderRadius: 10,
                            borderColor: "#5F84A1",
                            paddingHorizontal: sw(10),
                            paddingVertical: sh(10),
                        }}
                        defaultOption={{ key: "1", value: "Jammu & Kashmir" }}
                    />
                    <Text>Hello</Text>
                </View>
            </View>
        </ScrollView>
    );
}

export default Expenses_Transaction;

const styles = StyleSheet.create({
    cardContainer: {
        display: "flex",
        flexDirection: "column",
        gap: 20,
        paddingHorizontal: sw(24),
        paddingVertical: sh(15),
        marginVertical: sh(15),
        marginHorizontal: sw(20),
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

    balanceContainer: {
        flexDirection: "column",
        gap: 4,
    },
    cardTitle: {
        fontFamily: fonts.interSemiBold,

        color: colors.white,
    },
    cardDescription: {
        fontFamily: fonts.interSemiBold,
        color: colors.white,
    },
    rowContainer: { flexDirection: "row" },
    columnContainer: { flexDirection: "column" },
    subTitleContainer: {
        flexDirection: "row",
        gap: 5,
    },
    subTitleText: {
        fontFamily: fonts.interMedium,
        color: colors.white,
    },
    chartContainer: {
        // marginHorizontal: sw(20),
        flexDirection: "column",
    },
});
