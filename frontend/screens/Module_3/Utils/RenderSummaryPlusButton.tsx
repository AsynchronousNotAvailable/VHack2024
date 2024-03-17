import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, GestureResponderEvent } from 'react-native';
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
    button: {
        flex: 1,
        zIndex: 99,
    },
});

interface Props {
    navigation: (event: GestureResponderEvent) => void;
}

const PlusButton = ({ navigation }: Props) => {
    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity
                style={styles.button}
                onPress={navigation}
            >
                <Image
                    source={require('../../../assets/images/plus.png')}
                    resizeMode="contain"
                ></Image>
            </TouchableOpacity>
        </View>
    );
};

export default PlusButton;
