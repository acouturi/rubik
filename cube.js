let newgrid = ''
let prenumgrid = 0
if (prenumgrid == 0)
	newgrid = [
	[[' ',' ',' ',' ',' '],
	 [' ','U','U','U',' '],
	 [' ','U','U','U',' '],
	 [' ','U','U','U',' '],
	 [' ',' ',' ',' ',' ']],

	[[' ','B','B','B',' '],
	 ['L',' ',' ',' ','R'],
	 ['L',' ',' ',' ','R'],
	 ['L',' ',' ',' ','R'],
	 [' ','F','F','F',' ']],

	[[' ','B','B','B',' '],
	 ['L',' ',' ',' ','R'],
	 ['L',' ',' ',' ','R'],
	 ['L',' ',' ',' ','R'],
	 [' ','F','F','F',' ']],
	 
	[[' ','B','B','B',' '],
	 ['L',' ',' ',' ','R'],
	 ['L',' ',' ',' ','R'],
	 ['L',' ',' ',' ','R'],
	 [' ','F','F','F',' ']],
	
	[[' ',' ',' ',' ',' '],
	 [' ','D','D','D',' '],
	 [' ','D','D','D',' '],
	 [' ','D','D','D',' '],
	 [' ',' ',' ',' ',' ']]
]
else if (prenumgrid == 1)
	newgrid = [
	[[' ',' ',' ',' ',' '],
	 [' ','D','U','D',' '],
	 [' ','U','U','U',' '],
	 [' ','D','U','D',' '],
	 [' ',' ',' ',' ',' ']],

	 [[' ','D','B','D',' '],
	 ['D',' ',' ',' ','D'],
	 ['L',' ',' ',' ','R'],
	 ['D',' ',' ',' ','D'],
	 [' ','D','F','D',' ']],

	[[' ','D','B','D',' '],
	 ['D',' ',' ',' ','D'],
	 ['L',' ',' ',' ','R'],
	 ['D',' ',' ',' ','D'],
	 [' ','D','F','D',' ']],
	 
	[[' ','D','D','D',' '],
	 ['D',' ',' ',' ','D'],
	 ['D',' ',' ',' ','D'],
	 ['D',' ',' ',' ','D'],
	 [' ','D','D','D',' ']],
	
	[[' ',' ',' ',' ',' '],
	 [' ','D','D','D',' '],
	 [' ','D','D','D',' '],
	 [' ','D','D','D',' '],
	 [' ',' ',' ',' ',' ']]
];

let curentgrid = JSON.parse(JSON.stringify(newgrid));

function compactcube(bigcube) {	
	let newcube = [[[],[],[]],[[],[],[]],[[],[],[]]];	

	for (let x = 0; x < 3; x++) {	
		for (let y = 0; y < 3; y++) {	
			for (let z = 0; z < 3; z++) {	
				let sum = x + y + z	
				if (sum % 2 == 0) {	
					let num = (x == 1 ? 1 : 0) + (y == 1 ? 1 : 0) + (z == 1 ? 1 : 0);	
					if (num == 2) {	
						//centre
						newcube[x][y][z] = bigcube[x*2][y*2][z*2]	
					}	
					else {	
						//angle	
						newcube[x][y][z] = ([bigcube[x==0?0:4][y==0?1:3][z==0?1:3],bigcube[x==0?1:3][y==0?0:4][z==0?1:3], bigcube[x==0?1:3][y==0?1:3][z==0?0:4]]).join('')	
					}	
				}	
				else if (x != 1 || y != 1 || z != 1) {	
					// arrete	
					if (x == 1) {	
						if (z == 2 && y == 2) {	
							newcube[1][y][z] = ([bigcube[2][3][4],bigcube[2][4][3]]).join('');	
						}	
						else {	
							newcube[1][y][z] = ([bigcube[2][y*2+z/2][z*1.5+1],bigcube[2][y+1-z/2][z*1.5]]).join('');	
						}	
					}	
					if (y == 1) {	
						if (x == 2 && z == 2) {	
							newcube[x][1][z] = ([bigcube[3][2][4],bigcube[4][2][3]]).join('');	
						}	
						else {	
							newcube[x][1][z] = ([bigcube[x*2+z/2][2][z*1.5+1],bigcube[x+1-z/2][2][z*1.5]]).join('');	
						}	
					}	
					if (z == 1) {	
						if (x == 2 && y == 2) {	
							newcube[x][y][1] = ([bigcube[3][4][2],bigcube[4][3][2]]).join('');	
						}	
						else {	
							newcube[x][y][1] = ([bigcube[x*2+y/2][y*1.5+1][2],bigcube[x+1-y/2][y*1.5][2]]).join('');	
						}	
					}	
				}	
			}	
		}	
	}	
	return newcube;	
}

function rotrelativx(smallcube) {
	let tmp = smallcube[1][0][1]
	smallcube[1][0][1] = smallcube[1][1][0]
	smallcube[1][1][0] = smallcube[1][2][1]
	smallcube[1][2][1] = smallcube[1][1][2]
	smallcube[1][1][2] = tmp
}

function rotrelativy(smallcube) {
	let tmp = smallcube[0][1][1]
	smallcube[0][1][1] = smallcube[1][1][0]
	smallcube[1][1][0] = smallcube[2][1][1]
	smallcube[2][1][1] = smallcube[1][1][2]
	smallcube[1][1][2] = tmp
}

function rotrelativz(smallcube) {
	let tmp = smallcube[0][1][1]
	smallcube[0][1][1] = smallcube[1][0][1]
	smallcube[1][0][1] = smallcube[2][1][1]
	smallcube[2][1][1] = smallcube[1][2][1]
	smallcube[1][2][1] = tmp
}

let lststack = [];
let fctlst = 	[rotJaune, rotJauneB, rotJaune2,
    rotOrange, rotOrangeB, rotOrange2,
    rotVert, rotVertB, rotVert2,
    rotBlanc, rotBlancB, rotBlanc2,
    rotRouge, rotRougeB, rotRouge2,
    rotBleu, rotBleuB, rotBleu2]
let nameMove = 'ULBDRF';
let addMove = ["","'","2"]
let listauto = "ULBDRF'2";
const BADRETURN = "UUUUUUUUUUUUUUUUUUUUU".split("")










function alltest(data, testcube, banmouv, maxlength, lastmove, listmove, tester) {
    for (let i = 0; i < fctlst.length; i++) {
        if (banmouv.indexOf(nameMove[Math.trunc(i/3)]) == -1) {
            if (nameMove[Math.trunc(i/3)] != lastmove[1] && nameMove[(Math.trunc(i/3) + 3) % 6] != lastmove[0]){
                let newtestgrid = JSON.parse(JSON.stringify(testcube));
                applimidsolve (listmove, newtestgrid);
				fctlst[i](newtestgrid)
        		if (tester(data, newtestgrid, compactcube(newtestgrid))) {
					lststack = [];
        			return listmove.concat(nameMove[Math.trunc(i/3)]+addMove[i%3]);
                }
                if (listmove.length < maxlength - 2)
    				lststack.push([[lastmove[1],nameMove[Math.trunc(i/3)]], listmove.concat(nameMove[Math.trunc(i/3)]+addMove[i%3])])
            }
        }
    }
	while (lststack[0]) {
		let thisstack = lststack.shift()
		let result = alltest(data, testcube, banmouv, maxlength, thisstack[0], thisstack[1], tester)
		if (result){
			lststack = [];
			return result
		}
	}
	lststack = [];
	return 0;
}




