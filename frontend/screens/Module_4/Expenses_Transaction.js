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
import { Path, Circle, Svg, Rect } from "react-native-svg";
import { AreaChart, Grid, YAxis, XAxis } from "react-native-svg-charts";

import DonutChartContainer from "./Utils/DonutChartContainer";

function Expenses_Transaction({ navigation }) {
    const [currentMonth, setCurrentMonth] = useState("March");
    const [selectedCategory, setSelectedCategory] = useState("key1");
    const data = [
        { key: "1", value: "Expenses" },
        { key: "2", value: "Income" },
        { key: "3", value: "Transfer" },
    ];

    // const n = 5;
    // const RADIUS = sw(100);
    // const STROKE_WIDTH = sw(30);
    // const OUTER_STROKE_WIDTH = sw(46);
    // const GAP = 0.04;
    // const totalValue = useSharedValue(0);
    // const decimals = useSharedValue<[number]>[];
    // const colors = ["#E5D8FF", "#FFF0D4", "#FDCED0", "#CAFDEA", "#BCDAFC"];
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
                        marginVertical: sh(10),
                        justifyContent: "space-between",
                        alignItems: "center",
                        // borderColor: "black",
                        // borderWidth: 1,
                        position: "relative",
                    },
                ]}
            >
                <View
                    style={[
                        styles.rowContainer,
                        {
                            marginHorizontal: sw(20),
                            gap: 10,
                            // borderColor: "black",
                            // borderWidth: 1,
                            alignSelf: "flex-start",
                        },
                    ]}
                >
                    <TouchableOpacity>
                        <Text
                            style={[
                                styles.cardDescription,
                                {
                                    color: "#5F84A1",
                                    fontSize: 20,
                                    fontWeight: "bold",
                                },
                            ]}
                        >
                            &lt;
                        </Text>
                    </TouchableOpacity>
                    <Text
                        style={[
                            styles.cardDescription,
                            {
                                color: "#5F84A1",
                                fontSize: 20,
                                // fontWeight: "bold",
                            },
                        ]}
                    >
                        {/* {currentMonth} */}
                        Mac 2024
                    </Text>
                    <TouchableOpacity>
                        <Text
                            style={[
                                styles.cardDescription,
                                {
                                    color: "#5F84A1",
                                    fontSize: 20,
                                    fontWeight: "bold",
                                },
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
                        defaultOption={{ key: "1", value: "Expenses" }}
                    />
                </View>
            </View>

            <DonutChartContainer />

            <View
                style={[
                    styles.columnContainer,
                    { marginHorizontal: sw(20), marginVertical: sh(10) },
                ]}
            >
                <Text
                    style={[
                        styles.cardTitle,
                        { fontSize: 18, marginBottom: sh(10) },
                    ]}
                >
                    Today
                </Text>

                <View
                    style={[
                        styles.rowContainer,
                        {
                            paddingHorizontal: sw(10),
                            paddingVertical: sh(10),
                            gap: 10,
                            justifyContent: "space-between",
                        },
                    ]}
                >
                    <View style={[styles.rowContainer, { gap: 15 }]}>
                        <Svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={60}
                            height={60}
                            fill="none"
                        >
                            <Rect
                                width={60}
                                height={60}
                                fill="#FCEED4"
                                rx={16}
                            />
                            <Path
                                fill="#FCAC12"
                                d="M41.25 35H18.225l1 5a6.25 6.25 0 0 0 6.125 5h9.3a6.25 6.25 0 0 0 6.125-5l1-5h-.525Zm-12.5 6.25a1.25 1.25 0 0 1-2.5 0v-2.5a1.25 1.25 0 0 1 2.5 0v2.5Zm5 0a1.25 1.25 0 0 1-2.5 0v-2.5a1.25 1.25 0 0 1 2.5 0v2.5ZM41.25 22.5h-2.5v-1.25A6.25 6.25 0 0 0 32.5 15h-5a6.25 6.25 0 0 0-6.25 6.25v1.25h-2.5A3.75 3.75 0 0 0 15 26.25v2.5a3.75 3.75 0 0 0 3.75 3.75h22.5A3.75 3.75 0 0 0 45 28.75v-2.5a3.75 3.75 0 0 0-3.75-3.75Zm-17.5-1.25a3.75 3.75 0 0 1 3.75-3.75h5a3.75 3.75 0 0 1 3.75 3.75v1.25h-12.5v-1.25Z"
                            />
                        </Svg>

                        <View
                            style={[
                                styles.columnContainer,
                                { justifyContent: "space-between" },
                            ]}
                        >
                            <Text
                                style={[styles.cardTitle, { marginTop: sh(5) }]}
                            >
                                Shopping
                            </Text>
                            <Text
                                style={[
                                    styles.cardDescription,
                                    {
                                        alignSelf: "flex-end",
                                        marginBottom: sh(5),
                                        color: "#91919F",
                                    },
                                ]}
                            >
                                Buy some grocery
                            </Text>
                        </View>
                    </View>

                    <View
                        style={[
                            styles.columnContainer,
                            {
                                justifyContent: "space-between",
                            },
                        ]}
                    >
                        <Text
                            style={[
                                styles.cardTitle,
                                {
                                    marginTop: sh(5),
                                    alignSelf: "flex-end",
                                    color: "#FD3C4A",
                                },
                            ]}
                        >
                            -$120
                        </Text>
                        <Text
                            style={[
                                styles.cardDescription,
                                {
                                    alignSelf: "flex-end",
                                    marginBottom: sh(5),
                                    alignSelf: "flex-end",
                                    color: "#91919F",
                                },
                            ]}
                        >
                            10:00AM
                        </Text>
                    </View>
                </View>

                <View
                    style={[
                        styles.rowContainer,
                        {
                            paddingHorizontal: sw(10),
                            paddingVertical: sh(10),
                            gap: 10,
                            justifyContent: "space-between",
                        },
                    ]}
                >
                    <View style={[styles.rowContainer, { gap: 15 }]}>
                        <Svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={60}
                            height={60}
                            fill="none"
                        >
                            <Rect
                                width={60}
                                height={60}
                                fill="#EEE5FF"
                                rx={16}
                            />
                            <Path
                                fill="#7F3DFF"
                                d="M46.25 41.25A1.25 1.25 0 0 0 45 42.5a2.5 2.5 0 1 1-3.75-2.175 1.25 1.25 0 0 0 2.1 1.075l1.762-1.762a1.25 1.25 0 0 0 0-1.776L43.35 36.1a1.249 1.249 0 0 0-1.775 0 1.25 1.25 0 0 0-.163 1.512A5 5 0 1 0 47.5 42.5a1.25 1.25 0 0 0-1.25-1.25Z"
                            />
                            <Path
                                fill="#7F3DFF"
                                d="M40.725 16.913a3.75 3.75 0 0 0-3.65-.163l-.375.188a1.25 1.25 0 0 1-1.025 0l-4.287-1.675a3.75 3.75 0 0 0-2.776 0l-4.287 1.712a1.25 1.25 0 0 1-1.025 0l-.375-.188A3.749 3.749 0 0 0 17.5 20.1v18.65A6.25 6.25 0 0 0 23.75 45h11.725A7.226 7.226 0 0 1 35 42.5v-.1a7.5 7.5 0 0 1 3.913-6.575 3.75 3.75 0 0 1 .937-1.6l.15-.138c.237-.208.497-.388.775-.537.459-.233.961-.37 1.475-.4h.25V20.1a3.75 3.75 0 0 0-1.775-3.188ZM32.5 36.25H25a1.25 1.25 0 0 1 0-2.5h7.5a1.25 1.25 0 0 1 0 2.5Zm2.5-7.5H25a1.25 1.25 0 0 1 0-2.5h10a1.25 1.25 0 0 1 0 2.5Z"
                            />
                        </Svg>

                        <View
                            style={[
                                styles.columnContainer,
                                { justifyContent: "space-between" },
                            ]}
                        >
                            <Text
                                style={[styles.cardTitle, { marginTop: sh(5) }]}
                            >
                                Entertainment
                            </Text>
                            <Text
                                style={[
                                    styles.cardDescription,
                                    {
                                        alignSelf: "flex-end",
                                        marginBottom: sh(5),
                                        color: "#91919F",
                                    },
                                ]}
                            >
                                Disney+ Subscription
                            </Text>
                        </View>
                    </View>

                    <View
                        style={[
                            styles.columnContainer,
                            {
                                justifyContent: "space-between",
                            },
                        ]}
                    >
                        <Text
                            style={[
                                styles.cardTitle,
                                {
                                    marginTop: sh(5),
                                    alignSelf: "flex-end",
                                    color: "#FD3C4A",
                                },
                            ]}
                        >
                            -$80
                        </Text>
                        <Text
                            style={[
                                styles.cardDescription,
                                {
                                    alignSelf: "flex-end",
                                    marginBottom: sh(5),
                                    alignSelf: "flex-end",
                                    color: "#91919F",
                                },
                            ]}
                        >
                            03:30PM
                        </Text>
                    </View>
                </View>

                <View
                    style={[
                        styles.rowContainer,
                        {
                            paddingHorizontal: sw(10),
                            paddingVertical: sh(10),
                            gap: 10,
                            justifyContent: "space-between",
                        },
                    ]}
                >
                    <View style={[styles.rowContainer, { gap: 15 }]}>
                        <Svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={60}
                            height={60}
                            fill="none"
                        >
                            <Rect
                                width={60}
                                height={60}
                                fill="#FDD5D7"
                                rx={16}
                            />
                            <Path
                                fill="#FD3C4A"
                                d="M37.5 15a6.25 6.25 0 0 0-6.25 6.25v2.5a6.25 6.25 0 0 0 5 6.125v2.85a3.75 3.75 0 0 0-2.5 3.525v5a3.75 3.75 0 0 0 7.5 0v-5a3.75 3.75 0 0 0-2.5-3.525v-2.85a6.25 6.25 0 0 0 5-6.125v-2.5A6.25 6.25 0 0 0 37.5 15ZM27.5 15a1.25 1.25 0 0 0-1.25 1.25v5a1.25 1.25 0 0 1-2.5 0v-5a1.25 1.25 0 0 0-2.5 0v5a1.25 1.25 0 0 1-2.5 0v-5a1.25 1.25 0 0 0-2.5 0v7.5a6.25 6.25 0 0 0 5 6.125v2.85a3.75 3.75 0 0 0-2.5 3.525v5a3.75 3.75 0 0 0 7.5 0v-5a3.75 3.75 0 0 0-2.5-3.525v-2.85a6.25 6.25 0 0 0 5-6.125v-7.5A1.25 1.25 0 0 0 27.5 15Z"
                            />
                        </Svg>

                        <View
                            style={[
                                styles.columnContainer,
                                { justifyContent: "space-between" },
                            ]}
                        >
                            <Text
                                style={[styles.cardTitle, { marginTop: sh(5) }]}
                            >
                                Food
                            </Text>
                            <Text
                                style={[
                                    styles.cardDescription,
                                    {
                                        alignSelf: "flex-end",
                                        marginBottom: sh(5),
                                        color: "#91919F",
                                    },
                                ]}
                            >
                                Buy a ramen
                            </Text>
                        </View>
                    </View>

                    <View
                        style={[
                            styles.columnContainer,
                            {
                                justifyContent: "space-between",
                            },
                        ]}
                    >
                        <Text
                            style={[
                                styles.cardTitle,
                                {
                                    marginTop: sh(5),
                                    alignSelf: "flex-end",
                                    color: "#FD3C4A",
                                },
                            ]}
                        >
                            -$32
                        </Text>
                        <Text
                            style={[
                                styles.cardDescription,
                                {
                                    alignSelf: "flex-end",
                                    marginBottom: sh(5),
                                    alignSelf: "flex-end",
                                    color: "#91919F",
                                },
                            ]}
                        >
                            07:30PM
                        </Text>
                    </View>
                </View>
            </View>

            <View
                style={[
                    styles.columnContainer,
                    { marginHorizontal: sw(20), marginVertical: sh(10) },
                ]}
            >
                <Text
                    style={[
                        styles.cardTitle,
                        { fontSize: 18, marginBottom: sh(10) },
                    ]}
                >
                    Yesterday
                </Text>

                <View
                    style={[
                        styles.rowContainer,
                        {
                            paddingHorizontal: sw(10),
                            paddingVertical: sh(10),
                            gap: 10,
                            justifyContent: "space-between",
                        },
                    ]}
                >
                    <View style={[styles.rowContainer, { gap: 15 }]}>
                        <Svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={60}
                            height={60}
                            fill="none"
                        >
                            <Rect
                                width={60}
                                height={60}
                                fill="#FCEED4"
                                rx={16}
                            />
                            <Path
                                fill="#FCAC12"
                                d="M41.25 35H18.225l1 5a6.25 6.25 0 0 0 6.125 5h9.3a6.25 6.25 0 0 0 6.125-5l1-5h-.525Zm-12.5 6.25a1.25 1.25 0 0 1-2.5 0v-2.5a1.25 1.25 0 0 1 2.5 0v2.5Zm5 0a1.25 1.25 0 0 1-2.5 0v-2.5a1.25 1.25 0 0 1 2.5 0v2.5ZM41.25 22.5h-2.5v-1.25A6.25 6.25 0 0 0 32.5 15h-5a6.25 6.25 0 0 0-6.25 6.25v1.25h-2.5A3.75 3.75 0 0 0 15 26.25v2.5a3.75 3.75 0 0 0 3.75 3.75h22.5A3.75 3.75 0 0 0 45 28.75v-2.5a3.75 3.75 0 0 0-3.75-3.75Zm-17.5-1.25a3.75 3.75 0 0 1 3.75-3.75h5a3.75 3.75 0 0 1 3.75 3.75v1.25h-12.5v-1.25Z"
                            />
                        </Svg>

                        <View
                            style={[
                                styles.columnContainer,
                                { justifyContent: "space-between" },
                            ]}
                        >
                            <Text
                                style={[styles.cardTitle, { marginTop: sh(5) }]}
                            >
                                Shopping
                            </Text>
                            <Text
                                style={[
                                    styles.cardDescription,
                                    {
                                        alignSelf: "flex-end",
                                        marginBottom: sh(5),
                                        color: "#91919F",
                                    },
                                ]}
                            >
                                Buy some grocery
                            </Text>
                        </View>
                    </View>

                    <View
                        style={[
                            styles.columnContainer,
                            {
                                justifyContent: "space-between",
                            },
                        ]}
                    >
                        <Text
                            style={[
                                styles.cardTitle,
                                {
                                    marginTop: sh(5),
                                    alignSelf: "flex-end",
                                    color: "#FD3C4A",
                                },
                            ]}
                        >
                            -$120
                        </Text>
                        <Text
                            style={[
                                styles.cardDescription,
                                {
                                    alignSelf: "flex-end",
                                    marginBottom: sh(5),
                                    alignSelf: "flex-end",
                                    color: "#91919F",
                                },
                            ]}
                        >
                            10:00AM
                        </Text>
                    </View>
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
        color: colors.black,
    },
    cardDescription: {
        fontFamily: fonts.interRegular,
        color: colors.black,
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
