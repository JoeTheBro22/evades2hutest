const SNEAKY_SPECULATION = {// new enemies: light and enemySpeed
  "index": 20,
  'width': [3000, 3000, 1500, 3000, 6000, 1500, 1500, 1500, 1500, 1500,
  400, 1500, 2000, 3000, 150, 4500, 1750, 2250, 1000, 8500,
  400, 1500, 2000, 3000, 4500, 2750, 3200, 1500, 1500, 1500],
  'height': [500, 300, 750, 500, 200, 750, 750, 750, 750, 750,
  400, 1000, 1000, 1000, 150, 250, 500, 650, 514.29, 450,
  400, 1000, 1000, 1000, 400, 325, 750, 800, 850, 750],
  "1": [{
    type: "slower",
    amount: 12,
    radius: 32,
    speed: 3
  }],
  "2": [{
    type: "slower",
    amount: 8,
    radius: 1,
    speed: 4
  }],
  "3": [{
    type: "slower",
    amount: 10,
    radius: 0,
    speed: 3
  }],
  "4": [{
    type: "slower",
    amount: 20,
    radius: 0,
    speed: 6
  }],
  "5": [{
    type: "slower",
    amount: 18,
    radius: 0,
    speed: 10
  }],
  "6": [{
    type: "tornado",
    amount: 10,
    radius: 0,
    speed: 3
  }],
  "7": [{
    type: "immunedisabler",
    amount: 11,
    radius: 0,
    speed: 5
  }, {
    type: "immune",
    amount: 16,
    radius: 17,
    speed: 8
  }],
  "8": [{
    type: "immunedisabler",
    amount: 8,
    radius: 0,
    speed: 4.5
  }, {
    type: "slower",
    amount: 3,
    radius: 0,
    speed: 7
  }, {
    type: "megafreezing",
    amount: 1,
    radius: 0,
    speed: 3
  }, {
    type: "immune",
    amount: 19,
    radius: 17,
    speed: 9
  }],
  "9": [{
    type: "immunedisabler",
    amount: 8,
    radius: 0,
    speed: 3
  }, {
    type: "slower",
    amount: 21,
    radius: 0,
    speed: 2.5
  }, {
    type: "megafreezing",
    amount: 3,
    radius: 0,
    speed: 2
  }, {
    type: "subzero",
    amount: 1,
    radius: 0,
    speed: 2
  }, {
    type: "immune",
    amount: 38,
    radius: 17,
    speed: 3
  }, {
    type: "icicle",
    amount: 12,
    radius: 20,
    speed: 7
  }],
  "10": [{
    type: "icicle",
    amount: 21,
    radius: 4,
    speed: 8
  }, {
    type: "icicle",
    amount: 16,
    radius: 18,
    speed: 6
  }, {
    type: "icicle",
    amount: 9,
    radius: 32,
    speed: 2
  }, {
    type: "ice sniper",
    amount: 2,
    radius: 82,
    speed: 1
  }, {
    type: "megafreezing",
    amount: 4,
    radius: 0,
    speed: 0.5
  }, {
    type: "slower",
    amount: 32,
    radius: 0,
    speed: 1
  }],
  "11": [{
    type: "light",
    amount: 5,
    radius: 0,
    speed: 1
  }],
  "12": [{
    type: "light",
    amount: 22,
    radius: 0,
    speed: 5
  }],
  "13": [{
    type: "light",
    amount: 52,
    radius: 0,
    speed: 6.5
  }],
  "14": [{
    type: "light",
    amount: 200,
    radius: 0,
    speed: 2
  }],
  "15": [{
    type: "light",
    amount: 2,
    radius: 0,
    speed: 0.5
  }, {
    type: "normal",
    amount: 10,
    radius: 0,
    speed: 1
  }],
  "16": [{
    type: "light",
    amount: 34,
    radius: 5,
    speed: 1
  }, {
    type: "normal",
    amount: 38,
    radius: 0,
    speed: 1.5
  }],
  "17": [{
    type: "light",
    amount: 24,
    radius: 5,
    speed: 1
  }, {
    type: "normal",
    amount: 72,
    radius: 0,
    speed: 1
  }],
  "18": [{
    type: "light",
    amount: 32,
    radius: 1,
    speed: 1.5
  }, {
    type: "immune",
    amount: 48,
    radius: 32,
    speed: 6
  }],
  "19": [{
    type: "light",
    amount: 12,
    radius: 1,
    speed: 2
  }, {
		type: "path",
		amount: 1,
		radius: 529.29/8,
		path: [[529.29/5, 1.5*529.29/5, 0], [529.29/5, 1.5*529.29/5, 0]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/8,
		path: [[529.29/5, 2.5*529.29/5, 0], [529.29/5, 2.5*529.29/5, 0]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/8,
		path: [[529.29/5, 3.5*529.29/5, 0], [529.29/5, 3.5*529.29/5, 0]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/8,
		path: [[529.29/5, 4.5*529.29/5, 0], [529.29/5, 4.5*529.29/5, 0]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/8,
		path: [[3*529.29/5, 0.5*529.29/5, 0], [3*529.29/5, 0.5*529.29/5, 0]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/8,
		path: [[3*529.29/5, 2.5*529.29/5, 0], [3*529.29/5, 2.5*529.29/5, 0]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/8,
		path: [[3*529.29/5, 3.5*529.29/5, 0], [3*529.29/5, 3.5*529.29/5, 0]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/8,
		path: [[3*529.29/5, 4.5*529.29/5, 0], [3*529.29/5, 4.5*529.29/5, 0]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/8,
		path: [[529.29, 0.5*529.29/5, 0], [529.29, 0.5*529.29/5, 0]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/8,
		path: [[529.29, 1.5*529.29/5, 0], [529.29, 1.5*529.29/5, 0]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/8,
		path: [[529.29, 2.5*529.29/5, 0], [529.29, 2.5*529.29/5, 0]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/8,
		path: [[529.29, 4.5*529.29/5, 0], [529.29, 4.5*529.29/5, 0]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/8,
		path: [[7*529.29/5, 0.5*529.29/5, 0], [7*529.29/5, 0.5*529.29/5, 0]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/8,
		path: [[7*529.29/5, 1.5*529.29/5, 0], [7*529.29/5, 1.5*529.29/5, 0]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/8,
		path: [[7*529.29/5, 2.5*529.29/5, 0], [7*529.29/5, 2.5*529.29/5, 0]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/8,
		path: [[7*529.29/5, 3.5*529.29/5, 0], [7*529.29/5, 3.5*529.29/5, 0]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/8,
		path: [[9*529.29/5, 1.5*529.29/5, 0], [9*529.29/5, 1.5*529.29/5, 0]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/8,
		path: [[9*529.29/5, 2.5*529.29/5, 0], [9*529.29/5, 2.5*529.29/5, 0]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/8,
		path: [[9*529.29/5, 3.5*529.29/5, 0], [9*529.29/5, 3.5*529.29/5, 0]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/8,
		path: [[9*529.29/5, 4.5*529.29/5, 0], [9*529.29/5, 4.5*529.29/5, 0]]
	}],
  "20": [{
    type: "light",
    amount: 180,
    radius: 8,
    speed: 0.5
  }],
  "21": [{
    type: "enemySpeed",
    amount: 3,
    radius: 8,
    speed: 2
  }],
  "22": [{
    type: "enemySpeed",
    amount: 42,
    radius: 3,
    speed: 2
  }],
  "23": [{
    type: "enemySpeed",
    amount: 52,
    radius: 0,
    speed: 3
  }, {
    type: "light",
    amount: 12,
    radius: 0,
    speed: 4
  }],
  "24": [{
    type: "enemySpeed",
    amount: 140,
    radius: 1,
    speed: 2
  }],
  "25": [{
    type: "enemySpeed",
    amount: 48,
    radius: 1,
    speed: 0.5
  }, {
    type: "normal",
    amount: 42,
    radius: 18,
    speed: 4
  }],
  "26": [{
    type: "enemySpeed",
    amount: 24,
    radius: 1,
    speed: 0.5
  }, {
    type: "oscillating",
    amount: 24,
    radius: 10,
    speed: 2
  }],
  "27": [{
    type: "enemySpeed",
    amount: 188,
    radius: 1,
    speed: 0.5
  }, {
    type: "icicle",
    amount: 48,
    radius: 3,
    speed: 2
  }],
  "28": [{
    type: "enemySpeed",
    amount: 9,
    radius: 42,
    speed: 8
  }, {
    type: "light",
    amount: 18,
    radius: 42,
    speed: 8
  }],
  "29": [{
    type: "enemySpeed",
    amount: 32,
    radius: 8,
    speed: 3
  }, {
    type: "light",
    amount: 26,
    radius: 8,
    speed: 3
  }],
  "30": [{
    type: "light",
    amount: 88,
    radius: 0,
    speed: 1
  }, {
    type: "enemySpeed",
    amount: 32,
    radius: 0,
    speed: 1
  }],
}

module.exports = { SNEAKY_SPECULATION }