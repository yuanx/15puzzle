/* 
count the inversion of the input data, get the position of the blank
If the blank is on an even row counting from the bottom (second-last, fourth-last etc), then the number of inversions in a solvable situation is odd.
IF the blank is on an odd row counting from the bottom (last, third-last, fifth-last etc) then the number of inversions in a solvable situation is even.
*/
function scramble(data) {
	for(var i=0; i<16; i++){
		if(data.indexOf(i)<0)
			break;
	}
	var blankI = Math.floor(i/4);
	var blankJ = i%4;
	
	//update the global veriable
	_blankX = blankI;
	_blankY = blankJ;
	
	// get another format of data
	var adata = new Array(16);
	adata[i] = 99; //get the blank and mark it with a large number
	for(var j=0; j<data.length; j++){
		adata[data[j]] = j;
	}
	// count the inversions
	var inversion = 0;
	for(var p=0; p<adata.length-1; p++){
	    if(adata[p] == 99) continue;
		for(var q=p+1; q<adata.length; q++){
			if(adata[p] > adata[q])
				inversion++;
		}
	}
	var rowTolast = 4-blankI;
	//console.log(adata);
	//console.log(inversion, rowTolast);
	if((rowTolast%2==0 && inversion%2 == 1) || (rowTolast%2==1 && inversion%2 == 0))
		return true;
	else
		return false;		
}

// shuffle the array
function shuffle(arr){
	for(var i=arr.length-1; i>0; i--){
		var j = Math.floor(Math.random() * (i+1));
		var tmp = arr[i];
		arr[i] = arr[j];
		arr[j] = tmp;
	}
	return arr;
}

//get a valid start state of the puzzle
function initPuzzle(){
	var _isvalid = false;
	while(!_isvalid){
		var initarr = shuffle([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);
		initarr = initarr.slice(0, 15);
		if(scramble(initarr))
			_isvalid = true;
	}
	console.log(_blankX, _blankY);
	return initarr;
}

function scrambleIt(){
	var backgroundPositions = ["0px 0px","-160px 0px","-320px 0px","-480px 0px","0px -160px","-160px -160px","-320px -160px","-480px -160px","0px -320px","-160px -320px","-320px -320px","-480px -320px","0px -480px","-160px -480px","-320px -480px"];
	_puzzle = initPuzzle();
	
	// for test purpose
	//_puzzle = [5,3,0,10,14,11,7,2,6,4,15,1,9,12,13];
	//_blankX = 2;
	//_blankY = 0;
	
	document.getElementById(_blankX*4+_blankY+'').className = "";
	document.getElementById(_blankX*4+_blankY+'').style.removeProperty('background-position')
	for(var i=0; i<15; i++){
		var item = document.getElementById(_puzzle[i]+'');
		item.className = "hasImage";
		item.style.backgroundPosition = backgroundPositions[i];				
	}
	var buttonPlay = document.getElementById("playIt");
	var buttonSolve = document.getElementById("solveIt");
	buttonSolve.style.display = 'inline';
	buttonPlay.style.display = 'none';
	buttonPlay.disabled = false;
	document.getElementById('info').innerHTML = '';
		
}
