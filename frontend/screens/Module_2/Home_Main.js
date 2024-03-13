import React from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DebtFreeCountdownCard from './Components/DebtFreeCountdownCard';
import MonthlyPayment from './Components/MonthlyPayment';

function Home_Main() {
  const username = "Jason";

  const handleNotificationPress = () => {
    console.log('Notification bell tapped!');
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
