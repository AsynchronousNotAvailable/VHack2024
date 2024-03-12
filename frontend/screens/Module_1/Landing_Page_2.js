import React from "react";
import { Button, Text, View } from "react-native";

function Landing_Page_2({ navigation }) {
    return (
        <View>
            <Text>Landing Page 2</Text>
            <Button title="Next" onPress={() => navigation.navigate("Login")} />
        </View>
    );
}

export default Landing_Page_2;
