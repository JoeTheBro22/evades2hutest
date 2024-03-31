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
const defaultWorld = "Corrupted Core";

let enemyIdsInUse = [];
let playerIdsInUse = [];

const enemies = {
"Corrupted Core": {
},
"Crazy Cosmos": {
},
"Crazy Cosmos Hard": {
},
"Methodical Monastery": {
},
"Methodical Monastery Hard": {
},
"Crowded Cavern": {

},
"Strange Space": {

},
"Monumental Migration": {

},
"Monumental Migration+": {

},
"Toilsome Traverse": {

},
"become sus": {

},
"Atrocious Arena": {

},
"Arduous Abyss": {
    
},
"Tireless Trek": {

},
"Acclimating Acceleration": {

},
"Jarring Journey": {

},
"Make Your Own Map": {

},
"Central Crossing": {

},
"Terrifing Trials": {

},
"Artificial Amalgamation": {

},
"Strenuous Survival": {

},
"Sneaky Speculation": {

},
"Calamatous Cavern": {

},
}
const projectiles = {
"Corrupted Core": {
},
"Crazy Cosmos": {
},
"Crazy Cosmos Hard": {
},
"Methodical Monastery": {
},
"Methodical Monastery Hard": {
},
"Crowded Cavern": {

},
"Strange Space": {

},
"Monumental Migration": {

},
"Monumental Migration+": {

},
"Toilsome Traverse": {

},
"become sus": {

},
"Atrocious Arena": {

},
"Arduous Abyss": {

},
"Tireless Trek": {

},
"Acclimating Acceleration": {

},
"Jarring Journey": {

},
"Make Your Own Map": {

},
"Central Crossing": {

},
"Terrifing Trials": {

},
"Artificial Amalgamation": {

},
"Strenuous Survival": {

},
"Sneaky Speculation": {

},
"Calamatous Cavern": {

},
}

for (let i = 122; i--; i > 0) {
	enemies['Corrupted Core'][i] = [];
	projectiles['Corrupted Core'][i] = [];
}
for (let i = 122; i--; i > 0) {
	enemies['Crowded Cavern'][i] = [];
	projectiles['Crowded Cavern'][i] = [];
}
for (let i = 42; i--; i > 0) {
	enemies['Crazy Cosmos'][i] = [];
	projectiles['Crazy Cosmos'][i] = [];
}
for (let i = 42; i--; i > 0) {
	enemies['Crazy Cosmos Hard'][i] = [];
	projectiles['Crazy Cosmos Hard'][i] = [];
}
for (let i = 42; i--; i > 0) {
	enemies['Methodical Monastery'][i] = [];
	projectiles['Methodical Monastery'][i] = [];
}
for (let i = 42; i--; i > 0) {
	enemies['Methodical Monastery Hard'][i] = [];
	projectiles['Methodical Monastery Hard'][i] = [];
}
for (let i = 22; i--; i > 0) {
	enemies['Strange Space'][i] = [];
	projectiles['Strange Space'][i] = [];
}
for (let i = 482; i--; i > 0) {
	enemies['Monumental Migration'][i] = [];
	projectiles['Monumental Migration'][i] = [];
}
for (let i = 1202; i--; i > 0) {
	enemies['Artificial Amalgamation'][i] = [];
	projectiles['Artificial Amalgamation'][i] = [];
}
for (let i = 402; i--; i > 0) {
	enemies['Monumental Migration+'][i] = [];
	projectiles['Monumental Migration+'][i] = [];
}
for(let i = 82; i--; i>0){
  enemies["Arduous Abyss"][i] = [];
  projectiles["Arduous Abyss"][i] = [];
}

for (let i = 82; i--; i > 0) {
	enemies['Toilsome Traverse'][i] = [];
	projectiles['Toilsome Traverse'][i] = [];
}
for (let i = 82; i--; i > 0) {
	enemies['become sus'][i] = [];
	projectiles['become sus'][i] = [];
}
for (let i = 202; i--; i > 0) {
	enemies['Atrocious Arena'][i] = [];
	projectiles['Atrocious Arena'][i] = [];
}
for (let i = 42; i--; i > 0) {
	enemies['Tireless Trek'][i] = [];
	projectiles['Tireless Trek'][i] = [];
}
for (let i = 42; i--; i > 0) {
	enemies['Acclimating Acceleration'][i] = [];
	projectiles['Acclimating Acceleration'][i] = [];
}
for (let i = 42; i--; i > 0) {
	enemies['Jarring Journey'][i] = [];
	projectiles['Jarring Journey'][i] = [];
}
for (let i = 82; i--; i > 0) {
	enemies['Central Crossing'][i] = [];
	projectiles['Central Crossing'][i] = [];
}
for (let i = 42; i--; i > 0) {
	enemies['Terrifing Trials'][i] = [];
	projectiles['Terrifing Trials'][i] = [];
}
for (let i = 2; i--; i > 0) {
	enemies['Strenuous Survival'][i] = [];
	projectiles['Strenuous Survival'][i] = [];
}
for (let i = 22; i--; i > 0) {
	enemies['Sneaky Speculation'][i] = [];
	projectiles['Sneaky Speculation'][i] = [];
}
for (let i = 42; i--; i > 0) {
	enemies['Calamatous Cavern'][i] = [];
	projectiles['Calamatous Cavern'][i] = [];
}

const map = require("./map");
const { Player } = require("./player");
const { Enemy } = require("./enemy");
const { Projectile } = require("./projectiles");
const e = require('cors');

//The clientId
let id = 1;

//Ids for enemies
let enemyId = 0;

