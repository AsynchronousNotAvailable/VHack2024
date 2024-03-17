import React, { useContext } from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { GlobalContext } from '../../../context';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { sw, sh, colors } from '../../../styles/GlobalStyles';
import Animated from 'react-native-reanimated';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Module6RootStackNavigatorParamsList from '../Utils/Module6StackParamsProps';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

type ProfileStackParamList = {
    ProfileMain: { setIsAuth: (value: boolean) => void };
};
type ProfileMainRouteProp = RouteProp<ProfileStackParamList, 'ProfileMain'>;
type Props = {
    route: ProfileMainRouteProp;
};

function ProfileMain({ route }: Props) {
    // const { currentUsername, setCurrentUsername } = useContext(GlobalContext);
    const { setIsAuth } = route.params;
    const handleLogout = () => {
        setIsAuth(false);
    };

    return (
        <View>
            <Text>Profile</Text>
            {/* <Text>Username: {currentUsername}</Text> */}

            <TouchableOpacity onPress={handleLogout}>
                <Text>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

export default ProfileMain;
