let newgrid = [
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
							let nb = 0 + (testgrid[x * 2][1][2] == data[0]) + (testgrid[x * 2][2][3] == data[0]) +
									(testgrid[x * 2][2][1] == data[0]) + (testgrid[x * 2][3][2]== data[0])
							let barre = (testgrid[x * 2][1][2] == testgrid[x * 2][3][2] && testgrid[x * 2][1][2] == testgrid[x * 2][2][2]) ||
										(testgrid[x * 2][2][1] == testgrid[x * 2][2][3] && testgrid[x * 2][2][1] == testgrid[x * 2][2][2])
							return [nb, barre, 'x', x]
						}
						else if (y != 1) {
							let nb = 0 + (testgrid[1][y * 2][2] == data[0]) + (testgrid[2][y * 2][3] == data[0]) +
									(testgrid[2][y * 2][1] == data[0]) + (testgrid[3][y * 2][2]== data[0])
							let barre = (testgrid[1][y * 2][2] == testgrid[3][y * 2][2] && testgrid[1][y * 2][2] == testgrid[2][y * 2][2]) ||
										(testgrid[2][y * 2][1] == testgrid[2][y * 2][3] && testgrid[2][y * 2][1] == testgrid[2][y * 2][2])
							return [nb, barre, 'y', y]
						}
						else if (z != 1) {
							let nb = 0 + (testgrid[1][2][z * 2] == data[0]) + (testgrid[2][3][z * 2] == data[0]) +
									(testgrid[2][1][z * 2] == data[0]) + (testgrid[3][2][z * 2]== data[0])
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
	return [-1,null]
}

function countoppocorner(data, testgrid, smallcube) {
	for (let x = 0; x < 3; x++) {
		for (let y = 0; y < 3; y++) {
			for (let z = 0; z < 3; z++) {
				if ((x + y + z + 1) %2 && (x == 1 || y == 1 || z == 1)) {
					if (smallcube[x][y][z] == data[0]) {
						if (x != 1) {
							let nb = 0 + (testgrid[x * 2][1][1] == data[0]) + (testgrid[x * 2][1][3] == data[0]) +
									(testgrid[x * 2][3][3] == data[0]) + (testgrid[x * 2][3][1] == data[0])
							return nb
						}
						else if (y != 1) {
							let nb = 0 + (testgrid[1][y * 2][1] == data[0]) + (testgrid[1][y * 2][3] == data[0]) +
									(testgrid[3][y * 2][3] == data[0]) + (testgrid[3][y * 2][1] == data[0])
							return nb
						}
						else if (z != 1) {
							let nb = 0 + (testgrid[1][1][z * 2] == data[0]) + (testgrid[1][3][z * 2] == data[0]) +
									(testgrid[3][3][z * 2] == data[0]) + (testgrid[3][1][z * 2] == data[0])
							return nb
						}
					}
				}
			}
		}
	}
	console.error('ca marche pas...')
	return -1
}

function testoppoface(data, testgrid, smallcube) {
	for (let x = 0; x < 3; x++) {
		for (let y = 0; y < 3; y++) {
			for (let z = 0; z < 3; z++) {
				if ((x + y + z + 1) %2 && (x == 1 || y == 1 || z == 1)) {
					if (smallcube[x][y][z] == data[0]) {
						if (x != 1) {
							if (testgrid[x * 2][1][1] == data[0] &&
								testgrid[x * 2][2][1] == data[0] &&
								testgrid[x * 2][3][1] == data[0] &&
								testgrid[x * 2][1][2] == data[0] &&
								testgrid[x * 2][2][2] == data[0] &&
								testgrid[x * 2][3][2] == data[0] &&
								testgrid[x * 2][1][3] == data[0] &&
								testgrid[x * 2][2][3] == data[0] &&
								testgrid[x * 2][3][3] == data[0])
								return true
						}
						else if (y != 1) {
							if (testgrid[1][y * 2][1] == data[0] &&
								testgrid[2][y * 2][1] == data[0] &&
								testgrid[3][y * 2][1] == data[0] &&
								testgrid[1][y * 2][2] == data[0] &&
								testgrid[2][y * 2][2] == data[0] &&
								testgrid[3][y * 2][2] == data[0] &&
								testgrid[1][y * 2][3] == data[0] &&
								testgrid[2][y * 2][3] == data[0] &&
								testgrid[3][y * 2][3] == data[0])
								return true
						}
						else if (z != 1) {
							if (testgrid[1][1][z * 2] == data[0] &&
								testgrid[2][1][z * 2] == data[0] &&
								testgrid[3][1][z * 2] == data[0] &&
								testgrid[1][2][z * 2] == data[0] &&
								testgrid[2][2][z * 2] == data[0] &&
								testgrid[3][2][z * 2] == data[0] &&
								testgrid[1][3][z * 2] == data[0] &&
								testgrid[2][3][z * 2] == data[0] &&
								testgrid[3][3][z * 2] == data[0])
								return true
						}
						return false
					}
				}
			}
		}
	}
	console.error('ca marche pas...')
	return false
}

