import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { sw, sh, fonts, colors } from '../../../styles/GlobalStyles';
import Svg, { Rect, Path, Defs, Pattern, Use, Image } from 'react-native-svg';
const CarSVG = ({ backgroundColor }) => (
    <View style={[styles.imageContainer, { backgroundColor: backgroundColor }]}>
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={51}
            height={50}
            fill="none"
            
        >
            <Rect
                width={50}
                height={50}
                x={0.537}
                fill="#BDDCFF"
                rx={13}
            />
            <Path
                fill="#07F"
                d="M34.781 22.813h-1.274a.844.844 0 0 1-.844-.6l-1.417-4.834a4.219 4.219 0 0 0-4.058-3.004h-6.995a4.219 4.219 0 0 0-3.915 2.65l-2.405 6.015c-.124.3-.188.621-.185.945v3.89a4.219 4.219 0 0 0 3.467 4.151 3.374 3.374 0 0 0 6.548.068h3.594a3.375 3.375 0 0 0 6.53 0h.954a2.531 2.531 0 0 0 2.532-2.532v-4.218a2.531 2.531 0 0 0-2.532-2.532ZM20.438 32.938a1.687 1.687 0 1 1 0-3.374 1.687 1.687 0 0 1 0 3.373Zm4.218-10.126h-8.884l2.067-5.155a2.531 2.531 0 0 1 2.354-1.595h4.463v6.75Zm1.688 0v-6.75h.843a2.531 2.531 0 0 1 2.447 1.806l1.443 4.826c.013.041.03.08.05.119h-4.783Zm4.218 10.125a1.687 1.687 0 1 1 0-3.373 1.687 1.687 0 0 1 0 3.373Zm5.063-5.062h-.844a.844.844 0 0 1 0-1.688h.844v1.688Z"
            />
        </Svg>
    </View>
);
export default CarSVG;

const styles = StyleSheet.create({
    imageContainer: {
        aspectRatio: 1,
        flex: 0.2,
        flexDirection: 'column',
        margin: sw(10),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: sw(10),
    },
});
