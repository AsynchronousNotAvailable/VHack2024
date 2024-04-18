import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { sw, sh, fonts, colors } from '../../../styles/GlobalStyles';
import Svg, { Rect, Path, Defs, Pattern, Use, Image } from 'react-native-svg';
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

const BillSVG = ({ backgroundColor }) => (
    <View style={[styles.imageContainer, { backgroundColor: backgroundColor }]}>
   <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={25}
    fill="none"

  >
    <Path
      fill="#4B81BE"
      d="M7.292 2.083H6.25c-3.125 0-4.167 1.865-4.167 4.167v15.625c0 .865.98 1.354 1.667.833l1.781-1.333c.417-.313 1-.27 1.375.104l1.73 1.74a1.05 1.05 0 0 0 1.479 0l1.75-1.75a1.033 1.033 0 0 1 1.354-.094L15 22.708c.688.51 1.667.021 1.667-.833V4.167a2.09 2.09 0 0 1 2.083-2.084H7.292Zm4.427 12.24H7.03a.787.787 0 0 1-.781-.781c0-.427.354-.781.781-.781h4.688c.427 0 .781.354.781.78a.787.787 0 0 1-.781.782Zm.781-4.167H6.25a.787.787 0 0 1-.781-.781c0-.427.354-.781.781-.781h6.25c.427 0 .781.354.781.781a.787.787 0 0 1-.781.781Z"
    />
    <Path
      fill="#4B81BE"
      d="M18.76 2.083v1.563c.688 0 1.344.281 1.823.75.5.51.771 1.167.771 1.854v2.52c0 .772-.344 1.126-1.125 1.126h-2V4.177c0-.292.24-.531.531-.531V2.083Zm0 0a2.094 2.094 0 0 0-2.093 2.094v7.281h3.562c1.646 0 2.688-1.041 2.688-2.687V6.25a4.193 4.193 0 0 0-1.22-2.948 4.213 4.213 0 0 0-2.937-1.219s.01 0 0 0Z"
    />
  </Svg>
    </View>
);
export default BillSVG;
