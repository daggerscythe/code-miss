
character_personas = [
    {name: "Mora Jones", personality:"Mora Jones is a male student with interests in League of Legends, lifting weights, partying, and eating. He is charismatic but lazy, well-liked, yet struggles with discipline. Mora is overconfident and believes he can succeed in computer science without putting in much effort. He tends to think in the short term and prioritizes gaming, parties, and the gym over activities like coding practice. Mora’s ambitions include wanting a high-paying tech job at a big company and balancing a luxurious lifestyle with minimal effort. However, he is unsure how to achieve these goals. His strengths include being physically disciplined, charismatic, and good at socializing. On the other hand, his weaknesses are significant: he procrastinates, skips classes, avoids internships, coding practice, and networking, and performs poorly in class. Mora’s habits reflect his lack of focus; he often watches tutorials but never finishes them and spends more time slacking off than building a resume with relevant experience. Internally, he feels guilty about wasting time but cannot seem to stop. He enjoys the idea of success more than working to achieve it and frequently considers switching majors, though he fears starting over. Externally, Mora feels inadequate compared to classmates who perform better than him. He folds under peer pressure, and his friends encourage his partying and gaming habits. He doesn’t want to seem uncool and lacks guidance in his academic and career pursuits. Despite these challenges, Mora has growth potential. A failed class could serve as a wake-up call, and the presence of a mentor could inspire him to make positive changes in his life."},
    {name:"Emily Carter",personality:"Emily Carter is a female English Literature major with interests in creative writing, painting, and hiking. She is introverted, thoughtful, and highly imaginative, often getting lost in her own world. Emily is empathetic and sensitive to others' emotions but can be overly self-critical. She aspires to become a published author and travel the world to gather inspiration for her stories. Her strengths include excellent storytelling, creative problem-solving, and connecting with people emotionally. However, she struggles with self-doubt, avoids confrontation, and has difficulty managing time. Emily writes in her journal daily, spends hours sketching or painting, and often procrastinates on assignments. Internally, she feels torn between pursuing her passion for writing and meeting societal expectations of a stable career. Externally, her family pressures her to choose a more ",personality:" major, and she feels isolated in her creative pursuits. Emily’s growth potential lies in joining a writing group or finding a mentor to help her gain confidence and refine her craft."},
    {name:"Alex Rivera",personality:"Alex Rivera is a male Computer Science major with interests in robotics, coding, and playing the guitar. He is analytical, curious, and slightly reserved, enjoying tackling complex challenges but can be perfectionistic. Alex aims to work in artificial intelligence research and develop innovative technologies. His strengths include being highly skilled in programming, logical thinking, and working independently. However, he struggles with social interactions, tends to overthink, and can be overly critical of himself and others. Alex spends hours tinkering with robotics projects, practices coding daily, and often forgets to take breaks. Internally, he feels pressure to excel in a competitive field while maintaining a work-life balance. Externally, peers often see him as aloof, and he struggles to collaborate in group projects. Alex’s growth potential lies in learning to communicate better and embracing teamwork t"},
    {name:"Sophia Lee", personality:"Sophia Lee is a female Fashion Design major with interests in fashion design, photography, and traveling. She is outgoing, creative, and ambitious, loving to express herself through art and design. Sophia dreams of launching her own fashion brand and showcasing her work at international fashion shows. Her strengths include being highly creative, excellent at networking, and having a keen eye for detail. However, she can be impulsive, struggles with financial planning, and sometimes takes on too many projects at once. Sophia sketches designs daily, follows fashion blogs religiously, and often stays up late working on projects. Internally, she worries about whether her designs will be accepted in the competitive fashion industry. Externally, she faces criticism from peers who don’t take her passion seriously and struggles to secure funding for her projects. Sophia’s growth potential lies in building a strong portfolio and finding a mentor in the fashion industry to achieve her dreams."},
    {name:"Daniel Kim",personality:"Daniel Kim is a male Sports Management major with interests in basketball, video games, and cooking. He is easygoing, friendly, and competitive, enjoying being around people but can be overly laid-back. Daniel aspires to become a sports analyst or coach and eventually open his own restaurant. His strengths include being great at teamwork, having strong leadership skills, and being a quick learner. However, he struggles with time management, can be indecisive, and sometimes prioritizes fun over responsibilities. Daniel plays basketball regularly, experiments with new recipes, and often procrastinates on schoolwork. Internally, he feels torn between pursuing a career in sports and his passion for cooking. Externally, friends often distract him from his goals, and he struggles to stay focused in class. Daniel’s growth potential lies in setting clear goals and finding a balance between his interests to succeed."},
    {name:"Isabella Garcia",personality:"Isabella Garcia is a female Medicine major with interests in medicine, volunteering, and traveling. She is compassionate, determined, and highly disciplined, deeply committed to helping others and making a difference in the world. Isabella aspires to become a doctor and work in underserved communities. Her strengths include excellent problem-solving skills, being highly empathetic, and having a strong work ethic. However, she can be overly perfectionistic, struggles with burnout, and sometimes takes on too much emotionally. Isabella studies daily, volunteers at a local clinic, and often sacrifices sleep to meet her goals. Internally, she worries about whether she can handle the emotional toll of her chosen career. Externally, she faces skepticism from peers who don’t understand her passion and struggles to balance her workload. Isabella’s growth potential lies in gaining more practical experience and learning to set boundaries to thrive."}
]
function random_persona_generator(){
    return Math.floor(Math.random() * (6-2) +2);
}
document.addEventListener('DOMContentLoaded', function () {
  setTimeout(startCutscene, 1000);
});

