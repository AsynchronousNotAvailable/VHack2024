import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { sw, sh, fonts, colors } from '../../../styles/GlobalStyles';
import Svg, { Rect, Path, Defs, Pattern, Use, Image } from 'react-native-svg';
const HouseSVG = ({ backgroundColor }) => (
    <View style={[styles.imageContainer, { backgroundColor: backgroundColor }]}>
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width={28}
            height={26}
            fill="none"
           
        >
            <Path
                fill="url(#a)"
                d="M0 0h28v26H0z"
            />
            <Defs>
                <Pattern
                    id="a"
                    width={1}
                    height={1}
                    patternContentUnits="objectBoundingBox"
                >
                    <Use
                        xlinkHref="#b"
                        transform="matrix(.00314 0 0 .00338 -.036 -.054)"
                    />
                </Pattern>
                <Image
                    xlinkHref="data:image/png;base64,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"
                    id="b"
                    width={360}
                    height={360}
                />
            </Defs>
        </Svg>
    </View>
);
export default HouseSVG;

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
