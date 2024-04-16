import * as React from 'react';
import Svg, { Rect, Path } from 'react-native-svg';
const IncomeOtherSVG = () => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={62}
        height={62}
        fill="none"
    >
        <Rect
            width={62}
            height={62}
            fill="#D9ECEA"
            rx={16}
        />
        <Path
            fill="#899D9B"
            d="M33.917 26.875h9.666v7.25h-9.666v-7.25Z"
        />
        <Path
            fill="#899D9B"
            d="M41.167 19.625H23.042a3.63 3.63 0 0 0-3.625 3.625v14.5a3.63 3.63 0 0 0 3.625 3.625h18.125a2.42 2.42 0 0 0 2.416-2.417v-2.416h-9.666a2.42 2.42 0 0 1-2.417-2.417v-7.25a2.42 2.42 0 0 1 2.417-2.417h9.666v-2.416a2.42 2.42 0 0 0-2.416-2.417Z"
        />
    </Svg>
);
export default IncomeOtherSVG;
