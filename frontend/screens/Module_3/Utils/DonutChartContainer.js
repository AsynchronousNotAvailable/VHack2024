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
        fontSize: sw(18)
    },
});

const DonutChartContainer = () => {
    
    const RADIUS = sw(100);
    const STROKE_WIDTH = sw(30);
    const OUTER_STROKE_WIDTH = sw(46);
    const GAP = 0.04;
    const CHART_CONTAINER_WIDTH_HEIGHT = RADIUS * 2 + 10

    const n = 6;
    const totalValue = useSharedValue(0);
    const decimals = useSharedValue(0);
    const colors = ['#D8FFFC', '#FFF0D4', '#FDCED0', '#CAFDEA', '#BCDAFC', '#E5D8FF'];
    const debtNumbers = [41.50, 215.75, 252.60, 337.57, 661.43, 2121.35];
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
        <ScrollView
            contentContainerStyle={{ alignItems: 'center' }}
            showsVerticalScrollIndicator={false}
        >
            <Text style={styles.mainTitle}>Debt</Text>
            <View style={styles.monthlyPaymentContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Monthly Payment</Text>
                </View>

                <View style={styles.chartAndLabel}>
                    <View style={styles.chartContainer}>
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
                    <View style={styles.labels}>
                        {data.slice(0,5).map((item, index) => {
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
        </ScrollView>
    );
};

export default DonutChartContainer;
