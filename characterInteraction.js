AFRAME.registerComponent("character-interaction", {
  schema: {
    message: { type: "string", default: "Hello!" },
  },

  init: function () {
    const el = this.el;
    el.classList.add("clickable");

    el.addEventListener("click", () => {
      this.removeTextBox(); // Clear existing box if player clicks again
      if (!this.joined && !this.conversationEnded) {
        this.turnCount = 0;
        this.startConversation();
      }
    });

    this.worldPosition = new AFRAME.THREE.Vector3();
    this.joined = false;
    this.conversationEnded = false;
  },

  startConversation: function () {
    const character_personas = window.character_personas;
    const chosen_personality_number = Math.floor(Math.random() * character_personas.length);
    const chosen_personality = character_personas[chosen_personality_number];

    const npcMessage = `Hi! I'm ${chosen_personality.name}. What's on your mind?`;
    this.conversationLoop(chosen_personality, npcMessage);
  },

  conversationLoop: function (persona, npcMessage) {
    this.showTextBox(npcMessage, async (playerMessage, npcCallback, restartMic) => {
      const npcResponse = await this.fetchNpcResponse(persona, playerMessage);
      npcCallback(playerMessage, npcResponse);

      this.turnCount++;

      if (this.turnCount >= 3 || npcResponse.trim().endsWith("1")) {
        this.joined = npcResponse.trim().endsWith("1");
        setTimeout(() => {
          this.el.remove();
          this.conversationEnded = true;
          setTimeout(() => {
            this.removeTextBox();
          }, 10000); // Box stays for 10 seconds after character leaves
          if (this.joined && typeof personJoined === "function") {
            personJoined();
          }
        }, 2000);
      } else {
        setTimeout(() => {
          restartMic();
        }, 3000);
      }
    });
  },

  showTextBox: function (npcMessage, onPlayerRespond) {
    const container = document.createElement("div");
    container.id = "text-box-container";
    container.style.position = "fixed";
    container.style.bottom = "20px";
    container.style.left = "50%";
    container.style.transform = "translateX(-50%)";
    container.style.maxWidth = "400px";
    container.style.backgroundColor = "rgba(0, 0, 0, 0.85)";
    container.style.padding = "15px 20px";
    container.style.borderRadius = "20px";
    container.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)";
    container.style.color = "white";
    container.style.fontFamily = "Arial, sans-serif";
    container.style.zIndex = "1001";
    container.style.overflowY = "auto";
    container.style.maxHeight = "50vh";
    document.body.appendChild(container);
    this.container = container;

    const npcMessageElement = document.createElement("div");
    npcMessageElement.textContent = `🤖 NPC: ${npcMessage}`;
    npcMessageElement.style.marginBottom = "5px";
    npcMessageElement.style.fontWeight = "bold";
    this.container.appendChild(npcMessageElement);

    const startMic = () => {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        const errorEl = document.createElement("div");
        errorEl.textContent = "Speech recognition is not supported in this browser.";
        this.container.appendChild(errorEl);
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        const listening = document.createElement("div");
        listening.textContent = "🎙️ Listening...";
        listening.style.fontStyle = "italic";
        this.container.appendChild(listening);
      };

      recognition.onresult = (event) => {
        const spokenText = event.results[0][0].transcript;
        const playerEl = document.createElement("div");
        playerEl.textContent = `🧑 You: "${spokenText}"`;
        playerEl.style.marginBottom = "5px";
        this.container.appendChild(playerEl);
        recognition.stop();
        onPlayerRespond(spokenText, (playerMsg, npcReply) => {
          const npcReplyEl = document.createElement("div");
          npcReplyEl.textContent = `🤖 NPC: ${npcReply}`;
          npcReplyEl.style.marginBottom = "5px";
          this.container.appendChild(npcReplyEl);
        }, startMic);
      };

      recognition.onerror = (event) => {
        const errEl = document.createElement("div");
        errEl.textContent = `Error: ${event.error}`;
        this.container.appendChild(errEl);
      };

      recognition.start();
    };

    startMic();
  },

  fetchNpcResponse: async function (persona, playerMessage) {
    try {
      const res = await fetch(`http://localhost:8000/llm_input`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: persona.name,
          personality: persona.personality,
          player_message: playerMessage
        }),
      });
      
      const data = await res.json();
      let utterance = new SpeechSynthesisUtterance(data.llm_response || "Sorry, I couldn't process your response.");
      speechSynthesis.speak(utterance);
      return data.llm_response || "Sorry, I couldn't process your response.";
    } catch (err) {
      console.error("Error fetching NPC response:", err);
      return "Sorry, I couldn't process your response.";
    }
  },

  removeTextBox: function () {
    if (this.container) {
      this.container.remove();
      this.container = null;
    }
  },

  remove: function () {
    this.removeTextBox();
  }
});
