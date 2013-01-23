// Used a modified A* algorithm to calculate the minimum steps
(function(){
	//Node class
	function Node(arr){
		this.status = arr.slice(0);
		this.depth = -1;
		this.priority = h(this.status);
		for(var i=0; i< 16; i++){
			if(arr.indexOf(i)<0)
				break;
		}
		this.blank = i;
		this.path = "";
	}
	
	//Manhattan Distance function
	function h(arr){
		var md = 0;
		for(var i=0; i<arr.length; i++){
			var cX = Math.floor(arr[i]/4);
			var cY = arr[i]%4;
			var oX = Math.floor(i/4);
			var oY = i%4;			
			md += (Math.abs(cX-oX) + Math.abs(cY-oY));
		}
		return md;
	}
	
	aStar = function(){
		// Priority Queue
		var pq = priorityQueue();
		// Visited Node
		var visitedNode = new Object();
		
		// get all the valid next move and push them to priority queue.
		function pushAllnodes(node){
			var currentblank = node.blank;
			var cbX = Math.floor(currentblank/4);
			var cbY = currentblank%4;
			var currentdepth = node.depth;
			var currentpath = node.path;
			var temp, tempNode;
			var nextposition = [-1,1];
			for(var j=0; j<2; j++){
				if(cbX+nextposition[j]>=0 && cbX+nextposition[j]<4){
					temp = node.status.slice(0);
					temp[temp.indexOf((cbX+nextposition[j])*4+cbY)] = currentblank;
					if(visitedNode[temp.toString()] === undefined){
						tempNode = new Node(temp);
						tempNode.depth = currentdepth+1;
						tempNode.path = currentpath + ' ' + ((cbX+nextposition[j])*4+cbY);
						/*tempNode.priority += tempNode.path.length;*/
						pq.push(tempNode);
					}
				}
				
				if(cbY+nextposition[j]>=0 && cbY+nextposition[j]<4){
					temp = node.status.slice(0);
					temp[temp.indexOf(cbX*4+nextposition[j]+cbY)] = currentblank;
					if(visitedNode[temp.toString()] === undefined){
						tempNode = new Node(temp);
						tempNode.depth = currentdepth+1;
						tempNode.path = currentpath + ' '+(cbX*4+nextposition[j]+cbY);
						/*tempNode.priority += tempNode.path.length;*/
						pq.push(tempNode);
					}
				}
			}
		}
		
		return function(init){
			var rootNode = new Node(init);
			rootNode.depth = 0;
			rootNode.path = rootNode.blank + '';
			pq.push(rootNode);
			while(!pq.isEmpty()){
				var currentNode = pq.pop();
				visitedNode[currentNode.status.toString()] = 1;
				if(currentNode.priority === 0){
					return currentNode.path; // found the solution
				}
				pushAllnodes(currentNode);
			}
		}
	}
})()