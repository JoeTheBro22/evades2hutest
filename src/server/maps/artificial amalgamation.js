const ARTIFICIAL_AMALGAMATION = {
	"index": 18,
	"1": [],
  "2": [],
  "3": [],
  "4": [],
  "5": [],
  "6": [],
  "7": [],
  "8": [],
  "9": [],
  "10": [],
  "11": [],
  "12": [],
  "13": [],
  "14": [],
  "15": [],
  "16": [],
  "17": [],
  "18": [],
  "19": [],
  "20": [],
  "21": [],
  "22": [],
  "23": [],
  "24": [],
  "25": [],
  "26": [],
  "27": [],
  "28": [],
  "29": [],
  "30": [],
  "31": [],
  "32": [],
  "33": [],
  "34": [],
  "35": [],
  "36": [],
  "37": [],
  "38": [],
  "39": [],
  "40": [],
  "41": [],
  "42": [],
  "43": [],
  "44": [],
  "45": [],
  "46": [],
  "47": [],
  "48": [],
  "49": [],
  "50": [],
}
for (let k of Object.keys(ARTIFICIAL_AMALGAMATION)) {
  let area = ARTIFICIAL_AMALGAMATION[k];
  let newArea = [];
  let newArea2 = [];
  let newArea3 = [];
  let newArea4 = [];
  let newArea5 = [];
  let newArea6 = [];
  let newArea7 = [];
  let newArea8 = [];
  let newArea9 = [];
  let newArea10 = [];
  let newArea11 = [];
  let newArea12 = [];
  let newArea13 = [];
  let newArea14 = [];
  let newArea15 = [];
  let newArea16 = [];
  let newArea17 = [];
  let newArea18 = [];
  let newArea19 = [];
  let newArea20 = [];
  let newArea21 = [];
  let newArea22 = [];
  let newArea23 = [];
  let newArea24 = [];
  let typesList = ['normal', 'warp', 'transangle', 'slower', 'lag', 'spiral', 'ultraspiral', 'amogus', 'become', 'ok', 'lmao', 'tornado', 'oscillating', 
  'megafreezing', 'invert', 'jumper', 'subzero', 'disabler', 'retracing', 'disabled', 'immunedisabler', 'sniper', 'tpshooter', 'octo', 'offsetocto', 'switch',
  'draining', 'megaDraining', 'wavy', 'sizing', 'expanding', 'freezing', 'ice sniper', 'regen sniper', 'speed sniper', 'turning', 'slippery', 'zoning', 'zigzag', 'pull',
  'snake', 'rain', 'push', 'evilsnake', 'eviljumper', 'immunefreezing', 'immunepull', 'immunepush', 'nebula', 'blackhole', 'lifeswitcher', 'playershield',
  'toxic', 'immunetoxic', 'tired', 'icicle', 'scared', 'soldier', 'creeper', 'wall', 'sidestep', 'flappy', 'dasher', 'rotate', 'wallsprayer', 'frog', 
  'evilfrog', 'tp', 'sideways', 'homing', 'superhoming', 'liquid'];
  //1/3
  newArea.push({
    type: typesList[Math.floor(Math.random() * (typesList.length-1))],
    amount: 1+Math.ceil(Math.random()*(15+10/3)),
    radius: 8+Math.abs(Math.ceil(Math.random()*(40+10/3))),
    speed: 2+Math.ceil(Math.random()*(8+1/3))
  });
  newArea2.push({
    type: typesList[Math.floor(Math.random() * (typesList.length-1))],
    amount: 1+Math.ceil(Math.random()*(15+20/3)),
    radius: 8+Math.abs(Math.ceil(Math.random()*(40+20/3))),
    speed: 2+Math.ceil(Math.random()*(8+2/3))
  });
  newArea3.push({
    type: typesList[Math.floor(Math.random() * (typesList.length-1))],
    amount: 1+Math.ceil(Math.random()*(15+30/3)),
    radius: 8+Math.abs(Math.ceil(Math.random()*(40+30/3))),
    speed: 2+Math.ceil(Math.random()*(8+3/3))
  });
  newArea4.push({
    type: typesList[Math.floor(Math.random() * (typesList.length-1))],
    amount: 1+Math.ceil(Math.random()*(15+40/3)),
    radius: 8+Math.abs(Math.ceil(Math.random()*(40+40/3))),
    speed: 2+Math.ceil(Math.random()*(8+4/3))
  });
  newArea5.push({
    type: typesList[Math.floor(Math.random() * (typesList.length-1))],
    amount: 1+Math.ceil(Math.random()*(15+50/3)),
    radius: 8+Math.abs(Math.ceil(Math.random()*(40+50/3))),
    speed: 2+Math.ceil(Math.random()*(8+5/3))
  });
  newArea6.push({
    type: typesList[Math.floor(Math.random() * (typesList.length-1))],
    amount: 1+Math.ceil(Math.random()*(15+60/3)),
    radius: 8+Math.abs(Math.ceil(Math.random()*(40+60/3))),
    speed: 2+Math.ceil(Math.random()*(8+6/3))
  });
  newArea7.push({
    type: typesList[Math.floor(Math.random() * (typesList.length-1))],
    amount: 1+Math.ceil(Math.random()*(15+70/3)),
    radius: 8+Math.abs(Math.ceil(Math.random()*(40+70/3))),
    speed: 2+Math.ceil(Math.random()*(8+7/3))
  });
  newArea8.push({
    type: typesList[Math.floor(Math.random() * (typesList.length-1))],
    amount: 1+Math.ceil(Math.random()*(15+80/3)),
    radius: 8+Math.abs(Math.ceil(Math.random()*(40+80/3))),
    speed: 2+Math.ceil(Math.random()*(8+8/3))
  });



  //2/3
  newArea9.push({
    type: typesList[Math.floor(Math.random() * (typesList.length-1))],
    amount: Math.ceil(1+Math.ceil(Math.random()*(15+90/3))/1.5),
    radius: Math.ceil(8+Math.abs(Math.ceil(Math.random()*(40+90/3)))/1.5),
    speed: Math.ceil(2+Math.ceil(Math.random()*(8+9/3))/1.5)
  }, {
    type: typesList[Math.floor(Math.random() * (typesList.length-1))],
    amount: Math.ceil(1+Math.ceil(Math.random()*(15+90/3))/1.5),
    radius: Math.ceil(8+Math.abs(Math.ceil(Math.random()*(40+90/3)))/1.5),
    speed: Math.ceil(2+Math.ceil(Math.random()*(8+9/3))/1.5)
  });
  newArea10.push({
    type: typesList[Math.floor(Math.random() * (typesList.length-1))],
    amount: Math.ceil(1+Math.ceil(Math.random()*(15+100/3))/1.5),
    radius: Math.ceil(8+Math.abs(Math.ceil(Math.random()*(40+100/3)))/1.5),
    speed: Math.ceil(2+Math.ceil(Math.random()*(8+10/3))/1.5)
  }, {
    type: typesList[Math.floor(Math.random() * (typesList.length-1))],
    amount: Math.ceil(1+Math.ceil(Math.random()*(15+100/3))/1.5),
    radius: Math.ceil(8+Math.abs(Math.ceil(Math.random()*(40+100/3)))/1.5),
    speed: Math.ceil(2+Math.ceil(Math.random()*(8+10/3))/1.5)
  });
  newArea11.push({
    type: typesList[Math.floor(Math.random() * (typesList.length-1))],
    amount: Math.ceil(1+Math.ceil(Math.random()*(15+110/3))/1.5),
    radius: Math.ceil(8+Math.abs(Math.ceil(Math.random()*(40+110/3)))/1.5),
    speed: Math.ceil(2+Math.ceil(Math.random()*(8+11/3))/1.5)
  }, {
    type: typesList[Math.floor(Math.random() * (typesList.length-1))],
    amount: Math.ceil(1+Math.ceil(Math.random()*(15+110/3))/1.5),
    radius: Math.ceil(8+Math.abs(Math.ceil(Math.random()*(40+110/3)))/1.5),
    speed: Math.ceil(2+Math.ceil(Math.random()*(8+11/3))/1.5)
  });
  newArea12.push({
    type: typesList[Math.floor(Math.random() * (typesList.length-1))],
    amount: Math.ceil(1+Math.ceil(Math.random()*(15+120/3))/1.5),
    radius: Math.ceil(8+Math.abs(Math.ceil(Math.random()*(40+120/3)))/1.5),
    speed: Math.ceil(2+Math.ceil(Math.random()*(8+12/3))/1.5)
  }, {
    type: typesList[Math.floor(Math.random() * (typesList.length-1))],
    amount: Math.ceil(1+Math.ceil(Math.random()*(15+120/3))/1.5),
    radius: Math.ceil(8+Math.abs(Math.ceil(Math.random()*(40+120/3)))/1.5),
    speed: Math.ceil(2+Math.ceil(Math.random()*(8+12/3))/1.5)
  });
  newArea13.push({
    type: typesList[Math.floor(Math.random() * (typesList.length-1))],
    amount: Math.ceil(1+Math.ceil(Math.random()*(15+130/3))/1.5),
    radius: Math.ceil(8+Math.abs(Math.ceil(Math.random()*(40+130/3)))/1.5),
    speed: Math.ceil(2+Math.ceil(Math.random()*(8+13/3))/1.5)
  }, {
    type: typesList[Math.floor(Math.random() * (typesList.length-1))],
    amount: Math.ceil(1+Math.ceil(Math.random()*(15+130/3))/1.5),
    radius: Math.ceil(8+Math.abs(Math.ceil(Math.random()*(40+130/3)))/1.5),
    speed: Math.ceil(2+Math.ceil(Math.random()*(8+13/3))/1.5)
  });
  newArea14.push({
    type: typesList[Math.floor(Math.random() * (typesList.length-1))],
    amount: Math.ceil(1+Math.ceil(Math.random()*(15+140/3))/1.5),
    radius: Math.ceil(8+Math.abs(Math.ceil(Math.random()*(40+140/3)))/1.5),
    speed: Math.ceil(2+Math.ceil(Math.random()*(8+14/3))/1.5)
  }, {
    type: typesList[Math.floor(Math.random() * (typesList.length-1))],
    amount: Math.ceil(1+Math.ceil(Math.random()*(15+140/3))/1.5),
    radius: Math.ceil(8+Math.abs(Math.ceil(Math.random()*(40+140/3)))/1.5),
    speed: Math.ceil(2+Math.ceil(Math.random()*(8+14/3))/1.5)
  });
  newArea15.push({
    type: typesList[Math.floor(Math.random() * (typesList.length-1))],
    amount: Math.ceil(1+Math.ceil(Math.random()*(15+150/3))/1.5),
    radius: Math.ceil(8+Math.abs(Math.ceil(Math.random()*(40+150/3)))/1.5),
    speed: Math.ceil(2+Math.ceil(Math.random()*(8+15/3))/1.5)
  }, {
    type: typesList[Math.floor(Math.random() * (typesList.length-1))],
    amount: Math.ceil(1+Math.ceil(Math.random()*(15+150/3))/1.5),
    radius: Math.ceil(8+Math.abs(Math.ceil(Math.random()*(40+150/3)))/1.5),
    speed: Math.ceil(2+Math.ceil(Math.random()*(8+15/3))/1.5)
  });
  newArea16.push({
    type: typesList[Math.floor(Math.random() * (typesList.length-1))],
    amount: Math.ceil(1+Math.ceil(Math.random()*(15+160/3))/1.5),
    radius: Math.ceil(8+Math.abs(Math.ceil(Math.random()*(40+160/3)))/1.5),
    speed: Math.ceil(2+Math.ceil(Math.random()*(8+16/3))/1.5)
  }, {
    type: typesList[Math.floor(Math.random() * (typesList.length-1))],
    amount: Math.ceil(1+Math.ceil(Math.random()*(15+160/3))/1.5),
    radius: Math.ceil(8+Math.abs(Math.ceil(Math.random()*(40+160/3)))/1.5),
    speed: Math.ceil(2+Math.ceil(Math.random()*(8+16/3))/1.5)
  });


  //3/3
  newArea17.push({
    type: typesList[Math.floor(Math.random() * (typesList.length-1))],
    amount: Math.ceil((3+Math.ceil(Math.random()*(15+170/3)))/2),
    radius: Math.ceil((8+Math.abs(Math.ceil(Math.random()*(40+170/3))))/2),
    speed: Math.ceil((6+Math.ceil(Math.random()*(8+17/3)))/2)
  }, {
    type: typesList[Math.floor(Math.random() * (typesList.length-1))],
    amount: Math.ceil((3+Math.ceil(Math.random()*(15+170/3)))/2),
    radius: Math.ceil((8+Math.abs(Math.ceil(Math.random()*(40+170/3))))/2),
    speed: Math.ceil((6+Math.ceil(Math.random()*(8+17/3)))/2)
  }, {
    type: typesList[Math.floor(Math.random() * (typesList.length-1))],
    amount: Math.ceil((3+Math.ceil(Math.random()*(15+170/3)))/2),
    radius: Math.ceil((8+Math.abs(Math.ceil(Math.random()*(40+170/3))))/2),
    speed: Math.ceil((6+Math.ceil(Math.random()*(8+17/3)))/2)
  });
  newArea18.push({
    type: typesList[Math.floor(Math.random() * (typesList.length-1))],
    amount: Math.ceil((3+Math.ceil(Math.random()*(15+180/3)))/2),
    radius: Math.ceil((8+Math.abs(Math.ceil(Math.random()*(40+180/3))))/2),
    speed: Math.ceil((6+Math.ceil(Math.random()*(8+18/3)))/2)
  }, {
    type: typesList[Math.floor(Math.random() * (typesList.length-1))],
    amount: Math.ceil((3+Math.ceil(Math.random()*(15+180/3)))/2),
    radius: Math.ceil((8+Math.abs(Math.ceil(Math.random()*(40+180/3))))/2),
    speed: Math.ceil((6+Math.ceil(Math.random()*(8+18/3)))/2)
  }, {
    type: typesList[Math.floor(Math.random() * (typesList.length-1))],
    amount: Math.ceil((3+Math.ceil(Math.random()*(15+180/3)))/2),
    radius: Math.ceil((8+Math.abs(Math.ceil(Math.random()*(40+180/3))))/2),
    speed: Math.ceil((6+Math.ceil(Math.random()*(8+18/3)))/2)
  });
  newArea19.push({
    type: typesList[Math.floor(Math.random() * (typesList.length-1))],
    amount: Math.ceil((3+Math.ceil(Math.random()*(15+180/3)))/2),
    radius: Math.ceil((8+Math.abs(Math.ceil(Math.random()*(40+180/3))))/2),
    speed: Math.ceil((6+Math.ceil(Math.random()*(8+18/3)))/2)
  }, {
    type: typesList[Math.floor(Math.random() * (typesList.length-1))],
    amount: Math.ceil((3+Math.ceil(Math.random()*(15+180/3)))/2),
    radius: Math.ceil((8+Math.abs(Math.ceil(Math.random()*(40+180/3))))/2),
    speed: Math.ceil((6+Math.ceil(Math.random()*(8+18/3)))/2)
  }, {
    type: typesList[Math.floor(Math.random() * (typesList.length-1))],
    amount: Math.ceil((3+Math.ceil(Math.random()*(15+180/3)))/2),
    radius: Math.ceil((8+Math.abs(Math.ceil(Math.random()*(40+180/3))))/2),
    speed: Math.ceil((6+Math.ceil(Math.random()*(8+18/3)))/2)
  });
  newArea20.push({
    type: typesList[Math.floor(Math.random() * (typesList.length-1))],
    amount: Math.ceil((3+Math.ceil(Math.random()*(15+200/3)))/2),
    radius: Math.ceil((8+Math.abs(Math.ceil(Math.random()*(40+200/3))))/2),
    speed: Math.ceil((6+Math.ceil(Math.random()*(8+20/3)))/2)
  }, {
    type: typesList[Math.floor(Math.random() * (typesList.length-1))],
    amount: Math.ceil((3+Math.ceil(Math.random()*(15+200/3)))/2),
    radius: Math.ceil((8+Math.abs(Math.ceil(Math.random()*(40+200/3))))/2),
    speed: Math.ceil((6+Math.ceil(Math.random()*(8+20/3)))/2)
  }, {
    type: typesList[Math.floor(Math.random() * (typesList.length-1))],
    amount: Math.ceil((3+Math.ceil(Math.random()*(15+200/3)))/2),
    radius: Math.ceil((8+Math.abs(Math.ceil(Math.random()*(40+200/3))))/2),
    speed: Math.ceil((6+Math.ceil(Math.random()*(8+20/3)))/2)
  });
  newArea21.push({
    type: typesList[Math.floor(Math.random() * (typesList.length-1))],
    amount: Math.ceil((3+Math.ceil(Math.random()*(15+210/3)))/2),
    radius: Math.ceil((8+Math.abs(Math.ceil(Math.random()*(40+210/3))))/2),
    speed: Math.ceil((6+Math.ceil(Math.random()*(8+21/3)))/2)
  }, {
    type: typesList[Math.floor(Math.random() * (typesList.length-1))],
    amount: Math.ceil((3+Math.ceil(Math.random()*(15+210/3)))/2),
    radius: Math.ceil((8+Math.abs(Math.ceil(Math.random()*(40+210/3))))/2),
    speed: Math.ceil((6+Math.ceil(Math.random()*(8+21/3)))/2)
  }, {
    type: typesList[Math.floor(Math.random() * (typesList.length-1))],
    amount: Math.ceil((3+Math.ceil(Math.random()*(15+210/3)))/2),
    radius: Math.ceil((8+Math.abs(Math.ceil(Math.random()*(40+210/3))))/2),
    speed: Math.ceil((6+Math.ceil(Math.random()*(8+21/3)))/2)
  });
  newArea22.push({
    type: typesList[Math.floor(Math.random() * (typesList.length-1))],
    amount: Math.ceil((3+Math.ceil(Math.random()*(15+220/3)))/1.75),
    radius: Math.ceil((8+Math.abs(Math.ceil(Math.random()*(40+220/3))))/1.75),
    speed: Math.ceil((6+Math.ceil(Math.random()*(8+22/3)))/1.75)
  }, {
    type: typesList[Math.floor(Math.random() * (typesList.length-1))],
    amount: Math.ceil((3+Math.ceil(Math.random()*(15+220/3)))/1.75),
    radius: Math.ceil((8+Math.abs(Math.ceil(Math.random()*(40+220/3))))/1.75),
    speed: Math.ceil((6+Math.ceil(Math.random()*(8+22/3)))/1.75)
  }, {
    type: typesList[Math.floor(Math.random() * (typesList.length-1))],
    amount: Math.ceil((3+Math.ceil(Math.random()*(15+220/3)))/1.75),
    radius: Math.ceil((8+Math.abs(Math.ceil(Math.random()*(40+220/3))))/1.75),
    speed: Math.ceil((6+Math.ceil(Math.random()*(8+22/3)))/1.75)
  });
  newArea23.push({
    type: typesList[Math.floor(Math.random() * (typesList.length-1))],
    amount: Math.ceil((3+Math.ceil(Math.random()*(15+230/3)))/1.5),
    radius: Math.ceil((8+Math.abs(Math.ceil(Math.random()*(40+230/3))))/1.5),
    speed: Math.ceil((6+Math.ceil(Math.random()*(8+23/3)))/1.5)
  }, {
    type: typesList[Math.floor(Math.random() * (typesList.length-1))],
    amount: Math.ceil((3+Math.ceil(Math.random()*(15+230/3)))/1.5),
    radius: Math.ceil((8+Math.abs(Math.ceil(Math.random()*(40+230/3))))/1.5),
    speed: Math.ceil((6+Math.ceil(Math.random()*(8+23/3)))/1.5)
  }, {
    type: typesList[Math.floor(Math.random() * (typesList.length-1))],
    amount: Math.ceil((3+Math.ceil(Math.random()*(15+230/3)))/1.5),
    radius: Math.ceil((8+Math.abs(Math.ceil(Math.random()*(40+230/3))))/1.5),
    speed: Math.ceil((6+Math.ceil(Math.random()*(8+23/3)))/1.5)
  });
  newArea24.push({
    type: typesList[Math.floor(Math.random() * (typesList.length-1))],
    amount: Math.ceil(3+Math.ceil(Math.random()*(15+240/3))),
    radius: Math.ceil(8+Math.abs(Math.ceil(Math.random()*(40+240/3)))),
    speed: Math.ceil(6+Math.ceil(Math.random()*(8+24/3)))
  }, {
    type: typesList[Math.floor(Math.random() * (typesList.length-1))],
    amount: Math.ceil(3+Math.ceil(Math.random()*(15+240/3))),
    radius: Math.ceil(8+Math.abs(Math.ceil(Math.random()*(40+240/3)))),
    speed: Math.ceil(6+Math.ceil(Math.random()*(8+24/3)))
  }, {
    type: typesList[Math.floor(Math.random() * (typesList.length-1))],
    amount: Math.ceil(3+Math.ceil(Math.random()*(15+240/3))),
    radius: Math.ceil(8+Math.abs(Math.ceil(Math.random()*(40+240/3)))),
    speed: Math.ceil(6+Math.ceil(Math.random()*(8+24/3)))
  }, {
    type: typesList[Math.floor(Math.random() * (typesList.length-1))],
    amount: Math.ceil(3+Math.ceil(Math.random()*(15+240/3))),
    radius: Math.ceil(8+Math.abs(Math.ceil(Math.random()*(40+240/3)))),
    speed: Math.ceil(6+Math.ceil(Math.random()*(8+24/3)))
  });
  ARTIFICIAL_AMALGAMATION[Number(k)] = newArea;
  ARTIFICIAL_AMALGAMATION[Number(k) + 50] = newArea2;
  ARTIFICIAL_AMALGAMATION[Number(k) + 100] = newArea3;
  ARTIFICIAL_AMALGAMATION[Number(k) + 150] = newArea4;
  ARTIFICIAL_AMALGAMATION[Number(k) + 200] = newArea5;
  ARTIFICIAL_AMALGAMATION[Number(k) + 250] = newArea6;
  ARTIFICIAL_AMALGAMATION[Number(k) + 300] = newArea7;
  ARTIFICIAL_AMALGAMATION[Number(k) + 350] = newArea8;
  ARTIFICIAL_AMALGAMATION[Number(k) + 400] = newArea9;
  ARTIFICIAL_AMALGAMATION[Number(k) + 450] = newArea10;
  ARTIFICIAL_AMALGAMATION[Number(k) + 500] = newArea11;
  ARTIFICIAL_AMALGAMATION[Number(k) + 550] = newArea12;
  ARTIFICIAL_AMALGAMATION[Number(k) + 600] = newArea13;
  ARTIFICIAL_AMALGAMATION[Number(k) + 650] = newArea14;
  ARTIFICIAL_AMALGAMATION[Number(k) + 700] = newArea15;
  ARTIFICIAL_AMALGAMATION[Number(k) + 750] = newArea16;
  ARTIFICIAL_AMALGAMATION[Number(k) + 800] = newArea17;
  ARTIFICIAL_AMALGAMATION[Number(k) + 850] = newArea18;
  ARTIFICIAL_AMALGAMATION[Number(k) + 900] = newArea19;
  ARTIFICIAL_AMALGAMATION[Number(k) + 950] = newArea20;
  ARTIFICIAL_AMALGAMATION[Number(k) + 1000] = newArea21;
  ARTIFICIAL_AMALGAMATION[Number(k) + 1050] = newArea22;
  ARTIFICIAL_AMALGAMATION[Number(k) + 1100] = newArea23;
  ARTIFICIAL_AMALGAMATION[Number(k) + 1150] = newArea24;
}


module.exports = { ARTIFICIAL_AMALGAMATION }