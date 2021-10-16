const CENTRAL_CROSSING = {
	"index": 16,
	"width": [514.29, 514.29, 514.29, 514.29, 514.29, 100, 100, 30, 10, 20, 514.29, 514.29, 514.29, 1000, 1000, 514.29, 1000, 1000, 1000, 1300 /*this 1000 is the 20 mark */, 20, 30, 30, 40, 514.29, 514.29, 60, 100, 514.29, 514.29, /*this 514.29 ON THE LEFT is the 30 mark*/ 520, 514.29, 80, 100, 100, 60, 100, 100, 3085.74, 514.29, 1000],
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
	"41": [{
		type: "offsetocto",
		amount: 5,
		radius: 30,
		speed: 10
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