const fs = require('fs') 
eval(fs.readFileSync('./rubik/mouvment.js')+'');
eval(fs.readFileSync('./rubik/solvefct.js')+'');
eval(fs.readFileSync('./rubik/tests.js')+'');
const fctlst = [rotJaune, rotJauneB, rotJaune2,
    rotOrange, rotOrangeB, rotOrange2,
    rotVert, rotVertB, rotVert2,
    rotBlanc, rotBlancB, rotBlanc2,
    rotRouge, rotRougeB, rotRouge2,
    rotBleu, rotBleuB, rotBleu2]
const nameMove = 'ULBDRF';
const addMove = ["","'","2"]
const listauto = "ULBDRF'2";
const BADRETURN = "UUUUUUUUUUUUUUUUUUUUU".split("")

const colorwin = {
    'U':"\x1b[33m U\x1b[39m",
    'D':"\x1b[90m D\x1b[39m",
    'L':"\x1b[35m L\x1b[39m",
    'R':"\x1b[31m R\x1b[39m",
    'F':"\x1b[34m F\x1b[39m",
    'B':"\x1b[32m B\x1b[39m",
}

const colornux = {
    'U':"\e[33m U\e[39m",
    'D':"\e[90m D\e[39m",
    'L':"\e[35m L\e[39m",
    'R':"\e[31m R\e[39m",
    'F':"\e[34m F\e[39m",
    'B':"\e[32m B\e[39m",
}

const colorit = process.platform == 'win32' ? colorwin : colornux 

const newgrid = [
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
eval(fs.readFileSync('./rubik/cube.js')+'');

var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

function testenter(listmodif) {

	for (let i = 0; i < listmodif.length; i++) {
		if (listauto.indexOf(listmodif[i]) == -1)
			return 0;
	}
	let lstclean = listmodif.split(/(?=[U,L,B,R,F,D])/)
	for (let i = 0; i < lstclean.length; i++) {
		if (lstclean[i].length > 2)
			return 0;		
	}
	return 1
}

function printflat(grid) {
    console.log()
    for (let i = 3; i > 0; i--) {
        console.log('      '+colorit[grid[i][0][1]]+colorit[grid[i][0][2]]+colorit[grid[i][0][3]])
    }
    for (let i = 1; i < 4; i++) {
        let line = ''
        for (let j = 3; j > 0; j--) {
            line += colorit[grid[j][i][0]]
        }
        for (let j = 1; j < 4; j++) {
            line += colorit[grid[0][i][j]]
            
        }
        for (let j = 1; j < 4; j++) {
            line += colorit[grid[j][i][4]]
            
        }
        for (let j = 3; j > 0; j--) {
            line += colorit[grid[4][i][j]]
        }
        
        console.log(line)
    }
    
    for (let i = 1; i < 4; i++) {
        console.log('      '+colorit[grid[i][4][1]]+colorit[grid[i][4][2]]+colorit[grid[i][4][3]])
    }
    console.log()
}

printflat(curentgrid)

console.log('La notation utilisée est la notation internationale (F R U B L D pour Front / Right / Up / Back / Left / Down)')
console.log('vous pouvez également utilisé les modificateurs \' et 2')
console.log('exemple : R2 D’ B’ D F2 R F2 R2 U L’ F2 U’ B’ L2 R D B’ R’ B2 L2 F2 L2 R2 U2 D2')
console.log('les espaces sont optionnels')
console.log('\nutiliser \'exit\' pour quitter, \'solve\' pour resoudre le cube,\n\'reset\' pour reinitialiser le cube, \'rand\' pour melanger le cube de maniere aleatoire')
console.log('utiliser \'speed\' pour aller plus vite ou \'less\' pour reduire le nombre de mouvements\n\n\n')

let speed = 0

rl.on('line', function(line){
    line = line.replace(/\s/g,'');
    // console.log(line);
    if (line == 'exit') {
        process.exit()
    }
    else if (line == 'solve' || line == 'solv') {
        let solv = solveit(speed)
        console.log('la solution est : '+ solv.join(''))
        console.log('la solution est en '+ solv.length + ' mouvements')
        applimidsolve (solv, curentgrid);
        printflat(curentgrid)
    }
    else if (line == 'speed') {
        speed = 0
    }
    else if (line == 'less') {
        speed = 1
    }
    else if (line == 'rand') {
        curentgrid = JSON.parse(JSON.stringify(newgrid));
        let rand = ''
        let lastmove = ''
        for (let i = 0; i < 30; i++) {
            let move = nameMove[Math.floor(Math.random() * nameMove.length)]
            while (move == lastmove)
                move = nameMove[Math.floor(Math.random() * nameMove.length)]
            rand += move + addMove[Math.floor(Math.random() * addMove.length)]
            lastmove = move;
        }
        console.log(rand)
        let solv = strtocustomlst(rand)
        if (solv == 0)
            return 0
        applimidsolve (solv, curentgrid);
        printflat(curentgrid)
    }
    else if (line == 'reset') {
        curentgrid = JSON.parse(JSON.stringify(newgrid));
        printflat(curentgrid)
    }
    else if (testenter(line)) {

        let solv = strtocustomlst(line)
        if (solv == 0)
            return 0
        applimidsolve (solv, curentgrid);
        printflat(curentgrid)
    }
})

// console.log("\x1b[33m jaune\r\n");
// console.log("\x1b[34m bleu\r\n");
// console.log("\x1b[31m rouge\r\n");
// console.log("\x1b[32m vert\r\n");
// console.log("\x1b[90m gris\r\n");
// console.log("\x1b[35m violet\r\n");
// console.log("\x1b[39m reset\r\n");

