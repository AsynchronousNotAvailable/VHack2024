import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { sw, sh, fonts, colors } from '../../../styles/GlobalStyles';
import Svg, { Rect, Path, Defs, Pattern, Use, Image } from 'react-native-svg';
const EducationSVG = ({ backgroundColor }) => (
    <View style={[styles.imageContainer, { backgroundColor: backgroundColor }]}>
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={21}
            fill="none"
           
        >
            <Path
                fill="#245552"
                d="M12 15.576a.817.817 0 0 1-.396-.102L4.6 11.577a.409.409 0 0 0-.547.143.382.382 0 0 0-.053.195v3.661c0 .14.038.276.11.396a.79.79 0 0 0 .301.286l7.2 3.894a.817.817 0 0 0 .777 0l7.2-3.894a.79.79 0 0 0 .3-.286.762.762 0 0 0 .111-.396v-3.661a.381.381 0 0 0-.2-.338.408.408 0 0 0-.4 0l-7.003 3.897a.816.816 0 0 1-.396.102Z"
            />
            <Path
                fill="#245552"
                d="M23.996 6.936v-.005a.765.765 0 0 0-.126-.346.79.79 0 0 0-.274-.252l-11.2-6.23a.816.816 0 0 0-.794 0l-11.2 6.23a.79.79 0 0 0-.294.286.763.763 0 0 0 .295 1.066l11.2 6.231a.818.818 0 0 0 .793 0l9.854-5.481a.102.102 0 0 1 .137.035.096.096 0 0 1 .013.05v7.035a.803.803 0 0 0 1.535.328.76.76 0 0 0 .065-.307V7.01a.713.713 0 0 0-.004-.073Z"
            />
        </Svg>
    </View>
);
export default EducationSVG;

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
