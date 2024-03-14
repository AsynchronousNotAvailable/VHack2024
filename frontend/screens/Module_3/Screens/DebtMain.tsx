import React from 'react';
import { Text, StyleSheet } from 'react-native';
import DonutChartContainer from '../Utils/DonutChartContainer';

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
});

const chart_data = {
    centerText: 'RM 2579.95',
    labels: ['Netflix', 'Unifi', 'Electric', 'Car', 'House'],
    datasets: [
        {
            label: 'Monthly Payment',
            data: [206.4, 361.19, 412.79, 644.99, 1212.58],
            backgroundColor: ['#E5D8FF', '#FFF0D4', '#FDCED0', '#CAFDEA', '#BCDAFC'],
            hoverOffset: 4,
        },
    ],
};

function DebtMain() {
    return <DonutChartContainer />;
}

export default DebtMain;
