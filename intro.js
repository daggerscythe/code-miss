// Character personalities (can stay)
character_personas = [
  {name: "Mora Jones", personality:"Mora Jones is a male student with interests in League of Legends, lifting weights, partying, and eating. He is charismatic but lazy, well-liked, yet struggles with discipline. Mora is overconfident and believes he can succeed in computer science without putting in much effort. He tends to think in the short term and prioritizes gaming, parties, and the gym over activities like coding practice. Mora’s ambitions include wanting a high-paying tech job at a big company and balancing a luxurious lifestyle with minimal effort. However, he is unsure how to achieve these goals. His strengths include being physically disciplined, charismatic, and good at socializing. On the other hand, his weaknesses are significant: he procrastinates, skips classes, avoids internships, coding practice, and networking, and performs poorly in class. Mora’s habits reflect his lack of focus; he often watches tutorials but never finishes them and spends more time slacking off than building a resume with relevant experience. Internally, he feels guilty about wasting time but cannot seem to stop. He enjoys the idea of success more than working to achieve it and frequently considers switching majors, though he fears starting over. Externally, Mora feels inadequate compared to classmates who perform better than him. He folds under peer pressure, and his friends encourage his partying and gaming habits. Mora has recently realized that his lack of coding skills is holding him back from landing internships or side gigs. He’s also noticed that some of his gaming friends are making money through game modding or app development, which has sparked a slight interest in coding. While he still prefers gaming and partying, he’s starting to see coding as a way to fund his luxurious lifestyle without too much effort."},
  {name:"Emily Carter",personality:"Emily Carter is a female English Literature major with interests in creative writing, painting, and hiking. She is introverted, thoughtful, and highly imaginative, often getting lost in her own world. Emily is empathetic and sensitive to others' emotions but can be overly self-critical. She aspires to become a published author and travel the world to gather inspiration for her stories. Her strengths include excellent storytelling, creative problem-solving, and connecting with people emotionally. However, she struggles with self-doubt, avoids confrontation, and has difficulty managing time. Emily writes in her journal daily, spends hours sketching or painting, and often procrastinates on assignments. Internally, she feels torn between pursuing her passion for writing and meeting societal expectations of a stable career. Externally, her family pressures her to choose a more ",personality:" major, and she feels isolated in her creative pursuits. Emily’s growth potential lies in joining a writing group or finding a mentor to help her gain confidence and refine her craft. Emily has recently discovered interactive storytelling and digital art platforms that require basic coding skills to create immersive experiences. She’s fascinated by the idea of combining her love for writing and art with technology to create something unique. While she’s hesitant about the technical aspects, she’s curious to learn how coding can enhance her creative projects."},
  {name:"Alex Rivera",personality:"Alex Rivera is a male Computer Science major with interests in robotics, coding, and playing the guitar. He is analytical, curious, and slightly reserved, enjoying tackling complex challenges but can be perfectionistic. Alex aims to work in artificial intelligence research and develop innovative technologies. He sees the coding club as an opportunity to collaborate on robotics or AI projects with like-minded peers. He’s also interested in mentoring others to improve his communication skills and build a stronger network. His strengths include being highly skilled in programming, logical thinking, and working independently. However, he struggles with social interactions, tends to overthink, and can be overly critical of himself and others. Alex spends hours tinkering with robotics projects, practices coding daily, and often forgets to take breaks. Internally, he feels pressure to excel in a competitive field while maintaining a work-life balance. Externally, peers often see him as aloof, and he struggles to collaborate in group projects. Alex’s growth potential lies in learning to communicate better and embracing teamwork."},
  {name:"Sophia Lee", personality:"Sophia Lee is a female Fashion Design major with interests in fashion design, photography, and traveling. She is outgoing, creative, and ambitious, loving to express herself through art and design. Sophia dreams of launching her own fashion brand and showcasing her work at international fashion shows. Recently, she has become interested in wearable technology and how coding can be used to create innovative fashion designs, such as LED clothing or smart fabrics. She sees coding as a way to stand out in the competitive fashion industry and is eager to learn how technology can enhance her designs. Her strengths include being highly creative, excellent at networking, and having a keen eye for detail. However, she can be impulsive, struggles with financial planning, and sometimes takes on too many projects at once. Sophia sketches designs daily, follows fashion blogs religiously, and often stays up late working on projects. Internally, she worries about whether her designs will be accepted in the competitive fashion industry. Externally, she faces criticism from peers who don’t take her passion seriously and struggles to secure funding for her projects. Sophia’s growth potential lies in building a strong portfolio and finding a mentor in the fashion industry to achieve her dreams."},
  {name:"Daniel Kim",personality:"Daniel Kim is a male Sports Management major with interests in basketball, video games, and cooking. He is easygoing, friendly, and competitive, enjoying being around people but can be overly laid-back. Daniel aspires to become a sports analyst or coach and eventually open his own restaurant. Recently, he has started exploring sports analytics and how coding can be used to analyze player performance or game strategies. He’s also interested in creating a mobile app for his future restaurant or a gaming app related to basketball. While he’s not a natural coder, he’s curious about how it can help him achieve his goals in sports and business. His strengths include being great at teamwork, having strong leadership skills, and being a quick learner. However, he struggles with time management, can be indecisive, and sometimes prioritizes fun over responsibilities. Daniel plays basketball regularly, experiments with new recipes, and often procrastinates on schoolwork. Internally, he feels torn between pursuing a career in sports and his passion for cooking. Externally, friends often distract him from his goals, and he struggles to stay focused in class. Daniel’s growth potential lies in setting clear goals and finding a balance between his interests to succeed."},
  {name:"Isabella Garcia",personality:"Isabella Garcia is a female Medicine major with interests in medicine, volunteering, and traveling. She is compassionate, determined, and highly disciplined, deeply committed to helping others and making a difference in the world. Isabella aspires to become a doctor and work in underserved communities. Recently, she has become interested in health technology and how coding can be used to develop medical software, analyze patient data, or create apps for underserved communities. She sees coding as a way to expand her impact as a future doctor and is eager to learn how technology can improve healthcare delivery. Her strengths include excellent problem-solving skills, being highly empathetic, and having a strong work ethic. However, she can be overly perfectionistic, struggles with burnout, and sometimes takes on too much emotionally. Isabella studies daily, volunteers at a local clinic, and often sacrifices sleep to meet her goals. Internally, she worries about whether she can handle the emotional toll of her chosen career. Externally, she faces skepticism from peers who don’t understand her passion and struggles to balance her workload. Isabella’s growth potential lies in gaining more practical experience and learning to set boundaries to thrive."}
]


