const CALAMATOUS_CAVERN = {//idea for this map is to alternate between crazy hard sections (X7,X8,X9,X0s) and effect heavy stages (X3,X4,X5,X6)
  "index": 21,
  /*{
		type: ["icicle", "warp", "dasher"],
		amount: 28,
		radius: 8,
		speed: 5
	},
  {
		type: ["dasher", 'frog'],
		amount: 24,
		radius: 36,
		speed: 8
	}*/
  "1": [{//enemy highlight effect (everything else is dark but draws white circles around enemies)
		type: ["normal"],
		amount: 2,
		radius: 18,
		speed: 1
	}, {
		type: ["normal"],
		amount: 6,
		radius: 16,
		speed: 2.5
	}, {
		type: ["normal"],
		amount: 4,
		radius: 22,
		speed: 2
	}, {
		type: ["normal"],
		amount: 3,
		radius: 18,
		speed: 1
	}, {
		type: ["immune"],
		amount: 4,
		radius: 22,
		speed: 2
	}],
  "2": [{
    type: "normal",
    amount: 12,
    radius: 18,
    speed: 3
  }, {
		type: ["immune"],
		amount: 12,
		radius: 24,
		speed: 3
	}],
  "3": [{
    type: "normal",
    amount: 6,
    radius: 36,
    speed: 3
  }, {
    type: "normal",
    amount: 6,
    radius: 24,
    speed: 3
  }, {
		type: ["immune"],
		amount: 12,
		radius: 32,
		speed: 3
	}],
  "4": [{
    type: "normal",
    amount: 9,
    radius: 24,
    speed: 2
  }, {
    type: "normal",
    amount: 9,
    radius: 18,
    speed: 2
  }, {
		type: ["immune"],
		amount: 24,
		radius: 22,
		speed: 2
	}, {
		type: ["homing"],
		amount: 12,
		radius: 22,
		speed: 2
	}],
  "5": [{
    type: ["immune", "normal"],
    amount: 26,
    radius: 38,
    speed: 3
  }, {
    type: "homing",
    amount: 24,
    radius: 14,
    speed: 4
  }, {
    type: "slower",
    amount: 8,
    radius: 12,
    speed: 2
  }],
  "6": [{
    type: ["immune"],
    amount: 32,
    radius: 32,
    speed: 4
  }, {
    type: "homing",
    amount: 36,
    radius: 22,
    speed: 5
  }, {
    type: "slower",
    amount: 18,
    radius: 12,
    speed: 4
  }],
  "7": [{
    type: "slower",
    amount: 18,
    radius: 12,
    speed: 4
  }, {
    type: "homing",
    amount: 67,
    radius: 24,
    speed: 3
  }, {
		type: "wall",
		amount: 12,
		radius: 24,
		speed: 4
	}],
  "8": [{
		type: ["homing"],
		amount: 36,
		radius: 24,
		speed: 7
	}, {
		type: "wall",
		amount: 32,
		radius: 18,
		speed: 6
	}],
  "9": [{
		type: ["homing"],
		amount: 18,
		radius: 28,
		speed: 9
	}, {
		type: ["immune"],
		amount: 12,
		radius: 28,
		speed: 6
	}, {
		type: "wall",
		amount: 32,
		radius: 22,
		speed: 7
	}],
  "10": [{
		type: ["immune", "homing"],
		amount: 54,
		radius: 26,
		speed: 6
	}, {
		type: "wall",
		amount: 42,
		radius: 24,
		speed: 8
	}, {
		type: "creeper",
		amount: 2,
		radius: 62,
		speed: 12
	}],
  "11": [{
    type: "snake",
    amount: 34,
    radius: 12,
    speed: 4
  }],//blur effect (enemies will get drawn twice, once normally and once 1.5x bigger with 0.8 opacity)
  "12": [{
    type: "snake",
    amount: 42,
    radius: 16,
    speed: 4
  }, {
    type: "oscillating",
    amount: 4,
    radius: 16,
    speed: 3
  }],
  "13": [{
    type: "snake",
    amount: 32,
    radius: 20,
    speed: 5
  }, {
    type: "oscillating",
    amount: 4,
    radius: 21,
    speed: 4
  }],
  "14": [{
    type: "snake",
    amount: 22,
    radius: 24,
    speed: 6
  }, {
    type: "oscillating",
    amount: 22,
    radius: 24,
    speed: 5
  }],
  "15": [{
    type: "snake",
    amount: 22,
    radius: 18,
    speed: 4
  }, {
    type: "oscillating",
    amount: 22,
    radius: 18,
    speed: 4
  }, {
    type: "slower",
    amount: 22,
    radius: 24,
    speed: 6
  }],
  "16": [{
    type: "snake",
    amount: 18,
    radius: 18,
    speed: 4
  }, {
    type: ["oscillating", "toxic"],
    amount: 32,
    radius: 18,
    speed: 4
  }, {
    type: "slower",
    amount: 28,
    radius: 24,
    speed: 1
  }],
  "17": [{
    type: ["snake", "oscillating"],
    amount: 20,
    radius: 18,
    speed: 5
  }, {
    type: ["toxic"],
    amount: 14,
    radius: 18,
    speed: 5
  }, {
    type: ["slower", "megafreezing"],
    amount: 22,
    radius: 24,
    speed: 2
  }],
  "18": [{
    type: ["snake"],
    amount: 18,
    radius: 12,
    speed: 3
  }, {
    type: ["toxic"],
    amount: 48,
    radius: 16,
    speed: 4
  }, {
    type: ["megafreezing"],
    amount: 18,
    radius: 24,
    speed: 2
  }],
  "19": [{
    type: "toxic",
    amount: 98,
    radius: 8,
    speed: 3.5
  }, {
    type: "megafreezing",
    amount: 64,
    radius: 8,
    speed: 1
  }],
  "20": [{
    type: "toxic",
    amount: 60,
    radius: 8,
    speed: 6.5
  }, {
    type: "slower",
    amount: 14,
    radius: 8,
    speed: 3
  }, {
    type: "subzero",
    amount: 3,
    radius: 34,
    speed: 7
  }],
  "21": [{
    type: "liquid",
    amount: 12,
    radius: 48,
    speed: 0.5
  }, {
    type: "liquid",
    amount: 28,
    radius: 12,
    speed: 1
  }],//effect where all enemies are semi (.5?) transparent? Get less transparent the closer they get to u?
  "22": [{
    type: "liquid",
    amount: 14,
    radius: 52,
    speed: 1
  }, {
    type: "liquid",
    amount: 32,
    radius: 24,
    speed: 2
  }],
  "23": [{
    type: "liquid",
    amount: 18,
    radius: 58,
    speed: 3
  }, {
    type: "liquid",
    amount: 34,
    radius: 24,
    speed: 3
  }],
  "24": [{
    type: "tired",
    amount: 8,
    radius: 24,
    speed: 5
  }, {
    type: "liquid",
    amount: 24,
    radius: 24,
    speed: 3
  }],
  "25": [{
    type: "turning",
    amount: 8,
    radius: 36,
    speed: 8
  }, {
    type: "liquid",
    amount: 24,
    radius: 24,
    speed: 4
  }],
  "26": [{
    type: "turning",
    amount: 10,
    radius: 26,
    speed: 3
  }, {
    type: "liquid",
    amount: 12,
    radius: 26,
    speed: 2
  }, {
    type: "warp",
    amount: 20,
    radius: 26,
    speed: 5
  }],
  "27": [{
    type: "turning",
    amount: 4,
    radius: 32,
    speed: 2
  }, {
    type: "liquid",
    amount: 16,
    radius: 12,
    speed: 1.5
  }, {
    type: "warp",
    amount: 16,
    radius: 25,
    speed: 4
  }, {
    type: "icicle",
    amount: 16,
    radius: 8,
    speed: 6
  }],
  "28": [{
    type: "liquid",
    amount: 9,
    radius: 18,
    speed: 2
  }, {
    type: "warp",
    amount: 20,
    radius: 20,
    speed: 6
  }, {
    type: "icicle",
    amount: 16,
    radius: 16,
    speed: 6
  }, {
    type: "dasher",
    amount: 18,
    radius: 18,
    speed: 6
  }],
  "29": [{
    type: "liquid",
    amount: 28,
    radius: 12,
    speed: 0.5
  }, {
    type: "warp",
    amount: 28,
    radius: 12,
    speed: 2
  }, {
    type: "icicle",
    amount: 28,
    radius: 12,
    speed: 2
  }, {
    type: "dasher",
    amount: 28,
    radius: 12,
    speed: 2
  }, {
    type: "push",
    amount: 8,
    radius: 12,
    speed: 2
  }],
  "30": [{
		type: ["dasher", 'frog'],
		amount: 22,
		radius: 48,
		speed: 7.5
	}, {
		type: ["icicle", "warp", "dasher"],
		amount: 60,
		radius: 12,
		speed: 5
	}],
  "31": [{
		type: "immune",
		amount: 128,
		radius: 12,
		speed: 2.5
	}],//vinette on enemies
  "32": [{
		type: "immune",
		amount: 164,
		radius: 1,
		speed: 4
	}],
  "33": [{
		type: "homing",
		amount: 56,
		radius: 32,
		speed: 3
	}, {
		type: "wall",
		amount: 42,
		radius: 32,
		speed: 3
	}],
  "34": [{
    type: "snake",
    amount: 32,
    radius: 56,
    speed: 6
  }],
  "35": [{
    type: "snake",
    amount: 32,
    radius: 32,
    speed: 6
  }, {
    type: "oscillating",
    amount: 18,
    radius: 32,
    speed: 5
  }],
  "36": [{
    type: "immunetoxic",
    amount: 52,
    radius: 12,
    speed: 9
  }],
  "37": [{
    type: "slower",
    amount: 42,
    radius: 20,
    speed: 8
  }],
  "38": [{
    type: "snake",
    amount: 20,
    radius: 18,
    speed: 4
  }, {
    type: "oscillating",
    amount: 20,
    radius: 18,
    speed: 4
  }, {
    type: "slower",
    amount: 20,
    radius: 24,
    speed: 5
  }, {
    type: "turning",
    amount: 20,
    radius: 24,
    speed: 5
  }],
  "39": [{
    type: "snake",
    amount: 14,
    radius: 12,
    speed: 3
  }, {
    type: "oscillating",
    amount: 9,
    radius: 12,
    speed: 3
  }, {
    type: "megafreezing",
    amount: 24,
    radius: 48,
    speed: 3
  }, {
    type: "turning",
    amount: 12,
    radius: 12,
    speed: 3
  }],
  "40": [{
    type: "sizing",
    amount: 124,
    radius: 6,
    speed: 5
  },{
    type: "sizing",
    amount: 4,
    radius: 62,
    speed: 9
  }],
}
// additional effects ideas if we go to 80:
// all enemies are rainbow colored (hides type)
// all enemies act like tp enemies in rendering (not in collision)
// all enemies have a random aura color around them reguardless of whether they actually have an aura or not
// all enemies are invisible (or at least transparent) until they get close
// black screen (or just not render any enemies) every other second
// all effects in combination
module.exports = { CALAMATOUS_CAVERN }