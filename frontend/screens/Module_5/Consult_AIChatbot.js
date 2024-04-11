import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { OPENAI_API_KEY } from '@env';
import sendMessageToChatGPT from './sendMessageToChatGPT';

const ConsultChatscreen = ({}) => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [sendingMessage, setSendingMessage] = useState(false);

    const sendMessage = async () => {
        if (message) {
            const userMessage = message;
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: message, type: 'sent', id: 2 },
                { text: '...', type: 'waiting', id: 0 },
            ]);
            setMessage('');
            const response = await sendMessageToChatGPT({
                messageText: userMessage,
                chatHistory: messages,
            });
            setMessages((prevMessages) => [
                ...prevMessages.filter((msg) => msg.id !== 0), // Remove the placeholder '...' message
                { text: response['content'], type: 'received', id: 1 },
            ]);
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 64} // Adjust offset based on platform
        >
            <View style={styles.container}>
                <ScrollView style={styles.chatContainer}>
                    {messages.map((message, index) => (
                        <View
                            key={index}
                            style={message.type === 'sent' ? styles.sentMessage : styles.receivedMessage}
                        >
                            <Text
                                style={message.type === 'sent' ? styles.sentText : styles.receivedText}
                                selectable={true}
                            >
                                {message.text}
                            </Text>
                        </View>
                    ))}
                </ScrollView>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Type your message"
                        value={message}
                        onChangeText={(text) => setMessage(text)}
                        onSubmitEditing={sendMessage}
                        multiline={false}
                    />
                    <TouchableOpacity
                        onPress={sendMessage}
                        style={styles.sendButton}
                    >
                        <Ionicons
                            name="send"
                            size={20}
                            color="white"
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: 'white',
    },
    chatContainer: {
        flex: 1,
        marginBottom: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8F9FE',
        height: 50,
        borderRadius: 20,
    },
    input: {
        flex: 1,
        marginRight: 16,
        paddingLeft: 16,
    },
    sentMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#5F84A1',
        padding: 16,
        borderRadius: 16,
        marginBottom: 5,
        fontSize: 20,
    },
    receivedMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#F8F9FE',
        padding: 16,
        borderRadius: 16,
        marginBottom: 5,
        fontSize: 20,
    },
    header: {
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    sendButton: {
        backgroundColor: '#5F84A1',
        borderRadius: 50,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    sentText: {
        color: 'white',
    },
    receivedText: {
        color: 'black',
    },
});

export default ConsultChatscreen;
