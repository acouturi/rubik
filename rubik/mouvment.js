
function rotJaune(testgrid = curentgrid){
	let changegrid = testgrid;

	let tmp = changegrid[0][1][1];
	changegrid[0][1][1] = changegrid[0][3][1];
	changegrid[0][3][1] = changegrid[0][3][3];
	changegrid[0][3][3] = changegrid[0][1][3];
	changegrid[0][1][3] = tmp;

	tmp = changegrid[0][2][1];
	changegrid[0][2][1] = changegrid[0][3][2];
	changegrid[0][3][2] = changegrid[0][2][3];
	changegrid[0][2][3] = changegrid[0][1][2];
	changegrid[0][1][2] = tmp;

	tmp = changegrid[1][0][1];
	changegrid[1][0][1] = changegrid[1][3][0];
	changegrid[1][3][0] = changegrid[1][4][3];
	changegrid[1][4][3] = changegrid[1][1][4];
	changegrid[1][1][4] = tmp;

	tmp = changegrid[1][0][2];
	changegrid[1][0][2] = changegrid[1][2][0];
	changegrid[1][2][0] = changegrid[1][4][2];
	changegrid[1][4][2] = changegrid[1][2][4];
	changegrid[1][2][4] = tmp;

	tmp = changegrid[1][0][3];
	changegrid[1][0][3] = changegrid[1][1][0];
	changegrid[1][1][0] = changegrid[1][4][1];
	changegrid[1][4][1] = changegrid[1][3][4];
	changegrid[1][3][4] = tmp;

	// if (curentgrid == testgrid) {
	// 	refresh_screen();
	// }
}

function rotJauneB(testgrid = curentgrid){
	let changegrid = testgrid;

	let tmp = changegrid[0][1][1];
	changegrid[0][1][1] = changegrid[0][1][3];
	changegrid[0][1][3] = changegrid[0][3][3];
	changegrid[0][3][3] = changegrid[0][3][1];
	changegrid[0][3][1] = tmp;

	tmp = changegrid[0][2][1];
	changegrid[0][2][1] = changegrid[0][1][2];
	changegrid[0][1][2] = changegrid[0][2][3];
	changegrid[0][2][3] = changegrid[0][3][2];
	changegrid[0][3][2] = tmp;

	tmp = changegrid[1][0][1];
	changegrid[1][0][1] = changegrid[1][1][4];
	changegrid[1][1][4] = changegrid[1][4][3];
	changegrid[1][4][3] = changegrid[1][3][0];
	changegrid[1][3][0] = tmp;

	tmp = changegrid[1][0][2];
	changegrid[1][0][2] = changegrid[1][2][4];
	changegrid[1][2][4] = changegrid[1][4][2];
	changegrid[1][4][2] = changegrid[1][2][0];
	changegrid[1][2][0] = tmp;

	tmp = changegrid[1][0][3];
	changegrid[1][0][3] = changegrid[1][3][4];
	changegrid[1][3][4] = changegrid[1][4][1];
	changegrid[1][4][1] = changegrid[1][1][0];
	changegrid[1][1][0] = tmp;

	// if (curentgrid == testgrid) {
	// 	refresh_screen();
	// }
}

function rotJaune2(testgrid = curentgrid){
	let changegrid = testgrid;

	let tmp = changegrid[0][1][1];
	changegrid[0][1][1] = changegrid[0][3][3];
	changegrid[0][3][3] = tmp;
	tmp = changegrid[0][1][3];
	changegrid[0][1][3] = changegrid[0][3][1];
	changegrid[0][3][1] = tmp;

	tmp = changegrid[0][2][1];
	changegrid[0][2][1] = changegrid[0][2][3];
	changegrid[0][2][3] = tmp;
	tmp = changegrid[0][1][2];
	changegrid[0][1][2] = changegrid[0][3][2];
	changegrid[0][3][2] = tmp;

	tmp = changegrid[1][0][1];
	changegrid[1][0][1] = changegrid[1][4][3];
	changegrid[1][4][3] = tmp;
	tmp = changegrid[1][1][4];
	changegrid[1][1][4] = changegrid[1][3][0];
	changegrid[1][3][0] = tmp;

	tmp = changegrid[1][0][2];
	changegrid[1][0][2] = changegrid[1][4][2];
	changegrid[1][4][2] = tmp;
	tmp = changegrid[1][2][4];
	changegrid[1][2][4] = changegrid[1][2][0];
	changegrid[1][2][0] = tmp;

	tmp = changegrid[1][0][3];
	changegrid[1][0][3] = changegrid[1][4][1];
	changegrid[1][4][1] = tmp;
	tmp = changegrid[1][3][4];
	changegrid[1][3][4] = changegrid[1][1][0];
	changegrid[1][1][0] = tmp;

	// if (curentgrid == testgrid) {
	// 	refresh_screen();
	// }
}

