import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, GestureResponderEvent } from 'react-native';
import { sw, sh } from '../../../styles/GlobalStyles';

const styles = StyleSheet.create({
    topContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: sh(10),
        borderBottomColor: '#E5E5E5',
        borderBottomWidth: sw(1),
    },
    chevronLeftStyle: {
        top: sh(10),
        aspectRatio: 1,
        left: sw(20),
        width: sw(30),
    },
});

type AppBarProps = {
    title: string;
    navigation: (event: GestureResponderEvent) => void;
};

const AppBar = ({ title, navigation }: AppBarProps) => {
    return (
        <View style={{ flex: 1, flexDirection: 'row' }}>
            <TouchableOpacity
                onPress={navigation}
                style={{ zIndex: 99 }}
            >
                <Image
                    source={require('../../../assets/images/chevron-left.png')}
                    resizeMode="contain"
                    style={styles.chevronLeftStyle}
                ></Image>
            </TouchableOpacity>
            <View style={styles.topContainer}>
                <Text style={{ fontSize: sw(20), fontWeight: '500' }}>{title}</Text>
            </View>
        </View>
    );
};

export default AppBar;