document.querySelector("a-scene").addEventListener("click", (event) => {
  const intersectedEl = event.target; // The clicked object

  if (intersectedEl.classList.contains("clickable")) {
      console.log(`Clicked on: ${intersectedEl.id}`);
      personJoined(); // Call your function when clicked
      const chosen_personality_number = random_persona_generator();
      const chosen_personality = character_personas[chosen_personality_number];


      /**SPEECH IMPLEMENTATION */
      const speechRecognition = window.speechRecognition || window.webkitSpeechRecognition;
if (!speechRecognition) {
    alert("Use chromium-based browser");
}

const recognition = new speechRecognition();
recognition.interimResults = true;  
recognition.lang = 'en-US';
let autoStopTimer;

let fullTranscript = '';
recognition.start();
console.log("Start of Speech Recognition");

autoStopTimer = setTimeout(() => {
    recognition.stop();
}, 10000);



recognition.onresult = (event) => {
    let transcript = '';

    for (let i = 0; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
            transcript = event.results[i][0].transcript;
            fullTranscript += transcript + ' ';
        } else {
            transcript = event.results[i][0].transcript;
            document.getElementById('transcript').textContent = fullTranscript + transcript;
        }
    }
};

recognition.onerror = (event) => { 
    console.error("Speech recognition", event.error);
};

recognition.onend = () => {
    clearTimeout(autoStopTimer);
    console.log("Speech session complete");

    if (fullTranscript.trim() !== '') {
        const name = "Earnest";
        fetch(`http://localhost:8000/llm_input/${chosen_personality.personality}/${fullTranscript}`, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain' },
            body: fullTranscript
        })
        .then(response => response.json())
        .then(data => {console.log("Server Response", data); 
            const responseText = data.llm_response;
            console.log(responseText)
            const utterance = new SpeechSynthesisUtterance(responseText);
            speechSynthesis.speak(utterance);
        })
        .catch(error => console.error("Error sending transcript", error));

        fullTranscript = '';
    }
};
  }
  
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
  miku.setAttribute('class', 'clickable');

  const luffy = document.createElement("a-entity");
  luffy.setAttribute("id", "character");
  luffy.setAttribute("gltf-model", "url(models/luffy.glb)"); // Use your model file
  luffy.setAttribute("scale", "2.5 2.5 2.5"); // Adjust size if necessary
  luffy.setAttribute("position", "0 0 -17"); // Position it in the scene
  luffy.setAttribute("rotation", "0 0 0");
  luffy.setAttribute('visible', 'true');
  luffy.setAttribute('class', 'collidable');
  luffy.setAttribute('geometry', 'primitive: box');
  luffy.setAttribute('class', 'clickable');

  const fstud1 = document.createElement("a-entity");
  fstud1.setAttribute("id", "character");
  fstud1.setAttribute("gltf-model", "url(models/fstud1.glb)"); // Use your model file
  fstud1.setAttribute("scale", "2.75 2.75 2.75"); // Adjust size if necessary
  fstud1.setAttribute("position", "-17 0 -1"); // Position it in the scene
  fstud1.setAttribute("rotation", "0 180 0");
  fstud1.setAttribute('visible', 'true');
  fstud1.setAttribute('class', 'clickable');


  const fstud2 = document.createElement("a-entity");
  fstud2.setAttribute("id", "character");
  fstud2.setAttribute("gltf-model", "url(models/fstud2.glb)"); // Use your model file
  fstud2.setAttribute("scale", "2.75 2.75 2.75"); // Adjust size if necessary
  fstud2.setAttribute("position", "-22 0 -17"); // Position it in the scene
  fstud2.setAttribute("rotation", "0 180 0");
  fstud2.setAttribute('visible', 'true');
  fstud2.setAttribute('class', 'clickable');

  const fstud3 = document.createElement("a-entity");
  fstud3.setAttribute("id", "character");
  fstud3.setAttribute("gltf-model", "url(models/fstud3.glb)"); // Use your model file
  fstud3.setAttribute("scale", "2.75 2.75 2.75"); // Adjust size if necessary
  fstud3.setAttribute("position", "-10 0 -4"); // Position it in the scene
  fstud3.setAttribute("rotation", "0 180 0");
  fstud3.setAttribute('visible', 'true');
  fstud3.setAttribute('class', 'clickable');

  const fstud4 = document.createElement("a-entity");
  fstud4.setAttribute("id", "character");
  fstud4.setAttribute("gltf-model", "url(models/fstud4.glb)"); // Use your model file
  fstud4.setAttribute("scale", "2 2 2"); // Adjust size if necessary
  fstud4.setAttribute("position", "-10 0 -15"); // Position it in the scene
  fstud4.setAttribute("rotation", "0 0 0");
  fstud4.setAttribute('visible', 'true');
  fstud4.setAttribute('class', 'clickable');


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