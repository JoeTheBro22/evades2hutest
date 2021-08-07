let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

var HOST = location.origin.replace(/^http/, 'ws')
const ws = new WebSocket(HOST);
ws.binaryType = "arraybuffer"


let joinButton = document.querySelector(".play");
let menu = document.querySelector(".menu");
let game = document.querySelector(".game");
let chatInput = document.getElementById("chatInput");
let chatArea = document.getElementById("chat");
let serverList = document.querySelector('.serverList');
let join = document.querySelector(".joinDiv");

var players = {};
var enemies = {};
let chatting = false;
let name = "";
let inGame = false;
let selfId = "";
let playerOffset = { x: 0, y: 0 };
let area = 1;
let mouseX = 0;
let mouseY = 0;
let mouseToggleC = 0;

const amogusImage = new Image();
amogusImage.src = "./amogus.png";
ws.addEventListener("message", function (data) {
  let message = msgpack.decode(new Uint8Array(data.data));

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
    for (let i in message.pu) {
      if (players[message.pu[i].id]) {
        players[message.pu[i].id].updatePack(message.pu[i]);
      }
    }
  }
  if (message.eu) {
    for (let i in message.eu) {
      if (enemies[message.eu[i].id]) {
        enemies[message.eu[i].id].updatePack(message.eu[i]);
      }
    }
  }
  if (message.si) {
    selfId = message.si;
  }
  if (message.l) {
    delete players[message.l];
  }
});

let lastTime = Date.now();

let delt = 0;

