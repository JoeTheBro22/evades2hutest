const CENTRAL_CROSSING = {
	"index": 16,
	"width": [514.29, 514.29, 514.29, 514.29, 514.29, 100, 100, 30, 10, 20, 514.29, 514.29, 514.29, 1000, 1000, 514.29, 1000, 1000, 1000, 1300 /*this 1000 is the 20 mark */, 20, 30, 30, 40, 514.29, 514.29, 60, 100, 514.29, 514.29, /*this 514.29 ON THE LEFT is the 30 mark*/ 520, 514.29, 80, 100, 100, 60, 100, 100, 3085.74, 514.29, 1000,
	/*42 to the right*/514.29, 514.29, 514.29, 514.29, 30, 4000, 4000, 1000, 1200/*50 to the left */, 500, 2500, 2500, 2500, 3000, 3000, 3000, 3000, 3000, 500, /*left is the 60 mark */1200, 1200, 1200, 1200, 20, 514.29, 514.29, 512.29, 512.29, 514.29, 514.29, /*LEFT is the 70 mark*/ 514.29, 514.29, 514.29, 514.29, 514.29, 514.29, 514.29, 514.29, 3085.74, 3000, 2400],
	"height": [514.29, 514.29, 514.29, 514.29, 514.29, 514.29, 514.29, 514.29, 514.29, 514.29, 514.29, 514.29, 514.29, 514.29, 514.29, 514.29, 514.29, 514.29, 514.29, 514.29, 
		514.29, 514.29, 514.29, 514.29, 514.29, 514.29, 514.29, 514.29, 514.29, 514.29, 514.29, 514.29, 514.29, 514.29, 514.29, 514.29, 514.29, 514.29, 514.29, 514.29, //each thing is 20
		514.29, 514.29, 514.29, 514.29, 514.29, 514.29, 514.29, 514.29, 100, 100,/*50 on left*/ 500, 500, 500, 500, 514.29, 514.29, 514.29, 514.29, 514.29, 500, 
		100, 100, 200, 200, 1000, 514.29, 514.29, 514.29, 514.29, 514.29, 514.29, 514.29, 514.29, 514.29, 514.29, 514.29, 514.29, 514.29, 514.29, 200],
	//1-10 basic enemies (switch, immunetoxic, and wall)
	//11-20 path enemies
	//21-30 shield enemies + other tireless trek enemies
	//31-40 callback to all zones before, with spiral and liquid enemies as well
	//41-50 Jumping enemies (like the ones in tt hallucination)
	//51-60 worlds hardest game style levels with wall and path enemies
	//61-70 racing levels against balls like that one map in e1 also with some stun snipers maybe
	//71-80 all boss levels but harder and 79 80 tbd
	"1": [{
		type: "wall",
		amount: 1,
		radius: 514.29/4,
		speed: 10
	}],
	"2": [{
		type: "wall",
		amount: 2,
		radius: 514.29/4,
		speed: 15
	}],
	"3": [{
		type: "switch",
		amount: 1,
		radius: 514.29/2,
		speed: 0
	}],
	"4": [{
		type: "switch",
		amount: 3,
		radius: 514.29/3,
		speed: 10
	}],
	"5": [{
		type: "wall",
		amount: 2,
		radius: 514.29/4,
		speed: 15
	}, {
		type: "slower",
		amount: 1,
		radius: 15,
		speed: 18
	}, {
		type: "switch",
		amount: 1,
		radius: 514.29/2,
		speed: 0
	}],
	"6": [{
		type: "immunetoxic",
		amount: 1,
		radius: 50,
		speed: 10
	}],
	"7": [{
		type: "immunetoxic",
		amount: 5,
		radius: 50,
		speed: 12
	}],
	"8": [{
		type: "immunetoxic",
		amount: 7,
		radius: 15,
		speed: 20
	}],
	"9": [{
		type: "immunetoxic",
		amount: 14,
		radius: 5,
		speed: 8
	}],
	"10": [{
		type: "rain",
		amount: 16,
		radius: 10,
		speed: 6
	}],
	"11": [{
		type: "path",
		amount: 1,
		radius: 50,
		path: [[529.29-50, 529.29-50, 10], [50, 50, 10]]
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[529.29-50, 50, 10], [50, 529.29-50, 10]]
	}],
	"12": [{
		type: "path",
		amount: 1,
		radius: 50,
		path: [[50, 50, (529.29-100)/50], [50, 529.29-50, (529.29-100)/50], [529.29-50, 529.29-50, (529.29-100)/50], [529.29-50, 50, (529.29-100)/50]]
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[100, 100, (529.29-200)/50], [100, 529.29-100, (529.29-200)/50], [529.29-100, 529.29-100, (529.29-200)/50], [529.29-100, 100, (529.29-200)/50]]
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[529.29-150, 529.29-150, (529.29-300)/50], [529.29-150, 150, (529.29-300)/50], [150, 150, (529.29-300)/50], [150, 529.29-150, (529.29-300)/50]]
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[529.29-50, 529.29-50, (529.29-100)/50], [529.29-50, 50, (529.29-100)/50], [50, 50, (529.29-100)/50], [50, 529.29-50, (529.29-100)/50]]
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[529.29-100, 529.29-100, (529.29-200)/50], [529.29-100, 100, (529.29-200)/50], [100, 100, (529.29-200)/50], [100, 529.29-100, (529.29-200)/50]]
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[150, 150, (529.29-300)/50], [150, 529.29-150, (529.29-300)/50], [529.29-150, 529.29-150, (529.29-300)/50], [529.29-150, 150, (529.29-300)/50]]
	}],
	"13": [{
		type: "path",
		amount: 1,
		radius: 50,
		path: [[50, 50, 10], [50, 529.29-50, 10], [529.29-50, 529.29-50, 10], [529.29-50, 50, 10]]
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[529.29/2, 529.29/2, 10], [0, 0, 10]]
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[529.29/2, 529.29/2, 10], [529.29/2, 0, 10]]
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[529.29/2, 529.29/2, 10], [529.29, 0, 10]]
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[529.29/2, 529.29/2, 10], [529.29, 529.29/2, 10]]
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[529.29/2, 529.29/2, 10], [529.29, 529.29, 10]]
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[529.29/2, 529.29/2, 10], [529.29/2, 529.29, 10]]
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[529.29/2, 529.29/2, 10], [0, 529.29, 10]]
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[529.29/2, 529.29/2, 10], [0, 529.29/2, 10]]
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[529.29/2, 529.29/2, 10], [529.29/2, 529.29/2, 10]]
	}],
	"14": [{
		type: "path",
		amount: 1,
		radius: 50,
		path: [[50, 0, 10], [50, 529.29/2, 10]]
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[150, 0, 10], [150, 529.29/2, 10]]
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[250, 0, 10], [250, 529.29/2, 10]]
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[350, 0, 10], [350, 529.29/2, 10]]
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[450, 0, 10], [450, 529.29/2, 10]]
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[550, 0, 10], [550, 529.29/2, 10]]
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[650, 0, 10], [650, 529.29/2, 10]]
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[750, 0, 10], [750, 529.29/2, 10]]
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[850, 0, 10], [850, 529.29/2, 10]]
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[950, 0, 10], [950, 529.29/2, 10]]
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[50, 529.29/2, 10], [50, 529.29, 10]]
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[150, 529.29/2, 10], [150, 529.29, 10]]
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[250, 529.29/2, 10], [250, 529.29, 10]]
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[350, 529.29/2, 10], [350, 529.29, 10]]
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[450, 529.29/2, 10], [450, 529.29, 10]]
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[550, 529.29/2, 10], [550, 529.29, 10]]
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[650, 529.29/2, 10], [650, 529.29, 10]]
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[750, 529.29/2, 10], [750, 529.29, 10]]
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[850, 529.29/2, 10], [850, 529.29, 10]]
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[950, 529.29/2, 10], [950, 529.29, 10]]
	}],
	"15": [{
		type: "path",
		amount: 1,
		radius: 50,
		path: [[50, 0, 1], [50, 529.29/2, 1]]
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[150, 0, 2], [150, 529.29/2, 2]]
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[250, 0, 3], [250, 529.29/2, 3]]
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[350, 0, 4], [350, 529.29/2, 4]]
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[450, 0, 5], [450, 529.29/2, 5]]
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[550, 0, 6], [550, 529.29/2, 6]]
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[650, 0, 7], [650, 529.29/2, 7]]
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[50, 529.29/2, 1], [50, 529.29, 1]]
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[150, 529.29/2, 2], [150, 529.29, 2]]
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[250, 529.29/2, 3], [250, 529.29, 3]]
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[350, 529.29/2, 4], [350, 529.29, 4]]
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[450, 529.29/2, 5], [450, 529.29, 5]]
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[550, 529.29/2, 6], [550, 529.29, 6]]
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[650, 529.29/2, 7], [650, 529.29, 7]]
	}],
	"16": [{
		type: "path",
		amount: 1,
		radius: 529/2,
		path: [[529.29/2, -529.29/2, 20], [529.29/2, 529.29/2, 20]]
	}],
	"17": [{
		type: "path",
		amount: 1,
		radius: 529.29/2,
		path: [[529.29/2, -529.29/2, 20], [529.29/2, 529.29/2, 20], [1000-529.29/2, 529.29/2, 20], [1000-529.29/2, -529.29/2, 20]]
	}],
	"18": [{
		type: "path",
		amount: 1,
		radius: 529.29/10,
		path: [[529.29/5, 1.5*529.29/5, 0], [529.29/5, 1.5*529.29/5, 0]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/10,
		path: [[529.29/5, 2.5*529.29/5, 0], [529.29/5, 2.5*529.29/5, 0]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/10,
		path: [[529.29/5, 3.5*529.29/5, 0], [529.29/5, 3.5*529.29/5, 0]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/10,
		path: [[529.29/5, 4.5*529.29/5, 0], [529.29/5, 4.5*529.29/5, 0]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/10,
		path: [[3*529.29/5, 0.5*529.29/5, 0], [3*529.29/5, 0.5*529.29/5, 0]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/10,
		path: [[3*529.29/5, 2.5*529.29/5, 0], [3*529.29/5, 2.5*529.29/5, 0]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/10,
		path: [[3*529.29/5, 3.5*529.29/5, 0], [3*529.29/5, 3.5*529.29/5, 0]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/10,
		path: [[3*529.29/5, 4.5*529.29/5, 0], [3*529.29/5, 4.5*529.29/5, 0]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/10,
		path: [[529.29, 0.5*529.29/5, 0], [529.29, 0.5*529.29/5, 0]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/10,
		path: [[529.29, 1.5*529.29/5, 0], [529.29, 1.5*529.29/5, 0]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/10,
		path: [[529.29, 2.5*529.29/5, 0], [529.29, 2.5*529.29/5, 0]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/10,
		path: [[529.29, 4.5*529.29/5, 0], [529.29, 4.5*529.29/5, 0]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/10,
		path: [[7*529.29/5, 0.5*529.29/5, 0], [7*529.29/5, 0.5*529.29/5, 0]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/10,
		path: [[7*529.29/5, 1.5*529.29/5, 0], [7*529.29/5, 1.5*529.29/5, 0]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/10,
		path: [[7*529.29/5, 2.5*529.29/5, 0], [7*529.29/5, 2.5*529.29/5, 0]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/10,
		path: [[7*529.29/5, 3.5*529.29/5, 0], [7*529.29/5, 3.5*529.29/5, 0]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/10,
		path: [[9*529.29/5, 1.5*529.29/5, 0], [9*529.29/5, 1.5*529.29/5, 0]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/10,
		path: [[9*529.29/5, 2.5*529.29/5, 0], [9*529.29/5, 2.5*529.29/5, 0]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/10,
		path: [[9*529.29/5, 3.5*529.29/5, 0], [9*529.29/5, 3.5*529.29/5, 0]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/10,
		path: [[9*529.29/5, 4.5*529.29/5, 0], [9*529.29/5, 4.5*529.29/5, 0]]
	}],
	"19": [{
		type: "path",
		amount: 1,
		radius: 529.29/10,
		path: [[529.29/5, 1.5*529.29/5, 0], [529.29/5, 1.5*529.29/5, 0]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/10,
		path: [[529.29/5, 2.5*529.29/5, 0], [529.29/5, 2.5*529.29/5, 0]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/10,
		path: [[529.29/5, 3.5*529.29/5, 0], [529.29/5, 3.5*529.29/5, 0]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/10,
		path: [[529.29/5, 4.5*529.29/5, 0], [529.29/5, 4.5*529.29/5, 0]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/10,
		path: [[3*529.29/5, 0.5*529.29/5, 0], [3*529.29/5, 0.5*529.29/5, 0]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/10,
		path: [[3*529.29/5, 2.5*529.29/5, 0], [3*529.29/5, 2.5*529.29/5, 0]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/10,
		path: [[3*529.29/5, 3.5*529.29/5, 0], [3*529.29/5, 3.5*529.29/5, 0]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/10,
		path: [[3*529.29/5, 4.5*529.29/5, 0], [3*529.29/5, 4.5*529.29/5, 0]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/10,
		path: [[529.29, 0.5*529.29/5, 0], [529.29, 0.5*529.29/5, 0]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/10,
		path: [[529.29, 1.5*529.29/5, 0], [529.29, 1.5*529.29/5, 0]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/10,
		path: [[529.29, 2.5*529.29/5, 0], [529.29, 2.5*529.29/5, 0]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/10,
		path: [[529.29, 4.5*529.29/5, 0], [529.29, 4.5*529.29/5, 0]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/10,
		path: [[7*529.29/5, 0.5*529.29/5, 0], [7*529.29/5, 0.5*529.29/5, 0]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/10,
		path: [[7*529.29/5, 1.5*529.29/5, 0], [7*529.29/5, 1.5*529.29/5, 0]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/10,
		path: [[7*529.29/5, 2.5*529.29/5, 0], [7*529.29/5, 2.5*529.29/5, 0]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/10,
		path: [[7*529.29/5, 3.5*529.29/5, 0], [7*529.29/5, 3.5*529.29/5, 0]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/10,
		path: [[9*529.29/5, 1.5*529.29/5, 0], [9*529.29/5, 1.5*529.29/5, 0]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/10,
		path: [[9*529.29/5, 2.5*529.29/5, 0], [9*529.29/5, 2.5*529.29/5, 0]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/10,
		path: [[9*529.29/5, 3.5*529.29/5, 0], [9*529.29/5, 3.5*529.29/5, 0]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/10,
		path: [[9*529.29/5, 4.5*529.29/5, 0], [9*529.29/5, 4.5*529.29/5, 0]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/2,
		path: [[529.29/2, -529.29/2, 10], [529.29/2, 529.29/2, 10], [1000-529.29/2, 529.29/2, 10], [1000-529.29/2, -529.29/2, 10]]
	}],
	"20": [{
		type: "path",
		amount: 1,
		radius: 529.29/10,
		path: [[529.29/5, 1.5*529.29/5, 5], [529.29/5+50, 1.5*529.29/5, 5]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/10,
		path: [[529.29/5, 2.5*529.29/5, 5], [529.29/5+50, 2.5*529.29/5, 5]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/10,
		path: [[529.29/5, 3.5*529.29/5, 5], [529.29/5+50, 3.5*529.29/5, 5]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/10,
		path: [[529.29/5, 4.5*529.29/5, 5], [529.29/5+50, 4.5*529.29/5, 5]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/10,
		path: [[3*529.29/5, 0.5*529.29/5, 5], [3*529.29/5+50, 0.5*529.29/5, 5]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/10,
		path: [[3*529.29/5, 2.5*529.29/5, 5], [3*529.29/5+50, 2.5*529.29/5, 5]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/10,
		path: [[3*529.29/5, 3.5*529.29/5, 5], [3*529.29/5+50, 3.5*529.29/5, 5]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/10,
		path: [[3*529.29/5, 4.5*529.29/5, 5], [3*529.29/5+50, 4.5*529.29/5, 5]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/10,
		path: [[529.29, 0.5*529.29/5, 5], [529.29+50, 0.5*529.29/5, 5]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/10,
		path: [[529.29, 1.5*529.29/5, 5], [529.29+50, 1.5*529.29/5, 5]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/10,
		path: [[529.29, 2.5*529.29/5, 5], [529.29+50, 2.5*529.29/5, 5]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/10,
		path: [[529.29, 4.5*529.29/5, 5], [529.29+50, 4.5*529.29/5, 5]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/10,
		path: [[7*529.29/5, 0.5*529.29/5, 5], [7*529.29/5+50, 0.5*529.29/5, 5]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/10,
		path: [[7*529.29/5, 1.5*529.29/5, 5], [7*529.29/5+50, 1.5*529.29/5, 5]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/10,
		path: [[7*529.29/5, 2.5*529.29/5, 5], [7*529.29/5+50, 2.5*529.29/5, 5]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/10,
		path: [[7*529.29/5, 3.5*529.29/5, 5], [7*529.29/5+50, 3.5*529.29/5, 5]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/10,
		path: [[9*529.29/5, 1.5*529.29/5, 5], [9*529.29/5+50, 1.5*529.29/5, 5]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/10,
		path: [[9*529.29/5, 2.5*529.29/5, 5], [9*529.29/5+50, 2.5*529.29/5, 5]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/10,
		path: [[9*529.29/5, 3.5*529.29/5, 5], [9*529.29/5+50, 3.5*529.29/5, 5]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/10,
		path: [[9*529.29/5, 4.5*529.29/5, 5], [9*529.29/5+50, 4.5*529.29/5, 5]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/2,
		path: [[529.29/2, -529.29/2, 4], [529.29/2, 529.29/2, 4], [1000-529.29/2, 529.29/2, 4], [1000-529.29/2, -529.29/2, 4]]
	}, {
		type: "path",
		amount: 1,
		radius: 529.29/2,
		path: [[1000-529.29/2, 529.29/2, 4], [1000-529.29/2, -529.29/2, 4], [529.29/2, -529.29/2, 4], [529.29/2, 529.29/2, 4]]
	}],
	"21": [{
		type: "liquid",
		amount: 10,
		radius: 5,
		speed: 4
	}],
	"22": [{
		type: "liquid",
		amount: 14,
		radius: 15,
		speed: 8
	}],
	"23": [{
		type: "spiral",
		amount: 5,
		radius: 5,
		speed: 8
	}, {
		type: "liquid",
		amount: 5,
		radius: 5,
		speed: 6
	}],
	"24": [{
		type: "spiral",
		amount: 10,
		radius: 18,
		speed: 12
	}],
	"25": [{
		type: "pull",
		amount: 7,
		radius: 10,
		speed: 2
	}],
	"26": [{
		type: "path",
		amount: 1,
		radius: 50,
		path: [[50, 50, 10], [50, 529.29-50, 10], [529.29-50, 529.29-50, 10], [529.29-50, 50, 10]]
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[50, 529.29-50, 10], [529.29-50, 529.29-50, 10], [529.29-50, 50, 10], [50, 50, 10]]
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[529.29-50, 529.29-50, 10], [529.29-50, 50, 10], [50, 50, 10], [50, 529.29-50, 10]]
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[529.29-50, 50, 10], [50, 50, 10], [50, 529.29-50, 10], [529.29-50, 529.29-50, 10]]
	}, {
		type: "pull",
		amount: 6,
		radius: 10,
		speed: 2
	}],
	"27": [{
		type: "oscillating",
		amount: 10,
		radius: 10,
		speed: 8
	}],
	"28": [{
		type: "tpstart",
		amount: 10,
		radius: 1,
		speed: 5
	}],
	"29": [{
		type: "tpstart",
		amount: 2,
		radius: 1,
		speed: 5
	}, {
		type: "oscillating",
		amount: 2,
		radius: 10,
		speed: 5
	}, {
		type: "pull",
		amount: 2,
		radius: 10,
		speed: 5
	}, {
		type: "spiral",
		amount: 2,
		radius: 10,
		speed: 5
	}, {
		type: "liquid",
		amount: 2,
		radius: 10,
		speed: 5
	}, {
		type: "tornado",
		amount: 2,
		radius: 10,
		speed: 5
	}, {
		type: "path",
		amount: 1,
		radius: 10,
		path: [[529.29-50, 529.29-50, 5], [50, 50, 5]]
	}, {
		type: "wavy",
		amount: 2,
		radius: 10,
		speed: 5
	}, {
		type: "immunetoxic",
		amount: 2,
		radius: 10,
		speed: 5
	}, {
		type: "immune",
		amount: 2,
		radius: 10,
		speed: 5
	}],
	"30": [{
		type: "tpstart",
		amount: 1,
		radius: 1,
		speed: 7
	}, {
		type: "oscillating",
		amount: 1,
		radius: 10,
		speed: 7
	}, {
		type: "spiral",
		amount: 2,
		radius: 10,
		speed: 7
	}, {
		type: "liquid",
		amount: 2,
		radius: 10,
		speed: 7
	}, {
		type: "path",
		amount: 1,
		radius: 10,
		path: [[529.29-50, 529.29-50, 7], [50, 50, 7]]
	}, {
		type: "wavy",
		amount: 2,
		radius: 10,
		speed: 7
	}, {
		type: "immunetoxic",
		amount: 1,
		radius: 10,
		speed: 7
	}, {
		type: "immune",
		amount: 1,
		radius: 10,
		speed: 7
	}, {
		type: "immune",
		amount: 2,
		radius: 10,
		speed: 7
	}, {
		type: "eviljumper",
		amount: 1,
		radius: 10,
		speed: 7
	}],
	"31": [{
		type: "wall",
		amount: 4,
		radius: 514.29/4,
		speed: 10
	}],
	"32": [{
		type: "path",
		amount: 1,
		radius: 50,
		path: [[50, 50, (529.29-100)/25], [50, 529.29-50, (529.29-100)/25], [529.29-50, 529.29-50, (529.29-100)/25], [529.29-50, 50, (529.29-100)/25]]
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[50, 529.29-50, (529.29-100)/25], [529.29-50, 529.29-50, (529.29-100)/25], [529.29-50, 50, (529.29-100)/25], [50, 50, (529.29-100)/25]]
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[100, 100, (529.29-200)/25], [100, 529.29-100, (529.29-200)/25], [529.29-100, 529.29-100, (529.29-200)/25], [529.29-100, 100, (529.29-200)/25]]
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[100, 529.29-100, (529.29-200)/25], [529.29-100, 529.29-100, (529.29-200)/25], [529.29-100, 100, (529.29-200)/25], [100, 100, (529.29-200)/25]]
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[529.29-150, 529.29-150, (529.29-300)/25], [529.29-150, 150, (529.29-300)/25], [150, 150, (529.29-300)/25], [150, 529.29-150, (529.29-300)/25]]
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[529.29-150, 150, (529.29-300)/25], [150, 150, (529.29-300)/25], [150, 529.29-150, (529.29-300)/25], [529.29-150, 529.29-150, (529.29-300)/25]]
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[529.29-50, 529.29-50, (529.29-100)/25], [529.29-50, 50, (529.29-100)/25], [50, 50, (529.29-100)/25], [50, 529.29-50, (529.29-100)/25]]
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[529.29-50, 50, (529.29-100)/25], [50, 50, (529.29-100)/25], [50, 529.29-50, (529.29-100)/25], [529.29-50, 529.29-50, (529.29-100)/25]]
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[529.29-100, 529.29-100, (529.29-200)/25], [529.29-100, 100, (529.29-200)/25], [100, 100, (529.29-200)/25], [100, 529.29-100, (529.29-200)/25]]
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[529.29-100, 100, (529.29-200)/25], [100, 100, (529.29-200)/25], [100, 529.29-100, (529.29-200)/25], [529.29-100, 529.29-100, (529.29-200)/25]]
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[150, 150, (529.29-300)/25], [150, 529.29-150, (529.29-300)/25], [529.29-150, 529.29-150, (529.29-300)/25], [529.29-150, 150, (529.29-300)/25]]
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[150, 529.29-150, (529.29-300)/25], [529.29-150, 529.29-150, (529.29-300)/25], [529.29-150, 150, (529.29-300)/25], [150, 150, (529.29-300)/25]]
	}],
	"33": [{
		type: "liquid",
		amount: 3,
		radius: 40,
		speed: 5
	}, {
		type: "wall",
		amount: 5,
		radius: 40,
		speed: 7
	}],
	"34": [{
		type: "tpstart",
		amount: 2,
		radius: 5,
		speed: 12
	}, {
		type: "wall",
		amount: 4,
		radius: 30,
		speed: 9
	}],
	"35": [{
		type: "slower",
		amount: 6,
		radius: 32,
		speed: 6
	}, {
		type: "liquid",
		amount: 3,
		radius: 40,
		speed: 5
	}],
	"36": [{
		type: "amogus",
		amount: 5,
		radius: 24,
		speed: 10
	}, {
		type: "slower",
		amount: 2,
		radius: 24,
		speed: 1
	}, {
		type: "homing",
		amount: 3,
		radius: 24,
		speed: 3.5
	}],
	"37": [{
		type: "amogus",
		amount: 6,
		radius: 24,
		speed: 12
	}, {
		type: "megafreezing",
		amount: 2,
		radius: 24,
		speed: 1
	}, {
		type: "homing",
		amount: 3,
		radius: 24,
		speed: 3.5
	}],
	"38": [{
		type: "amogus",
		amount: 12,
		radius: 24,
		speed: 14
	}],
	"39": [{
		type: "path",
		amount: 1,
		radius: 40,
		path: [[40, 40, 5], [400, 40, 5]]
	  }, {
		type: "path",
		amount: 1,
		radius: 40,
		path: [[400, 120, 5], [40, 120, 5]]
	  }, {
		type: "path",
		amount: 1,
		radius: 40,
		path: [[40, 200, 5], [400, 200, 5]]
	  }, {
		type: "path",
		amount: 1,
		radius: 40,
		path: [[400, 280, 5], [40, 280, 5]]
	  }, {
		type: "path",
		amount: 1,
		radius: 40,
		path: [[40, 360, 5], [400, 360, 5]]
	  }, {
		type: "path",
		amount: 1,
		radius: 40,
		path: [[400, 440, 5], [40, 440, 5]]
	  }, {
		type: "path",
		amount: 1,
		radius: 40,
		path: [[40, 520, 5], [400, 520, 5]]
	  }, {
		type: "path",
		amount: 1,
		radius: 40,
		path: [[440, 40, 5], [800, 40, 5]]
	  }, {
		type: "path",
		amount: 1,
		radius: 40,
		path: [[800, 120, 5], [440, 120, 5]]
	  }, {
		type: "path",
		amount: 1,
		radius: 40,
		path: [[440, 200, 5], [800, 200, 5]]
	  }, {
		type: "path",
		amount: 1,
		radius: 40,
		path: [[800, 280, 5], [440, 280, 5]]
	  }, {
		type: "path",
		amount: 1,
		radius: 40,
		path: [[440, 360, 5], [800, 360, 5]]
	  }, {
		type: "path",
		amount: 1,
		radius: 40,
		path: [[800, 440, 5], [440, 440, 5]]
	  }, {
		type: "path",
		amount: 1,
		radius: 40,
		path: [[440, 520, 5], [800, 520, 5]]
	  }, {
		type: "path",
		amount: 1,
		radius: 175,
		path: [[1000, 200, 5], [1000, 314, 5]]
	  }, {
		type: "path",
		amount: 1,
		radius: 175,
		path: [[1400, 200, 5], [1400, 314, 5]]
	  }, {
		type: "path",
		amount: 1,
		radius: 20,
		path: [[1200, 20, 0], [1400, 314, 5]]
	  }, {
		type: "path",
		amount: 1,
		radius: 20,
		path: [[1600, 22, 10], [1800, 22, 10]]
	  }, {
		type: "path",
		amount: 1,
		radius: 20,
		path: [[1600, 514 - 22, 10], [1800, 514 - 22, 10]]
	  }, {
		type: "path",
		amount: 1,
		radius: 175,
		path: [[2000, 514.29/2, 0], [2000, 514 - 22, 10]]
	  }, {
		type: "path",
		amount: 1,
		radius: 175,
		path: [[2400, 514.29/2 - 220, 0], [1000, 514 - 22, 10]]
	  }, {
		type: "path",
		amount: 1,
		radius: 175,
		path: [[2400, 514.29/2 + 220, 0], [1000, 514 - 22, 10]]
	  }, {
		type: "path",
		amount: 1,
		radius: 175,
		path: [[2550, 514.29/2 - 218, 0], [1000, 514 - 22, 10]]
	  }, {
		type: "path",
		amount: 1,
		radius: 175,
		path: [[2550, 514.29/2 + 218, 0], [1000, 514 - 22, 10]]
	  }, {
		type: "path",
		amount: 1,
		radius: 175,
		path: [[2950, 514.29/2 - 118, 0], [1000, 514 - 22, 10]]
	  }, {
		type: "path",
		amount: 1,
		radius: 175,
		path: [[2950, 514.29/2 + 318, 0], [1000, 514 - 22, 10]]
	  }, {
		type: "path",
		amount: 1,
		radius: 20,
		path: [[1200, 514.29 - 20, 0], [1400, 314, 5]]
	  }],
	"40": [{
		type: "offsetocto",
		amount: 3,
		radius: 20,
		speed: 5
	}],
	"42": [{
		type: "pulse",
		amount: 3,
		radius: 48,
		speed: 3,
		minTimer: 1500,
		maxTimer: 2500,
	}],
	"43": [{
		type: "pulse",
		amount: 40,
		radius: 100,
		speed: 3,
		minTimer: 1500,
		maxTimer: 2500,
	}],
	"44": [{
		type: "tp",
		amount: 3,
		radius: 60,
		speed: 4,
		minTimer: 1500,
		maxTimer: 1500,
	}],
	"45": [{
		type: "tpstart",
		amount: 3,
		radius: 16,
		speed: 15,
		minTimer: 1500,
		maxTimer: 3000,
	}],
	"46": [{
		type: "pulse",
		amount: 100,
		radius: 15,
		speed: 3,
		minTimer: 500,
		maxTimer: 1000,
	}],
	"47": [{
		type: "normal",
		amount: 144,
		radius: 24,
		speed: 6,
		minTimer: 2150,
		maxTimer: 1850,
		definiteOffset: 100,
	}, {
		type: "playershield",
		amount: 18,
		radius: 8,
		speed: 4,
	}],
	"48": [{
		type: "normal",
		amount: 200,
		radius: 8,
		speed: 14,
		minTimer: 1650,
		maxTimer: 1350,
		definiteOffset: 100,
	}, {
		type: "playershield",
		amount: 14,
		radius: 8,
		speed: 2,
	}],
	"49": [{
		type: "path",
		amount: 1,
		radius: 50,
		path: [[50, 50, 0], [50, 50, 0]],
		minTimer: 3400,
		maxTimer: 1000,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[250, 50, 0], [250, 50, 0]],
		minTimer: 2000,
		maxTimer: 1000,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[450, 50, 0], [450, 50, 0]],
		minTimer: 1200,
		maxTimer: 1000,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[650, 50, 0], [650, 50, 0]],
		minTimer: 800,
		maxTimer: 1000,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[850, 50, 0], [850, 50, 0]],
		minTimer: 500,
		maxTimer: 1000,
	  }],
	"50": [{
		type: "path",
		amount: 1,
		radius: 50,
		path: [[50, 50, 0], [50, 50, 0]],
		minTimer: 3400,
		maxTimer: 1000,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[250, 50, 0], [250, 50, 0]],
		minTimer: 2000,
		maxTimer: 1000,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[450, 50, 0], [450, 50, 0]],
		minTimer: 1200,
		maxTimer: 1000,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[650, 50, 0], [650, 50, 0]],
		minTimer: 800,
		maxTimer: 1000,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[850, 50, 0], [850, 50, 0]],
		minTimer: 500,
		maxTimer: 1000,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[0, 50, 6], [1200, 50, 6]],
		minTimer: 6000,
		maxTimer: 6000,
		definiteOffset: 5000,
	  }],
	"51": [{
		type: "mousepulse",
		amount: 1,
		radius: 250,
		speed: 0,
		minTimer: 10000,
		maxTimer: 1000,
	}],
	"52": [{
		type: "mousepulse",
		amount: 10,
		radius: 250,
		speed: 0,
		minTimer: 1000,
		maxTimer: 3000,
	}],
	"53": [{
		type: "mousepulse",
		amount: 10,
		radius: 200,
		speed: 1,
		minTimer: 1000,
		maxTimer: 2000,
	}, {
		type: "pulse",
		amount: 15,
		radius: 18,
		speed: 5,
		minTimer: 1500,
		maxTimer: 2500,
		randomOffset: 1500,
	}],
	"54": [{
		type: "mousepulse",
		amount: 8,
		radius: 200,
		speed: 1,
		minTimer: 1000,
		maxTimer: 2000,
	}, {
		type: "push",
		amount: 5,
		radius: 8,
		speed: 3
	}, {
		type: "pull",
		amount: 5,
		radius: 8,
		speed: 3
	}],
	"55": [{
		type: "mousepulse",
		amount: 24,
		radius: 48,
		speed: 10,
		minTimer: 1000,
		maxTimer: 10,
	}],
	"56": [{
		type: "pulse",
		amount: 24,
		radius: 48,
		speed: 8,
		minTimer: 1000,
		maxTimer: 10,
	}],
	"57": [{
		type: "pulse",
		amount: 38,
		radius: 48,
		speed: 10,
		minTimer: 1000,
		maxTimer: 100,
	}],
	"58": [{
		type: "mousepulse",
		amount: 18,
		radius: 52,
		speed: 5,
		minTimer: 10000,
		maxTimer: 1,
	}, {
		type: "pulse",
		amount: 18,
		radius: 52,
		speed: 5,
		minTimer: 1000,
		maxTimer: 1000,
	}],
	"59": [{
		type: "draining",
		amount: 16,
		radius: 32,
		speed: 9,
		minTimer: 1000,
		maxTimer: 1000,
		definiteOffset: 1000,
	}, {
		type: "slower",
		amount: 16,
		radius: 32,
		speed: 9,
		minTimer: 1000,
		maxTimer: 1000,
	}],
	"60": [{
		type: "amogus",
		amount: 1,
		radius: 250,
		speed: 0,
		minTimer: 2000,
		maxTimer: 2000,
	}],
	"61": [{
		type: "path",
		amount: 1,
		radius: 50,
		path: [[50, 50, 0], [50, 50, 0]],
		minTimer: 3000,
		maxTimer: 1000,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[150, 50, 0], [150, 50, 0]],
		minTimer: 3000,
		maxTimer: 1000,
		definiteOffset: 2000,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[250, 50, 0], [250, 50, 0]],
		minTimer: 3000,
		maxTimer: 1000,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[350, 50, 0], [350, 50, 0]],
		minTimer: 3000,
		maxTimer: 1000,
		definiteOffset: 2000,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[450, 50, 0], [450, 50, 0]],
		minTimer: 3000,
		maxTimer: 1000,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[550, 50, 0], [550, 50, 0]],
		minTimer: 3000,
		maxTimer: 1000,
		definiteOffset: 2000,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[650, 50, 0], [650, 50, 0]],
		minTimer: 3000,
		maxTimer: 1000,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[750, 50, 0], [750, 50, 0]],
		minTimer: 3000,
		maxTimer: 1000,
		definiteOffset: 2000,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[850, 50, 0], [850, 50, 0]],
		minTimer: 3000,
		maxTimer: 1000,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[950, 50, 0], [950, 50, 0]],
		minTimer: 3000,
		maxTimer: 1000,
		definiteOffset: 2000,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[1050, 50, 0], [1050, 50, 0]],
		minTimer: 3000,
		maxTimer: 1000,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[1150, 50, 0], [1150, 50, 0]],
		minTimer: 3000,
		maxTimer: 1000,
		definiteOffset: 2000,
	  }],
	"62": [{
		type: "path",
		amount: 1,
		radius: 50,
		path: [[50, 50, 0], [50, 50, 0]],
		minTimer: 1500,
		maxTimer: 500,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[150, 50, 0], [150, 50, 0]],
		minTimer: 1500,
		maxTimer: 500,
		definiteOffset: 1000,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[250, 50, 0], [250, 50, 0]],
		minTimer: 1500,
		maxTimer: 500,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[350, 50, 0], [350, 50, 0]],
		minTimer: 1500,
		maxTimer: 500,
		definiteOffset: 1000,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[450, 50, 0], [450, 50, 0]],
		minTimer: 1500,
		maxTimer: 500,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[550, 50, 0], [550, 50, 0]],
		minTimer: 1500,
		maxTimer: 500,
		definiteOffset: 1000,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[650, 50, 0], [650, 50, 0]],
		minTimer: 1500,
		maxTimer: 500,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[750, 50, 0], [750, 50, 0]],
		minTimer: 1500,
		maxTimer: 500,
		definiteOffset: 1000,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[850, 50, 0], [850, 50, 0]],
		minTimer: 1500,
		maxTimer: 500,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[950, 50, 0], [950, 50, 0]],
		minTimer: 1500,
		maxTimer: 500,
		definiteOffset: 1000,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[1050, 50, 0], [1050, 50, 0]],
		minTimer: 1500,
		maxTimer: 500,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[1150, 50, 0], [1150, 50, 0]],
		minTimer: 1500,
		maxTimer: 500,
		definiteOffset: 1000,
	  }],
	"63": [{
		type: "path",
		amount: 1,
		radius: 50,
		path: [[50, 50, 0], [50, 50, 0]],
		minTimer: 1500,
		maxTimer: 500,
		definiteOffset: 0,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[50, 150, 0], [50, 150, 0]],
		minTimer: 1500,
		maxTimer: 500,
		definiteOffset: 500,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[150, 150, 0], [150, 150, 0]],
		minTimer: 1500,
		maxTimer: 500,
		definiteOffset: 1000,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[150, 50, 0], [150, 50, 0]],
		minTimer: 1500,
		maxTimer: 500,
		definiteOffset: 1500,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[250, 50, 0], [250, 50, 0]],
		minTimer: 1500,
		maxTimer: 500,
		definiteOffset: 0,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[250, 150, 0], [250, 150, 0]],
		minTimer: 1500,
		maxTimer: 500,
		definiteOffset: 500,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[350, 150, 0], [350, 150, 0]],
		minTimer: 1500,
		maxTimer: 500,
		definiteOffset: 1000,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[350, 50, 0], [350, 50, 0]],
		minTimer: 1500,
		maxTimer: 500,
		definiteOffset: 1500,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[450, 50, 0], [450, 50, 0]],
		minTimer: 1500,
		maxTimer: 500,
		definiteOffset: 0,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[450, 150, 0], [450, 150, 0]],
		minTimer: 1500,
		maxTimer: 500,
		definiteOffset: 500,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[550, 150, 0], [550, 150, 0]],
		minTimer: 1500,
		maxTimer: 500,
		definiteOffset: 1000,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[550, 50, 0], [550, 50, 0]],
		minTimer: 1500,
		maxTimer: 500,
		definiteOffset: 1500,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[650, 50, 0], [650, 50, 0]],
		minTimer: 1500,
		maxTimer: 500,
		definiteOffset: 0,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[650, 150, 0], [650, 150, 0]],
		minTimer: 1500,
		maxTimer: 500,
		definiteOffset: 500,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[750, 150, 0], [750, 150, 0]],
		minTimer: 1500,
		maxTimer: 500,
		definiteOffset: 1000,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[750, 50, 0], [750, 50, 0]],
		minTimer: 1500,
		maxTimer: 500,
		definiteOffset: 1500,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[850, 50, 0], [850, 50, 0]],
		minTimer: 1500,
		maxTimer: 500,
		definiteOffset: 0,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[850, 150, 0], [850, 150, 0]],
		minTimer: 1500,
		maxTimer: 500,
		definiteOffset: 500,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[950, 150, 0], [950, 150, 0]],
		minTimer: 1500,
		maxTimer: 500,
		definiteOffset: 1000,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[950, 50, 0], [950, 50, 0]],
		minTimer: 1500,
		maxTimer: 500,
		definiteOffset: 1500,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[1050, 50, 0], [1050, 50, 0]],
		minTimer: 1500,
		maxTimer: 500,
		definiteOffset: 0,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[1050, 150, 0], [1050, 150, 0]],
		minTimer: 1500,
		maxTimer: 500,
		definiteOffset: 500,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[1150, 150, 0], [1150, 150, 0]],
		minTimer: 1500,
		maxTimer: 500,
		definiteOffset: 1000,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[1150, 50, 0], [1150, 50, 0]],
		minTimer: 1500,
		maxTimer: 500,
		definiteOffset: 1500,
	  }],
	"64": [{
		type: "path",
		amount: 1,
		radius: 50,
		path: [[50, 50, 0], [50, 50, 0]],
		minTimer: 1500,
		maxTimer: 500,
		definiteOffset: 0,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[50, 150, 0], [50, 150, 0]],
		minTimer: 1500,
		maxTimer: 500,
		definiteOffset: 500,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[150, 150, 0], [150, 150, 0]],
		minTimer: 1500,
		maxTimer: 500,
		definiteOffset: 1000,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[150, 50, 0], [150, 50, 0]],
		minTimer: 1500,
		maxTimer: 500,
		definiteOffset: 1500,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[250, 50, 0], [250, 50, 0]],
		minTimer: 1500,
		maxTimer: 500,
		definiteOffset: 0,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[250, 150, 0], [250, 150, 0]],
		minTimer: 1500,
		maxTimer: 500,
		definiteOffset: 500,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[350, 150, 0], [350, 150, 0]],
		minTimer: 1500,
		maxTimer: 500,
		definiteOffset: 1000,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[350, 50, 0], [350, 50, 0]],
		minTimer: 1500,
		maxTimer: 500,
		definiteOffset: 1500,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[450, 50, 0], [450, 50, 0]],
		minTimer: 1500,
		maxTimer: 500,
		definiteOffset: 0,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[450, 150, 0], [450, 150, 0]],
		minTimer: 1500,
		maxTimer: 500,
		definiteOffset: 500,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[550, 150, 0], [550, 150, 0]],
		minTimer: 1500,
		maxTimer: 500,
		definiteOffset: 1000,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[550, 50, 0], [550, 50, 0]],
		minTimer: 1500,
		maxTimer: 500,
		definiteOffset: 1500,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[650, 50, 0], [650, 50, 0]],
		minTimer: 1500,
		maxTimer: 500,
		definiteOffset: 0,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[650, 150, 0], [650, 150, 0]],
		minTimer: 1500,
		maxTimer: 500,
		definiteOffset: 500,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[750, 150, 0], [750, 150, 0]],
		minTimer: 1500,
		maxTimer: 500,
		definiteOffset: 1000,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[750, 50, 0], [750, 50, 0]],
		minTimer: 1500,
		maxTimer: 500,
		definiteOffset: 1500,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[850, 50, 0], [850, 50, 0]],
		minTimer: 1500,
		maxTimer: 500,
		definiteOffset: 0,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[850, 150, 0], [850, 150, 0]],
		minTimer: 1500,
		maxTimer: 500,
		definiteOffset: 500,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[950, 150, 0], [950, 150, 0]],
		minTimer: 1500,
		maxTimer: 500,
		definiteOffset: 1000,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[950, 50, 0], [950, 50, 0]],
		minTimer: 1500,
		maxTimer: 500,
		definiteOffset: 1500,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[1050, 50, 0], [1050, 50, 0]],
		minTimer: 1500,
		maxTimer: 500,
		definiteOffset: 0,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[1050, 150, 0], [1050, 150, 0]],
		minTimer: 1500,
		maxTimer: 500,
		definiteOffset: 500,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[1150, 150, 0], [1150, 150, 0]],
		minTimer: 1500,
		maxTimer: 500,
		definiteOffset: 1000,
	  }, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[1150, 50, 0], [1150, 50, 0]],
		minTimer: 1500,
		maxTimer: 500,
		definiteOffset: 1500,
	  }, { // 2nd part
		type: "path",
		amount: 1,
		radius: 100,
		path: [[100, 100, 0], [100, 100, 0]],
		minTimer: 3500,
		maxTimer: 500,
	  }, {
		type: "path",
		amount: 1,
		radius: 100,
		path: [[300, 100, 0], [300, 100, 0]],
		minTimer: 3500,
		maxTimer: 500,
		definiteOffset: 2000,
	  }, {
		type: "path",
		amount: 1,
		radius: 100,
		path: [[500, 100, 0], [500, 100, 0]],
		minTimer: 3500,
		maxTimer: 500,
	  }, {
		type: "path",
		amount: 1,
		radius: 100,
		path: [[700, 100, 0], [700, 100, 0]],
		minTimer: 3500,
		maxTimer: 500,
		definiteOffset: 2000,
	  }, {
		type: "path",
		amount: 1,
		radius: 100,
		path: [[900, 100, 0], [900, 100, 0]],
		minTimer: 3500,
		maxTimer: 500,
	  }, {
		type: "path",
		amount: 1,
		radius: 100,
		path: [[1100, 100, 0], [1100, 100, 0]],
		minTimer: 3500,
		maxTimer: 500,
		definiteOffset: 2000,
	  }],
	"65": [{
		type: "rain",
		amount: 64,
		radius: 10,
		speed: 6,
		minTimer: 1100,
		maxTimer: 900,
		randomOffset: 1000,
	}],
	"66": [{
		type: "normal",
		amount: 100,
		radius: 10,
		speed: 0.5,
		minTimer: 1100,
		maxTimer: 900,
		randomOffset: 1000,
	}, {
		type: "wall",
		amount: 10,
		radius: 24,
		speed: 5,
	}],
	"67": [{
		type: "wall",
		amount: 30,
		radius: 514.29/4,
		speed: 20,
		minTimer: 2000,
		maxTimer: 2000,
		randomOffset: 500,
	}],
	"68": [{
		type: "amogus",
		amount: 4,
		radius: 514.29/3,
		speed: 11,
		minTimer: 3000,
		maxTimer: 3000,
		definiteOffset: 3000,
	}],
	"69": [{
		type: "amogus",
		amount: 50,
		radius: 10,
		speed: 0.5,
		minTimer: 1500,
		maxTimer: 2500,
		randomOffset: 2000,
	}, {
		type: "mousepulse",
		amount: 10,
		radius: 52,
		speed: 5,
		minTimer: 10000,
		maxTimer: 10,
	}],
	"70": [{
		type: "amogus",
		amount: 25,
		radius: 12,
		speed: 1,
		minTimer: 2000,
		maxTimer: 2000,
		definiteOffset: 2000,
	}, {
		type: "amogus",
		amount: 25,
		radius: 32,
		speed: 2,
		minTimer: 2000,
		maxTimer: 2000,
	}],
	"71": [{
		type: "wall",
		amount: 4,
		radius: 514.29/4,
		speed: 10,
		minTimer: 2000,
		maxTimer: 2000,
		definiteOffset: 2000,
	}, {
		type: "wall",
		amount: 4,
		radius: 514.29/4,
		speed: 20,
		minTimer: 2000,
		maxTimer: 2000,
	}],
	"72": [{
		type: "path",
		amount: 1,
		radius: 50,
		path: [[50, 50, (529.29-100)/25], [50, 529.29-50, (529.29-100)/25], [529.29-50, 529.29-50, (529.29-100)/25], [529.29-50, 50, (529.29-100)/25]],
		minTimer: 2000,
		maxTimer: 2000,
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[50, 529.29-50, (529.29-100)/25], [529.29-50, 529.29-50, (529.29-100)/25], [529.29-50, 50, (529.29-100)/25], [50, 50, (529.29-100)/25]],
		minTimer: 2000,
		maxTimer: 2000,
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[100, 100, (529.29-200)/25], [100, 529.29-100, (529.29-200)/25], [529.29-100, 529.29-100, (529.29-200)/25], [529.29-100, 100, (529.29-200)/25]],
		minTimer: 2000,
		maxTimer: 2000,
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[100, 529.29-100, (529.29-200)/25], [529.29-100, 529.29-100, (529.29-200)/25], [529.29-100, 100, (529.29-200)/25], [100, 100, (529.29-200)/25]],
		minTimer: 2000,
		maxTimer: 2000,
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[529.29-150, 529.29-150, (529.29-300)/25], [529.29-150, 150, (529.29-300)/25], [150, 150, (529.29-300)/25], [150, 529.29-150, (529.29-300)/25]],
		minTimer: 2000,
		maxTimer: 2000,
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[529.29-150, 150, (529.29-300)/25], [150, 150, (529.29-300)/25], [150, 529.29-150, (529.29-300)/25], [529.29-150, 529.29-150, (529.29-300)/25]],
		minTimer: 2000,
		maxTimer: 2000,
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[529.29-50, 529.29-50, (529.29-100)/25], [529.29-50, 50, (529.29-100)/25], [50, 50, (529.29-100)/25], [50, 529.29-50, (529.29-100)/25]],
		minTimer: 2000,
		maxTimer: 2000,
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[529.29-50, 50, (529.29-100)/25], [50, 50, (529.29-100)/25], [50, 529.29-50, (529.29-100)/25], [529.29-50, 529.29-50, (529.29-100)/25]],
		minTimer: 2000,
		maxTimer: 2000,
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[529.29-100, 529.29-100, (529.29-200)/25], [529.29-100, 100, (529.29-200)/25], [100, 100, (529.29-200)/25], [100, 529.29-100, (529.29-200)/25]],
		minTimer: 2000,
		maxTimer: 2000,
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[529.29-100, 100, (529.29-200)/25], [100, 100, (529.29-200)/25], [100, 529.29-100, (529.29-200)/25], [529.29-100, 529.29-100, (529.29-200)/25]],
		minTimer: 2000,
		maxTimer: 2000,
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[150, 150, (529.29-300)/25], [150, 529.29-150, (529.29-300)/25], [529.29-150, 529.29-150, (529.29-300)/25], [529.29-150, 150, (529.29-300)/25]],
		minTimer: 2000,
		maxTimer: 2000,
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[150, 529.29-150, (529.29-300)/25], [529.29-150, 529.29-150, (529.29-300)/25], [529.29-150, 150, (529.29-300)/25], [150, 150, (529.29-300)/25]],
		minTimer: 2000,
		maxTimer: 2000,
	} ,{// reversals
		type: "path",
		amount: 1,
		radius: 50,
		path: [[50, 50, (529.29-100)/5], [50, 529.29-50, (529.29-100)/5], [529.29-50, 529.29-50, (529.29-100)/5], [529.29-50, 50, (529.29-100)/5]],
		minTimer: 2000,
		maxTimer: 2000,
		definiteOffset: 2000,
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[50, 529.29-50, (529.29-100)/5], [529.29-50, 529.29-50, (529.29-100)/5], [529.29-50, 50, (529.29-100)/5], [50, 50, (529.29-100)/5]],
		minTimer: 2000,
		maxTimer: 2000,
		definiteOffset: 2000,
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[100, 100, (529.29-200)/5], [100, 529.29-100, (529.29-200)/5], [529.29-100, 529.29-100, (529.29-200)/5], [529.29-100, 100, (529.29-200)/5]],
		minTimer: 2000,
		maxTimer: 2000,
		definiteOffset: 2000,
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[100, 529.29-100, (529.29-200)/5], [529.29-100, 529.29-100, (529.29-200)/5], [529.29-100, 100, (529.29-200)/5], [100, 100, (529.29-200)/5]],
		minTimer: 2000,
		maxTimer: 2000,
		definiteOffset: 2000,
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[529.29-150, 529.29-150, (529.29-300)/5], [529.29-150, 150, (529.29-300)/5], [150, 150, (529.29-300)/5], [150, 529.29-150, (529.29-300)/5]],
		minTimer: 2000,
		maxTimer: 2000,
		definiteOffset: 2000,
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[529.29-150, 150, (529.29-300)/5], [150, 150, (529.29-300)/5], [150, 529.29-150, (529.29-300)/5], [529.29-150, 529.29-150, (529.29-300)/5]],
		minTimer: 2000,
		maxTimer: 2000,
		definiteOffset: 2000,
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[529.29-50, 529.29-50, (529.29-100)/5], [529.29-50, 50, (529.29-100)/5], [50, 50, (529.29-100)/5], [50, 529.29-50, (529.29-100)/5]],
		minTimer: 2000,
		maxTimer: 2000,
		definiteOffset: 2000,
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[529.29-50, 50, (529.29-100)/5], [50, 50, (529.29-100)/5], [50, 529.29-50, (529.29-100)/5], [529.29-50, 529.29-50, (529.29-100)/5]],
		minTimer: 2000,
		maxTimer: 2000,
		definiteOffset: 2000,
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[529.29-100, 529.29-100, (529.29-200)/5], [529.29-100, 100, (529.29-200)/5], [100, 100, (529.29-200)/5], [100, 529.29-100, (529.29-200)/5]],
		minTimer: 2000,
		maxTimer: 2000,
		definiteOffset: 2000,
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[529.29-100, 100, (529.29-200)/5], [100, 100, (529.29-200)/5], [100, 529.29-100, (529.29-200)/5], [529.29-100, 529.29-100, (529.29-200)/5]],
		minTimer: 2000,
		maxTimer: 2000,
		definiteOffset: 2000,
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[150, 150, (529.29-300)/5], [150, 529.29-150, (529.29-300)/5], [529.29-150, 529.29-150, (529.29-300)/5], [529.29-150, 150, (529.29-300)/5]],
		minTimer: 2000,
		maxTimer: 2000,
		definiteOffset: 2000,
	}, {
		type: "path",
		amount: 1,
		radius: 50,
		path: [[150, 529.29-150, (529.29-300)/5], [529.29-150, 529.29-150, (529.29-300)/5], [529.29-150, 150, (529.29-300)/5], [150, 150, (529.29-300)/5]],
		minTimer: 2000,
		maxTimer: 2000,
		definiteOffset: 2000,
	}],
	"73": [{
		type: "tornado",
		amount: 14,
		radius: 32,
		speed: 5,
		minTimer: 1200,
		maxTimer: 1500,
		randomOffset: 1500,
	}],
	"74": [{
		type: "mousepulse",
		amount: 100,
		radius: 12,
		speed: 0.3,
		minTimer: 3000,
		maxTimer: 10,
	}],
	"75": [{
		type: "slippery",
		amount: 12,
		radius: 38,
		speed: 3,
		minTimer: 1100,
		maxTimer: 1400,
		randomOffset: 1400,
	}],
	"76": [{
		type: "sniper",
		amount: 12,
		radius: 26,
		speed: 0,
		minTimer: 1500,
		maxTimer: 1500,
		randomOffset: 500,
	}],
	"77": [{
		type: "octo",
		amount: 6,
		radius: 26,
		speed: 6,
		minTimer: 1500,
		maxTimer: 1500,
		randomOffset: 500,
	}],
	"78": [{
		type: "ice sniper",
		amount: 12,
		radius: 30,
		speed: 5,
		minTimer: 1500,
		maxTimer: 1500,
		randomOffset: 500,
	}],
	"79": [{
		type: "speed sniper",
		amount: 12,
		radius: 12,
		speed: 7,
		minTimer: 1500,
		maxTimer: 1500,
		randomOffset: 500,
	}],
	"80": [{
		type: "path",
		amount: 1,
		radius: 100,
		path: [[100, 100, 0], [100, 100, 0]],
		minTimer: 1500,
		maxTimer: 500,
	  }, {
		type: "path",
		amount: 1,
		radius: 100,
		path: [[300, 100, 0], [300, 100, 0]],
		minTimer: 1500,
		maxTimer: 500,
		definiteOffset: 1000,
	  }, {
		type: "path",
		amount: 1,
		radius: 100,
		path: [[500, 100, 0], [500, 100, 0]],
		minTimer: 1500,
		maxTimer: 500,
	  }, {
		type: "path",
		amount: 1,
		radius: 100,
		path: [[700, 100, 0], [700, 100, 0]],
		minTimer: 1500,
		maxTimer: 500,
		definiteOffset: 1000,
	  }, {
		type: "path",
		amount: 1,
		radius: 100,
		path: [[900, 100, 0], [900, 100, 0]],
		minTimer: 1500,
		maxTimer: 500,
	  }, {
		type: "path",
		amount: 1,
		radius: 100,
		path: [[1100, 100, 0], [1100, 100, 0]],
		minTimer: 1500,
		maxTimer: 500,
		definiteOffset: 1000,
	  }, {
		type: "path",
		amount: 1,
		radius: 100,
		path: [[1300, 100, 0], [1300, 100, 0]],
		minTimer: 1500,
		maxTimer: 500,
	  }, {
		type: "path",
		amount: 1,
		radius: 100,
		path: [[1500, 100, 0], [1500, 100, 0]],
		minTimer: 1500,
		maxTimer: 500,
		definiteOffset: 1000,
	  }, {
		type: "path",
		amount: 1,
		radius: 100,
		path: [[1700, 100, 0], [1700, 100, 0]],
		minTimer: 1500,
		maxTimer: 500,
	  }, {
		type: "path",
		amount: 1,
		radius: 100,
		path: [[1900, 100, 0], [1900, 100, 0]],
		minTimer: 1500,
		maxTimer: 500,
		definiteOffset: 1000,
	  }, {
		type: "path",
		amount: 1,
		radius: 100,
		path: [[2100, 100, 0], [2100, 100, 0]],
		minTimer: 1500,
		maxTimer: 500,
	  }, {
		type: "path",
		amount: 1,
		radius: 100,
		path: [[2300, 100, 0], [2300, 100, 0]],
		minTimer: 1500,
		maxTimer: 500,
		definiteOffset: 1000,
	  }, {
		type: "path",
		amount: 1,
		radius: 100,
		path: [[2500, 100, 0], [2500, 50, 0]],
		minTimer: 1500,
		maxTimer: 500,
	  }, {
		type: "path",
		amount: 1,
		radius: 100,
		path: [[2700, 100, 0], [2700, 100, 0]],
		minTimer: 1500,
		maxTimer: 500,
	  }, {
		type: "path",
		amount: 1,
		radius: 100,
		path: [[2900, 100, 0], [2900, 50, 0]],
		minTimer: 1600,
		maxTimer: 400,
	  }, {
		type: "path",
		amount: 1,
		radius: 100,
		path: [[2900, 100, 0], [2900, 100, 0]],
		minTimer: 1600,
		maxTimer: 400,
		definiteOffset: 1000,
	  }],
  "82": [{
    type: "warp",
    amount: 1,
    radius: 160,
    speed: 20
  }]
}

let i = 0;

/*for(let k of Object.keys(CENTRAL_CROSSING)){
	let area = CENTRAL_CROSSING[k];
  if (k != "index" && k != "width"){
    if(i > 1){
      area.push({
        type: "wall",
        amount: 8,
        radius: 30,
        speed: 5
      });
    }
  }
	i++
}*/

module.exports = { CENTRAL_CROSSING }