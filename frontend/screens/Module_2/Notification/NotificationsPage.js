import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';

function NotificationsPage() {
    const [notifications, setNotifications] = useState([
        { id: 1, content: 'House Loan - RM1571.66', dueInDays: 2 },
        { id: 2, content: 'Netflix Bill - RM42.00', dueInDays: 1 },
        { id: 3, content: 'Electric Bill - RM150.30', dueInDays: 3 },
    ]);




    const handleDeleteNotification = (id) => {
        setNotifications(notifications.filter(notification => notification.id !== id));
    };

    const renderRightActions = (id) => (
        <TouchableOpacity onPress={() => handleDeleteNotification(id)} style={styles.deleteButton}>
            <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
    );

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ScrollView style={styles.container}>
                {notifications.sort((a, b) => a.dueInDays - b.dueInDays).map(notification => (
                    <Swipeable key={notification.id} renderRightActions={() => renderRightActions(notification.id)}>
                        <View style={[styles.notificationCard, { backgroundColor: getBackgroundColor(notification.dueInDays) }]}>
                            <Text style={styles.notificationText}>{notification.content}</Text>
                            <Text style={styles.dueDateText}>
                                Due in {notification.dueInDays} day{notification.dueInDays > 1 ? 's' : ''}
                            </Text>
                        </View>
                    </Swipeable>
                ))}
            </ScrollView>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    notificationCard: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    notificationText: {
        fontSize: 16,
    },
    dueDateText: {
        marginTop: 5,
        fontSize: 14,
        color: '#333',
        fontStyle: 'italic',
    },
    deleteButton: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: '100%',
    },
    deleteButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },


});

const getBackgroundColor = (dueInDays) => {
    if (dueInDays <= 2) return '#ffcccc';
    return '#fff';
};

export default NotificationsPage;