function rotBlanc(testgrid = curentgrid){
	let changegrid = testgrid;

	let tmp = changegrid[4][1][1];
	changegrid[4][1][1] = changegrid[4][1][3];
	changegrid[4][1][3] = changegrid[4][3][3];
	changegrid[4][3][3] = changegrid[4][3][1];
	changegrid[4][3][1] = tmp;

	tmp = changegrid[4][2][1];
	changegrid[4][2][1] = changegrid[4][1][2];
	changegrid[4][1][2] = changegrid[4][2][3];
	changegrid[4][2][3] = changegrid[4][3][2];
	changegrid[4][3][2] = tmp;

	tmp = changegrid[3][0][1];
	changegrid[3][0][1] = changegrid[3][1][4];
	changegrid[3][1][4] = changegrid[3][4][3];
	changegrid[3][4][3] = changegrid[3][3][0];
	changegrid[3][3][0] = tmp;

	tmp = changegrid[3][0][2];
	changegrid[3][0][2] = changegrid[3][2][4];
	changegrid[3][2][4] = changegrid[3][4][2];
	changegrid[3][4][2] = changegrid[3][2][0];
	changegrid[3][2][0] = tmp;

	tmp = changegrid[3][0][3];
	changegrid[3][0][3] = changegrid[3][3][4];
	changegrid[3][3][4] = changegrid[3][4][1];
	changegrid[3][4][1] = changegrid[3][1][0];
	changegrid[3][1][0] = tmp;

	// if (curentgrid == testgrid) {
	// 	refresh_screen();
	// }
}

function rotBlancB(testgrid = curentgrid){
	let changegrid = testgrid;

	let tmp = changegrid[4][1][1];
	changegrid[4][1][1] = changegrid[4][3][1];
	changegrid[4][3][1] = changegrid[4][3][3];
	changegrid[4][3][3] = changegrid[4][1][3];
	changegrid[4][1][3] = tmp;

	tmp = changegrid[4][2][1];
	changegrid[4][2][1] = changegrid[4][3][2];
	changegrid[4][3][2] = changegrid[4][2][3];
	changegrid[4][2][3] = changegrid[4][1][2];
	changegrid[4][1][2] = tmp;

	tmp = changegrid[3][0][1];
	changegrid[3][0][1] = changegrid[3][3][0];
	changegrid[3][3][0] = changegrid[3][4][3];
	changegrid[3][4][3] = changegrid[3][1][4];
	changegrid[3][1][4] = tmp;

	tmp = changegrid[3][0][2];
	changegrid[3][0][2] = changegrid[3][2][0];
	changegrid[3][2][0] = changegrid[3][4][2];
	changegrid[3][4][2] = changegrid[3][2][4];
	changegrid[3][2][4] = tmp;

	tmp = changegrid[3][0][3];
	changegrid[3][0][3] = changegrid[3][1][0];
	changegrid[3][1][0] = changegrid[3][4][1];
	changegrid[3][4][1] = changegrid[3][3][4];
	changegrid[3][3][4] = tmp;

	// if (curentgrid == testgrid) {
	// 	refresh_screen();
	// }
}

