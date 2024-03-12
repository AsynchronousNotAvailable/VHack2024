import React, { useContext, useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { GlobalContext } from "../../context";

function Login({ route }) {
    const { setIsAuth } = route.params;
    const [username, setUsername] = useState("");
    const { currentUsername, setCurrentUsername } = useContext(GlobalContext);
    const handleAuth = () => {
        if (username != "") {
            setCurrentUsername(username);
        }
        
        setIsAuth(true);
    };

    return (
        <View>
            <Text>Login Page</Text>

            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                style={{
                    height: 40,
                    borderColor: "gray",
                    borderWidth: 1,
                    marginBottom: 10,
                }}
            />

            <Button title="Login" onPress={handleAuth}>
                Login
            </Button>
        </View>
    );
}

export default Login;
