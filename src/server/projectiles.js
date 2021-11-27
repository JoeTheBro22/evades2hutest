const { map } = require("./map");

let areaBoundaries = { x: 342.86, y: 0, width: 3085.74, height: 514.29 };

function circular_move(x, y, r, a) {
	a *= Math.PI / 180;
	let px = x + r * Math.cos(a);
	let py = y + r * Math.sin(a);
	return { x: px, y: py }
}

class Projectile {
	constructor(options) {
		Object.assign(this, options);
		this.killed = false;
		this.toInit = true;
		this.vx = Math.cos(this.angle) * this.speed;
		this.vy = Math.sin(this.angle) * this.speed;
		this.spawnx = this.x;
		this.spawny = this.y;
		this.lastRadius = this.radius;
		this.guardAlertTimer = 0;
    	this.baseRadius = this.radius;
		this.exploding = false;
		if (map[this.world].width !== undefined){
			areaBoundaries.width = map[this.world].width[this.area-1];
		} else {
			areaBoundaries.width = 3085.74;
		}
		if (map[this.world].height !== undefined){
			areaBoundaries.height = map[this.world].height[this.area-1];
		} else {
			areaBoundaries.height = 514.29;
		}
		if (this.type == "clay" || this.type == "guard" || this.type == "orb" || this.type == "portal"|| this.type == "thorn" || this.type == "wallLatcher" || this.type == 'hook' || this.type == "totemShield") {
			this.touched = [];
		}
		if (this.type == "portal") {
			this.x += this.vx;
			this.y += this.vy;
			this.x = Math.min(Math.max(0, this.x), areaBoundaries.width + areaBoundaries.x * 2);
			this.y = Math.min(Math.max(0, this.y), areaBoundaries.height);
		}
		if (this.type == "kindleBomb") {
			this.life = 3000;
			this.explodeTime = 350;
		}
		else if (this.type == "portal") {
			this.life = 8000;
		} else if(this.type == "octoBullet"){
			this.life = 3000;
		} else if(this.type == "wallLatcher"){
			this.life = 10000;
		} else if(this.type == "friend"){
			this.life = 8000;
		} else {
			this.life = Infinity;
		}
		if (this.type == "portalBomb") {
			this.explodeTime = 150;
		}
    if (this.type == "turr"){
      this.life = 10000;
      this.reload = 100;
      this.emergencyTimer = 1000;
      this.angle = 0;
      this.lastEmergency = false;
    }
    if (this.type == "turrBullet"){
      this.life = 2000;
      this.touched = [];
    }
		this.growSpeed = 1;
	}
	getUpdatePack() {
		let pack = {
			x: Math.round(this.x * 50) / 50,
			y: Math.round(this.y * 50) / 50,
			id: this.id,
			guardAlertTimer: this.guardAlertTimer,
		};
		if (this.killed == true) {
			pack.k = true;
		}
		if (this.radius != this.lastRadius) {
			pack.r = this.radius;
		}
    if (this.angle != undefined){
      pack.a = this.angle;
    }
    if (this.emergency != undefined){
      pack.e = this.emergency;
    }
		return pack;
	}
	getInitPack() {
		let pack = {
			x: Math.round(this.x * 50) / 50,
			y: Math.round(this.y * 50) / 50,
			radius: this.radius,
			type: this.type,
			area: this.area,
			world: this.world,
			id: this.id,
			guardAlertTimer: this.guardAlertTimer,
		};
    if (this.angle != undefined){
      pack.a = this.angle;
    }
    if (this.emergency != undefined){
      pack.e = this.emergency;
    }
		this.toInit = false;
		return pack
	}
	update(delta, players, enemies, projectiles) {
		if (map[this.world].width !== undefined){
			areaBoundaries.width = map[this.world].width[this.area-1];
		} else {
			areaBoundaries.width = 3085.74;
		}
		if (map[this.world].height !== undefined){
			areaBoundaries.height = map[this.world].height[this.area-1];
		} else {
			areaBoundaries.height = 514.29;
		}
		if (this.type == "portal" && this.toInit == true) {
			for (let p of Object.keys(players)) {
				const player = players[p];
				if (player.dead == false) {
					this.touched.push(player);
				}
			}
		}
		this.lastRadius = this.radius;
		if (!['portal', 'friend'].includes(this.type)) {
			if (this.type == "kindleBomb") {
				if (!this.exploding) {
					this.x += this.vx * delta / 30;
					this.y += this.vy * delta / 30;
				}
			}
			else {
				this.x += this.vx * delta / 30;
				this.y += this.vy * delta / 30;
			}
		}
		this.life -= delta;
		if (this.life < 0) {
			if (this.type != "kindleBomb") {
				this.killed = true;
			}
			else {
				this.exploding = true;
			}
		}
		if (!['guard', 'orb', 'totemShield', 'friend', 'web', 'portal', 'thorn', 'wallLatcher', 'sniperBullet', 'iceSniperBullet', 'octoBullet', 'speedSniperBullet', 'regenSniperBullet', 'tpBullet'].includes(this.type)) {
			if (this.x - this.radius < 0 || this.x + this.radius > areaBoundaries.width + areaBoundaries.x * 2 || this.y - this.radius < 0 || this.y + this.radius > areaBoundaries.height + areaBoundaries.y) {
				if (this.type != "kindleBomb") {
					this.killed = true;
				}
				else {
					this.exploding = true;
				}
			}
		}
		if (['sniperBullet', 'iceSniperBullet', 'octoBullet', 'speedSniperBullet', 'regenSniperBullet', 'tpBullet'].includes(this.type)) {
			if (this.x - this.radius < 342.86 || this.x + this.radius > areaBoundaries.width + areaBoundaries.x * 2 - 342.86 || this.y - this.radius < 0 || this.y + this.radius > areaBoundaries.height + areaBoundaries.y) {
				this.killed = true;
			}
		}

		switch (this.type) {
			case "clay": {
				for (let p of Object.keys(players)) {
					const player = players[p];
					if (player.inGame && player.area == this.area && player.world == this.world && player.clay == 0 && player.dead == false && player.id != this.parentId && player.hero != "rameses" && player.permaNewtonian == false) {
						if (Math.sqrt((player.pos.x - this.x) ** 2 + (player.pos.y - this.y) ** 2) < player.radius + player.clay * 2 + this.radius) {
							player.clay = 1;
							player.pushClay = true;
							this.killed = true;
						}
					}
				}
				for (let e of Object.keys(enemies)) {
					const enemy = enemies[e];
					if (this.touched.find(e => e.id == this.id) == undefined) {
						if (Math.sqrt((this.x - enemy.x) ** 2 + (this.y - enemy.y) ** 2) < this.radius + enemy.radius && this.type != "wall") {
							enemy.frozen = 2500;
							this.touched.push(enemy);
							players[this.parentId].timer += players[this.parentId].clayTime / 3;
						}
					}
				}
				if (Math.sqrt((this.spawnx - this.x) ** 2 + (this.spawny - this.y) ** 2) >= 1000) {
					this.killed = true;
				}
				break;
			}
      case "turr": {
		const parent = players[this.parentId];
		if(parent != undefined && this.radius == 10){
			this.x = parent.pos.x;
			this.y = parent.pos.y;
			this.xChanged = true;
			this.yChanged = true;
			this.speed = 1;
		}
        this.reload -= delta;
        let min = 600;
        let enemyId = null;
		if(Object.keys(enemies) !== undefined){
			for(let i of Object.keys(enemies)){
				const enemy = enemies[i];
				if (Math.sqrt((this.x - enemy.x) ** 2 + (this.y - enemy.y) ** 2) < min && !enemy.immune && (enemy.deadTime < 0 || enemy.disableTime < 0)) {
				  min = Math.sqrt((this.x - enemy.x) ** 2 + (this.y - enemy.y) ** 2);
				  enemyId = i;
				}
			}
		}
        if (enemyId != null){
          this.angle = Math.atan2(enemies[enemyId].y - this.y, enemies[enemyId].x - this.x);
        }
        if (this.reload < 0 && enemyId != null){
          this.reload = 1600;
          let angle = Math.atan2(enemies[enemyId].y - this.y, enemies[enemyId].x - this.x);
		  if(this.radius == 10){
			createProjectile(this.x, this.y, "turrBullet", this.radius, 18, angle,  this.world, this.area, projectiles, null);
		  } else {
			createProjectile(this.x, this.y, "turrBullet", this.radius / 2.5, 25, angle,  this.world, this.area, projectiles, null);
			if (this.emergency){
			createProjectile(this.x, this.y, "turrBullet", this.radius / 2.5, 25, angle + 0.15,  this.world, this.area, projectiles, null);
			createProjectile(this.x, this.y, "turrBullet", this.radius / 2.5, 25, angle - 0.15,  this.world, this.area, projectiles, null);
			}
		  }
        }
        if (this.emergency == true){
          this.emergencyTimer -= delta;
          this.reload -= delta * 6;
          if (this.emergencyTimer < 0){
            this.killed = true;
          }
        }
        break;
      }
	  case "wallLatcher": {
		const parent = players[this.parentId];
		if (parent == undefined) {
			this.killed = true;
			break;
		}
		if (this.y - this.radius < 0 || this.y + this.radius > areaBoundaries.height + areaBoundaries.y) {
			this.killed = true;
		}
		if(this.x - this.radius < 342.86 || this.x + this.radius > areaBoundaries.width + areaBoundaries.x * 2 - 342.86){
			if(this.x - this.radius < 342.86){
				this.x = this.radius + 342.86 + 1;
			}
			if(this.x + this.radius > areaBoundaries.width + areaBoundaries.x * 2 - 342.86){
				this.x = areaBoundaries.width + areaBoundaries.x * 2 - 342.86 - this.radius - 1;
			}
			if(this.vx < 0){
				this.vx = Math.abs(this.vx);
			} else {
				this.vx = -Math.abs(this.vx);
			}
		}
		for(let i of Object.keys(enemies)){
			const enemy = enemies[i];
			if (Math.sqrt((this.x - enemy.x) ** 2 + (this.y - enemy.y) ** 2) < this.radius + enemy.radius && !enemy.immune && (enemy.deadTime < 0 || enemy.disableTime < 0)) {
			  if (enemy.deadTime < 2300){
				enemy.deadTime = 2300;
			  }
			  if (enemy.disableTime < 2300){
				enemy.disableTime = 2300;
			  }
			  this.touched.push(0);
			}
		}
	}
      case "turrBullet": {
        for(let i of Object.keys(enemies)){
          const enemy = enemies[i];
          if (Math.sqrt((this.x - enemy.x) ** 2 + (this.y - enemy.y) ** 2) < this.radius + enemy.radius && !enemy.immune && (enemy.deadTime < 0 || enemy.disableTime < 0)) {
            if (enemy.deadTime < 3000){
              enemy.deadTime = 3000;
            }
            if (enemy.disableTime < 3000){
              enemy.disableTime = 3000;
            }
            this.touched.push(0);
            if (this.touched.length > 2){
              this.killed = true;
            }
          }
        }
        break;
      }
			case "sniperBullet":
			case "octoBullet": {
				for (let i of Object.keys(players)) {
					if (players[i].clay > 0) {
						if (players[i].inGame && players[i].op != true && players[i].harden == false) {
							if (Math.sqrt((players[i].pos.x - this.x) ** 2 + (players[i].pos.y - this.y) ** 2) < players[i].radius + players[i].clay * 2 + this.radius && players[i].retaliating != true) {
								if (players[i].invincible == false) {
									players[i].invincible = true;
									players[i].clayTimer = 200;
									players[i].clay = Math.max(players[i].clay - 1, 0);
									players[i].pushClay = true;
									this.killed = true;
								}
							}
						}
					} else {
						if (players[i].inGame && players[i].op != true && players[i].harden == false && players[i].dead == false) {
							if (Math.sqrt((players[i].pos.x - this.x) ** 2 + (players[i].pos.y - this.y) ** 2) < players[i].radius + this.radius && players[i].retaliating != true) {
								if (players[i].invincible == false) {
									players[i].dead = true;
									players[i].deadChanged = true;
									this.killed = true;
								} else {
									players[i].bandage = false;
									this.killed = true;
								}
							}
						}
					}
				}
				break;
			}
			case "iceSniperBullet": {
				for (let i of Object.keys(players)) {
					if (players[i].inGame && players[i].op != true && players[i].dead == false) {
						if (Math.sqrt((players[i].pos.x - this.x) ** 2 + (players[i].pos.y - this.y) ** 2) < players[i].radius + players[i].clay * 2 + this.radius && players[i].retaliating != true && players[i].harden == false) {
							players[i].frozen = Math.max(players[i].frozen, 1000);
							players[i].frozenChanged = true;
							this.killed = true;
						}
					}
				}
				break;
			}
    		case "regenSniperBullet": {
				for (let i of Object.keys(players)) {
					if (players[i].inGame && players[i].op != true && players[i].dead == false) {
						if (Math.sqrt((players[i].pos.x - this.x) ** 2 + (players[i].pos.y - this.y) ** 2) < players[i].radius + players[i].clay * 2 + this.radius && players[i].retaliating != true) {
							this.killed = true;
						}
					}
				}
				break;
			}
    		case "speedSniperBullet": {
				for (let i of Object.keys(players)) {
					if (players[i].inGame && players[i].op != true && players[i].dead == false) {
						if (Math.sqrt((players[i].pos.x - this.x) ** 2 + (players[i].pos.y - this.y) ** 2) < players[i].radius + players[i].clay * 2 + this.radius && players[i].retaliating != true) {
							this.killed = true;
						}
					}
				}
				break;
			}
			case "tpBullet": {
				for (let i of Object.keys(players)) {
					if (players[i].inGame && players[i].op != true && players[i].dead == false) {
						if (Math.sqrt((players[i].pos.x - this.x) ** 2 + (players[i].pos.y - this.y) ** 2) < players[i].radius + players[i].clay * 2 + this.radius && players[i].retaliating != true) {
							for (let e of Object.keys(enemies)) {
								if(enemies[e].id == this.parentId){
									enemies[e].x = players[i].pos.x - Math.cos(this.angle) * 60;
									enemies[e].y = players[i].pos.y - Math.sin(this.angle) * 60;
								}
							}
							this.killed = true;
						}
					}
				}
				break;
			}
			case "kindleBomb": {
				for (let e of Object.keys(enemies)) {
					const enemy = enemies[e];
					if (Math.sqrt((this.x - enemy.x) ** 2 + (this.y - enemy.y) ** 2) < this.radius + enemy.radius) {
						this.exploding = true;
					}
				}
				if (this.exploding) {
					this.radius += delta / 1.5;
					this.explodeTime -= delta;
					if (this.explodeTime < 0) {
						this.killed = true;
					}
					for (let e of Object.keys(enemies)) {
						const enemy = enemies[e];
						if (Math.sqrt((this.x - enemy.x) ** 2 + (this.y - enemy.y) ** 2) < this.radius + enemy.radius) {
							if (enemy.deadTime < 3000) {
								enemy.deadTime = 3000;
							}
							if (enemy.disableTime < 7000) {
								enemy.disableTime = 7000;
							}
						}
					}
				}
				break;
			}
			case "portalBomb": {
				this.radius += delta;
				this.explodeTime -= delta;
				if (this.explodeTime < 0) {
					this.killed = true;
				}
				for (let e of Object.keys(enemies)) {
					const enemy = enemies[e];
					if (Math.sqrt((this.x - enemy.x) ** 2 + (this.y - enemy.y) ** 2) < this.radius + enemy.radius) {
						enemy.deadTime = Math.max(4000, enemy.deadTime);
					}
				}
				break;
			}
			case "web": {
				if (this.radius <= 499) {
					this.radius += delta / 55 * this.growSpeed;
					if (this.radius < 175) {
						this.growSpeed += delta / 500;
					}
					if (this.radius > 350) {
						this.growSpeed -= delta / 750;
					}
				}
				if (this.radius > 500) {
					this.radius = 500;
				}
				for (let e of Object.keys(enemies)) {
					const enemy = enemies[e];
					if (Math.sqrt((this.x - enemy.x) ** 2 + (this.y - enemy.y) ** 2) < this.radius + enemy.radius && !enemy.immune) {
						enemy.web = true;
					}
				}
				break;
			}
			case "guard": {
				const parent = players[this.parentId];
				if (parent == undefined) {
					this.killed = true;
					break;
				}
				let speed = 0;
				if(parent.totem == 'archery'){
					speed = 8*1.15 + parent.area/10*1.15;
					if (parent.guardAlertTimer > 0) speed = 50*1.15;
				} else {
					speed = 8 + parent.area/10;
					if (parent.guardAlertTimer > 0) speed = 50;
				}
				this.angle = (this.angle + speed * delta / 45) % 360;
				var pos;
				pos = circular_move(parent.pos.x, parent.pos.y, parent.oradius, this.angle);
				this.x = pos.x;
				this.y = pos.y;
				if(enemies && Object.keys(enemies).length > 0){
					for (let e of Object.keys(enemies)) {
						const enemy = enemies[e];
						if (Math.sqrt((this.x - enemy.x) ** 2 + (this.y - enemy.y) ** 2) < this.radius + enemy.radius && !enemy.immune) {
							enemy.deadTime = Math.max(enemy.deadTime, 1500);
						}
					}
				}
				if (this.touched.length > 23){
					this.killed = true;
				} 
				break;
			}
			case "hook": {
				const parent = players[this.parentId];
				if (parent == undefined) {
					this.killed = true;
					break;
				}
				if(Object.keys(enemies) !== undefined){
					let minDist = 999999;
					let closestEnemy = undefined;
					for(let i of Object.keys(enemies)){
						const enemy = enemies[i];
						if (Math.sqrt((this.x - enemy.x) ** 2 + (this.y - enemy.y) ** 2) < this.radius + enemy.radius + this.speed && !enemy.immune && enemy.friend < 0) {
							if(enemy.deadTime < 0 && enemy.disableTime < 0){
								this.touched.push(0);
								parent.enemiesTaken.push(enemies[i]);
							}
							if (enemy.deadTime < 1500){
								enemy.deadTime = 1500;
							}
							if (enemy.disableTime < 2500){
								enemy.disableTime = 2500;
							}
							enemies[i].x = this.x;
							enemies[i].y = this.y;
							enemies[i].xChanged = true;
							enemies[i].yChanged = true;
						} else {
							if(Math.sqrt((this.x - enemy.x) ** 2 + (this.y - enemy.y) ** 2) < minDist && !enemy.immune && enemy.friend < 0){
								minDist = Math.sqrt((this.x - enemy.x) ** 2 + (this.y - enemy.y) ** 2);
								closestEnemy = enemies[i];
							}
						}
					}
					if(closestEnemy !== undefined && this.touched.length < 3){
						var dX = closestEnemy.x - this.x;//closestEnemy
						var dY = closestEnemy.y - this.y;
						this.angle = Math.atan2(dY, dX);
						this.vx = Math.cos(this.angle) * this.speed;
						this.vy = Math.sin(this.angle) * this.speed;
					}
					
					if(this.touched.length >= 3){
						// return to startX
						var dx = parent.pos.x - this.x;
						var dy = parent.pos.y - this.y;
						this.angle = Math.atan2(dy, dx);
						this.vx = Math.cos(this.angle) * this.speed;
						this.vy = Math.sin(this.angle) * this.speed;
						if(Math.abs(dx) < 20 && Math.abs(dy) < 20){
							this.killed = true;
						}
					}
				}
				break;
			}
			case "orb": {
				const parent = players[this.parentId];
				if (parent == undefined) {
					this.killed = true;
					break;
				}
				let speed = 0;
				if(parent.totem == 'archery'){
					if (parent.guardAlertTimer > 0){
						speed = 16*1.15;
						this.radius = 80*1.15 + parent.clay*10*1.15;
					} else {
						this.radius = 60*1.15;
					}
				} else {
					if (parent.guardAlertTimer > 0){
						speed = 16;
						this.radius = 80 + parent.clay*10;
					} else {
						this.radius = 60;
					}
				}
				this.guardAlertTimer = parent.guardAlertTimer;
				this.angle = (this.angle + speed * delta / 45) % 360;
				var pos;
				pos = circular_move(parent.pos.x, parent.pos.y, parent.oradius, this.angle);
				this.x = pos.x;
				this.y = pos.y;
				for (let e of Object.keys(enemies)) {
					const enemy = enemies[e];
					if (Math.sqrt((this.x - enemy.x) ** 2 + (this.y - enemy.y) ** 2) < this.radius + enemy.radius && !enemy.immune) {
						this.touched.push(0);
						if(parent.guardAlertTimer > 0){
							if(enemy.shattered < 0){
								parent.addBandCounter++;
							}
							enemy.shattered = 4000;
						} else {
							if (enemy.disableTime < 6000){
								enemy.disableTime = 6000;
							}
						}
						
					}
				}
				break;
			}
			case "totemShield": {
				/*const parent = players[this.parentId];
				if (parent == undefined) {
					this.killed = true;
					break;
				}
				this.x = parent.x;
				this.y = parent.y;
				for (let e of Object.keys(enemies)) {
					const enemy = enemies[e];
					if (Math.sqrt((this.x - enemy.x) ** 2 + (this.y - enemy.y) ** 2) < this.radius + enemy.radius && !enemy.immune) {
						this.touched.push(0);
						enemy.web = true;
					}
				}
				break;*/
				const parent = players[this.parentId];
				if (parent == undefined) {
					this.killed = true;
					break;
				}
				this.x = parent.pos.x;
				this.y = parent.pos.y;
				for (let e of Object.keys(enemies)) {
					const enemy = enemies[e];
					if (Math.sqrt((this.x - enemy.x) ** 2 + (this.y - enemy.y) ** 2) < this.radius + enemy.radius && !enemy.immune) {
						this.touched.push(0);
						if (enemy.disableTime < 2500){
							enemy.disableTime = 2500;
						}
					}
				}
				break;
			}
			case "enemypusher": {
				if(Object.keys(enemies) !== undefined){
					for(let i of Object.keys(enemies)){
						const enemy = enemies[i];
						if (Math.sqrt((this.x - enemy.x) ** 2 + (this.y - enemy.y) ** 2) < this.radius + enemy.radius + this.speed && !enemy.immune) {
							if (enemy.deadTime < 1500){
								enemy.deadTime = 1500;
							}
							if (enemy.disableTime < 2500){
								enemy.disableTime = 2500;
							}
							  //enemies[i].x = this.x;
							  //enemies[i].y = this.y;
							  enemies[i].x += this.vx * delta / 30;
							  enemies[i].y += this.vy * delta / 30;
							  enemies[i].xChanged = true;
							 enemies[i].yChanged = true;
						}
					}
				}
				break;
			}
			/*case "friend": {
				this.x += this.vx * delta / 30;
				this.y += this.vy * delta / 30;
				for(let i of Object.keys(enemies)){
					const enemy = enemies[i];
					if (Math.sqrt((this.x - enemy.x) ** 2 + (this.y - enemy.y) ** 2) < this.radius + enemy.radius + this.speed && !enemy.immune) {
						if (enemy.deadTime < 8500){
							enemy.deadTime = 8500;
						}
						if (enemy.disableTime < 10000){
							enemy.disableTime = 10000;
						}
					}
				}
				if (this.x - this.radius < areaBoundaries.x) {
					this.x = areaBoundaries.x + this.radius;
					this.vx *= -1;
				} else if (this.x + this.radius > areaBoundaries.x + areaBoundaries.width) {
					this.x = areaBoundaries.x + areaBoundaries.width - this.radius;
					this.vx *= -1;
				}
				if (this.y - this.radius < areaBoundaries.y) {
					this.y = areaBoundaries.y + this.radius;
					this.vy *= -1;
				} else if (this.y + this.radius > areaBoundaries.y + areaBoundaries.height) {
					this.y = areaBoundaries.y + areaBoundaries.height - this.radius;
					this.vy *= -1;
				}
				break;
			}*/
			case "thorn": {
				const parent = players[this.parentId];
				if (parent == undefined) {
					this.killed = true;
					break;
				}
				if(this.angle == 0){
					this.x = parent.pos.x + this.radius * 5;
					this.y = parent.pos.y;
				} else if(this.angle == 90){
					this.x = parent.pos.x;
					this.y = parent.pos.y + this.radius * 5;
				} else if(this.angle == 180){
					this.x = parent.pos.x - this.radius * 5;
					this.y = parent.pos.y;
				} else if(this.angle == 270){
					this.x = parent.pos.x;
					this.y = parent.pos.y - this.radius * 5;
				} else {
					this.pos.x = parent.pos.x;
					this.pos.y = parent.pos.y;
				}
				this.guardAlertTimer = parent.guardAlertTimer;
				for (let e of Object.keys(enemies)) {
					const enemy = enemies[e];
					if(this.angle == 90 || this.angle == 270){
						if (Math.abs(this.y - enemy.y) < Math.abs(this.radius * 5 + enemy.radius) + 10 && Math.abs(this.x - enemy.x) < Math.abs(this.radius + enemy.radius) && enemy.type != "wall") {
							if(parent.guardAlertTimer < 0){
								this.touched.push(0);
								if(this.x > enemy.x){
									enemy.x = this.x + 2*this.radius + 1;
								} else {
									enemy.x = this.x - 2*this.radius - 1;
								}
							}	else {
								if (enemy.deadTime < 3000){
									enemy.deadTime = 3000;
								  }
								  if (enemy.disableTime < 3000){
									enemy.disableTime = 3000;
								  }
							}
						}
					} else {
						if (Math.abs(this.x - enemy.x) < Math.abs(this.radius * 5 + enemy.radius) + 10 && Math.abs(this.y - enemy.y) < Math.abs(this.radius + enemy.radius) && enemy.type != "wall") {
							if(parent.guardAlertTimer < 0){
								this.touched.push(0);
								if(this.y > enemy.y){
									enemy.y = this.y + 2*this.radius + 1;
								} else {
									enemy.y = this.y - 2*this.radius - 1;
								}
							} else {
								if (enemy.deadTime < 3000){
									enemy.deadTime = 3000;
								}
								if (enemy.disableTime < 3000){
								enemy.disableTime = 3000;
								}
							}
							
						}
					}
				}
				this.radius = 20 - this.touched.length;
				if (this.touched.length > 10){
					this.killed = true;
				}
				if(parent.dead && !this.killed){
					this.killed = true;
				}
				break;
			}
			case "portal": {
			const parent = players[this.parentId];
			if (parent == undefined) {
				this.killed = true;
			} else {
				const pair = parent.portals.find(e => e.id != this.id);
				if  (pair != undefined)  {
					for (let p of Object.keys(players)) {
						const player = players[p];
						if (Math.sqrt((player.pos.x - this.x) ** 2 + (player.pos.y - this.y) ** 2) < player.radius + player.clay * 2 + this.radius) {
							if (player.inGame && player.area == this.area && player.world == this.world && this.touched.find(e => e.id == player.id) == undefined) {
								this.touched.push(player);
								player.pos.x = pair.x;
								player.pos.y = pair.y;
								pair.touched.push(player);
							}
						} else {
							this.touched = this.touched.filter(e => e.id != player.id);
						}
					}
				}
			}
			for (let e of Object.keys(enemies)) {
				const enemy = enemies[e];
				if (Math.sqrt((this.x - enemy.x) ** 2 + (this.y - enemy.y) ** 2) < this.radius + enemy.radius && !enemy.immune) {
					if (enemy.disableTime < 3000){
					enemy.disableTime = 3000;
					}
				}
			}
        break;
      }
      default: break;
    }
  }
}

let projectileId = 0;

function createProjectile(x, y, type, radius, speed, angle, world, area, projectiles, parentId) {
  let newProjectile = new Projectile({ x: x, y: y, type: type, radius: radius, speed: speed, angle: angle, world: world, area: area, id: projectileId, parentId: parentId })

  if(newProjectile !== undefined){
	if(projectiles[world][area] !== undefined){
		projectiles[world][area].push(newProjectile);
	}
  }
  projectileId++;
  if(projectileId > 9999){
    projectileId = 0;
  }
  return newProjectile;
}

module.exports = {
  Projectile, createProjectile
}