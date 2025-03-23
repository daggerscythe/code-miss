document.addEventListener("DOMContentLoaded", function () {
  setTimeout(startCutscene, 1000);
});

function addCharacters() {
  // Wait until the scene has transitioned
  const scene = document.querySelector("a-scene");
  // Add Miku model
  const miku = document.createElement("a-entity");
  miku.setAttribute("id", "character");
  miku.setAttribute("gltf-model", "url(models/miku.glb)");
  miku.setAttribute("scale", "0.0025 0.0025 0.0025");
  miku.setAttribute("position", "0 2 -10");  // Positioned above the ground
  miku.setAttribute("rotation", "0 180 0");
  miku.setAttribute('visible', 'true');
  miku.setAttribute('dynamic-body', 'shape: box;');  // Adding a collision body

  // Add Luffy model
  const luffy = document.createElement("a-entity");
  luffy.setAttribute("id", "character");
  luffy.setAttribute("gltf-model", "url(models/luffy.glb)");
  luffy.setAttribute("scale", "2.5 2.5 2.5");
  luffy.setAttribute("position", "0 2 -17");  // Positioned above the ground
  luffy.setAttribute("rotation", "0 0 0");
  luffy.setAttribute('visible', 'true');
  luffy.setAttribute('dynamic-body', 'shape: box;');  // Adding collision body

  // Add other characters...
  // Example for another character
  const fstud1 = document.createElement("a-entity");
  fstud1.setAttribute("id", "character");
  fstud1.setAttribute("gltf-model", "url(models/fstud1.glb)");
  fstud1.setAttribute("scale", "2.75 2.75 2.75");
  fstud1.setAttribute("position", "-17 2 -1");  // Positioned above the ground
  fstud1.setAttribute("rotation", "0 180 0");
  fstud1.setAttribute('visible', 'true');
  fstud1.setAttribute('dynamic-body', 'shape: box;');  // Adding collision body

  // Add the models to the scene
  scene.appendChild(miku);
  scene.appendChild(luffy);
  scene.appendChild(fstud1);
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

       // Ensure that the characters are added after the new scene is loaded
      setTimeout(() => {
        addCharacters(); // Ensure NPCs are added after the new scene is loaded
      }, 2000); // Delay to ensure everything is in place before adding characters

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