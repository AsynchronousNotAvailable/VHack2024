import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import { GlobalContext } from '../context';
import { useContext } from 'react';
import Landing_Page_1 from '../screens/Module_1/Landing_Page_1';
import Login from '../screens/Module_1/Login';
import SignUp from '../screens/Module_1/SignUp';
import Home_Main from '../screens/Module_2/Home_Main';
import DebtAddExistingLoan from '../screens/Module_3/Screens/DebtAddExistingLoan';
import DebtAddExistingLoan2 from '../screens/Module_3/Screens/DebtAddExistingLoan2';
import DebtAddUpcomingBill from '../screens/Module_3/Screens/DebtAddUpcomingBill';
import DebtMain from '../screens/Module_3/Screens/DebtMain';
import DebtRepaymentPlanChoice from '../screens/Module_3/Screens/DebtRepaymentPlanChoice';
import DebtRepaymentPlanSummary from '../screens/Module_3/Screens/DebtRepaymentPlanSummary';
import DebtSummary from '../screens/Module_3/Screens/DebtSummary';
import Expenses_Main from '../screens/Module_4/Expenses_Main';
import Consult_Main from '../screens/Module_5/Consult_Main';
import ProfileEditPage from '../screens/Module_6/Screens/ProfileEditPage';
import ProfileFeedbackPage from '../screens/Module_6/Screens/ProfileFeedbackPage';
import ProfileHelpCenter from '../screens/Module_6/Screens/ProfileHelpCenter';
import ProfileMain from '../screens/Module_6/Screens/ProfileMain';
import ProfileNotificationPage from '../screens/Module_6/Screens/ProfileNotificationPage';
import ProfileReport from '../screens/Module_6/Screens/ProfileReport';
import Onboarding1 from '../screens/Module_1/Onboarding1';
import Onboarding2 from '../screens/Module_1/Onboarding2';
import Onboarding3 from '../screens/Module_1/Onboarding3';
import DMP1 from "../screens/Module_2/DMP/DMP1";
import DMP2 from "../screens/Module_2/DMP/DMP2";
import DMP3 from "../screens/Module_2/DMP/DMP3";
import DNP1 from "../screens/Module_2/DebtNegotiationPlatform/DNP1";
import DNP2 from "../screens/Module_2/DebtNegotiationPlatform/DNP2";
import DNP3 from "../screens/Module_2/DebtNegotiationPlatform/DNP3";
import DNP4 from "../screens/Module_2/DebtNegotiationPlatform/DNP4";
import DNPChat from "../screens/Module_2/DebtNegotiationPlatform/DNPChat";
import DNPDashboard from "../screens/Module_2/DebtNegotiationPlatform/DNPDashboard";
import DNPResult from "../screens/Module_2/DebtNegotiationPlatform/DNPResult";
import LoanCalculatorScreen from "../screens/Module_2/LoanCalculator/LoanCalculatorScreen";
import LoanResultsScreen from "../screens/Module_2/LoanCalculator/LoanResultsScreen";
import NotificationsPage from "../screens/Module_2/Notification/NotificationsPage";
import Expenses_Add_1 from "../screens/Module_4/Expenses_Add_1";
import Expenses_Add_Budget from "../screens/Module_4/Expenses_Add_Budget";
import Expenses_Transaction from "../screens/Module_4/Expenses_Transaction";
import OpenCamera from "../screens/Module_4/Open_Camera";
import Scan_Receipt from "../screens/Module_4/Scan_Receipt";
import Taken_Photo from "../screens/Module_4/Taken_Photo";
import Consult_AIChatbot from "../screens/Module_5/Consult_AIChatbot";
import Consult_AdvisorDetails from "../screens/Module_5/Consult_AdvisorDetails";
import Consult_Advisors from "../screens/Module_5/Consult_Advisors";
import Consult_Chatscreen from "../screens/Module_5/Consult_Chatscreen";
import Consult_Match from "../screens/Module_5/Consult_Match";
import Consult_Message from "../screens/Module_5/Consult_Message";
import Consult_TopMatch from "../screens/Module_5/Consult_TopMatch";
import ConsultIcon from '../assets/TabIcon/ConsultIcon.png';
import DebtIcon from '../assets/TabIcon/DebtIcon.png';
import ExpensesIcon from '../assets/TabIcon/ExpenseIcon.png';
import HomeIcon from '../assets/TabIcon/HomeIcon.png';
import ProfileIcon from '../assets/TabIcon/ProfileIcon.png';
import ProfileCTOSPage from '../screens/Module_6/Screens/ProfileCTOSPage';
import { Image } from 'react-native';
import { fonts } from '../styles/GlobalStyles';


