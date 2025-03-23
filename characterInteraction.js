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

    // Store reference to the character's position for text bubble placement
    this.worldPosition = new THREE.Vector3();

    // Setup click handler
    this.clickHandler = () => {
      this.showTextBubble(data.message);
      // Also count as a "joined" person for the game mechanic
      window.personJoined();
    };

    el.addEventListener("click", this.clickHandler);
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
  },
});
