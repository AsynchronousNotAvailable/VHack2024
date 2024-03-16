import React from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    SafeAreaView,
    ImageSourcePropType,
} from 'react-native';
import { sw, sh } from '../../../styles/GlobalStyles';

const styles = StyleSheet.create({
    buttonContainer: {
        aspectRatio: 1,
        width: sw(20),
        borderRadius: sw(10),
        backgroundColor: '#F6F7FA',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const PlusButton = () => {
    return (
        <View style={styles.buttonContainer}>
            <Image
                source={require('../../../assets/images/plus.png')}
                resizeMode="contain"
            ></Image>
        </View>
    );
};

export default PlusButton;
