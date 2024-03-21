/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import DonutChart from './DonutChart';
import { useFont, SkFont, Skia, SkRect } from '@shopify/react-native-skia';
import { SharedValue, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';
import { calculatePercentage } from './calculatePercentage';
import RenderItem from './RenderItem';
import { SafeAreaView } from 'react-native-safe-area-context';
import { sw, sh, fonts } from '../../../styles/GlobalStyles';

const styles = StyleSheet.create({
    mainTitle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: sw(20),
        fontWeight: 'bold',
    },
    monthlyPaymentContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'flex-start',
        margin: sw(10),
        borderRadius: 10,
    },
    container: {
        flex: 1,
        backgroundColor: '#DFEEF8',
    },
    chartAndLabel: {
        flex: 1,
        flexDirection: 'row',
    },
    labels: {
        flex: 1,
        flexDirection: 'column',
        margin: sw(10),
    },
    chartContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: sw(200),
        height: sh(200),
        margin: sw(10),
    },
    titleContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        margin: sh(20),
    },
    title: {
        flex: 1,
        justifyContent: 'flex-start',
        fontFamily: fonts.interMedium,
        fontSize: sw(18),
    },
});

const DonutChartContainer = () => {
    const RADIUS = sw(100);
    const STROKE_WIDTH = sw(30);
    const OUTER_STROKE_WIDTH = sw(46);
    const GAP = 0.04;
    const CHART_CONTAINER_WIDTH_HEIGHT = RADIUS * 2 + 10;

    const n = 6;
    const totalValue = useSharedValue(0);
    const decimals = useSharedValue(0);
    const colors = ['#D8FFFC', '#FFF0D4', '#FDCED0', '#CAFDEA', '#BCDAFC', '#E5D8FF'];
    const debtNumbers = [41.5, 215.75, 252.6, 337.57, 661.43, 2121.35];
    const debtNames = ['Netflix Bill', 'Wifi Bill', 'Electric Bill', 'Car Loan', 'Personal Loan', 'House Loan'];
    const total = debtNumbers.reduce((acc, currentValue) => acc + currentValue, 0);
    const generatePercentages = calculatePercentage(debtNumbers, total);
    const generateDecimals = generatePercentages.map((number) => Number(number.toFixed(0)) / 100);
    totalValue.value = withTiming(total, { duration: 1000 });
    decimals.value = [...generateDecimals];

    const arrayOfObjects = debtNumbers.map((value, index) => ({
        name: debtNames[index],
        value,
        percentage: generatePercentages[index],
        color: colors[index],
    }));

    arrayOfObjects.sort((a, b) => b.value - a.value);

    const data = arrayOfObjects;

    const font = useFont(require('../../../assets/fonts/Inter-Bold.ttf'), sw(20));

    if (!font) {
        return <View />;
    }

    return (
        <View
            style={{
                flexDirection: 'column',
                backgroundColor: 'white',
                height: '36%',
                marginHorizontal: sw(10),
                borderRadius: 20,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
            }}
        >
            <View style={{ alignItems: 'flex-start', margin: 20, marginBottom: 0 }}>
                <Text style={{ fontFamily: fonts.interMedium, fontSize: 18 }}>Monthly Payment</Text>
            </View>

            <View
                style={{
                    // flex: 1,
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    gap: 6,
                    marginHorizontal: sw(20),
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: sw(RADIUS * 2 + sw(10)),
                        height: sh(RADIUS * 2 + sh(20)),
                    }}
                >
                    <DonutChart
                        n={n}
                        gap={GAP}
                        decimals={decimals}
                        colors={colors}
                        totalValue={totalValue}
                        strokeWidth={STROKE_WIDTH}
                        outerStrokeWidth={OUTER_STROKE_WIDTH}
                        radius={RADIUS}
                        font={font}
                    />
                </View>
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    {data.slice(0, 5).map((item, index) => {
                        return (
                            <RenderItem
                                item={item}
                                key={index}
                                index={index}
                            />
                        );
                    })}
                </View>
            </View>
        </View>
    );
};

export default DonutChartContainer;