function testlastcorner(data, testgrid, smallcube) {
	for (let x = 0; x < 3; x++) {
		for (let y = 0; y < 3; y++) {
			for (let z = 0; z < 3; z++) {
				if ((x + y + z + 1) %2 && (x == 1 || y == 1 || z == 1)) {
					if (smallcube[x][y][z] == data[0]) {
						if (x != 1) {
							if (testgrid[x + 1][0][1] == testgrid[x + 1][0][3] &&
								testgrid[x + 1][1][4] == testgrid[x + 1][3][4] &&
								testgrid[x + 1][4][3] == testgrid[x + 1][4][1] &&
								testgrid[x + 1][3][0] == testgrid[x + 1][1][0])
								return true
						}
						else if (y != 1) {
							if (testgrid[0][y + 1][1] == testgrid[0][y + 1][3] &&
								testgrid[1][y + 1][4] == testgrid[3][y + 1][4] &&
								testgrid[4][y + 1][3] == testgrid[4][y + 1][1] &&
								testgrid[3][y + 1][0] == testgrid[1][y + 1][0])
								return true
						}
						else if (z != 1) {
							if (testgrid[0][1][z + 1] == testgrid[0][3][z + 1] &&
								testgrid[1][4][z + 1] == testgrid[3][4][z + 1] &&
								testgrid[4][3][z + 1] == testgrid[4][1][z + 1] &&
								testgrid[3][0][z + 1] == testgrid[1][0][z + 1])
								return true
						}
						return false
					}
				}
			}
		}
	}
	console.error('ca marche pas...')
	return false
}

function testlastedges(data, testgrid, smallcube) {
	for (let x = 0; x < 3; x++) {
		for (let y = 0; y < 3; y++) {
			for (let z = 0; z < 3; z++) {
				if ((x + y + z + 1) %2 && (x == 1 || y == 1 || z == 1)) {
					if (smallcube[x][y][z] == data[0]) {
						if (x != 1) {
							if (testgrid[x + 1][0][2] == testgrid[x + 1][0][3] &&
								testgrid[x + 1][2][4] == testgrid[x + 1][3][4] &&
								testgrid[x + 1][4][3] == testgrid[x + 1][4][2] &&
								testgrid[x + 1][3][0] == testgrid[x + 1][2][0])
								return true
						}
						else if (y != 1) {
							if (testgrid[0][y + 1][2] == testgrid[0][y + 1][3] &&
								testgrid[2][y + 1][4] == testgrid[3][y + 1][4] &&
								testgrid[4][y + 1][3] == testgrid[4][y + 1][2] &&
								testgrid[3][y + 1][0] == testgrid[2][y + 1][0])
								return true
						}
						else if (z != 1) {
							if (testgrid[0][2][z + 1] == testgrid[0][3][z + 1] &&
								testgrid[2][4][z + 1] == testgrid[3][4][z + 1] &&
								testgrid[4][3][z + 1] == testgrid[4][2][z + 1] &&
								testgrid[3][0][z + 1] == testgrid[2][0][z + 1])
								return true
						}
						return false
					}
				}
			}
		}
	}
	console.error('ca marche pas...')
	return false
}

