import * as React from 'react';
import Svg, { Rect, Path } from 'react-native-svg';
const TransportationSVG = () => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={62}
        height={62}
        fill="none"
       
    >
        <Rect
            width={62}
            height={62}
            fill="#D2E7FF"
            rx={16}
        />
        <Path
            fill="#5B8FDD"
            d="M43.6 22.63c.004-.205-.01-2.052-1.82-3.83C39.998 17.05 38.2 17 38 17H23.994c-.334 0-2.09.088-3.79 1.823-1.754 1.786-1.804 3.58-1.804 3.777v4.2H17V31h1.4v8.4c0 1.028.568 1.922 1.4 2.41v1.79a1.4 1.4 0 0 0 1.4 1.4h1.4a1.4 1.4 0 0 0 1.4-1.4v-1.4h14v1.4a1.4 1.4 0 0 0 1.4 1.4h1.4a1.4 1.4 0 0 0 1.4-1.4v-1.788a2.787 2.787 0 0 0 1.4-2.412V31H45v-4.2h-1.4v-4.17ZM26.8 19.8h8.4v2.8h-8.4v-2.8Zm-3.5 19.6a2.1 2.1 0 1 1 .002-4.201A2.1 2.1 0 0 1 23.3 39.4Zm6.3-7h-8.4v-7h8.4v7Zm9.1 7a2.1 2.1 0 1 1 .002-4.201A2.1 2.1 0 0 1 38.7 39.4Zm2.1-7h-8.4v-7h8.4v7Z"
        />
    </Svg>
);
export default TransportationSVG;
