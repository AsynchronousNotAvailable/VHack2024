import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useContext } from "react";
import { GlobalContext } from "../../context";
function Profile_Main({route}) {
    const { currentUsername, setCurrentUsername } = useContext(GlobalContext);
    const { setIsAuth } = route.params;
    const handleLogout = () => {
        setIsAuth(false);
    }
    return (
        <View>
            <Text>Profile</Text>
            <Text>Username: {currentUsername}</Text>

            <TouchableOpacity onPress={handleLogout}>
                <Text>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Profile_Main;
