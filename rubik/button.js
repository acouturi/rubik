
function lstappli(listmodif) {

	let solv = strtocustomlst(listmodif)
	if (solv == 0)
		return 0
	applimidsolve (solv, curentgrid);
}

function applimodif() {
	let listmodif = document.getElementById('applilist').value;
	lstappli(listmodif);
	refresh_screen();
}

function applisolve() {
	let listmodif = document.getElementById('textsolve').value;
	lstappli(listmodif);
	refresh_screen();
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

function launchsolv() {
	let solution = solveit(document.getElementById('speedy').value)
	document.getElementById('textsolve').value = solution.join('')
	document.getElementById('nbmouv').innerText = solution.length + " mouvements pour resoudre"
}