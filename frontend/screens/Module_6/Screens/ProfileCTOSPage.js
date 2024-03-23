import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { sh } from '../../../styles/GlobalStyles';


function ProfileCTOSPage() {

    const PreviousPage = () => {
        navigation.goBack();
    };

    const creditScore = 726; 
    const creditScoreRecommendations = [
        "Pay your bills on time to avoid negative marks on your credit report.",
        "Maintain low credit card balances to keep your credit utilization ratio down.",
        "Avoid opening several new credit accounts in a short period to decrease the risk to lenders.",
        "Regularly monitor your credit report to check for any inaccuracies or fraudulent activity.",
        "Use a mix of credit types responsibly to show lenders you can handle various credit accounts."
    ];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{height: sh(16)}}></View>
            <View style={styles.imageContainer}>
                <Image source={require('../../../assets/images/ctosscore.png')} style={styles.gaugeImage} />
            </View>
            <View style={styles.scoreContainer}>
                <Text style={styles.scoreText}>Your Credit Score: {creditScore}</Text>
            </View>
            <View style={styles.recommendationsContainer}>
                <Text style={styles.recommendationsTitle}>Recommendations to Improve Your Credit Score</Text>
                {creditScoreRecommendations.map((recommendation, index) => (
                    <Text style={styles.recommendationItem} key={index}>
                        - {recommendation}
                    </Text>
                ))}
            </View>
        </ScrollView>
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    imageContainer: {
        alignItems: 'center',
        padding: 20,
    },
    gaugeImage: {
        width: '100%',
        height: 200, 
        resizeMode: 'contain',
    },
    scoreContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    scoreText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    recommendationsContainer: {
        margin: 20,
    },
    recommendationsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    recommendationItem: {
        fontSize: 16,
        marginBottom: 5,
    },
});

export default ProfileCTOSPage;