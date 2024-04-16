import * as React from 'react';
import Svg, { Rect, G, Path, Defs, ClipPath } from 'react-native-svg';
const OtherSVG = () => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={62}
        height={62}
        fill="none"
    >
        <Rect
            width={62}
            height={62}
            fill="#E5E2E8"
            rx={16}
        />
        <G clipPath="url(#a)">
            <Path
                fill="#836F81"
                d="M33.167 25.583v-7.085a7.559 7.559 0 0 1 2.67 1.723l3.775 3.776a7.535 7.535 0 0 1 1.723 2.67H34.25a1.084 1.084 0 0 1-1.083-1.084Zm8.666 3.776v9.224A5.423 5.423 0 0 1 36.418 44H25.583a5.423 5.423 0 0 1-5.416-5.417V23.417A5.423 5.423 0 0 1 25.583 18h4.892c.176 0 .35.014.525.026v7.557a3.25 3.25 0 0 0 3.25 3.25h7.557c.012.175.026.35.026.526Zm-8.666 9.224a1.083 1.083 0 0 0-1.084-1.083h-5.416a1.083 1.083 0 1 0 0 2.167h5.416a1.084 1.084 0 0 0 1.084-1.084Zm3.25-4.333a1.083 1.083 0 0 0-1.084-1.083h-8.666a1.083 1.083 0 1 0 0 2.166h8.666a1.083 1.083 0 0 0 1.084-1.083Z"
            />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path
                    fill="#fff"
                    d="M18 18h26v26H18z"
                />
            </ClipPath>
        </Defs>
    </Svg>
);
export default OtherSVG;
