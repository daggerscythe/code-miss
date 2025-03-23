document.addEventListener('DOMContentLoaded', function () {
    setTimeout(startCutscene, 1000);
});


function addCharacters() {
    // Wait until the scene has transitioned
    const scene = document.querySelector("a-scene");

    // Add the character model after cutscene
    const miku = document.createElement("a-entity");
    miku.setAttribute("id", "character");
    miku.setAttribute("gltf-model", "url(models/miku.glb)"); // Use your model file
    miku.setAttribute("scale", "0.0025 0.0025 0.0025"); // Adjust size if necessary
    miku.setAttribute("position", "0 0 -10"); // Position it in the scene
    miku.setAttribute("rotation", "0 180 0");
    miku.setAttribute('visible', 'true');

    const luffy = document.createElement("a-entity");
    luffy.setAttribute("id", "character");
    luffy.setAttribute("gltf-model", "url(models/luffy.glb)"); // Use your model file
    luffy.setAttribute("scale", "2.5 2.5 2.5"); // Adjust size if necessary
    luffy.setAttribute("position", "0 0 -17"); // Position it in the scene
    luffy.setAttribute("rotation", "0 0 0");
    luffy.setAttribute('visible', 'true');
    luffy.setAttribute('class', 'collidable');
    luffy.setAttribute('geometry', 'primitive: box');

    const fstud1 = document.createElement("a-entity");
    fstud1.setAttribute("id", "character");
    fstud1.setAttribute("gltf-model", "url(models/fstud1.glb)"); // Use your model file
    fstud1.setAttribute("scale", "2.75 2.75 2.75"); // Adjust size if necessary
    fstud1.setAttribute("position", "-17 0 -1"); // Position it in the scene
    fstud1.setAttribute("rotation", "0 180 0");
    fstud1.setAttribute('visible', 'true');
    

    const fstud2 = document.createElement("a-entity");
    fstud2.setAttribute("id", "character");
    fstud2.setAttribute("gltf-model", "url(models/fstud2.glb)"); // Use your model file
    fstud2.setAttribute("scale", "2.75 2.75 2.75"); // Adjust size if necessary
    fstud2.setAttribute("position", "-22 0 -17"); // Position it in the scene
    fstud2.setAttribute("rotation", "0 180 0");
    fstud2.setAttribute('visible', 'true');

    const fstud3 = document.createElement("a-entity");
    fstud3.setAttribute("id", "character");
    fstud3.setAttribute("gltf-model", "url(models/fstud3.glb)"); // Use your model file
    fstud3.setAttribute("scale", "2.75 2.75 2.75"); // Adjust size if necessary
    fstud3.setAttribute("position", "-10 0 -4"); // Position it in the scene
    fstud3.setAttribute("rotation", "0 180 0");
    fstud3.setAttribute('visible', 'true');

    const fstud4 = document.createElement("a-entity");
    fstud4.setAttribute("id", "character");
    fstud4.setAttribute("gltf-model", "url(models/fstud4.glb)"); // Use your model file
    fstud4.setAttribute("scale", "2 2 2"); // Adjust size if necessary
    fstud4.setAttribute("position", "-10 0 -15"); // Position it in the scene
    fstud4.setAttribute("rotation", "0 0 0");
    fstud4.setAttribute('visible', 'true');
    

    // Add character to the scene
    scene.appendChild(miku);
    scene.appendChild(luffy);
    scene.appendChild(fstud1);
    scene.appendChild(fstud2);
    scene.appendChild(fstud3);
    scene.appendChild(fstud4);
}

function startCutscene() {
    console.log("Starting Cutscene");

    const scene = document.querySelector("a-scene");
    const cameraEntity = document.querySelector("[camera]");
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
        fadeOverlay.setAttribute('animation', {
            property: 'material.opacity',
            to: '0',
            dur: 2000,
            easing: 'linear'
        });


        // Hide game title after fade-in completes
        setTimeout(() => {
        gameTitle.setAttribute("visible", "false");
        }, 2000); 


    }, 2000);

    // Move camera after fade-in
    setTimeout(() => {
        console.log("Moving camera...");
        cameraEntity.setAttribute('animation', {
            property: 'position',
            to: '0 1.6 -5',
            dur: 5000,
            easing: 'easeInOutQuad'
        });
    }, 2000);

    // FADE-OUT + Change Scene
    setTimeout(() => {
        console.log("Fading out...");

        fadeOverlay.setAttribute('animation', {
            property: 'material.opacity',
            to: '1',
            dur: 2000,
            easing: 'linear'
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

            // Load new model
            const newModel = document.createElement("a-entity");
            newModel.setAttribute("id", "newScene");
            newModel.setAttribute("gltf-model", "models/classroom.glb");
            newModel.setAttribute("scale", "2 2 2");
            newModel.setAttribute("position", "0 0 -10");
            newModel.setAttribute("static-body", "");

            scene.appendChild(newModel);
            console.log("New scene added.");

            addCharacters();

            // FADE-IN (Reveal new scene)
            fadeOverlay.setAttribute('animation', {
                property: 'material.opacity',
                to: '0',
                dur: 2000,
                easing: 'linear'
            });

        }, 2000); // Wait for fade-out before loading new scene

    }, 8000); // Scene change happens after camera move



}
startCutscene();
