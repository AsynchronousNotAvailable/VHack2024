import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, Dimensions } from 'react-native';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import { sw, sh, fonts } from '../../../styles/GlobalStyles';
import NetflixSVG from './NetflixSVG';
import TnbSVG from './TnbSVG';
import CarSVG from './CarSVG';
import HouseSVG from './HouseSVG';
import UnifiSVG from './UnifiSVG';
import PersonalSVG from './PersonalSVG';
import EducationSVG from './EducationSVG';
import BillSVG from './BillSVG';
import LoanSVG from './LoanSVG';
import axios from 'axios';
import { Url } from '../../../url';

const { width, height } = Dimensions.get('window');

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
    widgetContainerOverdue: {
        flex: 1,
        flexDirection: 'row',
        width: '90%',
        marginHorizontal: sw(20),
        paddingHorizontal: sw(10),
        paddingVertical: sh(10),
        margin: sh(10),
        backgroundColor: '#CDE0EE',
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
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        width: width * 0.8, // 80% of screen width
        maxHeight: height * 0.8, // 80% of screen height
    },
    closeButton: {
        position: 'absolute',
        top: sh(4),
        right: sh(4),
        margin: sh(8),
    },
    closeButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    questionTitle: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: sh(20),
        marginBottom: sh(20),
    },
    boldTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    buttonContainer: {
        backgroundColor: '#5F84A1',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: sh(10),
        borderRadius: sw(20),
        zIndex: 99,
        marginTop: sh(20),
    },
    buttonText: {
        fontSize: sw(15),
        fontFamily: fonts.interSemiBold,
        color: 'white',
    },
});

const checkOverdue = (date) => {
    const currentDate = new Date();
    const repaymentDate = new Date(date);
    if (repaymentDate <= currentDate) {
        return true;
    } else {
        return false;
    }
};

const RenderWidget2 = ({
    userId,
    itemId,
    image,
    backgroundColor,
    itemName,
    displayDate,
    paymentDate,
    paymentRemaining,
    upcomingBills,
    index,
    fetchData,
}) => {
    const overdue = checkOverdue(paymentDate);
    const [modalVisible, setModalVisible] = useState(false);

    const handleWidgetPress = () => {
        if (overdue) {
            setModalVisible(true);
        }
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const loanPaymentComplete = async () => {
        try {
            const updatedRepaymentDate = new Date(paymentDate);
            updatedRepaymentDate.setMonth(updatedRepaymentDate.getMonth() + 1);

            await axios.patch(`http://${Url}:3000/loans/update/${userId}/${itemId}`, {
                repayment_date: updatedRepaymentDate.toISOString(),
                payment_remaining: paymentRemaining - 1,
            });
            fetchData();
            setModalVisible(false);
        } catch (error) {
            console.error('Error updating loan:', error);
        }
    };

    const billPaymentComplete = async () => {
        try {
            const updatedRepaymentDate = new Date(paymentDate);
            updatedRepaymentDate.setMonth(updatedRepaymentDate.getMonth() + 1);

            await axios.patch(`http://${Url}:3000/bills/update/${userId}/${itemId}`, {
                repayment_date: updatedRepaymentDate.toISOString(),
            });
            setModalVisible(false);
            fetchData();
        } catch (error) {
            console.error('Error updating loan:', error);
        }
    };

    return (
        <TouchableOpacity onPress={handleWidgetPress}>
            <Animated.View
                style={overdue ? styles.widgetContainerOverdue : styles.widgetContainer}
                entering={FadeInDown.delay(index * 200)}
                exiting={FadeOutDown}
            >
                {backgroundColor == '#FDD5D7' && <LoanSVG backgroundColor={backgroundColor} />}
                {backgroundColor == '#BDDCFF' && <BillSVG backgroundColor={backgroundColor} />}

                <View style={[styles.contentContainer, { alignItems: 'flex-start' }]}>
                    <Text style={styles.titleText}>{itemName}</Text>
                    <Text style={styles.smallText}>Next payment: {displayDate}</Text>
                </View>
                <View style={[styles.contentContainer, { alignItems: 'flex-end', marginEnd: sw(10) }]}>
                    <Text style={styles.titleText}>RM {Number(upcomingBills).toFixed(2)}</Text>
                </View>
            </Animated.View>

            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="fade"
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <TouchableOpacity
                            onPress={closeModal}
                            style={styles.closeButton}
                        >
                            <Text style={styles.closeButtonText}>X</Text>
                        </TouchableOpacity>
                        <Text style={styles.questionTitle}>Have you paid for this loan?</Text>
                        <Text style={styles.boldTitle}>{itemName}</Text>
                        <Text style={styles.boldTitle}>RM {upcomingBills}</Text>
                        <TouchableOpacity
                            style={styles.buttonContainer}
                            onPress={backgroundColor == '#FDD5D7' ? loanPaymentComplete : billPaymentComplete}
                        >
                            <Text style={styles.buttonText}>Complete</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </TouchableOpacity>
    );
};

export default RenderWidget2;
