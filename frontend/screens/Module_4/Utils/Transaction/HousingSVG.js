import * as React from 'react';
import Svg, { Rect, Path } from 'react-native-svg';
const HousingSVG = () => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={62}
        height={62}
        fill="none"
    >
        <Rect
            width={62}
            height={62}
            fill="#F2E2FF"
            rx={16}
        />
        <Path
            fill="#B978C3"
            d="M31 34.243a3.251 3.251 0 0 0-3.25 3.252V44h6.5v-6.505A3.251 3.251 0 0 0 31 34.243Z"
        />
        <Path
            fill="#B978C3"
            d="M36.417 37.496V44h4.333A3.251 3.251 0 0 0 44 40.748v-9.887c0-.563-.218-1.105-.61-1.51l-9.206-9.958a4.331 4.331 0 0 0-6.365 0l-9.19 9.956c-.403.406-.63.955-.629 1.528v9.871A3.251 3.251 0 0 0 21.25 44h4.333v-6.504c.02-2.956 2.406-5.37 5.285-5.44 2.976-.071 5.526 2.384 5.549 5.44Z"
        />
        <Path
            fill="#B978C3"
            d="M31 34.243a3.251 3.251 0 0 0-3.25 3.252V44h6.5v-6.505A3.251 3.251 0 0 0 31 34.243Z"
        />
    </Svg>
);
export default HousingSVG;
