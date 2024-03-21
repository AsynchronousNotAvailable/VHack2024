import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import React from 'react';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import { sw, sh, fonts } from '../../../styles/GlobalStyles';

const RenderItem = ({ item, index }) => {
    return (
        <Animated.View
            style={styles.container}
            entering={FadeInDown.delay(index * 200)}
            exiting={FadeOutDown}
        >
            <View style={styles.contentContainer}>
                <View style={[styles.color, { backgroundColor: item.color, flex: 0.2 }]} />
                <Text style={[styles.labelText, { flex: 0.5 }]}>{item.name}</Text>
                <Text style={[styles.percentageText, { flex: 0.3 }]}>{item.percentage}%</Text>
            </View>
        </Animated.View>
    );
};

export default RenderItem;

const styles = StyleSheet.create({
    container: {
        paddingVertical: sh(5),
        marginBottom: sh(10),
        // backgroundColor: '#f4f7fc',
        borderRadius: sw(20),
    },
    contentContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: sw(10),
    },
    color: {
        width: sw(16),
        aspectRatio: 1,
        borderRadius: sw(10),
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginRight: sw(4),
    },
    labelText: {
        fontSize: sw(12),
        fontWeight: 'bold',
        fontFamily: fonts.interRegular,
        color: 'black',
        marginHorizontal: sw(4),
    },
    percentageText: {
        fontSize: sw(12),
        fontWeight: 'light',
        color: '#8C97A7',
        marginLeft: sw(6),
    },
});
