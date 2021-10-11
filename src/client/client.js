let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

var HOST = location.origin.replace(/^http/, 'ws')
const ws = new WebSocket(HOST);
ws.binaryType = "arraybuffer"

let savedname = localStorage.getItem("name");
if (savedname != undefined) {
  document.getElementById("username").value = savedname;
}

let joinButton = document.querySelector(".play");
let menu = document.querySelector(".menu");
let game = document.querySelector(".game");
let chatInput = document.getElementById("chatInput");
let chatArea = document.getElementById("chat");
let chatUI = document.getElementById("chatUI");
let serverList = document.querySelector('.serverList');
let join = document.querySelector(".joinDiv");

var players = {};
var enemies = {};
var projectiles = {};

let chatting = false;
let name = "";
let inGame = false;
let selfId = "";
let playerOffset = { x: 0, y: 0 };
let area = 1;
let world = "Corrupted Core";
let mouseX = 0;
let mouseY = 0;
let mouseToggleC = 0;
let state = "menu";
let dataThisSecond = 0;
let kbps = 0;
let showProjectiles = true;

setInterval(() => {
  kbps = Math.floor(dataThisSecond / 100) / 10;
  dataThisSecond = 0;
}, 1000)
const amogusImage = new Image();
amogusImage.src = "./amogus.png";
ws.addEventListener("message", function (data) {
  let message = msgpack.decode(new Uint8Array(data.data));
  dataThisSecond += data.data.byteLength;

  if (message.chat) {
    let txt = message.chat;
    let scroll =
      chatArea.scrollTop + chatArea.clientHeight >=
      chatArea.scrollHeight - 5;

    let newDiv = document.createElement("div");
    newDiv.classList.add("chatMsg");
    newDiv.innerText = txt;
    chatArea.appendChild(newDiv);

    if (scroll) {
      chatArea.scrollTop = chatArea.scrollHeight;
    }
  }
  if (message.pi) {
    for (let i in message.pi) {
      players[message.pi[i].id] = new Player(message.pi[i]);
    }
  }
  if (message.er) {
    enemies = {};
  }
  if (message.ei) {
    for (let i in message.ei) {
      enemies[message.ei[i].id] = new Enemy(message.ei[i]);
    }
  }
  if (message.pu) {
    for (let a in message.pu) {
      if (players[message.pu[a].id]) {
        players[message.pu[a].id].updatePack(message.pu[a]);
      }
    }
  }
  if (message.eu) {
    for (let a in message.eu) {
      if (enemies[message.eu[a].id]) {
        enemies[message.eu[a].id].updatePack(message.eu[a]);
      }
    }
  }
  if (message.pri) {
    for (let i in message.pri) {
      projectiles[message.pri[i].id] = new Projectile(message.pri[i]);
    }
  }
  if (message.pru) {
    for (let i in message.pru) {
      if (projectiles[message.pru[i].id]) {
        projectiles[message.pru[i].id].updatePack(message.pru[i]);
      }
    }
  }

  if (message.ab1cd) {
    for (let i in message.ab1cd) {
      if (players[message.ab1cd[i].id]) {
        players[message.ab1cd[i].id].updatePack(message.ab1cd[i]);
      }
    }
  }
  if (message.wps) {
    for (let i in message.wps) {
      if (players[message.wps[i].id]) {
        players[message.wps[i].id].updatePack(message.wps[i]);
      }
    }
  }
  if (message.ae) {
    for (let i in message.ae) {
      if (players[message.ae[i].id]) {
        players[message.ae[i].id].updatePack(message.ae[i]);
      }
    }
  }

  if (message.msp) {
    for (let i in message.msp) {
      if (players[message.msp[i].id]) {
        players[message.msp[i].id].updatePack(message.msp[i]);
      }
    }
  }

  if (message.ab2cd) {
    for (let i in message.ab2cd) {
      if (players[message.ab2cd[i].id]) {
        players[message.ab2cd[i].id].updatePack(message.ab2cd[i]);
      }
    }
  }
  if (message.prr) {
    projectiles = {};
  }
  if (message.si) {
    Resize();
    requestAnimationFrame(renderGame);
    selfId = message.si;
  }
  if (message.dc) {
    state = message.dc;
  }
  if (message.l) {
    delete players[message.l];
  }
});

let lastTime = Date.now();

let delt = 0;

let playerCount = 0;
let worldCount = 0;
let corruptedcore = false;
let methodicalmonastery = false;
let methodicalmonasteryhard = false;
let crazycosmos = false;
let crazycosmoshard = false;
let crowdedcavern = false;
let strangespace = false;
let tirelesstrek = false;
let acclimatingacceleration = false;
let makeyourownmap = false;
let jarringjourney = false;
let monumentalmigration = false;
let monumentalmigrationplus = false;
let toilsometraverse = false;
let becomesus = false;
let atrociousarena = false;
let arduousabyss = false;

toilsomeAreas = [
  "Desert 1-1", "Desert 1-2", "Desert 1-3", "Desert 1-4",

  "Oasis 1-1", "Oasis 1-2", "Oasis 1-3",

  "Desert 2-1", "Desert 2-2", "Desert 2-3",

  "Battlefield 1-1", "Battlefield 1-2", "Battlefield 1-3", "Battlefield 1-4", "Battlefield 1-5", "Battlefield 1-6",

  "Desert 3-1", "Desert 3-2", "Desert 3-3",

  "Aquifer 1-1", "Aquifer 1-2", "Aquifer 1-3", "Aquifer 1-4", "Aquifer 1-5",

  "Battlefield 2-1", "Battlefield 2-2", "Battlefield 2-3",

  "Battlefield 2-4", "Desert 4-1", "Desert 4-2", "Desert 4-3", "Desert 4-4",

  "Hallucination 1-1", "Hallucination 1-2", "Hallucination 1-3", "Hallucination 1-4",

  "Jungle 1-1", "Jungle 1-2", "Jungle 1-3", "Jungle 1-4",

  "Area 41 Victory!",

  "Storm 1-1", "Storm 1-2", "Storm 1-3", "Storm 1-4",

  "Lab 1-1", "Lab 1-2", "Lab 1-3", "Lab 1-4",

  "Jungle 2-1", "Jungle 2-2", "Jungle 2-3",

  "Battlefield 3-1", "Battlefield 3-2", "Battlefield 3-3",

  "Jungle 3-1", "Jungle 3-2", "Jungle 3-3", "Jungle 3-4",

  "Hallucination 2-1", "Hallucination 2-2", "Hallucination 2-3",

  "Rocket 1-1", "Rocket 1-2", "Rocket 1-3", "Rocket 1-4", "Rocket 1-5",

  "Space 1-1", "Space 1-2", "Space 1-3", "Space 1-4",

  "Space 2-1", "Space 2-2", "Space 2-3", "Space 2-4",

  "Hallucination 3-1", "Hallucination 3-2", "Hallucination 3-3", "Hallucination 3-4",

  "Final Boss",

  "Area 81 Victory!"];

/*
53 - 55 is battle field 3-, 56 - 59 is jungle, 60-62 hallucination, 63-67 is rocket, 68-71 is space, 72-75 is space again, 76-79 hallucination, 80 final boss
*/

