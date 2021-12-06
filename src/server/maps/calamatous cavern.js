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
  "15": [],
  "16": [],
  "17": [],
  "18": [{
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
  "19": [],
  "20": [],
  "21": [],//effect where all enemies are semi (.5?) transparent
  "22": [],
  "23": [],
  "24": [],
  "25": [],
  "26": [],
  "27": [],
  "28": [],
  "29": [],
  "30": [],
  "31": [],//all effects in combination?
  "32": [],
  "33": [],
  "34": [],
  "35": [],
  "36": [],
  "37": [],
  "38": [],
  "39": [],
  "40": [],
}

module.exports = { CALAMATOUS_CAVERN }