let count = 0;
function renderGame() {
  let time = Date.now();
  let delta = time - lastTime;
  lastTime = time;

  delt = get_delta(delt);

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
      ctx.fillRect(96 / 1.4 + playerOffset.x, playerOffset.y, 384 / 1.4, 720 / 1.4);
      ctx.fillRect(3360 / 1.4 + 1028.6 + playerOffset.x, playerOffset.y, 384 / 1.4, 720 / 1.4);

      if (area == 1) {
        //Teleporting between worlds
        ctx.fillStyle = "rgba(106,208,222,1)";
        ctx.fillRect(playerOffset.x, playerOffset.y, 480 / 1.4, 96 / 1.4);
        ctx.fillRect(playerOffset.x, 624 / 1.4 + playerOffset.y, 480 / 1.4, 96 / 1.4);

        //Teleporting between areas
        ctx.fillStyle = "rgba(85,176,179,1)";
        ctx.fillRect(playerOffset.x, playerOffset.y, 96 / 1.4, 720 / 1.4);
        ctx.fillStyle = "rgba(255,244,108,1)";
        ctx.fillRect(3744 / 1.4 + 1028.6 + playerOffset.x, playerOffset.y, 96 / 1.4, 720 / 1.4);
      } else {
        ctx.fillStyle = "rgba(255,244,108,1)";
        ctx.fillRect(playerOffset.x, playerOffset.y, 96 / 1.4, 720 / 1.4);
        ctx.fillRect(3744 / 1.4 + 1028.6 + playerOffset.x, playerOffset.y, 96 / 1.4, 720 / 1.4);
      }

      //Area
      ctx.fillStyle = "rgba(255,255,255,1)";
      ctx.fillRect(480 / 1.4 + playerOffset.x, playerOffset.y, 2880 / 1.4 + 1028.6, 720 / 1.4);

      //Grid
      /*for(let z = 0; z < 80; z++){
        ctx.beginPath();
        ctx.moveTo(480/1.4+z*34.286+playerOffset.x, playerOffset.y);
        ctx.lineTo(480/1.4+z*34.286+playerOffset.x, 720/1.4+playerOffset);
        ctx.strokeStyle = "rgba(0,0,0,0.3)";
        ctx.stroke();
        ctx.closePath();
      }*/

      ctx.beginPath();
      ctx.arc(640, 360, 17.14, 0, 6.28318531);
      if (player.dead == false) {
        ctx.fillStyle = player.color;
        ctx.fill();
      } else {
        ctx.globalAlpha = 0.2;
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.globalAlpha = 1;
      }
      ctx.closePath();
      ctx.globalAlpha = 0.7;
      ctx.font = "22px 'Exo 2'";
      if (player.dead == false) {
        ctx.fillStyle = "rgb(0, 0, 0)";
      } else {
        ctx.fillStyle = "rgb(255,0,0)";
      }
      ctx.fillText(player.name, 640, 360 - 25);
      ctx.globalAlpha = 1;

      //Leaderboard
      ctx.fillStyle = "rgba(150,150,150,0.5)";
      ctx.fillRect(canvas.width - 200, 20, 180, 100 + count*20);
      ctx.font = "22px 'Exo 2'";
      ctx.fillStyle = "rgb(0, 0, 0)";
      ctx.fillText("Leaderboard", canvas.width - 110, 40);
      ctx.fillText("___________", canvas.width - 110, 46);
      ctx.fillStyle = "white";
      ctx.fillText("Corrupted Core", canvas.width - 110, 80);
      ctx.fillText("_________", canvas.width - 110, 86);
      ctx.font = "18px 'Exo 2'";
      if (player.dead == false) {
        ctx.fillStyle = "rgb(0, 0, 0)";
      } else {
        ctx.fillStyle = "rgb(255,0,0)";
      }
      ctx.fillText(player.name + " [" + player.area + "]", canvas.width - 110, 110);

      //Title
      ctx.textAlign = "center";
      ctx.lineWidth = 6;
      ctx.fillStyle = "#f4faff";
      ctx.strokeStyle = "#425a6d";
      ctx.font = "bold " + 35 + "px Tahoma, Verdana, Segoe, sans-serif";
      ctx.textAlign = "center";
      if (player.area % 10 == 0) {
        ctx.strokeText('Corrupted Core: Area ' + player.area + " BOSS", canvas.width / 2, 40);
        ctx.fillText('Corrupted Core: Area ' + player.area + " BOSS", canvas.width / 2, 40);
      }
      else {
        ctx.strokeText('Corrupted Core: Area ' + player.area, canvas.width / 2, 40);
        ctx.fillText('Corrupted Core: Area ' + player.area, canvas.width / 2, 40);
      }

      //Minimap (scale 9.149, 7.346)
      ctx.fillStyle = "rgba(100,100,100,0.1)";
      ctx.fillRect(15, canvas.height - 75, 300*1.37, 60);
      ctx.arc((player.renderX / 9.149) + 15, (player.renderY / 8.4) + canvas.height - 75, 4, 0, 6.28318531);
      if (player.dead == false) {
        ctx.fillStyle = player.color;
        ctx.fill();
      } else {
        ctx.globalAlpha = 0.2;
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.globalAlpha = 1;
      }
      ctx.fill();
    }
  }

  count = 0;

  for (let i in players) {
    if (players[i].id != selfId) {
      const player = players[i];
      count++;
      if (player.area == area) {
        ctx.beginPath();
        ctx.arc(player.renderX + playerOffset.x, player.renderY + playerOffset.y, 17.14, 0, 6.28318531);
        if (player.dead == false) {
          ctx.fillStyle = player.color;
          ctx.fill();
        } else {
          ctx.globalAlpha = 0.2;
          ctx.fillStyle = "black";
          ctx.fill();
          ctx.globalAlpha = 1;
        }
        ctx.fill();
        ctx.arc((player.renderX / 9.149) + 15, (player.renderY / 8.4) + canvas.height - 75, 4, 0, 6.28318531);
        ctx.fill();
        ctx.closePath();
        ctx.globalAlpha = 0.7;
        ctx.font = "22px 'Exo 2'";
        if (player.dead == false) {
          ctx.fillStyle = "rgb(0, 0, 0)";
        } else {
          ctx.fillStyle = "rgb(255,0,0)";
        }
        ctx.fillText(player.name, player.renderX + playerOffset.x, player.renderY - 25 + playerOffset.y);
        ctx.globalAlpha = 1;
      }
      ctx.font = "18px 'Exo 2'";
      if (player.dead == false) {
        ctx.fillStyle = "rgb(0, 0, 0)";
      } else {
        ctx.fillStyle = "rgb(255,0,0)";
      }
      ctx.fillText(player.name + " [" + player.area + "]", canvas.width - 110, 110 + (count * 20));
    }
  }

  for (let i in enemies) {
    enemies[i].interp(delt);
    if (enemies[i].type != "amogus") {
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(enemies[i].renderX + playerOffset.x, enemies[i].renderY + playerOffset.y, enemies[i].radius, 0, 6.28318531);
      ctx.strokeStyle = "rgb(0, 0, 0)";
      ctx.stroke();
      ctx.closePath();
      ctx.beginPath();
      ctx.arc(enemies[i].renderX + playerOffset.x, enemies[i].renderY + playerOffset.y, enemies[i].radius, 0, 6.28318531);
      if (enemies[i].type == "normal") {
        ctx.fillStyle = "rgba(120,120,120,1)";
      } else if (enemies[i].type == "dasher") {
        ctx.fillStyle = "#003c66";
      } else if (enemies[i].type == 'lag') {
        ctx.fillStyle = "rgba(120,120,120,1)";//ctx.fillStyle = "rgb(10,50,180)";
      } else if(enemies[i].type == "warp"){
        ctx.fillStyle = "rgba(139, 129, 161, 1)"
      } else if (enemies[i].type == 'cancer') {
        ctx.fillStyle = "purple";
      } else if (enemies[i].type == "homing") {
        ctx.fillStyle = "rgb(160, 120, 10)";
      } else if (enemies[i].type == "tp") {
        ctx.fillStyle = "rgb(160,160,220)";
      } else if (enemies[i].type == "trap") {
        ctx.fillStyle = "rgb(80, 150, 110)";
      } else if (enemies[i].type == "aaaa") {
        ctx.fillStyle = "hsl(" + (Date.now()) + ", 50%, 50%)";
      } else if (enemies[i].type == "diagonal") {
        ctx.fillStyle = "rgb(160, 210, 190)";
      } else if (enemies[i].type == "wallsprayer") {
        ctx.fillStyle = "yellow";
      } else if (enemies[i].type == "liquid") {
        ctx.fillStyle = "rgb(170, 250, 170)";
      } else if (enemies[i].type == "frog") {
        ctx.fillStyle = "#541087";
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
        ctx.fillStyle = "rgb(250,250,250)";
      } else if (enemies[i].type == "slower") {
        ctx.fillStyle = "rgb(200,0,0)";
      } else if (enemies[i].type == "freezing") {
        ctx.fillStyle = "rgb(184, 2, 78";
      } else if (enemies[i].type == "soldier"){
        ctx.fillStyle = "#857d66";
      } else if (enemies[i].type == "creeper"){
        ctx.fillStyle = "#874617";
      }
      else {
        ctx.fillStyle = "red";
      }

      //'seizure', 'rotate', 'lag', 'cancer', 'homing', 'tp', 'trap', 'aaaa', 'diagonal', 'wallsprayer', 'speeder', 'liquid', 'frog', 'yeet', 'sideways', 'transangle'
      ctx.fill();
      if (enemies[i].aura > 0) {
        ctx.arc(enemies[i].renderX + playerOffset.x, enemies[i].renderY + playerOffset.y, enemies[i].aura, 0, 6.28318531);
        ctx.globalAlpha = 0.18;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
      ctx.closePath();
    }
    else {
      ctx.drawImage(amogusImage, enemies[i].renderX + playerOffset.x - enemies[i].radius, enemies[i].renderY + playerOffset.y - enemies[i].radius, enemies[i].radius * 2, enemies[i].radius * 2)
    }
  }

  requestAnimationFrame(renderGame);
}
requestAnimationFrame(renderGame);

