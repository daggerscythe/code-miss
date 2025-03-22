document.addEventListener('DOMContentLoaded', function () {
    setTimeout(startCutscene, 1000);
});

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

            scene.appendChild(newModel);
            console.log("New scene added.");

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
