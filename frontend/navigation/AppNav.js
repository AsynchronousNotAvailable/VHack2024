import { NavigationContainer } from "@react-navigation/native";
import Landing_Page_1 from "../screens/Module_1/Landing_Page_1";
import SignUp from "../screens/Module_1/SignUp";
import Login from "../screens/Module_1/Login";
import Home_Main from "../screens/Module_2/Home_Main";
import Debt_Main from "../screens/Module_3/Debt_Main";
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
import Expenses_Transaction from "../screens/Module_4/Expenses_Transaction";
import Expenses_Add_1 from "../screens/Module_4/Expenses_Add_1";
import Expenses_Add_Budget from "../screens/Module_4/Expenses_Add_Budget";

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
            <HomeStack.Navigator>
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
            <DebtStack.Navigator>
                <DebtStack.Screen name="Debt_Main" component={Debt_Main} />
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
                <Tab.Navigator
                    screenOptions={{
                        headerShown: false,
                        tabBarHideOnKeyboard: true,
                    }}
                >
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