let rateLimits = {};

setInterval(() => {
	rateLimits = {};
}, 1000)

wss.on("connection", ws => {
	ws.binaryType = "arraybuffer"

	//Setting clientId to id
	const clientId = id;
  
	//Updating id for next player join
  id++;
  if(id > 9999){
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

    if (checkPlayersInNewArea(players[clientId]) == false) {
      enemies[players[clientId].world][players[clientId].area] = [];
    }

		//Delete player from players list
		delete players[clientId];
	})

	ws.on('message', data => {
		if(rateLimits[clientId] === undefined) rateLimits[clientId] = 0;
		rateLimits[clientId]++;
		if(rateLimits[clientId] > 200) return;
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
				if (player.op) {
					player.areaSkipRight = 1;
				}
			} else if (d.kD == '7') {
				if (player.op) {
					player.areaSkipLeft = true;
				}
			} else if (d.kD == '8') {
				player.z = true;
			} else if (d.kD == '9') {
				player.x = true;
			} else if (d.kD == '10') {
				if (player.op) {
					player.areaSkipTen = true;
				}
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
			if(player.hero == 'pro hero xd' && Math.random() > 0.9){
				let randomNum = Math.random();
				if(randomNum < 0.2){
					d.chat = 'ez';
				} else if (randomNum < 0.4){
					d.chat = 'lmao ur bad';
				} else if (randomNum < 0.6){
					d.chat = 'skill issue';
				} else if (randomNum < 0.8){
					d.chat = 'bruh u noob';
				} else if (randomNum < 0.95){
					d.chat = 'why u suck lmao ?? 😂';
				} else {
					d.chat = 'u sure u have eyes bro? Imao so bad.';
				}
				
			}
			if (d.chat.toLowerCase() == "godmodeon") {
				d.chat = "";
				player.op = !player.op;
				player.left = false;
				player.right = false;
				player.up = false;
				player.down = false;
			} else if(d.chat == "/rev" || d.chat == "/revive" ){
				d.chat = "";
				player.dead = false;
				player.deadChanged = true;
				player.left = false;
				player.right = false;
				player.up = false;
				player.down = false;
			} else if(d.chat == "/random"){
				d.chat = "";
				player.hero = "???";
			} else if(d.chat.slice(0,5) == "/skip" || d.chat.slice(0,5) == "/goto"){
				//if(player.op){
					player.left = false;
					player.right = false;
					player.up = false;
					player.down = false;
					player.op = true;
					if(d.chat.slice(5,6) == '-'){
						player.areaSkipLeft = parseInt(d.chat.slice(5));
					} else {
						player.areaSkipRight = parseInt(d.chat.slice(5));
					}
					
					d.chat = "";
				//}
			} else if(d.chat.slice(0,5) == "/copy"){
				let previousType = 0;
				for (let j in map['map'][player.world][player.area]) {
					let enemyInfo = map['map'][player.world][player.area][j];
					//Loop through the amount of enemies
					for (let k = 0; k < enemyInfo.amount; k++) {
						if(previousType != enemyInfo.type){
							console.log('type: ' + enemyInfo.type + ' radius: ' + enemyInfo.radius + ' speed: '+ enemyInfo.speed + ' count: '+ enemyInfo.amount);
						}
						previousType = enemyInfo.type;
					}
				}
			}else if(d.chat.slice(0,4) == "/add" && player.world == 'Make Your Own Map'){
				const addEnemyValues = d.chat.split(" ");
				player.addEnemy.type = addEnemyValues[1];
				player.addEnemy.radius = parseInt(addEnemyValues[2]);
				player.addEnemy.speed = parseInt(addEnemyValues[3]);
				player.addEnemy.count = parseInt(addEnemyValues[4]);
				player.addEnemy.state = true;
			} else if((d.chat.slice(0,6) == "/clear") && player.world == 'Make Your Own Map'){
				player.addEnemy.state = 'clear';
			} else if (d.chat == "/reset" || d.chat == "/r" || d.chat == "/res") {
				d.chat = "";
				player.dead = false;
				player.deadChanged = true;
				player.pos.x = 100 + (Math.random() * 210);
				player.pos.y = 100 + (Math.random() * 315);
				player.xChanged = true;
				player.yChanged = true;
				player.left = false;
				player.right = false;
				player.up = false;
				player.down = false;
			} else {
				let message = msgpack.encode({ chat: d.name + ": " + d.chat });
				for (let i in players) {
					players[i].client.send(message)
				}
				player.left = false;
				player.right = false;
				player.up = false;
				player.down = false;
			}
		}

		//Player initialization (Client hit hero Play button)
		if (d.begin) {
			player.name = d.begin;

			if (d.hero != "magmax" && d.hero != "rameses" && d.hero != "parvulus" && d.hero != "ptah" && d.hero != "jotunn" && d.hero != "kindle" && d.hero != "neuid" && d.hero != "orbital" && d.hero != "cimex" && d.hero != "janus" && d.hero != "turr" && d.hero != "gunslinger"&& d.hero != "warper"&& d.hero != "thornstick"&& d.hero != "flylie" && d.hero != "???" && d.hero != "rogue"  && d.hero != "zenith" && d.hero != "pro hero xd" && d.hero != "necromancer" && d.hero != "auto") {
				d.hero = "magmax";
			}
			player.hero = d.hero;

			player.mouseOn = false;
		}
		//Player initialization (Client hit totem Play button)
		if(d.totem){
			player.inGame = true;
			player.mouseOn = false;
			if(d.totem != undefined){
				player.totem = d.totem;
			}

			// Begin game
			//If there is only one player in the server on connection, then spawn enemies in their area. This will probably be changed later for more efficency.
			let spawnEmpty = true;
			for (let p of Object.keys(players)) {
				if (players[p].area == 1 && players[p].world == defaultWorld && players[p].inGame && players[p].id != player.id) {
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
						let newEnemy = new Enemy({ type: enemyInfo.type, radius: enemyInfo.radius, speed: enemyInfo.speed, world: players[clientId].world, area: players[clientId].area, id: enemyId, count: enemyInfo.amount, index: i, path: enemyInfo.path, maxTimer: enemyInfo.maxTimer, minTimer: enemyInfo.minTimer, definiteOffset: enemyInfo.definiteOffset, randomOffset: enemyInfo.randomOffset })
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
			let projectileInitPack = [];

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
						if (enemy.area == 1 && enemy.world == defaultWorld) {
							enemyInitPack.push(enemy.getInitPack());
						}
					}
				}
			}

			for (let mapId of Object.keys(projectiles)) {
				const map = projectiles[mapId];
				for (let areaId of Object.keys(map)) {
					const area = map[areaId];
					for (let projectile of area) {
						let initPack = projectile.getInitPack();
						for (let i in players) {
							if (projectile.area == 1 && projectile.world == defaultWorld) {
								projectileInitPack.push(initPack);
							}
						}
					}
				}
			}

			//Send player array to all players
			let newPlayerPack = [];
			newPlayerPack.push(players[clientId].getInitPack());

			for (let i in players) {
				//player init
				if (players[i].id != clientId) {
					players[i].client.send(msgpack.encode({ pi: newPlayerPack }));
				}
			}

			players[clientId].client.send(msgpack.encode({ pi: playerInitPack }));

			//Send enemy init to the new player
			players[clientId].client.send(msgpack.encode({ ei: enemyInitPack }));
			players[clientId].client.send(msgpack.encode({ pri: projectileInitPack }));
		}
	})
})

