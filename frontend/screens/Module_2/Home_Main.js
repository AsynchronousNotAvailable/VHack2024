import React from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DebtFreeCountdownCard from './Components/DebtFreeCountdownCard';
import MonthlyPayment from './Components/MonthlyPayment';
import ServicesList from './Components/ServicesList';


function Home_Main({ navigation }) {
  const username = "Jason";

  const handleNotificationPress = () => {
    navigation.navigate('Notifications');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.welcomeText}>Welcome {username}!</Text>
        <TouchableOpacity onPress={handleNotificationPress}>
          <Ionicons name="notifications-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <DebtFreeCountdownCard />
      <MonthlyPayment />
      <ServicesList navigation={navigation} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#DFEEF8',
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    paddingLeft: 10

  },
});

export default Home_Main;
