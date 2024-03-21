import React from 'react';
import { View, Text, Image, StyleSheet,} from 'react-native';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import { sw, sh, fonts } from '../../../styles/GlobalStyles';

const styles = StyleSheet.create({
    widgetContainer: {
        flex: 1,
        flexDirection: 'row',
        width: '90%',
        marginHorizontal: sw(20),
        paddingVertical: sh(15),
        backgroundColor: '#F6F7FA',
        borderRadius: sw(10),
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.05,
    },
    contentContainer: {
        flex: 0.3,
        flexDirection: 'column',
        marginHorizontal: sw(4),
    },
    bigTitleText: {
        flex: 0.24,
        fontSize: sw(14),
        fontFamily: fonts.interMedium,
        fontWeight: 'bold',
        color: 'black',
        marginHorizontal: sw(10),
    },
    smallTitleText: {
        color: '#828AA1',
        fontFamily: fonts.interMedium,
        fontSize: sw(10),
    },
    smallText: {
        fontSize: sw(12),
        color: '#828AA1',
        fontFamily: fonts.interMedium,
    },
    imageContainer: {
        flex: 0.11,
        aspectRatio: 1,
        flexDirection: 'column',
        marginHorizontal: sw(4),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: sw(10),
    },
    imageStyle: {
        resizeMode: 'contain',
    },
});

const RenderRepaymentPlanSummaryItem = (
    {image,
    itemName,
    firstTitle,
    firstContent,
    secondTitle,
    secondContent,
    index,}
) => {
    return (
        <Animated.View
            style={styles.widgetContainer}
            entering={FadeInDown.delay(index * 200)}
            exiting={FadeOutDown}
        >
            <View style={styles.imageContainer}>
                <Image
                    source={image}
                    style={styles.imageStyle}
                ></Image>
            </View>
            <Text style={styles.bigTitleText}>{itemName}</Text>
            <View style={[styles.contentContainer, { alignItems: 'flex-start' }]}>
                <Text style={styles.smallTitleText}>{firstTitle}</Text>
                <Text style={styles.smallText}>{firstContent}</Text>
            </View>
            <View style={[styles.contentContainer, { alignItems: 'flex-start' }]}>
                <Text style={styles.smallTitleText}>{secondTitle}</Text>
                <Text style={styles.smallText}>{secondContent}</Text>
            </View>
        </Animated.View>
    );
};

export default RenderRepaymentPlanSummaryItem;
