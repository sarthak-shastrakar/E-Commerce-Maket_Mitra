      const API_KEY = "AIzaSyAGYGIU7ipOjcGidlR2sD8IOWm82CKHuDI";
      const API_URL =
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";

      const chatMessages = document.getElementById("chat-messages");
      const userInput = document.getElementById("user-input");
      const sendButton = document.getElementById("send-button");
      const clearBtn = document.getElementById("clear-chat");
      const editBtn = document.getElementById("edit-last");

      let lastUserMessage = "";

      function formatTextToHTML(text) {
        return text.replace(/\n/g, "<br>").trim();
      }

      function addMessage(message, isUser) {
        const messageElement = document.createElement("div");
        messageElement.classList.add(
          "message",
          isUser ? "user-message" : "bot-message"
        );

        const profileImage = document.createElement("img");
        profileImage.classList.add("profile-image");
        profileImage.src = isUser ? "/images/boys.jpg" : "/images/chatbot.png";
        profileImage.alt = isUser ? "User" : "Bot";

        const messageContent = document.createElement("div");
        messageContent.classList.add("message-content");
        messageContent.innerHTML = formatTextToHTML(message);

        messageElement.appendChild(profileImage);
        messageElement.appendChild(messageContent);
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        if (isUser) lastUserMessage = message;
      }

      async function generateResponse(prompt) {
        const res = await fetch(`${API_URL}?key=${API_KEY}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Act as a product assistant. Suggest relevant items or categories for: "${prompt}"`,
                  },
                ],
              },
            ],
          }),
        });

        const data = await res.json();
        return (
          data.candidates?.[0]?.content?.parts?.[0]?.text ||
          "🤖 Sorry, no suggestions found."
        );
      }

      async function handleUserInput() {
        const userMessage = userInput.value.trim();
        if (!userMessage) return;

        addMessage(userMessage, true);
        userInput.value = "";
        sendButton.disabled = true;
        userInput.disabled = true;

        // Typing Indicator
        const typingEl = document.createElement("div");
        typingEl.classList.add("bot-message", "message");
        typingEl.innerHTML = `<img class="profile-image" src="assistant.png" alt="Bot" />
        <div class="message-content">⏳ Typing...</div>`;
        chatMessages.appendChild(typingEl);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        try {
          const botMessage = await generateResponse(userMessage);
          chatMessages.removeChild(typingEl);
          addMessage(botMessage, false);
        } catch (error) {
          chatMessages.removeChild(typingEl);
          addMessage("⚠️ Something went wrong. Please try again.", false);
          console.error(error);
        } finally {
          sendButton.disabled = false;
          userInput.disabled = false;
          userInput.focus();
        }
      }

      sendButton.addEventListener("click", handleUserInput);
      userInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          handleUserInput();
        }
      });

      clearBtn.addEventListener("click", () => {
        chatMessages.innerHTML = `
        <div class="bot-message message">
          <img class="profile-image" src="assistant.png" alt="Bot" />
          <div class="message-content">🧹 Chat cleared! Ask me anything smart to shop better.</div>
        </div>`;
      });

      editBtn.addEventListener("click", () => {
        if (lastUserMessage) {
          userInput.value = lastUserMessage;
          userInput.focus();
        } else {
          alert("There's no message to edit.");
        }
      });