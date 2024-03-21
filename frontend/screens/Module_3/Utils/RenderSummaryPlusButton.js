import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, GestureResponderEvent } from 'react-native';
import { sw, sh } from '../../../styles/GlobalStyles';
import { Svg, Rect } from 'react-native-svg';

const styles = StyleSheet.create({
    buttonContainer: {
        aspectRatio: 1,
        width: sw(25),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F6F7FA',
        borderRadius: 15,
        borderColor: 'black',
        // borderWidth: 1,
    },
    button: {},
});

const PlusButton = ({ navigation }) => {
    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity
                style={styles.button}
                onPress={navigation}
            >
                {/* <Image
                    source={require('../../../assets/images/plus.png')}
                    resizeMode="contain"
                ></Image> */}
                <Svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={10}
                    height={10}
                    fill="none"
                >
                    <Rect
                        width={1.667}
                        height={10}
                        x={4.167}
                        fill="#000"
                        rx={0.833}
                    />
                    <Rect
                        width={1.667}
                        height={10}
                        x={10}
                        y={4.165}
                        fill="#000"
                        rx={0.833}
                        transform="rotate(90 10 4.165)"
                    />
                </Svg>
            </TouchableOpacity>
        </View>
    );
};

export default PlusButton;
