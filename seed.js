const fs = require("fs");

const seedData = {
    weights: [2, 3, 5, 8],
    roles: ["backend", "frontend", "fullstack"],
    termMap: {
        backend: ["back-end", "python", "pytest", "django", "sql", "nosql", "redis", "AWS", "api", "ci/cd"],
        fullstack: ["full-stack", "python", "javascript", "css", "sql", "api", "ui", "html","databases", "typescript", "react"],
        frontend: ["front-end", "ui", "ux", "design", "accessibility", "css", "tailwind", "javascript", "react", "typescript" ]
    },
    titles: [
        "software engineer", 
        "senior software engineer", 
        "software developer",  
        "programmer", 
        "software development engineer"
    ],
    randomAchievements: [
        "Led adoption of ",
        "Increased throughput of systems using ",
        "Introduced quality standards for ",
        "Enhanced testing of ",
        "Coached more junior employees in ",
        "Recognized subject matter expert for ",
        "Led research effort on improvements to our ",
        "Decreased bugs by 50 percent related to ", 
        "Created platform with ", 
        "Spearheaded workshops to train colleagues in "
    ],
    candidateList: []
}


function getRandomArrayItems(items, quantity) {
    let randomItems = [] 

    for(let i=0; i < quantity; i++) {
      randomItems.push(items[Math.floor(Math.random() * items.length)]);
    }

    return randomItems;
}

function generateCandidateData() {
    // Silly little function to generate some candidate profiles 
    let candidates = [];

    for(let i=0; i <= 10; i++) {
      const weight = getRandomArrayItems(seedData.weights, 1)[0];

      seedData.roles.forEach(role => {
        const achievementList = getRandomArrayItems(seedData.randomAchievements, weight);
        
        let profile = { 
          title: `${role} ${getRandomArrayItems(seedData.titles, 1)[0]}` 
        }
        let achievementsWithTechKeywords = []

        achievementList.map(achievement => {
          achievementsWithTechKeywords.push(
            `${achievement} ${getRandomArrayItems(seedData.termMap[role], weight).join(", ")}`
          );
        })

        profile["resume"] = achievementsWithTechKeywords.join(" ");
        candidates.push(profile);
      })
    }
    seedData.candidateList = candidates;
};

function writeCandidateData() {
    fs.writeFile("./candidates.json", JSON.stringify(seedData.candidateList), err => {
        if(err) console.error(err);
    })
};

generateCandidateData();
writeCandidateData();
