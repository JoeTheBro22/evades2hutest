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

const map = require("./map");
const { Player } = require("./player");
const { Enemy } = require("./enemy");
const { Projectile } = require("./projectiles");

//The clientId
let id = 1;

//Ids for enemies
let enemyId = 0;

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
			} else if (d.kD == '11') {
				// v key
			} else if (d.kD == '12') {
				// b key
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
			}  else if(d.chat.slice(0,5) == "/skip" || d.chat.slice(0,5) == "/goto" ){
				if(player.op){
					player.areaSkipRight = parseInt(d.chat.slice(5));
					d.chat = "";
				}
			}  else if (d.chat == "/reset" || d.chat == "/r" || d.chat == "/res") {
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

		//Player initialization (Client hit Play button)
		if (d.begin) {
			player.inGame = true;
			player.name = d.begin;

			if (d.hero != "magmax" && d.hero != "rameses" && d.hero != "parvulus" && d.hero != "ptah" && d.hero != "jotunn" && d.hero != "kindle" && d.hero != "neuid" && d.hero != "orbital" && d.hero != "cimex" && d.hero != "janus" && d.hero != "turr" && d.hero != "gunslinger") {
				d.hero = "magmax";
			}
			player.hero = d.hero;

			player.mouseOn = false;


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
						let newEnemy = new Enemy({ type: enemyInfo.type, radius: enemyInfo.radius, speed: enemyInfo.speed, world: players[clientId].world, area: players[clientId].area, id: enemyId, count: enemyInfo.amount, index: i, path: enemyInfo.path })

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
const PORT = process.env.PORT || 6942;
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

			if (players[i].worldTeleported == true) {
				players[i].worldTeleported = false;
				players[i].teleported = false;
				//If player changed areas or worlds then:
				//tell client to reset enemies and projectiles
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
									if (projectile.type == "guard") {
										if (players[j].id != projectile.parentId) {
											players[j].client.send(msgpack.encode({
												prr: true
											}));
										}
									} else {
										players[j].client.send(msgpack.encode({
											prr: true
										}));
									}
									if (projectile.type == "guard") {
										projectile.area = players[projectile.parentId].area;
										projectile.world = players[projectile.parentId].world;
									}
									let initPack = projectile.getInitPack();
									players[j].projectileInitPack.push(initPack);

								}
							}
						}
					}
				}
				if (checkPlayersInOldWorld(players[i]) == false) {
					enemies[players[i].oldWorld][players[i].area] = [];
					projectiles[players[i].oldWorld][players[i].area] = [];
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

								let newEnemy = new Enemy({ type: enemyInfo.type, radius: enemyInfo.radius, speed: enemyInfo.speed, world: players[i].world, area: players[i].area, id: id, count: enemyInfo.amount, index: k, path: enemyInfo.path })

								//Push to object
								enemies[players[i].world][players[i].area].push(newEnemy);
								enemyIdsInUse.push(id);

								players[i].enemyInitPack.push(newEnemy.getInitPack());
							}
						}
					}
				} else {
					for (let enemy of enemies[players[i].world][players[i].area]) {
						players[i].enemyInitPack.push(enemy.getInitPack());
					}
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
									if (projectile.type == "guard") {
										if (players[j].id != projectile.parentId) {
											players[j].client.send(msgpack.encode({
												prr: true
											}));
										}
									} else {
										players[j].client.send(msgpack.encode({
											prr: true
										}));
									}
									if (projectile.type == "guard") {
										projectile.area = players[projectile.parentId].area;
										projectile.world = players[projectile.parentId].world;
									}
									if (projectile.area == players[j].area && projectile.world == players[j].world) {
										let initPack = projectile.getInitPack();
										players[j].projectileInitPack.push(initPack);
									}
								}
							}
						}
					}
				}
				if (checkPlayersInOldArea(players[i]) == false) {
					enemies[players[i].world][players[i].oldArea] = [];
					projectiles[players[i].world][players[i].oldArea] = [];
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

								let newEnemy = new Enemy({ type: enemyInfo.type, radius: enemyInfo.radius, speed: enemyInfo.speed, world: players[i].world, area: players[i].area, id: id, count: enemyInfo.amount, index: k, path: enemyInfo.path })

								//Push to object
								enemies[players[i].world][players[i].area].push(newEnemy);
								enemyIdsInUse.push(id);

								players[i].enemyInitPack.push(newEnemy.getInitPack());
							}
						}
					}
				} else {
					for (let enemy of enemies[players[i].world][players[i].area]) {
						players[i].enemyInitPack.push(enemy.getInitPack());
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
            area.splice(area.indexOf(projectile), 1);
          }
        }
      }
    }
		// make suyre to do if(projectile.killed == true)
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

          for (let i in players) {
            //If same area
            if (players[i].area == enemy.area && players[i].world == enemy.world) {
              //Send update pack
              players[i].enemyUpdatePack.push(enemy.getUpdatePack());

              //Collision with player
			  let canvas = { width: 1280, height: 720 };
			  let mx = -canvas.width / 2 + players[i].mousePos.x + players[i].pos.x;
			  let my = -canvas.height / 2 + players[i].mousePos.y + players[i].pos.y;
			  if (Math.sqrt((mx - enemy.x) ** 2 + (my - enemy.y) ** 2) < 20 + enemy.radius*2 && enemy.shattered < 0 && players[i].retaliating != true && enemy.dead == false && players[i].hero == 'gunslinger') {
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
			  }
              if (players[i].clay > 0) {
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
                  if (Math.sqrt((players[i].pos.x - enemy.x) ** 2 + (players[i].pos.y - enemy.y) ** 2) < players[i].radius + players[i].clay * 2 + enemy.radius && enemy.shattered < 0 && players[i].retaliating != true && enemy.dead == false) {
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
              } else {
                if (players[i].inGame && players[i].op != true && players[i].harden == false) {
                  if (Math.sqrt((players[i].pos.x - enemy.x) ** 2 + (players[i].pos.y - enemy.y) ** 2) < players[i].radius + enemy.radius && enemy.shattered < 0 && players[i].retaliating != true && enemy.dead == false) {
                    if (players[i].invincible == false) {
                      players[i].dead = true;
                      players[i].deadChanged = true;
                    } else {
                      if(enemy.corrosive == false){
                        players[i].bandage = false;
                      }else{
                        players[i].bandage = false;
                        players[i].dead = true;
                        players[i].deadChanged = true;
                      }
                    }
                  }
                }
              }
            }
          }
        }
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