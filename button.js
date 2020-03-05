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

function lstappli(listmodif) {

	for (let i = 0; i < listmodif.length; i++) {
		if (listauto.indexOf(listmodif[i]) == -1)
			return 0;
	}
	let lstclean = listmodif.split(/(?=[U,L,B,R,F,D])/)
	for (let i = 0; i < lstclean.length; i++) {
		if (lstclean[i].length > 3)
			return 0;		
	}
	applimidsolve (lstclean, curentgrid);
}

function applimodif() {
	let listmodif = document.getElementById('applilist').value;
	lstappli(listmodif);
}

function applisolve() {
	let listmodif = document.getElementById('textsolve').value;
	lstappli(listmodif);
}

function testall() {
	restart();
	generatRand();
	applimodif();
	solveit();
	applisolve();
}

function generatRand() {
	let rand = ''
	let lastmove = ''
	for (let i = 0; i < 30; i++) {
		let move = nameMove[Math.floor(Math.random() * nameMove.length)]
		while (move == lastmove)
			move = nameMove[Math.floor(Math.random() * nameMove.length)]
		rand += move + addMove[Math.floor(Math.random() * addMove.length)]
		lastmove = move;
	}
	document.getElementById('applilist').value = rand
}