function renderGame() {
  let time = Date.now();
  let delta = time - lastTime;
  lastTime = time;

  delt = get_delta(delt);
  monumentalmigration = false;
  monumentalmigrationplus = false;
  corruptedcore = false;
  methodicalmonastery = false;
  methodicalmonasteryhard = false;
  crazycosmos = false;
  crazycosmoshard = false;
  crowdedcavern = false;
  strangespace = false;
  tirelesstrek = false;
  acclimatingacceleration = false;
  makeyourownmap = false;
  jarringjourney = false;
  toilsometraverse = false;
  becomesus = false;
  atrociousarena = false;
  arduousabyss = false;

  for (let i in players) {
    players[i].interp(delt);
    if (players[i].id == selfId) {
      const player = players[i];
      ctx.fillStyle = "#333333";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      playername = player.name;
      area = player.area;
      world = player.world;

      playerOffset.x = (player.renderX - 640) * -1;
      playerOffset.y = (player.renderY - 360) * -1;

      //Safe Zones
      ctx.fillStyle = "rgba(195,195,195,1)";
      ctx.fillRect(playerOffset.x, playerOffset.y, 384 / 1.4 + 96 / 1.4, 720 / 1.4);
      ctx.fillRect(3360 / 1.4 + 1028.6 + playerOffset.x, playerOffset.y, 384 / 1.4, 720 / 1.4);

      if (area == 1) {
        //Teleporting between worlds
        ctx.fillStyle = "rgba(106,208,222,1)";
        ctx.fillRect(playerOffset.x, playerOffset.y, 480 / 1.4, 96 / 1.4);
        ctx.fillRect(playerOffset.x, 624 / 1.4 + playerOffset.y, 480 / 1.4, 96 / 1.4);

        //Teleporting between areas
        if (player.world == "Corrupted Core") {
          ctx.fillStyle = "rgba(85,176,179,1)";
          ctx.fillRect(playerOffset.x, playerOffset.y, 96 / 1.4, 720 / 1.4);
        }

        ctx.fillStyle = "rgba(255,244,108,1)";
        ctx.fillRect(3744 / 1.4 + 1028.6 + playerOffset.x, playerOffset.y, 96 / 1.4, 720 / 1.4);
      } else {
        ctx.fillStyle = "rgba(255,244,108,1)";
        ctx.fillRect(playerOffset.x, playerOffset.y, 96 / 1.4, 720 / 1.4);
        ctx.fillRect(3744 / 1.4 + 1028.6 + playerOffset.x, playerOffset.y, 96 / 1.4, 720 / 1.4);
      }

      //Area
      ctx.fillStyle = "rgb(255, 255, 255)"
      ctx.fillRect(playerOffset.x + 480/1.4, playerOffset.y, 2880 / 1.4 + 1028.6, 720 / 1.4);
      ctx.globalAlpha = 0.4; // change if it doesnt look good
      if (world == "Arduous Abyss") {
        ctx.fillStyle = "#d49b83";
      } else if (world == "Atrocious Arena") {
        ctx.fillStyle = "#ad6666";
      } else if (world == "become sus") {
        ctx.fillStyle = "hsl("+(Date.now()/10)+", 50%, 50%)";
      } else if (world == "Corrupted Core") {
        ctx.fillStyle = "#b1aed6";
      } else if (world == "Crazy Cosmos Hard") {
        ctx.fillStyle = "#9b8cad";
      } else if (world == "Crazy Cosmos") {
        ctx.fillStyle = "#9b8cad";
      } else if (world == "Crowded Cavern") {
        ctx.fillStyle = "#7a7252";
      } else if (world == "Methodical Monastery") {
        ctx.fillStyle = "#f4b3f5";
      } else if (world == "Methodical Monastery Hard") {
        ctx.fillStyle = "#f4b3f5";
      } else if (world == "Monumental Migration+") {
        ctx.fillStyle = "#f3e6ff";
      } else if (world == "Monumental Migration") {
        ctx.fillStyle = "#f3e6ff";
      } else if (world == "Toilsome Traverse") {
        ctx.fillStyle = "#3eed72";
      } else if (world == "Strange Space") {
        ctx.fillStyle = "#3338a3";
      } else if (world == "Tireless Trek") {
        ctx.fillStyle = "#a591a8";
      } else if (world == "Acclimating Acceleration") {
        ctx.fillStyle = "#5b7fab";
      } else if (world == "Jarring Journey") {
        ctx.fillStyle = "#b05b3a";
      } else {
        ctx.fillStyle = "white";
      }

      if(area % 40 == 1 && area != 1){
        ctx.fillStyle = '#e0d897';
      }
      ctx.fillRect(playerOffset.x, playerOffset.y, 2880 / 1.4 + 1028.6 + 960/1.4, 720 / 1.4);
	    ctx.globalAlpha = 1;

      //Grid
      /*for(let z = 0; z < 80; z++){
        ctx.beginPath();
        ctx.moveTo(480/1.4+z*34.286+playerOffset.x, playerOffset.y);
        ctx.lineTo(480/1.4+z*34.286+playerOffset.x, 720/1.4+playerOffset);
        ctx.strokeStyle = "rgba(0,0,0,0.3)";
        ctx.stroke();
        ctx.closePath();
      }*/

      //Hero Card
      ctx.fillStyle = "rgba(150,150,150,0.4)";
      ctx.fillRect(canvas.width - 200, canvas.height - 200, 175, 200);

      ctx.font = "30px 'Exo 2'";
      ctx.strokeStyle = "black";
      ctx.lineWidth = 1;
      if (player.hero == "magmax") {
        ctx.fillStyle = "red";
        ctx.fillText("Magmax", canvas.width - 110, canvas.height - 140);
        ctx.strokeText("Magmax", canvas.width - 110, canvas.height - 140);
        ctx.fillStyle = '#70c474';
        ctx.fillRect(canvas.width - 200, canvas.height - 25, 175, 10);
        ctx.fillRect(canvas.width - 200, canvas.height - 10, 175, 10);
        ctx.fillStyle = "black";
        ctx.font = "16px 'Exo 2'";
        ctx.fillText("Passive", canvas.width - 110, canvas.height - 15);
        ctx.fillText("Passive", canvas.width - 110, canvas.height - 0);
        ctx.font = "30px 'Exo 2'";
      }
      if (player.hero == "gunslinger") {
        ctx.fillStyle = "#2b2b2b";
        ctx.fillText("Gunslinger", canvas.width - 110, canvas.height - 140);
        ctx.strokeText("Gunslinger", canvas.width - 110, canvas.height - 140);
        ctx.fillStyle = '#70c474';
        ctx.fillRect(canvas.width - 200, canvas.height - 25, 175, 10);
        ctx.fillRect(canvas.width - 200, canvas.height - 10, 175, 10);
        ctx.fillStyle = "black";
        ctx.font = "16px 'Exo 2'";
        ctx.fillText("Passive", canvas.width - 110, canvas.height - 15);
        ctx.fillText("Passive", canvas.width - 110, canvas.height - 0);
        ctx.font = "30px 'Exo 2'";
      }
      if (player.hero == "warper") {
        ctx.fillStyle = "#8d3dad";
        ctx.fillText("Warper", canvas.width - 110, canvas.height - 140);
        ctx.strokeText("Warper", canvas.width - 110, canvas.height - 140);
        ctx.fillStyle = '#70c474';
        ctx.fillRect(canvas.width - 200, canvas.height - 25, 175, 10);
        ctx.fillRect(canvas.width - 200, canvas.height - 10, 175, 10);
        ctx.fillStyle = '#8d3dad';
        ctx.fillRect(canvas.width - 200, canvas.height - 25, 175*player.warps/10, 10);
        ctx.fillStyle = "black";
        ctx.font = "16px 'Exo 2'";
        ctx.fillText("Warps Left: " + player.warps, canvas.width - 110, canvas.height - 15);
        ctx.fillText("Passive", canvas.width - 110, canvas.height - 0);
        ctx.font = "30px 'Exo 2'";
      }
      if (player.hero == "rameses") {
        ctx.fillStyle = "#989b4a";
        ctx.fillText("Rameses", canvas.width - 110, canvas.height - 140);
        ctx.strokeText("Rameses", canvas.width - 110, canvas.height - 140);
        ctx.fillStyle = '#70c474';
        ctx.fillRect(canvas.width - 200, canvas.height - 25, 175, 10);
      }
      if (player.hero == "orbital") {
        ctx.fillStyle = "#510a6e";
        ctx.fillText("Orbital", canvas.width - 110, canvas.height - 140);
        ctx.strokeText("Orbital", canvas.width - 110, canvas.height - 140);
        ctx.fillStyle = '#70c474';
        ctx.fillRect(canvas.width - 200, canvas.height - 25, 175, 10);
        ctx.fillRect(canvas.width - 200, canvas.height - 10, 175, 10);
        ctx.fillStyle = '#510a6e';
        ctx.fillRect(canvas.width - 200, canvas.height - 25, 175*player.ability1cooldown/30000, 10);
        ctx.fillRect(canvas.width - 200, canvas.height - 10, 175*player.ability2cooldown/3000, 10);
      }
      if (player.hero == "parvulus") {
        ctx.fillStyle = "#9042e3";
        ctx.fillText("Parvulus", canvas.width - 110, canvas.height - 140);
        ctx.strokeText("Parvulus", canvas.width - 110, canvas.height - 140);
        ctx.fillStyle = '#70c474';
        ctx.beginPath();
        ctx.arc(canvas.width - 150, canvas.height - 20, 17.14, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(canvas.width - 75, canvas.height - 20, 17.14, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
        ctx.fillStyle = "#9042e3";
        ctx.beginPath();
        ctx.arc(canvas.width - 150, canvas.height - 20, player.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(canvas.width - 75, canvas.height - 20, player.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
      }
      if (player.hero == "ptah") {
        ctx.fillStyle = "#665333";
        ctx.fillText("Ptah", canvas.width - 110, canvas.height - 140);
        ctx.strokeText("Ptah", canvas.width - 110, canvas.height - 140);
        ctx.fillStyle = '#70c474';
        ctx.fillRect(canvas.width - 200, canvas.height - 25, 175, 10);
        ctx.fillRect(canvas.width - 200, canvas.height - 10, 175, 10);
        ctx.fillStyle = "#665333";
        ctx.fillRect(canvas.width - 200, canvas.height - 10, 175*player.clay/4, 10);
        ctx.fillStyle = "black";
        ctx.font = "16px 'Exo 2'";
        ctx.fillText("Passive", canvas.width - 110, canvas.height - 15);
        ctx.font = "30px 'Exo 2'";
      }
      if (player.hero == "jotunn") {
        ctx.fillStyle = "#5cacff";
        ctx.fillText("Jotunn", canvas.width - 110, canvas.height - 140);
        ctx.strokeText("Jotunn", canvas.width - 110, canvas.height - 140);
        ctx.fillStyle = '#70c474';
        ctx.fillRect(canvas.width - 200, canvas.height - 25, 175, 10);
        ctx.fillRect(canvas.width - 200, canvas.height - 10, 175, 10);
        ctx.fillStyle = '#5cacff';
        ctx.fillRect(canvas.width - 200, canvas.height - 10, 175*player.ability2cooldown/8000, 10);
      }
      if (player.hero == "kindle") {
        ctx.fillStyle = "#ed6f3e";
        ctx.fillText("Kindle", canvas.width - 110, canvas.height - 140);
        ctx.strokeText("Kindle", canvas.width - 110, canvas.height - 140);
        ctx.fillStyle = '#70c474';
        ctx.fillRect(canvas.width - 200, canvas.height - 25, 175, 10);
        ctx.fillRect(canvas.width - 200, canvas.height - 10, 175, 10);
        ctx.fillStyle = '#ed6f3e';
        ctx.fillRect(canvas.width - 200, canvas.height - 25, 175*player.ability1cooldown/9000, 10);
        ctx.fillRect(canvas.width - 200, canvas.height - 10, 175*player.ability2cooldown/8000, 10);
      }
      if (player.hero == "neuid") {
        ctx.fillStyle = "#0d6d82";
        ctx.fillText("Neuid", canvas.width - 110, canvas.height - 140);
        ctx.strokeText("Neuid", canvas.width - 110, canvas.height - 140);
        ctx.fillStyle = '#70c474';
        ctx.fillRect(canvas.width - 200, canvas.height - 25, 175, 10);
        ctx.fillRect(canvas.width - 200, canvas.height - 10, 175, 10);
        ctx.fillStyle = '#0d6d82';
        ctx.fillRect(canvas.width - 200, canvas.height - 25, 175*player.ability1cooldown/8000, 10);
        ctx.fillRect(canvas.width - 200, canvas.height - 10, 175*player.ability2cooldown/20000, 10);
      }

      ctx.fillStyle = "black";
      ctx.font = "20px 'Exo 2'";
      ctx.fillText("Speed: " + player.speed, canvas.width - 110, canvas.height - 100);
      ctx.fillText("Energy: " + Math.floor(player.energy) + "/" + player.maxEnergy, canvas.width - 110, canvas.height - 70);
      ctx.fillText("Regen: " + player.regen, canvas.width - 110, canvas.height - 40);

      if (player.hero == "parvulus") {
        if (player.usingZ) {
          ctx.globalAlpha = 0.2;
          ctx.fillStyle = "#957da1"
          ctx.beginPath();
          ctx.arc(640, 360, 300, 0, 6.28318531);
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      }
      if (player.hero == "parvulus" && player.retaliation) {
        ctx.globalAlpha = 0.2;
        ctx.fillStyle = "#632670"
        ctx.beginPath();
        ctx.arc(player.renderX + playerOffset.x, player.renderY + playerOffset.y, 100, 0, 6.28318531);
        ctx.fill();
        ctx.globalAlpha = 0.4;
      }

      ctx.beginPath();
      ctx.arc(640, 360, player.radius, 0, 6.28318531);
      if (player.dead == false) {
        ctx.fillStyle = player.color;
        if (player.newtonian == false) {
          ctx.globalAlpha = 0.4;
        }
        ctx.fill();
        ctx.globalAlpha = 1;
      } else {
        ctx.globalAlpha = 0.3;
        ctx.fill();

        ctx.fillStyle = "black";
        ctx.globalAlpha = 1;
        ctx.font = "20px 'Exo 2'";
        ctx.textBaseline = "middle";
        ctx.fillText(player.dTimer, 640, 360);
        ctx.textBaseline = "bottom";
      }
      ctx.closePath();
      ctx.beginPath();
      if (player.invincible) {
        ctx.arc(640, 360, player.radius, 0, 6.28318531);
        ctx.strokeStyle = "rgb(220,220,220)";
        ctx.lineWidth = 10;
        ctx.stroke();
        ctx.arc(640, 360, player.radius, 0, 6.28318531);
        ctx.fillStyle = "black";
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      if (player.clay > 0) {
        ctx.arc(640, 360, player.radius + (2 * player.clay), 0, 6.28318531);
        ctx.strokeStyle = "#453926";
        ctx.lineWidth = 10;
        ctx.stroke();
        ctx.arc(640, 360, player.radius + (2 * player.clay), 0, 6.28318531);
        ctx.fillStyle = "black";
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      ctx.closePath();
      ctx.globalAlpha = 1;
      ctx.font = "18px 'Exo 2'";
      if (player.dead == false) {
        ctx.fillStyle = "rgb(0, 0, 0)";
      } else {
        ctx.fillStyle = "rgb(255,0,0)";
      }
      ctx.globalAlpha = 0.7;
      ctx.fillText(player.name, 640, 360 - 35);
      ctx.globalAlpha = 1;
      ctx.strokeStyle = "darkblue";
      ctx.strokeRect(640 - 22.5, 360 - 30, 45, 10);
      ctx.fillStyle = "blue";
      ctx.fillRect(640 - 22.5, 360 - 30, Math.max(45 * player.energy / player.maxEnergy, 0), 10);

      //Leaderboard
      ctx.fillStyle = "rgba(150,150,150,0.4)";
      ctx.fillRect(canvas.width - 210, 20, 200, 100 + playerCount * 20 + worldCount * 30);
      ctx.font = "22px 'Exo 2'";
      playerCount = 0;
      worldCount = 0;
      if (player.world == "Monumental Migration+") {
        ctx.font = "16px 'Exo 2'";
        monumentalmigrationplus = true;
        for (let j in players) {
          if (players[j].id != selfId) {
            const p = players[j];

            if (p.world == "Monumental Migration+") {
              playerCount++;
              ctx.font = "18px 'Exo 2'";
              if (p.dead == false) {
                ctx.fillStyle = "rgb(0, 0, 0)";
              } else {
                ctx.fillStyle = "rgb(255,0,0)";
              }
              ctx.fillText(p.name + " [" + p.area + "]", canvas.width - 110, 110 + (playerCount * 20) + (worldCount * 30));
            }
          }
        }
      }
      else if (player.world == "Monumental Migration") {
        ctx.font = "16px 'Exo 2'";
        monumentalmigration = true;
        for (let j in players) {
          if (players[j].id != selfId) {
            const p = players[j];

            if (p.world == "Monumental Migration") {
              playerCount++;
              ctx.font = "18px 'Exo 2'";
              if (p.dead == false) {
                ctx.fillStyle = "rgb(0, 0, 0)";
              } else {
                ctx.fillStyle = "rgb(255,0,0)";
              }
              ctx.fillText(p.name + " [" + p.area + "]", canvas.width - 110, 110 + (playerCount * 20) + (worldCount * 30));
            }
          }
        }
      }
      else if (player.world == "Toilsome Traverse") {
        ctx.font = "16px 'Exo 2'";
        toilsometraverse = true;
        for (let j in players) {
          if (players[j].id != selfId) {
            const p = players[j];

            if (p.world == "Toilsome Traverse") {

              ctx.font = "18px 'Exo 2'";
              if (p.dead == false) {
                ctx.fillStyle = "rgb(0, 0, 0)";
              } else {
                ctx.fillStyle = "rgb(255,0,0)";
              }

              let aName = toilsomeAreas[parseInt(p.area) - 1];
              ctx.fillText(p.name + " [" + aName + "]", canvas.width - 110, 110 + (playerCount * 20) + (worldCount * 30));

              playerCount++;
            }
          }
        }
      }
      else if (player.world == "become sus") {
        ctx.font = "18px 'Exo 2'";
        becomesus = true;
        for (let j in players) {
          if (players[j].id != selfId) {
            const p = players[j];

            if (p.world == "become sus") {
              playerCount++;
              ctx.font = "18px 'Exo 2'";
              if (p.dead == false) {
                ctx.fillStyle = "rgb(0, 0, 0)";
              } else {
                ctx.fillStyle = "rgb(255,0,0)";
              }
              ctx.fillText(p.name + " [" + p.area + "]", canvas.width - 110, 110 + (playerCount * 20) + (worldCount * 30));
            }
          }
        }
      }
      else if (player.world == "Atrocious Arena") {
        ctx.font = "18px 'Exo 2'";
        atrociousarena = true;
        for (let j in players) {
          if (players[j].id != selfId) {
            const p = players[j];

            if (p.world == "Atrocious Arena") {
              playerCount++;
              ctx.font = "18px 'Exo 2'";
              if (p.dead == false) {
                ctx.fillStyle = "rgb(0, 0, 0)";
              } else {
                ctx.fillStyle = "rgb(255,0,0)";
              }
              ctx.fillText(p.name + " [" + p.area + "]", canvas.width - 110, 110 + (playerCount * 20) + (worldCount * 30));
            }
          }
        }
      }
      else if (player.world == "Arduous Abyss") {
        ctx.font = "18px 'Exo 2'";
        arduousabyss = true;
        for (let j in players) {
          if (players[j].id != selfId) {
            const p = players[j];

            if (p.world == "Arduous Abyss") {
              playerCount++;
              ctx.font = "18px 'Exo 2'";
              if (p.dead == false) {
                ctx.fillStyle = "rgb(0, 0, 0)";
              } else {
                ctx.fillStyle = "rgb(255,0,0)";
              }
              ctx.fillText(p.name + " [" + p.area + "]", canvas.width - 110, 110 + (playerCount * 20) + (worldCount * 30));
            }
          }
        }
      }
      else if (player.world == "Strange Space") {
        ctx.font = "22px 'Exo 2'";
        strangespace = true;
        for (let j in players) {
          if (players[j].id != selfId) {
            const p = players[j];

            if (p.world == "Strange Space") {
              playerCount++;
              ctx.font = "18px 'Exo 2'";
              if (p.dead == false) {
                ctx.fillStyle = "rgb(0, 0, 0)";
              } else {
                ctx.fillStyle = "rgb(255,0,0)";
              }
              ctx.fillText(p.name + " [" + p.area + "]", canvas.width - 110, 110 + (playerCount * 20) + (worldCount * 30));
            }
          }
        }
      }
      else if (player.world == "Tireless Trek") {
        ctx.font = "22px 'Exo 2'";
        tirelesstrek = true;
        for (let j in players) {
          if (players[j].id != selfId) {
            const p = players[j];

            if (p.world == "Tireless Trek") {
              playerCount++;
              ctx.font = "18px 'Exo 2'";
              if (p.dead == false) {
                ctx.fillStyle = "rgb(0, 0, 0)";
              } else {
                ctx.fillStyle = "rgb(255,0,0)";
              }
              ctx.fillText(p.name + " [" + p.area + "]", canvas.width - 110, 110 + (playerCount * 20) + (worldCount * 30));
            }
          }
        }
      }
      else if (player.world == "Acclimating Acceleration") {
        ctx.font = "22px 'Exo 2'";
        acclimatingacceleration = true;
        for (let j in players) {
          if (players[j].id != selfId) {
            const p = players[j];

            if (p.world == "Acclimating Acceleration") {
              playerCount++;
              ctx.font = "18px 'Exo 2'";
              if (p.dead == false) {
                ctx.fillStyle = "rgb(0, 0, 0)";
              } else {
                ctx.fillStyle = "rgb(255,0,0)";
              }
              ctx.fillText(p.name + " [" + p.area + "]", canvas.width - 110, 110 + (playerCount * 20) + (worldCount * 30));
            }
          }
        }
      }
      else if (player.world == "Make Your Own Map") {
        ctx.font = "22px 'Exo 2'";
        makeyourownmap = true;
        for (let j in players) {
          if (players[j].id != selfId) {
            const p = players[j];

            if (p.world == "Make Your Own Map") {
              playerCount++;
              ctx.font = "18px 'Exo 2'";
              if (p.dead == false) {
                ctx.fillStyle = "rgb(0, 0, 0)";
              } else {
                ctx.fillStyle = "rgb(255,0,0)";
              }
              ctx.fillText(p.name + " [" + p.area + "]", canvas.width - 110, 110 + (playerCount * 20) + (worldCount * 30));
            }
          }
        }
      }
      else if (player.world == "Jarring Journey") {
        ctx.font = "22px 'Exo 2'";
        jarringjourney = true;
        for (let j in players) {
          if (players[j].id != selfId) {
            const p = players[j];

            if (p.world == "Jarring Journey") {
              playerCount++;
              ctx.font = "18px 'Exo 2'";
              if (p.dead == false) {
                ctx.fillStyle = "rgb(0, 0, 0)";
              } else {
                ctx.fillStyle = "rgb(255,0,0)";
              }
              ctx.fillText(p.name + " [" + p.area + "]", canvas.width - 110, 110 + (playerCount * 20) + (worldCount * 30));
            }
          }
        }
      }
      else if (player.world == "Crowded Cavern") {
        ctx.font = "22px 'Exo 2'";
        crowdedcavern = true;
        for (let j in players) {
          if (players[j].id != selfId) {
            const p = players[j];

            if (p.world == "Crowded Cavern") {
              playerCount++;
              ctx.font = "18px 'Exo 2'";
              if (p.dead == false) {
                ctx.fillStyle = "rgb(0, 0, 0)";
              } else {
                ctx.fillStyle = "rgb(255,0,0)";
              }
              ctx.fillText(p.name + " [" + p.area + "]", canvas.width - 110, 110 + (playerCount * 20) + (worldCount * 30));
            }
          }
        }
      }
      else if (player.world == "Methodical Monastery Hard") {
        methodicalmonasteryhard = true;
        for (let j in players) {
          if (players[j].id != selfId) {
            const p = players[j];

            if (p.world == "Methodical Monastery Hard") {
              playerCount++;
              if (p.dead == false) {
                ctx.fillStyle = "rgb(0, 0, 0)";
              } else {
                ctx.fillStyle = "rgb(255,0,0)";
              }
              ctx.font = "18px 'Exo 2'";
              ctx.fillText(p.name + " [" + p.area + "]", canvas.width - 110, 110 + (playerCount * 20) + (worldCount * 30));
            }
          }
        }
        ctx.font = "14px 'Exo 2'";
      }
      else if (player.world == "Methodical Monastery") {
        ctx.font = "18px 'Exo 2'";
        methodicalmonastery = true;
        for (let j in players) {
          if (players[j].id != selfId) {
            const p = players[j];

            if (p.world == "Methodical Monastery") {
              playerCount++;
              ctx.font = "18px 'Exo 2'";
              if (p.dead == false) {
                ctx.fillStyle = "rgb(0, 0, 0)";
              } else {
                ctx.fillStyle = "rgb(255,0,0)";
              }
              ctx.fillText(p.name + " [" + p.area + "]", canvas.width - 110, 110 + (playerCount * 20) + (worldCount * 30));
            }
          }
        }
      } else if (player.world == "Crazy Cosmos") {
        crazycosmos = true;
        for (let j in players) {
          if (players[j].id != selfId) {
            const p = players[j];

            if (p.world == "Crazy Cosmos") {
              playerCount++;
              ctx.font = "18px 'Exo 2'";
              if (p.dead == false) {
                ctx.fillStyle = "rgb(0, 0, 0)";
              } else {
                ctx.fillStyle = "rgb(255,0,0)";
              }
              ctx.fillText(p.name + " [" + p.area + "]", canvas.width - 110, 110 + (playerCount * 20) + (worldCount * 30));
            }
          }
        }
      } else if (player.world == "Crazy Cosmos Hard") {
        crazycosmoshard = true;
        for (let j in players) {
          if (players[j].id != selfId) {
            const p = players[j];

            if (p.world == "Crazy Cosmos Hard") {
              playerCount++;
              ctx.font = "18px 'Exo 2'";
              if (p.dead == false) {
                ctx.fillStyle = "rgb(0, 0, 0)";
              } else {
                ctx.fillStyle = "rgb(255,0,0)";
              }
              ctx.fillText(p.name + " [" + p.area + "]", canvas.width - 110, 110 + (playerCount * 20) + (worldCount * 30));
            }
          }
        }
      } else if (player.world == "Corrupted Core") {
        corruptedcore = true;
        for (let j in players) {
          if (players[j].id != selfId) {
            const p = players[j];

            if (p.world == "Corrupted Core") {
              playerCount++;
              ctx.font = "18px 'Exo 2'";
              if (p.dead == false) {
                ctx.fillStyle = "rgb(0, 0, 0)";
              } else {
                ctx.fillStyle = "rgb(255,0,0)";
              }
              ctx.fillText(p.name + " [" + p.area + "]", canvas.width - 110, 110 + (playerCount * 20) + (worldCount * 30));
            }
          }
        }
      }
      ctx.fillStyle = "rgb(0, 0, 0)";
      ctx.fillText("Leaderboard", canvas.width - 110, 40);
      ctx.fillText("___________", canvas.width - 110, 46);
      ctx.fillStyle = "white";
      ctx.fillText(player.world, canvas.width - 110, 80);
      ctx.fillText("_________", canvas.width - 110, 86);
      ctx.font = "18px 'Exo 2'";
      if (player.dead == false) {
        ctx.fillStyle = "rgb(0, 0, 0)";
      } else {
        ctx.fillStyle = "rgb(255,0,0)";
      }

      if (player.world != "Toilsome Traverse") {
        ctx.fillText(player.name + " [" + player.area + "]", canvas.width - 110, 110);
      } else if(player.world == "Toilsome Traverse") {
        let aName = toilsomeAreas[parseInt(player.area) - 1];
        ctx.fillText(player.name + " [" + aName + "]", canvas.width - 110, 110 + (playerCount * 20) + (worldCount * 30));
      }

      //Title
      ctx.textAlign = "center";
      ctx.lineWidth = 6;
      ctx.fillStyle = "#f4faff";
      ctx.strokeStyle = "#425a6d";
      ctx.font = "bold " + 35 + "px Tahoma, Verdana, Segoe, sans-serif";
      ctx.textAlign = "center";
      if (player.world != "Toilsome Traverse"  && player.world != "Acclimating Acceleration" && player.world != "Make Your Own Map") {
        if (player.area % 40 == 1 && player.area > 1) {
          ctx.strokeText(players[selfId].world + ': Area ' + player.area + " Victory!", canvas.width / 2, 40);
          ctx.fillText(players[selfId].world + ': Area ' + player.area + " Victory!", canvas.width / 2, 40);
        }
        else {
          if (player.area % 10 == 0) {
            ctx.strokeText(players[selfId].world + ': Area ' + player.area + " BOSS", canvas.width / 2, 40);
            ctx.fillText(players[selfId].world + ': Area ' + player.area + " BOSS", canvas.width / 2, 40);
          }
          else {
            ctx.strokeText(players[selfId].world + ': Area ' + player.area, canvas.width / 2, 40);
            ctx.fillText(players[selfId].world + ': Area ' + player.area, canvas.width / 2, 40);
          }
        }
      } else if(player.world == "Toilsome Traverse") {
        let aName = toilsomeAreas[parseInt(player.area) - 1];
        ctx.strokeText(players[selfId].world + ': ' + aName, canvas.width / 2, 40);
        ctx.fillText(players[selfId].world + ': ' + aName, canvas.width / 2, 40);
      } else if(player.world == "Make Your Own Map") {
        ctx.strokeText(players[selfId].world + ': Area ' + player.area /*+ ' (type /help for commands)'*/, canvas.width / 2, 40);
            ctx.fillText(players[selfId].world + ': Area ' + player.area /*+ ' (type /help for commands)'*/, canvas.width / 2, 40);
      } else {
        ctx.strokeText(players[selfId].world + ': Speed = ' + (1 + player.area/40), canvas.width / 2, 40);
        ctx.fillText(players[selfId].world + ': Speed = ' + (1 + player.area/40), canvas.width / 2, 40);
      }

      //Minimap (scale 9.149, 7.346)
      ctx.fillStyle = "rgba(100,100,100,0.1)";
      ctx.fillRect(15, canvas.height - 75, 300 * 1.37, 60);
      ctx.arc((player.renderX / 9.149) + 15, (player.renderY / 8.4) + canvas.height - 75, 4, 0, 6.28318531);
      if (player.dead == false) {
        ctx.fillStyle = player.color;
        ctx.fill();
      } else {
        ctx.fillStyle = "black";
        ctx.fill();

        ctx.font = "18px 'Exo 2'";
        ctx.textBaseline = "middle";
        ctx.fillText(player.dTimer, (player.renderX / 9.149) + 15, (player.renderY / 8.4) + canvas.height - 90);
        ctx.textBaseline = "bottom";
      }
      ctx.fill();
    }
  }

  for (let i in players) {
    if (players[i].id != selfId) {
      const player = players[i];
      if (player.area == area && player.world == world) {
        if (player.hero == "parvulus" && player.usingZ) {
          ctx.globalAlpha = 0.2;
          ctx.fillStyle = "#957da1"
          ctx.beginPath();
          ctx.arc(player.renderX + playerOffset.x, player.renderY + playerOffset.y, 300, 0, 6.28318531);
          ctx.fill();
          ctx.globalAlpha = 1;
        }
        if (player.hero == "parvulus" && player.retaliation) {
          ctx.globalAlpha = 0.2;
          ctx.fillStyle = "#632670"
          ctx.beginPath();
          ctx.arc(player.renderX + playerOffset.x, player.renderY + playerOffset.y, 100, 0, 6.28318531);
          ctx.fill();
          ctx.globalAlpha = 0.4;
        }
        ctx.beginPath();
        ctx.beginPath();
        if (player.invincible) {
          ctx.arc(player.renderX + playerOffset.x, player.renderY + playerOffset.y, player.radius, 0, 6.28318531);
          ctx.strokeStyle = "rgb(220,220,220)";
          ctx.lineWidth = 10;
          ctx.stroke();
          ctx.arc(player.renderX + playerOffset.x, player.renderY + playerOffset.y, player.radius, 0, 6.28318531);
          ctx.fillStyle = "black";
          ctx.lineWidth = 2;
          ctx.stroke();
        }
        if (player.clay > 0) {
          ctx.arc(player.renderX + playerOffset.x, player.renderY + playerOffset.y, player.radius + (2 * player.clay), 0, 6.28318531);
          ctx.strokeStyle = "#453926";
          ctx.lineWidth = 10;
          ctx.stroke();
          ctx.arc(player.renderX + playerOffset.x, player.renderY + playerOffset.y, player.radius + (2 * player.clay), 0, 6.28318531);
          ctx.fillStyle = "black";
          ctx.lineWidth = 2;
          ctx.stroke();
        }
        ctx.closePath();
        ctx.arc(player.renderX + playerOffset.x, player.renderY + playerOffset.y, player.radius, 0, 6.28318531);
        if (player.dead == false) {
          if (player.newtonian == false) {
            ctx.globalAlpha = 0.4;
          }
          ctx.fillStyle = player.color;
          ctx.fill();
        } else {
          ctx.fillStyle = player.color;
          ctx.globalAlpha = 0.3;
          ctx.fill();

          ctx.fillStyle = "black";
          ctx.globalAlpha = 1;
          ctx.font = "20px 'Exo 2'";
          ctx.textBaseline = "middle";
          ctx.fillText(player.dTimer, player.renderX + playerOffset.x, player.renderY + playerOffset.y);
          ctx.font = "18px 'Exo 2'";
          ctx.textBaseline = "middle";
          ctx.fillText(player.dTimer, (player.renderX / 9.149) + 15, (player.renderY / 8.4) + canvas.height - 90);
          ctx.textBaseline = "bottom";
        }
        ctx.closePath();
        ctx.beginPath();
        ctx.arc((player.renderX / 9.149) + 15, (player.renderY / 8.4) + canvas.height - 75, 4, 0, 6.28318531);
        ctx.fill();
        ctx.closePath();
        ctx.globalAlpha = 0.7;
        ctx.font = "18px 'Exo 2'";
        if (player.dead == false) {
          ctx.fillStyle = "rgb(0, 0, 0)";
        } else {
          ctx.fillStyle = "rgb(255,0,0)";
        }
        ctx.fillText(player.name, player.renderX + playerOffset.x, player.renderY - 35 + playerOffset.y);
        ctx.globalAlpha = 1;
        ctx.lineWidth = 1;
        ctx.strokeStyle = "darkblue";
        ctx.strokeRect(player.renderX + playerOffset.x - 22.5, player.renderY - 31 + playerOffset.y, 45, 10);
        ctx.fillStyle = "blue";
        ctx.fillRect(player.renderX + playerOffset.x - 22.5, player.renderY - 31 + playerOffset.y, Math.max(45 * player.energy / player.maxEnergy, 0), 10);
      }
      ctx.font = "18px 'Exo 2'";
    }
  }

  if (corruptedcore == false) {
    for (let j in players) {
      if (players[j].id != selfId) {
        const p = players[j];

        if (p.world == "Corrupted Core") {
          playerCount++;
          if (corruptedcore == false) {
            ctx.font = "22px 'Exo 2'";
            ctx.fillStyle = "white";
            ctx.fillText(p.world, canvas.width - 110, 110 + (playerCount * 20) + (worldCount * 30));
            ctx.fillText("_________", canvas.width - 110, 110 + (playerCount * 20) + 6 + (worldCount * 30));
            worldCount++;
            corruptedcore = true;
          }
          ctx.font = "18px 'Exo 2'";
          if (p.dead == false) {
            ctx.fillStyle = "rgb(0, 0, 0)";
          } else {
            ctx.fillStyle = "rgb(255,0,0)";
          }
          ctx.fillText(p.name + " [" + p.area + "]", canvas.width - 110, 110 + (playerCount * 20) + (worldCount * 30));
        }
      }
    }
  }
  if (methodicalmonastery == false) {
    for (let j in players) {
      if (players[j].id != selfId) {
        const p = players[j];

        if (p.world == "Methodical Monastery") {
          playerCount++;
          if (methodicalmonastery == false) {
            ctx.font = "18px 'Exo 2'";
            ctx.fillStyle = "white";
            ctx.fillText(p.world, canvas.width - 110, 110 + (playerCount * 20) + (worldCount * 30));
            ctx.fillText("_________", canvas.width - 110, 110 + (playerCount * 20) + 6 + (worldCount * 30));
            worldCount++;
            methodicalmonastery = true;
          }
          ctx.font = "18px 'Exo 2'";
          if (p.dead == false) {
            ctx.fillStyle = "rgb(0, 0, 0)";
          } else {
            ctx.fillStyle = "rgb(255,0,0)";
          }
          ctx.fillText(p.name + " [" + p.area + "]", canvas.width - 110, 110 + (playerCount * 20) + (worldCount * 30));
        }
      }
    }
  }
  if (crazycosmos == false) {
    for (let j in players) {
      if (players[j].id != selfId) {
        const p = players[j];

        if (p.world == "Crazy Cosmos") {
          playerCount++;
          if (crazycosmos == false) {
            ctx.font = "22px 'Exo 2'";
            ctx.fillStyle = "white";
            ctx.fillText(p.world, canvas.width - 110, 110 + (playerCount * 20) + (worldCount * 30));
            ctx.fillText("_________", canvas.width - 110, 110 + (playerCount * 20) + 6 + (worldCount * 30));
            worldCount++;
            crazycosmos = true;
          }
          ctx.font = "18px 'Exo 2'";
          if (p.dead == false) {
            ctx.fillStyle = "rgb(0, 0, 0)";
          } else {
            ctx.fillStyle = "rgb(255,0,0)";
          }
          ctx.fillText(p.name + " [" + p.area + "]", canvas.width - 110, 110 + (playerCount * 20) + (worldCount * 30));
        }
      }
    }
  }
  if (crazycosmoshard == false) {
    for (let j in players) {
      if (players[j].id != selfId) {
        const p = players[j];

        if (p.world == "Crazy Cosmos Hard") {
          playerCount++;
          if (crazycosmoshard == false) {
            ctx.font = "22px 'Exo 2'";
            ctx.fillStyle = "white";
            ctx.fillText(p.world, canvas.width - 110, 110 + (playerCount * 20) + (worldCount * 30));
            ctx.fillText("_________", canvas.width - 110, 110 + (playerCount * 20) + 6 + (worldCount * 30));
            worldCount++;
            crazycosmoshard = true;
          }
          ctx.font = "18px 'Exo 2'";
          if (p.dead == false) {
            ctx.fillStyle = "rgb(0, 0, 0)";
          } else {
            ctx.fillStyle = "rgb(255,0,0)";
          }
          ctx.fillText(p.name + " [" + p.area + "]", canvas.width - 110, 110 + (playerCount * 20) + (worldCount * 30));
        }
      }
    }
  }
  if (crowdedcavern == false) {
    for (let j in players) {
      if (players[j].id != selfId) {
        const p = players[j];

        if (p.world == "Crowded Cavern") {
          playerCount++;
          if (crowdedcavern == false) {
            ctx.font = "22px 'Exo 2'";
            ctx.fillStyle = "white";
            ctx.fillText(p.world, canvas.width - 110, 110 + (playerCount * 20) + (worldCount * 30));
            ctx.fillText("_________", canvas.width - 110, 110 + (playerCount * 20) + 6 + (worldCount * 30));
            worldCount++;
            crowdedcavern = true;
          }
          ctx.font = "18px 'Exo 2'";
          if (p.dead == false) {
            ctx.fillStyle = "rgb(0, 0, 0)";
          } else {
            ctx.fillStyle = "rgb(255,0,0)";
          }
          ctx.fillText(p.name + " [" + p.area + "]", canvas.width - 110, 110 + (playerCount * 20) + (worldCount * 30));
        }
      }
    }
  }
  if (methodicalmonasteryhard == false) {
    for (let j in players) {
      if (players[j].id != selfId) {
        const p = players[j];

        if (p.world == "Methodical Monastery Hard") {
          playerCount++;
          if (methodicalmonasteryhard == false) {
            ctx.font = "14px 'Exo 2'";
            ctx.fillStyle = "white";
            ctx.fillText(p.world, canvas.width - 110, 110 + (playerCount * 20) + (worldCount * 30));
            ctx.fillText("_________", canvas.width - 110, 110 + (playerCount * 20) + 6 + (worldCount * 30));
            worldCount++;
            methodicalmonasteryhard = true;
          }
          ctx.font = "18px 'Exo 2'";
          if (p.dead == false) {
            ctx.fillStyle = "rgb(0, 0, 0)";
          } else {
            ctx.fillStyle = "rgb(255,0,0)";
          }
          ctx.fillText(p.name + " [" + p.area + "]", canvas.width - 110, 110 + (playerCount * 20) + (worldCount * 30));
        }
      }
    }
  }
  if (strangespace == false) {
    for (let j in players) {
      if (players[j].id != selfId) {
        const p = players[j];

        if (p.world == "Strange Space") {
          playerCount++;
          if (strangespace == false) {
            ctx.font = "22px 'Exo 2'";
            ctx.fillStyle = "white";
            ctx.fillText(p.world, canvas.width - 110, 110 + (playerCount * 20) + (worldCount * 30));
            ctx.fillText("_________", canvas.width - 110, 110 + (playerCount * 20) + 6 + (worldCount * 30));
            worldCount++;
            strangespace = true;
          }
          ctx.font = "18px 'Exo 2'";
          if (p.dead == false) {
            ctx.fillStyle = "rgb(0, 0, 0)";
          } else {
            ctx.fillStyle = "rgb(255,0,0)";
          }
          ctx.fillText(p.name + " [" + p.area + "]", canvas.width - 110, 110 + (playerCount * 20) + (worldCount * 30));
        }
      }
    }
  }
  if (tirelesstrek == false) {
    for (let j in players) {
      if (players[j].id != selfId) {
        const p = players[j];

        if (p.world == "Tireless Trek") {
          playerCount++;
          if (tirelesstrek == false) {
            ctx.font = "22px 'Exo 2'";
            ctx.fillStyle = "white";
            ctx.fillText(p.world, canvas.width - 110, 110 + (playerCount * 20) + (worldCount * 30));
            ctx.fillText("_________", canvas.width - 110, 110 + (playerCount * 20) + 6 + (worldCount * 30));
            worldCount++;
            tirelesstrek = true;
          }
          ctx.font = "18px 'Exo 2'";
          if (p.dead == false) {
            ctx.fillStyle = "rgb(0, 0, 0)";
          } else {
            ctx.fillStyle = "rgb(255,0,0)";
          }
          ctx.fillText(p.name + " [" + p.area + "]", canvas.width - 110, 110 + (playerCount * 20) + (worldCount * 30));
        }
      }
    }
  }
  if (acclimatingacceleration == false) {
    for (let j in players) {
      if (players[j].id != selfId) {
        const p = players[j];

        if (p.world == "Acclimating Acceleration") {
          playerCount++;
          if (acclimatingacceleration == false) {
            ctx.font = "22px 'Exo 2'";
            ctx.fillStyle = "white";
            ctx.fillText(p.world, canvas.width - 110, 110 + (playerCount * 20) + (worldCount * 30));
            ctx.fillText("_________", canvas.width - 110, 110 + (playerCount * 20) + 6 + (worldCount * 30));
            worldCount++;
            acclimatingacceleration = true;
          }
          ctx.font = "18px 'Exo 2'";
          if (p.dead == false) {
            ctx.fillStyle = "rgb(0, 0, 0)";
          } else {
            ctx.fillStyle = "rgb(255,0,0)";
          }
          ctx.fillText(p.name + " [" + p.area + "]", canvas.width - 110, 110 + (playerCount * 20) + (worldCount * 30));
        }
      }
    }
  }
  if (makeyourownmap == false) {
    for (let j in players) {
      if (players[j].id != selfId) {
        const p = players[j];

        if (p.world == "Make Your Own Map") {
          playerCount++;
          if (makeyourownmap == false) {
            ctx.font = "22px 'Exo 2'";
            ctx.fillStyle = "white";
            ctx.fillText(p.world, canvas.width - 110, 110 + (playerCount * 20) + (worldCount * 30));
            ctx.fillText("_________", canvas.width - 110, 110 + (playerCount * 20) + 6 + (worldCount * 30));
            worldCount++;
            makeyourownmap = true;
          }
          ctx.font = "18px 'Exo 2'";
          if (p.dead == false) {
            ctx.fillStyle = "rgb(0, 0, 0)";
          } else {
            ctx.fillStyle = "rgb(255,0,0)";
          }
          ctx.fillText(p.name + " [" + p.area + "]", canvas.width - 110, 110 + (playerCount * 20) + (worldCount * 30));
        }
      }
    }
  }
  if (jarringjourney == false) {
    for (let j in players) {
      if (players[j].id != selfId) {
        const p = players[j];

        if (p.world == "Jarring Journey") {
          playerCount++;
          if (jarringjourney == false) {
            ctx.font = "22px 'Exo 2'";
            ctx.fillStyle = "white";
            ctx.fillText(p.world, canvas.width - 110, 110 + (playerCount * 20) + (worldCount * 30));
            ctx.fillText("_________", canvas.width - 110, 110 + (playerCount * 20) + 6 + (worldCount * 30));
            worldCount++;
            jarringjourney = true;
          }
          ctx.font = "18px 'Exo 2'";
          if (p.dead == false) {
            ctx.fillStyle = "rgb(0, 0, 0)";
          } else {
            ctx.fillStyle = "rgb(255,0,0)";
          }
          ctx.fillText(p.name + " [" + p.area + "]", canvas.width - 110, 110 + (playerCount * 20) + (worldCount * 30));
        }
      }
    }
  }
  if (monumentalmigration == false) {
    for (let j in players) {
      if (players[j].id != selfId) {
        const p = players[j];

        if (p.world == "Monumental Migration") {
          playerCount++;
          if (monumentalmigration == false) {
            ctx.font = "18px 'Exo 2'";
            ctx.fillStyle = "white";
            ctx.fillText(p.world, canvas.width - 110, 110 + (playerCount * 20) + (worldCount * 30));
            ctx.fillText("_________", canvas.width - 110, 110 + (playerCount * 20) + 6 + (worldCount * 30));
            worldCount++;
            monumentalmigration = true;
          }
          ctx.font = "18px 'Exo 2'";
          if (p.dead == false) {
            ctx.fillStyle = "rgb(0, 0, 0)";
          } else {
            ctx.fillStyle = "rgb(255,0,0)";
          }
          ctx.fillText(p.name + " [" + p.area + "]", canvas.width - 110, 110 + (playerCount * 20) + (worldCount * 30));
        }
      }
    }
  }

  if (monumentalmigrationplus == false) {
    for (let j in players) {
      if (players[j].id != selfId) {
        const p = players[j];

        if (p.world == "Monumental Migration+") {
          playerCount++;
          if (monumentalmigrationplus == false) {
            ctx.font = "18px 'Exo 2'";
            ctx.fillStyle = "white";
            ctx.fillText(p.world, canvas.width - 110, 110 + (playerCount * 20) + (worldCount * 30));
            ctx.fillText("_________", canvas.width - 110, 110 + (playerCount * 20) + 6 + (worldCount * 30));
            worldCount++;
            monumentalmigrationplus = true;
          }
          ctx.font = "18px 'Exo 2'";
          if (p.dead == false) {
            ctx.fillStyle = "rgb(0, 0, 0)";
          } else {
            ctx.fillStyle = "rgb(255,0,0)";
          }
          ctx.fillText(p.name + " [" + p.area + "]", canvas.width - 110, 110 + (playerCount * 20) + (worldCount * 30));
        }
      }
    }
  }

  if (toilsometraverse == false) {
    for (let j in players) {
      if (players[j].id != selfId) {
        const p = players[j];

        if (p.world == "Toilsome Traverse") {
          playerCount++;
          if (toilsometraverse == false) {
            ctx.font = "18px 'Exo 2'";
            ctx.fillStyle = "white";
            ctx.fillText(p.world, canvas.width - 110, 110 + (playerCount * 20) + (worldCount * 30));
            ctx.fillText("_________", canvas.width - 110, 110 + (playerCount * 20) + 6 + (worldCount * 30));
            worldCount++;
            toilsometraverse = true;
          }
          ctx.font = "18px 'Exo 2'";
          if (p.dead == false) {
            ctx.fillStyle = "rgb(0, 0, 0)";
          } else {
            ctx.fillStyle = "rgb(255,0,0)";
          }

          let aName = toilsomeAreas[parseInt(p.area) - 1];
          ctx.fillText(p.name + " [" + aName + "]", canvas.width - 110, 110 + (playerCount * 20) + (worldCount * 30));
        }
      }
    }
  }


  if (becomesus == false) {
    for (let j in players) {
      if (players[j].id != selfId) {
        const p = players[j];

        if (p.world == "become sus") {
          playerCount++;
          if (becomesus == false) {
            ctx.font = "18px 'Exo 2'";
            ctx.fillStyle = "white";
            ctx.fillText(p.world, canvas.width - 110, 110 + (playerCount * 20) + (worldCount * 30));
            ctx.fillText("_________", canvas.width - 110, 110 + (playerCount * 20) + 6 + (worldCount * 30));
            worldCount++;
            becomesus = true;
          }
          ctx.font = "18px 'Exo 2'";
          if (p.dead == false) {
            ctx.fillStyle = "rgb(0, 0, 0)";
          } else {
            ctx.fillStyle = "rgb(255,0,0)";
          }
          ctx.fillText(p.name + " [" + p.area + "]", canvas.width - 110, 110 + (playerCount * 20) + (worldCount * 30));
        }
      }
    }
  }

  if (atrociousarena == false) {
    for (let j in players) {
      if (players[j].id != selfId) {
        const p = players[j];

        if (p.world == "Atrocious Arena") {
          playerCount++;
          if (atrociousarena == false) {
            ctx.font = "18px 'Exo 2'";
            ctx.fillStyle = "white";
            ctx.fillText(p.world, canvas.width - 110, 110 + (playerCount * 20) + (worldCount * 30));
            ctx.fillText("_________", canvas.width - 110, 110 + (playerCount * 20) + 6 + (worldCount * 30));
            worldCount++;
            atrociousarena = true;
          }
          ctx.font = "18px 'Exo 2'";
          if (p.dead == false) {
            ctx.fillStyle = "rgb(0, 0, 0)";
          } else {
            ctx.fillStyle = "rgb(255,0,0)";
          }
          ctx.fillText(p.name + " [" + p.area + "]", canvas.width - 110, 110 + (playerCount * 20) + (worldCount * 30));
        }
      }
    }
  }

  if (arduousabyss == false) {
    for (let j in players) {
      if (players[j].id != selfId) {
        const p = players[j];

        if (p.world == "Arduous Abyss") {
          playerCount++;
          if (arduousabyss == false) {
            ctx.font = "18px 'Exo 2'";
            ctx.fillStyle = "white";
            ctx.fillText(p.world, canvas.width - 110, 110 + (playerCount * 20) + (worldCount * 30));
            ctx.fillText("_________", canvas.width - 110, 110 + (playerCount * 20) + 6 + (worldCount * 30));
            worldCount++;
            arduousabyss = true;
          }
          ctx.font = "18px 'Exo 2'";
          if (p.dead == false) {
            ctx.fillStyle = "rgb(0, 0, 0)";
          } else {
            ctx.fillStyle = "rgb(255,0,0)";
          }
          ctx.fillText(p.name + " [" + p.area + "]", canvas.width - 110, 110 + (playerCount * 20) + (worldCount * 30));
        }
      }
    }
  }

  for (let i in enemies) {
    enemies[i].interp(delt);
    if (enemies[i].type != "amogus") {
      if (enemies[i].dead) {
        ctx.globalAlpha = 0.2;
      }
      if (enemies[i].shattered <= 0) {
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(enemies[i].renderX + playerOffset.x, enemies[i].renderY + playerOffset.y, enemies[i].radius, 0, 6.28318531);
        ctx.strokeStyle = "rgb(0, 0, 0)";
        ctx.stroke();
        ctx.closePath();
      }
      if (enemies[i].type == "normal") {
        ctx.fillStyle = "rgba(120,120,120,1)";
      } else if (enemies[i].type == "switch") {
        ctx.fillStyle = "#565656";
      } else if (enemies[i].type == "disabled") {
        ctx.fillStyle = "#5f3975";
      } else if (enemies[i].type == "wall") {
        ctx.fillStyle = "black";
      } else if (enemies[i].type == "sizing") {
        ctx.fillStyle = "#f27743";
      } else if (enemies[i].type == "wavy") {
        ctx.fillStyle = "#dd2606";
      } else if (enemies[i].type == "zigzag") {
        ctx.fillStyle = "#b371f2";
      } else if (enemies[i].type == "turning") {
        ctx.fillStyle = "#336600";
      } else if (enemies[i].type == "sniper") {
        ctx.fillStyle = "#a05353";
      } else if (enemies[i].type == "octo") {
        ctx.fillStyle = "#d3134f";
      } else if (enemies[i].type == "icicle") {
        ctx.fillStyle = "#adf8ff";
      } else if (enemies[i].type == "ice sniper") {
        ctx.fillStyle = "#8300ff";
      } else if (enemies[i].type == "tired") {
        ctx.fillStyle = "rgb(90,90,90)";
      } else if (enemies[i].type == "zigzag") {
        ctx.fillStyle = "#b371f2";
      } else if (enemies[i].type == "pull") {
        ctx.fillStyle = "#78148c";
      } else if (enemies[i].type == "push") {
        ctx.fillStyle = "#7b9db2";
      } else if (enemies[i].type == "nebula") {
        ctx.fillStyle = "#31013b";
      } else if (enemies[i].type == "blackhole") {
        ctx.fillStyle = "#25052b";
      } else if (enemies[i].type == "zoning") {
        ctx.fillStyle = "#a03811";
      } else if (enemies[i].type == "speed sniper") {
        ctx.fillStyle = "#ff9000";
      } else if (enemies[i].type == "regen sniper") {
        ctx.fillStyle = "#00cc8e";
      } else if (enemies[i].type == "immunedisabler" || enemies[i].type == "immune" || enemies[i].type == "immunepush" || enemies[i].type == "immunepull" || enemies[i].type == "immunefreezing") {
        ctx.fillStyle = "black";
      } else if (enemies[i].type == "dasher") {
        ctx.fillStyle = "#003c66";
      } else if (enemies[i].type == 'lag') {
        ctx.fillStyle = "rgba(120,120,120,1)";//ctx.fillStyle = "rgb(10,50,180)";
      } else if (enemies[i].type == "warp") {
        ctx.fillStyle = "rgba(139, 129, 161, 1)"
      } else if (enemies[i].type == 'cancer') {
        ctx.fillStyle = "purple";
      } else if (enemies[i].type == "homing") {
        ctx.fillStyle = "rgb(160, 120, 10)";
      } else if (enemies[i].type == "tp") {
        ctx.fillStyle = "rgb(160,160,220)";
      } else if (enemies[i].type == "snake") {
        ctx.fillStyle = "#3ab077";
      } else if (enemies[i].type == "evilsnake") {
        ctx.fillStyle = "#155948";
      } else if (enemies[i].type == "scared") {
        ctx.fillStyle = "#042c54";
      } else if (enemies[i].type == "glitch") {
        ctx.fillStyle = "#7691b0";
      } else if (enemies[i].type == "trap") {
        ctx.fillStyle = "rgb(80, 150, 110)";
      } else if (enemies[i].type == "aaaa") {
        ctx.fillStyle = "hsl(" + (Date.now()) + ", 50%, 50%)";
      } else if (enemies[i].type == "path") {
        ctx.fillStyle = "hsl(" + (Date.now()) + ", 50%, 50%)";
      } else if (enemies[i].type == "diagonal") {
        ctx.fillStyle = "rgb(160, 210, 190)";
      } else if (enemies[i].type == "wallsprayer") {
        ctx.fillStyle = "yellow";
      } else if (enemies[i].type == "liquid") {
        ctx.fillStyle = "#6789ef";
      } else if (enemies[i].type == "frog") {
        ctx.fillStyle = "#541087";
      } else if (enemies[i].type == "evilfrog") {
        ctx.fillStyle = "#1d0540";
      } else if (enemies[i].type == "yeet") {
        ctx.fillStyle = "rgb(" + ((Math.cos(Date.now / 100) * 127) + 127) + ", 120,120)";
      } else if (enemies[i].type == "sideways") {
        ctx.fillStyle = "rgb(100, 150, 100)";
      } else if (enemies[i].type == "transangle") {
        ctx.fillStyle = "rgb(250, 230, 70)";
      } else if (enemies[i].type == "wipeu") {
        ctx.fillStyle = "cyan";
      } else if (enemies[i].type == "wipeu2") {
        ctx.fillStyle = "lightblue";
      } else if (enemies[i].type == "sweepu") {
        ctx.fillStyle = "chocolate";
      } else if (enemies[i].type == "nut") {
        ctx.fillStyle = "brown";
      } else if (enemies[i].type == "blind") {
        ctx.fillStyle = "darkslategray";
      } else if (enemies[i].type == "tornado") {
        ctx.fillStyle = "rgb(200,200,200)";
      } else if (enemies[i].type == "slower") {
        ctx.fillStyle = "rgb(200,0,0)";
      } else if (enemies[i].type == "slippery") {
        ctx.fillStyle = "#1aacbf";
      } else if (enemies[i].type == "tpstart") {
        ctx.fillStyle = "#4d1c4b";
      } else if (enemies[i].type == "playershield") {
        ctx.fillStyle = "#43e6d2";
      } else if (enemies[i].type == "playershield") {
        ctx.fillStyle = "#43e6d2";
      } else if (enemies[i].type == "spinner") {
        ctx.fillStyle = "#e3fc03";
      } else if (enemies[i].type == "sneaky") {
        ctx.fillStyle = "#574d45";
      } else if (enemies[i].type == "draining") {
        ctx.fillStyle = "#0000ff";
      } else if (enemies[i].type == "megaDraining") {
        ctx.fillStyle = "#502c8a";
      } else if (enemies[i].type == "megafreezing") {
        ctx.fillStyle = "rgb(184, 2, 78)";
      } else if (enemies[i].type == "soldier") {
        ctx.fillStyle = "#857d66";
      } else if (enemies[i].type == "creeper") {
        ctx.fillStyle = "#874617";
      } else if (enemies[i].type == "mine") {
        ctx.fillStyle = "#b3b83d";
      } else if (enemies[i].type == "jumper") {
        ctx.fillStyle = "#734947";
      } else if (enemies[i].type == "eviljumper") {
        ctx.fillStyle = "#572c2a";
      } else if (enemies[i].type == "disabler") {
        ctx.fillStyle = "#946a8b";
      } else if (enemies[i].type == "freezing") {
        ctx.fillStyle = "#64c1b9";
      } else if (enemies[i].type == "subzero") {
        ctx.fillStyle = "#62aeb8";
      } else if (enemies[i].type == "invert") {
        ctx.fillStyle = "#615e7a";
      } else if (enemies[i].type == "spiral") {
        ctx.fillStyle = "#d1c732";
      } else if (enemies[i].type == "sidestep") {
        ctx.fillStyle = "#7297b8";
      } else if (enemies[i].type == "ultraspiral") {
        ctx.fillStyle = "#90c932";
      } else if (enemies[i].type == "oscillating") {
        ctx.fillStyle = "#869e0f";
      } else if (enemies[i].type == "retracing") {
        ctx.fillStyle = "#0f9e6a";
      } else if (enemies[i].type == "rain") {
        ctx.fillStyle = "#93c1f5";
      }
      else {
        ctx.fillStyle = "hsl(" + Date.now() + ", 50%, 50%)";
        //console.log(enemies[i].type);
      }
      if (enemies[i].shattered <= 0) {
        ctx.beginPath();
        ctx.arc(enemies[i].renderX + playerOffset.x, enemies[i].renderY + playerOffset.y, enemies[i].radius, 0, 6.28318531);
        ctx.fill();
      }
      else {
        let time = enemies[i].shattered;
        ctx.translate(enemies[i].renderX + playerOffset.x, enemies[i].renderY + playerOffset.y);
        ctx.rotate(Math.pow(time, 3) / (1600000 * 4000));
        for (let p = 4; p--; p > 0) {
          ctx.rotate(Math.PI / 2);
          ctx.beginPath()
          ctx.arc(time / 4000 * enemies[i].radius + enemies[i].radius / 4, 0, enemies[i].radius / 3, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.rotate(-Math.pow(time, 3) / (1600000 * 4000))
        ctx.translate(-(enemies[i].renderX + playerOffset.x), -(enemies[i].renderY + playerOffset.y));
      }
      if (enemies[i].aura > 0 && enemies[i].disabled == false) {
        if (enemies[i].type == "immunedisabler") {
          ctx.fillStyle = "#946a8b";
        }
        ctx.arc(enemies[i].renderX + playerOffset.x, enemies[i].renderY + playerOffset.y, enemies[i].aura, 0, 6.28318531);
        ctx.globalAlpha = 0.18;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
      ctx.closePath();
      ctx.globalAlpha = 1;
    }
    else {
      ctx.drawImage(amogusImage, enemies[i].renderX + playerOffset.x - enemies[i].radius, enemies[i].renderY + playerOffset.y - enemies[i].radius, enemies[i].radius * 2, enemies[i].radius * 2)
    }

    if (enemies[i].disabled) {
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(enemies[i].renderX + playerOffset.x, enemies[i].renderY + playerOffset.y, enemies[i].radius, 0, 6.28318531);
      ctx.strokeStyle = "#5e2894";
      ctx.stroke();

    }
    if (enemies[i].decay > 0 && enemies[i].shattered <= 0) {
      ctx.globalAlpha = Math.min(0.2 * enemies[i].decay, 0.6);
      ctx.beginPath();
      ctx.arc(enemies[i].renderX + playerOffset.x, enemies[i].renderY + playerOffset.y, enemies[i].radius, 0, 6.28318531);
      ctx.fillStyle = "#00e5ff";
      ctx.fill();
      ctx.globalAlpha = 1;
    }
    if (enemies[i].ignited == true && enemies[i].shattered <= 0) {
      ctx.globalAlpha = 0.7;
      ctx.beginPath();
      ctx.arc(enemies[i].renderX + playerOffset.x, enemies[i].renderY + playerOffset.y, enemies[i].radius, 0, 6.28318531);
      ctx.fillStyle = "#d15c21";
      ctx.fill();
      ctx.globalAlpha = 1;
    }

  }

  for (let i in projectiles) {
    if (projectiles[i].killed == false) {
      projectiles[i].interp(delt);
      if (projectiles[i].type == "kindleBomb" || projectiles[i].type == "portalBomb") {
        let alpha = 1 / projectiles[i].radius * 100;
        if (alpha > 1) {
          alpha = 1;
        }
        ctx.globalAlpha = alpha;
      }
      if (projectiles[i].type == "web") {
        ctx.globalAlpha = 0.25;
      }

      if (projectiles[i].type == "portal") {
        ctx.beginPath();
        ctx.arc(projectiles[i].renderX + playerOffset.x, projectiles[i].renderY + playerOffset.y, projectiles[i].radius, 0, 6.28318531);
        ctx.fillStyle = "#5da18c";
        ctx.globalAlpha = 0.3;
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.globalAlpha = 0.3;
        ctx.arc(projectiles[i].renderX + playerOffset.x, projectiles[i].renderY + playerOffset.y, projectiles[i].radius / 1.5, 0, 6.28318531);
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.globalAlpha = 0.3;
        ctx.arc(projectiles[i].renderX + playerOffset.x, projectiles[i].renderY + playerOffset.y, projectiles[i].radius / 3, 0, 6.28318531);
        ctx.fill();
        ctx.closePath();
      } else if (projectiles[i].type == "turr") {
        ctx.beginPath();
        ctx.fillStyle = "#333333";
        ctx.arc(projectiles[i].renderX + playerOffset.x, projectiles[i].renderY + playerOffset.y, projectiles[i].radius, 0, 6.28318531);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = "#bd8b0d";
        ctx.arc(projectiles[i].renderX + playerOffset.x, projectiles[i].renderY + playerOffset.y, projectiles[i].radius / 1.7, 0, 6.28318531);
        ctx.fill();
        ctx.translate(projectiles[i].renderX + playerOffset.x, projectiles[i].renderY + playerOffset.y);
        ctx.rotate(projectiles[i].angle);
        ctx.fillRect(0, -projectiles[i].radius / 2.4, projectiles[i].radius / 1.2, projectiles[i].radius / 1.25);
        if (projectiles[i].emergency == true) {
          ctx.fillStyle = "#bd8b0d"
          ctx.rotate(0.15);
          ctx.fillRect(0, -projectiles[i].radius / 2.4, projectiles[i].radius / 1.2, projectiles[i].radius / 1.25);
          ctx.rotate(-0.3);
          ctx.fillRect(0, -projectiles[i].radius / 2.4, projectiles[i].radius / 1.2, projectiles[i].radius / 1.25);
          ctx.rotate(0.15);
          ctx.fillRect(0, -projectiles[i].radius / 2.4, projectiles[i].radius * 1.2, projectiles[i].radius / 1.25);
          ctx.beginPath();
          ctx.fillStyle = "#a83232";
          ctx.arc(0, 0, projectiles[i].radius / 2.3, 0, 6.28318531);
          ctx.fill();
        }
        ctx.rotate(-projectiles[i].angle);
        ctx.translate(-(projectiles[i].renderX + playerOffset.x), -(projectiles[i].renderY + playerOffset.y));

      } else {
        ctx.beginPath();
        ctx.arc(projectiles[i].renderX + playerOffset.x, projectiles[i].renderY + playerOffset.y, projectiles[i].radius, 0, 6.28318531);

        if (projectiles[i].type == "clay") {
          ctx.fillStyle = "#8f754d";
        }
        else if (projectiles[i].type == "guard") {
          ctx.fillStyle = "#5c5061";
        }
        else if (projectiles[i].type == "turrBullet") {
          ctx.fillStyle = "#bd8b0d";
        }
        else if (projectiles[i].type == "kindleBomb") {
          ctx.fillStyle = "#ed6f3e";
        }
        else if (projectiles[i].type == "web") {
          ctx.fillStyle = "#333333";
        }
        else if (projectiles[i].type == "portalBomb") {
          ctx.fillStyle = "#8ad1bb"
        }
        else if (projectiles[i].type == "sniperBullet") {
          ctx.fillStyle = "#a05353";
        }
        else if (projectiles[i].type == "octoBullet") {
          ctx.fillStyle = "#d3134f";
        }
        else if (projectiles[i].type == "iceSniperBullet") {
          ctx.fillStyle = "#8300ff";
        }
        else if (projectiles[i].type == "speedSniperBullet") {
          ctx.fillStyle = "#ff9000";
        }
        else if (projectiles[i].type == "regenSniperBullet") {
          ctx.fillStyle = "#00cc8e";
        }
        else {
          ctx.fillStyle = "hsl(" + Date.now() + ", 50%, 50%)";
          //console.log(projectiles[i].type);
        }
        ctx.fill();
        ctx.closePath();
      }
      ctx.globalAlpha = 1;
    } else {
      delete projectiles[projectiles[i].id]
    }
  }

  if (state == "lose") {
    ctx.fillStyle = "#333333";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = "50px 'Exo 2'";
    ctx.fillStyle = "white";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillText("You Died", canvas.width / 2, canvas.height / 2 - 100);
    ctx.font = "40px 'Exo 2'";
    ctx.fillText("World: " + world, canvas.width / 2, canvas.height / 2);
    ctx.fillText("Area: " + area, canvas.width / 2, canvas.height / 2 + 50);
    chatInput.style.display = "none";
    chatArea.style.display = "none";
    chatUI.style.display = "none";
  } else if (state == "win") {
    ctx.fillStyle = "#333333";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = "50px 'Exo 2'";
    ctx.fillStyle = "white";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillText("Victory!", canvas.width / 2, canvas.height / 2 - 100);
    ctx.font = "40px 'Exo 2'";
    ctx.fillText("World: " + world, canvas.width / 2, canvas.height / 2);
    ctx.fillText("Area: " + area, canvas.width / 2, canvas.height / 2 + 50);
    chatInput.style.display = "none";
    chatArea.style.display = "none";
    chatUI.style.display = "none";
  } else {
    requestAnimationFrame(renderGame);
  }

  ctx.font = "20px 'Exo 2'";
  ctx.fillStyle = "black";
  ctx.fillText(kbps + " kbps", canvas.width - 100, canvas.height - 180);
}

joinButton.onclick = () => {
  menu.style.display = "none";
  join.style.display = "";
  game.style.display = "none";
}

function init(hero) {
  if (document.getElementById("username").value.length == 0) {
    name = "Guest" + String(Math.floor(Math.random() * 10)) + String(Math.floor(Math.random() * 10)) + String(Math.floor(Math.random() * 10));
  } else {
    name = document.getElementById("username").value;
  }

  menu.style.display = "none";
  join.style.display = "none";
  game.style.display = "";
  inGame = true;
  ws.send(msgpack.encode({ begin: name, hero: hero }))
  mouseToggleC = 0;
  localStorage.setItem("name", name);
  state = "game";
}

serverList.innerHTML = "";

const magDiv = document.createElement("div");
// create new div for description

magDiv.hero = "magmax";
magDiv.classList.add('heroBox');
magDiv.innerText = `Magmax
Flow: Increases speed by 7.5, uses 2 energy/s
Harden: gives invulnurability but stops movement, uses 12 energy/s`;
magDiv.classList.add('magmaxDiv');
magDiv.onclick = () => {
  init("magmax");
}

serverList.appendChild(magDiv);


const ramDiv = document.createElement("div");
ramDiv.hero = "ram";
ramDiv.classList.add('heroBox');
ramDiv.innerText = `Rameses
  Bandage: Wraps bandages arounds self over 8 seconds moving 50% slower. If hit, bandage falls off over 1 second keeping you safe. Costs 50 energy.`;
ramDiv.classList.add('ramesesDiv');
ramDiv.onclick = () => {
  init("rameses");
}

serverList.appendChild(ramDiv);


const parvDiv = document.createElement("div");
parvDiv.hero = "parv";
parvDiv.classList.add('heroBox');
parvDiv.innerText = `Parvulus
Passively becomes smaller over time.
Dwindle: Becomes 20% bigger (with maximum of normal size) while making enemies slower and smaller. The strength depends on your size. Costs 10 energy.
Retaliation: Become invincible for 2s, turning all enemies within a 100px radius of you into normal enemies for 6s. Movement is halved while in use. Can only be used at minimum size. You are returned to normal size upon use. Costs 25 energy.`;
parvDiv.classList.add('parvDiv');
parvDiv.onclick = () => {
  init("parvulus");
}

serverList.appendChild(parvDiv);

const ptahDiv = document.createElement("div");
ptahDiv.hero = "ptah";
ptahDiv.classList.add('heroBox');
ptahDiv.innerText = `Ptah
Ceramic (Passive): Slowly grows layers of ceramic. Ceramics increase your size and slow you down. If hit loses a layer for 0.2s. Maximum of 4 layers.
Shed: You need 2 layers to use this. Removes a layer of ceramic and throws it in your direction. Upon contact with player, gives them a ceramic. Upon contact with enemy, enemy is freezed and your ceramic growth is sped up. Costs 25 energy.`;
ptahDiv.classList.add('ptahDiv');
ptahDiv.onclick = () => {
  init("ptah");
}

serverList.appendChild(ptahDiv);

const cimexDiv = document.createElement("div");
cimexDiv.hero = "cimex";
cimexDiv.classList.add(`heroBox`);
cimexDiv.innerText = `Cimex
Lacework: Creates a web which slowly expands. The web slows enemies down by 70%. While you have a web active, you move 20% slower. If you use this ability while you have a web, change areas, or die, your web is instantaneously destroyed. Costs 10 energy to create and 10 energy/s to maintain.
Devour: Kills all enemies in your existing web. Your web is destroyed in the process. Costs 0 energy.`;
cimexDiv.classList.add('cimexDiv');
cimexDiv.onclick = () => {
  init('cimex');
}

serverList.appendChild(cimexDiv);

const kindleDiv = document.createElement("div");
kindleDiv.hero = "kindle";
kindleDiv.classList.add(`heroBox`);
kindleDiv.innerText = `Kindle
Implode: Shoots a bomb that explodes upon contact with enemy, killing all enemies nearby for 3s and disabling for 7s. 9s cooldown. Costs 20 energy.
Ignite: Ignites enemies within a small range of yourself. These enemies can ignite more enemies. After being ignited for 1s, the enemy dies for 2s and is returned to normal. 8s cooldown. Costs 15 energy.`;
kindleDiv.classList.add('kindleDiv');
kindleDiv.onclick = () => {
  init('kindle');
}

serverList.appendChild(kindleDiv);


const neuidDiv = document.createElement("div");
neuidDiv.hero = "neuid";
neuidDiv.classList.add(`heroBox`);
neuidDiv.innerText = `Neuid
Fluidize: Becoming a nonnewtonian fluid for 3s and become immune to enemies slower than 6 speed Cooldown 8s. Costs 10 energy.
Permastate: Become a nonnewtonian fluid forever, at the cost of being unable to interact with other players and projectiles, such as reviving. This can be toggled on and off, Cooldown 20s. Costs 0 energy.`;
neuidDiv.classList.add('neuidDiv');
neuidDiv.onclick = () => {
  init('neuid');
}

serverList.appendChild(neuidDiv);

const orbitalDiv = document.createElement("div");
orbitalDiv.hero = "orbital";
orbitalDiv.classList.add(`heroBox`);
orbitalDiv.innerText = `Orbital 
Guardian: Creates 5 guards which orbit around you and destroy any enemy it touches for 1.5s. It can kill 24 enemies each before dying. Cooldown 30s. Costs 20 energy.
Emergency: Guards become closer to you and orbit much faster for 1.5 seconds. Cooldown 3s. Costs 5 energy.`;
orbitalDiv.classList.add('orbitalDiv');
orbitalDiv.onclick = () => {
  init('orbital');
}

serverList.appendChild(orbitalDiv);

const jotDiv = document.createElement("div");
jotDiv.hero = "jotunn";
jotDiv.classList.add(`heroBox`);
jotDiv.innerText = `Jotunn
Decay (passive): All enemies within a 170px radius are slowed by 40%. This effect stacks with other Jotunns.
Shatter: All decayed enemies shatter, becoming harmless to players for 4 seconds. 6 second cooldown. Costs 30 energy.`;
jotDiv.classList.add('jotunnDiv');
jotDiv.onclick = () => {
  init('jotunn');
}

serverList.appendChild(jotDiv);

const janusDiv = document.createElement("div");
janusDiv.hero = "janus";
janusDiv.classList.add(`heroBox`);
janusDiv.innerText = `Janus
Portal: creates a portal that players but not enemies can cross through. Costs 30 energy
Malfunction: causes the portals to explode, killing nearby enemes. Costs 20 energy.
`;
janusDiv.classList.add('janusDiv');
janusDiv.onclick = () => {
  init('janus');
}
serverList.appendChild(janusDiv);


const turrDiv = document.createElement("div");
turrDiv.hero = "turr";
turrDiv.classList.add(`heroBox`);
turrDiv.innerText = `Turr
Build: Creates a turret which shoots at the nearest alive enemy. The enemy is killed and disabled for 3 seconds upon hit. Costs 15 energy.
Crisis: Turrets have a much faster reload and become triple shots for 1 second before dying. Costs 40 energy.
`;
turrDiv.classList.add('turrDiv');
turrDiv.onclick = () => {
  init('turr');
}
serverList.appendChild(turrDiv);

const gunslingerDiv = document.createElement("div");
gunslingerDiv.hero = "Gunslinger";
gunslingerDiv.classList.add(`heroBox`);
gunslingerDiv.innerText = `Gunslinger
Shoot (passive): Your mouse will kill and disable any enemy that touches it. You can still use this ability when downed
`;
gunslingerDiv.classList.add('gunslingerDiv');
gunslingerDiv.onclick = () => {
  init('gunslinger');
}
serverList.appendChild(gunslingerDiv);

gunslingerDiv.classList.add('gunslingerDiv');
gunslingerDiv.onclick = () => {
  init('gunslinger');
}
serverList.appendChild(gunslingerDiv);

const warperDiv = document.createElement("div");
warperDiv.hero = "Warper";
warperDiv.classList.add(`heroBox`);
warperDiv.innerText = `Warper
Save: Every level you will gain a warp, unless you have more than 10. If you have at least one warp and die, you will be teleported to the beginning of the level and revived.
Vengance (passive): If you warp, then all enemies within a certain range of your death will die of you will die for 300 seconds. 
`;

warperDiv.classList.add('warperDiv');
warperDiv.onclick = () => {
  init('warper');
}
serverList.appendChild(warperDiv);

function Resize() {
  let scale = window.innerWidth / canvas.width;
  if (window.innerHeight / canvas.height < window.innerWidth / canvas.width) {
    scale = window.innerHeight / canvas.height;
  }
  canvas.style.transform = "scale(" + scale + ")";
  canvas.style.left = 1 / 2 * (window.innerWidth - canvas.width) + "px";
  canvas.style.top = 1 / 2 * (window.innerHeight - canvas.height) + "px";
  var rect = canvas.getBoundingClientRect();
  chatUI.style.left = rect.left + "px";
  chatUI.style.top = rect.top + "px";
}
Resize();

window.addEventListener('resize', function () {
  Resize();
});

const KEY_TO_ACTION = {
  "w": "1",
  "a": "2",
  "s": "3",
  "d": "4",
  "shift": "5",
  "t": "6",
  "e": "7",
  "z": "8",
  "x": "9",
  "j": "8",
  "k": "9",
  "r": "10",
  "arrowup": "1",
  "arrowleft": "2",
  "arrowdown": "3",
  "arrowright": "4",
  "v": "11",
  "b": "12",
}

document.onkeydown = function (e) {
  if (e.keyCode == 13 && !e.repeat) {
    if (document.activeElement.nodeName.toLowerCase() != "input") {
      document.getElementById("chatInput").focus();
      chatting = true;
    }
    else {
      document.getElementById("chatInput").blur();
      let message = document.getElementById("chatInput").value;
      if (message.length > 0) {
        ws.send(msgpack.encode({ chat: message, name: name }));
      }
      document.getElementById("chatInput").value = "";
      chatting = false;
    }
  }

  if (chatting == false && inGame) {
    if (KEY_TO_ACTION[e.key.toLowerCase()] != undefined) {
      ws.send(msgpack.encode({ kD: KEY_TO_ACTION[e.key.toLowerCase()] }));
    }
  }
}

document.onkeyup = function (e) {
  if (chatting == false && inGame) {
    if (KEY_TO_ACTION[e.key.toLowerCase()] != undefined) {
      ws.send(msgpack.encode({ kU: KEY_TO_ACTION[e.key.toLowerCase()] }));
    }
  }
}

function getCursorPosition(canvas, event) {
  var rect = canvas.getBoundingClientRect(),
    scaleX = canvas.width / rect.width,
    scaleY = canvas.height / rect.height;

  mouseX = (event.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
  mouseY = (event.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;
  ws.send(msgpack.encode({ mp: [mouseX, mouseY] }));
}
window.addEventListener('mousedown', function (e) {
  clicked = true;
  if (mouseToggleC == 0) {
    mouseToggleC = 1;
  } else if (mouseToggleC == 2) {
    mouseToggleC = 3;
  }
});
window.addEventListener('mousemove', function (e) {
  getCursorPosition(canvas, e);
})
window.addEventListener('mouseup', function (e) {
  clicked = false;
  if (mouseToggleC == 1) {
    mouseToggleC = 2;
  } else if (mouseToggleC == 3) {
    mouseToggleC = 0;
  }
  if (mouseToggleC == 2) {
    //mouse on (yes)
    ws.send(msgpack.encode("my"));
    getCursorPosition(canvas, e);
  } else {
    //mouse off (no)
    ws.send(msgpack.encode("mn"));
  }
});