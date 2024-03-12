import React from "react";
import { Button, Text, View } from "react-native";

function Landing_Page_1({ navigation }) {
    return (
        <View>
            <Text>Landing Page 1</Text>
            <Button
                title="Next"
                onPress={() => navigation.navigate("Landing2")}
            />
        </View>
    );
}

export default Landing_Page_1;
