import { NavigationContainer } from "@react-navigation/native";
import Landing_Page_1 from "../screens/Module_1/Landing_Page_1";
import SignUp from "../screens/Module_1/SignUp";
import Login from "../screens/Module_1/Login";
import Home_Main from "../screens/Module_2/Home_Main";
import DebtMain from "../screens/Module_3/Screens/DebtMain";
import DebtAddUpcomingBill from '../screens/Module_3/Screens/DebtAddUpcomingBill'
import Expenses_Main from "../screens/Module_4/Expenses_Main";
import Profile_Main from "../screens/Module_6/Profile_Main";
import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Consult_Main from "../screens/Module_5/Consult_Main";
import { GlobalContext } from "../context";
import Home2 from "../screens/Module_2/Home2";
import Onboarding1 from "../screens/Module_1/Onboarding1";
import Onboarding2 from "../screens/Module_1/Onboarding2";
import Onboarding3 from "../screens/Module_1/Onboarding3";
import { useContext } from "react";

function AppNav() {
    const Stack = createStackNavigator();
    const LandingStack = createNativeStackNavigator();
    const { isAuth, setIsAuth, firstLaunch, setFirstLaunch } =
        useContext(GlobalContext);
    function LandingStackScreen() {
        return (
            <LandingStack.Navigator screenOptions={{ headerShown: false }}>
                <LandingStack.Screen
                    name="Landing1"
                    component={Landing_Page_1}
                    initialParams={{ firstLaunch: firstLaunch }}
                />
                <LandingStack.Screen name="SignUp" component={SignUp} />
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
                <LoginStack.Screen name="SignUp" component={SignUp} />
            </LoginStack.Navigator>
        );
    }

    const HomeStack = createNativeStackNavigator();
    function HomeStackScreen() {
        return (
            <HomeStack.Navigator screenOptions={{ headerShown: false }}>
                <HomeStack.Screen name="Home_Main" component={Home_Main} />
                <HomeStack.Screen name="Home_2" component={Home2} />
                {/* screen2 */}
                {/* screen3 */}
            </HomeStack.Navigator>
        );
    }

    const DebtStack = createNativeStackNavigator();
    function DebtStackScreen() {
        return (
            <DebtStack.Navigator screenOptions={{ headerShown: false }}>
                <DebtStack.Screen name="DebtMain" component={DebtAddUpcomingBill} />
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
                />
            </ExpensesStack.Navigator>
        );
    }

    const ConsultStack = createNativeStackNavigator();
    function ConsultStackScreen() {
        return (
            <ConsultStack.Navigator>
                <ConsultStack.Screen
                    name="Consult_Main"
                    component={Consult_Main}
                />
            </ConsultStack.Navigator>
        );
    }

    const ProfileStack = createNativeStackNavigator();
    function ProfileStackScreen() {
        return (
            <ProfileStack.Navigator>
                <ProfileStack.Screen
                    name="Profile_Main"
                    component={Profile_Main}
                    initialParams={{ setIsAuth: setIsAuth }}
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
                <Tab.Navigator screenOptions={{ headerShown: false }}>
                    <Tab.Screen name="Home" component={HomeStackScreen} />
                    <Tab.Screen name="Debt" component={DebtStackScreen} />
                    <Tab.Screen
                        name="Expenses"
                        component={ExpensesStackScreen}
                    />
                    <Tab.Screen name="Consult" component={ConsultStackScreen} />
                    <Tab.Screen name="Profile" component={ProfileStackScreen} />
                </Tab.Navigator>
            )}
        </NavigationContainer>
    );
}

export default AppNav;