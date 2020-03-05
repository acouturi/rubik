let lststack = [];

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

function loopwithformul(virtualgrid, lstformul, oppoface, startingface, test) {
	if (test([oppoface], virtualgrid,compactcube(virtualgrid)))
		return []

	let lstmov = getpossiblemov(oppoface)
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