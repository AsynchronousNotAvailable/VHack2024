import React from 'react';
import { View, Text, Image, StyleSheet} from 'react-native';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import { sw, sh } from '../../../styles/GlobalStyles';

const styles = StyleSheet.create({
    widgetContainer: {
        flex: 1,
        flexDirection: 'row',
        width: '90%',
        marginHorizontal: sw(20),
        margin: sh(8),
        backgroundColor: '#F6F7FA',
        borderRadius: sw(10),
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
    },
    contentContainer: {
        flex: 0.4,
        flexDirection: 'column',
    },
    titleText: {
        fontSize: sw(15),
        fontWeight: 'bold',
        color: 'black',
        marginBottom: sh(4),
    },
    smallText: {
        fontSize: sw(10),
        fontWeight: 'bold',
        color: '#49464C',
    },
    imageContainer: {
        aspectRatio: 1,
        flex: 0.2,
        flexDirection: 'column',
        margin: sw(10),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: sw(10),
    },
    imageStyle: {
        resizeMode: 'contain',
    },
});


const RenderWidget2 = ({image, backgroundColor, itemName, paymentDate, upcomingBills, index}) => {
    return (
        <Animated.View
            style={styles.widgetContainer}
            entering={FadeInDown.delay(index * 200)}
            exiting={FadeOutDown}
        >
            <View style={[styles.imageContainer, { backgroundColor: backgroundColor }]}>
                <Image
                    source={image}
                    style={styles.imageStyle}
                ></Image>
            </View>
            <View style={[styles.contentContainer, { alignItems: 'flex-start' }]}>
                <Text style={styles.titleText}>{itemName}</Text>
                <Text style={styles.smallText}>Next payment: {paymentDate}</Text>
            </View>
            <View style={[styles.contentContainer, { alignItems: 'flex-end', marginEnd: sw(10) }]}>
                <Text style={styles.titleText}>RM {Number(upcomingBills).toFixed(2)}</Text>
            </View>
        </Animated.View>
    );
};

export default RenderWidget2;
