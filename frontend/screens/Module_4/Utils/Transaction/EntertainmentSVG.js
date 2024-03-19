import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";

const ShoppingSVG = () => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={60}
            height={60}
            fill="none"
        >
            <Rect width={60} height={60} fill="#EEE5FF" rx={16} />
            <Path
                fill="#7F3DFF"
                d="M46.25 41.25A1.25 1.25 0 0 0 45 42.5a2.5 2.5 0 1 1-3.75-2.175 1.25 1.25 0 0 0 2.1 1.075l1.762-1.762a1.25 1.25 0 0 0 0-1.776L43.35 36.1a1.249 1.249 0 0 0-1.775 0 1.25 1.25 0 0 0-.163 1.512A5 5 0 1 0 47.5 42.5a1.25 1.25 0 0 0-1.25-1.25Z"
            />
            <Path
                fill="#7F3DFF"
                d="M40.725 16.913a3.75 3.75 0 0 0-3.65-.163l-.375.188a1.25 1.25 0 0 1-1.025 0l-4.287-1.675a3.75 3.75 0 0 0-2.776 0l-4.287 1.712a1.25 1.25 0 0 1-1.025 0l-.375-.188A3.749 3.749 0 0 0 17.5 20.1v18.65A6.25 6.25 0 0 0 23.75 45h11.725A7.226 7.226 0 0 1 35 42.5v-.1a7.5 7.5 0 0 1 3.913-6.575 3.75 3.75 0 0 1 .937-1.6l.15-.138c.237-.208.497-.388.775-.537.459-.233.961-.37 1.475-.4h.25V20.1a3.75 3.75 0 0 0-1.775-3.188ZM32.5 36.25H25a1.25 1.25 0 0 1 0-2.5h7.5a1.25 1.25 0 0 1 0 2.5Zm2.5-7.5H25a1.25 1.25 0 0 1 0-2.5h10a1.25 1.25 0 0 1 0 2.5Z"
            />
        </Svg>
    );
};

export default ShoppingSVG;
