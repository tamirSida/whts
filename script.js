document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chat-messages');
    const messageInput = document.getElementById('message-input');
    const sendBtn = document.getElementById('send-btn');

    // Database of response messages (you will fill these out)
    const responseDatabase = [

        // Add more responses here as needed
        "את יפה",
        "אני מתגעגע",
        "את צודקת"
    ];

    // Add event listeners for sending messages
    sendBtn.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Function to send a message
    function sendMessage() {
        const messageText = messageInput.value.trim();
        if (messageText !== '') {
            // Add user message to chat
            addMessage(messageText, 'user-message');
            messageInput.value = '';

            // Show typing indicator
            showTypingIndicator();

            // Simulate response after a random delay (between 1-3 seconds)
            const replyDelay = Math.floor(Math.random() * 2000) + 1000;
            setTimeout(() => {
                // Remove typing indicator
                removeTypingIndicator();

                // Send random response from database
                const randomResponse = responseDatabase[Math.floor(Math.random() * responseDatabase.length)];
                addMessage(randomResponse, 'contact-message');

                // Scroll to bottom of chat
                scrollToBottom();
            }, replyDelay);
        }
    }

    // Function to add a message to the chat
    function addMessage(text, messageClass) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', messageClass);

        const messageContent = document.createElement('div');
        messageContent.textContent = text;

        const messageTime = document.createElement('span');
        messageTime.classList.add('message-time');
        messageTime.textContent = getCurrentTime();

        messageElement.appendChild(messageContent);
        messageElement.appendChild(messageTime);

        chatMessages.appendChild(messageElement);

        // Scroll to bottom of chat
        scrollToBottom();
    }

    // Function to show typing indicator
    function showTypingIndicator() {
        const typingElement = document.createElement('div');
        typingElement.classList.add('contact-typing');
        typingElement.id = 'typing-indicator';
        typingElement.textContent = 'תמיר is typing...';
        chatMessages.appendChild(typingElement);
        scrollToBottom();
    }

    // Function to remove typing indicator
    function removeTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    // Function to scroll to bottom of chat
    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Function to get current time in HH:MM format
    function getCurrentTime() {
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();

        // Add leading zero if needed
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;

        return `${hours}:${minutes}`;
    }

    // Add initial welcome message (optional)
    setTimeout(() => {
        addMessage("Hey! What's up?", 'contact-message');
    }, 1000);
});