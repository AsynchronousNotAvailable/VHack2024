import React, { useState, useEffect } from 'react';
import { ImageBackground, Image, ScrollView, View, StyleSheet, Text, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { colors, fonts, sh, sw } from "../../styles/GlobalStyles";
import { Ionicons } from '@expo/vector-icons';

const { height } = Dimensions.get('window');

function Consult_Main({ navigation, route }) {
  const advisors = [
    {
      name: 'Angeline Garcia',
      designation: 'Debt Settlement Specialist',
      profileImage: require('../../assets/images/angeline.png'),
      rating: 4.9,
      description: 'Meticulously committed to helping clients navigate through financial challenges.',
      about: 'I am a debt settlement specialist with over 10 years of experience in the financial industry. I have helped countless clients navigate through their financial challenges and achieve their financial goals. I am committed to providing personalized and effective solutions to help you get out of debt and achieve financial freedom.'
    },
    {
      name: 'Nicholas Johnson',
      designation: 'Credit Counsellor',
      profileImage: require('../../assets/images/nicholas.png'),
      rating: 4.9,
      description: 'Renowned for his empathetic and personalized approach to financial counseling.',
      about: 'With a compassionate and personalized approach, I provide expert financial counseling to individuals seeking guidance. My goal is to empower clients to make informed decisions and navigate their financial journey with confidence. Whether it\'s debt management or financial planning, I am here to support you every step of the way.'
    },
    {
      name: 'Sophia Martinez',
      designation: 'Certified Financial Planner',
      profileImage: require('../../assets/images/sophia.png'),
      rating: 4.9,
      description: 'Recognized for her comprehensive financial guidance and strategic planning skills. ',
      about: 'As a certified financial planner, I am committed to offer comprehensive guidance and strategic planning to help clients achieve their financial goals. With a deep understanding of financial markets and investment strategies, I provide personalized solutions tailored to your unique needs. Let me help you build a secure financial future.'
    },
    {
      name: 'Jason Thompson',
      designation: 'Debt Consolidation Specialist',
      profileImage: require('../../assets/images/jason.png'),
      rating: 4.9,
      description: 'Expert in helping clients consolidate and manage their debts for financial stability.',
      about: 'With extensive experience in debt consolidation, I specialize in helping clients consolidate and manage their debts for financial stability. By negotiating with creditors and creating customized repayment plans, I assist individuals in achieving debt relief and regaining control of their finances.'
    },
    {
      name: 'Emily Rodriguez',
      designation: 'Debt Settlement Advisor',
      profileImage: require('../../assets/images/emily.png'),
      rating: 4.8,
      description: 'Dedicated to providing effective debt settlement solutions and financial guidance.',
      about: 'As a debt settlement advisor, I am dedicated to providing effective debt settlement solutions and financial guidance to individuals facing overwhelming debt. With a focus on negotiation and strategic planning, I help clients achieve debt relief and pave the way for a brighter financial future.'
    },
    {
      name: 'Michelle Carter',
      designation: 'Credit Counsellor',
      profileImage: require('../../assets/images/michelle.png'),
      rating: 4.8,
      description: 'Committed to helping clients improve their credit scores and manage debt effectively.',
      about: 'As a credit counsellor, I am dedicated to helping clients improve their credit scores and manage debt effectively. With personalized counseling sessions and practical strategies, I empower individuals to take control of their finances and build a brighter financial future.'
    },
    {
      name: 'Teressa Smith',
      designation: 'Financial Advisor',
      profileImage: require('../../assets/images/teressa.png'),
      rating: 4.8,
      description: 'A seasoned financial advisor with expertise in debt management and financial planning.',
      about: 'With years of experience in debt management and financial planning, I am dedicated to helping clients achieve their financial objectives. Whether it\'s managing debt or planning for the future, I provide expert guidance and personalized strategies to navigate through complex financial situations.'
    },
    {
      name: 'Alexandra Roberts',
      designation: 'Investment Advisor',
      profileImage: require('../../assets/images/alexandra.png'),
      rating: 4.8,
      description: 'Experienced in providing advice on investment opportunities and portfolio management.',
      about: 'As an investment advisor, I specialize in providing expert advice on investment opportunities and portfolio management. With a keen understanding of financial markets and investment strategies, I help clients make informed decisions to maximize their returns and achieve their financial objectives.'
    },
    {
      name: 'Daniel Baker',
      designation: 'Debt Management Consultant',
      profileImage: require('../../assets/images/daniel.png'),
      rating: 4.8,
      description: 'Experienced in creating personalized debt management plans to achieve financial stability.',
      about: 'With a focus on creating personalized debt management plans, I help individuals overcome financial challenges and achieve long-term financial stability. By analyzing financial situations and recommending tailored strategies, I empower clients to take control of their debts and build a solid financial foundation.'
    },
    {
      name: 'Evelyn Thomas',
      designation: 'Debt Advisor',
      profileImage: require('../../assets/images/evelyn.png'),
      rating: 4.7,
      description: 'Trusted for her approach and deep understanding of debt resolution strategies.',
      about: 'With a compassionate approach and deep understanding of debt resolution strategies, I assist clients in overcoming financial challenges and achieving financial stability. My goal is to provide personalized solutions that empower individuals to regain control of their finances and build a brighter future free from debt.'
    },
    {
      name: 'Michael Davis',
      designation: 'Financial Advisor',
      profileImage: require('../../assets/images/michael.png'),
      rating: 4.7,
      description: 'Known for his insightful financial advice and personalized solutions.',
      about: 'As a trusted financial advisor, I offer insightful advice and personalized solutions to help clients achieve their financial goals. With a focus on building long-term relationships based on trust and integrity, I provide tailored strategies to address your unique needs and aspirations.'
    },
    {
      name: 'Stella Evans',
      designation: 'Debt Relief Specialist',
      profileImage: require('../../assets/images/stella.png'),
      rating: 4.7,
      description: 'Specializes in providing debt relief solutions to alleviate financial burdens.',
      about: 'With a commitment to providing compassionate and effective debt relief solutions, I assist individuals in alleviating financial burdens and achieving financial freedom. Whether it\'s debt settlement or consolidation, I provide personalized guidance to help clients navigate through challenging financial situations.'
    },
    {
      name: 'Max Mitchell',
      designation: 'Debt Negotiation Expert',
      profileImage: require('../../assets/images/max.png'),
      rating: 4.6,
      description: 'Skilled in negotiating with creditors to reduce debt and achieve financial freedom.',
      about: 'As a debt negotiation expert, I am skilled in negotiating with creditors to reduce debt and help clients achieve financial freedom. With a focus on achieving favorable outcomes for my clients, I provide personalized solutions and strategic guidance to navigate through debt-related challenges.'
    },
    {
      name: 'Olivia Anderson',
      designation: 'Investment Strategist',
      profileImage: require('../../assets/images/olivia.png'),
      rating: 4.6,
      description: 'Experienced in developing tailored investment strategies to maximize returns.',
      about: 'As an investment strategist, I specialize in developing tailored investment strategies to help clients maximize returns and achieve their financial goals. With a focus on risk management and market analysis, I provide personalized guidance to navigate through the complexities of the financial markets.'
    },
    {
      name: 'Matthew Carter',
      designation: 'Investment Analyst',
      profileImage: require('../../assets/images/matthew.png'),
      rating: 4.6,
      description: 'Skilled in analyzing financial data and providing investment recommendations.',
      about: 'With a keen eye for detail and strong analytical skills, I specialize in analyzing financial data and providing investment recommendations to clients. Whether it\'s evaluating investment opportunities or monitoring market trends, I offer strategic insights to help clients make informed investment decisions.'
    }

  ];

  const { selectedDate, selectedTime, advisor } = route.params || {};
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    if (selectedDate && selectedTime && advisor) {
      const newSession = {
        profileImage: advisor.profileImage,
        name: advisor.name,
        designation: advisor.designation,
        date: selectedDate.toDateString(),
        time: selectedTime
      };
      setSessions(prevSessions => [...prevSessions, newSession]);
    }
  }, [selectedDate, selectedTime, advisor]);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <ImageBackground
        style={styles.imageContainer}
        source={require("../../assets/images/consult_bg.png")}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('Consult_Advisors', { advisors: advisors })}>
            <View style={styles.icon}>
              <Ionicons name="search-outline" size={24} color="#000000" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Consult_Message')}>
            <View>
              <Ionicons name="chatbubbles-outline" size={24} color="#000000" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Let's us find your perfect advisor</Text>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Consult_Match', { advisors: advisors })}>
            <Text style={styles.buttonText}>Find My Match</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.topRatedContainer}>
          <Text style={styles.topRatedText}>Top Rated Advisors</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Consult_Advisors', { advisors: advisors })}>
            <Text style={styles.seeAllButtonText}>See All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.horizontalScrollContainer}>
          <FlatList
            horizontal
            data={advisors.slice(0, 3)}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.advisorCard}
                onPress={() => {
                  navigation.navigate('Consult_AdvisorDetails', { advisor: item });
                }}
              >
                <Image source={item.profileImage} style={styles.profileImage} />
                <Text style={styles.advisorName}>{item.name}</Text>
                <Text style={styles.advisorDesignation}>{item.designation}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.name}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </ImageBackground>
      <View style={styles.sessionContainer}>
        <Text style={styles.sessionText}>Upcoming Sessions</Text>
        {sessions.length === 0 ? (
          <Text style={styles.noSessionText}>- No booked sessions -</Text>
        ) : (
          sessions.map((session, index) => (
            <TouchableOpacity
              key={index}
              style={styles.sessionCard}
              onPress={() => {
                navigation.navigate('Consult_Details', { advisor: advisor, session: session });
              }}
            >
              <View style={styles.advisorRow}>
                <View style={styles.leftContent}>
                  <Image source={session.profileImage} style={styles.sessionProfileImage} />
                </View>
                <View style={styles.rightContent}>
                  <Text style={styles.advisorName}>{session.name}</Text>
                  <Text style={styles.sessionDesignation}>{session.designation}</Text>
                  <View style={styles.row}>
                    <Ionicons name="calendar-outline" size={20} />
                    <Text style={styles.dateText}>{session.date}</Text>
                    <Ionicons name="time-outline" size={20} />
                    <Text style={styles.timeText}>{session.time}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    backgroundColor: 'white',
  },
  imageContainer: {
    width: '100%',
    height: height * 0.45,
    position: 'relative',
  },
  header: {
    position: 'absolute',
    top: 0,
    right: 0,
    flexDirection: 'row',
    paddingHorizontal: sw(20),
    paddingVertical: sh(56),
    zIndex: 10,
  },
  icon: {
    marginRight: sw(12),
  },
  textContainer: {
    paddingTop: height * 0.2,
    paddingHorizontal: sw(21),
  },
  text: {
    fontFamily: fonts.interSemiBold,
    fontSize: sw(22),
    color: "#334B5E",
  },
  button: {
    backgroundColor: colors.aliForceBlue,
    paddingVertical: sh(12),
    paddingHorizontal: sw(20),
    borderRadius: 8,
    width: sw(168),
    marginTop: sh(16),
  },
  buttonText: {
    fontFamily: fonts.interSemiBold,
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  topRatedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height * 0.03,
    justifyContent: 'space-between',
    marginHorizontal: sw(20),
  },
  topRatedText: {
    fontFamily: fonts.interSemiBold,
    fontSize: sw(20),
    color: 'black',
  },
  seeAllButtonText: {
    fontFamily: fonts.interRegular,
    fontSize: sw(18),
    color: '#334B5E',
  },
  horizontalScrollContainer: {
    position: 'absolute',
    left: 8,
    top: sh(348),
    height: sh(220),
    marginRight: sw(16),
  },
  advisorCard: {
    width: sw(158),
    height: sh(204),
    backgroundColor: 'white',
    alignItems: 'center',
    marginHorizontal: sw(10),
    paddingHorizontal: sw(10),
    borderRadius: 10,
    shadowColor: '#535990',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.07,
    elevation: 5,
    shadowRadius: 25,
  },
  sessionContainer: {
    marginTop: sh(174),
    marginBottom: sh(20),
    marginHorizontal: sw(20),
  },
  sessionText: {
    fontFamily: fonts.interSemiBold,
    fontSize: sw(20),
    color: 'black',
  },
  sessionCard: {
    width: sw(374),
    height: sh(120),
    marginTop: sh(10),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#535990',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.07,
    elevation: 5,
    shadowRadius: 25,
  },
  profileImage: {
    width: sw(84),
    height: sh(90),
    borderRadius: sw(90) / 2,
    marginBottom: sh(8),
    marginTop: sh(18),
  },
  advisorName: {
    fontFamily: fonts.interSemiBold,
    fontSize: sw(16),
    marginBottom: sh(2),
  },
  advisorDesignation: {
    fontFamily: fonts.interLight,
    fontSize: sw(13),
    textAlign: 'center',
  },
  advisorRow: {
    flexDirection: 'row',
  },
  leftContent: {
    marginHorizontal: 10,
  },
  rightContent: {
    flex: 1,
    marginTop: sh(4),
    marginLeft: sw(6),
  },
  sessionDesignation: {
    fontFamily: fonts.interLight,
    fontSize: sw(14),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: sh(6),
  },
  dateText: {
    fontFamily: fonts.interRegular,
    fontSize: sw(13),
    marginRight: sw(10),
  },
  timeText: {
    fontFamily: fonts.interRegular,
    fontSize: sw(13),
    marginRight: sw(24),
  },
  sessionProfileImage: {
    width: sw(78),
    height: sh(84),
    borderRadius: sw(80) / 2,
    marginTop: sh(2),
    marginLeft: sh(8),
  },
  noSessionText: {
    fontFamily: fonts.interRegular,
    fontSize: sw(16),
    textAlign: 'center',
    color: '#91919F',
    marginTop: sh(20),
  },
});

export default Consult_Main;