function AppNav() {
    const Stack = createStackNavigator();
    const LandingStack = createNativeStackNavigator();
    const { isAuth, setIsAuth, firstLaunch, setFirstLaunch } =
        useContext(GlobalContext);

    const screenOptions = ({ route }) => ({
        headerShown: false,
        
        tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
                iconName = HomeIcon;
            } else if (route.name === 'Debt') {
                iconName = DebtIcon;
            } else if (route.name === 'Expenses') {
                iconName = ExpensesIcon;
            } else if (route.name === 'Consult') {
                iconName = ConsultIcon;
            } else if (route.name === 'Profile') {
                iconName = ProfileIcon;
            }

            return (
                <Image
                    source={iconName}
                    style={{ width: size, height: size, tintColor: color }}
                />
            );
        },
        tabBarActiveTintColor: '#5F84A1',
        tabBarInactiveTintColor: '#000',
        tabBarStyle: tabBarOptions.style,
        tabBarHideOnKeyboard: { tabBarHideOnKeyboard: true },
    });


    const tabBarOptions = {
        activeTintColor: '#5F84A1', // Active tab icon color
        inactiveTintColor: '#000', // Inactive tab icon color
        style: {
            backgroundColor: 'white', // Background color of the bottom navigation bar
            borderTopWidth: 1, // Border top width
            borderTopColor: 'lightgray', // Border top color
            height: 60, // Height of the bottom navigation bar
            paddingBottom: 10, // Additional padding at the bottom
        },
    };

    function LandingStackScreen() {
        return (
            <LandingStack.Navigator screenOptions={{ headerShown: false }}>
                <LandingStack.Screen
                    name="Landing1"
                    component={Landing_Page_1}
                    initialParams={{ firstLaunch: firstLaunch }}
                />
                <LandingStack.Screen
                    name="SignUp"
                    component={SignUp}
                />
                <LandingStack.Screen
                    name="Login"
                    component={Login}
                    initialParams={{
                        firstLaunch: firstLaunch,
                        setIsAuth: setIsAuth,
                    }}
                />
                <LandingStack.Screen
                    name="Onboarding1"
                    component={Onboarding1}
                />
                <LandingStack.Screen
                    name="Onboarding2"
                    component={Onboarding2}
                />
                <LandingStack.Screen
                    name="Onboarding3"
                    component={Onboarding3}
                    initialParams={{
                        setIsAuth: setIsAuth,
                        setFirstLaunch: setFirstLaunch,
                    }}
                />
            </LandingStack.Navigator>
        );
    }

    const LoginStack = createNativeStackNavigator();
    function LoginStackScreen() {
        return (
            <LoginStack.Navigator screenOptions={{ headerShown: false }}>
                <LoginStack.Screen
                    name="Landing"
                    component={Landing_Page_1}
                    initialParams={{ firstLaunch: firstLaunch }}
                />
                <LoginStack.Screen
                    name="Login"
                    component={Login}
                    initialParams={{ setIsAuth: setIsAuth }}
                />
                <LoginStack.Screen
                    name="SignUp"
                    component={SignUp}
                />
            </LoginStack.Navigator>
        );
    }

    const HomeStack = createNativeStackNavigator();

    function HomeStackScreen() {
        return (
            <HomeStack.Navigator
                screenOptions={{
                    headerBackTitleVisible: false,
                }}
            >
                <HomeStack.Screen
                    name="Home_Main"
                    component={Home_Main}
                    options={{ headerShown: false }}
                />
                <HomeStack.Screen
                    name="Notifications"
                    component={NotificationsPage}
                />
                <HomeStack.Screen
                    name="Debt Management Programme"
                    component={DMP1}
                    options={{
                        headerTitleAlign: 'center',
                        headerTitle: 'Debt Management Programme',
                        headerTitleStyle: { fontFamily: fonts.interMedium },
                    }}
                />
                <HomeStack.Screen
                    name="Debt Management Programme2"
                    component={DMP2}
                    options={{
                        headerTitle: 'Debt Management Programme',
                        headerTitleAlign: 'center',
                    }}
                />
                <HomeStack.Screen
                    name="Debt Management Programme3"
                    component={DMP3}
                    options={{
                        headerTitle: 'Debt Management Programme',
                        headerTitleAlign: 'center',
                    }}
                />
                <HomeStack.Screen
                    name="Debt Negotiation Platform"
                    component={DNPDashboard}
                />
                <HomeStack.Screen
                    name="Debt Negotiation Platform1"
                    component={DNP1}
                    options={{
                        headerTitle: 'Debt Negotiation Platform',
                        headerTitleAlign: 'center',
                    }}
                />
                <HomeStack.Screen
                    name="Debt Negotiation Platform2"
                    component={DNP2}
                    options={{ headerTitle: 'Debt Negotiation Platform', headerTitleAlign: 'center' }}
                />
                <HomeStack.Screen
                    name="Debt Negotiation Platform3"
                    component={DNP3}
                    options={{ headerTitle: 'Debt Negotiation Platform', headerTitleAlign: 'center' }}
                />
                <HomeStack.Screen
                    name="Debt Negotiation Platform4"
                    component={DNP4}
                    options={{ headerTitle: 'Debt Negotiation Platform', headerTitleAlign: 'center' }}
                />
                <HomeStack.Screen
                    name="Negotiation Results"
                    component={DNPResult}
                    options={{ headerTitleAlign: 'center' }}
                />
                <HomeStack.Screen
                    name="Chat with Creditor"
                    component={DNPChat}
                    options={{ headerTitleAlign: 'center' }}
                />
                <HomeStack.Screen
                    name="LoanCalculator"
                    component={LoanCalculatorScreen}
                    options={{ headerTitleAlign: 'center' }}
                />
                <HomeStack.Screen
                    name="LoanResults"
                    component={LoanResultsScreen}
                    options={{ headerTitleAlign: 'center' }}
                />
            </HomeStack.Navigator>
        );
    }
    

    const DebtStack = createNativeStackNavigator();
    function DebtStackScreen() {
        return (
            <DebtStack.Navigator screenOptions={{ headerBackTitleVisible: false }}>
                <DebtStack.Screen
                    name="DebtMain"
                    component={DebtMain}
                    options={{ headerShown: false }}
                />
                <DebtStack.Screen
                    name="DebtSummary"
                    component={DebtSummary}
                    options={{ headerTitleAlign: 'center', headerTitle: 'Debt Summary' }}
                />
                <DebtStack.Screen
                    name="DebtAddExistingLoan"
                    component={DebtAddExistingLoan}
                    options={{ headerTitleAlign: 'center', headerTitle: 'Add Loan' }}
                />
                <DebtStack.Screen
                    name="DebtAddExistingLoan2"
                    component={DebtAddExistingLoan2}
                    options={{ headerTitleAlign: 'center', headerTitle: 'Add Loan' }}
                />
                <DebtStack.Screen
                    name="DebtAddUpcomingBill"
                    component={DebtAddUpcomingBill}
                    options={{ headerTitleAlign: 'center', headerTitle: 'Add Upcoming Bills' }}
                />
                <DebtStack.Screen
                    name="DebtRepaymentPlanSummary"
                    component={DebtRepaymentPlanSummary}
                    options={{ headerTitleAlign: 'center', headerTitle: 'Repayment Plan' }}
                />
                <DebtStack.Screen
                    name="DebtRepaymentPlanChoice"
                    component={DebtRepaymentPlanChoice}
                    options={{ headerTitleAlign: 'center', headerTitle: 'Strategy' }}
                />
            </DebtStack.Navigator>
        );
    }

    const ExpensesStack = createNativeStackNavigator();
    function ExpensesStackScreen() {
        return (
            <ExpensesStack.Navigator screenOptions={{ headerBackTitleVisible: false }}>
                <ExpensesStack.Screen
                    name="Expenses_Main"
                    component={Expenses_Main}
                    options={{
                        title: 'Expenses',
                        headerTitleAlign: 'center',
                        headerBackTitle: '',
                        headerShown: false
                    }}
                />
                <ExpensesStack.Screen
                    name="Expenses_Transaction"
                    component={Expenses_Transaction}
                    options={{
                        title: 'Transaction',
                        headerTitleAlign: 'center',
                    }}
                />

                <ExpensesStack.Screen
                    name="Expenses_Add_1"
                    component={Expenses_Add_1}
                    options={{ headerTitle: '', headerBackTitle: '' }}
                />

                <ExpensesStack.Screen
                    name="Expenses_Budget"
                    component={Expenses_Add_Budget}
                    options={{
                        headerTitle: 'New Budget',
                        headerTitleAlign: 'center',
                        headerBackTitle: '',
                    }}
                />
                <ExpensesStack.Screen
                    name="Scan_Receipt"
                    component={Scan_Receipt}
                    options={{
                        headerShown: false,
                    }}
                />
                <ExpensesStack.Screen
                    name="Open_Camera"
                    component={OpenCamera}
                    options={{
                        headerShown: false,
                    }}
                />
                <ExpensesStack.Screen
                    name="Taken_Photo"
                    component={Taken_Photo}
                    options={{
                        headerShown: false,
                    }}
                />
            </ExpensesStack.Navigator>
        );
    }

    const ConsultStack = createNativeStackNavigator();
    function ConsultStackScreen() {
        return (
            <ConsultStack.Navigator screenOptions={{ headerBackTitleVisible: false }}>
                <ConsultStack.Screen
                    name="Consult_Main"
                    component={Consult_Main}
                    options={{ headerShown: false }}
                />
                <ConsultStack.Screen
                    name="Consult_Message"
                    component={Consult_Message}
                    options={{ title: 'Messages', headerTitleAlign: 'center' }}
                />
                <ConsultStack.Screen
                    name="Consult_Chatscreen"
                    component={Consult_Chatscreen}
                    options={({ route }) => ({ title: route.params.username, headerTitleAlign: 'center' })}
                />
                <ConsultStack.Screen
                    name="Consult_Advisors"
                    component={Consult_Advisors}
                    options={{ title: 'Advisors', headerTitleAlign: 'center' }}
                />
                <ConsultStack.Screen
                    name="Consult_AdvisorDetails"
                    component={Consult_AdvisorDetails}
                    options={{ title: ' ' }}
                />
                <ConsultStack.Screen
                    name="Consult_Match"
                    component={Consult_Match}
                    options={{ title: ' ' }}
                />
                <ConsultStack.Screen
                    name="Consult_TopMatch"
                    component={Consult_TopMatch}
                    options={{ title: ' ' }}
                />
                <ConsultStack.Screen
                    name="Consult_AIChatbot"
                    component={Consult_AIChatbot}
                    options={({ route }) => ({ title: route.params.username, headerTitleAlign: 'center' })}
                />
            </ConsultStack.Navigator>
        );
    }

    const ProfileStack = createNativeStackNavigator();
    function ProfileStackScreen() {
        return (
            <ProfileStack.Navigator screenOptions={{ headerShown: true, headerBackTitleVisible: false }}>
                <ProfileStack.Screen
                    name="ProfileMain"
                    component={ProfileMain}
                    initialParams={{ setIsAuth: setIsAuth }}
                    options={{ headerShown: false }}
                />
                <ProfileStack.Screen
                    name="ProfileEditPage"
                    component={ProfileEditPage}
                    options={{ headerShown: true, headerTitleAlign: 'left', headerTitle: 'Edit Profile' }}
                />
                <ProfileStack.Screen
                    name="ProfileNotificationPage"
                    component={ProfileNotificationPage}
                    options={{ headerShown: true, headerTitleAlign: 'left', headerTitle: 'Notifications' }}
                />
    
                <ProfileStack.Screen
                    name="ProfileHelpCenter"
                    component={ProfileHelpCenter}
                    options={{ headerShown: true, headerTitleAlign: 'left', headerTitle: 'Help Centre' }}
                />
                <ProfileStack.Screen
                    name="ProfileReport"
                    component={ProfileReport}
                    options={{ headerShown: true, headerTitleAlign: 'left', headerTitle: 'Report Issue' }}
                />
                <ProfileStack.Screen
                    name="ProfileFeedbackPage"
                    component={ProfileFeedbackPage}
                    options={{ headerShown: true, headerTitleAlign: 'left', headerTitle: 'Feedback' }}
                />
                <ProfileStack.Screen
                    name="ProfileCTOSPage"
                    component={ProfileCTOSPage}
                    options={{ headerShown: true, headerTitleAlign: 'left', headerTitle: 'CTOS Score Checker' }}
                />
            </ProfileStack.Navigator>
        );
    }

    const Tab = createBottomTabNavigator();

    return (
        <NavigationContainer>
            {firstLaunch === true ? (
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen
                        name="Landing"
                        component={LandingStackScreen}
                    ></Stack.Screen>
                </Stack.Navigator>
            ) : isAuth === false ? (
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen
                        name="Login"
                        component={LoginStackScreen}
                    ></Stack.Screen>
                </Stack.Navigator>
            ) : (
                <Tab.Navigator screenOptions={screenOptions}>
                    <Tab.Screen name="Home" component={HomeStackScreen} />
                    <Tab.Screen name="Debt" component={DebtStackScreen} />
                    <Tab.Screen name="Expenses" component={ExpensesStackScreen} />
                    <Tab.Screen name="Consult" component={ConsultStackScreen} />
                    <Tab.Screen name="Profile" component={ProfileStackScreen} />
                </Tab.Navigator>
            )}
        </NavigationContainer>
    );
}

export default AppNav;