function testercross(data, testgrid, smallcube) {
	for (let x = 0; x < 3; x++) {
		for (let y = 0; y < 3; y++) {
			for (let z = 0; z < 3; z++) {
				if ((x + y + z + 1) %2 && (x == 1 || y == 1 || z == 1)) {
					if (smallcube[x][y][z] == data[0]) {
						if (x != 1) {
							if ((testgrid[x * 2][2][2] == data[0]) &&
								(((testgrid[x * 2][1][2] == data[0]) &&
								(testgrid[x + 1][0][2] == testgrid[2][0][2])) +
								((testgrid[x * 2][3][2] == data[0]) &&
								(testgrid[x + 1][4][2] == testgrid[2][4][2])) +
								((testgrid[x * 2][2][1] == data[0]) &&
								(testgrid[x + 1][2][0] == testgrid[2][2][0])) +
								((testgrid[x * 2][2][3] == data[0]) &&
								(testgrid[x + 1][2][4] == testgrid[2][2][4])) >= data[1]))
								return true;
						}
						else if (y != 1) {
							if ((testgrid[2][y * 2][2] == data[0]) &&
								(((testgrid[1][y * 2][2] == data[0]) &&
								(testgrid[0][y + 1][2] == testgrid[0][2][2])) +
								((testgrid[3][y * 2][2] == data[0]) &&
								(testgrid[4][y + 1][2] == testgrid[4][2][2])) +
								((testgrid[2][y * 2][1] == data[0]) &&
								(testgrid[2][y + 1][0] == testgrid[2][2][0])) +
								((testgrid[2][y * 2][3] == data[0]) &&
								(testgrid[2][y + 1][4] == testgrid[2][2][4])) >= data[1]))
								return true;
						}
						else if (z != 1) {
							if ((testgrid[2][2][z * 2] == data[0]) &&
								(((testgrid[1][2][z * 2] == data[0]) &&
								(testgrid[0][2][z + 1] == testgrid[0][2][2])) +
								((testgrid[3][2][z * 2] == data[0]) &&
								(testgrid[4][2][z + 1] == testgrid[4][2][2])) +
								((testgrid[2][1][z * 2] == data[0]) &&
								(testgrid[2][0][z + 1] == testgrid[2][0][2])) +
								((testgrid[2][3][z * 2] == data[0]) &&
								(testgrid[2][4][z + 1] == testgrid[2][4][2])) >= data[1]))
								return true;
						}
						return false;
					}
				}
			}
		}
	}
	return false
}

function looptest(data, lsttest, virtualgrid, maxlength, banmov = []) {
	let lstmov = [];
	let solution = [];
	for (let j = 0; j < lsttest.length; j++) {
		const testname = lsttest[j];
		if (!testname(data.concat(j + 1), virtualgrid, compactcube(virtualgrid))) {
			lststack = [];
			solution = alltest([data, j + 1], virtualgrid, banmov, maxlength,  ['',''], [], testname)
			if (solution == 0)
				return BADRETURN;
			for (let i = 0; i < solution.length; i++) {
				if (solution[i].length > 2)
					return BADRETURN;
				for (let j = 0; j < solution[i].length; j++) {
					if (listauto.indexOf(solution[i][j]) == -1)
						return BADRETURN;
				}	
			}
			applimidsolve(solution,virtualgrid)
			lstmov = lstmov.concat(solution)
		}
		if (lstmov === 0)
			return BADRETURN
	}
	return lstmov
}



function testplaceangle(data, testgrid, smallcube) {
	if (!testerangle([data[0],data[1]-1], testgrid, smallcube))
		return false;
	if (testerangle([data[0],data[1]+1], testgrid, smallcube))
		return true;
	for (let x = 0; x < 3; x++) {
		for (let y = 0; y < 3; y++) {
			for (let z = 0; z < 3; z++) {
				if ((x + y + z + 1) %2 && (x == 1 || y == 1 || z == 1)) {
					if (smallcube[x][y][z] == data[0]) {
						if (x != 1) {
							if((testgrid[x * 2][2][2] == data[0]) &&
								((testgrid[3 - x][0][1] == data[0]) ||
								(testgrid[3 - x][0][3] == data[0]) ||
								(testgrid[3 - x][1][0] == data[0]) ||
								(testgrid[3 - x][1][4] == data[0]) ||
								(testgrid[3 - x][3][0] == data[0]) ||
								(testgrid[3 - x][3][4] == data[0]) ||
								(testgrid[3 - x][4][1] == data[0]) ||
								(testgrid[3 - x][4][3] == data[0])))
								return true;
						}
						else if (y != 1) {
							if((testgrid[2][2 * y][2] == data[0]) &&
								((testgrid[0][3 - y][1] == data[0]) ||
								(testgrid[0][3 - y][3] == data[0]) ||
								(testgrid[1][3 - y][0] == data[0]) ||
								(testgrid[1][3 - y][4] == data[0]) ||
								(testgrid[3][3 - y][0] == data[0]) ||
								(testgrid[3][3 - y][4] == data[0]) ||
								(testgrid[4][3 - y][1] == data[0]) ||
								(testgrid[4][3 - y][3] == data[0])))
								return true;
						}
						else if (z != 1) {
							if((testgrid[2][2][2 * z] == data[0]) &&
								((testgrid[0][1][3 - z] == data[0]) ||
								(testgrid[0][3][3 - z] == data[0]) ||
								(testgrid[1][0][3 - z] == data[0]) ||
								(testgrid[1][4][3 - z] == data[0]) ||
								(testgrid[3][0][3 - z] == data[0]) ||
								(testgrid[3][4][3 - z] == data[0]) ||
								(testgrid[4][1][3 - z] == data[0]) ||
								(testgrid[4][3][3 - z] == data[0])))
								return true;
						}
						return false;
					}
				}
			}
		}
	}
	return false
}

function testerangle(data, testgrid, smallcube) {
	if (!testercross([data[0],4], testgrid, smallcube))
		return false;
	for (let x = 0; x < 3; x++) {
		for (let y = 0; y < 3; y++) {
			for (let z = 0; z < 3; z++) {
				if ((x + y + z + 1) %2 && (x == 1 || y == 1 || z == 1)) {
					if (smallcube[x][y][z] == data[0]) {
						if (x != 1) {
							if((testgrid[x * 2][2][2] == data[0]) &&
								((testgrid[x * 2][1][1] == data[0] &&
								testgrid[x + 1][0][1] == testgrid[x + 1][0][2] &&
								testgrid[x + 1][1][0] == testgrid[x + 1][2][0]) +
								(testgrid[x * 2][3][1] == data[0] &&
								testgrid[x + 1][4][1] == testgrid[x + 1][4][2] &&
								testgrid[x + 1][3][0] == testgrid[x + 1][2][0]) +
								(testgrid[x * 2][1][3] == data[0] &&
								testgrid[x + 1][0][3] == testgrid[x + 1][0][2] &&
								testgrid[x + 1][1][4] == testgrid[x + 1][2][4]) +
								(testgrid[x * 2][3][3] == data[0] &&
								testgrid[x + 1][4][3] == testgrid[x + 1][4][2] &&
								testgrid[x + 1][3][4] == testgrid[x + 1][2][4]) >= ((data[1] - 1) / 2)))
								return true;
						}
						else if (y != 1) {
							if((testgrid[2][y * 2][2] == data[0]) &&
								((testgrid[1][y * 2][1] == data[0] &&
								testgrid[0][y + 1][1] == testgrid[0][y + 1][2] &&
								testgrid[1][y + 1][0] == testgrid[2][y + 1][0]) +
								(testgrid[3][y * 2][1] == data[0] &&
								testgrid[4][y + 1][1] == testgrid[4][y + 1][2] &&
								testgrid[3][y + 1][0] == testgrid[2][y + 1][0]) +
								(testgrid[1][y * 2][3] == data[0] &&
								testgrid[0][y + 1][3] == testgrid[0][y + 1][2] &&
								testgrid[1][y + 1][4] == testgrid[2][y + 1][4]) +
								(testgrid[3][y * 2][3] == data[0] &&
								testgrid[4][y + 1][3] == testgrid[4][y + 1][2] &&
								testgrid[3][y + 1][4] == testgrid[2][y + 1][4]) >= ((data[1] - 1) / 2)))
								return true;
						}
						else if (z != 1) {
							if((testgrid[2][2][z * 2] == data[0]) &&
								((testgrid[1][1][z * 2] == data[0] &&
								testgrid[0][1][z + 1] == testgrid[0][2][z + 1] &&
								testgrid[1][0][z + 1] == testgrid[2][0][z + 1]) +
								(testgrid[3][1][z * 2] == data[0] &&
								testgrid[4][1][z + 1] == testgrid[4][2][z + 1] &&
								testgrid[3][0][z + 1] == testgrid[2][0][z + 1]) +
								(testgrid[1][3][z * 2] == data[0] &&
								testgrid[0][3][z + 1] == testgrid[0][2][z + 1] &&
								testgrid[1][4][z + 1] == testgrid[2][4][z + 1]) +
								(testgrid[3][3][z * 2] == data[0] &&
								testgrid[4][3][z + 1] == testgrid[4][2][z + 1] &&
								testgrid[3][4][z + 1] == testgrid[2][4][z + 1]) >= ((data[1] - 1) / 2)))
								return true;
						}
						return false;
					}
				}
			}
		}
	}
	return false
}

