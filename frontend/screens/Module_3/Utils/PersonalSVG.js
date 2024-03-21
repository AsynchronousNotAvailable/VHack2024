import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { sw, sh, fonts, colors } from '../../../styles/GlobalStyles';
import Svg, { Rect, Path, Defs, Pattern, Use, Image } from 'react-native-svg';
const PersonalSVG = ({ backgroundColor }) => (
    <View style={[styles.imageContainer, { backgroundColor: backgroundColor }]}>
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={37}
            fill="none"
            
        >
            <Path
                fill="#2F2929"
                fillRule="evenodd"
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M22.192 23.5H9.807a9.627 9.627 0 0 0-8.34 5.75C-.3 32.72 3.227 36 7.33 36h17.34c4.104 0 7.631-3.28 5.862-6.75a9.627 9.627 0 0 0-8.34-5.75ZM23.5 8.5a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z"
                clipRule="evenodd"
            />
        </Svg>
    </View>
);
export default PersonalSVG;

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
