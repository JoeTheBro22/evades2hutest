/*
PLANNING (easy - difficult)

ATT
Very Easy:
normal, icicle, switch, tired

Easy:
dasher, soldier, sizing, frog, immune

Medium:
homing, warp, creeper, liquid, jumper, tp

Hard:
sniper, octo

EFFCT
Very Easy:
slower, regen sniper

Easy:
speed sniper, drainer

Medium:
freezing, disabler, ice sniper, immune disabler

Hard:
tornado, megafreezing, slippery

god:
inverse, subzero


(tell adi to hard code area names)

[] means undetermined

MANY UNADDED ENEMIES WOULD BE BETTER SUITED SO SEE BECOMESUP.MD FOR MINE ENEMY IDEAS TO ADD REMINDER <-----

1 - 4 DESERT, bare with few slow enemies and one or two fast enemies with tired
5 - 7 OASIS, more normal enemies, some frogs and slowers and liquids
8 - 10 CACTUS FIELD, many big slow enemies, still a few frogs from the oasis and dashers
11 - 12 ENTERING BATTLEFIELD, a few regen and speed snipers and soldiers
13 - 16 BATTLEFIELD, snipers and creepers and soldiers, with some drainers
17 - 19 QUICKSAND, lots of small but slow enemies, normal and switch and sizing. switch -> normal -> sizing. Also with freezing and [some pull auras]
20 - 24 AQUIFER, fall into aquifer, liquids, dashers, icicles, slippery
25 - 28 BATTLEFIELD2, enter battlefield again, with snipers, homings, icesnipers, and big slow immunes on last level
29 - 32 DESERT2, enter desert again, once again empty but very fast dashers, homings, jumpers, and some frogs ~~[also enemies that dig under ground as animals]~~ SNAKE ENEMIES
33 - 36 HALLUCINATION, start hallucinating, with ww enemies and slowers and warp. [enemies that stop when you get closer]
37 - 40 JUNGLE, turning, sizing, some disablers, slower, drainers [enemies that follow behind u]
42 - 45 JUNGLE WEATHER, jungle but more still and less animals, as now subzero, sliding, and tornadoes come. Starts with liquids as rain, then subzero and sliding and tornadoes. Also some icicles come.
46 - 49 LAB, find secret lab in jungle. Many hightech with warps, tp, megafreezing, immundisabler, and gravity auras.
50 - 52 ANTHOLE, many small homing and normal enemies as ants.
53 - 55 BATTLEFIELD 3, battlefield AGAIN but with lab high tech enemies and soldiers creeper sniprs, and octos.
56 - 59 JUNGLE 2 - evil frogs that jump towards you, evil snakes, and evil jumpers
60 - 62 HALLUCINATION 2 - hallucinate jungle. first for beginning and weather, 2nd for lab and ant hole, 3rd for battlefield and evil jungle
63 - 64 MINEFIELD, minefield in space entry, enemies that only move when u get close with some tireds around
65 - 67 ROCKET, still in entry, very big fast enemies around with some switch 
68 - 71 SPACE, very low desntiy but vrery fast balls and liquids as comets
72 - 75 SPACE2, some nebulas, very dense amounts of sizings or moderate sized balls and also giant immunepull and immunedisablers
76 - 79 HALLUCINATION3, flashbacks to everything, including original desert, jungle, battlefield, then space, and also have inverses
80 - BLACKHOLE FINAL BOSS, giant black hole that sucks you and makes you slowly orbit around it. Is immune and disables abilities, also moves very fast, also insta kills if u touch it



TBA --


??? - ??? BOSSFIGHT

*/


