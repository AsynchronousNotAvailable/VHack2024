import React, { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { Path, Svg, Ellipse, Rect } from "react-native-svg";
import { sw, sh, fonts, colors } from "../../styles/GlobalStyles";

import DonutChartContainer from "./Utils/DonutChart/DonutChartContainer.js";
import Transaction_Card from "./Utils/Transaction/Transaction_Card.js";

function Expenses_Transaction({ navigation }) {
    const [currentMonth, setCurrentMonth] = useState("March");
    const [selectedCategory, setSelectedCategory] = useState("key1");
    const data = [
        { key: "1", value: "Expenses" },
        { key: "2", value: "Income" },
        { key: "3", value: "Transfer" },
    ];

    const card_details_today = require("./MockData/Card_Details_Today.js");
    const card_details_ytd = require("./MockData/Card_Details_Yesterday.js");
    const toAddBudget = () => {
        navigation.navigate("Expenses_Add_1");
    };

    console.log(card_details_today);

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

                {card_details_today &&
                    card_details_today.default.map((item, index) => (
                        <Transaction_Card
                            key={index}
                            category={item.category}
                            name={item.name}
                            description={item.description}
                            amount={item.amount}
                            time={item.time}
                        />
                    ))}
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

                {card_details_ytd &&
                    card_details_ytd.default.map((item, index) => (
                        <Transaction_Card
                            key={index}
                            category={item.category}
                            name={item.name}
                            description={item.description}
                            amount={item.amount}
                            time={item.time}
                        />
                    ))}

                <View
                    style={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        alignSelf: "flex-end",
                    }}
                >
                    <TouchableOpacity onPress={toAddBudget}>
                        <Svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={60}
                            height={60}
                            fill="none"
                            opacity={0.8}
                        >
                            <Ellipse
                                cx={30.526}
                                cy={29.698}
                                fill="#5F84A1"
                                rx={29.474}
                                ry={29.698}
                            />
                            <Path
                                fill="#000"
                                stroke="#FCFCFC"
                                strokeWidth={2.5}
                                d="M31.085 30.067H29.84v11.864a.071.071 0 0 1-.067.07.07.07 0 0 1-.046-.02.072.072 0 0 1-.02-.05V30.067H17.931a.07.07 0 0 1-.07-.067.071.071 0 0 1 .07-.067h11.774V18.145a.07.07 0 0 1 .115-.029.072.072 0 0 1 .019.029v11.788H41.665l.048-.004c.01 0 .02 0 .029.004l.409-1.185-.41 1.185a.07.07 0 0 1 .042.039l1.139-.502-1.139.502a.07.07 0 0 1 .006.028h1.245-1.245a.072.072 0 0 1-.047.067.07.07 0 0 1-.029.004l-.048-.004h-10.58Z"
                            />
                        </Svg>
                    </TouchableOpacity>
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
