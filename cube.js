// UDBD2B2R'B2D'LR'B2F'L2U2L2F'B'F2D2F'D'R2BL'U2L'F2DFB2

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
// const BADRETURN = "UUU".split("")










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




// data = [workingface, iteration]
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



// data = [workingface, iteration]
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

// data = [workingface, iteration]
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


// data = [workingface, nbgoodneed, iteration]
function testplacesecond(data, testgrid, smallcube) {
	// console.log('bip')
	if (!testsecondlayer(data, testgrid, smallcube))
		return false;
	// console.log('biip',data[2]+1)
	if (testsecondlayer([data[0],data[1],data[2]+1], testgrid, smallcube))
		return true;
	// console.log('biiip')
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
							if ((testgrid[x * 2][2][2] == data[1]) &&
								(testgrid[x + 1][0][2] != data[1] && testgrid[x * 2][1][2] != data[1] ||
								testgrid[x + 1][4][2] != data[1] && testgrid[x * 2][3][2] != data[1] ||
								testgrid[x + 1][2][0] != data[1] && testgrid[x * 2][2][1] != data[1] ||
								testgrid[x + 1][2][4] != data[1] && testgrid[x * 2][2][3] != data[1]))
								return true;
						}
						else if (z != 1) {
							if ((testgrid[x * 2][2][2] == data[1]) &&
								(testgrid[x + 1][0][2] != data[1] && testgrid[x * 2][1][2] != data[1] ||
								testgrid[x + 1][4][2] != data[1] && testgrid[x * 2][3][2] != data[1] ||
								testgrid[x + 1][2][0] != data[1] && testgrid[x * 2][2][1] != data[1] ||
								testgrid[x + 1][2][4] != data[1] && testgrid[x * 2][2][3] != data[1]))
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

// data = [workingface, nbgoodneed, iteration]
function testsecondlayer(data, testgrid, smallcube) { 
	if (data[2] == 0)
		return true
	// console.log('da')
	if (!testerangle([data[0],4], testgrid, smallcube))
		return false;
	// console.log('di')
	for (let x = 0; x < 3; x++) {
		for (let y = 0; y < 3; y++) {
			for (let z = 0; z < 3; z++) {
				if ((x + y + z + 1) %2 && (x == 1 || y == 1 || z == 1)) {
					if (smallcube[x][y][z] == data[0]) {
						if (x != 1) {
							// console.log('a',data)
							// console.log(JSON.parse(JSON.stringify(testgrid)))
							if((testgrid[x * 2][2][2] == data[0]) &&
								(((testgrid[2][0][1] == testgrid[2][0][2] &&
								testgrid[2][1][0] == testgrid[2][2][0]) +
								
								(testgrid[2][0][3] == testgrid[2][0][2] &&
								testgrid[2][1][4] == testgrid[2][2][4]) +
								
								(testgrid[2][4][1] == testgrid[2][4][2] &&
								testgrid[2][3][0] == testgrid[2][2][0]) +
								
								(testgrid[2][4][3] == testgrid[2][4][2] &&
								testgrid[2][3][4] == testgrid[2][2][4])) >= data[2]))
								{
									// console.log(((testgrid[2][0][1] == testgrid[2][0][2] &&										testgrid[2][1][0] == testgrid[2][2][0]) +										(testgrid[2][0][3] == testgrid[2][0][2] &&										testgrid[2][1][4] == testgrid[2][2][4]) +										(testgrid[2][4][1] == testgrid[2][4][2] &&										testgrid[2][3][0] == testgrid[2][2][0]) +										(testgrid[2][4][3] == testgrid[2][4][2] &&										testgrid[2][1][4] == testgrid[2][2][4])))
									// console.log(data[2])
									return true;
								}
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
								{
									// console.log(((testgrid[0][2][1] == testgrid[0][2][2] &&										testgrid[1][2][0] == testgrid[2][2][0]) +										(testgrid[0][2][3] == testgrid[0][2][2] &&										testgrid[1][2][4] == testgrid[2][2][4]) +										(testgrid[4][2][1] == testgrid[4][2][2] &&										testgrid[3][2][0] == testgrid[2][2][0]) +										(testgrid[4][2][3] == testgrid[4][2][2] &&										testgrid[1][2][4] == testgrid[2][2][4])))
									// console.log(data[2])
									return true;
								}
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
								{
									// console.log(((testgrid[0][1][2] == testgrid[0][2][2] &&										testgrid[1][0][2] == testgrid[2][0][2]) +										(testgrid[0][3][2] == testgrid[0][2][2] &&										testgrid[1][4][2] == testgrid[2][4][2]) +										(testgrid[4][1][2] == testgrid[4][2][2] &&										testgrid[3][0][2] == testgrid[2][0][2]) +										(testgrid[4][3][2] == testgrid[4][2][2] &&										testgrid[1][4][2] == testgrid[2][4][2])))
									// console.log(data[2])
									return true;
								}
						}
						// console.log('du')
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
		let tmp = looptest([lstface[0]], lsttest, JSON.parse(JSON.stringify(virtualgrid)), keepmov.length)
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

function creatsecond(startingface, virtualgrid) {
	// testsecondlayer,

	let opoface = nameMove[(nameMove.indexOf(startingface) + 3) % 6]
	let cpycube = JSON.parse(JSON.stringify(virtualgrid))
	let solution = []
	for (let i = 0; i < 3; i++) {
		// if (!testplacesecond([startingface,opoface,i],cpycube,compactcube(cpycube))) {
		// 	let solv = looptest([startingface,opoface,i], [testplacesecond], JSON.parse(JSON.stringify(cpycube)), BADRETURN.length, [startingface])
		// 	applimidsolve(solv, cpycube)
		// 	solution = solution.concat(solv)
		// }
		let smallcube = compactcube(cpycube)
		if (!testplacesecond([startingface,opoface,i],cpycube,smallcube)) {
			let smallcube = compactcube(cpycube)
			let solv = ''
			let count = 0;
			while (solv == '') {
				count++
				if (!testplacesecond([startingface,opoface,i],cpycube,smallcube)) {
					for (let x = 0; x < 3; x++) {
							for (let y = 0; y < 3; y++) {
								for (let z = 0; z < 3; z++) {
									if ((x + y + z + 1) %2 && (x == 1 || y == 1 || z == 1)) {
										if (smallcube[x][y][z] == opoface) {
										if (x == 0) {
											if (cpycube[2][3][4] != opoface && cpycube[2][4][3] != opoface)
												solv = "ada'd'a'c'aca'da'd'a'c'ac".replace(/a/g, 'U').replace(/d/g, 'L').replace(/c/g, 'B');
											else if (cpycube[2][4][1] != opoface && cpycube[2][3][0] != opoface)
												solv = "ada'd'a'c'aca'da'd'a'c'ac".replace(/a/g, 'U').replace(/d/g, 'F').replace(/c/g, 'L');
											else if (cpycube[2][1][4] != opoface && cpycube[2][0][3] != opoface)
												solv = "ada'd'a'c'aca'da'd'a'c'ac".replace(/a/g, 'U').replace(/d/g, 'B').replace(/c/g, 'R');
											else if (cpycube[2][4][3] != opoface && cpycube[2][3][4] != opoface)
												solv = "ada'd'a'c'aca'da'd'a'c'ac".replace(/a/g, 'U').replace(/d/g, 'R').replace(/c/g, 'F');
										}
										else if (x == 2) {
											if (cpycube[2][0][3] != opoface && cpycube[2][1][4] != opoface)
												solv = "ada'd'a'c'aca'da'd'a'c'ac".replace(/a/g, 'D').replace(/d/g, 'R').replace(/c/g, 'B');
											else if (cpycube[2][0][1] != opoface && cpycube[2][1][0] != opoface)
												solv = "ada'd'a'c'aca'da'd'a'c'ac".replace(/a/g, 'D').replace(/d/g, 'B').replace(/c/g, 'L');
											else if (cpycube[2][4][3] != opoface && cpycube[2][3][4] != opoface)
												solv = "ada'd'a'c'aca'da'd'a'c'ac".replace(/a/g, 'D').replace(/d/g, 'F').replace(/c/g, 'R');
											else if (cpycube[2][4][1] != opoface && cpycube[2][3][0] != opoface)
												solv = "ada'd'a'c'aca'da'd'a'c'ac".replace(/a/g, 'D').replace(/d/g, 'L').replace(/c/g, 'F');
										}
										else if (y == 0) {
											if (cpycube[0][2][3] != opoface && cpycube[1][2][4] != opoface)
												solv = "ada'd'a'c'aca'da'd'a'c'ac".replace(/a/g, 'B').replace(/d/g, 'R').replace(/c/g, 'U');
											else if (cpycube[0][2][1] != opoface && cpycube[1][2][0] != opoface)
												solv = "ada'd'a'c'aca'da'd'a'c'ac".replace(/a/g, 'B').replace(/d/g, 'U').replace(/c/g, 'L');
											else if (cpycube[4][2][3] != opoface && cpycube[3][2][4] != opoface)
												solv = "ada'd'a'c'aca'da'd'a'c'ac".replace(/a/g, 'B').replace(/d/g, 'D').replace(/c/g, 'R');
											else if (cpycube[4][2][1] != opoface && cpycube[3][2][0] != opoface)
												solv = "ada'd'a'c'aca'da'd'a'c'ac".replace(/a/g, 'B').replace(/d/g, 'L').replace(/c/g, 'D');
										}
										else if (y == 2) {
											if (cpycube[0][2][1] != opoface && cpycube[1][2][0] != opoface)
												solv = "ada'd'a'c'aca'da'd'a'c'ac".replace(/a/g, 'F').replace(/d/g, 'L').replace(/c/g, 'U');
											else if (cpycube[0][2][3] != opoface && cpycube[1][2][4] != opoface)
												solv = "ada'd'a'c'aca'da'd'a'c'ac".replace(/a/g, 'F').replace(/d/g, 'D').replace(/c/g, 'L');
											else if (cpycube[4][2][1] != opoface && cpycube[3][2][0] != opoface)
												solv = "ada'd'a'c'aca'da'd'a'c'ac".replace(/a/g, 'F').replace(/d/g, 'U').replace(/c/g, 'R');
											else if (cpycube[4][2][3] != opoface && cpycube[3][2][4] != opoface)
												solv = "ada'd'a'c'aca'da'd'a'c'ac".replace(/a/g, 'F').replace(/d/g, 'R').replace(/c/g, 'D');
										}
										else if (z == 0) {
											if (cpycube[1][4][2] != opoface && cpycube[0][3][2] != opoface)
												solv = "ada'd'a'c'aca'da'd'a'c'ac".replace(/a/g, 'L').replace(/d/g, 'L').replace(/c/g, 'U');
											else if (cpycube[1][0][2] != opoface && cpycube[0][1][2] != opoface)
												solv = "ada'd'a'c'aca'da'd'a'c'ac".replace(/a/g, 'L').replace(/d/g, 'D').replace(/c/g, 'B');
											else if (cpycube[3][4][2] != opoface && cpycube[4][3][2] != opoface)
												solv = "ada'd'a'c'aca'da'd'a'c'ac".replace(/a/g, 'L').replace(/d/g, 'U').replace(/c/g, 'F');
											else if (cpycube[3][0][2] != opoface && cpycube[4][1][2] != opoface)
												solv = "ada'd'a'c'aca'da'd'a'c'ac".replace(/a/g, 'L').replace(/d/g, 'R').replace(/c/g, 'D');
										}
										else if (z == 2) {
											if (cpycube[4][3][2] != opoface && cpycube[3][4][2] != opoface)
												solv = "ada'd'a'c'aca'da'd'a'c'ac".replace(/a/g, 'R').replace(/d/g, 'F').replace(/c/g, 'U');
											else if (cpycube[4][3][2] != opoface && cpycube[3][4][2] != opoface)
												solv = "ada'd'a'c'aca'da'd'a'c'ac".replace(/a/g, 'R').replace(/d/g, 'U').replace(/c/g, 'B');
											else if (cpycube[4][3][2] != opoface && cpycube[3][4][2] != opoface)
												solv = "ada'd'a'c'aca'da'd'a'c'ac".replace(/a/g, 'R').replace(/d/g, 'D').replace(/c/g, 'F');
											else if (cpycube[4][3][2] != opoface && cpycube[3][4][2] != opoface)
												solv = "ada'd'a'c'aca'da'd'a'c'ac".replace(/a/g, 'R').replace(/d/g, 'B').replace(/c/g, 'D');
										}
									}
								}
							}
						}
					}
				}
				if (solv == '') {
					if (count >= 4) {
						console.log(i, solution, cpycube)
						console.error("infinity loop")
						return []
					}
					solution = solution.concat([opoface])
					applimidsolve([opoface], cpycube)
					smallcube = compactcube(cpycube)
				}
				else
					solv = solv.split(/(?=[U,L,B,R,F,D])/)
			}
			solution = solution.concat(solv)
			applimidsolve(solv, cpycube)
			smallcube = compactcube(cpycube)
		}
		else if (!testsecondlayer([startingface,opoface,i + 1],cpycube,smallcube)) {
			let solv = ''
			let count = 0;
			while (solv == '') {
				count++
				if (!testsecondlayer([startingface,opoface,i + 1],cpycube,smallcube)) {
					for (let x = 0; x < 3; x++) {
							for (let y = 0; y < 3; y++) {
								for (let z = 0; z < 3; z++) {
									if ((x + y + z + 1) %2 && (x == 1 || y == 1 || z == 1)) {
										if (smallcube[x][y][z] == opoface) {
										if (x == 0) {
											if (cpycube[0][1][2] == cpycube[2][2][0] && cpycube[1][0][2] == cpycube[2][0][2])
												solv = "ada'd'a'c'ac".replace(/a/g, 'U').replace(/d/g, 'L').replace(/c/g, 'B');
											else if (cpycube[0][1][2] == cpycube[2][2][4] && cpycube[1][0][2] == cpycube[2][0][2])
												solv = "a'b'abaca'c'".replace(/a/g, 'U').replace(/b/g, 'R').replace(/c/g, 'B');
											else if (cpycube[0][2][1] == cpycube[2][0][2] && cpycube[1][2][0] == cpycube[2][2][0])
												solv = "a'b'abaca'c'".replace(/a/g, 'U').replace(/b/g, 'B').replace(/c/g, 'L');
											else if (cpycube[0][2][1] == cpycube[2][4][2] && cpycube[1][2][0] == cpycube[2][2][0])
												solv = "ada'd'a'c'ac".replace(/a/g, 'U').replace(/d/g, 'F').replace(/c/g, 'L');
											else if (cpycube[0][2][3] == cpycube[2][0][2] && cpycube[1][2][4] == cpycube[2][2][4])
												solv = "ada'd'a'c'ac".replace(/a/g, 'U').replace(/d/g, 'B').replace(/c/g, 'R');
											else if (cpycube[0][2][3] == cpycube[2][4][2] && cpycube[1][2][4] == cpycube[2][2][4])
												solv = "a'b'abaca'c'".replace(/a/g, 'U').replace(/b/g, 'F').replace(/c/g, 'R');
											else if (cpycube[0][3][2] == cpycube[2][2][0] && cpycube[1][4][2] == cpycube[2][4][2])
												solv = "a'b'abaca'c'".replace(/a/g, 'U').replace(/b/g, 'L').replace(/c/g, 'F');
											else if (cpycube[0][3][2] == cpycube[2][2][4] && cpycube[1][4][2] == cpycube[2][4][2])
												solv = "ada'd'a'c'ac".replace(/a/g, 'U').replace(/d/g, 'R').replace(/c/g, 'F');
										}
										else if (x == 2) {
											if (cpycube[4][1][2] == cpycube[2][2][0] && cpycube[3][0][2] == cpycube[2][0][2])
												solv = "a'b'abaca'c'".replace(/a/g, 'D').replace(/b/g, 'L').replace(/c/g, 'B');
											else if (cpycube[4][1][2] == cpycube[2][2][4] && cpycube[3][0][2] == cpycube[2][0][2])
												solv = "ada'd'a'c'ac".replace(/a/g, 'D').replace(/d/g, 'R').replace(/c/g, 'B');
											else if (cpycube[4][2][1] == cpycube[2][0][2] && cpycube[3][2][0] == cpycube[2][2][0])
												solv = "ada'd'a'c'ac".replace(/a/g, 'D').replace(/d/g, 'B').replace(/c/g, 'L');
											else if (cpycube[4][2][1] == cpycube[2][4][2] && cpycube[3][2][0] == cpycube[2][2][0])
												solv = "a'b'abaca'c'".replace(/a/g, 'D').replace(/b/g, 'F').replace(/c/g, 'L');
											else if (cpycube[4][2][3] == cpycube[2][0][2] && cpycube[3][2][4] == cpycube[2][2][4])
												solv = "a'b'abaca'c'".replace(/a/g, 'D').replace(/b/g, 'B').replace(/c/g, 'R');
											else if (cpycube[4][2][3] == cpycube[2][4][2] && cpycube[3][2][4] == cpycube[2][2][4])
												solv = "ada'd'a'c'ac".replace(/a/g, 'D').replace(/d/g, 'F').replace(/c/g, 'R');
											else if (cpycube[4][3][2] == cpycube[2][2][0] && cpycube[3][4][2] == cpycube[2][4][2])
												solv = "ada'd'a'c'ac".replace(/a/g, 'D').replace(/d/g, 'L').replace(/c/g, 'F');
											else if (cpycube[4][3][2] == cpycube[2][2][4] && cpycube[3][4][2] == cpycube[2][4][2])
												solv = "a'b'abaca'c'".replace(/a/g, 'D').replace(/b/g, 'R').replace(/c/g, 'F');
										}
										else if (y == 0) {
											if (cpycube[1][0][2] == cpycube[2][2][0] && cpycube[0][1][2] == cpycube[0][2][2])
												solv = "a'b'abaca'c'".replace(/a/g, 'B').replace(/b/g, 'L').replace(/c/g, 'U');
											else if (cpycube[1][0][2] == cpycube[2][2][4] && cpycube[0][1][2] == cpycube[0][2][2])
												solv = "ada'd'a'c'ac".replace(/a/g, 'B').replace(/d/g, 'R').replace(/c/g, 'U');
											else if (cpycube[2][0][1] == cpycube[0][2][2] && cpycube[2][1][0] == cpycube[2][2][0])
												solv = "ada'd'a'c'ac".replace(/a/g, 'B').replace(/d/g, 'U').replace(/c/g, 'L');
											else if (cpycube[2][0][1] == cpycube[4][2][2] && cpycube[2][1][0] == cpycube[2][2][0])
												solv = "a'b'abaca'c'".replace(/a/g, 'B').replace(/b/g, 'D').replace(/c/g, 'L');
											else if (cpycube[2][0][3] == cpycube[0][2][2] && cpycube[2][1][4] == cpycube[2][2][4])
												solv = "a'b'abaca'c'".replace(/a/g, 'B').replace(/b/g, 'U').replace(/c/g, 'R');
											else if (cpycube[2][0][3] == cpycube[4][2][2] && cpycube[2][1][4] == cpycube[2][2][4])
												solv = "ada'd'a'c'ac".replace(/a/g, 'B').replace(/d/g, 'D').replace(/c/g, 'R');
											else if (cpycube[3][0][2] == cpycube[2][2][0] && cpycube[4][1][2] == cpycube[4][2][2])
												solv = "ada'd'a'c'ac".replace(/a/g, 'B').replace(/d/g, 'L').replace(/c/g, 'D');
											else if (cpycube[3][0][2] == cpycube[2][2][4] && cpycube[4][1][2] == cpycube[4][2][2])
												solv = "a'b'abaca'c'".replace(/a/g, 'B').replace(/b/g, 'R').replace(/c/g, 'D');
										}
										else if (y == 2) {
											if (cpycube[1][4][2] == cpycube[2][2][0] && cpycube[0][3][2] == cpycube[0][2][2])
												solv = "ada'd'a'c'ac".replace(/a/g, 'F').replace(/d/g, 'L').replace(/c/g, 'U');
											else if (cpycube[1][4][2] == cpycube[2][2][4] && cpycube[0][3][2] == cpycube[0][2][2])
												solv = "a'b'abaca'c'".replace(/a/g, 'F').replace(/b/g, 'R').replace(/c/g, 'U');
											else if (cpycube[2][4][1] == cpycube[0][2][2] && cpycube[2][3][0] == cpycube[2][2][0])
												solv = "a'b'abaca'c'".replace(/a/g, 'F').replace(/b/g, 'U').replace(/c/g, 'L');
											else if (cpycube[2][4][1] == cpycube[4][2][2] && cpycube[2][3][0] == cpycube[2][2][0])
												solv = "ada'd'a'c'ac".replace(/a/g, 'F').replace(/d/g, 'D').replace(/c/g, 'L');
											else if (cpycube[2][4][3] == cpycube[0][2][2] && cpycube[2][3][4] == cpycube[2][2][4])
												solv = "ada'd'a'c'ac".replace(/a/g, 'F').replace(/d/g, 'U').replace(/c/g, 'R');
											else if (cpycube[2][4][3] == cpycube[4][2][2] && cpycube[2][3][4] == cpycube[2][2][4])
												solv = "a'b'abaca'c'".replace(/a/g, 'F').replace(/b/g, 'D').replace(/c/g, 'R');
											else if (cpycube[3][4][2] == cpycube[2][2][0] && cpycube[4][3][2] == cpycube[4][2][2])
												solv = "a'b'abaca'c'".replace(/a/g, 'F').replace(/b/g, 'L').replace(/c/g, 'D');
											else if (cpycube[3][4][2] == cpycube[2][2][4] && cpycube[4][3][2] == cpycube[4][2][2])
												solv = "ada'd'a'c'ac".replace(/a/g, 'F').replace(/d/g, 'R').replace(/c/g, 'D');
										}
										else if (z == 0) {
											if (cpycube[1][2][0] == cpycube[2][0][2] && cpycube[0][2][1] == cpycube[0][2][2])
												solv = "a'b'abaca'c'".replace(/a/g, 'L').replace(/b/g, 'R').replace(/c/g, 'U');
											else if (cpycube[1][2][0] == cpycube[2][4][2] && cpycube[0][2][1] == cpycube[0][2][2])
												solv = "ada'd'a'c'ac".replace(/a/g, 'L').replace(/d/g, 'L').replace(/c/g, 'U');
											else if (cpycube[2][1][0] == cpycube[0][2][2] && cpycube[2][0][1] == cpycube[2][0][2])
												solv = "a'b'abaca'c'".replace(/a/g, 'L').replace(/b/g, 'U').replace(/c/g, 'B');
											else if (cpycube[2][1][0] == cpycube[4][2][2] && cpycube[2][0][1] == cpycube[2][0][2])
												solv = "ada'd'a'c'ac".replace(/a/g, 'L').replace(/d/g, 'D').replace(/c/g, 'B');
											else if (cpycube[2][3][0] == cpycube[0][2][2] && cpycube[2][4][1] == cpycube[2][4][2])
												solv = "ada'd'a'c'ac".replace(/a/g, 'L').replace(/d/g, 'U').replace(/c/g, 'F');
											else if (cpycube[2][3][0] == cpycube[4][2][2] && cpycube[2][4][1] == cpycube[2][4][2])
												solv = "a'b'abaca'c'".replace(/a/g, 'L').replace(/b/g, 'D').replace(/c/g, 'F');
											else if (cpycube[3][2][0] == cpycube[2][0][2] && cpycube[4][2][1] == cpycube[4][2][2])
												solv = "ada'd'a'c'ac".replace(/a/g, 'L').replace(/d/g, 'R').replace(/c/g, 'D');
											else if (cpycube[3][2][0] == cpycube[2][4][2] && cpycube[4][2][1] == cpycube[4][2][2])
												solv = "a'b'abaca'c'".replace(/a/g, 'L').replace(/b/g, 'L').replace(/c/g, 'D');
										}
										else if (z == 2) {
											if (cpycube[1][2][4] == cpycube[2][0][2] && cpycube[0][2][3] == cpycube[0][2][2])
												solv = "a'b'abaca'c'".replace(/a/g, 'R').replace(/b/g, 'B').replace(/c/g, 'U');
											else if (cpycube[1][2][4] == cpycube[2][4][2] && cpycube[0][2][3] == cpycube[0][2][2])
												solv = "ada'd'a'c'ac".replace(/a/g, 'R').replace(/d/g, 'F').replace(/c/g, 'U');
											else if (cpycube[2][1][4] == cpycube[0][2][2] && cpycube[2][0][3] == cpycube[2][0][2])
												solv = "ada'd'a'c'ac".replace(/a/g, 'R').replace(/d/g, 'U').replace(/c/g, 'B');
											else if (cpycube[2][1][4] == cpycube[4][2][2] && cpycube[2][0][3] == cpycube[2][0][2])
												solv = "a'b'abaca'c'".replace(/a/g, 'R').replace(/b/g, 'D').replace(/c/g, 'B');
											else if (cpycube[2][3][4] == cpycube[0][2][2] && cpycube[2][4][3] == cpycube[2][4][2])
												solv = "a'b'abaca'c'".replace(/a/g, 'R').replace(/b/g, 'U').replace(/c/g, 'F');
											else if (cpycube[2][3][4] == cpycube[4][2][2] && cpycube[2][4][3] == cpycube[2][4][2])
												solv = "ada'd'a'c'ac".replace(/a/g, 'R').replace(/d/g, 'D').replace(/c/g, 'F');
											else if (cpycube[3][2][4] == cpycube[2][0][2] && cpycube[4][2][3] == cpycube[4][2][2])
												solv = "ada'd'a'c'ac".replace(/a/g, 'R').replace(/d/g, 'B').replace(/c/g, 'D');
											else if (cpycube[3][2][4] == cpycube[2][4][2] && cpycube[4][2][3] == cpycube[4][2][2])
												solv = "a'b'abaca'c'".replace(/a/g, 'R').replace(/b/g, 'F').replace(/c/g, 'D');
										}
									}
								}
							}
						}
					}
				}
				if (solv == '') {
					if (count >= 4) {
						console.log(i, solution, cpycube)
						console.error("infinity loop")
						return []
					}
					solution = solution.concat([opoface])
					applimidsolve([opoface], cpycube)
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
	// console.log('=============================================================')
	// console.log(JSON.parse(JSON.stringify(cpycube)))
	// console.log(testsecondlayer([startingface,opoface,1],cpycube,compactcube(cpycube)))
	return solution
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
		tmp = creatsecond(startingface, virtualgrid);
		console.log([tmp])
		lstallmod += tmp.join('')
		applimidsolve(tmp, virtualgrid)
	}
	

    

	document.getElementById('textsolve').value = lstallmod;
	return lstallmod.split(/(?=[U,L,B,R,F,D])/)
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


