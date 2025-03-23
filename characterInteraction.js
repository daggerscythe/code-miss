// Character interaction system for displaying text bubbles

// Register a component for character interaction
AFRAME.registerComponent("character-interaction", {
  schema: {
    message: { type: "string", default: "Hello!" },
    character: { type: "string", default: "Unknown" },
  },

  init: function () {
    const el = this.el;
    const data = this.data;

    // Make entity clickable
    el.classList.add("clickable");

    // Initialize a vector for world position
    this.worldPosition = new AFRAME.THREE.Vector3(); // Use AFRAME.THREE to ensure compatibility

    // Setup click handler
    this.clickHandler = () => {
      this.showTextBox(data.message);
    };

    el.addEventListener("click", this.clickHandler);
  },

  showTextBox: function (npcMessage) {
    // Remove any existing text box
    this.removeTextBox();

    // Create a container for the text box
    const container = document.createElement("div");
    container.id = "text-box-container";
    container.style.position = "fixed";
    container.style.bottom = "20px";
    container.style.left = "50%";
    container.style.transform = "translateX(-50%)";
    container.style.width = "80%";
    container.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    container.style.padding = "10px";
    container.style.borderRadius = "10px";
    container.style.color = "white";
    container.style.fontFamily = "Arial, sans-serif";
    container.style.zIndex = "1001";

    // Add NPC message
    const npcMessageElement = document.createElement("div");
    npcMessageElement.textContent = npcMessage;
    npcMessageElement.style.marginBottom = "10px";

    // Add input box
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Type your response...";
    input.style.width = "calc(100% - 20px)";
    input.style.padding = "10px";
    input.style.border = "none";
    input.style.borderRadius = "5px";
    input.style.fontSize = "1em";

    // Add submit button
    const button = document.createElement("button");
    button.textContent = "Send";
    button.style.marginTop = "10px";
    button.style.padding = "10px 20px";
    button.style.border = "none";
    button.style.borderRadius = "5px";
    button.style.backgroundColor = "#4CAF50";
    button.style.color = "white";
    button.style.fontSize = "1em";
    button.style.cursor = "pointer";

    // Handle button click
    button.onclick = () => {
      const playerMessage = input.value.trim();
      if (playerMessage) {
        console.log(`Player: ${playerMessage}`);
        this.handleNpcResponse(playerMessage);
      }
    };

    // Append elements to the container
    container.appendChild(npcMessageElement);
    container.appendChild(input);
    container.appendChild(button);

    // Append container to the body
    document.body.appendChild(container);

    // Focus on the input box
    input.focus();
  },

  handleNpcResponse: function (playerMessage) {
    // Simulate NPC response
    const npcResponse = `You said: "${playerMessage}". Nice to meet you!`;

    // Display NPC response
    alert(npcResponse);

    // Remove the text box
    this.removeTextBox();
  },

  removeTextBox: function () {
    const existingContainer = document.getElementById("text-box-container");
    if (existingContainer) {
      existingContainer.remove();
    }
  },

  showTextBubble: function (text) {
    // Remove any existing bubble first
    this.removeTextBubble();

    // Get world position
    this.el.object3D.getWorldPosition(this.worldPosition);

    // Create a text bubble
    const bubble = document.createElement("div");
    bubble.className = "text-bubble";
    bubble.textContent = text;
    bubble.id = "bubble-" + this.el.id;
    document.body.appendChild(bubble);

    // Position the bubble in 3D space
    this.positionBubbleAtCharacter(bubble);

    // Store reference to the bubble
    this.bubble = bubble;

    // Add a small animation for the bubble appearance
    bubble.style.opacity = "0";
    bubble.style.transform = "translate(-50%, -140%) scale(0.8)";
    bubble.style.transition = "all 0.3s ease-in-out";

    // Trigger reflow to apply initial styles
    bubble.offsetHeight;

    // Apply animation
    bubble.style.opacity = "1";
    bubble.style.transform = "translate(-50%, -160%) scale(1)";

    // Remove bubble after a delay
    setTimeout(() => this.removeTextBubble(), 4000);

    // Update position on each frame
    this.tickFunction = this.positionBubbleAtCharacter.bind(this, bubble);
    this.el.sceneEl.addEventListener("renderstart", this.tickFunction);
  },

  positionBubbleAtCharacter: function (bubble) {
    // Get the current world position
    this.el.object3D.getWorldPosition(this.worldPosition);

    // Add vertical offset to position above character's head
    // Calculate model height based on scale
    const objectHeight = 2.0; // Approximate character height in units
    const scale = this.el.getAttribute("scale");
    const scaleFactor =
      typeof scale === "string"
        ? parseFloat(scale.split(" ")[1])
        : scale
        ? scale.y
        : 1;

    // Add extra height to position bubble well above head
    this.worldPosition.y += objectHeight * scaleFactor * 1.2;

    // Convert 3D position to screen coordinates
    const camera = document.getElementById("camera").components.camera.camera;
    const vector = this.worldPosition.clone();
    vector.project(camera);

    // Convert to CSS coordinates
    const widthHalf = window.innerWidth / 2;
    const heightHalf = window.innerHeight / 2;
    const x = vector.x * widthHalf + widthHalf;
    const y = -(vector.y * heightHalf) + heightHalf;

    // Position the bubble
    bubble.style.left = x + "px";
    bubble.style.top = y + "px";

    // Adjust visibility based on whether character is in front of the camera
    if (vector.z > 1) {
      bubble.style.display = "none"; // Behind camera, hide bubble
    } else {
      bubble.style.display = "block"; // In front of camera, show bubble
    }
  },

  removeTextBubble: function () {
    if (this.bubble && this.bubble.parentNode) {
      // Add fade-out animation
      this.bubble.style.opacity = "0";
      this.bubble.style.transform = "translate(-50%, -140%) scale(0.8)";

      // Remove after animation completes
      setTimeout(() => {
        if (this.bubble && this.bubble.parentNode) {
          this.bubble.parentNode.removeChild(this.bubble);
          this.bubble = null;
        }
      }, 300);
    }
    this.el.sceneEl.removeEventListener("renderstart", this.tickFunction);
  },

  remove: function () {
    this.el.removeEventListener("click", this.clickHandler);
    this.removeTextBubble();
    this.removeTextBox();
  },
});
