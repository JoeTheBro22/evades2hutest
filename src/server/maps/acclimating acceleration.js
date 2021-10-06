const ACCLIMATING_ACCELERATION = {
	"index": 14,
	"1": [{
		type: "slower",
		amount: 5,
		radius: 12,
		speed: 6
	}],
	"2": [{
		type: "slower",
		amount: 7,
		radius: 12,
		speed: 6
	}],
	"3": [{
		type: "slower",
		amount: 10,
		radius: 12,
		speed: 6
	}],
	"4": [{
		type: "slower",
		amount: 5,
		radius: 12,
		speed: 6
	}, {
		type: "warp",
		amount: 3,
		radius: 18,
		speed: 6
	}],
	"5": [{
		type: "slower",
		amount: 5,
		radius: 12,
		speed: 6
	}, {
		type: "warp",
		amount: 8,
		radius: 18,
		speed: 8
	}],
	"6": [{
		type: "warp",
		amount: 12,
		radius: 18,
		speed: 7
	}],
	"7": [{
		type: "warp",
		amount: 8,
		radius: 24,
		speed: 8
	}, {
		type: "slower",
		amount: 2,
		radius: 12,
		speed: 5
	}],
	"8": [{
		type: "warp",
		amount: 12,
		radius: 18,
		speed: 8
	}, {
		type: "megafreezing",
		amount: 2,
		radius: 12,
		speed: 5
	}],
	"9": [{
		type: "warp",
		amount: 10,
		radius: 24,
		speed: 8
	}, {
		type: "megafreezing",
		amount: 2,
		radius: 12,
		speed: 5
	}, {
		type: "liquid",
		amount: 5,
		radius: 24,
		speed: 5
	}],
	"10": [{
		type: "warp",
		amount: 18,
		radius: 18,
		speed: 10
	}],
	"11": [{
		type: "dasher",
		amount: 15,
		radius: 18,
		speed: 11
	}],
	"12": [{
		type: "dasher",
		amount: 25,
		radius: 10,
		speed: 12
	}],
	"13": [{
		type: "dasher",
		amount: 13,
		radius: 18,
		speed: 11
	}, {
		type: "dasher",
		amount: 14,
		radius: 12,
		speed: 11
	}, {
		type: "dasher",
		amount: 14,
		radius: 24,
		speed: 11
	}],
	"14": [{
		type: "normal",
		amount: 8,
		radius: 18,
		speed: 5
	}, {
		type: "slower",
		amount: 1,
		radius: 12,
		speed: 8
	}, {
		type: "megafreezing",
		amount: 1,
		radius: 12,
		speed: 8
	}, {
		type: "dasher",
		amount: 6,
		radius: 18,
		speed: 17
	}, {
		type: "frog",
		amount: 6,
		radius: 18,
		speed: 15
	}],
	"15": [{
		type: "normal",
		amount: 9,
		radius: 18,
		speed: 8
	}, {
		type: "normal",
		amount: 9,
		radius: 24,
		speed: 5
	}, {
		type: "warp",
		amount: 1,
		radius: 18,
		speed: 8
	}, {
		type: "warp",
		amount: 1,
		radius: 24,
		speed: 5
	}, {
		type: "dasher",
		amount: 12,
		radius: 18,
		speed: 17
	}, {
		type: "frog",
		amount: 2,
		radius: 18,
		speed: 17
	}],
	"16": [{
		type: "normal",
		amount: 8,
		radius: 18,
		speed: 8
	}, {
		type: "normal",
		amount: 7,
		radius: 12,
		speed: 11
	}, {
		type: "normal",
		amount: 4,
		radius: 24,
		speed: 5
	}, {
		type: "warp",
		amount: 1,
		radius: 18,
		speed: 8
	}, {
		type: "warp",
		amount: 1,
		radius: 12,
		speed: 11
	}, {
		type: "warp",
		amount: 1,
		radius: 24,
		speed: 5
	}, {
		type: "normal",
		amount: 3,
		radius: 12,
		speed: 8
	}, {
		type: "slower",
		amount: 1,
		radius: 12,
		speed: 8
	}, {
		type: "megafreezing",
		amount: 1,
		radius: 12,
		speed: 8
	}, {
		type: "dasher",
		amount: 10,
		radius: 18,
		speed: 17
	}, {
		type: "frog",
		amount: 5,
		radius: 18,
		speed: 17
	}],
	"17": [{
		type: "normal",
		amount: 5,
		radius: 18,
		speed: 8
	}, {
		type: "warp",
		amount: 5,
		radius: 18,
		speed: 8,
	}, {
		type: "dasher",
		amount: 5,
		radius: 18,
		speed: 23
	}, {
		type: "frog",
		amount: 5,
		radius: 18,
		speed: 20
	}],
	"18": [{
		type: "warp",
		amount: 5,
		radius: 18,
		speed: 8
	}, {
		type: "frog",
		amount: 5,
		radius: 12,
		speed: 23
	}, {
		type: "frog",
		amount: 5,
		radius: 18,
		speed: 23
	}, {
		type: "dasher",
		amount: 5,
		radius: 24,
		speed: 23
	}],
	"19": [{
		type: "megafreezing",
		amount: 2,
		radius: 12,
		speed: 8
	}, {
		type: "dasher",
		amount: 18,
		radius: 18,
		speed: 11
	}, {
		type: "frog",
		amount: 12,
		radius: 18,
		speed: 11
	}],
	"20": [{
		type: "normal",
		amount: 86,
		radius: 18,
		speed: 4
	  }],
}
for (let k of Object.keys(ACCLIMATING_ACCELERATION)) {
  let area = ACCLIMATING_ACCELERATION[k];
  if (k != "index") {
    if (k > 1 && k != 41 && k != 81 && k != 42) {
      area.push({
        type: "wall",
        amount: 8 + Math.floor(k/20),
        radius: 30,
        speed: 5 + k/4
      });
    }
  }
}


module.exports = { ACCLIMATING_ACCELERATION }