function rotBlanc2(testgrid = curentgrid){
	let changegrid = testgrid;

	let tmp = changegrid[4][1][1];
	changegrid[4][1][1] = changegrid[4][3][3];
	changegrid[4][3][3] = tmp;
	tmp = changegrid[4][3][1];
	changegrid[4][3][1] = changegrid[4][1][3];
	changegrid[4][1][3] = tmp;

	tmp = changegrid[4][2][1];
	changegrid[4][2][1] = changegrid[4][2][3];
	changegrid[4][2][3] = tmp;
	tmp = changegrid[4][3][2];
	changegrid[4][3][2] = changegrid[4][1][2];
	changegrid[4][1][2] = tmp;

	tmp = changegrid[3][0][1];
	changegrid[3][0][1] = changegrid[3][4][3];
	changegrid[3][4][3] = tmp;
	tmp = changegrid[3][3][0];
	changegrid[3][3][0] = changegrid[3][1][4];
	changegrid[3][1][4] = tmp;

	tmp = changegrid[3][0][2];
	changegrid[3][0][2] = changegrid[3][4][2];
	changegrid[3][4][2] = tmp;
	tmp = changegrid[3][2][0];
	changegrid[3][2][0] = changegrid[3][2][4];
	changegrid[3][2][4] = tmp;

	tmp = changegrid[3][0][3];
	changegrid[3][0][3] = changegrid[3][4][1];
	changegrid[3][4][1] = tmp;
	tmp = changegrid[3][1][0];
	changegrid[3][1][0] = changegrid[3][3][4];
	changegrid[3][3][4] = tmp;

	// if (curentgrid == testgrid) {
	// 	refresh_screen();
	// }
}

function rotOrange(testgrid = curentgrid){
	let changegrid = testgrid;

	let tmp = changegrid[1][1][0];
	changegrid[1][1][0] = changegrid[3][1][0];
	changegrid[3][1][0] = changegrid[3][3][0];
	changegrid[3][3][0] = changegrid[1][3][0];
	changegrid[1][3][0] = tmp;

	tmp = changegrid[2][1][0];
	changegrid[2][1][0] = changegrid[3][2][0];
	changegrid[3][2][0] = changegrid[2][3][0];
	changegrid[2][3][0] = changegrid[1][2][0];
	changegrid[1][2][0] = tmp;

	tmp = changegrid[0][1][1];
	changegrid[0][1][1] = changegrid[3][0][1];
	changegrid[3][0][1] = changegrid[4][3][1];
	changegrid[4][3][1] = changegrid[1][4][1];
	changegrid[1][4][1] = tmp;

	tmp = changegrid[0][2][1];
	changegrid[0][2][1] = changegrid[2][0][1];
	changegrid[2][0][1] = changegrid[4][2][1];
	changegrid[4][2][1] = changegrid[2][4][1];
	changegrid[2][4][1] = tmp;

	tmp = changegrid[0][3][1];
	changegrid[0][3][1] = changegrid[1][0][1];
	changegrid[1][0][1] = changegrid[4][1][1];
	changegrid[4][1][1] = changegrid[3][4][1];
	changegrid[3][4][1] = tmp;

	// if (curentgrid == testgrid) {
	// 	refresh_screen();
	// }
}

function rotOrangeB(testgrid = curentgrid){
	let changegrid = testgrid;

	let tmp = changegrid[1][1][0];
	changegrid[1][1][0] = changegrid[1][3][0];
	changegrid[1][3][0] = changegrid[3][3][0];
	changegrid[3][3][0] = changegrid[3][1][0];
	changegrid[3][1][0] = tmp;

	tmp = changegrid[2][1][0];
	changegrid[2][1][0] = changegrid[1][2][0];
	changegrid[1][2][0] = changegrid[2][3][0];
	changegrid[2][3][0] = changegrid[3][2][0];
	changegrid[3][2][0] = tmp;

	tmp = changegrid[0][1][1];
	changegrid[0][1][1] = changegrid[1][4][1];
	changegrid[1][4][1] = changegrid[4][3][1];
	changegrid[4][3][1] = changegrid[3][0][1];
	changegrid[3][0][1] = tmp;

	tmp = changegrid[0][2][1];
	changegrid[0][2][1] = changegrid[2][4][1];
	changegrid[2][4][1] = changegrid[4][2][1];
	changegrid[4][2][1] = changegrid[2][0][1];
	changegrid[2][0][1] = tmp;

	tmp = changegrid[0][3][1];
	changegrid[0][3][1] = changegrid[3][4][1];
	changegrid[3][4][1] = changegrid[4][1][1];
	changegrid[4][1][1] = changegrid[1][0][1];
	changegrid[1][0][1] = tmp;

	// if (curentgrid == testgrid) {
	// 	refresh_screen();
	// }
}

