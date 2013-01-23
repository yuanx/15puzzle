/* 
This is the priority queue to hold the status, each elem in the queue is an object has an array for status and a priority value.
The highest priority which means the smallest priority value will pop out 
e.g. {status: [1,2,3,5], priority: 40, depth: 1, blank: 4, path: "3,4,2,1,3"} 
*/

(function(){
	var swap = function(arr, a, b){
		var temp = arr[a];
		arr[a] = arr[b];
		arr[b] = temp;
	}
	
	var cm = function(item1, item2){
		return (item1.priority - item2.priority);
	}
	
	//implement the priority queue
	priorityQueue = function() {
		var queue = [];
		
		//Acutal return object
		var that = {
			
			//just for testing
			//arr: queue,
			
			pop: function(){
				if(queue.length === 0)
					return null; // if the queue is empty, return null
					
				//get the return value
				var res = queue.shift(); 
				
				//re-organize the queue
				if(queue.length === 0)
					return res;
				else{
					queue.unshift(queue.pop());
					//start the bubble
					var i = 0;
					while((i+1)*2 <= queue.length-1){
						if(cm(queue[i], queue[(i+1)*2])<0 && cm(queue[i], queue[(i+1)*2-1])<0)
							break;
						else{
							if(cm(queue[(i+1)*2-1], queue[(i+1)*2])<0){
								swap(queue, i, (i+1)*2-1);
								i = (i+1)*2-1;
							}
							else{
								swap(queue, i, (i+1)*2);
								i = (i+1)*2;
							}
						}
					}
					//corner case
					if((i+1)*2 === queue.length && cm(queue[(i+1)*2-1], queue[i])<0)
						swap(queue, i, (i+1)*2-1);
				}
				return res;	
			},
			
			push: function(item){
				queue.push(item);
				if(queue.length === 1)
					return;
				//compare with the parents and bubble up
				var i = queue.length-1
				var p = Math.floor((i+1)/2-1);
				while(i !== 0 && cm(queue[i], queue[p])<0){
					swap(queue, i, p);
					i = p;
					p = Math.floor((i+1)/2-1);
				}
				
			},
			
			top: function(){
				if(queue.length === 0)
					return null;
				else
					return queue[0];
			},
			
			isEmpty: function(){
				if(queue.length === 0)
					return true;
				else
					return false;
			}
		}
		
		return that;
	};
	
})()