function testplacesecond(data, testgrid, smallcube) {
	if (!testsecondlayer(data, testgrid, smallcube))
		return false;
	if (testsecondlayer([data[0],data[1],data[2]+1], testgrid, smallcube))
		return true;
	for (let x = 0; x < 3; x++) {
		for (let y = 0; y < 3; y++) {
			for (let z = 0; z < 3; z++) {
				if ((x + y + z + 1) %2 && (x == 1 || y == 1 || z == 1)) {
					if (smallcube[x][y][z] == data[1]) {
						if (x != 1) {
							if ((testgrid[x * 2][2][2] == data[1]) &&
								(testgrid[x + 1][0][2] != data[1] && testgrid[x * 2][1][2] != data[1] ||
								testgrid[x + 1][4][2] != data[1] && testgrid[x * 2][3][2] != data[1] ||
								testgrid[x + 1][2][0] != data[1] && testgrid[x * 2][2][1] != data[1] ||
								testgrid[x + 1][2][4] != data[1] && testgrid[x * 2][2][3] != data[1]))
								return true;
						}
						else if (y != 1) {
							if ((testgrid[2][y * 2][2] == data[1]) &&
								(testgrid[0][y + 1][2] != data[1] && testgrid[1][y * 2][2] != data[1] ||
								testgrid[4][y + 1][2] != data[1] && testgrid[3][y * 2][2] != data[1] ||
								testgrid[2][y + 1][0] != data[1] && testgrid[2][y * 2][1] != data[1] ||
								testgrid[2][y + 1][4] != data[1] && testgrid[2][y * 2][3] != data[1]))
								return true;
						}
						else if (z != 1) {
							if ((testgrid[2][2][z * 2] == data[1]) &&
								(testgrid[2][0][z + 1] != data[1] && testgrid[2][1][z * 2] != data[1] ||
								testgrid[2][4][z + 1] != data[1] && testgrid[2][3][z * 2] != data[1] ||
								testgrid[0][2][z + 1] != data[1] && testgrid[1][2][z * 2] != data[1] ||
								testgrid[4][2][z + 1] != data[1] && testgrid[3][2][z * 2] != data[1]))
								return true;
						}
						return false;
					}
				}
			}
		}
	}
	return false
}

function testsecondlayer(data, testgrid, smallcube) { 
	if (data[2] == 0)
		return true
	if (!testerangle([data[0],4], testgrid, smallcube))
		return false;
	for (let x = 0; x < 3; x++) {
		for (let y = 0; y < 3; y++) {
			for (let z = 0; z < 3; z++) {
				if ((x + y + z + 1) %2 && (x == 1 || y == 1 || z == 1)) {
					if (smallcube[x][y][z] == data[0]) {
						if (x != 1) {
							if((testgrid[x * 2][2][2] == data[0]) &&
								(((testgrid[2][0][1] == testgrid[2][0][2] &&
								testgrid[2][1][0] == testgrid[2][2][0]) +
								(testgrid[2][0][3] == testgrid[2][0][2] &&
								testgrid[2][1][4] == testgrid[2][2][4]) +
								(testgrid[2][4][1] == testgrid[2][4][2] &&
								testgrid[2][3][0] == testgrid[2][2][0]) +
								(testgrid[2][4][3] == testgrid[2][4][2] &&
								testgrid[2][3][4] == testgrid[2][2][4])) >= data[2]))
								return true;
						}
						else if (y != 1) {
							if((testgrid[2][y * 2][2] == data[0]) &&
								(((testgrid[0][2][1] == testgrid[0][2][2] &&
								testgrid[1][2][0] == testgrid[2][2][0]) +
								(testgrid[0][2][3] == testgrid[0][2][2] &&
								testgrid[1][2][4] == testgrid[2][2][4]) +
								(testgrid[4][2][1] == testgrid[4][2][2] &&
								testgrid[3][2][0] == testgrid[2][2][0]) +
								(testgrid[4][2][3] == testgrid[4][2][2] &&
								testgrid[3][2][4] == testgrid[2][2][4])) >= data[2]))
								return true;
						}
						else if (z != 1) {
							if((testgrid[2][2][z * 2] == data[0]) &&
							(((testgrid[0][1][2] == testgrid[0][2][2] &&
								testgrid[1][0][2] == testgrid[2][0][2]) +
								(testgrid[0][3][2] == testgrid[0][2][2] &&
								testgrid[1][4][2] == testgrid[2][4][2]) +
								(testgrid[4][1][2] == testgrid[4][2][2] &&
								testgrid[3][0][2] == testgrid[2][0][2]) +
								(testgrid[4][3][2] == testgrid[4][2][2] &&
								testgrid[3][4][2] == testgrid[2][4][2])) >= data[2]))
								return true;
						}
						return false;
					}
				}
			}
		}
	}
	return false
}

function countoppocross(data, testgrid, smallcube) {
	for (let x = 0; x < 3; x++) {
		for (let y = 0; y < 3; y++) {
			for (let z = 0; z < 3; z++) {
				if ((x + y + z + 1) %2 && (x == 1 || y == 1 || z == 1)) {
					if (smallcube[x][y][z] == data[0]) {
						if (x != 1) {
							let nb = 0 + (testgrid[x * 2][1][2] == testgrid[x * 2][2][2]) + (testgrid[x * 2][2][3] == testgrid[x * 2][2][2]) +
									(testgrid[x * 2][2][1] == testgrid[x * 2][2][2]) + (testgrid[x * 2][3][2]== testgrid[x * 2][2][2] )
							let barre = (testgrid[x * 2][1][2] == testgrid[x * 2][3][2] && testgrid[x * 2][1][2] == testgrid[x * 2][2][2]) ||
										(testgrid[x * 2][2][1] == testgrid[x * 2][2][3] && testgrid[x * 2][2][1] == testgrid[x * 2][2][2])
							return [nb, barre, 'x', x]
						}
						else if (y != 1) {
							let nb = 0 + (testgrid[1][y * 2][2] == testgrid[2][y * 2][2]) + (testgrid[2][y * 2][3] == testgrid[2][y * 2][2]) +
									(testgrid[2][y * 2][1] == testgrid[2][y * 2][2]) + (testgrid[3][y * 2][2]== testgrid[2][y * 2][2] )
							let barre = (testgrid[1][y * 2][2] == testgrid[3][y * 2][2] && testgrid[1][y * 2][2] == testgrid[2][y * 2][2]) ||
										(testgrid[2][y * 2][1] == testgrid[2][y * 2][3] && testgrid[2][y * 2][1] == testgrid[2][y * 2][2])
							return [nb, barre, 'y', y]
						}
						else if (z != 1) {
							let nb = 0 + (testgrid[1][2][z * 2] == testgrid[2][2][z * 2]) + (testgrid[2][3][z * 2] == testgrid[2][2][z * 2]) +
									(testgrid[2][1][z * 2] == testgrid[2][2][z * 2]) + (testgrid[3][2][z * 2]== testgrid[2][2][z * 2] )
							let barre = (testgrid[1][2][z * 2] == testgrid[3][2][z * 2] && testgrid[1][2][z * 2] == testgrid[2][2][z * 2]) ||
										(testgrid[2][1][z * 2] == testgrid[2][3][z * 2] && testgrid[2][1][z * 2] == testgrid[2][2][z * 2])
							return [nb, barre, 'z', z]
						}
					}
				}
			}
		}
	}
	console.error('ca marche pas...')
	return [0,false]
}






function creatcross(virtualgrid) {
	let lstface = nameMove.split("")
	let keepmov = BADRETURN;
	let keepface = lstface[0];
	let lsttest = [
		testercross,
		testercross,
		testercross,
		testercross
	]
	if(document.getElementById('speedy').value == 0) {
		let tmp = looptest(keepface, lsttest, JSON.parse(JSON.stringify(virtualgrid)), keepmov.length)
		return [tmp, keepface];
	}
	for (let i = 0; i < lstface.length; i++) {
		const thisface = lstface[i];
		let tmp = looptest([thisface], lsttest, JSON.parse(JSON.stringify(virtualgrid)), keepmov.length)
		if (tmp.length < keepmov.length){
			keepface = thisface;
			keepmov = tmp;
		}
	}
	return [keepmov,keepface];
}

function creatface(startingface, virtualgrid) {
	let lsttest = [
		testplaceangle,
		testerangle,
		testplaceangle,
		testerangle,
		testplaceangle,
		testerangle,
		testplaceangle,
		testerangle
	]
	return looptest([startingface], lsttest, JSON.parse(JSON.stringify(virtualgrid)), BADRETURN.length)
}

