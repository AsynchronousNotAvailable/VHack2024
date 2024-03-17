import React from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { sw, sh, fonts, colors } from "../../styles/GlobalStyles";
import { LinearGradient } from "expo-linear-gradient";
import { Path, Circle, Svg, Ellipse } from "react-native-svg";
import { AreaChart, Grid, YAxis, XAxis } from "react-native-svg-charts";
import * as Progress from "react-native-progress";

import * as shape from "d3-shape";

function Expenses_Main({ navigation }) {
    const toTransactionPage = () => {
        navigation.navigate("Expenses_Transaction");
    };

    const toAddBudget = () => {
        navigation.navigate("Expenses_Add_1");
    };

    const toAddBudgetBottom = () => {
        navigation.navigate("Expenses_Budget");
    
    }
    // const data = [
    //     { month: "Jan", value: 50 },
    //     { month: "Feb", value: 100 },
    //     { month: "Mar", value: 400 },
    //     { month: "Apr", value: 250 },
    //     { month: "May", value: 300 },
    //     { month: "Jun", value: 280 },
    //     { month: "Jul", value: 470 },
    //     { month: "Aug", value: 600 },
    //     { month: "Sep", value: 500 },
    //     { month: "Oct", value: 200 },
    //     { month: "Nov", value: 350 },
    //     { month: "Dec", value: 120 },
    // ];

    // const formatData = (data) => {
    //     return data.map((point) => ({
    //         x: point.month,
    //         y: point.value,
    //     }));
    // };

    // const formattedData = formatData(data);

    const data = [50, 10, 40, 95, 30, 24, 85, 91, 35, 53, 53, 24];
    const xLabels = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        // "Jul",
        // "Aug",
        // "Sep",
        // "Oct",
        // "Nov",
        // "Dec",
    ];
    const yLabels = ["Poor", "Fair", "Good", "Very Good", "Excellent"];

    const Line = ({ line }) => (
        <Path
            key={"line"}
            d={line}
            stroke={"rgb(95, 132, 161)"}
            fill={"none"}
        />
    );

    return (
        <ScrollView style={{ backgroundColor: colors.white, height: "100%" }}>
            <LinearGradient
                style={styles.cardContainer}
                colors={["#7499B6", "#5F84A1", "#314452"]}
                start={{ x: 0.4, y: -0.9 }}
                end={{ x: 0, y: 0 }}
                locations={[0, 0.3, 1]}
            >
                <View style={styles.balanceContainer}>
                    <Text style={[styles.cardTitle, { fontSize: 18 }]}>
                        Total Balance
                    </Text>
                    <Text style={[styles.cardDescription, { fontSize: 30 }]}>
                        RM 2548.00
                    </Text>
                </View>

                <View style={styles.rowContainer}>
                    <View style={[styles.columnContainer, { flex: 1 }]}>
                        <View style={styles.subTitleContainer}>
                            <Image
                                source={require("../../assets/images/expenses_arrow_up.png")}
                            />
                            <Text
                                style={[
                                    styles.subTitleText,
                                    { fontSize: 16, color: "#D0DAE5" },
                                ]}
                            >
                                Income
                            </Text>
                        </View>
                        <Text style={[styles.subTitleText, { fontSize: 20 }]}>
                            RM 1840.00
                        </Text>
                    </View>
                    <View style={styles.columnContainer}>
                        <View style={styles.subTitleContainer}>
                            <Image
                                source={require("../../assets/images/expenses_arrow_down.png")}
                            />
                            <Text
                                style={[
                                    styles.subTitleText,
                                    { fontSize: 16, color: "#D0DAE5" },
                                ]}
                            >
                                Expenses
                            </Text>
                        </View>
                        <Text style={[styles.subTitleText, { fontSize: 20 }]}>
                            RM 544.00
                        </Text>
                    </View>
                </View>
            </LinearGradient>
            <View
                style={[
                    styles.rowContainer,
                    {
                        marginHorizontal: sw(20),
                        justifyContent: "space-between",
                        alignItems: "flex-end",
                    },
                ]}
            >
                <Text
                    style={[
                        styles.cardTitle,
                        { color: colors.black, fontSize: 18, flex: 1 },
                    ]}
                >
                    Transactions History
                </Text>
                <TouchableOpacity onPress={toTransactionPage}>
                    <Text
                        style={[
                            {
                                fontFamily: fonts.interRegular,
                                color: colors.black,
                                fontSize: 16,
                            },
                        ]}
                    >
                        See All
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.chartContainer}>
                <View style={styles.rowContainer}>
                    {/* <YAxis
                        svg={{
                            fill: "",
                            fontSize: 15,
                        }}
                        contentInset={{ top: 20, bottom: 20 }}
                        data={yLabels}
                        min={0}
                        max={100}
                        numberOfTicks={yLabels.length}
                        formatLabel={(value) => `${value}`}
                    /> */}
                    <AreaChart
                        style={{
                            height: sh(230),
                            marginHorizontal: sw(20),
                            flex: 1,
                        }}
                        data={data}
                        contentInset={{ top: 30, bottom: 30 }}
                        curve={shape.curveNatural}
                        svg={{ fill: "rgba(95, 132, 161, 0.3)" }}
                        // yAccessor={({ item }) => item.value}
                        // xAccessor={({ item }) => item.month}
                    >
                        {/* <Grid /> */}

                        <Line />
                    </AreaChart>
                </View>
                <XAxis
                    data={xLabels}
                    contentInset={{ left: 30, right: 30 }}
                    svg={{
                        fill: "rgb(102,102,102)",
                        fontSize: 15,
                    }}
                    numberOfTicks={xLabels.length}
                    formatLabel={(value, index) => xLabels[index]}
                />
            </View>

            {/* details parent frame */}
            <View
                style={[
                    styles.columnContainer,
                    {
                        marginVertical: sh(10),
                        marginHorizontal: sw(20),
                        gap: 20,
                        position: "relative",
                    },
                ]}
            >
                {/* details header frame */}
                <View style={styles.columnContainer}>
                    <Text
                        style={[
                            styles.cardTitle,
                            { color: colors.black, fontSize: 18 },
                        ]}
                    >
                        Budgets
                    </Text>
                    <View
                        style={[
                            styles.rowContainer,
                            {
                                justifyContent: "space-between",

                                alignItems: "center",
                            },
                        ]}
                    >
                        <Text
                            style={[
                                styles.subTitleText,
                                { color: "#91919F", flex: 1 },
                            ]}
                        >
                            This month
                        </Text>
                        <View
                            style={[
                                styles.rowContainer,
                                {
                                    gap: 15,
                                },
                            ]}
                        >
                            <View
                                style={[
                                    styles.rowContainer,
                                    { gap: 1, alignItems: "center" },
                                ]}
                            >
                                <Svg height="24" width="24">
                                    <Circle
                                        cx="11"
                                        cy="11"
                                        r="8"
                                        fill="#B5FFE3"
                                    />
                                </Svg>
                                <Text
                                    style={[
                                        styles.subTitleText,
                                        { color: "#91919F" },
                                    ]}
                                >
                                    In limit
                                </Text>
                            </View>
                            <View
                                style={[
                                    styles.rowContainer,
                                    { gap: 1, alignItems: "center" },
                                ]}
                            >
                                <Svg height="24" width="24">
                                    <Circle
                                        cx="11"
                                        cy="11"
                                        r="8"
                                        fill="#FFD1D3"
                                    />
                                </Svg>
                                <Text
                                    style={[
                                        styles.subTitleText,
                                        { color: "#91919F" },
                                    ]}
                                >
                                    Overspend
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* details frame */}
                <View style={[styles.columnContainer, { gap: 10 }]}>
                    <View style={[styles.columnContainer]}>
                        <Text
                            style={[
                                styles.cardTitle,
                                { color: colors.black, fontSize: 18 },
                            ]}
                        >
                            Food
                        </Text>

                        <View
                            style={[
                                styles.rowContainer,
                                {
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                },
                            ]}
                        >
                            <Text
                                style={[
                                    {
                                        fontFamily: fonts.interRegular,
                                        color: colors.black,
                                        fontSize: 18,
                                        flex: 1,
                                    },
                                ]}
                            >
                                RM600 Spent
                            </Text>
                            <Text
                                style={[
                                    {
                                        fontFamily: fonts.interRegular,
                                        color: colors.black,
                                        fontSize: 18,
                                    },
                                ]}
                            >
                                RM1000
                            </Text>
                        </View>
                    </View>
                    <Progress.Bar
                        progress={0.5}
                        color="#B5FFE3"
                        width={sw(370)}
                    />
                </View>

                {/* details frame */}
                <View style={[styles.columnContainer, { gap: 10 }]}>
                    <View style={[styles.columnContainer]}>
                        <Text
                            style={[
                                styles.cardTitle,
                                { color: colors.black, fontSize: 18 },
                            ]}
                        >
                            Clothing
                        </Text>

                        <View
                            style={[
                                styles.rowContainer,
                                {
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                },
                            ]}
                        >
                            <Text
                                style={[
                                    {
                                        fontFamily: fonts.interRegular,
                                        color: colors.black,
                                        fontSize: 18,
                                        flex: 1,
                                    },
                                ]}
                            >
                                RM100 Spent
                            </Text>
                            <Text
                                style={[
                                    {
                                        fontFamily: fonts.interRegular,
                                        color: colors.black,
                                        fontSize: 18,
                                    },
                                ]}
                            >
                                RM500
                            </Text>
                        </View>
                    </View>
                    <Progress.Bar
                        progress={1}
                        color="#FFD1D3"
                        width={sw(370)}
                    />
                </View>

                <TouchableOpacity onPress={toAddBudgetBottom}>
                    <View
                        style={{
                            paddingHorizontal: sw(15),
                            paddingVertical: sh(30),
                            backgroundColor: "rgba(128, 128, 128, 0.1)",
                            width: "40%",
                            borderRadius: 10,
                            justifyContent: "center",
                        }}
                    >
                        <Text
                            style={[
                                styles.cardTitle,
                                {
                                    color: "#5F84A1",
                                    fontSize: 16,
                                    position: "absolute",
                                    alignSelf: "center",
                                },
                            ]}
                        >
                            Add Budget +
                        </Text>
                    </View>
                </TouchableOpacity>

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

export default Expenses_Main;

const styles = StyleSheet.create({
    cardContainer: {
        display: "flex",
        flexDirection: "column",
        gap: 20,
        paddingHorizontal: sw(24),
        paddingVertical: sh(15),
        marginVertical: sh(15),
        marginHorizontal: sw(20),
        borderRadius: 10,
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
