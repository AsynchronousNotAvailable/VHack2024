import { NavigationContainer } from '@react-navigation/native';
import Landing_Page_1 from '../screens/Module_1/Landing_Page_1';
import SignUp from '../screens/Module_1/SignUp';
import Login from '../screens/Module_1/Login';
import Home_Main from '../screens/Module_2/Home_Main';
import DebtMain from '../screens/Module_3/Screens/DebtMain';
import DebtSummary from '../screens/Module_3/Screens/DebtSummary';
import DebtAddExistingLoan from '../screens/Module_3/Screens/DebtAddExistingLoan';
import DebtAddExistingLoan2 from '../screens/Module_3/Screens/DebtAddExistingLoan2';
import DebtAddUpcomingBill from '../screens/Module_3/Screens/DebtAddUpcomingBill';
import DebtRepaymentPlanSummary from '../screens/Module_3/Screens/DebtRepaymentPlanSummary';
import DebtRepaymentPlanChoice from '../screens/Module_3/Screens/DebtRepaymentPlanChoice';
import Expenses_Main from '../screens/Module_4/Expenses_Main';
import ProfileMain from '../screens/Module_6/Screens/ProfileMain';
import ProfileCurrencyPage from '../screens/Module_6/Screens/ProfileCurrencyPage';
import ProfileEditPage from '../screens/Module_6/Screens/ProfileEditPage';
import ProfileFeedbackPage from '../screens/Module_6/Screens/ProfileFeedbackPage';
import ProfileHelpCenter from '../screens/Module_6/Screens/ProfileHelpCenter';
import ProfileNotificationPage from '../screens/Module_6/Screens/ProfileNotificationPage';
import ProfileReport from '../screens/Module_6/Screens/ProfileReport';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Consult_Main from '../screens/Module_5/Consult_Main';
import { GlobalContext } from '../context';
import Home2 from '../screens/Module_2/Home2';
import Onboarding1 from '../screens/Module_1/Onboarding1';
import Onboarding2 from '../screens/Module_1/Onboarding2';
import Onboarding3 from '../screens/Module_1/Onboarding3';
import { useContext } from 'react';
import { StatusBar } from 'react-native';
import Expenses_Transaction from "../screens/Module_4/Expenses_Transaction";
import Expenses_Add_1 from "../screens/Module_4/Expenses_Add_1";
import Expenses_Add_Budget from "../screens/Module_4/Expenses_Add_Budget";
import Scan_Receipt from "../screens/Module_4/Scan_Receipt";
import OpenCamera from "../screens/Module_4/Open_Camera";
import Taken_Photo from "../screens/Module_4/Taken_Photo";
import Consult_Message from "../screens/Module_5/Consult_Message";
import Consult_Chatscreen from "../screens/Module_5/Consult_Chatscreen";
import Consult_Advisors from "../screens/Module_5/Consult_Advisors";
import Consult_AdvisorDetails from "../screens/Module_5/Consult_AdvisorDetails";
import Consult_Match from "../screens/Module_5/Consult_Match";
import Consult_TopMatch from "../screens/Module_5/Consult_TopMatch";
import Consult_AIChatbot from "../screens/Module_5/Consult_AIChatbot";

