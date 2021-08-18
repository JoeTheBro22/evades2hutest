if (this.clay > 1 && this.clayDelay <= 0) {
						if (this.clay == 2) {
							createProjectile(this.pos.x, this.pos.y, "clay", 20, 20, (0 * Math.PI / 180), this.world, this.area, projectiles, this.id);
							createProjectile(this.pos.x, this.pos.y, "clay", 20, 20, (180 * Math.PI / 180), this.world, this.area, projectiles, this.id);
						} else if (this.clay == 3) {
							createProjectile(this.pos.x, this.pos.y, "clay", 20, 20, (90 * Math.PI / 180), this.world, this.area, projectiles, this.id);
							createProjectile(this.pos.x, this.pos.y, "clay", 20, 20, (180 * Math.PI / 180), this.world, this.area, projectiles, this.id);
							createProjectile(this.pos.x, this.pos.y, "clay", 20, 20, (270 * Math.PI / 180), this.world, this.area, projectiles, this.id);
							createProjectile(this.pos.x, this.pos.y, "clay", 20, 20, (0 * Math.PI / 180), this.world, this.area, projectiles, this.id);
						} else if (this.clay == 4) {
							createProjectile(this.pos.x, this.pos.y, "clay", 20, 20, (0 * Math.PI / 180), this.world, this.area, projectiles, this.id);
							createProjectile(this.pos.x, this.pos.y, "clay", 20, 20, (60 * Math.PI / 180), this.world, this.area, projectiles, this.id);
							createProjectile(this.pos.x, this.pos.y, "clay", 20, 20, (120 * Math.PI / 180), this.world, this.area, projectiles, this.id);
							createProjectile(this.pos.x, this.pos.y, "clay", 20, 20, (180 * Math.PI / 180), this.world, this.area, projectiles, this.id);
							createProjectile(this.pos.x, this.pos.y, "clay", 20, 20, (240 * Math.PI / 180), this.world, this.area, projectiles, this.id);
							createProjectile(this.pos.x, this.pos.y, "clay", 20, 20, (300 * Math.PI / 180), this.world, this.area, projectiles, this.id);
						}
						this.clay -= 1;
						this.timer = 0;
						this.clayDelay = 100;
						this.pushClay = true;
					}