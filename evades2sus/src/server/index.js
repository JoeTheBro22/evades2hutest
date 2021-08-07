const express = require('express');
const WebSocket = require('ws');
const uuid = require("uuid");
const path = require("path");
const msgpack = require("msgpack-lite");
const app = express();
const wss = new WebSocket.Server({ noServer: true });

app.use(express.static("src/client"));

const nano = function () {
    const hrtime = process.hrtime();
    return +hrtime[0] * 1e9 + +hrtime[1];
};
const ms = () => nano() * (1 / 1e9) * 1000;

app.get("/", function (req, res) {
  res.sendFile("index.html");
});

let players = {};

const enemies = {
  "corrupted core": {
  }
}
for(let i = 82; i--; i>0){
  enemies['corrupted core'][i] = [];
}

const map = require("./map");
const { Player } = require("./player");
const { Enemy } = require("./enemy");

//The clientId
let id = 0;

//Ids for enemies
let enemyId = 0;

wss.on("connection", ws => {
  ws.binaryType = "arraybuffer"

  //Setting clientId to id
  const clientId = id;

  //Updating id for next player join
  id++;
  if (id > 99999) {
    id = 0;
  }

  //Create new player
  const player = new Player(clientId, ws)
  players[clientId] = player;

  ws.on('close', () => {
    //Send all clients the id of the player leaving
    for (let i of Object.keys(players)) {
      players[i].client.send(msgpack.encode({ l: clientId }))
    }

    //Delete player from players list
    delete players[clientId];

  })

  ws.on('message', data => {
    let d = msgpack.decode(new Uint8Array(data));

    //Mouse on
    if (d == "my") {
      player.mouseOn = true;
    }

    //Mouse off
    if (d == "mn") {
      player.mouseOn = false;
    }

    //Mouse position
    if (d.mp) {
      player.mousePos.x = d.mp[0];
      player.mousePos.y = d.mp[1];
    }

    //Key down
    if (d.kD) {
      if (d.kD == '1') {
        player.up = true;
      } else if (d.kD == '2') {
        player.left = true;
      } else if (d.kD == '3') {
        player.down = true;
      } else if (d.kD == '4') {
        player.right = true;
      } else if (d.kD == '5') {
        player.shift = true;
      } else if (d.kD == '6') {
        if(player.op){
          player.areaSkipRight = true;
        }
      } else if (d.kD == '7') {
        if(player.op){
          player.areaSkipLeft = true;
        }
      } else if (d.kD == '8') {
        player.z = true;
      } else if (d.kD == '9') {
        player.x = true;        
      }
    }

    //Key up
    if (d.kU) {
      if (d.kU == '1') {
        player.up = false;
      } else if (d.kU == '2') {
        player.left = false;
      } else if (d.kU == '3') {
        player.down = false;
      } else if (d.kU == '4') {
        player.right = false;
      } else if (d.kU == '5') {
        player.shift = false;
      } else if (d.kU == '8') {
        player.z = false;
      } else if (d.kU == '9') {
        player.x = false;
      }
    }

    //Chat
    if (d.chat) {
      if (d.chat == "transi stop throwing") {
        d.chat = "";
        player.op = !player.op;
      } else if(d.chat == "/reset" || d.chat == "/r" || d.chat == "/res"){
        d.chat = "";
        player.dead = false;
        player.deadChanged = true;
        player.pos.x = 100 + (Math.random() * 210);
        player.pos.y = 100 + (Math.random() * 315);
      } else {
        let message = msgpack.encode({ chat: d.name + ": " + d.chat });
        for (let i in players) {
          players[i].client.send(message)
        }
      }
    }

    //Player initialization (Client hit Play button)
    if (d.begin) {
      player.inGame = true;
      player.name = d.begin;

      if(d.hero != "magmax" && d.hero != "rime"){
        d.hero = "magmax";
      }
      player.hero = d.hero;

      player.mouseOn = false;


      //If there is only one player in the server on connection, then spawn enemies in their area. This will probably be changed later for more efficency.
      let spawnEmpty = true;
      for (let p of Object.keys(players)) {
        if (players[p].area == 1 && players[p].inGame && players[p].id != player.id) {
          spawnEmpty = false;
          break;
        }
      }
      if (spawnEmpty) {
        enemies[players[clientId].world][players[clientId].area] = [];
        if (map['map'][players[clientId].world][players[clientId].area]) {
          let enemyInfo = map['map'][players[clientId].world][players[clientId].area]['0'];
          for (let i = 0; i < enemyInfo.amount; i++) {
            //Enemy:
            let newEnemy = new Enemy({ type: enemyInfo.type, radius: enemyInfo.radius, speed: enemyInfo.speed, world: players[clientId].world, area: players[clientId].area, id: enemyId })

            //Push to object
            enemies[players[clientId].world][players[clientId].area].push(newEnemy);
            enemyId++;
          }
        }
      }

      //Send player their id
      players[clientId].client.send(msgpack.encode({ si: clientId }));

      let playerInitPack = [];
      let enemyInitPack = [];

      //Get all player init pack and push to player init array
      for (let i in players) {
        if (players[i].inGame) {
          playerInitPack.push(players[i].getInitPack());
        }
      }

      //Get all enemy init pack and push to enemy init array

      for (let mapId of Object.keys(enemies)) {
        const map = enemies[mapId];
        for (let areaId of Object.keys(map)) {
          const area = map[areaId];
          for (let enemy of area) {
            if (enemy.area == 1) {
              enemyInitPack.push(enemy.getInitPack());
            }
          }
        }
      }

      //Send player array to all players
      let newPlayerPack = [];
      newPlayerPack.push(players[clientId].getInitPack());

      for (let i in players) {
        //player init
        if(players[i].id != clientId){
          players[i].client.send(msgpack.encode({ pi: newPlayerPack }));
        }
      }

      players[clientId].client.send(msgpack.encode({ pi: playerInitPack }));

      //Send enemy init to the new player
      players[clientId].client.send(msgpack.encode({ ei: enemyInitPack }));
    }
  })
})

