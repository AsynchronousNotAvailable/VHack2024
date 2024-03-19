import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { LineChart } from "react-native-gifted-charts";
import { sw, sh } from "../../styles/GlobalStyles";

const Debt_Main = () => {
    const data = [
        { value: 20 },
        { value: 30 },
        { value: 20 },
        { value: 20 },
        { value: 30 },
        { value: 20 },
    ];
    const data2 = [
        { value: 10 },
        { value: 20 },
        { value: 30 },
        { value: 40 },
        { value: 50 },
        { value: 50 },
    ];
    const [currentData, setCurrentData] = useState(data);

    const xAxisLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

    const handleDataChange = () => {
        setCurrentData(data2);
    };
    return (
        <View>
            {/* <LineChart
                isAnimated
                curved
                thickness={3}
                width={300}
                color="#07BAD1"
                maxValue={50}
                // noOfSections={2}
                animateOnDataChange
                animationDuration={1000}
                onDataChangeAnimationDuration={300}
                areaChart
                // yAxisTextStyle={{ color: "lightgray" }}
                data={currentData}
                hideDataPoints
                startFillColor={"rgb(84,219,234)"}
                endFillColor={"rgb(84,219,234)"}
                startOpacity={0.4}
                endOpacity={0.1}
                spacing={22}
                // backgroundColor="#414141"
                // rulesColor="gray"
                // rulesType="solid"
                initialSpacing={10}
                // yAxisColor="lightgray"
                // xAxisColor="lightgray"
            /> */}

            <LineChart
                areaChart
                color="#07BAD1"
                curved
                data={data}
                maxValue={50}
                startFillColor="rgb(46, 217, 255)"
                startOpacity={0.8}
                endFillColor="rgb(203, 241, 250)"
                endOpacity={0.3}
                xAxisLabelTexts={xAxisLabels}
                // hideYAxisText
                noOfSections={5}
                xAxisThickness={0}
                yAxisThickness={0}
            />
            <TouchableOpacity onPress={handleDataChange}>
                <View
                    style={{
                        paddingVertical: sh(5),
                        paddingHorizontal: sw(5),
                        backgroundColor: "grey",
                    }}
                >
                    <Text>Change</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default Debt_Main;
