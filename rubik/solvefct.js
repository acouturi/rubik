
function strtocustomlst(lst) {
	for (let i = 0; i < lst.length; i++) {
		if (listauto.indexOf(lst[i]) == -1)
			return 0;
	}
	let lstclean = lst.split(/(?=[U,L,B,R,F,D])/)
	for (let i = 0; i < lstclean.length; i++) {
		if (lstclean[i].length > 2)
			return 0;		
	}
	return lstclean
}

function applimidsolve (solution,gridparam) {
	for (let i = 0; i < solution.length; i++) {
		switch (solution[i]) {
			case 'D':
				rotBlanc(gridparam);
				break;
			case 'L':
				rotOrange(gridparam);
				break;
			case 'B':
				rotVert(gridparam);
				break;
			case 'R':
				rotRouge(gridparam);
				break;
			case 'F':
				rotBleu(gridparam);
				break;
			case 'U':
				rotJaune(gridparam);
				break;
			case "D'":
				rotBlancB(gridparam);
				break;
			case "L'":
				rotOrangeB(gridparam);
				break;
			case "B'":
				rotVertB(gridparam);
				break;
			case "R'":
				rotRougeB(gridparam);
				break;
			case "F'":
				rotBleuB(gridparam);
				break;
			case "U'":
				rotJauneB(gridparam);
				break;
			case 'D2':
				rotBlanc2(gridparam);
				break;
			case 'L2':
				rotOrange2(gridparam);
				break;
			case 'B2':
				rotVert2(gridparam);
				break;
			case 'R2':
				rotRouge2(gridparam);
				break;
			case 'F2':
				rotBleu2(gridparam);
				break;
			case 'U2':
				rotJaune2(gridparam);
				break;
			case '':
				break;
			default:
				console.error(solution)
				console.error(solution[i])
				console.error(i)
				console.error("unknow caractere")
				break;
		}
	}	
}

function creatcross(startingface, virtualgrid) {
	let keepmov = BADRETURN;
	let keepface = startingface
	let lsttest = [
		testercross,
		testercross,
		testercross,
		testercross
	]
	let tmp = looptest(keepface, lsttest, JSON.parse(JSON.stringify(virtualgrid)), keepmov.length)
	return tmp;
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

function creatsecond(startingface, oppoface, virtualgrid) {
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

function getpossiblemov(oppoface){
		 if (oppoface == 'U') return (['F', 'R', 'B', 'L', 'F', 'R', 'B',]);
	else if (oppoface == 'D') return (['F', 'L', 'B', 'R', 'F', 'L', 'B',]);
	else if (oppoface == 'F') return (['U', 'L', 'D', 'R', 'U', 'L', 'D',]);
	else if (oppoface == 'B') return (['U', 'R', 'D', 'L', 'U', 'R', 'D',]);
	else if (oppoface == 'R') return (['F', 'D', 'B', 'U', 'F', 'D', 'B',]);
	else if (oppoface == 'L') return (['F', 'U', 'B', 'D', 'F', 'U', 'B',]);
	console.error('ca marche pas !!!!!')
	return []
}

function solvemptyoppocross(oppoface, virtualgrid) {
	let priority = [4,1,2,0]
	let lstmov = getpossiblemov(oppoface)
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
		solution += solvemptyoppocross(oppoface, cpycube)
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

function cleanrotoppo( oppoface, lstallmod) {
	let lastmove = JSON.parse(JSON.stringify(lstallmod)).reverse()
	let solution = []
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
			solution = solution.concat([oppoface]);
		}
	}
	return solution
}