const TOILSOME_TRAVERSE = {
	"index": 9,
	// Desert 1-1
	"1": [{
		type: ["tired", "normal"],
		amount: 4,
		radius: 18,
		speed: 2
	}, {
		type: "normal",
		amount: 1,
		radius: 18,
		speed: 6
	}],
	// Desert 1-2
	"2": [{
		type: ["tired", "normal"],
		amount: 8,
		radius: 18,
		speed: 2
	}, {
		type: "normal",
		amount: 2,
		radius: 24,
		speed: 6
	}, {
		type: "tired",
		amount: 2,
		radius: 18,
		speed: 6
	}],
	// Desert 1-3
	"3": [{
		type: ["tired", "normal"],
		amount: 12,
		radius: 24,
		speed: 8
	}, {
		type: "wall",
		amount: 6,
		radius: 30,
		speed: 4
	}],
	// Desert 1-4
	"4": [{
		type: ["tired", "normal"],
		amount: 16,
		radius: 24,
		speed: 10
	}, {
		type: "wall",
		amount: 6,
		radius: 30,
		speed: 4
	}],
	// Oasis 1-1
	"5": [{
		type: ["liquid", "normal"],
		amount: 18,
		radius: 18,
		speed: 2
	}, {
		type: "wall",
		amount: 6,
		radius: 30,
		speed: 4
	}],
	// Oasis 1-2
	"6": [{
		type: ["liquid", "normal", "frog"],
		amount: 14,
		radius: 12,
		speed: 3
	}, {
		type: "liquid",
		amount: 6,
		radius: 18,
		speed: 3
	}, {
		type: "wall",
		amount: 6,
		radius: 30,
		speed: 4
	}],
	// Oasis 1-3
	"7": [{
		type: "normal",
		amount: 14,
		radius: 12,
		speed: 4
	}, {
		type: ["liquid", "slower"],
		amount: 10,
		radius: 18,
		speed: 4
	}, {
		type: "wall",
		amount: 6,
		radius: 30,
		speed: 4
	}],
	// Desert 2-1
	"8": [{
		type: ["normal", "dasher"],
		amount: 10,
		radius: 32,
		speed: 6
	}, {
		type: "frog",
		amount: 10,
		radius: 18,
		speed: 12
	}, {
		type: "wall",
		amount: 6,
		radius: 30,
		speed: 4
	}],
	// Desert 2-2
	"9": [{
		type: ["normal", "dasher", "tired"],
		amount: 18,
		radius: 36,
		speed: 6
	}, {
		type: "frog",
		amount: 5,
		radius: 18,
		speed: 14
	}, {
		type: "wall",
		amount: 6,
		radius: 30,
		speed: 4
	}],
	// Desert 2-3
	"10": [{
		type: ["normal", "dasher", "tired", "slower"],
		amount: 34,
		radius: 34,
		speed: 6
	}, {
		type: "wall",
		amount: 6,
		radius: 30,
		speed: 4
	}],
	// Battlefield 1-1
	"11": [{
		type: "soldier",
		amount: 24,
		radius: 24,
		speed: 6
	}, {
		type: ["dasher", "tired"],
		amount: 15,
		radius: 18,
		speed: 4
	}, {
		type: "wall",
		amount: 10,
		radius: 30,
		speed: 5
	}],
	// Battlefield 1-2
	"12": [{
		type: ["soldier", "soldier", "regen sniper", "speed sniper"],
		amount: 28,
		radius: 24,
		speed: 4
	}, {
		type: "wall",
		amount: 10,
		radius: 30,
		speed: 5
	}],
	// Battlefield 1-3
	"13": [{
		type: ["soldier", "soldier", "soldier", "soldier", "creeper"],
		amount: 40,
		radius: 20,
		speed: 8
	}, {
		type: "wall",
		amount: 10,
		radius: 30,
		speed: 5
	}],
	// Battlefield 1-4
	"14": [{
		type: ["soldier", "soldier", "draining"],
		amount: 32,
		radius: 20,
		speed: 5
	}, {
		type: "creeper",
		amount: 7,
		radius: 28,
		speed: 9
	}, {
		type: "wall",
		amount: 10,
		radius: 30,
		speed: 5
	}],
	// Battlefield 1-5
	"15": [{
		type: ["sniper", "creeper"],
		amount: 18,
		radius: 30,
		speed: 10
	}, {
		type: "wall",
		amount: 10,
		radius: 30,
		speed: 5
	}],
	// Battlefield 1-6
	"16": [{
		type: "sniper",
		amount: 8,
		radius: 12,
		speed: 2.5
	}, {
		type: "draining",
		amount: 14,
		radius: 24,
		speed: 8
	}, {
		type: "wall",
		amount: 10,
		radius: 30,
		speed: 5
	}],
	// Desert 3-1
	"17": [{
		type: ["switch", "normal"],
		amount: 72,
		radius: 14,
		speed: 2
	}, {
		type: "slower",
		amount: 8,
		radius: 14,
		speed: 3
	}, {
		type: "wall",
		amount: 24,
		radius: 14,
		speed: 2
	}],
	// Desert 3-2
	"18": [{
		type: ["normal", "sizing"],
		amount: 64,
		radius: 18,
		speed: 2.5
	}, {
		type: "freezing",
		amount: 4,
		radius: 18,
		speed: 5
	}, {
		type: "wall",
		amount: 20,
		radius: 18,
		speed: 2.5
	}],
	// Desert 3-3
	"19": [{
		type: ["switch", "switch", "switch", "sizing", "sizing"],
		amount: 50,
		radius: 22,
		speed: 3
	}, {
		type: "pull",
		amount: 6,
		radius: 22,
		speed: 6
	}, {
		type: "wall",
		amount: 16,
		radius: 22,
		speed: 3
	}],
	// Aquifer 1-1
	"20": [{
		type: "icicle",
		amount: 12,
		radius: 20,
		speed: 6
	}, {
		type: "liquid",
		amount: 12,
		radius: 20,
		speed: 2
	}],
	// Aquifer 1-2
	"21": [{
		type: ["icicle", "sizing"],
		amount: 18,
		radius: 24,
		speed: 6
	}, {
		type: "liquid",
		amount: 18, 
		radius: 24, 
		speed: 2
	}],
	// Aquifer 1-3
	"22": [{
		type: "slippery",
		amount: 8,
		radius: 18,
		speed: 8
	}, {
		type: "liquid",
		amount: 8, 
		radius: 18, 
		speed: 3
	}, {
		type: "liquid",
		amount: 2, 
		radius: 48, 
		speed: 3
	}],
	// Aquifer 1-4
	"23": [{
		type: "slippery",
		amount: 8,
		radius: 18,
		speed: 2
	}, {
		type: "dasher",
		amount: 14, 
		radius: 24, 
		speed: 11
	}, {
		type: "normal",
		amount: 3, 
		radius: 48, 
		speed: 4
	}],
	// Aquifer 1-5
	"24": [{
		type: "icicle",
		amount: 20,
		radius: 18,
		speed: 6
	}, {
		type: "liquid",
		amount: 5, 
		radius: 32, 
		speed: 5.5
	}],
	// Battlefield 2-1
	"25": [{
		type: ["sniper", "homing", "homing"],
		amount: 24,
		radius: 18,
		speed: 8
	}, {
		type: "wall",
		amount: 12, 
		radius: 30, 
		speed: 6
	}],
	// Battlefield 2-2
	"26": [{
		type: "ice sniper",
		amount: 8,
		radius: 18,
		speed: 6
	}, {
		type: "homing",
		amount: 6,
		radius: 24,
		speed: 10
	}, {
		type: "wall",
		amount: 12, 
		radius: 30, 
		speed: 6
	}],
	// Battlefield 2-3
	"27": [{
		type: ["ice sniper", "sniper"],
		amount: 14,
		radius: 28,
		speed: 2
	}, {
		type: "wall",
		amount: 12, 
		radius: 30, 
		speed: 6
	}],
	// Battlefield 2-4
	"28": [{
		type: "ice sniper",
		amount: 6,
		radius: 30,
		speed: 2
	}, {
		type: ["homing", "immune"],
		amount: 12,
		radius: 18,
		speed: 12
	}, {
		type: "wall",
		amount: 12, 
		radius: 30, 
		speed: 6
	}],
	// Desert 4-1
	"29": [{
		type: ["jumper", "dasher"],
		amount: 18,
		radius: 24,
		speed: 7
	}, {
		type: "wall",
		amount: 12, 
		radius: 30, 
		speed: 6
	}],
	// Desert 4-2
	"30": [{
		type: "jumper",
		amount: 8,
		radius: 32,
		speed: 4
	}, {
		type: ["frog", "snake"],
		amount: 12,
		radius: 18,
		speed: 8
	}, {
		type: "wall",
		amount: 12, 
		radius: 30, 
		speed: 6
	}],
	// Desert 4-3
	"31": [{
		type: "snake",
		amount: 16,
		radius: 16,
		speed: 8
	}, {
		type: "snake",
		amount: 8,
		radius: 24,
		speed: 4
	}, {
		type: "wall",
		amount: 12, 
		radius: 30, 
		speed: 6
	}],
	// Desert 4-4
	"32": [{
		type: ["jumper", "slower"],
		amount: 6,
		radius: 18,
		speed: 3
	}, {
		type: ["snake", "dasher", "frog"],
		amount: 18,
		radius: 24,
		speed: 7
	}, {
		type: "wall",
		amount: 12, 
		radius: 30, 
		speed: 6
	}],
	// Hallucination 1-1
	"33": [{
		type: "normal",
		amount: 9,
		radius: 24,
		speed: 8
	}, {
		type: "tp",
		amount: 9,
		radius: 24,
		speed: 4
	}, {
		type: "wall",
		amount: 8, 
		radius: 60, 
		speed: 6
	}],
	// Hallucination 1-2
	"34": [{
		type: "normal",
		amount: 8,
		radius: 32,
		speed: 5
	}, {
		type: ["scared", "spiral"],
		amount: 12,
		radius: 18,
		speed: 9
	}, {
		type: "wall",
		amount: 8, 
		radius: 60, 
		speed: 6
	}],
	// Hallucination 1-3
	"35": [{
		type: "spiral",
		amount: 16,
		radius: 18,
		speed: 9
	}, {
		type: "spiral",
		amount: 8,
		radius: 28,
		speed: 5
	}, {
		type: "wall",
		amount: 8, 
		radius: 60, 
		speed: 6
	}],
	// Hallucination 1-4
	"36": [{
		type: ["normal", "draining"],
		amount: 6,
		radius: 18,
		speed: 4
	}, {
		type: ["spiral", "scared"],
		amount: 12,
		radius: 24,
		speed: 6
	}, {
		type: "tp",
		amount: 6,
		radius: 24,
		speed: 4
	}, {
		type: "wall",
		amount: 8, 
		radius: 60, 
		speed: 6
	}],
	// Jungle 1-1
	"37": [{
		type: ["turning", "turning", "sizing"],
		amount: 36,
		radius: 18,
		speed: 4
	}, {
		type: "wall",
		amount: 16, 
		radius: 30, 
		speed: 6
	}],
	// Jungle 1-2
	"38": [{
		type: "turning",
		amount: 26,
		radius: 22,
		speed: 5
	}, {
		type: ["slower", "draining"],
		amount: 12,
		radius: 16,
		speed: 6
	}, {
		type: "wall",
		amount: 16, 
		radius: 30, 
		speed: 6
	}],
	// Jungle 1-3
	"39": [{
		type: "turning",
		amount: 24,
		radius: 36,
		speed: 4
	}, {
		type: ["sneaky", "slower"],
		amount: 20,
		radius: 18,
		speed: 7
	}, {
		type: "wall",
		amount: 16, 
		radius: 30, 
		speed: 6
	}],
	// Jungle 1-4
	"40": [{
		type: "turning",
		amount: 14,
		radius: 52,
		speed: 4
	}, {
		type: ["disabler", "disabler", "sneaky"],
		amount: 28,
		radius: 18,
		speed: 7
	}, {
		type: "wall",
		amount: 16, 
		radius: 30, 
		speed: 6
	}],
	// Storm 1-1
	"42": [{
		type: "turning",
		amount: 14,
		radius: 52,
		speed: 3
	}, {
		type: "rain",
		amount: 16,
		radius: 18,
		speed: 3
	}, {
		type: "wall",
		amount: 16, 
		radius: 30, 
		speed: 8
	}],
	// Storm 1-2
	"43": [{
		type: "turning",
		amount: 12,
		radius: 44,
		speed: 4.5
	}, {
		type: "rain",
		amount: 20,
		radius: 18,
		speed: 3
	}, {
		type: "wall",
		amount: 16, 
		radius: 30, 
		speed: 8
	}],
	// Storm 1-3
	"44": [{
		type: "turning",
		amount: 8,
		radius: 36,
		speed: 6
	}, {
		type: ["rain", "rain", "rain", "rain", "rain", "tornado"],
		amount: 20,
		radius: 18,
		speed: 8
	}, {
		type: "tornado",
		amount: 1,
		radius: 18,
		speed: 5
	}, {
		type: "wall",
		amount: 16, 
		radius: 30, 
		speed: 8
	}],
	// Storm 1-4
	"45": [{
		type: ["turning", "rain"],
		amount: 24,
		radius: 24,
		speed: 5
	}, {
		type: ["tornado", "subzero"],
		amount: 6,
		radius: 18,
		speed: 8
	}, {
		type: "wall",
		amount: 16, 
		radius: 30, 
		speed: 8
	}],
	// Lab 1-1
	"46": [{
		type: ["warp", "tp"],
		amount: 28,
		radius: 18,
		speed: 5
	}],
	// Lab 1-2
	"47": [{
		type: ["warp", "tp"],
		amount: 8,
		radius: 18,
		speed: 3
	}, {
		type: ["megafreezing", "immunedisabler"],
		amount: 24,
		radius: 24,
		speed: 6
	}],
	// Lab 1-3
	"48": [{
		type: ["warp", "tp"],
		amount: 6,
		radius: 18,
		speed: 3
	}, {
		type: ["megafreezing", "immunedisabler"],
		amount: 6,
		radius: 24,
		speed: 4
	}, {
		type: ["push", "pull"],
		amount: 20,
		radius: 24,
		speed: 7
	}],
	// Lab 1-4
	"49": [{
		type: "megafreezing",
		amount: 12,
		radius: 18,
		speed: 10
	}, {
		type: "ice sniper",
		amount: 8,
		radius: 24,
		speed: 2
	}],
	// Jungle 2-1
	"50": [{
		type: "normal",
		amount: 72,
		radius: 4,
		speed: 2
	}, {
		type: "turning",
		amount: 8,
		radius: 28,
		speed: 2
	}, {
		type: "wall",
		amount: 16, 
		radius: 30, 
		speed: 6
	}],
	// Jungle 2-2
	"51": [{
		type: ["homing", "normal"],
		amount: 84,
		radius: 4,
		speed: 2
	}, {
		type: "turning",
		amount: 12,
		radius: 28,
		speed: 4
	}, {
		type: "frog",
		amount: 4,
		radius: 18,
		speed: 8
	}, {
		type: "wall",
		amount: 16, 
		radius: 30, 
		speed: 6
	}],
	// Jungle 2-3
	"52": [{
		type: "homing",
		amount: 96,
		radius: 4,
		speed: 3
	}, {
		type: "frog",
		amount: 4,
		radius: 18,
		speed: 10
	}, {
		type: "wall",
		amount: 16, 
		radius: 30, 
		speed: 6
	}],
	// Battlefield 3-1
	"53": [{
		type: "turning",
		amount: 8,
		radius: 24,
		speed: 2
	}, {
		type: "creeper",
		amount: 12,
		radius: 24,
		speed: 6
	}, {
		type: "megafreezing",
		amount: 8,
		radius: 18,
		speed: 6
	}, {
		type: "wall",
		amount: 12, 
		radius: 40, 
		speed: 8
	}],
	// Battlefield 3-2
	"54": [{
		type: ["octo", "ice sniper"],
		amount: 14,
		radius: 24,
		speed: 6
	}, {
		type: "wall",
		amount: 12, 
		radius: 40, 
		speed: 8
	}],
	// Battlefield 3-3
	"55": [{
		type: ["octo", "immunedisabler", "creeper", "immunedisabler", "creeper"],
		amount: 28,
		radius: 24,
		speed: 7
	}, {
		type: "wall",
		amount: 12, 
		radius: 40, 
		speed: 8
	}],
	// Jungle 3-1
	"56": [{
		type: ["evilfrog", "turning"],
		amount: 16,
		radius: 28,
		speed: 8
	}, {
		type: "wall",
		amount: 16, 
		radius: 40, 
		speed: 8
	}],
	// Jungle 3-2
	"57": [{
		type: "evilfrog",
		amount: 8,
		radius: 18,
		speed: 6
	}, {
		type: ["turning", "evilsnake"],
		amount: 14,
		radius: 24,
		speed: 8
	}, {
		type: "wall",
		amount: 16, 
		radius: 40, 
		speed: 8
	}],
	// Jungle 3-3
	"58": [{
		type: "evilfrog",
		amount: 24,
		radius: 18,
		speed: 6
	}, {
		type: "turning",
		amount: 12,
		radius: 36,
		speed: 6
	}, {
		type: "wall",
		amount: 16, 
		radius: 40, 
		speed: 8
	}],
	// Jungle 3-4
	"59": [{
		type: "eviljumper",
		amount: 12,
		radius: 18,
		speed: 10
	}, {
		type: "turning",
		amount: 12,
		radius: 48,
		speed: 6
	}, {
		type: "wall",
		amount: 16, 
		radius: 40, 
		speed: 8
	}],
	// Hallucination 2-1
	"60": [{
		type: ["sizing", "icicle"],
		amount: 18,
		radius: 24,
		speed: 4
	}, {
		type: ["homing", "disabler"],
		amount: 14,
		radius: 18,
		speed: 4
	}, {
		type: "oscillating",
		amount: 12,
		radius: 24,
		speed: 6
	}, {
		type: "wall",
		amount: 16, 
		radius: 60, 
		speed: 6
	}],
	// Hallucination 2-2
	"61": [{
		type: ["tp", "evilfrog"],
		amount: 42,
		radius: 4,
		speed: 2
	}, {
		type: ["push", "draining"],
		amount: 12,
		radius: 18,
		speed: 6
	}, {
		type: "oscillating",
		amount: 10,
		radius: 28,
		speed: 6
	}, {
		type: "wall",
		amount: 16, 
		radius: 60, 
		speed: 6
	}],
	// Hallucination 2-3
	"62": [{
		type: ["zigzag", "zoning"],
		amount: 18,
		radius: 18,
		speed: 6
	}, {
		type: ["immunefreezing", "regen sniper", "speed sniper"],
		amount: 18,
		radius: 24,
		speed: 4
	}, {
		type: "wall",
		amount: 16, 
		radius: 60, 
		speed: 6
	}],
	// Rocket 1-1
	"63": [{
		type: "mine",
		amount: 36,
		radius: 18,
		speed: 6
	}, {
		type: "wall",
		amount: 8, 
		radius: 20, 
		speed: 12
	}],
	// Rocket 1-2
	"64": [{
		type: ["mine", "mine", "sniper"],
		amount: 30,
		radius: 28,
		speed: 4
	}, {
		type: "wall",
		amount: 8, 
		radius: 20, 
		speed: 12
	}],
	// Rocket 1-3
	"65": [{
		type: "immune",
		amount: 1,
		radius: 175,
		speed: 6
	}, {
		type: ["switch", "normal"],
		amount: 24,
		radius: 24,
		speed: 4
	}],
	// Rocket 1-4
	"66": [{
		type: "immune",
		amount: 2,
		radius: 100,
		speed: 7
	}, {
		type: ["liquid", "mine", "scared"],
		amount: 42,
		radius: 18,
		speed: 6
	}],
	// Rocket 1-5
	"67": [{
		type: "immune",
		amount: 1,
		radius: 180,
		speed: 8
	}, {
		type: "switch",
		amount: 12,
		radius: 90,
		speed: 10
	} , {
		type: "sniper",
		amount: 6,
		radius: 50,
		speed: 10
	}],
	// Space 1-1
	"68": [{
		type: "normal",
		amount: 8,
		radius: 32,
		speed: 16
	}, {
		type: "wall",
		amount: 4, 
		radius: 30, 
		speed: 20
	}],
	// Space 1-2
	"69": [{
		type: "normal",
		amount: 6,
		radius: 36,
		speed: 16
	}, {
		type: "liquid",
		amount: 4,
		radius: 24,
		speed: 8
	}, {
		type: "wall",
		amount: 4, 
		radius: 30, 
		speed: 20
	}],
	// Space 1-3
	"70": [{
		type: "immune",
		amount: 8,
		radius: 46,
		speed: 18
	}, {
		type: "wall",
		amount: 4, 
		radius: 30, 
		speed: 20
	}],
	// Space 1-4
	"71": [{
		type: ["liquid", "liquid", "liquid", "slippery", "slippery"],
		amount: 16,
		radius: 32,
		speed: 10
	}, {
		type: "wall",
		amount: 4, 
		radius: 30, 
		speed: 20
	}],
	// Space 2-1
	"72": [{
		type: ["sizing", "normal"],
		amount: 24,
		radius: 24,
		speed: 4
	}, {
		type: "nebula",
		amount: 2,
		radius: 18,
		speed: 6
	}, {
		type: "wall",
		amount: 4, 
		radius: 30, 
		speed: 20
	}],
	// Space 2-2
	"73": [{
		type: ["icicle", "icicle", "icicle", "ice sniper", "ice sniper", "sniper", "liquid", "liquid"],
		amount: 36,
		radius: 18,
		speed: 4
	}, {
		type: "nebula",
		amount: 3,
		radius: 18,
		speed: 5
	}, {
		type: "wall",
		amount: 4, 
		radius: 30, 
		speed: 20
	}],
	// Space 2-3
	"74": [{
		type: "immunepush",
		amount: 5,
		radius: 100,
		speed: 11
	}, {
		type: "freezing",
		amount: 11, 
		radius: 30, 
		speed: 8
	}, {
		type: "wall",
		amount: 4, 
		radius: 30, 
		speed: 20
	}],
	// Space 2-4
	"75": [{
		type: "immunepull",
		amount: 5,
		radius: 100,
		speed: 11
	}, {
		type: "octo",
		amount: 10, 
		radius: 30, 
		speed: 10
	}, {
		type: "wall",
		amount: 4, 
		radius: 30, 
		speed: 20
	}],
  //Hallucination 3-1
  "76": [{
		type: ["normal", "tired", "homing", "dasher"],
		amount: 12,
		radius: 40,
		speed: 4
	}, {
		type: ["liquid", "slippery", "sizing", "switch", "frog", "snake", "jumper", "slower", "draining"],
		amount: 36, 
		radius: 18, 
		speed: 4
	}, {
		type: ["sizing", "switch"],
		amount: 32, 
		radius: 4, 
		speed: 4
	}, {
		type: "wall",
		amount: 4, 
		radius: 30, 
		speed: 20
	}],
	//Hallucination 3-2
  "77": [{
		type: ["turning", "soldier", "creeper"],
		amount: 12,
		radius: 40,
		speed: 4
	}, {
		type: ["regen sniper", "speed sniper", "sizing", "switch", "frog", "snake", "slower", "draining", "jumper", "rain", "tornado", "subzero", "sneaky", "disabler"],
		amount: 36, 
		radius: 18, 
		speed: 4
	}, {
		type: "wall",
		amount: 4, 
		radius: 30, 
		speed: 20
	}],
	//Hallucination 3-3
  "78": [{
		type: ["turning", "tp", "sniper"],
		amount: 15,
		radius: 40,
		speed: 4
	}, {
		type: ["evilfrog", "evilsnake", "eviljumper", "warp", "pull", "push", "megafreezing", "octo", "immunedisabler"],
		amount: 32, 
		radius: 18, 
		speed: 4
	}, {
		type: "wall",
		amount: 4, 
		radius: 30, 
		speed: 20
	}],
  //Hallucination 3-4
  "79": [{
		type: ["immune", "liquid", "nebula"],
		amount: 18,
		radius: 40,
		speed: 4
	}, {
		type: ["mine", "icicle", "scared", "ice sniper", "sniper", "slippery", "immunepush", "immunepull"],
		amount: 36, 
		radius: 18, 
		speed: 4
	}, {
		type: "wall",
		amount: 4, 
		radius: 30, 
		speed: 20
	}],
  //FINAL BOSS!
  "80": [{
		type: "blackhole",
		amount: 45,
		radius: 5,
		speed: 10
	}, {
		type: "wall",
		amount: 80, 
		radius: 12, 
		speed: 0.5
	}]
} 

