import * as React from 'react';
import Svg, { Rect, Path } from 'react-native-svg';
const EducationSVG = () => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={62}
        height={62}
        fill="none"
    >
        <Rect
            width={62}
            height={62}
            fill="#F6DAE9"
            rx={16}
        />
        <Path
            fill="#E175AF"
            fillRule="evenodd"
            d="M19.333 22.834h3.5v2.333h-3.5v-2.334ZM19.333 29.834h3.5v2.333h-3.5v-2.334ZM19.333 36.834h3.5v2.333h-3.5v-2.334Z"
            clipRule="evenodd"
        />
        <Path
            fill="#E175AF"
            fillRule="evenodd"
            d="M21.667 19.333c0-.644.522-1.166 1.166-1.166H41.5c.644 0 1.167.522 1.167 1.166v23.334c0 .644-.523 1.166-1.167 1.166H22.833a1.167 1.167 0 0 1-1.166-1.166V19.333ZM25.75 24c0-.644.522-1.167 1.167-1.167h10.5c.644 0 1.166.523 1.166 1.167v4.667c0 .644-.522 1.166-1.166 1.166h-10.5a1.167 1.167 0 0 1-1.167-1.166V24Z"
            clipRule="evenodd"
        />
    </Svg>
);
export default EducationSVG;
