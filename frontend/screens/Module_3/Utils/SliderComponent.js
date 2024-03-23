
import Slider from '@react-native-community/slider';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { sh, sw } from '../../../styles/GlobalStyles';

const SliderComponent = ({extraPayment, setExtraPayment}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Extra Monthly Payment: RM{extraPayment.toFixed(2)}</Text>
            <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={5000}
                minimumTrackTintColor="#307ecc"
                maximumTrackTintColor="#000000"
                step={50}
                value={extraPayment}
                onValueChange={(value) => setExtraPayment(value)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: sw(20),
        marginTop: sh(20),
    },
    text: {
        fontSize: sw(16),
        marginBottom: sh(10),
    },
    slider: {
        width: '100%',
        height: 40,
    },
});

export default SliderComponent;