function rotOrange2(testgrid = curentgrid){
	let changegrid = testgrid;

	let tmp = changegrid[1][1][0];
	changegrid[1][1][0] = changegrid[3][3][0];
	changegrid[3][3][0] =tmp;
	tmp =  changegrid[1][3][0];
	changegrid[1][3][0] = changegrid[3][1][0];
	changegrid[3][1][0] = tmp;

	tmp = changegrid[2][1][0];
	changegrid[2][1][0] = changegrid[2][3][0];
	changegrid[2][3][0] = tmp;
	tmp = changegrid[1][2][0];
	changegrid[1][2][0] = changegrid[3][2][0];
	changegrid[3][2][0] = tmp;

	tmp = changegrid[0][1][1];
	changegrid[0][1][1] = changegrid[4][3][1];
	changegrid[4][3][1] = tmp;
	tmp = changegrid[1][4][1];
	changegrid[1][4][1] = changegrid[3][0][1];
	changegrid[3][0][1] = tmp;

	tmp = changegrid[0][2][1];
	changegrid[0][2][1] = changegrid[4][2][1];
	changegrid[4][2][1] = tmp;
	tmp = changegrid[2][4][1];
	changegrid[2][4][1] = changegrid[2][0][1];
	changegrid[2][0][1] = tmp;

	tmp = changegrid[0][3][1];
	changegrid[0][3][1] = changegrid[4][1][1];
	changegrid[4][1][1] = tmp;
	tmp = changegrid[3][4][1];
	changegrid[3][4][1] = changegrid[1][0][1];
	changegrid[1][0][1] = tmp;

	// if (curentgrid == testgrid) {
	// 	refresh_screen();
	// }
}

function rotRouge(testgrid = curentgrid){
	let changegrid = testgrid;

	let tmp = changegrid[1][1][4];
	changegrid[1][1][4] = changegrid[1][3][4];
	changegrid[1][3][4] = changegrid[3][3][4];
	changegrid[3][3][4] = changegrid[3][1][4];
	changegrid[3][1][4] = tmp;

	tmp = changegrid[2][1][4];
	changegrid[2][1][4] = changegrid[1][2][4];
	changegrid[1][2][4] = changegrid[2][3][4];
	changegrid[2][3][4] = changegrid[3][2][4];
	changegrid[3][2][4] = tmp;

	tmp = changegrid[0][1][3];
	changegrid[0][1][3] = changegrid[1][4][3];
	changegrid[1][4][3] = changegrid[4][3][3];
	changegrid[4][3][3] = changegrid[3][0][3];
	changegrid[3][0][3] = tmp;

	tmp = changegrid[0][2][3];
	changegrid[0][2][3] = changegrid[2][4][3];
	changegrid[2][4][3] = changegrid[4][2][3];
	changegrid[4][2][3] = changegrid[2][0][3];
	changegrid[2][0][3] = tmp;

	tmp = changegrid[0][3][3];
	changegrid[0][3][3] = changegrid[3][4][3];
	changegrid[3][4][3] = changegrid[4][1][3];
	changegrid[4][1][3] = changegrid[1][0][3];
	changegrid[1][0][3] = tmp;

	// if (curentgrid == testgrid) {
	// 	refresh_screen();
	// }
}

