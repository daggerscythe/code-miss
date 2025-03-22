import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';



function createNPC(position, color, name) {
    let scene = document.querySelector("a-scene");
    
    let npc = document.createElement("a-box");
    npc.setAttribute("position", position);
    npc.setAttribute("width", "1");
    npc.setAttribute("height", "2");
    npc.setAttribute("depth", "1");
    npc.setAttribute("color", color);

    // Add click event for interaction
    npc.addEventListener("click", function () {
        console.log(`${name}: "Hey, stranger. Welcome to Code City."`);
    });

    scene.appendChild(npc);
}

// Create an NPC
createNPC("2 1 -4", "red", "Cyberpunk NPC");