joinButton.onclick = () => {
  menu.style.display = "none";
  join.style.display = "";
  game.style.display = "none";
}

function init(hero) {
  if (document.getElementById("username").value.length == 0) {
    name = "guest"
  } else {
    name = document.getElementById("username").value;
  }

  menu.style.display = "none";
  join.style.display = "none";
  game.style.display = "";
  inGame = true;
  ws.send(msgpack.encode({ begin: name, hero: hero }))
  mouseToggleC = 0;
}

serverList.innerHTML = "";
const magDiv = document.createElement("div");
magDiv.hero = "magmax";
magDiv.classList.add('serverBox');
magDiv.innerText = `Magmax`;
magDiv.classList.add('permanent');
magDiv.onclick = () => {
  init("magmax");
}
serverList.appendChild(magDiv);

const rimeDiv = document.createElement("div");
rimeDiv.hero = "rime";
rimeDiv.classList.add('serverBox');
rimeDiv.innerText = `Rime`;
rimeDiv.classList.add('permanent');
rimeDiv.onclick = () => {
  init("rime");
}
serverList.appendChild(rimeDiv);


function Resize() {
  let scale = window.innerWidth / canvas.width;
  if (window.innerHeight / canvas.height < window.innerWidth / canvas.width) {
    scale = window.innerHeight / canvas.height;
  }
  canvas.style.transform = "scale(" + scale + ")";
  canvas.style.left = 1 / 2 * (window.innerWidth - canvas.width) + "px";
  canvas.style.top = 1 / 2 * (window.innerHeight - canvas.height) + "px";
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
  "arrowup": "1",
  "arrowleft": "2",
  "arrowdown": "3",
  "arrowright": "4"
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

  if (mouseToggleC == 2) {
    ws.send(msgpack.encode({ mp: [mouseX, mouseY] }));
    //socket.emit('mousePos',{x: mouseX, y: mouseY});
  }
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