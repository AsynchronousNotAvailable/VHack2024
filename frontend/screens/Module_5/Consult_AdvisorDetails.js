import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { fonts, sh, sw } from "../../styles/GlobalStyles";
import { Ionicons } from '@expo/vector-icons';
import { Url } from '../../url';
import axios from 'axios';

const Consult_AdvisorDetails = ({ navigation, route }) => {
    const { advisor } = route.params;
    const [startDate, setStartDate] = useState(new Date());;
    const [dates, setDates] = useState([]);
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedDayIndex, setSelectedDayIndex] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);

    const toggleBookmark = () => {
        setIsBookmarked(!isBookmarked);
        setShowModal(true);
        setTimeout(() => {
            setShowModal(false);
        }, 2000);
    };

    const generateDates = (start) => {
        const dateArray = [];
        for (let i = 0; i < 5; i++) {
            const date = new Date(start);
            date.setDate(date.getDate() + i);
            dateArray.push(date);
        }
        return dateArray;
    };

    const navigateBack = () => {
        const newStartDate = new Date(startDate);
        newStartDate.setDate(newStartDate.getDate() - 5);
        setStartDate(newStartDate);
    };

    const navigateForward = () => {
        const newStartDate = new Date(startDate);
        newStartDate.setDate(newStartDate.getDate() + 5);
        setStartDate(newStartDate);
    };

    const handleDaySelection = (index) => {
        setSelectedDayIndex(index);
        setSelectedDay(dates[index]);
    };

    const handleTimeSelection = (time) => {
        setSelectedTime(time);
    };

    
    const handleBookConsultation = async (selectedDay, selectedTime, advisor) => {
        try {
            console.log(selectedDay, selectedTime);
            const day = new Date(selectedDay); // Assuming selectedDay is a Date object
            // const time = selectedTime; // Assuming selectedTime is a string in the format "HH:mm A"
            // Extract hours and minutes from selectedTime
            const [hours, minutes] = selectedTime.split(':').map((str) => parseInt(str));
            let [amPm] = selectedTime.split(' ');
            if (amPm === 'PM' && hours < 12) hours += 12; // Convert 12-hour format to 24-hour format

            // Set the time part of selectedDay
            day.setHours(hours, minutes);

            const newAppointment = {
                time: day,
                consultantId: advisor.id,
                userId: 1,
            };
            const response = await axios.post(`http://${Url}:3000/appointments/new`, newAppointment);
            navigation.goBack();
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        const nextDates = generateDates(startDate);
        setDates(nextDates);
    }, [startDate]);

    const renderTimeSlots = () => {
        if (!selectedDay) {
            return <Text style={styles.placeholderText}>- Please select a date first - </Text>;
        }
        if (selectedDay) {
            const timeSlots = [
                '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM',
                '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
                '06:00 PM', '07:00 PM', '08:00 PM', '09:00 PM'
            ];
            return (
                <View style={styles.timeSlotsContainer}>
                    {timeSlots.map((time, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.timeSlotButton, selectedTime === time && { borderColor: '#5F84A1', borderWidth: 1 }]}
                            onPress={() => handleTimeSelection(time)}
                        >
                            <Text style={[styles.timeText, , selectedTime === time && { color: '#5F84A1' }]}>{time}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            );
        }
        return null;
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={showModal}
                onRequestClose={() => setShowModal(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text>{isBookmarked ? 'Added to your bookmarks.' : 'Removed from your bookmarks.'}</Text>
                    </View>
                </View>
            </Modal>
            <View style={styles.advisorRow}>
                <View style={styles.leftContent}>
                    <Image source={advisor.profileImage} style={styles.profileImage} />
                </View>
                <View style={styles.rightContent}>
                    <Text style={styles.advisorName}>{advisor.name}</Text>
                    <Text style={styles.advisorDesignation}>{advisor.designation}</Text>
                    <View style={styles.ratingContainer}>
                        <Ionicons name="star" size={16} color="yellow" style={{ marginRight: 5 }} />
                        <Text style={styles.rating}>{advisor.rating}</Text>
                    </View>
                    <View style={styles.actionContainer}>
                        <TouchableOpacity style={styles.actionIcon} onPress={toggleBookmark}>
                            <Ionicons name={isBookmarked ? "bookmark" : "bookmark-outline"} size={22} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionIcon} onPress={() => { navigation.navigate('Consult_Chatscreen', { username: advisor.name }); }}>
                            <Ionicons name="send" size={20} color="black" />
                        </TouchableOpacity>
                        <View style={styles.actionIcon}>
                            <Ionicons name="ellipsis-horizontal" size={24} color="black" />
                        </View>
                    </View>
                </View>
            </View>
            <Text style={styles.heading}>About Me</Text>
            <Text style={styles.description}>{advisor.about}</Text>
            <View style={styles.row}>
                <Text style={styles.heading}>Select Date</Text>
                <View style={styles.dateSelection}>
                    <TouchableOpacity onPress={navigateBack}>
                        <Ionicons name="chevron-back-outline" size={24} color="#5F84A1" />
                    </TouchableOpacity>
                    <Text style={styles.dateRange}>
                        {dates.length > 0 ? `${getFormattedDate(dates[0])} - ${getFormattedDate(dates[dates.length - 1])}` : ''}
                    </Text>
                    <TouchableOpacity onPress={navigateForward}>
                        <Ionicons name="chevron-forward-outline" size={24} color="#5F84A1" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.dayChoices}>
                {dates.map((date, index) => (
                    <TouchableOpacity key={index} style={[styles.dayChoice,
                    selectedDayIndex === index && {
                        borderColor: '#5F84A1',
                        borderWidth: 1,
                    },]} onPress={() => handleDaySelection(index)}>
                        <Text style={[
                            styles.dayText,
                            selectedDayIndex === index && { color: '#5F84A1' },
                        ]}>{getDayName(date)}</Text>
                        <Text style={[
                            styles.dateText,
                            selectedDayIndex === index && { color: '#5F84A1' },
                        ]}>{date.getDate()}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <Text style={styles.heading}>Select Time</Text>
            {renderTimeSlots()}
            <TouchableOpacity style={styles.bookButton} onPress={() => {
                handleBookConsultation(selectedDay, selectedTime, advisor);
                // navigation.navigate('Consult_Main', {
                //     selectedDate: selectedDay,
                //     selectedTime: selectedTime,
                //     advisor: advisor
                     
                // });
            }}>
                <Text style={styles.bookButtonText}>Book Consultation</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const getFormattedDate = (date) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${monthNames[date.getMonth()]} ${date.getDate()}`;
};

const getDayName = (date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[date.getDay()];
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
    },
    advisorCard: {
        width: sw(368),
        height: sh(150),
        backgroundColor: 'white',
        marginHorizontal: sw(20),
        marginVertical: sh(10),
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
    advisorName: {
        fontFamily: fonts.interSemiBold,
        fontSize: sw(18),
        marginBottom: sh(3),
    },
    advisorDesignation: {
        fontFamily: fonts.interMedium,
        fontSize: sw(15),
    },
    profileImage: {
        width: sw(160),
        height: sh(140),
        borderRadius: 12,
        marginTop: sh(20),
    },
    advisorRow: {
        flexDirection: 'row',
    },
    leftContent: {
        marginLeft: sw(20),
        marginRight: sw(10),
    },
    rightContent: {
        flex: 1,
        marginTop: sh(25),
        marginLeft: sw(6),
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: sh(6),
    },
    rating: {
        fontSize: sw(14),
        fontFamily: fonts.interLight,
    },
    actionContainer: {
        flexDirection: 'row',
        marginTop: sh(8),
    },
    actionIcon: {
        marginRight: 16,
        backgroundColor: '#F5F6F9',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
    },
    heading: {
        fontFamily: fonts.interSemiBold,
        fontSize: sw(17),
        marginHorizontal: sw(22),
        marginTop: sh(22),
    },
    description: {
        fontFamily: fonts.interRegular,
        fontSize: sw(15),
        marginHorizontal: sw(22),
        marginVertical: sh(4),
        lineHeight: sh(24),
        textAlign: 'justify',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dateSelection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: sw(20),
        marginTop: sh(20),
    },
    dateRange: {
        fontFamily: fonts.interRegular,
        fontSize: sw(16),
        marginHorizontal: sw(4),
    },
    dayChoices: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: sw(20),
        marginTop: sh(10),
    },
    dayChoice: {
        flex: 1,
        backgroundColor: '#F6F7FA',
        paddingVertical: sh(18),
        marginHorizontal: sw(4),
        borderRadius: 15,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#FFFFFF',
    },
    dayText: {
        fontFamily: fonts.interRegular,
        fontSize: sw(15),
        color: '#91919F',
    },
    dateText: {
        fontFamily: fonts.interBlack,
        fontSize: sw(15),
        color: '#91919F',
        marginTop: sh(4),
    },
    timeSlotsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: sh(10),
        marginHorizontal: sw(20),
    },
    timeSlotButton: {
        backgroundColor: '#F6F7FA',
        paddingVertical: sh(12),
        paddingHorizontal: sw(10),
        borderRadius: 8,
        marginHorizontal: sw(4),
        marginBottom: sh(8),
        width: sw(84),
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#FFFFFF',
    },
    timeText: {
        fontFamily: fonts.interRegular,
        fontSize: sw(13),
        color: '#91919F',
    },
    bookButton: {
        backgroundColor: '#5F84A1',
        borderRadius: 16,
        paddingVertical: sh(12),
        marginHorizontal: sw(20),
        marginVertical: sh(20),
        marginTop: sh(24),
        alignItems: 'center',
    },
    bookButtonText: {
        fontFamily: fonts.interSemiBold,
        fontSize: sw(16),
        color: '#fff',
    },
    placeholderText: {
        fontFamily: fonts.interRegular,
        fontSize: sw(16),
        color: '#91919F',
        textAlign: 'center',
        marginTop: sh(16),
    },
    modalContainer: {
        position: 'absolute',
        bottom: 70,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#F6F7FA',

        padding: sw(12),
        borderRadius: sw(30),
        alignItems: 'center',
    },
});

export default Consult_AdvisorDetails;
