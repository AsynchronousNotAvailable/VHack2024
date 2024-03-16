/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import DonutChart from './DonutChart';
import { useFont, SkFont, Skia, SkRect } from '@shopify/react-native-skia';
import { SharedValue, useDerivedValue } from 'react-native-reanimated';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import { calculatePercentage } from './calculatePercentage';
import RenderItem from './RenderItem';
import { SafeAreaView } from 'react-native-safe-area-context';
import { sw, sh } from '../../../styles/GlobalStyles';

interface Data {
    name?: string;
    value: number;
    percentage?: number;
    color?: string;
}

const RADIUS = sw(100);
const STROKE_WIDTH = sw(30);
const OUTER_STROKE_WIDTH = sw(46);
const GAP = 0.04;

const DonutChartContainer = () => {
    const n = 5;
    const totalValue = useSharedValue(0);
    const decimals = useSharedValue<number[]>([]);
    const colors = ['#E5D8FF', '#FFF0D4', '#FDCED0', '#CAFDEA', '#BCDAFC'];
    const debtNumbers = [206.4, 361.19, 412.79, 644.99, 1212.58];
    const debtNames = ['Netflix', 'Unifi', 'Electric', 'Car', 'House'];
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

    const data: Data[] = arrayOfObjects;

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
                            radius={RADIUS}
                            gap={GAP}
                            strokeWidth={STROKE_WIDTH}
                            outerStrokeWidth={OUTER_STROKE_WIDTH}
                            font={font}
                            totalValue={totalValue}
                            n={n}
                            decimals={decimals}
                            colors={colors}
                        />
                    </View>
                    <View style={styles.labels}>
                        {data.map((item, index) => {
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
        width: sw(RADIUS * 2 + 10),
        height: sh(RADIUS * 2 + 10),
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
    },
});

export default DonutChartContainer;