function testlasttwist(data, testgrid, smallcube) {
	for (let x = 0; x < 3; x++) {
		for (let y = 0; y < 3; y++) {
			for (let z = 0; z < 3; z++) {
				if ((x + y + z + 1) %2 && (x == 1 || y == 1 || z == 1)) {
					if (smallcube[x][y][z] == data[0]) {
						if (x != 1) {
							if (testgrid[x + 1][0][2] == testgrid[2][0][2] &&
								testgrid[x + 1][2][4] == testgrid[2][2][4] &&
								testgrid[x + 1][4][2] == testgrid[2][4][2] &&
								testgrid[x + 1][2][0] == testgrid[2][2][0])
								return true
						}
						else if (y != 1) {
							if (testgrid[0][y + 1][2] == testgrid[0][2][2] &&
								testgrid[2][y + 1][4] == testgrid[2][2][4] &&
								testgrid[4][y + 1][2] == testgrid[4][2][2] &&
								testgrid[2][y + 1][0] == testgrid[2][2][0])
								return true
						}
						else if (z != 1) {
							if (testgrid[0][2][z + 1] == testgrid[0][2][2] &&
								testgrid[2][4][z + 1] == testgrid[2][4][2] &&
								testgrid[4][2][z + 1] == testgrid[4][2][2] &&
								testgrid[2][0][z + 1] == testgrid[2][0][2])
								return true
						}
						return false
					}
				}
			}
		}
	}
	console.error('ca marche pas...')
	return false
}

