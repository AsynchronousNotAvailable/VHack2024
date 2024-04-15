import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import { sw, sh, fonts } from '../../../styles/GlobalStyles';
import NetflixSVG from './NetflixSVG';
import TnbSVG from './TnbSVG';
import CarSVG from './CarSVG';
import HouseSVG from './HouseSVG';
import UnifiSVG from './UnifiSVG';
import PersonalSVG from './PersonalSVG';
import EducationSVG from './EducationSVG';
import BillSVG from './billSVG';

const styles = StyleSheet.create({
    widgetContainer: {
        flex: 1,
        flexDirection: 'row',
        width: '90%',
        marginHorizontal: sw(20),
        paddingHorizontal: sw(10),
        paddingVertical: sh(10),
        margin: sh(10),
        backgroundColor: '#F6F7FA',
        borderRadius: sw(10),
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: { width: 0, height: 0 },

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    contentContainer: {
        flex: 0.4,
        flexDirection: 'column',
    },
    titleText: {
        fontSize: sw(16),
        fontFamily: fonts.interMedium,
        color: 'black',
        marginBottom: sh(3),
    },
    smallText: {
        fontSize: sw(12),
        // fontWeight: 'bold',
        fontFamily: fonts.interLight,
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

const RenderWidget2 = ({ image, backgroundColor, itemName, paymentDate, upcomingBills, index }) => {
    return (
        <Animated.View
            style={styles.widgetContainer}
            entering={FadeInDown.delay(index * 200)}
            exiting={FadeOutDown}
        >
            {/* <Image
                source={image}
                style={styles.imageStyle}
            ></Image> */}
            <BillSVG backgroundColor={backgroundColor} />
            {/* {itemName === 'Education Loan' && <EducationSVG backgroundColor={backgroundColor} />}
            {itemName === 'House Loan' && <HouseSVG backgroundColor={backgroundColor} />}
            {itemName === 'Car Loan' && <CarSVG backgroundColor={backgroundColor} />}
            {itemName === 'Personal Loan' && <PersonalSVG backgroundColor={backgroundColor} />}
            {itemName === 'Electric Bill' && <TnbSVG backgroundColor={backgroundColor} />}
            {itemName === 'Unifi Wifi' && <UnifiSVG backgroundColor={backgroundColor} />}
            {itemName === 'Netflix' && <NetflixSVG backgroundColor={backgroundColor} />} */}

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