function creatsecond(oppoface, startingface, virtualgrid) {
	let cpycube = JSON.parse(JSON.stringify(virtualgrid))
	let solution = []
	for (let i = 0; i < 4; i++) {
		let smallcube = compactcube(cpycube)
		if (!testplacesecond([startingface,oppoface,i],cpycube,smallcube)) {
			let smallcube = compactcube(cpycube)
			let solv = ''
			let count = 0;
			while (solv == '') {
				count++
				let lstmov = null
				if (!testplacesecond([startingface,oppoface,i],cpycube,smallcube)) {
					for (let x = 0; x < 3; x++) {
						for (let y = 0; y < 3; y++) {
							for (let z = 0; z < 3; z++) {
								if ((x + y + z + 1) %2 && (x == 1 || y == 1 || z == 1)) {
									if (smallcube[x][y][z] == oppoface) {
										if (x == 0) {
												 if (cpycube[2][3][4] != oppoface && cpycube[2][4][3] != oppoface && (cpycube[2][3][4] != cpycube[2][2][4] || cpycube[2][4][3] != cpycube[2][4][2])) lstmov = ['U', 'R', 'F'];
											else if (cpycube[2][3][0] != oppoface && cpycube[2][4][1] != oppoface && (cpycube[2][3][0] != cpycube[2][2][0] || cpycube[2][4][1] != cpycube[2][4][2])) lstmov = ['U', 'F', 'L'];
											else if (cpycube[2][1][0] != oppoface && cpycube[2][0][1] != oppoface && (cpycube[2][1][0] != cpycube[2][2][0] || cpycube[2][0][1] != cpycube[2][0][2])) lstmov = ['U', 'L', 'B'];
											else if (cpycube[2][1][4] != oppoface && cpycube[2][0][3] != oppoface && (cpycube[2][1][4] != cpycube[2][2][4] || cpycube[2][0][3] != cpycube[2][0][2])) lstmov = ['U', 'B', 'R'];
										}
										else if (x == 2) {
												 if (cpycube[2][3][4] != oppoface && cpycube[2][4][3] != oppoface && (cpycube[2][3][4] != cpycube[2][2][4] || cpycube[2][4][3] != cpycube[2][4][2])) lstmov = ['D', 'F', 'R'];
											else if (cpycube[2][3][0] != oppoface && cpycube[2][4][1] != oppoface && (cpycube[2][3][0] != cpycube[2][2][0] || cpycube[2][4][1] != cpycube[2][4][2])) lstmov = ['D', 'L', 'F'];
											else if (cpycube[2][1][0] != oppoface && cpycube[2][0][1] != oppoface && (cpycube[2][1][0] != cpycube[2][2][0] || cpycube[2][0][1] != cpycube[2][0][2])) lstmov = ['D', 'B', 'L'];
											else if (cpycube[2][1][4] != oppoface && cpycube[2][0][3] != oppoface && (cpycube[2][1][4] != cpycube[2][2][4] || cpycube[2][0][3] != cpycube[2][0][2])) lstmov = ['D', 'R', 'B'];
										}
										else if (y == 0) {
												 if (cpycube[3][2][4] != oppoface && cpycube[4][2][3] != oppoface && (cpycube[3][2][4] != cpycube[2][2][4] || cpycube[4][2][3] != cpycube[4][2][2])) lstmov = ['B', 'D', 'R'];
											else if (cpycube[3][2][0] != oppoface && cpycube[4][2][1] != oppoface && (cpycube[3][2][0] != cpycube[2][2][0] || cpycube[4][2][1] != cpycube[4][2][2])) lstmov = ['B', 'L', 'D'];
											else if (cpycube[1][2][0] != oppoface && cpycube[0][2][1] != oppoface && (cpycube[1][2][0] != cpycube[2][2][0] || cpycube[0][2][1] != cpycube[0][2][2])) lstmov = ['B', 'U', 'L'];
											else if (cpycube[1][2][4] != oppoface && cpycube[0][2][3] != oppoface && (cpycube[1][2][4] != cpycube[2][2][4] || cpycube[0][2][3] != cpycube[0][2][2])) lstmov = ['B', 'R', 'U'];
										}
										else if (y == 2) {
												 if (cpycube[3][2][4] != oppoface && cpycube[4][2][3] != oppoface && (cpycube[3][2][4] != cpycube[2][2][4] || cpycube[4][2][3] != cpycube[4][2][2])) lstmov = ['F', 'R', 'D'];
											else if (cpycube[3][2][0] != oppoface && cpycube[4][2][1] != oppoface && (cpycube[3][2][0] != cpycube[2][2][0] || cpycube[4][2][1] != cpycube[4][2][2])) lstmov = ['F', 'D', 'L'];
											else if (cpycube[1][2][0] != oppoface && cpycube[0][2][1] != oppoface && (cpycube[1][2][0] != cpycube[2][2][0] || cpycube[0][2][1] != cpycube[0][2][2])) lstmov = ['F', 'L', 'U'];
											else if (cpycube[1][2][4] != oppoface && cpycube[0][2][3] != oppoface && (cpycube[1][2][4] != cpycube[2][2][4] || cpycube[0][2][3] != cpycube[0][2][2])) lstmov = ['F', 'U', 'R'];
										}
										else if (z == 0) {
												 if (cpycube[3][4][2] != oppoface && cpycube[4][3][2] != oppoface && (cpycube[3][4][2] != cpycube[2][4][2] || cpycube[4][3][2] != cpycube[4][2][2])) lstmov = ['L', 'F', 'D'];
											else if (cpycube[3][0][2] != oppoface && cpycube[4][1][2] != oppoface && (cpycube[3][0][2] != cpycube[2][0][2] || cpycube[4][1][2] != cpycube[4][2][2])) lstmov = ['L', 'D', 'B'];
											else if (cpycube[1][0][2] != oppoface && cpycube[0][1][2] != oppoface && (cpycube[1][0][2] != cpycube[2][0][2] || cpycube[0][1][2] != cpycube[0][2][2])) lstmov = ['L', 'B', 'U'];
											else if (cpycube[1][4][2] != oppoface && cpycube[0][3][2] != oppoface && (cpycube[1][4][2] != cpycube[2][4][2] || cpycube[0][3][2] != cpycube[0][2][2])) lstmov = ['L', 'U', 'F'];
										}
										else if (z == 2) {
												 if (cpycube[3][4][2] != oppoface && cpycube[4][3][2] != oppoface && (cpycube[3][4][2] != cpycube[2][4][2] || cpycube[4][3][2] != cpycube[4][2][2])) lstmov = ['R', 'D', 'F'];
											else if (cpycube[3][0][2] != oppoface && cpycube[4][1][2] != oppoface && (cpycube[3][0][2] != cpycube[2][0][2] || cpycube[4][1][2] != cpycube[4][2][2])) lstmov = ['R', 'B', 'D'];
											else if (cpycube[1][0][2] != oppoface && cpycube[0][1][2] != oppoface && (cpycube[1][0][2] != cpycube[2][0][2] || cpycube[0][1][2] != cpycube[0][2][2])) lstmov = ['R', 'U', 'B'];
											else if (cpycube[1][4][2] != oppoface && cpycube[0][3][2] != oppoface && (cpycube[1][4][2] != cpycube[2][4][2] || cpycube[0][3][2] != cpycube[0][2][2])) lstmov = ['R', 'F', 'U'];
										}
									}
								}
							}
						}
					}
				}
				if (lstmov)
					solv = "ada'd'a'c'ac".replace(/a/g, lstmov[0]).replace(/d/g, lstmov[1]).replace(/c/g, lstmov[2])
				if (solv == '') {
					if (count >= 4) {
						console.log(i, solution, cpycube)
						console.error("infinity loop")
						return []
					}
					solution = solution.concat([oppoface])
					applimidsolve([oppoface], cpycube)
					smallcube = compactcube(cpycube)
				}
				else
					solv = solv.split(/(?=[U,L,B,R,F,D])/)
			}
			solution = solution.concat(solv)
			applimidsolve(solv, cpycube)
			smallcube = compactcube(cpycube)
			solv = ''
			count = 0;
			while (solv == '') {
				count++
				let lstmov = [0,[]]
				if (!testsecondlayer([startingface,oppoface,i + 1],cpycube,smallcube)) {
					for (let x = 0; x < 3; x++) {
							for (let y = 0; y < 3; y++) {
								for (let z = 0; z < 3; z++) {
									if ((x + y + z + 1) %2 && (x == 1 || y == 1 || z == 1)) {
										if (smallcube[x][y][z] == oppoface) {
										if (x == 0) {
											if (cpycube[0][1][2] == cpycube[2][2][0] && cpycube[1][0][2] == cpycube[2][0][2]) lstmov = [2,['U', 'L', 'B']];
											else if (cpycube[0][1][2] == cpycube[2][2][4] && cpycube[1][0][2] == cpycube[2][0][2]) lstmov = [1,['U', 'R', 'B']];
											else if (cpycube[0][2][1] == cpycube[2][0][2] && cpycube[1][2][0] == cpycube[2][2][0]) lstmov = [1,['U', 'B', 'L']];
											else if (cpycube[0][2][1] == cpycube[2][4][2] && cpycube[1][2][0] == cpycube[2][2][0]) lstmov = [2,['U', 'F', 'L']];
											else if (cpycube[0][3][2] == cpycube[2][2][0] && cpycube[1][4][2] == cpycube[2][4][2]) lstmov = [1,['U', 'L', 'F']];
											else if (cpycube[0][3][2] == cpycube[2][2][4] && cpycube[1][4][2] == cpycube[2][4][2]) lstmov = [2,['U', 'R', 'F']];
											else if (cpycube[0][2][3] == cpycube[2][0][2] && cpycube[1][2][4] == cpycube[2][2][4]) lstmov = [2,['U', 'B', 'R']];
											else if (cpycube[0][2][3] == cpycube[2][4][2] && cpycube[1][2][4] == cpycube[2][2][4]) lstmov = [1,['U', 'F', 'R']];
										}
										else if (x == 2) {
											if (cpycube[4][1][2] == cpycube[2][2][0] && cpycube[3][0][2] == cpycube[2][0][2]) lstmov = [1,['D', 'L', 'B']];
											else if (cpycube[4][1][2] == cpycube[2][2][4] && cpycube[3][0][2] == cpycube[2][0][2]) lstmov = [2,['D', 'R', 'B']];
											else if (cpycube[4][2][1] == cpycube[2][0][2] && cpycube[3][2][0] == cpycube[2][2][0]) lstmov = [2,['D', 'B', 'L']];
											else if (cpycube[4][2][1] == cpycube[2][4][2] && cpycube[3][2][0] == cpycube[2][2][0]) lstmov = [1,['D', 'F', 'L']];
											else if (cpycube[4][3][2] == cpycube[2][2][0] && cpycube[3][4][2] == cpycube[2][4][2]) lstmov = [2,['D', 'L', 'F']];
											else if (cpycube[4][3][2] == cpycube[2][2][4] && cpycube[3][4][2] == cpycube[2][4][2]) lstmov = [1,['D', 'R', 'F']];
											else if (cpycube[4][2][3] == cpycube[2][0][2] && cpycube[3][2][4] == cpycube[2][2][4]) lstmov = [1,['D', 'B', 'R']];
											else if (cpycube[4][2][3] == cpycube[2][4][2] && cpycube[3][2][4] == cpycube[2][2][4]) lstmov = [2,['D', 'F', 'R']];
										}
										else if (y == 0) {
											if (cpycube[1][0][2] == cpycube[2][2][0] && cpycube[0][1][2] == cpycube[0][2][2]) lstmov = [1,['B', 'L', 'U']];
											else if (cpycube[1][0][2] == cpycube[2][2][4] && cpycube[0][1][2] == cpycube[0][2][2]) lstmov = [2,['B', 'R', 'U']];
											else if (cpycube[2][0][1] == cpycube[0][2][2] && cpycube[2][1][0] == cpycube[2][2][0]) lstmov = [2,['B', 'U', 'L']];
											else if (cpycube[2][0][1] == cpycube[4][2][2] && cpycube[2][1][0] == cpycube[2][2][0]) lstmov = [1,['B', 'D', 'L']];
											else if (cpycube[3][0][2] == cpycube[2][2][0] && cpycube[4][1][2] == cpycube[4][2][2]) lstmov = [2,['B', 'L', 'D']];
											else if (cpycube[3][0][2] == cpycube[2][2][4] && cpycube[4][1][2] == cpycube[4][2][2]) lstmov = [1,['B', 'R', 'D']];
											else if (cpycube[2][0][3] == cpycube[0][2][2] && cpycube[2][1][4] == cpycube[2][2][4]) lstmov = [1,['B', 'U', 'R']];
											else if (cpycube[2][0][3] == cpycube[4][2][2] && cpycube[2][1][4] == cpycube[2][2][4]) lstmov = [2,['B', 'D', 'R']];
										}
										else if (y == 2) {
											if (cpycube[1][4][2] == cpycube[2][2][0] && cpycube[0][3][2] == cpycube[0][2][2]) lstmov = [2,['F', 'L', 'U']];
											else if (cpycube[1][4][2] == cpycube[2][2][4] && cpycube[0][3][2] == cpycube[0][2][2]) lstmov = [1,['F', 'R', 'U']];
											else if (cpycube[2][4][1] == cpycube[0][2][2] && cpycube[2][3][0] == cpycube[2][2][0]) lstmov = [1,['F', 'U', 'L']];
											else if (cpycube[2][4][1] == cpycube[4][2][2] && cpycube[2][3][0] == cpycube[2][2][0]) lstmov = [2,['F', 'D', 'L']];
											else if (cpycube[3][4][2] == cpycube[2][2][0] && cpycube[4][3][2] == cpycube[4][2][2]) lstmov = [1,['F', 'L', 'D']];
											else if (cpycube[3][4][2] == cpycube[2][2][4] && cpycube[4][3][2] == cpycube[4][2][2]) lstmov = [2,['F', 'R', 'D']];
											else if (cpycube[2][4][3] == cpycube[0][2][2] && cpycube[2][3][4] == cpycube[2][2][4]) lstmov = [2,['F', 'U', 'R']];
											else if (cpycube[2][4][3] == cpycube[4][2][2] && cpycube[2][3][4] == cpycube[2][2][4]) lstmov = [1,['F', 'D', 'R']];
										}
										else if (z == 0) {
											if (cpycube[1][2][0] == cpycube[2][0][2] && cpycube[0][2][1] == cpycube[0][2][2]) lstmov = [2,['L', 'B', 'U']];
											else if (cpycube[1][2][0] == cpycube[2][4][2] && cpycube[0][2][1] == cpycube[0][2][2]) lstmov = [1,['L', 'F', 'U']];
											else if (cpycube[2][1][0] == cpycube[0][2][2] && cpycube[2][0][1] == cpycube[2][0][2]) lstmov = [1,['L', 'U', 'B']];
											else if (cpycube[2][1][0] == cpycube[4][2][2] && cpycube[2][0][1] == cpycube[2][0][2]) lstmov = [2,['L', 'D', 'B']];
											else if (cpycube[3][2][0] == cpycube[2][0][2] && cpycube[4][2][1] == cpycube[4][2][2]) lstmov = [1,['L', 'B', 'D']];
											else if (cpycube[3][2][0] == cpycube[2][4][2] && cpycube[4][2][1] == cpycube[4][2][2]) lstmov = [2,['L', 'F', 'D']];
											else if (cpycube[2][3][0] == cpycube[0][2][2] && cpycube[2][4][1] == cpycube[2][4][2]) lstmov = [2,['L', 'U', 'F']];
											else if (cpycube[2][3][0] == cpycube[4][2][2] && cpycube[2][4][1] == cpycube[2][4][2]) lstmov = [1,['L', 'D', 'F']];
										}
										else if (z == 2) {
											if (cpycube[1][2][4] == cpycube[2][0][2] && cpycube[0][2][3] == cpycube[0][2][2]) lstmov = [1,['R', 'B', 'U']];
											else if (cpycube[1][2][4] == cpycube[2][4][2] && cpycube[0][2][3] == cpycube[0][2][2]) lstmov = [2,['R', 'F', 'U']];
											else if (cpycube[2][1][4] == cpycube[0][2][2] && cpycube[2][0][3] == cpycube[2][0][2]) lstmov = [2,['R', 'U', 'B']];
											else if (cpycube[2][1][4] == cpycube[4][2][2] && cpycube[2][0][3] == cpycube[2][0][2]) lstmov = [1,['R', 'D', 'B']];
											else if (cpycube[3][2][4] == cpycube[2][0][2] && cpycube[4][2][3] == cpycube[4][2][2]) lstmov = [2,['R', 'B', 'D']];
											else if (cpycube[3][2][4] == cpycube[2][4][2] && cpycube[4][2][3] == cpycube[4][2][2]) lstmov = [1,['R', 'F', 'D']];
											else if (cpycube[2][3][4] == cpycube[0][2][2] && cpycube[2][4][3] == cpycube[2][4][2]) lstmov = [1,['R', 'U', 'F']];
											else if (cpycube[2][3][4] == cpycube[4][2][2] && cpycube[2][4][3] == cpycube[2][4][2]) lstmov = [2,['R', 'D', 'F']];
										}
									}
								}
							}
						}
					}
				}
				if (lstmov[0] == 1)
					solv = "a'b'abaca'c'".replace(/a/g, lstmov[1][0]).replace(/b/g, lstmov[1][1]).replace(/c/g, lstmov[1][2]);
				else if (lstmov[0] == 2)
					solv = "ada'd'a'c'ac".replace(/a/g, lstmov[1][0]).replace(/d/g, lstmov[1][1]).replace(/c/g, lstmov[1][2]);
				if (solv == '') {
					if (count >= 4) {
						console.log(i, solution, cpycube)
						console.error("infinity loop")
						return []
					}
					solution = solution.concat([oppoface])
					applimidsolve([oppoface], cpycube)
					smallcube = compactcube(cpycube)
				}
				else
					solv = solv.split(/(?=[U,L,B,R,F,D])/)
			}
			solution = solution.concat(solv)
			applimidsolve(solv, cpycube)
			smallcube = compactcube(cpycube)
		}
		else if (!testsecondlayer([startingface,oppoface,i + 1],cpycube,smallcube)) {
			let solv = ''
			let count = 0;
			while (solv == '') {
				count++
				let lstmov = [0,[]]
				if (!testsecondlayer([startingface,oppoface,i + 1],cpycube,smallcube)) {
					for (let x = 0; x < 3; x++) {
							for (let y = 0; y < 3; y++) {
								for (let z = 0; z < 3; z++) {
									if ((x + y + z + 1) %2 && (x == 1 || y == 1 || z == 1)) {
										if (smallcube[x][y][z] == oppoface) {
										if (x == 0) {
											if (cpycube[0][1][2] == cpycube[2][2][0] && cpycube[1][0][2] == cpycube[2][0][2]) lstmov = [2,['U', 'L', 'B']];
											else if (cpycube[0][1][2] == cpycube[2][2][4] && cpycube[1][0][2] == cpycube[2][0][2]) lstmov = [1,['U', 'R', 'B']];
											else if (cpycube[0][2][1] == cpycube[2][0][2] && cpycube[1][2][0] == cpycube[2][2][0]) lstmov = [1,['U', 'B', 'L']];
											else if (cpycube[0][2][1] == cpycube[2][4][2] && cpycube[1][2][0] == cpycube[2][2][0]) lstmov = [2,['U', 'F', 'L']];
											else if (cpycube[0][3][2] == cpycube[2][2][0] && cpycube[1][4][2] == cpycube[2][4][2]) lstmov = [1,['U', 'L', 'F']];
											else if (cpycube[0][3][2] == cpycube[2][2][4] && cpycube[1][4][2] == cpycube[2][4][2]) lstmov = [2,['U', 'R', 'F']];
											else if (cpycube[0][2][3] == cpycube[2][0][2] && cpycube[1][2][4] == cpycube[2][2][4]) lstmov = [2,['U', 'B', 'R']];
											else if (cpycube[0][2][3] == cpycube[2][4][2] && cpycube[1][2][4] == cpycube[2][2][4]) lstmov = [1,['U', 'F', 'R']];
										}
										else if (x == 2) {
											if (cpycube[4][1][2] == cpycube[2][2][0] && cpycube[3][0][2] == cpycube[2][0][2]) lstmov = [1,['D', 'L', 'B']];
											else if (cpycube[4][1][2] == cpycube[2][2][4] && cpycube[3][0][2] == cpycube[2][0][2]) lstmov = [2,['D', 'R', 'B']];
											else if (cpycube[4][2][1] == cpycube[2][0][2] && cpycube[3][2][0] == cpycube[2][2][0]) lstmov = [2,['D', 'B', 'L']];
											else if (cpycube[4][2][1] == cpycube[2][4][2] && cpycube[3][2][0] == cpycube[2][2][0]) lstmov = [1,['D', 'F', 'L']];
											else if (cpycube[4][3][2] == cpycube[2][2][0] && cpycube[3][4][2] == cpycube[2][4][2]) lstmov = [2,['D', 'L', 'F']];
											else if (cpycube[4][3][2] == cpycube[2][2][4] && cpycube[3][4][2] == cpycube[2][4][2]) lstmov = [1,['D', 'R', 'F']];
											else if (cpycube[4][2][3] == cpycube[2][0][2] && cpycube[3][2][4] == cpycube[2][2][4]) lstmov = [1,['D', 'B', 'R']];
											else if (cpycube[4][2][3] == cpycube[2][4][2] && cpycube[3][2][4] == cpycube[2][2][4]) lstmov = [2,['D', 'F', 'R']];
										}
										else if (y == 0) {
											if (cpycube[1][0][2] == cpycube[2][2][0] && cpycube[0][1][2] == cpycube[0][2][2]) lstmov = [1,['B', 'L', 'U']];
											else if (cpycube[1][0][2] == cpycube[2][2][4] && cpycube[0][1][2] == cpycube[0][2][2]) lstmov = [2,['B', 'R', 'U']];
											else if (cpycube[2][0][1] == cpycube[0][2][2] && cpycube[2][1][0] == cpycube[2][2][0]) lstmov = [2,['B', 'U', 'L']];
											else if (cpycube[2][0][1] == cpycube[4][2][2] && cpycube[2][1][0] == cpycube[2][2][0]) lstmov = [1,['B', 'D', 'L']];
											else if (cpycube[3][0][2] == cpycube[2][2][0] && cpycube[4][1][2] == cpycube[4][2][2]) lstmov = [2,['B', 'L', 'D']];
											else if (cpycube[3][0][2] == cpycube[2][2][4] && cpycube[4][1][2] == cpycube[4][2][2]) lstmov = [1,['B', 'R', 'D']];
											else if (cpycube[2][0][3] == cpycube[0][2][2] && cpycube[2][1][4] == cpycube[2][2][4]) lstmov = [1,['B', 'U', 'R']];
											else if (cpycube[2][0][3] == cpycube[4][2][2] && cpycube[2][1][4] == cpycube[2][2][4]) lstmov = [2,['B', 'D', 'R']];
										}
										else if (y == 2) {
											if (cpycube[1][4][2] == cpycube[2][2][0] && cpycube[0][3][2] == cpycube[0][2][2]) lstmov = [2,['F', 'L', 'U']];
											else if (cpycube[1][4][2] == cpycube[2][2][4] && cpycube[0][3][2] == cpycube[0][2][2]) lstmov = [1,['F', 'R', 'U']];
											else if (cpycube[2][4][1] == cpycube[0][2][2] && cpycube[2][3][0] == cpycube[2][2][0]) lstmov = [1,['F', 'U', 'L']];
											else if (cpycube[2][4][1] == cpycube[4][2][2] && cpycube[2][3][0] == cpycube[2][2][0]) lstmov = [2,['F', 'D', 'L']];
											else if (cpycube[3][4][2] == cpycube[2][2][0] && cpycube[4][3][2] == cpycube[4][2][2]) lstmov = [1,['F', 'L', 'D']];
											else if (cpycube[3][4][2] == cpycube[2][2][4] && cpycube[4][3][2] == cpycube[4][2][2]) lstmov = [2,['F', 'R', 'D']];
											else if (cpycube[2][4][3] == cpycube[0][2][2] && cpycube[2][3][4] == cpycube[2][2][4]) lstmov = [2,['F', 'U', 'R']];
											else if (cpycube[2][4][3] == cpycube[4][2][2] && cpycube[2][3][4] == cpycube[2][2][4]) lstmov = [1,['F', 'D', 'R']];
										}
										else if (z == 0) {
											if (cpycube[1][2][0] == cpycube[2][0][2] && cpycube[0][2][1] == cpycube[0][2][2]) lstmov = [2,['L', 'B', 'U']];
											else if (cpycube[1][2][0] == cpycube[2][4][2] && cpycube[0][2][1] == cpycube[0][2][2]) lstmov = [1,['L', 'F', 'U']];
											else if (cpycube[2][1][0] == cpycube[0][2][2] && cpycube[2][0][1] == cpycube[2][0][2]) lstmov = [1,['L', 'U', 'B']];
											else if (cpycube[2][1][0] == cpycube[4][2][2] && cpycube[2][0][1] == cpycube[2][0][2]) lstmov = [2,['L', 'D', 'B']];
											else if (cpycube[3][2][0] == cpycube[2][0][2] && cpycube[4][2][1] == cpycube[4][2][2]) lstmov = [1,['L', 'B', 'D']];
											else if (cpycube[3][2][0] == cpycube[2][4][2] && cpycube[4][2][1] == cpycube[4][2][2]) lstmov = [2,['L', 'F', 'D']];
											else if (cpycube[2][3][0] == cpycube[0][2][2] && cpycube[2][4][1] == cpycube[2][4][2]) lstmov = [2,['L', 'U', 'F']];
											else if (cpycube[2][3][0] == cpycube[4][2][2] && cpycube[2][4][1] == cpycube[2][4][2]) lstmov = [1,['L', 'D', 'F']];
										}
										else if (z == 2) {
											if (cpycube[1][2][4] == cpycube[2][0][2] && cpycube[0][2][3] == cpycube[0][2][2]) lstmov = [1,['R', 'B', 'U']];
											else if (cpycube[1][2][4] == cpycube[2][4][2] && cpycube[0][2][3] == cpycube[0][2][2]) lstmov = [2,['R', 'F', 'U']];
											else if (cpycube[2][1][4] == cpycube[0][2][2] && cpycube[2][0][3] == cpycube[2][0][2]) lstmov = [2,['R', 'U', 'B']];
											else if (cpycube[2][1][4] == cpycube[4][2][2] && cpycube[2][0][3] == cpycube[2][0][2]) lstmov = [1,['R', 'D', 'B']];
											else if (cpycube[3][2][4] == cpycube[2][0][2] && cpycube[4][2][3] == cpycube[4][2][2]) lstmov = [2,['R', 'B', 'D']];
											else if (cpycube[3][2][4] == cpycube[2][4][2] && cpycube[4][2][3] == cpycube[4][2][2]) lstmov = [1,['R', 'F', 'D']];
											else if (cpycube[2][3][4] == cpycube[0][2][2] && cpycube[2][4][3] == cpycube[2][4][2]) lstmov = [1,['R', 'U', 'F']];
											else if (cpycube[2][3][4] == cpycube[4][2][2] && cpycube[2][4][3] == cpycube[2][4][2]) lstmov = [2,['R', 'D', 'F']];
										}
									}
								}
							}
						}
					}
				}
				if (lstmov[0] == 1)
					solv = "a'b'abaca'c'".replace(/a/g, lstmov[1][0]).replace(/b/g, lstmov[1][1]).replace(/c/g, lstmov[1][2]);
				else if (lstmov[0] == 2)
					solv = "ada'd'a'c'ac".replace(/a/g, lstmov[1][0]).replace(/d/g, lstmov[1][1]).replace(/c/g, lstmov[1][2]);
				if (solv == '') {
					if (count >= 4) {
						console.log(i, solution, cpycube)
						console.error("infinity loop")
						return []
					}
					solution = solution.concat([oppoface])
					applimidsolve([oppoface], cpycube)
					smallcube = compactcube(cpycube)
				}
				else
					solv = solv.split(/(?=[U,L,B,R,F,D])/)
			}
			solution = solution.concat(solv)
			applimidsolve(solv, cpycube)
			smallcube = compactcube(cpycube)
		}
	}
	return solution
}

