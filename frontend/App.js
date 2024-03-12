import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Landing_Page_1 from "./screens/Module_1/Landing_Page_1";
import Landing_Page_2 from "./screens/Module_1/Landing_Page_2";
import Login from "./screens/Module_1/Login";
import { useState } from "react";
import Home_Main from "./screens/Module_2/Home_Main";
import Debt_Main from "./screens/Module_3/Debt_Main";
import Expenses_Main from "./screens/Module_4/Expenses_Main";
import Profile_Main from "./screens/Module_6/Profile_Main";
import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Consult_Main from "./screens/Module_5/Consult_Main";
import GlobalState from "./context";
import Home2 from "./screens/Module_2/Home2";

export default function App() {
    const Stack = createStackNavigator();
    const [isAuth, setIsAuth] = useState(false);

    const LandingStack = createNativeStackNavigator();
    function LandingStackScreen() {
        return (
            <LandingStack.Navigator>
                <LandingStack.Screen
                    name="Landing1"
                    component={Landing_Page_1}
                />
                <LandingStack.Screen
                    name="Landing2"
                    component={Landing_Page_2}
                />
                <LandingStack.Screen
                    name="Login"
                    component={Login}
                    initialParams={{ setIsAuth: setIsAuth }}
                />
            </LandingStack.Navigator>
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
                />
            </ProfileStack.Navigator>
        );
    }

    const Tab = createBottomTabNavigator();

  return (
      <GlobalState>
        <NavigationContainer>
            {isAuth === false ? (
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen
                        name="Landing"
                        component={LandingStackScreen}
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
      </GlobalState>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
