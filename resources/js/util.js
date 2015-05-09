var util = {	
	addElem : function (parent, attrName, subid){
		var result = parent[attrName] = new Object();
		
		result.id = subid;
		result.ref=$('#'+result.id);
		
		if(gName) 
			result.gName = gName;
		if(result.ref.val) 
			result.value = function(){ return result.ref.val() };
			
		return result;
	},
	
	loadUIElements : function (elem){
		
		var addElemsRecursive = function(node){
			//jQuery ref
			node.$ = $('#'+node.id);
			//se reasigna value a la función jQuery  sobre el elemento
			//if(node.value==='val') node.value = function(){ return node.$.val(); };
			if(node.value && node.$[node.value]){
				var valueBak = node.value;
				node.value = function() {
					return node.$[valueBak](arguments);
				}
			}

			//recursive call to childs
			for (indx in node){
				if(indx !== '$' && (typeof node[indx] === 'object')){
					addElemsRecursive(node[indx]);
				}
			}
		}

		addElemsRecursive(elem);
	},
	
	__prevLogTime: 0,
	
	logTime: function(message, previousTime){
		var milis = (new Date()).getTime();
		var finalMsg = milis + " (" + (milis - util.__prevLogTime) + "): " + message;
		util.__prevLogTime = milis;
		
		console.log(finalMsg);
	}
}