function creatoppoface(oppoface, virtualgrid, lastmove) {
	let solution = ''
	let smallcube = compactcube(virtualgrid)
	let crossinfo = countoppocross([oppoface], virtualgrid, smallcube)
	let cpycube =  JSON.parse(JSON.stringify(virtualgrid));
	console.log(crossinfo)
	if (crossinfo[0] == 0) {
		if (crossinfo[2] == 'x' && crossinfo[3] == 0) {
			solution = "abcb'c'a'ecdc'd'e'".replace(/a/g, 'F').replace(/b/g, 'R').replace(/c/g, 'U').replace(/d/g, 'L').replace(/e/g, 'B');
		}
		else if (crossinfo[2] == 'x' && crossinfo[3] == 2) {
			solution = "abcb'c'a'ecdc'd'e'".replace(/a/g, 'F').replace(/b/g, 'L').replace(/c/g, 'D').replace(/d/g, 'R').replace(/e/g, 'B');
		}
		else if (crossinfo[2] == 'y' && crossinfo[3] == 0) {
			solution = "abcb'c'a'ecdc'd'e'".replace(/a/g, 'U').replace(/b/g, 'R').replace(/c/g, 'B').replace(/d/g, 'L').replace(/e/g, 'D');
		}
		else if (crossinfo[2] == 'y' && crossinfo[3] == 2) {
			solution = "abcb'c'a'ecdc'd'e'".replace(/a/g, 'U').replace(/b/g, 'L').replace(/c/g, 'F').replace(/d/g, 'R').replace(/e/g, 'D');
		}
		else if (crossinfo[2] == 'z' && crossinfo[3] == 0) {
			solution = "abcb'c'a'ecdc'd'e'".replace(/a/g, 'F').replace(/b/g, 'D').replace(/c/g, 'R').replace(/d/g, 'U').replace(/e/g, 'B');
		}
		else if (crossinfo[2] == 'z' && crossinfo[3] == 2) {
			solution = "abcb'c'a'ecdc'd'e'".replace(/a/g, 'F').replace(/b/g, 'U').replace(/c/g, 'L').replace(/d/g, 'D').replace(/e/g, 'B');
		}
	}
	else if (crossinfo[0] == 2 && crossinfo[1] == false) {
		if (crossinfo[2] == 'x') {
			if (cpycube[crossinfo[3] * 2][3][2] == oppoface && cpycube[crossinfo[3] * 2][2][3] == oppoface) {
				if (crossinfo[3] == 0) {
					solution = "abcb'c'a'".replace(/a/g, 'B').replace(/b/g, 'U').replace(/c/g, 'L');
				}
				else if (crossinfo[3] == 2) {
					solution = "abcb'c'a'".replace(/a/g, 'F').replace(/b/g, 'D').replace(/c/g, 'L');
				}
			}
			else if (cpycube[crossinfo[3] * 2][1][2] == oppoface && cpycube[crossinfo[3] * 2][2][3] == oppoface) {
				if (crossinfo[3] == 0) {
					solution = "abcb'c'a'".replace(/a/g, 'L').replace(/b/g, 'U').replace(/c/g, 'F');
				}
				else if (crossinfo[3] == 2) {
					solution = "abcb'c'a'".replace(/a/g, 'R').replace(/b/g, 'D').replace(/c/g, 'F');
				}
			}
			else if (cpycube[crossinfo[3] * 2][1][2] == oppoface && cpycube[crossinfo[3] * 2][2][1] == oppoface) {
				if (crossinfo[3] == 0) {
					solution = "abcb'c'a'".replace(/a/g, 'F').replace(/b/g, 'U').replace(/c/g, 'R');
				}
				else if (crossinfo[3] == 2) {
					solution = "abcb'c'a'".replace(/a/g, 'B').replace(/b/g, 'D').replace(/c/g, 'R');
				}
			}
			else if (cpycube[crossinfo[3] * 2][3][2] == oppoface && cpycube[crossinfo[3] * 2][2][1] == oppoface) {
				if (crossinfo[3] == 0) {
					solution = "abcb'c'a'".replace(/a/g, 'R').replace(/b/g, 'U').replace(/c/g, 'B');
				}
				else if (crossinfo[3] == 2) {
					console.log('dada')
					solution = "abcb'c'a'".replace(/a/g, 'L').replace(/b/g, 'D').replace(/c/g, 'B');
				}
			}
		}
		else if (crossinfo[2] == 'y') {
			if (cpycube[3][crossinfo[3] * 2][2] == oppoface && cpycube[2][crossinfo[3] * 2][3] == oppoface) {
				if (crossinfo[3] == 0) {
					solution = "abcb'c'a'".replace(/a/g, 'L').replace(/b/g, 'B').replace(/c/g, 'U');
				}
				else if (crossinfo[3] == 2) {
					solution = "abcb'c'a'".replace(/a/g, 'R').replace(/b/g, 'F').replace(/c/g, 'U');
				}
			}
			else if (cpycube[1][crossinfo[3] * 2][2] == oppoface && cpycube[2][crossinfo[3] * 2][3] == oppoface) {
				if (crossinfo[3] == 0) {
					solution = "abcb'c'a'".replace(/a/g, 'U').replace(/b/g, 'B').replace(/c/g, 'R');
				}
				else if (crossinfo[3] == 2) {
					solution = "abcb'c'a'".replace(/a/g, 'D').replace(/b/g, 'F').replace(/c/g, 'R');
				}
			}
			else if (cpycube[1][crossinfo[3] * 2][2] == oppoface && cpycube[2][crossinfo[3] * 2][1] == oppoface) {
				if (crossinfo[3] == 0) {
					solution = "abcb'c'a'".replace(/a/g, 'R').replace(/b/g, 'B').replace(/c/g, 'D');
				}
				else if (crossinfo[3] == 2) {
					solution = "abcb'c'a'".replace(/a/g, 'L').replace(/b/g, 'F').replace(/c/g, 'D');
				}
			}
			else if (cpycube[3][crossinfo[3] * 2][2] == oppoface && cpycube[2][crossinfo[3] * 2][1] == oppoface) {
				if (crossinfo[3] == 0) {
					solution = "abcb'c'a'".replace(/a/g, 'D').replace(/b/g, 'B').replace(/c/g, 'L');
				}
				else if (crossinfo[3] == 2) {
					solution = "abcb'c'a'".replace(/a/g, 'U').replace(/b/g, 'F').replace(/c/g, 'L');
				}
			}
		}
		else if (crossinfo[2] == 'z') {
			if (cpycube[3][2][crossinfo[3] * 2] == oppoface && cpycube[2][3][crossinfo[3] * 2] == oppoface) {
				if (crossinfo[3] == 0) {
					solution = "abcb'c'a'".replace(/a/g, 'U').replace(/b/g, 'L').replace(/c/g, 'B');
				}
				else if (crossinfo[3] == 2) {
					solution = "abcb'c'a'".replace(/a/g, 'D').replace(/b/g, 'R').replace(/c/g, 'B');
				}
			}
			else if (cpycube[1][2][crossinfo[3] * 2] == oppoface && cpycube[2][3][crossinfo[3] * 2] == oppoface) {
				if (crossinfo[3] == 0) {
					solution = "abcb'c'a'".replace(/a/g, 'B').replace(/b/g, 'L').replace(/c/g, 'D');
				}
				else if (crossinfo[3] == 2) {
					solution = "abcb'c'a'".replace(/a/g, 'F').replace(/b/g, 'R').replace(/c/g, 'D');
				}
			}
			else if (cpycube[1][2][crossinfo[3] * 2] == oppoface && cpycube[2][1][crossinfo[3] * 2] == oppoface) {
				if (crossinfo[3] == 0) {
					solution = "abcb'c'a'".replace(/a/g, 'D').replace(/b/g, 'L').replace(/c/g, 'F');
				}
				else if (crossinfo[3] == 2) {
					solution = "abcb'c'a'".replace(/a/g, 'U').replace(/b/g, 'R').replace(/c/g, 'F');
				}
			}
			else if (cpycube[3][2][crossinfo[3] * 2] == oppoface && cpycube[2][1][crossinfo[3] * 2] == oppoface) {
				if (crossinfo[3] == 0) {
					solution = "abcb'c'a'".replace(/a/g, 'F').replace(/b/g, 'L').replace(/c/g, 'U');
				}
				else if (crossinfo[3] == 2) {
					solution = "abcb'c'a'".replace(/a/g, 'B').replace(/b/g, 'R').replace(/c/g, 'U');
				}
			}
		}
	}
	else if (crossinfo[0] == 2 && crossinfo[1] == true) {
		if (lastmove[0]) {
			let ok = 0
			let rot = 0
			let i = 0
			while (!ok) {
				if (lastmove[i][0] == oppoface) {
					switch (lastmove[i][1]) {
						case "'":
							rot--
							break;
						case "2":
							rot += 2
							break;
						default:
							rot++
							break;
					}
				}
				else 
					ok = 1
				i++;
			}
			while (rot%4) {
				rot++
				solution += oppoface;
			}
			if (solution != '') {
				solution = solution.concat([oppoface])
				applimidsolve(solution.split(/(?=[U,L,B,R,F,D])/), cpycube)
				smallcube = compactcube(cpycube)
			}
		}
		if (crossinfo[2] == 'x' && crossinfo[3] == 0) {
			if(cpycube[0][1][2] == cpycube[0][2][2])
				solution = "abcb'c'a'".replace(/a/g, 'L').replace(/b/g, 'F').replace(/c/g, 'U');
			else
				solution = "abcb'c'a'".replace(/a/g, 'F').replace(/b/g, 'R').replace(/c/g, 'U');
		}
		else if (crossinfo[2] == 'x' && crossinfo[3] == 2) {
			if(cpycube[4][1][2] == cpycube[4][2][2])
				solution = "abcb'c'a'".replace(/a/g, 'F').replace(/b/g, 'L').replace(/c/g, 'D');
			else
				solution = "abcb'c'a'".replace(/a/g, 'R').replace(/b/g, 'F').replace(/c/g, 'D');
		}
		else if (crossinfo[2] == 'y' && crossinfo[3] == 0) {
			if(cpycube[1][0][2] == cpycube[2][0][2])
				solution = "abcb'c'a'".replace(/a/g, 'R').replace(/b/g, 'D').replace(/c/g, 'B');
			else
				solution = "abcb'c'a'".replace(/a/g, 'D').replace(/b/g, 'L').replace(/c/g, 'B')
		}
		else if (crossinfo[2] == 'y' && crossinfo[3] == 2) {
			if(cpycube[1][4][2] == cpycube[2][4][2])
				solution = "abcb'c'a'".replace(/a/g, 'D').replace(/b/g, 'R').replace(/c/g, 'F');
			else
				solution = "abcb'c'a'".replace(/a/g, 'L').replace(/b/g, 'D').replace(/c/g, 'F');
		}
		else if (crossinfo[2] == 'z' && crossinfo[3] == 0) {
			if(cpycube[1][2][0] == cpycube[2][2][0])
				solution = "abcb'c'a'".replace(/a/g, 'B').replace(/b/g, 'D').replace(/c/g, 'L');
			else
				solution = "abcb'c'a'".replace(/a/g, 'D').replace(/b/g, 'F').replace(/c/g, 'L');
		}
		else if (crossinfo[2] == 'z' && crossinfo[3] == 2) {
			if(cpycube[1][2][4] == cpycube[2][2][4])
				solution = "abcb'c'a'".replace(/a/g, 'D').replace(/b/g, 'B').replace(/c/g, 'R');
			else
				solution = "abcb'c'a'".replace(/a/g, 'F').replace(/b/g, 'D').replace(/c/g, 'R');
		}
	}
	return solution.split(/(?=[U,L,B,R,F,D])/)
}

