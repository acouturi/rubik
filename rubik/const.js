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
