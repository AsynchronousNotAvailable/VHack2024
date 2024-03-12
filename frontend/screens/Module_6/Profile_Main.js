import React from "react";
import { Text, View } from "react-native";
import { useContext } from "react";
import { GlobalContext } from "../../context";
function Profile_Main() {
    const { currentUsername, setCurrentUsername } = useContext(GlobalContext);
    return (
        <View>
            <Text>Profile</Text>
            <Text>Username: {currentUsername}</Text>
        </View>
    );
}

export default Profile_Main;