function AppNav() {
    const Stack = createStackNavigator();
    const LandingStack = createNativeStackNavigator();
    const { isAuth, setIsAuth, firstLaunch, setFirstLaunch } = useContext(GlobalContext);
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
            <HomeStack.Navigator screenOptions={{ headerShown: false }}>
                <HomeStack.Screen
                    name="Home_Main"
                    component={Home_Main}
                />
                <HomeStack.Screen
                    name="Home_2"
                    component={Home2}
                />
                {/* screen2 */}
                {/* screen3 */}
            </HomeStack.Navigator>
        );
    }

    const DebtStack = createNativeStackNavigator();
    function DebtStackScreen() {
        return (
            <DebtStack.Navigator>
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
            <ExpensesStack.Navigator>
                <ExpensesStack.Screen
                    name="Expenses_Main"
                    component={Expenses_Main}
                    options={{
                        title: "Expenses",
                        headerTitleAlign: "center",
                        headerBackTitle: "",
                    }}
                />
                <ExpensesStack.Screen
                    name="Expenses_Transaction"
                    component={Expenses_Transaction}
                    options={{
                        title: "Transaction",
                        headerTitleAlign: "center",
                    }}
                />

                <ExpensesStack.Screen
                    name="Expenses_Add_1"
                    component={Expenses_Add_1}
                    options={{ headerTitle: "", headerBackTitle: "" }}
                />

                <ExpensesStack.Screen
                    name="Expenses_Budget"
                    component={Expenses_Add_Budget}
                    options={{
                        headerTitle: "New Budget",
                        headerTitleAlign: "center",
                        headerBackTitle: "",
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
            <ConsultStack.Navigator>
                <ConsultStack.Screen name="Consult_Main" component={Consult_Main} options={{ headerShown: false }} />
                <ConsultStack.Screen name="Consult_Message" component={Consult_Message} options={{ title: 'Messages', headerTitleAlign: 'center' }} />
                <ConsultStack.Screen name="Consult_Chatscreen" component={Consult_Chatscreen} options={({ route }) => ({ title: route.params.username, headerTitleAlign: 'center', })} />
                <ConsultStack.Screen name="Consult_Advisors" component={Consult_Advisors} options={{ title: 'Advisors', headerTitleAlign: 'center' }} />
                <ConsultStack.Screen name="Consult_AdvisorDetails" component={Consult_AdvisorDetails} options={{ title: ' ' }} />
                <ConsultStack.Screen name="Consult_Match" component={Consult_Match} options={{ title: ' ' }} />
                <ConsultStack.Screen name="Consult_TopMatch" component={Consult_TopMatch} options={{ title: ' ' }} />
                <ConsultStack.Screen name="Consult_AIChatbot" component={Consult_AIChatbot} options={({ route }) => ({ title: route.params.username, headerTitleAlign: 'center', })} />
            </ConsultStack.Navigator>
        );
    }
    const ProfileStack = createNativeStackNavigator();
    function ProfileStackScreen() {
        return (
            <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
                <ProfileStack.Screen
                    name="ProfileMain"
                    component={ProfileMain}
                    initialParams={{ setIsAuth: setIsAuth }}
                    screenOptions={{ statusBarHidden: false }}
                />
                <ProfileStack.Screen
                    name="ProfileEditPage"
                    component={ProfileEditPage}
                    options={{ tabBarVisible: false }}
                />
                <ProfileStack.Screen
                    name="ProfileNotificationPage"
                    component={ProfileNotificationPage}
                    options={{ tabBarVisible: false }}
                />
                <ProfileStack.Screen
                    name="ProfileCurrencyPage"
                    component={ProfileCurrencyPage}
                    options={{ tabBarVisible: false }}
                />
                <ProfileStack.Screen
                    name="ProfileHelpCenter"
                    component={ProfileHelpCenter}
                    options={{ tabBarVisible: false }}
                />
                <ProfileStack.Screen
                    name="ProfileReport"
                    component={ProfileReport}
                    options={{ tabBarVisible: false }}
                />
                <ProfileStack.Screen
                    name="ProfileFeedbackPage"
                    component={ProfileFeedbackPage}
                    options={{ tabBarVisible: false }}
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
                <Tab.Navigator
                    screenOptions={{
                        headerShown: false,
                        tabBarHideOnKeyboard: true,
                    }}
                >
                    <Tab.Screen
                        name="Home"
                        component={HomeStackScreen}
                    />
                    <Tab.Screen
                        name="Debt"
                        component={DebtStackScreen}
                    />
                    <Tab.Screen
                        name="Expenses"
                        component={ExpensesStackScreen}
                    />
                    <Tab.Screen
                        name="Consult"
                        component={ConsultStackScreen}
                    />
                    <Tab.Screen
                        name="Profile"
                        component={ProfileStackScreen}
                    />
                </Tab.Navigator>
            )}
        </NavigationContainer>
    );
}

export default AppNav;
