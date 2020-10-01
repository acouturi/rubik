
// let curentgrid = JSON.parse(JSON.stringify(newgrid));

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

function solveit(speed) {
	// algo basique v3 based on v1
	let keepsolution = null;

	for (let i = 0; i < nameMove.length; i++) {
		let startingface = nameMove[i]
		console.log("debut test sur " + nameMove[i])
		let oppoface = nameMove[(nameMove.indexOf(startingface) + 3) % 6]
		let virtualgrid = JSON.parse(JSON.stringify(curentgrid));
		let lstallmod = [];

		// creat cross
		let tmp = creatcross(startingface, virtualgrid);
		// console.log([tmp])
		lstallmod = lstallmod.concat(tmp)
		applimidsolve(tmp, virtualgrid)
		
		// creat face
		tmp = creatface(startingface, virtualgrid);
		// console.log([tmp])
		lstallmod = lstallmod.concat(tmp)
		applimidsolve(tmp, virtualgrid)
		
		// creat second
		tmp = creatsecond(startingface, oppoface, virtualgrid);
		// console.log([tmp])
		lstallmod = lstallmod.concat(tmp)
		applimidsolve(tmp, virtualgrid)
		
		tmp = cleanrotoppo(oppoface, lstallmod);
		// console.log([tmp])
		lstallmod = lstallmod.concat(tmp)
		applimidsolve(tmp, virtualgrid)
		
		// creat oppo cross
		tmp = creatoppocross(oppoface, virtualgrid);
		// console.log([tmp])
		lstallmod = lstallmod.concat(tmp)
		applimidsolve(tmp, virtualgrid)
		
		// creat oppo face
		tmp = creatoppoface(startingface, oppoface, virtualgrid);
		// console.log([tmp])
		lstallmod = lstallmod.concat(tmp)
		applimidsolve(tmp, virtualgrid)
		
		// place and twist oppo corner
		tmp = placelastscorner(startingface, oppoface, virtualgrid);
		// console.log([tmp])
		lstallmod = lstallmod.concat(tmp)
		applimidsolve(tmp, virtualgrid)
		
		// place oppo edge
		tmp = placelastsedge(startingface, oppoface, virtualgrid);
		// console.log([tmp])
		lstallmod = lstallmod.concat(tmp)
		applimidsolve(tmp, virtualgrid)
		
		// last oppo rotation
		tmp = lasttwist(oppoface, virtualgrid);
		// console.log([tmp])
		lstallmod = lstallmod.concat(tmp)
		applimidsolve(tmp, virtualgrid)
		
		// clean sort
		// console.log([lstallmod])
		lstallmod = cleanoutput(lstallmod)
		// console.log([lstallmod])
		console.log(lstallmod.length + " mouvements pour resoudre")
		if (speed == 0)
			i = nameMove.length
		if (keepsolution == null)
			keepsolution = lstallmod;
		else if (keepsolution.length >= lstallmod.length)
			keepsolution = lstallmod
	};

	return keepsolution
}

// console.log(console.log(1))