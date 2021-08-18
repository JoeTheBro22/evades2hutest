const STRANGE_SPACE = {
	"index": 6,
	"1": [{
		type: "spiral",
		amount: 12,
		radius: 12,
		speed: 4
	}],
  "2": [{
		type: "spiral",
		amount: 24,
		radius: 12,
		speed: 4
	}],
  "3": [{
		type: "spiral",
		amount: 24,
		radius: 12,
		speed: 4
	}, {
		type: "spiral",
		amount: 12,
		radius: 24,
		speed: 4
	}],
  "4": [{
		type: "spiral",
		amount: 12,
		radius: 36,
		speed: 4
	}, {
		type: "spiral",
		amount: 4,
		radius: 12,
		speed: 8
	}],
  "5": [{
		type: "spiral",
		amount: 12,
		radius: 18,
		speed: 8
	}],
  "6": [{
		type: "sidestep",
		amount: 8,
		radius: 12,
		speed: 6
	}],
  "7": [{
		type: "sidestep",
		amount: 16,
		radius: 18,
		speed: 6
	}],
  "8": [{
		type: "sidestep",
		amount: 12,
		radius: 24,
		speed: 9
	}, {
		type: "spiral",
		amount: 8,
		radius: 24,
		speed: 9
	}],
  "9": [{
		type: "sidestep",
		amount: 48,
		radius: 24,
		speed: 2
	}, {
		type: "spiral",
		amount: 24,
		radius: 24,
		speed: 2
	}],
  "10": [{
		type: "sidestep",
		amount: 2,
		radius: 100,
		speed: 5
	}, {
		type: "spiral",
		amount: 2,
		radius: 100,
		speed: 5
	},{
		type: "sidestep",
		amount: 12,
		radius: 20,
		speed: 7
	}, {
		type: "spiral",
		amount: 12,
		radius: 20,
		speed: 7
	}],
  "11": [{
		type: "oscillating",
		amount: 20,
		radius: 20,
		speed: 5
	}],
  "12": [{
		type: "oscillating",
		amount: 30,
		radius: 25,
		speed: 5
	}],
  "13": [{
		type: "oscillating",
		amount: 15,
		radius: 12,
		speed: 10
	}],
  "14": [{
		type: "oscillating",
		amount: 25,
		radius: 18,
		speed: 10
	}],
  "15": [{
		type: "oscillating",
		amount: 12,
		radius: 24,
		speed: 12
	}],
  "16": [{
		type: "oscillating",
		amount: 20,
		radius: 12,
		speed: 6
	}, {
		type: "disabler",
		amount: 20,
		radius: 12,
		speed: 4
	}, {
		type: "sniper",
		amount: 4,
		radius: 18,
		speed: 6
	}],
  "17": [{
		type: "oscillating",
		amount: 30,
		radius: 12,
		speed: 4
	}, {
		type: "spiral",
		amount: 15,
		radius: 12,
		speed: 3
	}, {
		type: "sniper",
		amount: 4,
		radius: 18,
		speed: 6
	}],
  "18": [{
		type: "oscillating",
		amount: 15,
		radius: 18,
		speed: 4
	}, {
		type: "sidestep",
		amount: 15,
		radius: 18,
		speed: 3
	}, {
		type: "sniper",
		amount: 4,
		radius: 18,
		speed: 12
	}],
  "19": [{
		type: "oscillating",
		amount: 30,
		radius: 18,
		speed: 4
	}, {
		type: "sniper",
		amount: 4,
		radius: 18,
		speed: 12
	}],
  "20": [{
		type: "oscillating",
		amount: 30,
		radius: 12,
		speed: 4
	}, {
		type: "sniper",
		amount: 5,
		radius: 24,
		speed: 4
	}, {
		type: "octo",
		amount: 4,
		radius: 36,
		speed: 6
	}],
  
}

let i = 0;

for(let k of Object.keys(STRANGE_SPACE)){
	let area = STRANGE_SPACE[k];
  if (k != "index"){
    if(i > 1){
      area.push({
        type: "wall",
        amount: 12,
        radius: 30,
        speed: 3.3
      });
    }
  }
	i++
}

module.exports = { STRANGE_SPACE }