function solveit() {
	// algo basique v3 based on v1
	let lstallmod = '';
	let virtualgrid = JSON.parse(JSON.stringify(curentgrid));

	// creat cross
	let tmp = creatcross(virtualgrid);
	console.log(tmp)
	let startingface = tmp[1]
	lstallmod += tmp[0].join('')
	applimidsolve(tmp[0], virtualgrid)
	let oppoface = nameMove[(nameMove.indexOf(startingface) + 3) % 6]

	if(document.getElementById('speedy').value == 2){
		// creat twolayeur
		// let tmp = creattwolayeur(virtualgrid);
		// console.log(tmp)
		// lstallmod += tmp
		// applimidsolve(tmp, virtualgrid)
	}
	else {
		// creat face
		tmp = creatface(startingface, virtualgrid);
		console.log([tmp])
		lstallmod += tmp.join('')
		applimidsolve(tmp, virtualgrid)

		// creat second
		tmp = creatsecond(oppoface, startingface, virtualgrid);
		console.log([tmp])
		lstallmod += tmp.join('')
		applimidsolve(tmp, virtualgrid)
	}

	// creat oppo face
	let cpylst = lstallmod.split(/(?=[U,L,B,R,F,D])/).reverse()
	tmp = creatoppoface(oppoface, virtualgrid, cpylst);
	console.log([tmp])
	lstallmod += tmp.join('')
	applimidsolve(tmp, virtualgrid)

	creatmoy(lstallmod.split(/(?=[U,L,B,R,F,D])/).length);
	document.getElementById('textsolve').value = lstallmod;
	return lstallmod.split(/(?=[U,L,B,R,F,D])/)
}

















var moyen = 0
var nbite = 0

function creatmoy(val) {
	moyen = (moyen * nbite + val) / (nbite + 1)
	nbite++;
	document.getElementById('textsolvelength').value = moyen
}

// document.addEventListener('DOMContentLoaded', function() {
// 	let tot = 0
// 	for (let index = 0; index < 50; index++) {
// 		restart();
// 		generatRand();
// 		applimodif();
// 		let tmp = solveit().length
// 		tot += tmp
// 		console.warn(tmp)
		
// 	}
// 	console.warn(tot, tot / 50)
//  }, false);


