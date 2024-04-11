export default async function sendMessageToChatGPT({ messageText, chatHistory }) {
    const MessageAndHistoryForm = new FormData();
    MessageAndHistoryForm.append('message_to_gpt', messageText);
    MessageAndHistoryForm.append('conversation_history', JSON.stringify(chatHistory));
    const GPTResponse = await fetch('http://192.168.1.127:5000/get_user_response', {
        method: 'POST',
        headers: 'application/json',
        body: MessageAndHistoryForm,
    });

    const GPTResult = await GPTResponse.json();
    return GPTResult;
}
