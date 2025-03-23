document.addEventListener("DOMContentLoaded", function () {
  setTimeout(startCutscene, 1000);
});

// Character dialogue messages
const characterMessages = {
  miku: "Hello! I'm Miku! Want to join our coding club?",
  luffy: "I'm gonna be king of the programmers!",
  fstud1: "Have you finished the algorithms assignment yet?",
  fstud2: "This class is so difficult...",
  fstud3: "Can I borrow your notes?",
  fstud4: "Did you hear about the new JavaScript framework?",
};

function addCharacters() {
  // Wait until the scene has transitioned
  const scene = document.querySelector("a-scene");

  // Create character models with optimized settings
  const characters = [
    {
      id: "miku",
      model: "models/miku.glb",
      scale: "0.0025 0.0025 0.0025",
      position: "0 0 -10",
      rotation: "0 180 0",
      message: characterMessages.miku,
    },
    {
      id: "luffy",
      model: "models/luffy.glb",
      scale: "2.5 2.5 2.5",
      position: "0 0 -17",
      rotation: "0 0 0",
      message: characterMessages.luffy,
    },
    {
      id: "fstud1",
      model: "models/fstud1.glb",
      scale: "2.75 2.75 2.75",
      position: "-17 0 -1",
      rotation: "0 180 0",
      message: characterMessages.fstud1,
    },
    {
      id: "fstud2",
      model: "models/fstud2.glb",
      scale: "2.75 2.75 2.75",
      position: "-22 0 -17",
      rotation: "0 180 0",
      message: characterMessages.fstud2,
    },
    {
      id: "fstud3",
      model: "models/fstud3.glb",
      scale: "2.75 2.75 2.75",
      position: "-10 0 -4",
      rotation: "0 180 0",
      message: characterMessages.fstud3,
    },
    {
      id: "fstud4",
      model: "models/fstud4.glb",
      scale: "2 2 2",
      position: "-10 0 -15",
      rotation: "0 0 0",
      message: characterMessages.fstud4,
    },
  ];

  // Add each character to the scene with proper interaction
  characters.forEach((char, index) => {
    const entity = document.createElement("a-entity");
    entity.setAttribute("id", char.id);
    entity.setAttribute("gltf-model", `url(${char.model})`);
    entity.setAttribute("scale", char.scale);
    entity.setAttribute("position", char.position);
    entity.setAttribute("rotation", char.rotation);
    entity.setAttribute("visible", "true");
    entity.setAttribute(
      "character-interaction",
      `message: ${char.message}; character: ${char.id}`
    );

    // Add LOD (Level of Detail) to optimize performance
    // entity.setAttribute("shadow", "cast: true; receive: true");

    // Add collision body - use cylinder for better character collision
    const collider = document.createElement("a-cylinder");
    collider.setAttribute("radius", "0.5");
    collider.setAttribute("height", "1.8");
    collider.setAttribute("static-body", "");
    collider.setAttribute("visible", "false");
    collider.setAttribute("position", "0 0.9 0"); // Center vertically on character

    entity.appendChild(collider);

    // Slight delay between character additions to prevent frame drops
    setTimeout(() => {
      scene.appendChild(entity);
    }, index * 100);
  });
}

function startCutscene() {
  console.log("Starting Cutscene");

  const scene = document.querySelector("a-scene");
  const cameraEntity = document.querySelector("#camera");
  const fadeOverlay = document.querySelector("#fadeOverlay");
  const gameTitle = document.querySelector("#gameTitle");
  const oldModel = document.querySelector("#weir");
  const ground = document.querySelector("#ground"); // Ground texture

  if (!cameraEntity || !fadeOverlay || !scene || !gameTitle) {
    console.error("Missing elements in scene.");
    return;
  }

  // FADE-IN (Reveal the scene)
  setTimeout(() => {
    fadeOverlay.setAttribute("animation", {
      property: "material.opacity",
      to: "0",
      dur: 2000,
      easing: "linear",
    });

    // Hide game title after fade-in completes
    setTimeout(() => {
      gameTitle.setAttribute("visible", "false");
    }, 2000);
  }, 2000);

  // Move camera after fade-in - maintain height at 1.6 units
  setTimeout(() => {
    console.log("Moving camera...");
    const playerEntity = document.querySelector("#player");
    playerEntity.setAttribute("animation", {
      property: "position",
      to: "0 1.6 -5", // Move player entity
      dur: 5000,
      easing: "easeInOutQuad",
    });
  }, 2000);

  // FADE-OUT + Change Scene
  setTimeout(() => {
    console.log("Fading out...");

    fadeOverlay.setAttribute("animation", {
      property: "material.opacity",
      to: "1",
      dur: 2000,
      easing: "linear",
    });

    // Remove old model & ground texture
    setTimeout(() => {
      if (oldModel) {
        oldModel.remove();
        console.log("Old model removed.");
      }
      if (ground) {
        ground.remove();
        console.log("Ground texture removed.");
      }

      // Keep the collision floor
      const collisionFloor = document.getElementById("collision-floor");
      if (collisionFloor) {
        collisionFloor.setAttribute("position", "0 -0.05 -10"); // Move it to match the classroom position
      }

      // Load new model with performance optimization
      const newModel = document.createElement("a-entity");
      newModel.setAttribute("id", "newScene");
      newModel.setAttribute("gltf-model", "models/classroom.glb");
      newModel.setAttribute("scale", "2 2 2");
      newModel.setAttribute("position", "0 0 -10");

      // Add physics for collision detection
      newModel.setAttribute("static-body", "");

      // Add classroom floor for additional collision safety
      const classroomFloor = document.createElement("a-entity");
      classroomFloor.setAttribute(
        "geometry",
        "primitive: plane; width: 40; height: 40" // Keep this geometry definition
      );
      classroomFloor.setAttribute("position", "0 0 -10");
      classroomFloor.setAttribute("rotation", "-90 0 0");
      classroomFloor.setAttribute(
        "material",
        "color: #333; opacity: 0.0; transparent: true"
      );
      classroomFloor.setAttribute("static-body", "");

      // Add lighting to the classroom scene for better visibility
      const ambientLight = document.createElement("a-entity");
      ambientLight.setAttribute(
        "light",
        "type: ambient; color: #FFF; intensity: 0.7"
      );

      const spotLight = document.createElement("a-entity");
      spotLight.setAttribute(
        "light",
        "type: spot; angle: 45; color: #FFF; intensity: 1.0; castShadow: true"
      );
      spotLight.setAttribute("position", "0 4 0");
      spotLight.setAttribute("rotation", "-90 0 0");

      scene.appendChild(classroomFloor);
      scene.appendChild(ambientLight);
      scene.appendChild(spotLight);
      scene.appendChild(newModel);
      console.log("New scene added.");

      addCharacters(); // Ensure NPCs are added after the new scene is loaded

      // FADE-IN (Reveal new scene)
      fadeOverlay.setAttribute("animation", {
        property: "material.opacity",
        to: "0",
        dur: 2000,
        easing: "linear",
      });
    }, 2000); // Wait for fade-out before loading new scene
  }, 8000); // Scene change happens after camera move
}
startCutscene();