refresh_screen();

function restart() {
	resetView();
	curentgrid = JSON.parse(JSON.stringify(newgrid));
	refresh_screen();
}

function refresh_screen() {
	let tableext = document.getElementById('flatcube');
	while (tableext.firstChild) {
		tableext.removeChild(tableext.firstChild);
	}
	let lstLetter = ['U','L','B','R','F','D'];
	for (let i = 0; i < lstLetter.length; i++) {
		const thislettre = lstLetter[i];
		for (let j = 0; j < 9; j++) {
			let thiscarre = document.getElementById(thislettre + '' + (1 + j));
			if (thislettre == 'U') {
				thiscarre.className = curentgrid[0][1 + Math.trunc(j / 3)][1 + j % 3];
			}
			else if (thislettre == 'L') {
				thiscarre.className = curentgrid[3 - (j % 3)][1 + Math.trunc(j / 3)][0];
			}
			else if (thislettre == 'B') {
				thiscarre.className = curentgrid[3 - Math.trunc(j / 3)][0][1 + j % 3];
			}
			else if (thislettre == 'R') {
				thiscarre.className = curentgrid[1 + j % 3][1 + Math.trunc(j / 3)][4];
			}
			else if (thislettre == 'F') {
				thiscarre.className = curentgrid[1 + Math.trunc(j / 3)][4][1 + j % 3];
			}
			else if (thislettre == 'D') {
				thiscarre.className = curentgrid[4][1 + (Math.trunc(j / 3))][3 - (j % 3)];
			}
		}
	}
	for (let i = 0; i < 4; i++) {
		let newtr = document.createElement('tr');
		tableext.appendChild(newtr);
		for (let j = 0; j < 3; j++) {
			let newtd = document.createElement('td');
			newtr.appendChild(newtd);
			if (i == 1 || j == 1) {
				let newtable = document.createElement('table');
				newtd.appendChild(newtable);
				for (let k = 0; k < 3; k++) {
					let newtr2 = document.createElement('tr');
					newtable.appendChild(newtr2);
					for (let l = 0; l < 3; l++) {
						let newtd2 = document.createElement('td');
						newtr2.appendChild(newtd2);
						let newdiv = document.createElement('div');
						newtd2.appendChild(newdiv);
						newdiv.classList.add('case')
						newtd2.classList.add('interne')
						let setcolor = '';
						if (i == 0) {
							setcolor = curentgrid[3 - k][0][1 + l];
						}
						else if (j == 0) {
							setcolor = curentgrid[3 - l][1 + k][0];
						}
						else if (j == 2) {
							setcolor = curentgrid[1 + l][1 + k][4];
						}
						else if (i == 1) {
							setcolor = curentgrid[0][1 + k][1 + l];
						}
						else if (i == 2) {
							setcolor = curentgrid[1 + k][4][1 + l];
						}
						else if (i == 3) {
							setcolor = curentgrid[4][3 - k][1 + l];
						}
						else {
							setcolor = curentgrid[0][1 + k][1 + l];
						}
						newdiv.classList.add(setcolor)
					}
				}
			}
		}
	}
}

let homeCube = document.getElementById('stage').getElementsByClassName('spinner')[0];

function resetView() {
	homeCube.style.transform = "rotateX(70deg) rotateZ(25deg)"
}

// style="transform: rotateX(-5deg) rotateX(-5deg) rotateX(-5deg)  rotateY(5deg) rotateY(5deg) rotateY(5deg) rotateY(5deg) rotateY(5deg);"
homeCube.style.transform = "rotateX(70deg) rotateZ(25deg)"

/*	1		2		3
a	1		0		0
X = 0		cos		-sin
c	0		sin		cos

a	cos		0		sin
Y = 0		1		0
c	-sin	0		cos

a	cos		-sin	0
Z =	sin		cos		0
c	0		0		1
*/
// Q->D
// E->A
// D->
// A->
// W->
// X-?


let angleX = 1;
let angleY = 0;
let angleZ = 0;
let degXrot = 5;
let degYrot = 5;
let degZrot = 5;
let angle = 5


