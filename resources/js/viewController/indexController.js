var indexController = new Object();

indexController.initUI = function (){		
	var viewUI = {
		id: 'indexContainer',
		information: {id:'informationSection',
			roomLb:{id:'actualRoom', value: 'html'},
			userLb:{id:'actualUser', value:'html'}
		},
		menu: {id:'menu',
			userBtn:{id:'showUserFormBtn'},
			intervalBtn:{id:'showIntervalFormBtn'},
			roomBtn:{id:'showRoomFormBtn'}
		},
		config:{id:'configForms',
			usuarioForm:{id:'configUserForm',
				user: {id:'inputUser', value:'val'}},
			intervalForm: {id:'configIntervalForm',
				interval:{id:'interval', value:'val'}},
			salaForm: {id:'configRoomForm',
				sala: {id:'newRoom', value:'val'}
			}
		},

		mensajes: {id: 'messages',
			recargaBtn: {id:'refreshBtn'},
			lista: {id:'chatMsg',
				loadingLb: {id:'loading'}
			}
		},

		form: {id: 'formMsg',
			usuario: {id: 'userHidden', value: 'val'},
			mensaje: {id: 'message', value: 'val'},
			sala: {id: 'roomHidden', value: 'val'}
		}
	};
	
	util.loadUIElements(viewUI);
	
	return viewUI
};

indexController.showReceivedData = function (response){
	var sala = UI.config.sala.value();
	var liList = "";
	for(indx in response){
		var tuple = response[indx];
		if(tuple.title === sala) {
			//Añadir sólo conversación de esta sala
			var user = tuple.categories[0].value;
			var mensaje = tuple.categories[1].value;
			var tst = tuple.marcatemporal;
			liList+="<li>["+tst+"] "+user+": "+mensaje+"</li>";
		}
	}
	UI.listaMensajes.$.html(liList);
	util.logTime("data recovered");
}
