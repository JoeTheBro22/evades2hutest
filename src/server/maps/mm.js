const MONUMENTAL_MIGRATION = {
  "index": 7,
  "1": [{
    type: "normal",
    amount: 4,
    radius: 18,
    speed: 3
  }],
  "2": [{
    type: "normal",
    amount: 7,
    radius: 18,
    speed: 3
  }],
  "3": [{
    type: "normal",
    amount: 7,
    radius: 12,
    speed: 3
  }],
  "4": [{
    type: "normal",
    amount: 7,
    radius: 24,
    speed: 3
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 3.3
  }],
  "5": [{
    type: "normal",
    amount: 12,
    radius: 18,
    speed: 3
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 3.3
  }],
  "6": [{
    type: "dasher",
    amount: 5,
    radius: 18,
    speed: 5
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 3.3
  }],
  "7": [{
    type: "dasher",
    amount: 8,
    radius: 18,
    speed: 3
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 3.3
  }],
  "8": [{
    type: "normal",
    amount: 5,
    radius: 18,
    speed: 8
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 3.3
  }],
  "9": [{
    type: "dasher",
    amount: 8,
    radius: 18,
    speed: 8
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 3.3
  }],
  "10": [{
    type: "normal",
    amount: 5,
    radius: 24,
    speed: 3
  }, {
    type: "dasher",
    amount: 5,
    radius: 24,
    speed: 8
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 3.3
  }],
  "11": [{
    type: ["homing", "normal"],
    amount: 5,
    radius: 18,
    speed: 6
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 5
  }],
  "12": [{
    type: ["homing", "normal"],
    amount: 9,
    radius: 18,
    speed: 6
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 5
  }],
  "13": [{
    type: ["homing", "normal"],
    amount: 5,
    radius: 18,
    speed: 9
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 5
  }],
  "14": [{
    type: ["homing", "normal", "dasher"],
    amount: 9,
    radius: 18,
    speed: 9
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 5
  }],
  "15": [{
    type: "homing",
    amount: 10,
    radius: 18,
    speed: 9
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 5
  }],
  "16": [{
    type: "slower",
    amount: 2,
    radius: 18,
    speed: 3
  }, {
    type: "normal",
    amount: 5,
    radius: 18,
    speed: 6
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 5
  }],
  "17": [{
    type: ["slower", "normal"],
    amount: 10,
    radius: 18,
    speed: 3
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 5
  }],
  "18": [{
    type: ["slower", "homing"],
    amount: 10,
    radius: 18,
    speed: 6
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 5
  }],
  "19": [{
    type: ["slower", "homing", "dasher"],
    amount: 10,
    radius: 18,
    speed: 9
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 5
  }],
  "19": [{
    type: ["slower", "homing", "dasher"],
    amount: 10,
    radius: 18,
    speed: 9
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 5
  }],
  "20": [{
    type: ["slower", "homing", "dasher"],
    amount: 40,
    radius: 18,
    speed: 3
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 5
  }],
  "21": [{
    type: ["draining"],
    amount: 10,
    radius: 18,
    speed: 3
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 5
  }],
  "22": [{
    type: ["draining"],
    amount: 16,
    radius: 18,
    speed: 3
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 5
  }],
  "23": [{
    type: ["draining"],
    amount: 10,
    radius: 18,
    speed: 6
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 5
  }],
  "24": [{
    type: ["draining"],
    amount: 16,
    radius: 18,
    speed: 6
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 5
  }],
  "25": [{
    type: ["draining", "homing"],
    amount: 16,
    radius: 18,
    speed: 6
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 5
  }],
  "26": [{
    type: "wavy",
    amount: 10,
    radius: 18,
    speed: 6
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 5
  }],
  "27": [{
    type: ["wavy", "homing"],
    amount: 10,
    radius: 18,
    speed: 9
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 5
  }],
  "28": [{
    type: ["wavy", "zigzag"],
    amount: 16,
    radius: 18,
    speed: 6
  }, {
    type: ["slower", "draining"],
    amount: 3,
    radius: 18,
    speed: 6
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 5
  }],
  "29": [{
    type: ["wavy", "zigzag"],
    amount: 25,
    radius: 18,
    speed: 3
  }, {
    type: ["slower", "draining"],
    amount: 5,
    radius: 18,
    speed: 6
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 5
  }],
  "30": [{
    type: ["wavy", "zigzag", "homing"],
    amount: 45,
    radius: 18,
    speed: 2
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 5
  }],
  "31": [{
    type: ["spiral"],
    amount: 5,
    radius: 18,
    speed: 9
  }, {
    type: "wall",
    amount: 9,
    radius: 30,
    speed: 10
  }],
  "32": [{
    type: ["zoning"],
    amount: 5,
    radius: 18,
    speed: 9
  }, {
    type: "wall",
    amount: 9,
    radius: 30,
    speed: 10
  }],
  "33": [{
    type: ["spiral", "zoning"],
    amount: 10,
    radius: 18,
    speed: 9
  }, {
    type: "wall",
    amount: 9,
    radius: 30,
    speed: 10
  }],
  "34": [{
    type: ["spiral", "zoning"],
    amount: 5,
    radius: 18,
    speed: 9
  }, {
    type: ["normal", "dasher"],
    amount: 10,
    radius: 18,
    speed: 9
  }, {
    type: "wall",
    amount: 9,
    radius: 30,
    speed: 10
  }],
  "35": [{
    type: ["spiral", "zoning"],
    amount: 10,
    radius: 35,
    speed: 6
  }, {
    type: "wall",
    amount: 9,
    radius: 30,
    speed: 10
  }],
  "36": [{
    type: ["oscillating"],
    amount: 10,
    radius: 35,
    speed: 6
  }, {
    type: "wall",
    amount: 9,
    radius: 30,
    speed: 10
  }],
  "37": [{
    type: ["oscillating", "normal"],
    amount: 15,
    radius: 18,
    speed: 6
  }, {
    type: "wall",
    amount: 18,
    radius: 30,
    speed: 5
  }],
  "38": [{
    type: ["oscillating", "normal"],
    amount: 35,
    radius: 18,
    speed: 3
  }, {
    type: "wall",
    amount: 9,
    radius: 30,
    speed: 10
  }],
  "39": [{
    type: ["oscillating", "normal"],
    amount: 15,
    radius: 35,
    speed: 6
  }, {
    type: "wall",
    amount: 9,
    radius: 30,
    speed: 15
  }],
  "40": [{
    type: ["oscillating"],
    amount: 3,
    radius: 90,
    speed: 6
  }, {
    type: ["homing"],
    amount: 6,
    radius: 30,
    speed: 6
  }, {
    type: "wall",
    amount: 9,
    radius: 30,
    speed: 10
  }],
  "42": [{
    type: ["switch"],
    amount: 10,
    radius: 18,
    speed: 6
  }],
  "43": [{
    type: ["switch"],
    amount: 17,
    radius: 18,
    speed: 6
  }],
  "44": [{
    type: ["switch", "normal"],
    amount: 25,
    radius: 18,
    speed: 5
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 3.3
  }],
  "45": [{
    type: ["switch", "homing"],
    amount: 40,
    radius: 18,
    speed: 4
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 3.3
  }],
  "46": [{
    type: ["sizing"],
    amount: 10,
    radius: 18,
    speed: 6
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 3.3
  }],
  "47": [{
    type: ["sizing"],
    amount: 17,
    radius: 18,
    speed: 6
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 3.3
  }],
  "48": [{
    type: ["sizing", "homing"],
    amount: 17,
    radius: 18,
    speed: 6
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 3.3
  }],
  "49": [{
    type: ["sizing", "slower"],
    amount: 25,
    radius: 18,
    speed: 6
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 3.3
  }],
  "50": [{
    type: ["sizing"],
    amount: 5,
    radius: 18,
    speed: 6
  }, {
    type: ["homing"],
    amount: 6,
    radius: 105,
    speed: 6
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 3.3
  }],
  "51": [{
    type: ["turning"],
    amount: 10,
    radius: 18,
    speed: 9
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 5
  }],
  "52": [{
    type: ["turning"],
    amount: 17,
    radius: 18,
    speed: 9
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 5
  }],
  "53": [{
    type: ["turning"],
    amount: 30,
    radius: 18,
    speed: 6
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 5
  }],
  "54": [{
    type: ["turning"],
    amount: 45,
    radius: 18,
    speed: 3
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 5
  }],
  "55": [{
    type: ["turning"],
    amount: 10,
    radius: 50,
    speed: 6
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 5
  }],
  "56": [{
    type: ["freezing"],
    amount: 2,
    radius: 3,
    speed: 3
  }, {
    type: ["normal"],
    amount: 10,
    radius: 18,
    speed: 6
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 5
  }],
  "57": [{
    type: ["freezing"],
    amount: 5,
    radius: 3,
    speed: 3
  }, {
    type: ["normal", "dasher", "homing"],
    amount: 10,
    radius: 18,
    speed: 6
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 5
  }],
  "58": [{
    type: ["freezing"],
    amount: 10,
    radius: 3,
    speed: 6
  }, {
    type: ["normal", "dasher", "homing"],
    amount: 5,
    radius: 18,
    speed: 6
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 5
  }],
  "59": [{
    type: ["freezing"],
    amount: 15,
    radius: 3,
    speed: 3
  }, {
    type: ["normal", "dasher", "homing"],
    amount: 5,
    radius: 18,
    speed: 6
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 5
  }],
  "60": [{
    type: ["freezing"],
    amount: 25,
    radius: 3,
    speed: 3
  }, {
    type: ["normal"],
    amount: 15,
    radius: 18,
    speed: 3
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 5
  }],
  "61": [{
    type: ["sniper"],
    amount: 5,
    radius: 18,
    speed: 3
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 5
  }],
  "62": [{
    type: ["sniper"],
    amount: 7,
    radius: 18,
    speed: 3
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 5
  }],
  "63": [{
    type: ["sniper"],
    amount: 10,
    radius: 18,
    speed: 3
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 5
  }],
  "64": [{
    type: ["sniper"],
    amount: 15,
    radius: 18,
    speed: 3
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 5
  }],
  "65": [{
    type: ["sniper"],
    amount: 15,
    radius: 35,
    speed: 3
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 5
  }],
  "66": [{
    type: ["speed sniper"],
    amount: 5,
    radius: 30,
    speed: 1
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 5
  }],
  "67": [{
    type: ["speed sniper"],
    amount: 10,
    radius: 30,
    speed: 1
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 5
  }],
  "68": [{
    type: ["speed sniper"],
    amount: 15,
    radius: 30,
    speed: 1
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 5
  }],
  "69": [{
    type: ["regen sniper"],
    amount: 15,
    radius: 30,
    speed: 1
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 5
  }],
  "70": [{
    type: ["regen sniper", "speed sniper"],
    amount: 20,
    radius: 30,
    speed: 1
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 5
  }],
  "71": [{
    type: ["liquid"],
    amount: 10,
    radius: 18,
    speed: 0.5
  }, {
    type: "wall",
    amount: 9,
    radius: 30,
    speed: 10
  }],
  "72": [{
    type: ["liquid"],
    amount: 15,
    radius: 18,
    speed: 0.5
  }, {
    type: "wall",
    amount: 9,
    radius: 30,
    speed: 10
  }],
  "73": [{
    type: ["liquid"],
    amount: 10,
    radius: 18,
    speed: 1
  }, {
    type: "wall",
    amount: 9,
    radius: 30,
    speed: 10
  }],
  "74": [{
    type: ["liquid"],
    amount: 15,
    radius: 18,
    speed: 1
  }, {
    type: "wall",
    amount: 9,
    radius: 30,
    speed: 10
  }],
  "75": [{
    type: ["liquid"],
    amount: 10,
    radius: 18,
    speed: 1.5
  }, {
    type: "wall",
    amount: 9,
    radius: 30,
    speed: 10
  }],
  "76": [{
    type: ["icicle"],
    amount: 10,
    radius: 35,
    speed: 6.0
  }, {
    type: "wall",
    amount: 9,
    radius: 30,
    speed: 10
  }],
  "77": [{
    type: ["icicle", "normal"],
    amount: 15,
    radius: 35,
    speed: 6.0
  }, {
    type: "wall",
    amount: 18,
    radius: 30,
    speed: 5
  }],
  "78": [{
    type: ["icicle", "normal"],
    amount: 15,
    radius: 28,
    speed: 9.0
  }, {
    type: "wall",
    amount: 9,
    radius: 30,
    speed: 10
  }],
  "79": [{
    type: ["icicle", "normal"],
    amount: 20,
    radius: 18,
    speed: 9.0
  }, {
    type: "wall",
    amount: 9,
    radius: 30,
    speed: 15
  }],
  "80": [{
    type: ["icicle", "normal"],
    amount: 18,
    radius: 18,
    speed: 9.0
  }, {
    type: ["icicle", "normal"],
    amount: 5,
    radius: 90,
    speed: 12.0
  }, {
    type: "wall",
    amount: 9,
    radius: 30,
    speed: 15
  }],
  "82": [{
    type: ["slippery"],
    amount: 5,
    radius: 18,
    speed: 6.0
  }],
  "83": [{
    type: ["slippery"],
    amount: 10,
    radius: 18,
    speed: 6.0
  }],
  "84": [{
    type: ["slippery"],
    amount: 10,
    radius: 18,
    speed: 6.0
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 3.3
  }],
  "85": [{
    type: ["slippery", "homing"],
    amount: 10,
    radius: 18,
    speed: 6.0
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 3.3
  }],
  "86": [{
    type: ["ice sniper", "normal"],
    amount: 5,
    radius: 18,
    speed: 3.0
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 3.3
  }],
  "87": [{
    type: ["ice sniper", "normal"],
    amount: 8,
    radius: 18,
    speed: 4.0
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 3.3
  }],
  "88": [{
    type: ["ice sniper", "normal"],
    amount: 10,
    radius: 18,
    speed: 5.0
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 3.3
  }],
  "89": [{
    type: ["ice sniper", "normal"],
    amount: 15,
    radius: 18,
    speed: 6.0
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 3.3
  }],
  "90": [{
    type: ["ice sniper", "normal"],
    amount: 15,
    radius: 18,
    speed: 6.0
  }, {
    type: ["slower", "draining"],
    amount: 6,
    radius: 18,
    speed: 3.0
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 3.3
  }],
  "91": [{
    type: ["liquid", "icicle"],
    amount: 10,
    radius: 18,
    speed: 6.0
  }, {
    type: ["freezing", "ice sniper"],
    amount: 5,
    radius: 18,
    speed: 3.0
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 5
  }],
  "92": [{
    type: ["liquid", "icicle"],
    amount: 20,
    radius: 18,
    speed: 6.0
  }, {
    type: ["freezing", "ice sniper"],
    amount: 5,
    radius: 18,
    speed: 3.0
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 5
  }],
  "93": [{
    type: ["liquid", "icicle"],
    amount: 20,
    radius: 18,
    speed: 6.0
  }, {
    type: ["freezing", "ice sniper"],
    amount: 5,
    radius: 18,
    speed: 3.0
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 5
  }],
  "94": [{
    type: ["liquid", "icicle"],
    amount: 25,
    radius: 18,
    speed: 6.0
  }, {
    type: ["freezing", "ice sniper"],
    amount: 5,
    radius: 18,
    speed: 3.0
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 5
  }],
  "95": [{
    type: ["liquid", "icicle"],
    amount: 10,
    radius: 18,
    speed: 6.0
  }, {
    type: ["freezing", "ice sniper"],
    amount: 15,
    radius: 18,
    speed: 3.0
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 5
  }],
  "96": [{
    type: ["normal", "homing", "dasher"],
    amount: 20,
    radius: 3,
    speed: 6.0
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 5
  }],
  "97": [{
    type: ["normal", "homing", "dasher"],
    amount: 20,
    radius: 3,
    speed: 6.0
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 5
  }],
  "98": [{
    type: ["normal", "homing", "dasher"],
    amount: 20,
    radius: 3,
    speed: 6.0
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 5
  }],
  "99": [{
    type: ["normal", "homing", "dasher"],
    amount: 20,
    radius: 3,
    speed: 6.0
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 5
  }],
  "100": [{
    type: ["normal", "homing", "dasher"],
    amount: 30,
    radius: 3,
    speed: 6.0
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 5
  }],
  "101": [{
    type: ["wavy", "zigzag", "spiral", "zoning", "oscillating"],
    amount: 20,
    radius: 18,
    speed: 3.0
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 5
  }],
  "102": [{
    type: ["wavy", "zigzag", "spiral", "zoning", "oscillating"],
    amount: 20,
    radius: 18,
    speed: 3.0
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 5
  }],
  "103": [{
    type: ["wavy", "zigzag", "spiral", "zoning", "oscillating"],
    amount: 25,
    radius: 18,
    speed: 3.0
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 5
  }],
  "104": [{
    type: ["wavy", "zigzag", "spiral", "zoning", "oscillating"],
    amount: 30,
    radius: 18,
    speed: 3.0
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 5
  }],
  "105": [{
    type: ["wavy", "zigzag", "spiral", "zoning", "oscillating"],
    amount: 40,
    radius: 18,
    speed: 3.0
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 5
  }],
  "106": [{
    type: ["octo"],
    amount: 3,
    radius: 30,
    speed: 1.0
  }, {
    type: ["normal"],
    amount: 10,
    radius: 30,
    speed: 6.0
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 5
  }],
  "107": [{
    type: "octo",
    amount: 3,
    radius: 30,
    speed: 3
  }, {
    type: "normal",
    amount: 10,
    radius: 30,
    speed: 6
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 10
  }],
  "108": [{
    type: "octo",
    amount: 5,
    radius: 30,
    speed: 3
  }, {
    type: "normal",
    amount: 10,
    radius: 30,
    speed: 6
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 10
  }],
  "109": [{
    type: "octo",
    amount: 5,
    radius: 30,
    speed: 3
  }, {
    type: "normal",
    amount: 15,
    radius: 30,
    speed: 6
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 10
  }],
  "110": [{
    type: "octo",
    amount: 5,
    radius: 30,
    speed: 3
  }, {
    type: "normal",
    amount: 25,
    radius: 30,
    speed: 3
  }, {
    type: "wall",
    amount: 6,
    radius: 30,
    speed: 10
  }],
  "111": [{
    type: ["regen sniper", "speed sniper"],
    amount: 10,
    radius: 30,
    speed: 1
  }, {
    type: "wall",
    amount: 9,
    radius: 30,
    speed: 10
  }],
  "112": [{
    type: ["regen sniper", "speed sniper"],
    amount: 15,
    radius: 30,
    speed: 1
  }, {
    type: "wall",
    amount: 9,
    radius: 30,
    speed: 10
  }],
  "113": [{
    type: ["regen sniper", "speed sniper"],
    amount: 15,
    radius: 30,
    speed: 1
  }, {
    type: "wall",
    amount: 9,
    radius: 30,
    speed: 10
  }],
  "114": [{
    type: ["regen sniper", "speed sniper"],
    amount: 15,
    radius: 30,
    speed: 1
  }, {
    type: "wall",
    amount: 9,
    radius: 30,
    speed: 10
  }],
  "115": [{
    type: ["regen sniper", "speed sniper"],
    amount: 20,
    radius: 30,
    speed: 1
  }, {
    type: "wall",
    amount: 9,
    radius: 30,
    speed: 10
  }],
  "116": [{
    type: "disabler",
    amount: 10,
    radius: 18,
    speed: 6
  }, {
    type: "wall",
    amount: 9,
    radius: 30,
    speed: 10
  }],
  "117": [{
    type: "disabler",
    amount: 20,
    radius: 18,
    speed: 6
  }, {
    type: "wall",
    amount: 9,
    radius: 30,
    speed: 10
  }],
  "118": [{
    type: "disabler",
    amount: 20,
    radius: 18,
    speed: 6
  }, {
    type: "wall",
    amount: 9,
    radius: 30,
    speed: 10
  }],
  "119": [{
    type: "disabler",
    amount: 10,
    radius: 18,
    speed: 6
  }, {
    type: ["normal", "homing", "dasher"],
    amount: 10,
    radius: 18,
    speed: 9
  }, {
    type: "wall",
    amount: 9,
    radius: 30,
    speed: 15
  }],
  "120": [{
    type: "disabler",
    amount: 9,
    radius: 18,
    speed: 6
  }, {
    type: ["normal", "homing", "dasher"],
    amount: 6,
    radius: 90,
    speed: 9
  }, {
    type: "wall",
    amount: 9,
    radius: 30,
    speed: 15
  }]
}