function rotRougeB(testgrid = curentgrid){
	let changegrid = testgrid;

	let tmp = changegrid[1][1][4];
	changegrid[1][1][4] = changegrid[3][1][4];
	changegrid[3][1][4] = changegrid[3][3][4];
	changegrid[3][3][4] = changegrid[1][3][4];
	changegrid[1][3][4] = tmp;

	tmp = changegrid[2][1][4];
	changegrid[2][1][4] = changegrid[3][2][4];
	changegrid[3][2][4] = changegrid[2][3][4];
	changegrid[2][3][4] = changegrid[1][2][4];
	changegrid[1][2][4] = tmp;

	tmp = changegrid[0][1][3];
	changegrid[0][1][3] = changegrid[3][0][3];
	changegrid[3][0][3] = changegrid[4][3][3];
	changegrid[4][3][3] = changegrid[1][4][3];
	changegrid[1][4][3] = tmp;

	tmp = changegrid[0][2][3];
	changegrid[0][2][3] = changegrid[2][0][3];
	changegrid[2][0][3] = changegrid[4][2][3];
	changegrid[4][2][3] = changegrid[2][4][3];
	changegrid[2][4][3] = tmp;

	tmp = changegrid[0][3][3];
	changegrid[0][3][3] = changegrid[1][0][3];
	changegrid[1][0][3] = changegrid[4][1][3];
	changegrid[4][1][3] = changegrid[3][4][3];
	changegrid[3][4][3] = tmp;

	// if (curentgrid == testgrid) {
	// 	refresh_screen();
	// }
}

function rotRouge2(testgrid = curentgrid){
	let changegrid = testgrid;

	let tmp = changegrid[1][1][4];
	changegrid[1][1][4] = changegrid[3][3][4];
	changegrid[3][3][4] =tmp;
	tmp =  changegrid[3][1][4];
	changegrid[3][1][4] = changegrid[1][3][4];
	changegrid[1][3][4] = tmp;

	tmp = changegrid[2][1][4];
	changegrid[2][1][4] = changegrid[2][3][4];
	changegrid[2][3][4] = tmp;
	tmp = changegrid[3][2][4];
	changegrid[3][2][4] = changegrid[1][2][4];
	changegrid[1][2][4] = tmp;

	tmp = changegrid[0][1][3];
	changegrid[0][1][3] = changegrid[4][3][3];
	changegrid[4][3][3] = tmp;
	tmp = changegrid[3][0][3];
	changegrid[3][0][3] = changegrid[1][4][3];
	changegrid[1][4][3] = tmp;

	tmp = changegrid[0][2][3];
	changegrid[0][2][3] = changegrid[4][2][3];
	changegrid[4][2][3] = tmp;
	tmp = changegrid[2][0][3];
	changegrid[2][0][3] = changegrid[2][4][3];
	changegrid[2][4][3] = tmp;

	tmp = changegrid[0][3][3];
	changegrid[0][3][3] = changegrid[4][1][3];
	changegrid[4][1][3] = tmp;
	tmp = changegrid[1][0][3];
	changegrid[1][0][3] = changegrid[3][4][3];
	changegrid[3][4][3] = tmp;

	// if (curentgrid == testgrid) {
	// 	refresh_screen();
	// }
}

function rotVert(testgrid = curentgrid){
	let changegrid = testgrid;

	let tmp = changegrid[1][0][1];
	changegrid[1][0][1] = changegrid[1][0][3];
	changegrid[1][0][3] = changegrid[3][0][3];
	changegrid[3][0][3] = changegrid[3][0][1];
	changegrid[3][0][1] = tmp;

	tmp = changegrid[2][0][1];
	changegrid[2][0][1] = changegrid[1][0][2];
	changegrid[1][0][2] = changegrid[2][0][3];
	changegrid[2][0][3] = changegrid[3][0][2];
	changegrid[3][0][2] = tmp;

	tmp = changegrid[0][1][1];
	changegrid[0][1][1] = changegrid[1][1][4];
	changegrid[1][1][4] = changegrid[4][1][3];
	changegrid[4][1][3] = changegrid[3][1][0];
	changegrid[3][1][0] = tmp;

	tmp = changegrid[0][1][2];
	changegrid[0][1][2] = changegrid[2][1][4];
	changegrid[2][1][4] = changegrid[4][1][2];
	changegrid[4][1][2] = changegrid[2][1][0];
	changegrid[2][1][0] = tmp;

	tmp = changegrid[0][1][3];
	changegrid[0][1][3] = changegrid[3][1][4];
	changegrid[3][1][4] = changegrid[4][1][1];
	changegrid[4][1][1] = changegrid[1][1][0];
	changegrid[1][1][0] = tmp;

	// if (curentgrid == testgrid) {
	// 	refresh_screen();
	// }
}

