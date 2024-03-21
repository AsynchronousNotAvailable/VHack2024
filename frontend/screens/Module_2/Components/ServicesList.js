import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fonts, sh, sw } from "../../../styles/GlobalStyles";

const services = [
    {
        title: 'Debt Management Programme (DMP)',
        description: 'Personalized solutions for managing and overcoming your debt',
        icon: require('../../../assets/Module_2/service1.png'),
        gradientColors: ['#F1B916', '#FFD765'],
    },
    {
        title: 'Debt Negotiation Platform',
        description: 'Empowering you to take control of your debt through direct negotiation',
        icon: require('../../../assets/Module_2/service2.png'),
        gradientColors: ['#7095B2', '#DFEEF8'],
    },
    {
        title: 'Plan to have a big purchase?',
        description: 'Explore car & house loan calculator and check is it affordable for you',
        icon: require('../../../assets/Module_2/service3.png'),
        gradientColors: ['#A382FF', '#B69DFC'],
    },
];

const ServiceCard = ({ title, description, icon, gradientColors, navigation, navigate1, navigate2, navigate3 }) => {
    const handlePress = () => {
        if (navigate1) {
            navigation.navigate('Debt Management Programme');
        }
        if (navigate2) {
            navigation.navigate('Debt Negotiation Platform');
        }
        if (navigate3) {
            navigation.navigate('LoanCalculator');
        }
    };

    return (
        <TouchableOpacity onPress={handlePress} style={styles.cardShadow}>
            <LinearGradient
                colors={gradientColors}
                style={styles.card}
                start={{ x: 0, y: 0 }}
                end={{ x: 3, y: 3 }}
            >
                <View style={styles.textContent}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.description}>{description}</Text>
                </View>
                <Image source={icon} style={styles.icon} />
            </LinearGradient>
        </TouchableOpacity>
    );
};

const ServicesList = ({ navigation }) => {
    return (
        <ScrollView style={styles.scrollView}>
            {services.map((service, index) => (
                <ServiceCard
                    key={index}
                    title={service.title}
                    description={service.description}
                    icon={service.icon}
                    gradientColors={service.gradientColors}
                    navigation={navigation}
                    navigate1={service.title === 'Debt Management Programme (DMP)'}
                    navigate2={service.title === 'Debt Negotiation Platform'}
                    navigate3={service.title === 'Plan to have a big purchase?'}
                />
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
    cardShadow: {
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 6,
        marginVertical: 8,
        marginHorizontal: 16,
        overflow: 'hidden',
    },
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderRadius: 20,
    },
    textContent: {
        flex: 1,
    },
    title: {
        fontFamily: 'InterSemiBold',
        fontSize: 18,
        marginBottom: 5,
        color: '#fff',
    },
    description: {
        fontFamily: 'InterSemiBold',
        fontSize: 14,
        color: '#fff',
    },
    icon: {
        width: 80,
        height: 80,
        marginLeft: 10,
    },
});

export default ServicesList;