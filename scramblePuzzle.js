function scrambleIt(){
	var backgroundPositions = ["0px 0px","-160px 0px","-320px 0px","-480px 0px","0px -160px","-160px -160px","-320px -160px","-480px -160px","0px -320px","-160px -320px","-320px -320px","-480px -320px","0px -480px","-160px -480px","-320px -480px"];
	_puzzle = initPuzzle();
	for(var i=0; i<15; i++){
		var item = document.getElementById(init[i]+'');
		item.className = "hasImage";
		item.style.backgroundPosition = backgroundPositions[i];				
	}	
}