/*
76 desert and oasis and aquaifer
77 battlefield and jungle
78 evil jungle and high tech and battlefield
79 rocket and space

76 - 79 HALLUCINATION3, flashbacks to everything, including original desert, jungle, battlefield, then space, and [also have inverses]
80 - BLACKHOLE FINAL BOSS, giant black hole that sucks you in >:) Is immune and disables abilities, also moves very fast, also insta kills if u touch it
*/

module.exports = { TOILSOME_TRAVERSE }

/*

toilsomeAreas = [
"Desert 1-1", "Desert 1-2", "Desert 1-3", "Desert 1-4",

"Oasis 1-1", "Oasis 1-2", "Oasis 1-3",

"Desert 2-1", "Desert 2-2", "Desert 2-3",

"Battlefield 1-1", "Battlefield 1-2", "Battlefield 1-3", "Battlefield 1-4", "Battlefield 1-5", "Battlefield 1-6",

"Desert 3-1", "Desert 3-2", "Desert 3-3",

"Aquifer 1-1", "Aquifer 1-2", "Aquifer 1-3", "Aquifer 1-4", "Aquifer 1-5",

"Battlefield 2-1", "Battlefield 2-2", "Battlefield 2-3",

"Battlefield 2-4", "Desert 4-1", "Desert 4-2", "Desert 4-3", "Desert 4-4",

"Hallucination 1-1", "Hallucination 1-2", "Hallucination 1-3", "Hallucination 1-4", 

"Jungle 1-1", "Jungle 1-2", "Jungle 1-3", "Jungle 1-4", 

"Storm 1-1", "Storm 1-2", "Storm 1-3", "Storm 1-4",

"Lab 1-1", "Lab 1-2", "Lab 1-3", "Lab 1-4", 

"Jungle 2-1", "Jungle 2-2", "Jungle 2-3", 

"Battlefield 3-1", "Battlefield 3-2", "Battlefield 3-3", 

"Jungle 3-1", "Jungle 3-2", "Jungle 3-3", "Jungle 3-4",

"Hallucination 2-1", "Hallucination 2-2", "Hallucination 2-3", 

"Rocket 1-1", "Rocket 1-2", "Rocket 1-3", "Rocket 1-4", "Rocket 1-5", 

"Space 1-1", "Space 1-2", "Space 1-3", "Space 1-4", 

"Space 2-1", "Space 2-2", "Space 2-3", "Space 2-4", 

"Hallucination 3-1", "Hallucination 3-2", "Hallucination 3-3", "Hallucination 3-4",

"Final Boss"];

*/