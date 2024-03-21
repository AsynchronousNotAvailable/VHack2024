
import { Dimensions } from "react-native";
const designed_on_width = 412;
const designed_on_height = 892;

// scale width & height
const sw = (width) =>
    (Dimensions.get("window").width * width) / designed_on_width;
const sh = (height) =>
    (Dimensions.get("window").height * height) / designed_on_height;
export { sw, sh };

export const colors = {
    aliceBlue: "#DBECF4",
    columbiaBlue: "#CBDEED",
    columbiaBlue2: "#B6D0E1",
    powderBlue: "#90AFC4",
    aliForceBlue: "#5F84A1",
    indigoDye: "#1A4568",
    black: "#000000",
    white: "#FFFFFF"
};

export const fonts = {
    interBlack: "InterBlack",
    interExtraLight: "InterExtraLight",
    interLight: "InterMedium",
    interMedium: "InterMedium",
    interRegular: "InterRegular",
    interSemiBold: "InterSemiBold",
    interThin: "InterThin",
    openSansBold: "OpenSansBold",
};

export const logo = {
    car_logo: require('../assets/images/car_logo.png'),
    home_logo: require('../assets/images/home_logo.png'),
    personal_loan_logo: require('../assets/images/personal_loan_logo.png'),
    school_logo: require('../assets/images/school_logo.png'),
    tnb_logo: require('../assets/images/tnb_logo.png'),
    unifi_logo: require('../assets/images/unifi_logo.png'),
    netflix_logo: require('../assets/images/netflix_logo.png'),
    repayment_plan_summary_logo_1: require('../assets/images/repayment_plan_summary_logo_1.png'),
    repayment_plan_summary_logo_2: require('../assets/images/repayment_plan_summary_logo_2.png'),
    repayment_plan_summary_logo_3: require('../assets/images/repayment_plan_summary_logo_3.png'),
    profile_icon: require('../assets/images/Module_6_Main_Page_Profile_Logo.png'),
    notification_icon: require('../assets/images/Module_6_Main_Page_Notification_Logo.png'),
    lock_icon: require('../assets/images/Module_6_Main_Page_Lock_Logo.png'),
    ctos_icon: require('../assets/images/Module_6_Main_Page_CTOS_Logo.png'),
    help_icon: require('../assets/images/Module_6_Main_Page_Help_Logo.png'),
    problem_icon: require('../assets/images/Module_6_Main_Page_Problem_Logo.png'),
    feedback_icon: require('../assets/images/Module_6_Main_Page_Feedback_Logo.png'),
    tnc_icon: require('../assets/images/Module_6_Main_Page_TNC_Logo.png'),
    help_center_notification_logo: require('../assets/images/Module_6_Help_Center_Notification_Logo.png'),
    help_center_security_logo: require('../assets/images/Module_6_Help_Center_Security_Logo.png'),
    help_center_debt_logo: require('../assets/images/Module_6_Help_Center_Debt_Logo.png'),
    plus_icon: require('../assets/images/plus.png'),
    minus_icon: require('../assets/images/minus.png')
}