module.exports = { MONUMENTAL_MIGRATION };


let i = 0;

for (let k of Object.keys(MONUMENTAL_MIGRATION)) {
  let area = MONUMENTAL_MIGRATION[k];
  let newArea = [];
  let newArea2 = [];
  let newArea3 = [];
  let newArea4 = [];
  for (let e of Object.keys(area)) {
    let enemy = area[e];
    newArea.push({
      type: enemy.type,
      amount: enemy.amount,
      radius: enemy.radius,
      speed: enemy.speed * 1.5
    })
    newArea2.push({
      type: enemy.type,
      amount: enemy.amount * 1.5,
      radius: enemy.radius,
      speed: enemy.speed
    })
    newArea3.push({
      type: enemy.type,
      amount: enemy.amount,
      radius: enemy.radius * 1.5,
      speed: enemy.speed
    })
    newArea4.push({
      type: enemy.type,
      amount: enemy.amount * 1.5,
      radius: enemy.radius * 1.5,
      speed: enemy.speed * 1.5
    })
    
  }
  if (k != 1){
    MONUMENTAL_MIGRATION[Number(k) + 120] = newArea;
    MONUMENTAL_MIGRATION[Number(k) + 240] = newArea2;
    if (k < 81){
    MONUMENTAL_MIGRATION[Number(k) + 360] = newArea3;
    }
    else{
    MONUMENTAL_MIGRATION[Number(k) + 360] = newArea4;
    }
    
  }
  i++
}