// Utility for random persona
function random_persona_generator() {
  return Math.floor(Math.random() * (6 - 2) + 2);
}

// Cutscene + character setup
document.addEventListener('DOMContentLoaded', function () {
  setTimeout(startCutscene, 1000);
});

// Only cutscene + spawn logic now
function addCharacters() {
  const scene = document.querySelector("a-scene");

  const characters = [
    { id: "miku", model: "models/miku.glb", scale: "0.0025 0.0025 0.0025", position: "0 0 -10", rotation: "0 180 0" },
    { id: "luffy", model: "models/luffy.glb", scale: "2.5 2.5 2.5", position: "0 0 -17", rotation: "0 0 0" },
    { id: "fstud1", model: "models/fstud1.glb", scale: "2.75 2.75 2.75", position: "-17 0 -1", rotation: "0 180 0" },
    { id: "fstud2", model: "models/fstud2.glb", scale: "2.75 2.75 2.75", position: "-22 0 -17", rotation: "0 180 0" },
    { id: "fstud3", model: "models/fstud3.glb", scale: "2.75 2.75 2.75", position: "-10 0 -4", rotation: "0 180 0" },
    { id: "fstud4", model: "models/fstud4.glb", scale: "2 2 2", position: "-10 0 -15", rotation: "0 0 0" },
  ];

  characters.forEach(char => {
    const entity = document.createElement("a-entity");
    entity.setAttribute("id", char.id);
    entity.setAttribute("gltf-model", `url(${char.model})`);
    entity.setAttribute("scale", char.scale);
    entity.setAttribute("position", char.position);
    entity.setAttribute("rotation", char.rotation);
    entity.setAttribute("class", "clickable");
    entity.setAttribute("character-interaction", ""); // <-- attach your component here
    scene.appendChild(entity);
  });
}

// Keep your cutscene logic here
function startCutscene() {
  console.log("Starting Cutscene");
  const scene = document.querySelector("a-scene");
  const cameraEntity = document.querySelector("[camera]");
  const fadeOverlay = document.querySelector("#fadeOverlay");
  const gameTitle = document.querySelector("#gameTitle");
  const oldModel = document.querySelector("#weir");
  const ground = document.querySelector("#ground");

  if (!cameraEntity || !fadeOverlay || !scene || !gameTitle) {
      console.error("Missing elements in scene.");
      return;
  }

  // Fade-in/out and camera animation (your original cutscene steps)
  setTimeout(() => {
      fadeOverlay.setAttribute('animation', {
          property: 'material.opacity',
          to: '0',
          dur: 2000,
          easing: 'linear'
      });
      setTimeout(() => {
          gameTitle.setAttribute("visible", "false");
      }, 2000);
  }, 2000);

  setTimeout(() => {
      cameraEntity.setAttribute('animation', {
          property: 'position',
          to: '0 1.6 -5',
          dur: 5000,
          easing: 'easeInOutQuad'
      });
  }, 2000);

  setTimeout(() => {
      fadeOverlay.setAttribute('animation', {
          property: 'material.opacity',
          to: '1',
          dur: 2000,
          easing: 'linear'
      });

      setTimeout(() => {
          if (oldModel) oldModel.remove();
          if (ground) ground.remove();
          const newModel = document.createElement("a-entity");
          newModel.setAttribute("id", "newScene");
          newModel.setAttribute("gltf-model", "models/classroom.glb");
          newModel.setAttribute("scale", "2 2 2");
          newModel.setAttribute("position", "0 0 -10");
          newModel.setAttribute("static-body", "");
          scene.appendChild(newModel);
          addCharacters(); // Add NPCs
          fadeOverlay.setAttribute('animation', {
              property: 'material.opacity',
              to: '0',
              dur: 2000,
              easing: 'linear'
          });
      }, 2000);

  }, 8000);
}
