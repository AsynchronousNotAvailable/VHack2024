import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
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
        position: 'absolute',
        top: sh(10),
        left: sw(20),
        aspectRatio: 1,
        width: sw(30),
    },
});

type AppBarProps = {
    title: string;
};

const AppBar = ({ title }: AppBarProps) => {
    return (
        <View style={{ flex: 1 }}>
            <TouchableOpacity>
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