function rotVertB(testgrid = curentgrid){
	let changegrid = testgrid;

	let tmp = changegrid[1][0][1];
	changegrid[1][0][1] = changegrid[3][0][1];
	changegrid[3][0][1] = changegrid[3][0][3];
	changegrid[3][0][3] = changegrid[1][0][3];
	changegrid[1][0][3] = tmp;

	tmp = changegrid[2][0][1];
	changegrid[2][0][1] = changegrid[3][0][2];
	changegrid[3][0][2] = changegrid[2][0][3];
	changegrid[2][0][3] = changegrid[1][0][2];
	changegrid[1][0][2] = tmp;

	tmp = changegrid[0][1][1];
	changegrid[0][1][1] = changegrid[3][1][0];
	changegrid[3][1][0] = changegrid[4][1][3];
	changegrid[4][1][3] = changegrid[1][1][4];
	changegrid[1][1][4] = tmp;

	tmp = changegrid[0][1][2];
	changegrid[0][1][2] = changegrid[2][1][0];
	changegrid[2][1][0] = changegrid[4][1][2];
	changegrid[4][1][2] = changegrid[2][1][4];
	changegrid[2][1][4] = tmp;

	tmp = changegrid[0][1][3];
	changegrid[0][1][3] = changegrid[1][1][0];
	changegrid[1][1][0] = changegrid[4][1][1];
	changegrid[4][1][1] = changegrid[3][1][4];
	changegrid[3][1][4] = tmp;

	// if (curentgrid == testgrid) {
	// 	refresh_screen();
	// }
}

function rotVert2(testgrid = curentgrid){
	let changegrid = testgrid;

	let tmp = changegrid[1][0][1];
	changegrid[1][0][1] = changegrid[3][0][3];
	changegrid[3][0][3] = tmp;
	tmp = changegrid[3][0][1];
	changegrid[3][0][1] = changegrid[1][0][3];
	changegrid[1][0][3] = tmp;

	tmp = changegrid[2][0][1];
	changegrid[2][0][1] = changegrid[2][0][3];
	changegrid[2][0][3] = tmp;
	tmp = changegrid[3][0][2];
	changegrid[3][0][2] = changegrid[1][0][2];
	changegrid[1][0][2] = tmp;

	tmp = changegrid[0][1][1];
	changegrid[0][1][1] = changegrid[4][1][3];
	changegrid[4][1][3] = tmp;
	tmp = changegrid[3][1][0];
	changegrid[3][1][0] = changegrid[1][1][4];
	changegrid[1][1][4] = tmp;

	tmp = changegrid[0][1][2];
	changegrid[0][1][2] = changegrid[4][1][2];
	changegrid[4][1][2] = tmp;
	tmp = changegrid[2][1][0];
	changegrid[2][1][0] = changegrid[2][1][4];
	changegrid[2][1][4] = tmp;

	tmp = changegrid[0][1][3];
	changegrid[0][1][3] = changegrid[4][1][1];
	changegrid[4][1][1] = tmp;
	tmp = changegrid[1][1][0];
	changegrid[1][1][0] = changegrid[3][1][4];
	changegrid[3][1][4] = tmp;

	// if (curentgrid == testgrid) {
	// 	refresh_screen();
	// }
}

