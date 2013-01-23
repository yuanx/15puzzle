// Define bunch of global varibale
var _puzzle; // the puzzle array
var _blankX; // coordinate x of the blank tile
var _blankY; // coordinate y of the blank tile
var _result; // running results

// find the absolute position of a element.
function findPos(obj){
	 var curleft = 0;
	 var curtop = 0;
	 if (obj.offsetParent){
		  while (obj.offsetParent){
			   curleft += obj.offsetLeft-obj.scrollLeft;
			   curtop += obj.offsetTop-obj.scrollTop;
			   var position='';
			   if (obj.style && obj.style.position)
			      position=obj.style.position.toLowerCase();
			   if (!position)
			       if (obj.currentStyle && obj.currentStyle.position)
			           position = obj.currentStyle.position.toLowerCase();
			   if ((position=='absolute')||(position=='relative')) break;
			   while (obj.parentNode!=obj.offsetParent) {
				    obj=obj.parentNode;
				    curleft -= obj.scrollLeft;
				    curtop -= obj.scrollTop;
			   }
			   obj = obj.offsetParent;
		  }
	 }
	 else {
	     if (obj.x)
	      	curleft += obj.x;
	  	 if (obj.y)
	      	curtop += obj.y;
	 }
	 return {left:curleft,top:curtop};
}

// to see if we reach the goal state
function is_win(arr){
	for(var inx = 0; inx< arr.length; inx++){
		if(arr[inx] !== inx)
			return false;
	}
	
	return true;
}


var cols = document.getElementsByTagName('td');

// Attach drag and click event to the tile 
for(var i=0; i<cols.length; i++){
	cols[i].is_click = true;	
	//Attach drag event to the tile
	cols[i].addEventListener('mousedown', function(e){
		var id = parseInt(this.id);
		var itemX = Math.floor(id/4);
		var itemY = id%4;
		if((itemY===_blankY && Math.abs(itemX-_blankX)===1) || (itemX===_blankX && Math.abs(itemY-_blankY)===1)){
			//set the position of moving div
			var movingDiv = document.getElementById('Moving_Div');
			movingDiv.style.top = this.offsetTop + 30 + 'px'; //reduce the pop
			movingDiv.style.left = this.offsetLeft + 'px';
			movingDiv.style.backgroundPosition = this.style.backgroundPosition;
			movingDiv.style.display = 'block';
			
			this.className = "";
			this.style.removeProperty('background-position');
			
			var deltaX = e.clientX - this.offsetLeft;
			var deltaY = e.clientY - this.offsetTop -30; //reduce the pop
			var self = this;
			
			function moveHandler(event){
				self.is_click = false;
				movingDiv.style.left = (event.clientX - deltaX) + 'px';
				movingDiv.style.top = (event.clientY - deltaY) + 'px';
				
				event.stopPropagation();
			}
			
			function upHandler(event){
				var fillelem = document.getElementById(_blankX*4+_blankY+'');
				var abspos = findPos(fillelem)
				var rangeXstart = abspos.left;
				var rangeYstart = abspos.top;
				
				if(self.is_click){ // it is a click event
					fillelem.className = "hasImage";
					fillelem.style.backgroundPosition = movingDiv.style.backgroundPosition;

					//update the global
					_puzzle[_puzzle.indexOf(id)] = _blankX*4+_blankY;
					_blankX = itemX;
					_blankY = itemY;
					
					//check if it is goal status
					if(is_win(_puzzle))
						alert("Congratulations! You solve the puzzle");				
				
				}
				else{ // it is a drag event
					if(event.clientX>rangeXstart && event.clientX < rangeXstart+164 && event.clientY>rangeYstart && event.clientY < rangeYstart+164){
							fillelem.className = "hasImage";
							fillelem.style.backgroundPosition = movingDiv.style.backgroundPosition;					

							//update the global variable
							_puzzle[_puzzle.indexOf(id)] = _blankX*4+_blankY;
							_blankX = itemX;
							_blankY = itemY;
							
							//check if it is goal status
							if(is_win(_puzzle))
								alert("Congratulations! You solve the puzzle");
					}
					else{					
						self.className = "hasImage";
						self.style.backgroundPosition = movingDiv.style.backgroundPosition;					
					}
					
					self.is_click = true // change back to default

				}				
				//clean up movingDiv
				movingDiv.style.display = 'none';
				movingDiv.style.removeProperty('background-position');
				movingDiv.style.removeProperty('top');
				movingDiv.style.removeProperty('left');
								
				//unbind those two event
				document.removeEventListener("mouseup",upHandler,true);
				document.removeEventListener("mousemove",moveHandler,true);
				e.stopPropagation();
			}

			document.addEventListener("mousemove", moveHandler, true);
			document.addEventListener("mouseup",upHandler,true);

			e.stopPropagation();
			e.preventDefault();	
		} 
				
	},false);
		
}

// start to scramble the puzzle
scrambleIt();