import * as React from 'react';
import Svg, { Rect, Path } from 'react-native-svg';
const ScholarshipSVG = () => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={62}
        height={62}
        fill="none"
    >
        <Rect
            width={62}
            height={62}
            fill="#DAF0F6"
            rx={16}
        />
        <Path
            fill="#5BBBD4"
            d="M31 38.768c-.185 0-.367-.047-.529-.137l-9.337-5.195a.544.544 0 0 0-.729.19.508.508 0 0 0-.07.26v4.882c0 .186.05.368.146.527.097.16.236.292.402.382l9.6 5.192a1.09 1.09 0 0 0 1.036 0l9.6-5.192c.166-.09.304-.222.4-.382.097-.16.148-.341.148-.527v-4.882a.508.508 0 0 0-.071-.26.527.527 0 0 0-.462-.26.544.544 0 0 0-.267.07l-9.337 5.195c-.161.09-.344.137-.53.137Z"
        />
        <Path
            fill="#5BBBD4"
            d="M46.995 27.248v-.007a1.023 1.023 0 0 0-.168-.461 1.056 1.056 0 0 0-.366-.336L31.53 18.137a1.09 1.09 0 0 0-1.059 0l-14.933 8.307c-.163.091-.299.222-.393.38a1.018 1.018 0 0 0 0 1.043c.094.158.23.29.393.38l14.933 8.308a1.089 1.089 0 0 0 1.059 0l13.138-7.309a.136.136 0 0 1 .182.048c.012.02.018.042.018.065v9.38a1.071 1.071 0 0 0 2.047.439c.057-.13.086-.269.086-.41V27.347a.958.958 0 0 0-.005-.098Z"
        />
    </Svg>
);
export default ScholarshipSVG;