function rotBleu(testgrid = curentgrid){
	let changegrid = testgrid;

	let tmp = changegrid[1][4][1];
	changegrid[1][4][1] = changegrid[3][4][1];
	changegrid[3][4][1] = changegrid[3][4][3];
	changegrid[3][4][3] = changegrid[1][4][3];
	changegrid[1][4][3] = tmp;

	tmp = changegrid[2][4][1];
	changegrid[2][4][1] = changegrid[3][4][2];
	changegrid[3][4][2] = changegrid[2][4][3];
	changegrid[2][4][3] = changegrid[1][4][2];
	changegrid[1][4][2] = tmp;

	tmp = changegrid[0][3][1];
	changegrid[0][3][1] = changegrid[3][3][0];
	changegrid[3][3][0] = changegrid[4][3][3];
	changegrid[4][3][3] = changegrid[1][3][4];
	changegrid[1][3][4] = tmp;

	tmp = changegrid[0][3][2];
	changegrid[0][3][2] = changegrid[2][3][0];
	changegrid[2][3][0] = changegrid[4][3][2];
	changegrid[4][3][2] = changegrid[2][3][4];
	changegrid[2][3][4] = tmp;

	tmp = changegrid[0][3][3];
	changegrid[0][3][3] = changegrid[1][3][0];
	changegrid[1][3][0] = changegrid[4][3][1];
	changegrid[4][3][1] = changegrid[3][3][4];
	changegrid[3][3][4] = tmp;

	// if (curentgrid == testgrid) {
	// 	refresh_screen();
	// }
}

function rotBleuB(testgrid = curentgrid){
	let changegrid = testgrid;

	let tmp = changegrid[1][4][1];
	changegrid[1][4][1] = changegrid[1][4][3];
	changegrid[1][4][3] = changegrid[3][4][3];
	changegrid[3][4][3] = changegrid[3][4][1];
	changegrid[3][4][1] = tmp;

	tmp = changegrid[2][4][1];
	changegrid[2][4][1] = changegrid[1][4][2];
	changegrid[1][4][2] = changegrid[2][4][3];
	changegrid[2][4][3] = changegrid[3][4][2];
	changegrid[3][4][2] = tmp;

	tmp = changegrid[0][3][1];
	changegrid[0][3][1] = changegrid[1][3][4];
	changegrid[1][3][4] = changegrid[4][3][3];
	changegrid[4][3][3] = changegrid[3][3][0];
	changegrid[3][3][0] = tmp;

	tmp = changegrid[0][3][2];
	changegrid[0][3][2] = changegrid[2][3][4];
	changegrid[2][3][4] = changegrid[4][3][2];
	changegrid[4][3][2] = changegrid[2][3][0];
	changegrid[2][3][0] = tmp;

	tmp = changegrid[0][3][3];
	changegrid[0][3][3] = changegrid[3][3][4];
	changegrid[3][3][4] = changegrid[4][3][1];
	changegrid[4][3][1] = changegrid[1][3][0];
	changegrid[1][3][0] = tmp;

	// if (curentgrid == testgrid) {
	// 	refresh_screen();
	// }
}

function rotBleu2(testgrid = curentgrid){
	let changegrid = testgrid;

	let tmp = changegrid[1][4][1];
	changegrid[1][4][1] = changegrid[3][4][3];
	changegrid[3][4][3] = tmp;
	tmp = changegrid[1][4][3];
	changegrid[1][4][3] = changegrid[3][4][1];
	changegrid[3][4][1] = tmp;

	tmp = changegrid[2][4][1];
	changegrid[2][4][1] = changegrid[2][4][3];
	changegrid[2][4][3] = tmp;
	tmp = changegrid[1][4][2];
	changegrid[1][4][2] = changegrid[3][4][2];
	changegrid[3][4][2] = tmp;

	tmp = changegrid[0][3][1];
	changegrid[0][3][1] = changegrid[4][3][3];
	changegrid[4][3][3] = tmp;
	tmp = changegrid[1][3][4];
	changegrid[1][3][4] = changegrid[3][3][0];
	changegrid[3][3][0] = tmp;

	tmp = changegrid[0][3][2];
	changegrid[0][3][2] = changegrid[4][3][2];
	changegrid[4][3][2] = tmp;
	tmp = changegrid[2][3][4];
	changegrid[2][3][4] = changegrid[2][3][0];
	changegrid[2][3][0] = tmp;

	tmp = changegrid[0][3][3];
	changegrid[0][3][3] = changegrid[4][3][1];
	changegrid[4][3][1] = tmp;
	tmp = changegrid[3][3][4];
	changegrid[3][3][4] = changegrid[1][3][0];
	changegrid[1][3][0] = tmp;

	// if (curentgrid == testgrid) {
	// 	refresh_screen();
	// }
}
