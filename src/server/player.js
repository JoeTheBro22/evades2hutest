const { Projectile, createProjectile } = require("./projectiles");
const { map } = require("./map");

let canvas = { width: 1280, height: 720 };

class Player {
	constructor(id, client) {
		this.id = id;
		this.name = "";
		this.pos = { x: 100 + (Math.random() * 210), y: 100 + (Math.random() * 315) };
		this.areaX = 1;
		this.areaY = 1;
		this.radius = 17.14;
		this.baseRadius = 17.14;
		this.lastRadius = 17.14;
    this.turrets = [];
		this.timer = 0;
    this.regen = 1;
    this.lastRegen = 1;
    this.maxEnergy = 30;
    this.energy = 30;
    this.lastEnergy = 30;
    this.lastMaxEnergy = 30;
		this.zLock = false;
		this.xLock = false;
		this.left = false; this.right = false; this.up = false; this.down = false; this.shift = false;
		this.speed = 17;
		this.vel = { x: 0, y: 0 };
		this.inGame = false;
		this.world = "Corrupted Core";
		this.area = "1";
		this.oldWorld = this.world;
		this.oldArea = this.area;
		this.mouseOn = false;
		this.mousePos = { x: 0, y: 0 };
		this.addEnemy = { state: false, type: 'normal', radius: 10, speed: 5, world: this.world, area: this.area, id: null, count: 1, index: null};
		this.teleported = false;
		this.client = client;
    this.playerUpdatePack = [];
		this.enemyInitPack = [];
		this.enemyUpdatePack = [];
		this.enemyRemovePack = [];
		this.projectileInitPack = [];
		this.projectileUpdatePack = [];
		this.projectileRemovePack = [];
		this.lastVel = { x: 0, y: 0 }
		this.op = false;
		if (this.op) {
			this.speed = 17;
			this.maxSpeedReached = true;
		}
    this.maxEnergyReached = false;
    this.maxRegenReached = false;
		this.dead = false;
		this.speedMult = 1;
		this.disabled = false;
		this.areaSkipLeft = false;
		this.areaSkipRight = 0;
		this.hero = "";
		this.x = false;
		this.worldTeleported = false;
		this.z = false;
		this.ability1 = false;
		this.ability2 = false;
		this.usingFirstAbilityChanged = false;
		this.ability1cooldown = 0;
		this.ability2cooldown = 0;
		this.harden = false;
		this.flow = false;
		this.ability1toggler = 1;
		this.ability2toggler = 1;
		this.deadChanged = false;
		this.retaliatingTimer = 0;
		this.maxSpeedReached = false;
		this.areaSkipTen = false;
		this.bandage = false;
		this.invincibilityTimer = 45;
		this.invincible = false;
		this.frozen = 0;
		this.frozenChanged = false;
		this.slippery = false;
		this.slipped = false;
		this.slippedvx = 0;
		this.slippedvy = 0;
		this.pushBand = false;
		this.putBandOnTimer = 360;
		this.storeBandOnTimer = this.putBandOnTimer;
		this.puttingOnBand = false;
		this.pushClay = false;
		this.retaliating = false;
		this.lastvx = 0;
		this.lastvy = 0;
		this.speedChanged = false;
    	this.deathTimer = 60;
		this.areaWidth = 3085.74;
		this.areaHeight = 514.29;
		//console.log(map[this.world].width);
		// Ptah

		this.clay = 0;
		this.clayTime = 6000; // constant
		this.clayTimer = 0;
		this.clayDelay = 0;

		// neuid

		this.newtonian = true;
		this.newtonianChanged = false;
		this.newtonianTimer = 0;
		this.permaNewtonian = false;

		// kindle

		// orbital

		this.oradius = 0; // orbit radius
		this.destoRadius = 0; // destination radius
		this.guardAlertTimer = 0;
		this.guards = [];

		// Thornstick
		this.thorns = [];
		
		//Flylie

		//cimex

		this.web = null;

		// janus

		this.portals = [];
		this.portalCharge = 0;

    //Death stuff

    this.toDestroy = false;
    this.won = false;
    this.xChanged = false;
    this.yChanged = false;

	// Warper
	this.warps = { amount: 0, type: false };
	this.warpDebt = 0;
	}
	getUpdatePack() {
    let sendId = false;
		let pack = {};
    if(this.xChanged){
      pack.x = Math.round(this.pos.x);
      this.xChanged = false;
      sendId = true;
    }
    if(this.yChanged){
      pack.y = Math.round(this.pos.y);
      this.yChanged = false;
      sendId = true;
    }
		if (this.area != this.oldArea) {
			pack.a = this.area;
      sendId = true;
		}
		if (this.world != this.oldWorld) {
			pack.w = this.world;
      sendId = true;
		}
    if (this.energy != this.lastEnergy){
      pack.e = Math.max(Math.round(this.energy * 10)/10, 0);
      sendId = true;
    }
    if (this.maxEnergy != this.lastMaxEnergy){
      pack.max = this.maxEnergy;
      sendId = true;
    }
    if (this.lastRegen != this.regen){
      pack.regen = Math.floor(this.regen * 10)/10;
      sendId = true;
    }
		if (this.deadChanged) {
			pack.d = this.dead;
			this.deadChanged = false;
      sendId = true;
		}
		if(this.deathTimerChanged){
			pack.dT = Number(this.deathTimer.toFixed(0));
      sendId = true;
		}
		if (this.hero == "magmax") {
			if (this.ability1toggler == 2) {
				pack.f = true;
        sendId = true;
			} else if (this.ability1toggler == 4) {
				pack.f = false;
        sendId = true;
			}
			if (this.ability2toggler == 2) {
				pack.h = true;
        sendId = true;
			} else if (this.ability2toggler == 4) {
				pack.h = false;
        sendId = true;
			}
			if (this.disabled == true) {
				pack.f = false;
				pack.h = false;
        sendId = true;
			}
		} else if (this.hero == "rameses") {
			if (this.pushBand) {
				pack.inv = this.bandage;
        this.pushBand = false;
        sendId = true;
			}
		}

		if (this.pushClay) {
			pack.c = this.clay;
			this.pushClay = false;
      sendId = true;
		}

		if (this.newtonianChanged == true) {
			pack.n = this.newtonian;
			this.newtonianChanged = false;
      sendId = true;
		}

		if (this.lastRadius != this.radius) {
			pack.r = this.radius;
      sendId = true;
		}
		if (this.usingFirstAbilityChanged) {
			pack.uZ = this.usingFirstAbility;
      sendId = true;
		}
		if (this.changedInvincibility != undefined) {
			pack.ret = this.retaliating;
      sendId = true;
		}
		if (this.speedChanged) {
			pack.s = this.speed;
      sendId = true;
		}
    if(this.frozenChanged){
      pack.fr = this.frozen;
      sendId = true;
    }

	if(this.ability1cooldown > 0 && this.ability1cooldown != undefined){
		pack.ab1cd = this.ability1cooldown;
		sendId = true;
	}
	if(this.areaWidth != undefined){
		pack.aw = this.areaWidth;
		sendId = true;
	}
	if(this.areaHeight != undefined){
		pack.ah = this.areaHeight;
		sendId = true;
	}

	if(this.warps != undefined){
		pack.wps = this.warps;
		sendId = true;
	}

	if(this.addEnemy.state == true && this.addEnemy != undefined){
		pack.ae = this.addEnemy;
		sendId = true;
	}

	if(this.ability2cooldown > 0 && this.ability2cooldown != undefined){
		pack.ab2cd = this.ability2cooldown;
		sendId = true;
	}

	if(this.mousePos != undefined){
		pack.msp = this.mousePos;
		sendId = true;
	}

    if(sendId){
      pack.id = this.id;
    }

		return pack;
	}
	getInitPack() {
		let pack = {
			x: Math.round(this.pos.x),
			y: Math.round(this.pos.y),
			id: this.id,
			name: this.name,
			area: this.area,
			world: this.world,
			hero: this.hero,
			dead: this.dead,
			inv: this.invincible,
			speed: this.speed,
			ab1cd: this.ability1cooldown,
			ab2cd: this.ability2cooldown,
			energy: this.energy,
			maxEnergy: this.maxEnergy,
			regen: this.regen,
			msp: this.mousePos,
			ae: this.addEnemy,
			wps: this.warps,
			aw: this.areaWidth,
			ah: this.areaHeight,
		};
		if (this.clay > 0) {
			pack.clay = this.clay;
		}
		if (this.newtonian == false) {
			pack.newt = false;
		}
		if(this.deathTimer < 60){
			pack.dTimer = Number(this.deathTimer.toFixed(0));
		}
		if (this.hero == "magmax") {
			if (this.ability1toggler == 2) {
				pack.flow = true;
			} else if (this.ability1toggler == 4) {
				pack.flow = false;
			}
			if (this.ability2toggler == 2) {
				pack.harden = true;
			} else if (this.ability2toggler == 4) {
				pack.harden = false;
			}
		}
		else if (this.hero == "parvulus") {
			pack.radius = this.radius;
			pack.usingZ = this.usingFirstAbility;
			pack.ret = this.retaliating;
		}
		return pack;
	}
	move(delta, enemies) {
		if (map[this.world].width !== undefined){
			this.areaWidth = map[this.world].width[this.area-1];
		}
		if (map[this.world].height !== undefined){
			this.areaHeight = map[this.world].height[this.area-1];
		}
    	this.lastMaxEnergy = this.maxEnergy;
    	this.lastRegen = this.regen;
		this.lastVel.x = this.vel.x;
		this.lastVel.y = this.vel.y;
    	let currentX = this.pos.x;
    	let currentY = this.pos.y;


		//Reset velocity
		this.vel.x = 0;
		this.vel.y = 0;
		
		const _deadTimer = this.deathTimer;
		if(this.dead){
			this.deathTimer -= delta / 1000;
		} else {
			this.deathTimer = 60;
		}
		this.deathTimerChanged = false;
		if(this.deathTimer != _deadTimer){
			this.deathTimerChanged = true;
		}
		if(this.frozen > 0){
			this.frozenChanged = true;
		}
		this.slippery = this.slipped;
		this.slipped = false;
		this.frozen -= delta;
		this.oldArea = this.area;
		this.oldWorld = this.world;
		this.lastRadius = this.radius;
		delta /= 30;

		if (this.disabled == true) {
			this.harden = false;
			this.flow = false;
			this.z = false;
			this.x = false;
			this.ability1toggler = 4;
			this.ability2toggler = 4;
			this.retaliating = false;
		}

		if(this.slippery == false){
		if (this.mouseOn == false) {
			//Keyboard movement
			if (this.right) {
				this.vel.x = this.speed;
			} else if (this.left) {
				this.vel.x = -this.speed;
			}
			if (this.up) {
				this.vel.y = -this.speed;
			} else if (this.down) {
				this.vel.y = this.speed;
			}

			if (this.vel.x != 0) {
				this.lastvx = this.vel.x;
			}
			if (this.vel.y != 0) {
				this.lastvy = this.vel.y;
			}

      if(this.right || this.left){
        this.xChanged = true;
      }
      if(this.up || this.down){
        this.yChanged = true;
      }

			if (!this.left && !this.right && (this.top || this.down)) {
				this.lastvx = 0;
			}
			if (!this.up && !this.down && (this.left || this.right)) {
				this.lastvy = 0;
			}
		} else {
			//Mouse movement
			let dx = canvas.width / 2 - this.mousePos.x;
			let dy = canvas.height / 2 - this.mousePos.y;
			let distance = Math.sqrt(dx * dx + dy * dy);
			distance /= 12;
			let angle = Math.atan2(dy, dx);
			if (distance > this.speed) {
				distance = this.speed;
			}
			this.vel.x = Math.cos(angle) * distance * -1;
			this.vel.y = Math.sin(angle) * distance * -1;

			if (this.vel.x != 0) {
				this.lastvx = this.vel.x;
			}
			if (this.vel.y != 0) {
				this.lastvy = this.vel.y;
			}
		}
		} else {
			this.vel.x = this.slippedvx;
			this.vel.y = this.slippedvy;
		}

		this.vel.x *= 26 / (26 + this.clay);
		this.vel.y *= 26 / (26 + this.clay);

    if(this.vel.x != 0){
      this.xChanged = true;
    }
    if(this.vel.y != 0){
      this.yChanged = true;
    }

		if (this.shift && this.world != 'Acclimating Acceleration') {
			// Shift (slows hero by 2)
			this.vel.x /= 2;
			this.vel.y /= 2;
		}

		if (this.speedMult != 1) {
			this.vel.x *= this.speedMult;
			this.vel.y *= this.speedMult;
			this.speedMult = 1;
		}

		if (this.flow) {
			let velDif = (this.speed + 7.5) / this.speed;
			this.vel.x *= velDif;
			this.vel.y *= velDif;
		}

		if (this.puttingOnBand) {
			this.vel.x /= 2;
			this.vel.y /= 2;
		}
		if (this.retaliating && this.hero == "parvulus") {
			this.vel.x /= 2;
			this.vel.y /= 2;
		}
		if (this.web != null && this.hero == "cimex") {
			this.vel.x *= 0.8;
			this.vel.y *= 0.8;
		}
		if (this.hero == "parvulus") {
			this.vel.x *= (17.14 / this.radius) / 4 + 3/4;
			this.vel.y *= (17.14 / this.radius) / 4 + 3/4;
		}

		//Move hero
		if (this.dead == false && this.harden == false && this.frozen <= 0) {
			this.pos.x += this.vel.x * delta;
			this.pos.y += this.vel.y * delta;
		}

		//Dev hacks
		if (this.areaSkipLeft) {
			this.pos.x = 69 + this.radius;
			this.areaSkipLeft = false;
		}

		if (this.areaSkipRight > 0) {
			this.oldArea = this.area;
			this.area = Number(this.area) + Number(this.areaSkipRight-1);
			this.teleported = true;
			this.maxSpeedReached = true;
			this.speed = 17;
			this.regen+=this.areaSkipRight;
      		this.maxEnergy += 4*this.areaSkipRight;
      		this.speedChanged = true;
			this.pos.x = 2674.29 + 1028.6;
			this.areaSkipRight = 0;
		}

		//Collisions:
		if (this.area == 1) {
			if (map[this.world].width !== undefined){
				this.areaWidth = map[this.world].width[this.area-1];
			} else {
				this.areaWidth = 3085.74;
			}
			if (map[this.world].height !== undefined){
				this.areaHeight = map[this.world].height[this.area-1];
			} else {
				this.areaHeight = 514.29;
			}
			if (this.pos.x - this.radius < 0) {
				//Stops at left wall at spawn (area is 1)
				this.pos.x = this.radius;
			}
		} else if (this.pos.x - this.radius < 68.57) {
			//Goes to the end of the previous area (area is not 1)
			if (map[this.world].width !== undefined){
				this.areaWidth = map[this.world].width[this.area-1];
			} else {
				this.areaWidth = 3085.74;
			}
			if (map[this.world].width !== undefined){
				this.pos.x = map[this.world].width[this.area-2] + 617.15 - this.radius;
			} else {
				this.pos.x = this.areaWidth + 617.15 - this.radius;
			}
			if (map[this.world].height !== undefined){
				this.areaHeight = map[this.world].height[this.area-1];
			} else {
				this.areaHeight = 514.29;
			}
			this.oldArea = this.area;
			this.area--;
			if(this.warps.amount > 0){
				this.warps.amount--;
			} else {
				this.warpDebt--;
			}
			if (this.maxSpeedReached == false) {
				this.speed -= 1.5;
				this.speedChanged = true;
			}
      if (this.maxRegenReached == false){
        this.regen -= 0.1;
      }
      if (this.maxEnergyReached == false){
        this.maxEnergy -= 4;
      }
			this.teleported = true;
		}

		if (map[this.world].width !== undefined){
			this.areaWidth = map[this.world].width[this.area-1];
		}
		if(this.areaWidth === undefined){
			this.areaWidth = 3085.74;
		}
		if (map[this.world].height !== undefined){
			this.areaHeight = map[this.world].height[this.area-1];
		}
		if(this.areaHeight === undefined){
			this.areaHeight = 514.29;
		}
		if (this.world == "Methodical Monastery Hard" || this.world == "Crazy Cosmos" || this.world == "Crazy Cosmos Hard" || this.world == "Methodical Monastery" || this.world == 'Tireless Trek' || this.world == "Central Crossing" || this.world == "Terrifing Trials") {
			if (this.area < 41) {
				if (this.pos.x + this.radius > this.areaWidth + 617.15) {
					//GOes to the start of the next area (area is not victory)
					this.pos.x = 69 + this.radius;
					this.oldArea = this.area;
					if(this.warpDebt >= 0){
						if(this.warps.amount < 10){
							if(this.hero == 'warper'){
								this.warps.amount++;
							}
						}
					} else {
						this.warpDebt++;
					}
					this.area++;
					if (this.maxSpeedReached == false) {
						this.speed += 1.5;
						this.speedChanged = true;
					}
          this.maxEnergy += 4;
          this.regen += 0.1;
					this.teleported = true;
				}
			} else {
				if (this.pos.x + this.radius > this.areaWidth + 617.15) {
					//Reached the last area, stops at the wall (area is victory)
          this.won = true;
				}
			}
		} else if(this.world == 'Acclimating Acceleration'){
			this.speedMult = 1 + this.area/40; // will be 1.5x the speed at 20
			this.speedChanged = true;
			if (this.area < 20) {
				if (this.pos.x + this.radius > this.areaWidth + 617.15) {
					//GOes to the start of the next area (area is not victory)
					this.pos.x = 69 + this.radius;
					this.oldArea = this.area;
					if(this.warpDebt >= 0){
						if(this.warps.amount < 10){
							if(this.hero == 'warper'){
								this.warps.amount++;
							}
						}
					} else {
						this.warpDebt++;
					}
					this.area++;
          			this.maxEnergy += 4;
          			this.regen += 0.1;
					this.teleported = true;
				}
			} else {
				if (this.pos.x + this.radius > this.areaWidth + 617.15) {
					this.area = 0;
          			this.world = 'Jarring Journey';
					this.speed = 17;
					this.speedChanged = true;
				}
			}
		} else if(this.world == 'Jarring Journey'){
			if (this.area < 21) {
				if (this.pos.x + this.radius > this.areaWidth + 617.15) {
					//GOes to the start of the next area (area is not victory)
					this.pos.x = 69 + this.radius;
					this.oldArea = this.area;
					this.area++;
					if(this.warpDebt >= 0){
						if(this.warps.amount < 10){
							if(this.hero == 'warper'){
								this.warps.amount++;
							}
						}
					} else {
						this.warpDebt++;
					}
					if (this.maxSpeedReached == false) {
						this.speed += 1.5;
						this.speedChanged = true;
					}
          			this.maxEnergy += 4;
          			this.regen += 0.1;
					this.teleported = true;
				}
			} else {
				if (this.pos.x + this.radius > this.areaWidth + 617.15) {
					//Reached the last area, stops at the wall (area is victory)
          			this.won = true;
				}
			}
		} else if(this.world == 'Make Your Own Map'){
			if (this.area < 81) {
				if (this.pos.x + this.radius > this.areaWidth + 617.15) {
					//GOes to the start of the next area (area is not victory)
					this.pos.x = 69 + this.radius;
					this.oldArea = this.area;
					this.area++;
					if(this.warpDebt >= 0){
						if(this.warps.amount < 10){
							if(this.hero == 'warper'){
								this.warps.amount++;
							}
						}
					} else {
						this.warpDebt++;
					}
					if (this.maxSpeedReached == false) {
						this.speed += 1.5;
						this.speedChanged = true;
					}
          			this.maxEnergy += 4;
          			this.regen += 0.1;
					this.teleported = true;
				}
			} else {
				if (this.pos.x + this.radius > this.areaWidth + 617.15) {
					//Reached the last area, stops at the wall (area is victory)
          			this.won = true;
				}
			}
		} else if (this.world == "Strange Space") {
			if (this.area < 21) {
				if (this.pos.x + this.radius > this.areaWidth + 617.15) {
					//GOes to the start of the next area (area is not victory)
					this.pos.x = 69 + this.radius;
					this.oldArea = this.area;
					this.area++;
					if(this.warpDebt >= 0){
						if(this.warps.amount < 10){
							if(this.hero == 'warper'){
								this.warps.amount++;
							}
						}
					} else {
						this.warpDebt++;
					}
					if (this.maxSpeedReached == false) {
						this.speed += 1.5;
						this.speedChanged = true;
					}
          this.maxEnergy += 4;
          this.regen += 0.1;
					this.teleported = true;
				}
			} else {
				if (this.pos.x + this.radius > this.areaWidth + 617.15) {
					//Reached the last area, stops at the wall (area is victory)
          this.won = true;
				}
			}
    } else if (this.world == "Corrupted Core") {
			if (this.area < 82) {
				if (this.pos.x + this.radius > this.areaWidth + 617.15) {
					//GOes to the start of the next area (area is not victory)
					this.pos.x = 69 + this.radius;
					this.oldArea = this.area;
					this.area++;
					if(this.warpDebt >= 0){
						if(this.warps.amount < 10){
							if(this.hero == 'warper'){
								this.warps.amount++;
							}
						}
					} else {
						this.warpDebt++;
					}
					if (this.maxSpeedReached == false) {
						this.speed += 1.5;
						this.speedChanged = true;
					}
          this.maxEnergy += 4;
          this.regen += 0.1;
					this.teleported = true;
				}
			} else {
				if (this.pos.x + this.radius > this.areaWidth + 617.15) {
					//Reached the last area, stops at the wall (area is victory)
          this.won = true;
				}
			}
    } else if (this.world == "Monumental Migration") {
			if (this.area < 481) {
				if (this.pos.x + this.radius > this.areaWidth + 617.15) {
					//GOes to the start of the next area (area is not victory)
					this.pos.x = 69 + this.radius;
					this.oldArea = this.area;
					this.area++;
					if(this.warpDebt >= 0){
						if(this.warps.amount < 10){
							if(this.hero == 'warper'){
								this.warps.amount++;
							}
						}
					} else {
						this.warpDebt++;
					}
					if (this.maxSpeedReached == false) {
						this.speed += 1.5;
						this.speedChanged = true;
					}
          this.maxEnergy += 4;
          this.regen += 0.1;
					this.teleported = true;
				}
			} else {
				if (this.pos.x + this.radius > this.areaWidth + 617.15) {
					//Reached the last area, stops at the wall (area is victory)
          this.won = true;
				}
			}
    } else if (this.world == "Crowded Cavern" || this.world == "Crowded Cavern Hard" || this.world == "Toilsome Traverse" || this.world == "Arduous Abyss") {
			if (this.area < 81) {
				if (this.pos.x + this.radius > this.areaWidth + 617.15) {
					//GOes to the start of the next area (area is not victory)
					this.pos.x = 69 + this.radius;
					this.oldArea = this.area;
					this.area++;
					if(this.warpDebt >= 0){
						if(this.warps.amount < 10){
							if(this.hero == 'warper'){
								this.warps.amount++;
							}
						}
					} else {
						this.warpDebt++;
					}
					if (this.maxSpeedReached == false) {
						this.speed += 1.5;
						this.speedChanged = true;
					}
          this.maxEnergy += 4;
          this.regen += 0.1;
					this.teleported = true;
				}
			} else {
				if (this.pos.x + this.radius > this.areaWidth + 617.15) {
					//Reached the last area, stops at the wall (area is victory)
          this.won = true;
				}
			}
    } else {
			if (this.area < 481) {
				if (this.pos.x + this.radius > this.areaWidth + 617.15) {
					//GOes to the start of the next area (area is not victory)
					this.pos.x = 69 + this.radius;
					this.oldArea = this.area;
					this.area++;
					if(this.warpDebt >= 0){
						if(this.warps.amount < 10){
							if(this.hero == 'warper'){
								this.warps.amount++;
							}
						}
					} else {
						this.warpDebt++;
					}
					if (this.maxSpeedReached == false) {
						this.speed += 1.5;
						this.speedChanged = true;
					}
          this.maxEnergy += 4;
          this.regen += 0.1;
					this.teleported = true;
				}
			} else {
				if (this.pos.x + this.radius > this.areaWidth + 617.15) {
					//Reached the last area, stops at the wall (area is victory)
          this.won = true;
				}
			}
		}
		if (this.pos.x - this.radius < 342.86 && this.area == 1) {
			//If area is one and it can collide with teleporters to switch world: (will need to change this when new worlds come into play)

			if (this.pos.y - this.radius + this.areaHeight - 514.29 < 68.57) {
				this.pos.y = 445.72 + this.areaHeight - 514.29 - this.radius;
				this.oldWorld = this.world;
				let currentWorldIndex = map[this.world].index;
				this.worldTeleported = true;

				for (let i of Object.keys(map)) {
					if (map[i].index == currentWorldIndex + 1) {
						this.world = i;
						break;
					}
				}
				if (this.world == this.oldWorld) {
					this.world = "Corrupted Core";
				}

			} else if (this.pos.y + this.radius > 445.72) {
				this.pos.y = 68.57 + this.radius;
				this.oldWorld = this.world;
				let currentWorldIndex = map[this.world].index;
				for (let i of Object.keys(map)) {
					if (map[i].index == currentWorldIndex - 1) {
						this.world = i;
						break;
					}
				}
				this.worldTeleported = true;
				if (this.world == this.oldWorld) {
					let largestIndex = 0;
					let name = "Corrupted Core";
					for (let i of Object.keys(map)) {
						if (map[i].index > largestIndex) {
							largestIndex = map[i].index;
							name = i;
						}
					}
					this.world = name;
				}
				if(map[this.world].width !== undefined){
					this.areaWidth = map[this.world].width[this.area-1];
				}
				if(this.areaWidth === undefined){
					this.areaWidth = map[this.world].width[map[this.world].width.length - 1];
					if (this.areaWidth === undefined){
						this.areaWidth = 3085.74;
					}
				}
				if(map[this.world].height !== undefined){
					this.areaHeight = map[this.world].height[this.area-1];
				}
				if(this.areaHeight === undefined){
					this.areaHeight = map[this.world].height[map[this.world].height.length - 1];
					if (this.areaHeight === undefined){
						this.areaHeight = 514.29;
					}
				}
			}
		} else {
			//Normal wall collision
			if (this.pos.y - this.radius < 0) {
				this.pos.y = this.radius;
				this.slippery = false;
			} else if (this.pos.y + this.radius > this.areaHeight) {
				this.pos.y = this.areaHeight - this.radius;
				this.slippery = false;
			}
		}

		if (this.speed > 17) {
			this.maxSpeedReached = true;
			this.speed = 17;
		}
    if (this.regen > 7){
      this.maxRegenReached = true;
      this.regen = 7;
    }
    if (this.maxEnergy > 300){
      this.maxEnergyReached = true;
      this.maxEnergy = 300;
    }

    if(this.pos.x != currentX){
      this.xChanged = true;
    }
    if(this.pos.y != currentY){
      this.yChanged = true;
    }
	}
ability(delta, enemies, projectiles) {
	if(this.world == "Central Crossing"){
		return;
	}
    this.lastEnergy = this.energy;
    this.energy += delta * this.regen / 1000;
    if (this.energy > this.maxEnergy){
      this.energy = this.maxEnergy;
    }
    if (this.energy < 0){
      this.energy = 0;
    }
		if (this.hero == "parvulus" || this.hero == "ptah") {
			this.timer += delta;
		}
		this.ability1cooldown -= delta;
		this.ability2cooldown -= delta;

		if (this.hero == "parvulus") {
			if (this.timer > 1250) {
				if (this.radius > 17.14 * 0.6) {
					this.timer -= 1250;
					this.radius -= 17.14 / 20;
				}
			}
		}
		if (this.disabled == false) {
			if (this.hero == "magmax") {
				if (this.dead == false) {
					if (this.harden == false) {
						if (this.z) {
							if (this.ability1toggler == 1) {
								this.flow = true;
                this.harden = false;
								this.ability1toggler = 2;
							} else if (this.ability1toggler == 3) {
								this.flow = false;
								this.ability1toggler = 4;
							}
						} else {
							if (this.ability1toggler == 2) {
								this.ability1toggler = 3;
							} else if (this.ability1toggler == 4) {
								this.ability1toggler = 1;
							}
						}
					}

					if (this.x) {
						if (this.ability2toggler == 1) {
							this.harden = true;
              this.flow = false;
							this.ability2toggler = 2;
						} else if (this.ability2toggler == 3) {
							this.harden = false;
							this.ability2toggler = 4;
						}
					} else {
						if (this.ability2toggler == 2) {
							this.ability2toggler = 3;
						} else if (this.ability2toggler == 4) {
							this.ability2toggler = 1;
						}
					}
				} else {
					this.harden = false;
					this.flow = false;
					this.ability1toggler = 1;
					this.ability2toggler = 1;
          
				}

        if (this.flow){
          this.energy -= delta * 2 / 1000;
        }
        if (this.harden){
          this.energy -= delta * 12 / 1000;
        }
        if (this.energy < 0){
          this.flow = false;
          this.harden = false;
          this.ability1toggler = 4;
          this.ability2toggler = 4;
          this.energy = 0;
        }
			}
			else if (this.hero == "rameses") {
				if (this.z) {
					if (this.bandage == false && this.energy > 50 && this.puttingOnBand != true) {
            this.energy -= 50;
						this.puttingOnBand = true;
					}
				}
			} else if (this.hero == "ptah") {
				if (this.x && this.clay > 1 && this.clayDelay <= 0 && this.energy >= 25) {
          this.energy -= 25;
					let angle = 0;
					if (this.lastvx < 0) {
						if (this.lastvy < 0) {
							angle = 225;
						} else if (this.lastvy > 0) {
							angle = 135;
						} else {
							angle = 180;
						}
					} else if (this.lastvx > 0) {
						if (this.lastvy < 0) {
							angle = 315;
						} else if (this.lastvy > 0) {
							angle = 45;
						} else {
							angle = 0;
						}
					} else {
						if (this.lastvy < 0) {
							angle = 270;
						} else if (this.lastvy > 0) {
							angle = 90;
						} else {
							angle = 0;
						}
					}

					if (this.mouseOn == true) {
						angle = Math.atan2(this.lastvy, this.lastvx) * 180 / Math.PI;
					}
					createProjectile(this.pos.x, this.pos.y, "clay", 22 + this.clay * 2, 20, (angle * Math.PI / 180), this.world, this.area, projectiles, this.id);
					this.clay -= 1;
					this.timer = 0;
					this.clayDelay = 6000;
					this.pushClay = true;
				}
			} else if (this.hero == "parvulus") {
				let old = this.usingFirstAbility;
				let lastInvincible = this.retaliating;
				if (this.dead || this.radius > 17.1) {
					this.usingFirstAbility = false;
				}
				else {
					this.retaliatingTimer -= delta;
					if (this.x && !this.xLock && this.energy >= 25) {
            this.energy -= 25;
						if (this.radius < 17.14 * 0.61) {
							this.radius = 17.14;
							this.timer = 0;
							this.retaliatingTimer = 2000;
							this.retaliating = true;
						}
					}
					if (this.retaliatingTimer < 0) {
						this.retaliating = false;
					}
					if (!this.x) {
						this.xLock = false;
					}
					if (this.z && !this.zLock && this.energy >= 10) {
						this.usingFirstAbility = !this.usingFirstAbility;
						if (!this.usingFirstAbility) {
              this.energy -= 10;
							this.timer = 0;
							for (let i of Object.keys(enemies)) {
								let enemy = enemies[i];
								if (Math.sqrt(Math.pow(enemy.x - this.pos.x, 2) + Math.pow(enemy.y - this.pos.y, 2)) < 300 + enemy.radius && !enemy.immune) {
									if (enemy.dwindleFactor > ((this.radius / 17.14) * 1.5 - 0.5)) {
										enemy.dwindleFactor = ((this.radius / 17.14) * 1.5 - 0.5);
									}
									enemy.dwindleTime = 4000;
								}
							}
							this.radius += 17.14 * 0.2;
							if (this.radius > 17.14) {
								this.radius = 17.14;
							}
						}
						this.zLock = true;
					}
					if (!this.z) {
						this.zLock = false;
					}
				}
				if (old != this.usingFirstAbility) {
					this.usingFirstAbilityChanged = true;
				}
				else {
					this.usingFirstAbilityChanged = false;
				}
				if (lastInvincible != this.retaliating) {
					this.changedInvincibility = true;
				}
				else {
					this.changedInvincibility = false;
				}
				if (this.retaliating) {
					for (let i of Object.keys(enemies)) {
						const enemy = enemies[i];
						if (Math.sqrt(Math.pow(enemy.x - this.pos.x, 2) + Math.pow(enemy.y - this.pos.y, 2)) < this.radius + enemy.radius + 100) {
							enemy.retaliated = 6000;
						}
					}
				}
			}
		}

		//Passives
		if (this.hero == "ptah") {
			this.clayDelay -= delta;
			if (this.dead || this.clay == 4) {
				this.timer = 0;
			}
			if (this.timer > this.clayTime) {
				this.clay = Math.min(this.clay + 1, 4);
				this.pushClay = true;
				this.timer = this.timer / this.clayTime;
			}
		}
		if (this.hero == "jotunn") {
			this.timer -= delta;
			if (this.dead == false) {
				let used = false;
				for (let i of Object.keys(enemies)) {
					const enemy = enemies[i];
					if (Math.sqrt(Math.pow(enemy.x - this.pos.x, 2) + Math.pow(enemy.y - this.pos.y, 2)) < this.radius + enemy.radius + 170) {
						enemy.decay++;
						if (this.x && this.timer < 0 && this.energy >= 30) {
							used = true;
							enemy.shattered = 4000;
						}
					}
				}
				if (used) {
          			this.energy -= 30;
					this.ability2cooldown = 100;
					this.timer = 6000;
				}
			}
		}
		if (this.hero == "neuid") {
			if (this.permaNewtonian == false) {
				this.newtonianTimer -= delta;
			} else {
				this.newtonianTimer = 1;
			}
			if (this.newtonianTimer <= 0) {
				if (this.newtonian == false) {
					this.newtonianChanged = true;
				}
				this.newtonian = true;
			} else {
				if (this.newtonian == true) {
					this.newtonianChanged = true;
				}
				this.newtonian = false;

			}
			if (this.z && this.ability1cooldown < 0 && this.permaNewtonian == false && this.energy >= 10) {
        this.energy -= 10;
				this.newtonianChanged = true;
				this.newtonianTimer = 3000;
				this.ability1cooldown = 8000;
			}
			if (this.x) {
				if (this.ability2cooldown < 0) {
					if (this.permaNewtonian == true) {
						this.permaNewtonian = false;
						this.ability2cooldown = 20000;
					} else {
						this.permaNewtonian = true;
						this.ability2cooldown = 100;
						this.newtonianChanged = true;
						this.newtonianTimer = 1;
						this.newtonian = true;
					}
				}
			}
		}

		if (this.hero == "kindle") {
			if (!this.dead) {
				if (this.z && this.ability1cooldown < 0 && this.energy >= 20) {
          this.energy -= 20;
					this.ability1cooldown = 9000;
					let angle = 0;
					if (this.lastvx < 0) {
						if (this.lastvy < 0) {
							angle = 225;
						} else if (this.lastvy > 0) {
							angle = 135;
						} else {
							angle = 180;
						}
					} else if (this.lastvx > 0) {
						if (this.lastvy < 0) {
							angle = 315;
						} else if (this.lastvy > 0) {
							angle = 45;
						} else {
							angle = 0;
						}
					} else {
						if (this.lastvy < 0) {
							angle = 270;
						} else if (this.lastvy > 0) {
							angle = 90;
						} else {
							angle = 0;
						}
					}

					if (this.mouseOn == true) {
						angle = Math.atan2(this.lastvy, this.lastvx) * 180 / Math.PI;
					}
					createProjectile(this.pos.x, this.pos.y, "kindleBomb", 22, 20, (angle * Math.PI / 180), this.world, this.area, projectiles, this.id);
				}
				if (this.x && this.ability2cooldown < 0 && this.energy >= 15) {
          this.energy -= 15;
					this.ability2cooldown = 8000;
					for (let i of Object.keys(enemies)) {
						const enemy = enemies[i];
						if (Math.sqrt(Math.pow(enemy.x - this.pos.x, 2) + Math.pow(enemy.y - this.pos.y, 2)) < this.radius + enemy.radius + 170) {
							if (enemy.ignitedTimer < 1000) {
								enemy.ignitedTimer = 1000;
								enemy.fireX = this.pos.x;
								enemy.fireY = this.pos.y;
								enemy.fireId = Math.random();
							}
						}
					}
				}
			}
		}

		if (this.hero == "flylie") {
			if (!this.dead) {
				if (this.z && this.ability1cooldown < 0 && this.energy >= 20) {
          			this.energy -= 20;
					this.ability1cooldown = 4500;
					let latcherAngle = 0;
					if (this.lastvx < 0) {
						if (this.lastvy < 0) {
							latcherAngle = 225;
						} else if (this.lastvy > 0) {
							latcherAngle = 135;
						} else {
							latcherAngle = 180;
						}
					} else if (this.lastvx > 0) {
						if (this.lastvy < 0) {
							latcherAngle = 315;
						} else if (this.lastvy > 0) {
							latcherAngle = 45;
						} else {
							latcherAngle = 0;
						}
					} else {
						if (this.lastvy < 0) {
							latcherAngle = 270;
						} else if (this.lastvy > 0) {
							latcherAngle = 90;
						} else {
							latcherAngle = 0;
						}
					}

					if (this.mouseOn == true) {
						latcherAngle = Math.atan2(this.lastvy, this.lastvx) * 180 / Math.PI;
					}
					createProjectile(this.pos.x, this.pos.y, "wallLatcher", 22, 20, (latcherAngle * Math.PI / 180), this.world, this.area, projectiles, this.id);
				}
				if (this.x && this.ability2cooldown <= 0 && this.dead == false && this.energy >= 10) {
					this.energy -= 10;
					this.ability2cooldown = 1000;
					let furthestEnemy = null;
					for (let i of Object.keys(enemies)) {
						let enemy = enemies[i];
						if (Math.sqrt(Math.pow(enemy.x - this.pos.x, 2) + Math.pow(enemy.y - this.pos.y, 2)) < 210 + enemy.radius) {
							if(furthestEnemy === null || enemy.x > furthestEnemy.x){
								furthestEnemy = enemy;
							}
						}
					}
					if(furthestEnemy !== null){
						this.pos.x = furthestEnemy.x;
						this.pos.y = furthestEnemy.y;
						this.xChanged = true;
						this.yChanged = true;
						this.invincibilityTimer = 740;
						this.invincible = true;
						this.lastInvincible = Date.now();
					}
				}

				/**/
				//2nd ability "force" with aura is 2.5 sec cooldown
			}
		}

		if (this.hero == "orbital") {
			this.oradius += Math.max(Math.min(this.destoRadius - this.oradius, 5), -5);
			this.guardAlertTimer -= delta;
			if (this.guardAlertTimer <= 0) {
				this.destoRadius = 150;
			} else {
				this.destoRadius = 40;
			}
			if (this.z && this.ability1cooldown <= 0 && this.dead == false && this.energy >= 20) {
        this.energy -= 20;
				this.ability1cooldown = 30000;
				this.oradius = 0;
				this.destoRadius = 150;
				for (let guard of this.guards) {
					guard.killed = true;
				}
				this.guards = [];
				this.guards.push(createProjectile(this.pos.x, this.pos.y, "guard", 17, 0, 0, this.world, this.area, projectiles, this.id));
				this.guards.push(createProjectile(this.pos.x, this.pos.y, "guard", 17, 0, 72, this.world, this.area, projectiles, this.id));
				this.guards.push(createProjectile(this.pos.x, this.pos.y, "guard", 17, 0, 144, this.world, this.area, projectiles, this.id));
				this.guards.push(createProjectile(this.pos.x, this.pos.y, "guard", 17, 0, 216, this.world, this.area, projectiles, this.id));
				this.guards.push(createProjectile(this.pos.x, this.pos.y, "guard", 17, 0, 288, this.world, this.area, projectiles, this.id));
			}
			if (this.x && this.ability2cooldown <= 0 && this.guards.length > 0 && this.dead == false && this.energy >= 5) {
        this.energy -= 5;
				this.guardAlertTimer = 1500;
				this.ability2cooldown = 3000;
			}
		}

		if (this.hero == "thornstick") {
			this.guardAlertTimer -= delta;
			if (this.z && this.ability1cooldown <= 0 && this.dead == false && this.energy >= 20) {
        		this.energy -= 20;
				this.ability1cooldown = 15000;
				for (let thorn of this.thorns) {
					thorn.killed = true;
				}
				this.thorns = [];
				this.thorns.push(createProjectile(this.pos.x, this.pos.y, "thorn", 20, 0, 0, this.world, this.area, projectiles, this.id));
				this.thorns.push(createProjectile(this.pos.x, this.pos.y, "thorn", 20, 0, 90, this.world, this.area, projectiles, this.id));
				this.thorns.push(createProjectile(this.pos.x, this.pos.y, "thorn", 20, 0, 180, this.world, this.area, projectiles, this.id));
				this.thorns.push(createProjectile(this.pos.x, this.pos.y, "thorn", 20, 0, 270, this.world, this.area, projectiles, this.id));
			}
			if (this.x && this.ability2cooldown <= 0 && this.thorns.length > 0 && this.dead == false && this.energy >= 10) {
        		this.energy -= 10;
				this.guardAlertTimer = 3000;
				this.ability2cooldown = 7000;
			}
		}

		if(this.hero == 'warper' && this.x && this.ability2cooldown <= 0){
			this.ability2cooldown = 500;
			this.warps.type = !this.warps.type;
			this.warps.amount = Math.round(this.warps.amount);
		}

		if (this.hero == "cimex") {
			if (this.teleported || this.worldTeleported) {
				if (this.web != null) {
					this.web.killed = true;
					this.web = null;
				}
			}
      if (this.web != null){
        this.energy -= delta/1000 * 10;
        if (this.energy < 0){
          this.energy = 0;
          this.web.killed = true;
          this.web = null;
        }
      }
			if (this.dead) {
				if (this.web != null) {
					this.web.killed = true;
					this.web = null;
				}
			}
			else {
				if (this.z && !this.zLock && this.energy >= 10) {
          this.energy -= 10;
					if (this.web != null) {
						this.web.killed = true;
					}
					this.web = createProjectile(this.pos.x, this.pos.y, "web", this.radius / 4, 0, 0, this.world, this.area, projectiles, this.id);
					this.zLock = true;
				}
				if (!this.z) {
					this.zLock = false;
				}
				if (this.x && !this.xLock) {
					if (this.web != null) {
						for (let i of Object.keys(enemies)) {
							let enemy = enemies[i];
							if (Math.sqrt(Math.pow(enemy.x - this.web.x, 2) + Math.pow(enemy.y - this.web.y, 2)) < this.web.radius + enemy.radius && !enemy.immune) {
								if (enemy.deadTime < 3000) {
									enemy.deadTime = 3000;
								}
							}
						}
						this.web.killed = true;
						this.web = null;
					}
					this.xLock = true;
				}
				if (!this.x) {
					this.xLock = false;
				}
			}
		}

		if (this.hero == "janus") {
			this.portalCharge += delta;
			if (this.z && this.ability1cooldown < 0 && this.energy >= 30) {
        this.energy -= 30;
				this.ability1cooldown = 10000;
				let angle = 0;
				if (this.lastvx < 0) {
					if (this.lastvy < 0) {
						angle = 225;
					} else if (this.lastvy > 0) {
						angle = 135;
					} else {
						angle = 180;
					}
				} else if (this.lastvx > 0) {
					if (this.lastvy < 0) {
						angle = 315;
					} else if (this.lastvy > 0) {
						angle = 45;
					} else {
						angle = 0;
					}
				} else {
					if (this.lastvy < 0) {
						angle = 270;
					} else if (this.lastvy > 0) {
						angle = 90;
					} else {
						angle = 0;
					}
				}
				if (this.mouseOn == true) {
					angle = Math.atan2(this.lastvy, this.lastvx) * 180 / Math.PI;
				}
				for (let portal of this.portals) {
					portal.killed = true;
				}
				this.portals = [];
				const spawnInFront = 100; // how much it spawns in front
				// speed property will be how far it is from player
				this.portalCharge = Math.min(Math.max(this.portalCharge, 10000), 30000);
				this.portals.push(createProjectile(this.pos.x, this.pos.y, "portal", 30, spawnInFront, angle * Math.PI / 180, this.world, this.area, projectiles, this.id));
				this.portals.push(createProjectile(this.pos.x, this.pos.y, "portal", 30, (this.portalCharge / 1000 - 10) * 15 + spawnInFront + 200, angle * Math.PI / 180, this.world, this.area, projectiles, this.id));

				this.portalCharge = 0;
			}
			if(this.x && this.portals.length > 0 && this.energy >= 20){
        this.energy -= 20;
				for (let portal of this.portals) {
					portal.killed = true;
					createProjectile(portal.x, portal.y, "portalBomb", 30, 0, 0, this.world, this.area, projectiles, this.id)
				}
				this.portals = [];

			}
		}

    if (this.hero == "turr"){
      this.ability1cooldown -= delta;
      if (this.ability1cooldown < 0 && this.z && this.energy >= 15){
        this.energy -= 15;
        this.ability1cooldown = 5000;
        this.turrets.push(createProjectile(this.pos.x, this.pos.y, "turr", this.radius * 2, 0, 0, this.world, this.area, projectiles, this.id));
      }
      if (this.x && this.energy >= 40 && this.xLock == false){
        this.xLock = true;
        let used = false;
        this.energy -= 40;
        for(let i of this.turrets){
          if (i.killed){
            this.turrets.splice(this.turrets.indexOf(i), 1);
          }
          else{
            used = true;
            i.emergency = true;
          }
        }
        if (!this.used){
          this.energy += 40;
        }
      }
      if (!this.x){
        this.xLock = false;
      }
    }

		if (this.hero != "rameses") {
			if (this.invincibilityTimer > 0) {
				this.invincibilityTimer -= delta;
			}
			if (this.clayTimer > 0) {
				this.clayTimer -= delta;
			}
			if (this.invincibilityTimer <= 0 && this.clayTimer <= 0) {
				this.invincible = false;
			}
		} else {
			if (this.puttingOnBand) {
				if (this.putBandOnTimer > 0) {
					this.putBandOnTimer--;
				}
			}

			if (this.putBandOnTimer <= 0) {
				this.bandage = true;
				this.invincible = true;
				this.invincibilityTimer = 45;
				this.pushBand = true;
				this.puttingOnBand = false;
				this.putBandOnTimer = this.storeBandOnTimer;
			}

			if (this.bandage == false) {
				this.pushBand = true;
				if (this.invincibilityTimer > 0) {
					this.invincibilityTimer--;
				}
			}

			if (this.invincibilityTimer <= 0) {
				this.invincible = false;
			}
		}
	}
}

module.exports = {
	Player
}