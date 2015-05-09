
var gDocIO = {
	readConfig : { 
		id:'1MuG498lLmX5liVPmE0A2yxPCk5CcpLu7FFK6qkEJeTw', 
		type:'form',
		leftColumnTitle:'sala',
		showTimeStamp:true 
	},
	
	bindSubmit : function sendData($form, after){    
		$form.submit(function(){
			util.logTime('handling submit');
			$.ajax({
				url: $form.attr('action'),
				type: "post",
				data : $form.serialize(),
				complete: after
			});
			return false;
		});
	},
	
	idIntervalReq: undefined,
	
	bindRequest : function($configForm, $room, $interval, $toggleList, callback){
		var requestData = function (){
			console.log((new Date())+"on request data...");
			briefcase.getJSON(gDocIO.readConfig, callback);
		};	
		
		var toggleList = function(list, show){
			for(idx in list){
				if(show) list[idx].show();
				else list[idx].hide();
			}
		};
		
		$configForm.submit(function(event){
			var ts = $interval.val();
			var sala = $room.val();
			if (sala && ts) {
				console.log("enable interval");
				gDocIO.idIntervalReq = window.setInterval(requestData, ts);
				requestData();
			} else {
				console.log("clear interval");
				window.clearInterval(gDocIO.idIntervalReq);
			}
			
			toggleList($toggleList, sala);
			return false;
		});
		
	}
};
