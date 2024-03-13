import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

function DebtFreeCountdownCard() {
    const targetDate = new Date('2042-01-01');
    const currentDate = new Date();
    const diffInMilliSeconds = Math.abs(targetDate - currentDate);
    let years = diffInMilliSeconds / (1000 * 60 * 60 * 24 * 365);
    let months = (years - Math.floor(years)) * 12;
    years = Math.floor(years);
    months = Math.round(months);

    if (months >= 12) {
        years += 1;
        months -= 12;
    }

    // "Month YYYY" format
    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'short' };
        return date.toLocaleDateString('en-US', options);
    };

    return (
        <View style={styles.container}>
            <View style={styles.partialBackground} />
            <LinearGradient
                colors={['#5F84A1', '#7499B6', '#C8DBEA']}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
                style={styles.cardGradient}
            >
                <View style={styles.cardContent}>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>Debt-Free Countdown</Text>
                        <Text style={styles.date}>{formatDate(targetDate)}</Text>
                        <View style={styles.countdownContainer}>
                            <Text style={styles.countdownText}>{years} years </Text>
                            <Text style={styles.countdownText}>{months} months</Text>
                        </View>
                    </View>
                    <Image
                        source={require('../../../assets/Module_2/CountDownTimer.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </View>
            </LinearGradient>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        paddingTop: 5,
        padding: 20,
        paddingBottom: 15,
        position: 'relative',
        backgroundColor: '#f0f0f0',
    },
    partialBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '90%',
        backgroundColor: '#DFEEF8',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    cardGradient: {
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    partialBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '90%',
        backgroundColor: '#DFEEF8',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    card: {
        zIndex: 1,
        flexDirection: 'row',
        backgroundColor: '#e1ecf4',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cardContent: {
        flexDirection: 'row',
        backgroundColor: 'transparent',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    textContainer: {
        flex: 1,
    },
    title: {
        fontFamily: 'InterBlack',
        fontSize: 20,
        color: '#fff',
    },
    date: {
        fontFamily: 'InterMedium',
        fontSize: 16,
        color: '#fff',
        marginBottom: 8,
    },
    countdownContainer: {
        flexDirection: 'row',
        justifyContent: 'left',
    },
    countdownText: {
        fontFamily: 'InterBlack',
        fontSize: 18,
        color: '#fff',
    },
    image: {
        width: 100,
        height: 100,
    },
});

export default DebtFreeCountdownCard;