function creatcross(virtualgrid) {
	let lstface = nameMove.split("")
	let keepmov = BADRETURN;
	let keepface = lstface[0];
	// let keepface = 'R';
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

function loopwithformul(virtualgrid, lstformul, oppoface, startingface, test) {
	if (test([oppoface], virtualgrid,compactcube(virtualgrid)))
		return []

	let lstmov = null
		 if (oppoface == 'U') lstmov = ['F', 'R', 'B', 'L', 'F', 'R', 'B',];
	else if (oppoface == 'D') lstmov = ['F', 'L', 'B', 'R', 'F', 'L', 'B',];
	else if (oppoface == 'F') lstmov = ['U', 'L', 'D', 'R', 'U', 'L', 'D',];
	else if (oppoface == 'B') lstmov = ['U', 'R', 'D', 'L', 'U', 'R', 'D',];
	else if (oppoface == 'R') lstmov = ['F', 'D', 'B', 'U', 'F', 'D', 'B',];
	else if (oppoface == 'L') lstmov = ['F', 'U', 'B', 'D', 'F', 'U', 'B',];

	for (let j = 0; j < lstformul.length; j++) {
		const formule = lstformul[j];
		for (let i = 0; i < 4; i++) {
			let cpycube = JSON.parse(JSON.stringify(virtualgrid))
			let testsolv = formule.replace(/a/g, oppoface).replace(/b/g, startingface)
			.replace(/c/g, lstmov[0 + i]).replace(/d/g, lstmov[1 + i]).replace(/e/g, lstmov[2 + i]).replace(/f/g, lstmov[3 + i])
			applimidsolve(testsolv.split(/(?=[U,L,B,R,F,D])/), cpycube)
			if (test([oppoface], cpycube, compactcube(cpycube)))
				return testsolv.split(/(?=[U,L,B,R,F,D])/)
		}
	}
	console.error('ca marche pas...')
	return []
}

// function solvemptyoppocross(startingface, oppoface, virtualgrid) {
function solvemptyoppocross(virtualgrid, oppoface) {
	let priority = [4,1,2,0]
	let lstmov = null
		 if (oppoface == 'U') lstmov = ['F', 'R', 'B', 'L', 'F', 'R', 'B',];
	else if (oppoface == 'D') lstmov = ['F', 'L', 'B', 'R', 'F', 'L', 'B',];
	else if (oppoface == 'F') lstmov = ['U', 'L', 'D', 'R', 'U', 'L', 'D',];
	else if (oppoface == 'B') lstmov = ['U', 'R', 'D', 'L', 'U', 'R', 'D',];
	else if (oppoface == 'R') lstmov = ['F', 'D', 'B', 'U', 'F', 'D', 'B',];
	else if (oppoface == 'L') lstmov = ['F', 'U', 'B', 'D', 'F', 'U', 'B',];
	let bestmov = [4, '']
	for (let i = 0; i < 4; i++) {
		let cpycube = JSON.parse(JSON.stringify(virtualgrid))
		let testsolv = "abcb'c'a'ecdc'd'e'".replace(/a/g, lstmov[0 + i]).replace(/b/g, lstmov[1 + i]).replace(/c/g, oppoface).replace(/e/g, lstmov[2 + i]).replace(/d/g, lstmov[3 + i])
		applimidsolve(testsolv.split(/(?=[U,L,B,R,F,D])/), cpycube)
		let smallcube = compactcube(cpycube)
		let goodcorner = countoppocorner([oppoface], cpycube, smallcube)
		let index = priority.indexOf(goodcorner)
		if (index == -1) {
			console.error('ca marche pas !!!!!')
			return []
		}
		if (index < bestmov[0])
			bestmov = [index, testsolv]
	}
	// console.warn(bestmov[1])
	return bestmov[1]
}

function creatoppocross(oppoface, virtualgrid) {
	let solution = ''
	let smallcube = compactcube(virtualgrid)
	let crossinfo = countoppocross([oppoface], virtualgrid, smallcube)
	let cpycube =  JSON.parse(JSON.stringify(virtualgrid));
	if (crossinfo[0] == 0) {
		solution += solvemptyoppocross(cpycube, oppoface)
	}
	else if (crossinfo[0] == 2 && crossinfo[1] == false) {
		let lstmov = null
		if (crossinfo[2] == 'x') {
				 if (cpycube[crossinfo[3] * 2][3][2] == oppoface && cpycube[crossinfo[3] * 2][2][3] == oppoface) lstmov = crossinfo[3] == 0 ? ['B', 'L'] : ['L', 'B'];
			else if (cpycube[crossinfo[3] * 2][1][2] == oppoface && cpycube[crossinfo[3] * 2][2][3] == oppoface) lstmov = crossinfo[3] == 0 ? ['L', 'F'] : ['F', 'L'];
			else if (cpycube[crossinfo[3] * 2][1][2] == oppoface && cpycube[crossinfo[3] * 2][2][1] == oppoface) lstmov = crossinfo[3] == 0 ? ['F', 'R'] : ['R', 'F'];
			else if (cpycube[crossinfo[3] * 2][3][2] == oppoface && cpycube[crossinfo[3] * 2][2][1] == oppoface) lstmov = crossinfo[3] == 0 ? ['R', 'B'] : ['B', 'R'];
		}
		else if (crossinfo[2] == 'y') {
				 if (cpycube[3][crossinfo[3] * 2][2] == oppoface && cpycube[2][crossinfo[3] * 2][3] == oppoface) lstmov = crossinfo[3] == 0 ? ['L', 'U'] : ['U', 'L'];
			else if (cpycube[1][crossinfo[3] * 2][2] == oppoface && cpycube[2][crossinfo[3] * 2][3] == oppoface) lstmov = crossinfo[3] == 0 ? ['D', 'L'] : ['L', 'D'];
			else if (cpycube[1][crossinfo[3] * 2][2] == oppoface && cpycube[2][crossinfo[3] * 2][1] == oppoface) lstmov = crossinfo[3] == 0 ? ['R', 'D'] : ['D', 'R'];
			else if (cpycube[3][crossinfo[3] * 2][2] == oppoface && cpycube[2][crossinfo[3] * 2][1] == oppoface) lstmov = crossinfo[3] == 0 ? ['U', 'R'] : ['R', 'U'];
		}
		else if (crossinfo[2] == 'z') {
				 if (cpycube[3][2][crossinfo[3] * 2] == oppoface && cpycube[2][3][crossinfo[3] * 2] == oppoface) lstmov = crossinfo[3] == 0 ? ['U', 'B'] : ['B', 'U'];
			else if (cpycube[1][2][crossinfo[3] * 2] == oppoface && cpycube[2][3][crossinfo[3] * 2] == oppoface) lstmov = crossinfo[3] == 0 ? ['B', 'D'] : ['D', 'B'];
			else if (cpycube[1][2][crossinfo[3] * 2] == oppoface && cpycube[2][1][crossinfo[3] * 2] == oppoface) lstmov = crossinfo[3] == 0 ? ['D', 'F'] : ['F', 'D'];
			else if (cpycube[3][2][crossinfo[3] * 2] == oppoface && cpycube[2][1][crossinfo[3] * 2] == oppoface) lstmov = crossinfo[3] == 0 ? ['F', 'U'] : ['U', 'F'];
		}
		solution += "abcb'c'a'".replace(/a/g, lstmov[0]).replace(/b/g, oppoface).replace(/c/g, lstmov[1]);
	}
	else if (crossinfo[0] == 2 && crossinfo[1] == true) {
		let lstmov = null
			 if (crossinfo[2] == 'x' && crossinfo[3] == 0) lstmov = cpycube[0][1][2] == cpycube[0][2][2] ? ['L', 'F'] : ['F', 'R'];
		else if (crossinfo[2] == 'x' && crossinfo[3] == 2) lstmov = cpycube[4][1][2] == cpycube[4][2][2] ? ['R', 'F'] : ['F', 'L'];
		else if (crossinfo[2] == 'y' && crossinfo[3] == 0) lstmov = cpycube[1][0][2] == cpycube[2][0][2] ? ['R', 'D'] : ['D', 'L']
		else if (crossinfo[2] == 'y' && crossinfo[3] == 2) lstmov = cpycube[1][4][2] == cpycube[2][4][2] ? ['L', 'D'] : ['D', 'R'];
		else if (crossinfo[2] == 'z' && crossinfo[3] == 0) lstmov = cpycube[1][2][0] == cpycube[2][2][0] ? ['B', 'D'] : ['D', 'F'];
		else if (crossinfo[2] == 'z' && crossinfo[3] == 2) lstmov = cpycube[1][2][4] == cpycube[2][2][4] ? ['F', 'D'] : ['D', 'B'];
		solution += "abcb'c'a'".replace(/a/g, lstmov[0]).replace(/b/g, lstmov[1]).replace(/c/g, oppoface);
	}
	if (solution == '')
		return []
	return solution.split(/(?=[U,L,B,R,F,D])/)
}

function creatoppoface(startingface, oppoface, virtualgrid) {
	let lstformul = [
		"dad'ada2d'",
		"da2d'a'da'd'",
		"dad'ada'd'ada2d'",
		"da2d2a'd2a'd2a2d",
		"d'c'de'd'cde",
		"d'cde'd'c'de",
		"d2bd'a2db'd'a2d'"]
	return loopwithformul(virtualgrid, lstformul, oppoface, startingface, testoppoface)
}

function placelastscorner(startingface, oppoface, virtualgrid) {
	let lstformul = [
		"dad'a'd'cd2a'd'a'dad'c'",
		"cda'd'a'dad'c'dad'a'd'cdc'"]
	return loopwithformul(virtualgrid, lstformul, oppoface, startingface, testlastcorner)
}

function placelastsedge(startingface, oppoface, virtualgrid) {
	let lstformul = [
		"d2a'd'a'dadada'd",
		"d'ad'a'd'a'd'adad2",
		"d2f2ad2f2a2d2f2ad2f2",
		"ad'a'da'dada'd'adad2a'd'a",
		"d2a'd'a'dadada'de2a'e'a'eaeaea'e"]
	return loopwithformul(virtualgrid, lstformul, oppoface, startingface, testlastedges)
}

function lasttwist(oppoface, virtualgrid) {
	let solution = []
	let cpycube = JSON.parse(JSON.stringify(virtualgrid))
	while (!testlasttwist([oppoface], cpycube, compactcube(cpycube))) {
	// while(0) {
		solution = solution.concat([oppoface])
		applimidsolve([oppoface], cpycube)
		if (solution.length > 5)
			return console.error("ca marche pas")
	}
	return solution
}

function cleanoutput(solution) {
	let done = 0

	if (solution.join('') == [""])
		return []
	while (!done) {
		done = 1
		//sort
		let ok = 0
		while (!ok) {
			let tmpsolv = []
			for (let i = 0; i < solution.length; i++) {
				const element = solution[i];
				const nextelem = solution[i + 1]
				let index = nameMove.indexOf(element[0])
				let nextindex = -1;
				if (nextelem == undefined)
					tmpsolv = tmpsolv.concat([element]);
				else {
					nextindex = nameMove.indexOf(nextelem[0])
					if (index == nextindex)
					tmpsolv = tmpsolv.concat([element])
					else if (index == nextindex% 3) {
						tmpsolv = tmpsolv.concat([nextelem])
						tmpsolv = tmpsolv.concat([element])
						i++
					}
					else {
						tmpsolv = tmpsolv.concat([element])
					}
				}
			}
			// nameMove

			if (tmpsolv.join('') != solution.join('')) {
				solution = tmpsolv
			}
			else
				ok = 1
		}
		//rassemble
		ok = 0
		while (!ok) {
			let i = 0
			let tmpsolv = []
			let cpabon = 0
			while (i < solution.length) {
				let curentmov = solution[i][0]
				let delta = 0
				while (solution[i] && curentmov == solution[i][0]) {
					switch (solution[i][1]) {
						case "'":
							delta--
							break;
						case "2":
							delta += 2
							break;
						default:
							delta++
							break;
					}
					i++;
				}
				i--
				delta %= 4;
				switch (delta) {
					case -3:
					case 1:
						tmpsolv = tmpsolv.concat([curentmov])
						break;
					case -2:
					case 2:
						tmpsolv = tmpsolv.concat([curentmov+'2'])
						break;

					case -1:
					case 3:
						tmpsolv = tmpsolv.concat([curentmov+"'"])
						break;
				}
				i++;
				// console.log(i)
				// if (cpabon++ > 100) {
				// 	console.log(tmpsolv)
				// 	return []
				// }
			}
			if (tmpsolv.join('') != solution.join('')) {
				solution = tmpsolv
				done = 0
			}
			else
				ok = 1
		}
	}
	return solution
}

function solveit() {
	// algo basique v3 based on v1
	let lstallmod = [];
	let virtualgrid = JSON.parse(JSON.stringify(curentgrid));

	// creat cross
	let tmp = creatcross(virtualgrid);
	console.log(tmp)
	let startingface = tmp[1]
	lstallmod = lstallmod.concat(tmp[0])
	applimidsolve(tmp[0], virtualgrid)
	let oppoface = nameMove[(nameMove.indexOf(startingface) + 3) % 6]

	// creat face
	tmp = creatface(startingface, virtualgrid);
	console.log([tmp])
	lstallmod = lstallmod.concat(tmp)
	applimidsolve(tmp, virtualgrid)

	// creat second
	tmp = creatsecond(oppoface, startingface, virtualgrid);
	console.log([tmp])
	lstallmod = lstallmod.concat(tmp)
	applimidsolve(tmp, virtualgrid)
	

	let lastmove = JSON.parse(JSON.stringify(lstallmod)).reverse()
	if (lastmove[0]) {
		let ok = 0
		let rot = 0
		let i = 0
		let solution = ''
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
			lstallmod += solution
			console.log(solution.split(/(?=[U,L,B,R,F,D])/))
			applimidsolve(solution, virtualgrid)
		}
	}


	// creat oppo cross
	tmp = creatoppocross(oppoface, virtualgrid);
	console.log([tmp])
	lstallmod = lstallmod.concat(tmp)
	applimidsolve(tmp, virtualgrid)

	
	// creat oppo face
	tmp = creatoppoface(startingface, oppoface, virtualgrid);
	console.log([tmp])
	lstallmod = lstallmod.concat(tmp)
	applimidsolve(tmp, virtualgrid)


	// place and twist oppo corner
	tmp = placelastscorner(startingface, oppoface, virtualgrid);
	console.log([tmp])
	lstallmod = lstallmod.concat(tmp)
	applimidsolve(tmp, virtualgrid)

	// document.getElementById('textsolve').value = lstallmod.join('')
	// return lstallmod


	// place oppo edge
	tmp = placelastsedge(startingface, oppoface, virtualgrid);
	console.log([tmp])
	lstallmod = lstallmod.concat(tmp)
	applimidsolve(tmp, virtualgrid)

	// last oppo rotation
	tmp = lasttwist(oppoface, virtualgrid);
	console.log([tmp])
	lstallmod = lstallmod.concat(tmp)
	applimidsolve(tmp, virtualgrid)

	console.log([lstallmod])
	// clean sort
	lstallmod = cleanoutput(lstallmod)
	console.log([lstallmod])

	document.getElementById('textsolve').value = lstallmod.join('')
	return lstallmod
}

