document.addEventListener('DOMContentLoaded', function () {
    // Cutscene sequence starts after a delay
    setTimeout(startCutscene, 1000);
});

function startCutscene() {
    // Access the camera
    const camera = document.querySelector("#camera");

    // Set the initial camera position
    camera.setAttribute('position', { x: 0, y: 1.6, z: 5 });

    // Move the camera smoothly to a new position after 1 second
    camera.setAttribute('animation', {
        property: 'position',
        to: '5 1.6 -5',
        dur: 5000,
        easing: 'easeInOutQuad',
        loop: 0
    });

    // Animate a building (e.g., make it scale up)
    const building = document.querySelector("#building");
    building.setAttribute('animation', {
        property: 'scale',
        to: '5 5 5',
        dur: 3000,
        easing: 'easeInOutQuad',
        loop: 0
    });

    // After the camera finishes its movement, show the next sequence
    setTimeout(function () {
        // Move the camera to the next view
        camera.setAttribute('animation', {
            property: 'position',
            to: '-5 1.6 -5',
            dur: 5000,
            easing: 'easeInOutQuad',
            loop: 0
        });
        
        // You can add other animations or events here to continue the cutscene
    }, 5000); // This sets the next camera move to happen after the first move

    // Example: Trigger more events or actions after a delay
    setTimeout(function () {
        alert('Cutscene Ended!');
    }, 10000); // This will show an alert 10 seconds after the cutscene starts
}