function rot3DW(){
	// let tmpx = angleX;
	// let tmpy = angleY * Math.cos(angle) - angleZ * Math.sin(angle);
	// let tmpz = angleY * Math.sin(angle) + angleZ * Math.cos(angle);
	// angleX = tmpx;
	// angleY = tmpy;
	// angleZ = tmpz;
	// homeCube.style.transform = 'rotateX('+angleX+'deg)';
	// homeCube.style.transform += 'rotateY('+angleY+'deg)';
	// homeCube.style.transform += 'rotateZ('+angleZ+'deg)';
	// console.log(angleX)
	// console.log(angleY)
	// console.log(angleZ)
	homeCube.style.transform += 'rotateX('+degXrot+'deg)';
}

function rot3DX(){
	// let tmpx = angleX;
	// let tmpy = angleY * Math.cos(-angle) - angleZ * Math.sin(-angle);
	// let tmpz = angleY * Math.sin(-angle) + angleZ * Math.cos(-angle);
	// angleX = tmpx;
	// angleY = tmpy;
	// angleZ = tmpz;
	// homeCube.style.transform = 'rotateX('+angleX+'deg)';
	// homeCube.style.transform += 'rotateY('+angleY+'deg)';
	// homeCube.style.transform += 'rotateZ('+angleZ+'deg)';
	// console.log(angleX)
	// console.log(angleY)
	// console.log(angleZ)
	homeCube.style.transform += 'rotateX('+-degXrot+'deg)';
}

function rot3DE(){
	// let tmpx = angleX * Math.cos(angle) + angleZ * Math.sin(angle);
	// let tmpy = angleY;
	// let tmpz = angleX * Math.sin(angle) + angleZ * Math.cos(angle);
	// angleX = tmpx;
	// angleY = tmpy;
	// angleZ = tmpz;
	// homeCube.style.transform = 'rotateX('+angleX+'deg)';
	// homeCube.style.transform += 'rotateY('+angleY+'deg)';
	// homeCube.style.transform += 'rotateZ('+angleZ+'deg)';
	// console.log(angleX)
	// console.log(angleY)
	// console.log(angleZ)
	homeCube.style.transform += 'rotateY('+degYrot+'deg)';
}

function rot3DQ(){
	// let tmpx = angleX * Math.cos(-angle) + angleZ * Math.sin(-angle);
	// let tmpy = angleY;
	// let tmpz = - angleX * Math.sin(-angle) + angleZ * Math.cos(-angle);
	// angleX = tmpx;
	// angleY = tmpy;
	// angleZ = tmpz;
	// homeCube.style.transform = 'rotateX('+angleX+'deg)';
	// homeCube.style.transform += 'rotateY('+angleY+'deg)';
	// homeCube.style.transform += 'rotateZ('+angleZ+'deg)';
	// console.log(angleX)
	// console.log(angleY)
	// console.log(angleZ)
	homeCube.style.transform += 'rotateY('+-degYrot+'deg)';
}

function rot3DD(){
	// let tmpx = angleX * Math.cos(angle) - angleY * Math.sin(angle);
	// let tmpy = angleX * Math.sin(angle) + angleY * Math.cos(angle);
	// let tmpz = angleZ;
	// angleX = tmpx;
	// angleY = tmpy;
	// angleZ = tmpz;
	// homeCube.style.transform = 'rotateX('+angleX+'deg)';
	// homeCube.style.transform += 'rotateY('+angleY+'deg)';
	// homeCube.style.transform += 'rotateZ('+angleZ+'deg)';
	// console.log(angleX)
	// console.log(angleY)
	// console.log(angleZ)
	homeCube.style.transform += 'rotateZ('+-degZrot+'deg)';
}

function rot3DA(){
	// let tmpx = angleX * Math.cos(-angle) - angleY * Math.sin(-angle);
	// let tmpy = angleX * Math.sin(-angle) + angleY * Math.cos(-angle);
	// let tmpz = angleZ;
	// angleX = tmpx;
	// angleY = tmpy;
	// angleZ = tmpz;
	// homeCube.style.transform = 'rotateX('+angleX+'deg)';
	// homeCube.style.transform += 'rotateY('+angleY+'deg)';
	// homeCube.style.transform += 'rotateZ('+angleZ+'deg)';
	// console.log(angleX)
	// console.log(angleY)
	// console.log(angleZ)
	homeCube.style.transform += 'rotateZ('+degZrot+'deg)';
}
