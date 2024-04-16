import * as React from 'react';
import Svg, { Rect, G, Path, Defs, ClipPath } from 'react-native-svg';
const HealthSVG = () => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={62}
        height={62}
        fill="none"
    >
        <Rect
            width={62}
            height={62}
            fill="#FAE2D4"
            rx={16}
        />
        <G clipPath="url(#a)">
            <Path
                fill="#F3925E"
                d="M35.667 27.5v-2.333h-9.334V27.5a5.84 5.84 0 0 0-5.833 5.833v5.834A5.84 5.84 0 0 0 26.333 45h9.334a5.84 5.84 0 0 0 5.833-5.833v-5.834a5.84 5.84 0 0 0-5.833-5.833ZM34.5 36.833h-2.333v2.334a1.167 1.167 0 0 1-2.334 0v-2.334H27.5a1.167 1.167 0 1 1 0-2.333h2.333v-2.333a1.167 1.167 0 1 1 2.334 0V34.5H34.5a1.167 1.167 0 1 1 0 2.333Zm.583-14h-8.166a2.917 2.917 0 0 1 0-5.833h8.166a2.917 2.917 0 1 1 0 5.833Z"
            />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path
                    fill="#fff"
                    d="M17 17h28v28H17z"
                />
            </ClipPath>
        </Defs>
    </Svg>
);
export default HealthSVG;