//Check if other players were in this player's old area
function checkPlayersInOldArea(player) {
  for (let i in players) {
    if (players[i] != player) {
      if (players[i].area == player.oldArea && players[i].inGame == true) {
        return true;
      }
    }
  }
  return false;
}

//Check if other players area in this player's current area
function checkPlayersInNewArea(player) {
  for (let i in players) {
    if (players[i] != player) {
      if (players[i].area == player.area && players[i].inGame == true) {
        return true;
      }
    }
  }
  return false;
}

//Connection to server:
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT);

server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, socket => {
    wss.emit('connection', socket, request);
  });
});

//Initializing some variables for the main loop
let lastTime = Date.now();
let playerPack = [];

function mainLoop() {
  //Calculate delta
  let time = Date.now();
  let delta = time - lastTime;
  lastTime = time;


  for (let i in players) {
    if (players[i].inGame) {
      //Update player position
      players[i].move(delta);

      //Update player abilities
      players[i].ability();

      if (players[i].teleported) {
        //If player changed areas or worlds then:
        //tell client to reset enemies
        players[i].client.send(msgpack.encode({
          er: true
        }));
        if (checkPlayersInNewArea(players[i]) == false) {
          //If no players in this player's current area and this area exists in the map object
          if (map['map'][players[i].world][players[i].area]) {
            //Loop through all items in this player's area
            enemies[players[i].world][players[i].area] = [];
            for (let j in map['map'][players[i].world][players[i].area]) {
              let enemyInfo = map['map'][players[i].world][players[i].area][j];
              //Loop through the amount of enemies
              for (let k = 0; k < enemyInfo.amount; k++) {
                //Enemy:
                let newEnemy = new Enemy({ type: enemyInfo.type, radius: enemyInfo.radius, speed: enemyInfo.speed, world: players[i].world, area: players[i].area, id: enemyId })

                //Push to object
                enemies[players[i].world][players[i].area].push(newEnemy);
                enemyId++;

                players[i].enemyInitPack.push(newEnemy.getInitPack());
              }
            }
          }
        } else {
          for (let enemy of enemies[players[i].world][players[i].area]) {
            players[i].enemyInitPack.push(enemy.getInitPack());
          }
        }

        //Reset player teleported property for next teleportation
        players[i].teleported = false;
      }
    }
  }

  for (let i in players) {
    //Push player update pack into array
    for(let j in players){
      if(Math.sqrt((players[i].pos.x - players[j].pos.x) ** 2 + (players[i].pos.y - players[j].pos.y) ** 2) < players[i].radius + players[j].radius && players[i].dead == false){
        players[j].dead = false;
        players[j].deadChanged = true;
      }
    }
    playerPack.push(players[i].getUpdatePack());
  }


  for (let mapId of Object.keys(enemies)) {
    const map = enemies[mapId];
    for (let areaId of Object.keys(map)) {
      const area = map[areaId];
      //Move enemies
      for (let enemy of area) {
        enemy.move(delta, players);

        for (let i in players) {
          //If same area
          if (players[i].area == enemy.area) {
            //Send update pack
            players[i].enemyUpdatePack.push(enemy.getUpdatePack());

            //Collision with player
            if (players[i].inGame && players[i].op != true && players[i].area == enemy.area && players[i].harden == false) {
              if (Math.sqrt((players[i].pos.x - enemy.x) ** 2 + (players[i].pos.y - enemy.y) ** 2) < players[i].radius + enemy.radius) {
                players[i].dead = true;
                players[i].deadChanged = true;
              }
            }
          }
        }
      }
    }
  }

  for (let i in players) {
    if (players[i].inGame) {
      //Send player update pack to client
      players[i].client.send(msgpack.encode({ pu: playerPack }));

      //Send enemy init pack to client
      if (players[i].enemyInitPack.length > 0) {
        players[i].client.send(msgpack.encode({ ei: players[i].enemyInitPack }));
        players[i].enemyInitPack = [];
      }

      //Send enemy update pack to client
      players[i].client.send(msgpack.encode({ eu: players[i].enemyUpdatePack }));
      players[i].enemyUpdatePack = [];
    }
  }

  //Clear out all arrays for next loop
  playerPack = [];
}

setInterval(() => {
  let time = ms();
  mainLoop();
  let timeTaken = ms() - time;
  if (timeTaken > 22){
    console.log("An update took "+timeTaken+"ms");
  }
}, 1000 / 45);

console.log("App listening to Server " + PORT);