//Check if other players were in this player's old area
function checkPlayersInOldArea(player) {
	for (let i in players) {
		if (players[i] != player) {
			if (players[i].area == player.oldArea && players[i].world == player.world && players[i].inGame == true) {
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
			if (players[i].area == player.area && players[i].world == player.world && players[i].inGame == true) {
				return true;
			}
		}
	}
	return false;
}

function copyToClipboard(str) {
	const el = document.createElement('textarea');
	el.value = str;
	document.body.appendChild(el);
	el.select();
	document.execCommand('copy');
	document.body.removeChild(el);
  };

//Check if other players were in this player's old area
function checkPlayersInOldWorld(player) {
	for (let i in players) {
		if (players[i] != player) {
			if (players[i].area == player.area && players[i].world == player.oldWorld && players[i].inGame == true) {
				return true;
			}
		}
	}
	return false;
}

//Check if other players area in this player's current area
function checkPlayersInNewWorld(player) {
	for (let i in players) {
		if (players[i] != player) {
			if (players[i].area == player.area && players[i].world == player.world && players[i].inGame == true) {
				return true;
			}
		}
	}
	return false;
}

function checkPlayersInWorld(world) {
	for (let i in players) {
		if (players[i].world == world && players[i].inGame == true) {
      return true;
    }
  }
	return false;
}

function findFreeIds(){
  let i = 0;
  while (true) {
    if(!enemyIdsInUse.includes(i)){
      return i;
    }
    i++;
  }
}

//Connection to server:
const PORT = 3000;//process.env.PORT || 6942;
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
			let world = players[i].world;
			let area = players[i].area;
			players[i].move(delta, enemies[world][area]);

			//Update player abilities
			players[i].ability(delta, enemies[world][area], projectiles);
			players[i].disabled = false;

				// Map Builder
				if(players[i].addEnemy.state == 'clear'){
					players[i].addEnemy.state = false;
					for (let j in players) {
						if (players[j].inGame && players[j].world == 'Make Your Own Map' && players[i].area == players[j].area) {
							enemies[players[j].world][players[j].area] = [];
							projectiles[players[j].world][players[j].area] = [];
							players[j].client.send(msgpack.encode({
								er: true
							}));
						}
					}
				} else if (players[i].addEnemy.state) {
					players[i].addEnemy.state = false;
					if(enemies[players[i].world][players[i].area] === undefined){
						enemies[players[i].world][players[i].area] = [];
					}
					
					
					for (let j in players) {
							for (let k = 0; k < players[i].addEnemy.count; k++) {
							let id = findFreeIds();
							let newEnemy = new Enemy({ type: players[i].addEnemy.type, radius: players[i].addEnemy.radius, speed: players[i].addEnemy.speed, world: players[i].world, area: players[i].area, id: id, count: players[i].addEnemy.count, index: k, path: null, maxTimer: null, minTimer: null, definiteOffset: null, randomOffset: null})
							enemies[players[i].world][players[i].area].push(newEnemy);
							enemyIdsInUse.push(id);
							//Push to object
							if (players[j].inGame) {
								players[j].enemyInitPack.push(newEnemy.getInitPack());
							}
						}
					}
				}

				let totalSurvivalTimer = 0;
				let totalExpandedSurvivalTimer = 0;
				let activePlayers = 0;
				let activeExpandedPlayers = 0;
				for(let j in players){
					if(players[j].inGame){
						if(players[j].world == 'Strenuous Survival' && players[j].survivalTimer > 0 && players[j].area == 1){
							activePlayers++;
							if(players[j].lastSurvivalTimer){
								totalSurvivalTimer += players[j].survivalTimer - players[j].lastSurvivalTimer;
							} else {
								totalSurvivalTimer += players[j].survivalTimer;
							}
							players[j].lastSurvivalTimer = players[j].survivalTimer;
						} else if(players[j].world == 'Strenuous Survival' && players[j].survivalTimer > 0){
							activeExpandedPlayers++;
							if(players[j].lastSurvivalTimer){
								totalExpandedSurvivalTimer += players[j].survivalTimer - players[j].lastSurvivalTimer;
							} else {
								totalExpandedSurvivalTimer += players[j].survivalTimer;
							}
							players[j].lastSurvivalTimer = players[j].survivalTimer;
						}
					}
				}

				let typesArray = ['normal', 'homing', 'tired', 'accelerating', 'accelerating', 'dasher', 'slower', 'disabler', 'immunetoxic', 'wavy', 'oscillating', 'eviljumper', 'soldier', 'jumper', 'immune', 'creeper', 'icicle', 'warp'];
				let expandedTypesArray = ['normal', 'warp', 'transangle', 'slower', 'lag', 'spiral', 'ultraspiral', 'amogus', 'oscillating', 
				'megafreezing', 'jumper', 'subzero', 'disabler', 'retracing', 'disabled', 'immunedisabler', 'sniper', 'tpshooter', 'octo', 'offsetocto', 'switch',
				'draining', 'megaDraining', 'wavy', 'sizing', 'expanding', 'freezing', 'ice sniper', 'regen sniper', 'speed sniper', 'turning', 'slippery', 'zigzag', 'pull',
				'snake', 'rain', 'push', 'evilsnake', 'eviljumper', 'immunefreezing', 'immunepull', 'immunepush', 'nebula', 'blackhole', 'lifeswitcher',
				'toxic', 'immunetoxic', 'tired', 'icicle', 'scared', 'soldier', 'creeper', 'wall', 'dasher', 'wallsprayer', 'frog', 
				'evilfrog', 'tp', 'homing', 'superhoming', 'liquid'];
				if(totalSurvivalTimer > 0 && Math.random() > 0.98 + 0.02*1/Math.ceil(totalSurvivalTimer) && enemies['Strenuous Survival'][1].length < 250 && players[i].area == 1){
					let id = findFreeIds();
					let newEnemy = new Enemy({ type: typesArray[Math.floor(Math.random()*(typesArray.length))], radius: (8+Math.random()*3), speed: (3+Math.random()*1.5), world: 'Strenuous Survival', area: 1, id: id, count: 1, index: 0});
					enemies[players[i].world][players[i].area].push(newEnemy);
					enemyIdsInUse.push(id);
					for (let j in players) {
						if(players[j].world == 'Strenuous Survival' && players[j].area == 1){
							//Push to object
							players[j].enemyInitPack.push(newEnemy.getInitPack());
						}
					}
				} else if(totalExpandedSurvivalTimer > 0 && Math.random() > 0.98 + 0.02*1/Math.ceil(totalExpandedSurvivalTimer) && enemies['Strenuous Survival'][2].length < 250){
					let id = findFreeIds();
					let newEnemy = new Enemy({ type: expandedTypesArray[Math.floor(Math.random()*(typesArray.length))], radius: (1+Math.random()*25), speed: (3+Math.random()*3), world: 'Strenuous Survival', area: 2, id: id, count: 1, index: 0});
					enemies[players[i].world][players[i].area].push(newEnemy);
					enemyIdsInUse.push(id);
					for (let j in players) {
						if(players[j].world == 'Strenuous Survival' && players[j].area == 2){
							//Push to object
							players[j].enemyInitPack.push(newEnemy.getInitPack()); 
						}
					}
				}

			if (players[i].worldTeleported == true) {
				players[i].worldTeleported = false;
				players[i].teleported = false;
				//If player changed areas or worlds then:
				//tell client to reset enemies and projectiles
				players[i].client.send(msgpack.encode({
					er: true
				}));
				if (checkPlayersInOldWorld(players[i]) == false) {
					enemies[players[i].oldWorld][players[i].area] = [];	
					projectiles[players[i].oldWorld][players[i].area] = [];
					projectiles[players[i].world][players[i].area] = [];
				} else {
					if(projectiles[players[i].oldWorld][players[i].area] !== undefined){
						for(let j in players){
							if(players[j].world == players[i].world || players[j].area == players[i].area && players[j] != players[i]){
								players[j].client.send(msgpack.encode({
									prr: true
								}));
							}
						}
						for(let projectile of projectiles[players[i].oldWorld][players[i].area]){
							let toReset = false;
							if(projectile.type == 'guard' || projectile.type == 'thorn' || projectile.type == 'orb'){
								toReset = true;
								projectiles[players[i].oldWorld][players[i].area].pop(projectile);
								projectiles[players[i].oldWorld][players[i].area].push(projectile);
								for(let j in players){
									if(players[j].world == players[i].world || players[j].area == players[i].area && players[j] != players[i]){
										players[j].client.send(msgpack.encode({
											prr: true
										}));
									}
								}
							}
							if(toReset){
								projectiles[players[i].oldWorld][players[i].area] = [];
								projectiles[players[i].world][players[i].area] = [];
							}
						}
					}
				}
				if (checkPlayersInNewWorld(players[i]) == false) {
					//If no players in this player's current area and this area exists in the map object
					if (map['map'][players[i].world][players[i].area]) {
						//Loop through all items in this player's area
						enemies[players[i].world][players[i].area] = [];
						for (let j in map['map'][players[i].world][players[i].area]) {
							let enemyInfo = map['map'][players[i].world][players[i].area][j];
							//Loop through the amount of enemies
							for (let k = 0; k < enemyInfo.amount; k++) {
								//Enemy:
                				let id = findFreeIds();

								let newEnemy = new Enemy({ type: enemyInfo.type, radius: enemyInfo.radius, speed: enemyInfo.speed, world: players[i].world, area: players[i].area, id: id, count: enemyInfo.amount, index: k, path: enemyInfo.path, maxTimer: enemyInfo.maxTimer, minTimer: enemyInfo.minTimer, definiteOffset: enemyInfo.definiteOffset, randomOffset: enemyInfo.randomOffset })

								//Push to object
								enemies[players[i].world][players[i].area].push(newEnemy);
								enemyIdsInUse.push(id);

								players[i].enemyInitPack.push(newEnemy.getInitPack());
							}
						}
					}

					if(enemies[players[i].world][players[i].area] === undefined){
						enemies[players[i].world][players[i].area] = [];
					}
							
					
					for (let j in players) {
						for (let k = 0; k < players[i].addEnemy.count; k++) {
							let id = findFreeIds();
							let newEnemy = new Enemy({ type: players[i].addEnemy.type, radius: players[i].addEnemy.radius, speed: players[i].addEnemy.speed, world: players[i].world, area: players[i].area, id: id, count: players[i].addEnemy.count, index: k, path: null, maxTimer: null, minTimer: null, definiteOffset: null, randomOffset: null })
							enemies[players[i].world][players[i].area].push(newEnemy);
							enemyIdsInUse.push(id);
							if (players[j].inGame && players[j].addEnemy.state && players[j].world == players[i].world && players[j].area == players[i].area) {
								//Push to object
								players[i].enemyInitPack.push(newEnemy.getInitPack());
							}
						}
					}
					players[i].client.send(msgpack.encode({
						prr: true
					}));
				} else {
					if(enemies[players[i].world][players[i].area] != undefined){
						for (let enemy of enemies[players[i].world][players[i].area]) {
							players[i].enemyInitPack.push(enemy.getInitPack());
						}
					}
					players[i].client.send(msgpack.encode({
						prr: true
					}));
				}
			}

			if (players[i].teleported == true) {
				players[i].teleported = false;
				//If player changed areas or worlds then:
				//tell client to reset enemies
				players[i].client.send(msgpack.encode({
					er: true
				}));
				for (let j in players) {
					if (players[j].inGame) {
						for (let mapId of Object.keys(projectiles)) {
							const map = projectiles[mapId];
							for (let areaId of Object.keys(map)) {
								const area = map[areaId];
								for (let projectile of area) {
									
									
								}
							}
						}
					}
				}
				if (checkPlayersInOldArea(players[i]) == false) {
					enemies[players[i].world][players[i].oldArea] = [];
					projectiles[players[i].world][players[i].oldArea] = [];
					projectiles[players[i].world][players[i].area] = [];
					projectiles[players[i].world][players[i].oldArea] = [];
					players[i].client.send(msgpack.encode({
						prr: true
					}));
				} else {
					if(projectiles[players[i].world][players[i].oldArea] !== undefined){
						for(let j in players){
							if(players[j].world == players[i].world || players[j].area == players[i].area && players[j] != players[i]){
								players[j].client.send(msgpack.encode({
									prr: true
								}));
							}
						}
						for(let projectile of projectiles[players[i].world][players[i].oldArea]){
							let toReset = false;
							if(projectile.type == 'guard' || projectile.type == 'thorn' || projectile.type == 'orb'){
								toReset = true;
								projectiles[players[i].world][players[i].oldArea].pop(projectile);
								projectiles[players[i].world][players[i].area].push(projectile);
								for(let j in players){
									if(players[j].world == players[i].world || players[j].area == players[i].area && players[j] != players[i]){
										players[j].client.send(msgpack.encode({
											prr: true
										}));
									}
								}
							}
							if(toReset){
								projectiles[players[i].world][players[i].oldArea] = [];
								projectiles[players[i].world][players[i].area] = [];
							}
						}
					}
				}
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
                				let id = findFreeIds();
								let newEnemy = new Enemy({ type: enemyInfo.type, radius: enemyInfo.radius, speed: enemyInfo.speed, world: players[i].world, area: players[i].area, id: id, count: enemyInfo.amount, index: k, path: enemyInfo.path, maxTimer: enemyInfo.maxTimer, minTimer: enemyInfo.minTimer, definiteOffset: enemyInfo.definiteOffset, randomOffset: enemyInfo.randomOffset })
								//Push to object
								enemies[players[i].world][players[i].area].push(newEnemy);
								enemyIdsInUse.push(id);
								players[i].enemyInitPack.push(newEnemy.getInitPack());
							}
						}
					}
				} else {
					if(enemies[players[i].world][players[i].area] !== undefined){
						for (let enemy of enemies[players[i].world][players[i].area]) {
							players[i].enemyInitPack.push(enemy.getInitPack());
						}
					}
				}
			}
		}
	}

	for (let mapId of Object.keys(projectiles)) {
		if(checkPlayersInWorld(mapId) == true) {
      const map = projectiles[mapId];
      for (let areaId of Object.keys(map)) {
        const area = map[areaId];
        for (let projectile of area) {
          if (players[projectile.parentId]) {
            projectile.update(delta, players, enemies[players[projectile.parentId].world][players[projectile.parentId].area], projectiles);
          } else {
            projectile.update(delta, players, enemies[mapId][areaId], projectiles);
          }

          if (projectile.toInit) {
            let initPack = projectile.getInitPack();
            for (let i in players) {
              if (projectile.area == players[i].area && projectile.world == players[i].world) {
                players[i].projectileInitPack.push(initPack);
              }
            }
          }

          let updatePack = projectile.getUpdatePack();
          for (let i in players) {
            if (players[i].inGame) {
              if (projectile.area == players[i].area && projectile.world == players[i].world) {
                players[i].projectileUpdatePack.push(updatePack);
              }
            }
          }

          if (projectile.killed == true) {
			if(projectile.type == "wallLatcher" && projectile.life > 0){
				  players[projectile.parentId].pos.x = projectile.x;
				  players[projectile.parentId].pos.y = projectile.y;
				  players[projectile.parentId].xChanged = true;
				  players[projectile.parentId].yChanged = true;
				  players[projectile.parentId].invincibilityTimer = 2000;
				  players[projectile.parentId].invincible = true;
			}
            area.splice(area.indexOf(projectile), 1);
          }
        }		
      }
    }
		// make sure to do if(projectile.killed == true)
		// then delete from the porjeciles object aand the killed 
	}

  enemyIdsInUse = [];

	for (let mapId of Object.keys(enemies)) {
    if(checkPlayersInWorld(mapId) == true) {
      const map = enemies[mapId];
      for (let areaId of Object.keys(map)) {
        const area = map[areaId];
        //Move enemies
        for (let enemy of area) {
          enemyIdsInUse.push(enemy.id);
          enemy.move(delta, players, area, projectiles);

		if(enemy.type == 'light'){
			if(enemy.radius > enemy.aura){
				enemy.disableTime = 1000;
			}
			for(let affectedEnemy of area){
				if(Math.sqrt((enemy.x - affectedEnemy.x) ** 2 + (enemy.y - affectedEnemy.y) ** 2) < enemy.radius + enemy.aura + affectedEnemy.radius && affectedEnemy != enemy){
					affectedEnemy.radiusMult+=0.01;
					affectedEnemy.lightAffected = true;
				}
			}
		}

		if(enemy.type == 'enemySpeed'){
			for(let affectedEnemy of area){
				if(Math.sqrt((enemy.x - affectedEnemy.x) ** 2 + (enemy.y - affectedEnemy.y) ** 2) < enemy.radius + enemy.aura + affectedEnemy.radius && affectedEnemy != enemy){
					if(affectedEnemy.speedMultBuff < 40){
						if(affectedEnemy.radius < 100){
							affectedEnemy.speedMultBuff+=0.01;
						}
					}
					affectedEnemy.speedAffected = true;
				}
			}
		}

          for (let i in players) {
            //If same area
            if (players[i].area == enemy.area && players[i].world == enemy.world) {
              //Send update pack
              players[i].enemyUpdatePack.push(enemy.getUpdatePack());

              
			  let canvas = { width: 1280, height: 720 };

			  //Gunslinger Autocorrect
			  if(players[i].hero == 'gunslinger' && players[i].world != 'Central Crossing' && players[i].world != 'Strenuous Survival' && players[i].pos.x > 342.86 && players[i].pos.x < players[i].areaWidth + 342.86 && !players[i].dead && !enemy.dead && Math.sqrt((players[i].pos.x - enemy.x) ** 2 + (players[i].pos.y - enemy.y) ** 2) < 150){
				  let amountToPushX = ((players[i].pos.x - enemy.x)/((players[i].pos.x - enemy.x) ** 2 + (players[i].pos.y - enemy.y) ** 2))/5;
				  let amountToPushY = ((players[i].pos.y - enemy.y)/((players[i].pos.x - enemy.x) ** 2 + (players[i].pos.y - enemy.y) ** 2))/5;
				  if(amountToPushX*6800 < 10 && amountToPushX*6800 > -10){
					players[i].pos.x += amountToPushX*6800;
				  } else {
					if(players[i].pos.x - enemy.x < 0){
						players[i].pos.x -= 10;
					} else {
						players[i].pos.x += 10;
					}
				  }
				  if(amountToPushY*6800 < 10 && amountToPushY*6800 > -10){
					players[i].pos.y += amountToPushY*6800;
				  } else {
					if(players[i].pos.y - enemy.y < 0){
						players[i].pos.y -= 10;
					} else {
						players[i].pos.y += 10;
					}
				  }
				  players[i].xChanged = true;
				  players[i].yChanged = true;
			  }

			  //Collision with player
			  let mx = -canvas.width / 2 + players[i].mousePos.x + players[i].pos.x;
			  let my = -canvas.height / 2 + players[i].mousePos.y + players[i].pos.y;
			  if (Math.sqrt((mx - enemy.x) ** 2 + (my - enemy.y) ** 2) < 20 + enemy.radius*2 && enemy.shattered < 0 && players[i].hero == 'gunslinger' && enemy.dead == false && players[i].world !== "Central Crossing" && players[i].world !== "Strenuous Survival" && enemy.type != 'mousepulse' && !enemy.immune) {
				if (enemy.deadTime < 3000){
					enemy.deadTime = 3000;
				}
				if (enemy.disableTime < 3000){
					enemy.disableTime = 3000;
				}
				this.touched = [];
				this.touched.push(0);
				if (this.touched.length > 1){
					this.killed = true;
				}
			  } else if(Math.sqrt((mx - enemy.x) ** 2 + (my - enemy.y) ** 2) < enemy.radius && enemy.shattered < 0 && players[i].retaliating != true && enemy.type == 'mousepulse'){
				enemy.pulseTimer -= delta*2;
			  }
				if (players[i].clay > 0 && players[i].warps.amount <= 0) {
					if (players[i].inGame && players[i].op != true && players[i].harden == false) {
					  if (Math.sqrt((players[i].pos.x - enemy.x) ** 2 + (players[i].pos.y - enemy.y) ** 2) < players[i].radius + players[i].clay * 2 + enemy.radius && enemy.shattered < 0 && players[i].retaliating != true && enemy.dead == false) {
						if(enemy.corrosive == false){
						  if (players[i].invincible == false) {
							//Be hu
							players[i].invincible = true;
							players[i].clayTimer = 200;
							players[i].clay = Math.max(players[i].clay - 1, 0);
							players[i].pushClay = true;
						  }
						}else{
						  players[i].dead = true;
						  players[i].deadChanged = true;
						}
					  }
					}
				  } else if (players[i].newtonian == false) {
					if (players[i].inGame && players[i].op != true && players[i].harden == false) {
					  if (enemy.x !== undefined && enemy.y !== undefined && Math.sqrt((players[i].pos.x - enemy.x) ** 2 + (players[i].pos.y - enemy.y) ** 2) < players[i].radius + players[i].clay * 2 + enemy.radius && enemy.shattered < 0 && players[i].retaliating != true && enemy.dead == false && players[i].warps.amount <= 0) {
						// THIS IS FPS RELIANT IF SERVER FPS IS CHANGED MUST CHNAGE THIS PART (DONT DELETE)
						if (Math.sqrt((enemy.x - enemy.lastx) ** 2 + (enemy.y - enemy.lasty) ** 2) / (delta / 30) > 7 || enemy.radius > Math.sqrt(3) * 17) {
						  if (players[i].invincible == false) {
							players[i].dead = true;
							players[i].deadChanged = true;
						  } else {
							players[i].bandage = false;
						  }
						}
					  }
					}
				  }else if(players[i].warps.amount > 0 && players[i].inGame && !players[i].op && players[i].dead && (players[i].hero == 'warper' || players[i].hero == '???')){
					if (Math.sqrt((players[i].pos.x - enemy.x) ** 2 + (players[i].pos.y - enemy.y) ** 2) < players[i].radius + players[i].clay * 2 + enemy.radius) {
						enemy.dead = true;
						enemy.deadTime = 5000;
						enemy.killed = true;
						enemy.deadChanged = true;
					}

					for (let mapId of Object.keys(enemies)) {
						  const map = enemies[mapId];
						  for (let areaId of Object.keys(map)) {
							const area = map[areaId];
							for(let touchedEnemy of area){
								if(Math.sqrt((players[i].pos.x - touchedEnemy.x) ** 2 + (players[i].pos.y - touchedEnemy.y) ** 2) < players[i].radius + players[i].clay * 2 + touchedEnemy.radius + 300 && touchedEnemy.type !== 'immune' && players[i].warps.type == false){
									if (touchedEnemy.deadTime < 180000){
										touchedEnemy.deadTime = 180000;
									  }
									  if (touchedEnemy.disableTime < 200000){
										touchedEnemy.disableTime = 200000;
									  }
									  this.touched = [];
									  this.touched.push(0);
									  if (this.touched.length > 1){
										this.killed = true;
									  }
								}
							}
						}
					}
					
					if(!players[i].warps.type){
						players[i].pos.x = 100 + (Math.random() * 210);
						players[i].pos.y = 100 + (Math.random() * 315);
						players[i].xChanged = true;
						players[i].yChanged = true;
					}
					players[i].dead = false;
					players[i].invincible = true;
					if(players[i].hero == "warper"){
						players[i].invincibilityTimer = 1000;
					}
					players[i].changedInvincibility = true;
					players[i].deadChanged = true;
					if(players[i].warps.type){
						players[i].warps.amount -= delta/60;
						if (players[i].invincible == false && players[i].warps.amount < 0) {
							players[i].dead = true;
							players[i].deadChanged = true;
						}
					} else {
						players[i].warps.amount--;
					}
				} else {
					if(enemy.friend < 0 /*&& !(players[i].hero == 'auto' && enemy.type == 'wall')*/){
						if (players[i].inGame && players[i].op != true && players[i].harden == false) {
							if (Math.sqrt((players[i].pos.x - enemy.x) ** 2 + (players[i].pos.y - enemy.y) ** 2) < players[i].radius + enemy.radius && enemy.shattered < 0 && players[i].retaliating != true && enemy.dead == false) {
								if (players[i].invincible == false) {
								players[i].dead = true;
								players[i].deadChanged = true;
								//console.log(enemy);
								} else {
								if(enemy.corrosive == false){
									players[i].bandage = false;
								} else{
									players[i].bandage = false;
									players[i].dead = true;
									players[i].deadChanged = true;
								}
							}
						}
						}
					} else {
						if (Math.sqrt((players[i].pos.x - enemy.x) ** 2 + (players[i].pos.y - enemy.y) ** 2) < players[i].radius + enemy.radius) {
							players[i].dead = false;
							players[i].deadChanged = true;
						}
						for (let otherEnemy of area) {
							if(otherEnemy != enemy && Math.sqrt((otherEnemy.x - enemy.x) ** 2 + (otherEnemy.y - enemy.y) ** 2) < enemy.radius + otherEnemy.radius && !otherEnemy.immune && otherEnemy.friend < 0){
								if (otherEnemy.deadTime < 10000){
									otherEnemy.deadTime = 10000;
								}
								if (otherEnemy.disableTime < 12000){
								otherEnemy.disableTime = 12000;
								}
							}
						}
					}
				  }
			  	}
          	  }
        	}

			
			/*for(let i in players){
				if(players[i].hero == 'auto' && players[i].world != 'Central Crossing' && players[i].world != 'Strenuous Survival' && !players[i].dead){
					let closestDist = 0.8;
					for (let enemy of area){
						if(Math.abs(enemy.x - players[i].pos.x) < 300 && Math.abs(enemy.y - players[i].pos.y) < 300 && !enemy.dead && enemy.type != 'wall'){
							let rawDistance = 1/(Math.sqrt((players[i].pos.x - enemy.x) ** 2 + (players[i].pos.y - enemy.y) ** 2));
							let amountToPushX = 0;
							let amountToPushY = 0;
							if(players[i].pos.x - enemy.x > 0){
								amountToPushX = rawDistance;
							} else {
								amountToPushX = -rawDistance;
							}

							if(players[i].pos.y - enemy.y > 0){
								amountToPushY = rawDistance;
							} else {
								amountToPushY = -rawDistance;
							}
							
							players[i].pos.x += amountToPushX**2*100000;
							players[i].pos.y -= amountToPushY**2*100000;
							//if(Math.sqrt((enemy.x - players[i].pos.x)**2 + (enemy.y - players[i].pos.y)**2) < players[i].radius + enemy.radius + enemy.speed+50){// <- is where enemy will be
								//if(Math.abs(Math.atan2(players[i].pos.y - enemy.y, players[i].pos.x - enemy.x) - Math.atan2(enemy.y - enemy.lasty, enemy.x - enemy.lastx)) < 1/2*Math.PI){ // Player and enemy are within 90 degrees of each other
									//players[i].pos.x += enemy.vx*20;
									//players[i].pos.y += enemy.vy*20;
								//}
								//players[i].xChanged = true;
								//players[i].yChanged = true;
							//}
						}
					}
					//players[i].pos.x+=Math.min(closestDist/10,0.08);
					players[i].xChanged = true;
					players[i].yChanged = true;
				}
			}*/
      	}
    }
}

	for (let i in players) {
		//Push player update pack into array
		for (let j in players) {
      if(players[j].id != players[i].id && players[j].inGame == true && (players[i].dead == true || players[j].dead == true)){
        if (players[i].clay > 0) {
          if (Math.sqrt((players[i].pos.x - players[j].pos.x) ** 2 + (players[i].pos.y - players[j].pos.y) ** 2) < players[i].radius + players[i].clay * 2 + players[j].radius && players[i].dead == false && players[i].permaNewtonian == false && players[i].area == players[j].area && players[i].world == players[j].world) {
            players[j].dead = false;
            players[j].deadChanged = true;
          }
        } else if (Math.sqrt((players[i].pos.x - players[j].pos.x) ** 2 + (players[i].pos.y - players[j].pos.y) ** 2) < players[i].radius + players[j].radius && players[i].dead == false && players[i].permaNewtonian == false && players[i].area == players[j].area && players[i].world == players[j].world) {
          players[j].dead = false;
          players[j].deadChanged = true;
        }
      }
		}
    if(players[i].inGame){
      playerPack.push(players[i].getUpdatePack());
    }
    
	}

  /*for (let i in players) {
    players[i].playerUpdatePack.push(players[i].getUpdatePack());
    if(players[i].inGame){
      for(let j in players) {
        if(players[j].id != players[i].id){
          if(players[j].inGame == true){
            players[i].playerUpdatePack.push(players[j].getUpdatePack());
          }
        }
      }
    }
  }*/

	for (let i in players) {
		if (players[i].inGame) {
			//Send player update pack to client
      if(playerPack.length > 0){
        players[i].client.send(msgpack.encode({ pu: playerPack }));
      }
      //players[i].playerUpdatePack = [];

			//Send enemy init pack to client
			if (players[i].enemyInitPack.length > 0) {
				players[i].client.send(msgpack.encode({ ei: players[i].enemyInitPack }));
				players[i].enemyInitPack = [];
			}

			//Send enemy update pack to client
			if (players[i].enemyUpdatePack.length > 0) {
				players[i].client.send(msgpack.encode({ eu: players[i].enemyUpdatePack }));
				players[i].enemyUpdatePack = [];
			}


			//Send player update pack to client

			//Send projectile init pack to client
			if (players[i].projectileInitPack.length > 0) {
				players[i].client.send(msgpack.encode({ pri: players[i].projectileInitPack }));
				players[i].projectileInitPack = [];
			}

			//Send projectile update pack to client
			if (players[i].projectileUpdatePack.length > 0) {
				players[i].client.send(msgpack.encode({ pru: players[i].projectileUpdatePack }));
				players[i].projectileUpdatePack = [];
			}
		}
	}

  //Reset player pack array
  playerPack = [];

  for (let i in players){
    if(players[i].deathTimer < 0){
      if(players[i].toDestroy == false){
        players[i].client.send(msgpack.encode({ dc: "lose" }));
        players[i].toDestroy = true;
      }else{
        players[i].client.close()
      }
    }
    if(players[i].won){
      if(players[i].toDestroy == false){
        players[i].client.send(msgpack.encode({ dc: "win" }));
        players[i].toDestroy = true;
      }else{
        players[i].client.close()
      }
    }
  }

  if(enemyId > 9999){
    enemyId = 0;
  }
}

setInterval(() => {
	let time = ms();
	mainLoop();
	let timeTaken = ms() - time;
	if (timeTaken > 250) {
		console.log("An update took " + timeTaken + "ms");
	}
}, 1000 / 30);

console.log("App listening to Server " + PORT);
