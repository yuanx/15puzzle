function solve(){
	var infoelem = document.getElementById('info');
	var buttonPlay = document.getElementById("playIt");
	var buttonSolve = document.getElementById("solveIt");
	infoelem.className = "running";
	infoelem.innerHTML = "Calculating...";
	document.body.style.opacity = 0.5;
	
	var as = aStar();
	var arr = _puzzle;
	var x = _blankX;
	var y = _blankY;
	
	// solve it with A* algorithm
	_result = as(arr);
	
	infoelem.className = "done";
	infoelem.innerHTML = "It is solved! You can play it now.";
	document.body.style.opacity = 1;
	buttonSolve.style.display = 'none';
	buttonPlay.style.display = 'inline';
	
	return _result.split('').length;
}

function play(){
	// disable the play button
	document.getElementById("playIt").disabled = 'true';
	var localarr = _result.split(' ');
	var len = localarr.length;
	var i = 0;
	var timeout = setInterval(function (){
		if(i<len-1){
			var id1 = localarr[i];
			var id2 = localarr[i+1];
			var elem1 = document.getElementById(id1);
			var elem2 = document.getElementById(id2);

			elem1.className = "hasImage";
			elem1.style.backgroundPosition = elem2.style.backgroundPosition;

			elem2.className = "";
			elem2.style.removeProperty('background-position');
			
			i++;
		}
		else{
			document.getElementById(localarr[i]).className = "";
			document.getElementById(localarr[i]).style.removeProperty('background-position');									
			clearInterval(timeout);
			return;
		}
	},300);
	
	//Update the global veriable
	_blankX = 3;
	_blankY = 3;
	_puzzle = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14];
}