import * as React from 'react';
import Svg, { Rect, G, Path, Defs, ClipPath } from 'react-native-svg';
const GiftSVG = () => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={62}
        height={62}
        fill="none"
    >
        <Rect
            width={62}
            height={62}
            fill="#D6FFCC"
            rx={16}
        />
        <G clipPath="url(#a)">
            <Path
                fill="#67B952"
                d="M19.417 34.125h10.875V45h-4.834a6.042 6.042 0 0 1-6.041-6.042v-4.833ZM46 29.292a2.417 2.417 0 0 1-2.417 2.416H32.708v-4.885c-.406.032-.81.052-1.208.052-.398 0-.802-.02-1.208-.052v4.885H19.417A2.417 2.417 0 0 1 17 29.292a4.833 4.833 0 0 1 4.833-4.834h2.1a6.206 6.206 0 0 1-2.1-4.833 1.208 1.208 0 1 1 2.417 0c0 3.168 2.865 4.265 5.044 4.641a11.277 11.277 0 0 1-1.419-4.641 3.625 3.625 0 0 1 7.25 0 11.277 11.277 0 0 1-1.419 4.641c2.179-.376 5.044-1.473 5.044-4.641a1.208 1.208 0 1 1 2.417 0 6.207 6.207 0 0 1-2.1 4.833h2.1A4.833 4.833 0 0 1 46 29.292Zm-15.708-9.667a9.314 9.314 0 0 0 1.208 3.64 9.314 9.314 0 0 0 1.208-3.64 1.208 1.208 0 1 0-2.416 0ZM32.708 45h4.834a6.042 6.042 0 0 0 6.041-6.042v-4.833H32.708V45Z"
            />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path
                    fill="#fff"
                    d="M17 16h29v29H17z"
                />
            </ClipPath>
        </Defs>
    </Svg>
);
export default GiftSVG;
