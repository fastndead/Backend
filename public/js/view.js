function view(){
	var tempIndex;

	 webix.ui({//форма добавления рейса
            view:"window",
            id:"addFlightWin",
            width: 400,
            position:"center",
            modal:true,
            head:"Введите данные о рейсе:",
            body: {
				view:"form",
                id: "addFlightBody",
				borderless:true,
				elements: [
					{ view:"text", label:'Город отправления', id:"destination1"},
					{ view:"text", label:'Город прибытия', id:"destination2"},
					{ view:"multiselect", separator:", ",id : "pilotSelect", label:"Пилот"},
					{ view:"richselect",id:"planeSelect", label:"Самолёт"},
					{cols:[
						{ view:"button", id:"flightAddBtn", value: "Добавить", click:"Run.view.addFlight"},
						{view: "button", id:"flightEditBtn", value: "Изменить", click:"Run.view.EditFlight", hidden:true},
						{view:"button", value:"Закрыть", fillspace: 0.1, click:function(){
								$$("addFlightWin").hide();
								$$("destination1").setValue("");
								$$("destination2").setValue("");
								$$("pilotSelect").setValue("");
								$$("planeSelect").setValue("");

							}
						},
					]}
					
				],
				elementsConfig:{
					labelPosition:"top",
				}
			}
        });

	webix.ui({//форма добавления пилота
            view:"window",
            id:"addPilotWin",
            width: 300,
            position:"center",
            modal:true,
            head:"Введите данные пилота:",
            body: {
				view: "form",
				borderless: true,
				elements: [
					{rows:[
						{view:"text", label:'Имя', id:"firstName"},
						{view:"text", label:'Фамилия', id:"lastName"},
						{view:"button", click:"Run.view.addPilot", value:"Добавить", fillspace: 1}
						]
				},
				{view:"button", value:"Закрыть", fillspace: 0.1, click:function(){
								$$("addPilotWin").hide();
							}
						},
				],
				elementsConfig:{
					labelPosition:"top",
				}
			}
        });

	webix.ui({//форма справочника пилотов
            view:"window",
            id:"pilotsInfoWin",
            width: 400,
            position:"center",
            modal:true,
            head:"Пилоты",
            body:{
				view:"form",
				borderless:true,
				elements: [
					{cols:[
						{view:"button", value:"Добавить",click:function(){
							Run.view.showWindows("addPilotWin");
						}, fillspace: 1},
						{view:"button", value:"Изменить",click:function(){
							Run.view.showWindows("editPilotWin");
							$$("lastNameEdit").hide();
						}, fillspace: 1},
						{view:"button", value:"Удалить",click:function(){
							Run.view.removePilot();
						},  fillspace: 1}
					]},
					{view:"datatable",
					id: "pilotsGrid",
					columns:[
						{id: "index", header: "№", fillspace: 1},
						{id: "FirstName", header:"Имя", fillspace: 2, height: 30},
						{id: "LastName", header:"Фамилия", fillspace: 2, height: 30}
					],
					editable: true,
                    editaction:"custom",
                    navigation:true,
                    select:"row",
					scheme:{
			    		$init:function(obj){ obj.index = this.count(); }
					},
					height: 300
					},
					{view:"button", value:"Закрыть", fillspace: 0.1, click:function(){
								$$("pilotsInfoWin").hide();
							}
						},
					],
					elementsConfig:{
						labelPosition:"top",
					}
				}
        });


	webix.ui({//форма изменения пилота
		view: "window",
		id: "editPilotWin",
		width: 300,
		position: "center",
		modal: true,
		head:"Редактирование",
		body:{
			view:"form",
			borderless: true,
			elements:[
				{view:"text", label:"Введите номер пилота:", id:"firstNameEdit"},
				{view:"text", label:"Введите номер пилота:", id:"lastNameEdit"},
				{cols:[
					{view:"button", id : "editBtn", label:"Изменить", click:"Run.view.editPilot"},
					{view:"button", value:"Закрыть", click:function(){
									$$("editPilotWin").hide();
									$$("firstNameEdit").setValue("");
								}
							}
					]}
			],
			elementsConfig:{
					labelPosition:"top",
				}
		}
	});

	webix.ui({//форма удаления пилота
		view: "window",
		id: "removePilotWin",
		width: 250,
		position: "center",
		modal: true,
		head:"Удаление",
		body:{
			view:"form",
			borderless: true,
			elements:[
				{view:"text", label:"Введите номер пилота:", id:"removePilotIndex"},
				{cols:[
					{view:"button", id : "removePilotBtn", label:"удалить", click:"Run.view.removePilot"},
					{view:"button", value:"Закрыть", click:function(){
									$$("removePilotWin").hide();
									$$("removePilotIndex").setValue("");
								}
							}
					]}
			],
			elementsConfig:{
					labelPosition:"top",
				}
		}
	});

	webix.ui({//форма справочника самолётов
            view:"window",
            id:"planesInfoWin",
            width: 400,
            position:"center",
            modal:true,
            head:"Самолёты",
            body:{
				view:"form",
				borderless:true,
				elements: [
					{cols:[
						{view:"button", value:"Добавить", fillspace: 1, click:function(){Run.view.showWindows("addPlaneWin");}},
						{view:"button", value:"Изменить", fillspace: 1, click:function(){Run.view.showWindows("editPlaneWin");}},
						{view:"button", value:"Удалить",  fillspace: 1,  click:function(){Run.view.removePlane();}},
					]},
					{view:"datatable",
					id: "planesGrid",
					columns:[
						{id: "index", header: "№", fillspace: 1},
						{id: "Name", header:"Имя", fillspace: 2}
					],
					editable: true,
					editaction:"custom",
                    navigation:true,
                    select:"row",
					scheme:{
			    		$init:function(obj){ obj.index = this.count(); }
					},
					height: 300
					},
					{view:"button", value:"Закрыть", fillspace: 0.1, click:function(){
								$$("planesInfoWin").hide();
							}
						}
				],
				elementsConfig:{
					labelPosition:"top",
				}
			}
        });

	webix.ui({//форма добавления пилота
            view:"window",
            id:"addPlaneWin",
            width: 300,
            position:"center",
            modal:true,
            head:"Введите данные самолёта:",
            body: {
				view: "form",
				borderless: true,
				elements: [
					{rows:[
						{view:"text", label:'Название', id:"planeNameAdd"},
						{view:"button", click:"Run.view.addPlane", value:"Добавить", fillspace: 1}
						]
				},
				{view:"button", value:"Закрыть", fillspace: 0.1, click:function(){
								$$("addPlaneWin").hide();
							}
						},
				],
				elementsConfig:{
					labelPosition:"top",
				}
			}
        });

    webix.ui({//форма изменения самолёта
            view:"window",
            id:"editPlaneWin",
            width: 300,
            position:"center",
            modal:true,
            head:"Редактирование",
            body: {
				view: "form",
				borderless: true,
				elements: [
					{rows:[
						{view:"text", label:'Введите номер самолёта', id:"planeIndexToEdit"},
						{view:"text", label:'Измените название', id:"planeName", hidden: true},
						{cols:[
						{view:"button", click:"Run.view.editPlane", value:"Изменить", fillspace: 1},
						{view:"button", value:"Закрыть", fillspace: 0.1, click:function(){
										$$("editPlaneWin").hide();
										$$("planeName").setValue("");
										$$("planeName").hide();
										$$("planeIndexToEdit").show();
									}
								},]}
						]
				},
				],
				elementsConfig:{
					labelPosition:"top",
				}
			}
        });


    webix.ui({//форма удаления самолёта
		view: "window",
		id: "removePlaneWin",
		width: 250,
		position: "center",
		modal: true,
		head:"Удаление",
		body:{
			view:"form",
			borderless: true,
			elements:[
				{view:"text", label:"Введите номер самолёта:", id:"removePlaneIndex"},
				{cols:[
					{view:"button", id : "removePlaneBtn", label:"Удалить", click:"Run.view.removePlane"},
					{view:"button", value:"Закрыть", click:function(){
									$$("deletePilotWin").hide();
									$$("removePilotIndex").setValue("");
								}
							}
					]}
			],
			elementsConfig:{
					labelPosition:"top",
				}
		}
	});	
	webix.ui({//форма удаления рейса
		view: "window",
		id: "removeFlightWin",
		width: 250,
		position: "center",
		modal: true,
		head:"Удаление",
		body:{
			view:"form",
			borderless: true,
			elements:[
				{view:"text", label:"Введите номер рейса:", id:"removeFlightIndex"},
				{cols:[
					{view:"button", id : "removeFlightBtn", label:"Удалить", click:"Run.view.removeFlight"},
					{view:"button", value:"Закрыть", click:function(){
									$$("removeFlightWin").hide();
									$$("removeFlightIndex").setValue("");
								}
							}
					]}
			],
			elementsConfig:{
					labelPosition:"top",
				}
		}
	});

	webix.ui({//форма редактирования рейса 
		view: "window",
		id: "editFlightWin",
		width: 250,
		position: "center",
		modal: true,
		head:"Редактирование",
		body:{
			view:"form",
			borderless: true,
			elements:[
				{view:"text", label:"Введите номер рейса:", id:"editFlightIndex"},
				{cols:[
					{view:"button", id : "removeFlightBtn", label:"изменить", click:"Run.view.editFlight"},
					{view:"button", value:"Закрыть", click:function(){
									$$("editFlightWin").hide();
									$$("editFlightIndex").setValue("");
								}
							}
					]}
			],
			elementsConfig:{
					labelPosition:"top",
				}
		}
	});


	this.editFlight = function(){
		tempIndex = $$("editFlightIndex").getValue()-1;
		if(!Run.flightProvider.indexValidator(tempIndex)){
			webix.message({ type:"error", text:"Неправильно введены данные, попробуйте ещё.\n" });
			$$("editFlightWin").hide();
			$$("editFlightIndex").setValue("");
			return;
		}
		Run.view.showWindows("addFlightWin");
		$$("destination1").setValue(Run.flightProvider.getByIndex(tempIndex).getDestination1());
		$$("destination2").setValue(Run.flightProvider.getByIndex(tempIndex).getDestination2());
		Run.view.refreshSelects();
		$$("flightAddBtn").hide();
		$$("flightEditBtn").show();
	}

	this.EditFlight = function(){
			Run.editFlights($$("destination1").getValue(),$$("destination2").getValue(),
			$$("pilotSelect").getValue(),$$("planeSelect").getValue(), tempIndex);
			Run.view.refreshFlightTable();
			$$("addFlightWin").hide();
			$$("destination1").setValue("");
			$$("destination2").setValue("");
			$$("pilotSelect").setValue("");
			$$("planeSelect").setValue("");
			$$("editFlightWin").hide();
			$$("editFlightIndex").setValue("");
		}

	this.showWindows= function(targetWindow){
		$$(targetWindow).show();
	}

	this.addPilot = function(){
        var pilot =  {"FirstName" : $$("firstName").getValue(), "LastName" : $$('lastName').getValue()};
        $.ajax({
            type: 'PUT',
            url: 'http://localhost:9000/pilots',
            contentType: 'application/json',
            data: JSON.stringify(pilot),
			success: function () {
            	webix.message("Добавление прошло успешно!");
                Run.view.refreshPilotsTable();
            }
        }).done(function () {

        }).fail(function (msg) {
            webix.message({ type:"error", text:"Что-то пошло не так: " + msg})
        });
        $$('firstName').setValue('');
        $$('lastName').setValue('');
        $$("addPilotWin").hide();
	}

	this.addFlight = function(){
		Run.addFlight($$("destination1").getValue(),$$("destination2").getValue(),
			$$("pilotSelect").getValue(),$$("planeSelect").getValue());
		Run.view.refreshFlightTable();
		$$("addFlightWin").hide();
		$$("destination1").setValue("");
		$$("destination2").setValue("");
		$$("pilotSelect").setValue("");
		$$("planeSelect").setValue("");
	}

	this.editPilot = function(){
		if(!$$("lastNameEdit").isVisible()){
			tempIndex = $$("firstNameEdit").getValue();
			if(!Run.pilotProvider.indexValidator(tempIndex)){
				var message = "Неправильный номер пилота!"
				webix.message({ type:"error", text:message });
				return;
			}
			$$("lastNameEdit").show();
			$$("lastNameEdit").setValue(Run.planeProvider.getByIndex(tempIndex-1));
			$$("lastNameEdit").setValue(Run.pilotProvider.getByIndex(tempIndex-1).getLastName());
			$$("firstNameEdit").setValue(Run.pilotProvider.getByIndex(tempIndex-1).getFirstName());
			return;
		}	
		Run.editPilot($$("firstNameEdit").getValue(), $$("lastNameEdit").getValue(), tempIndex -1);
		$$("editPilotWin").hide();
		$$("firstNameEdit").setValue("");
		$$("lastNameEdit").hide();
		Run.view.refreshPilotsTable();
	}

	this.addPlane = function(){
		var plane =  {"name" : $$("planeNameAdd").getValue()};
        $.ajax({
            type: 'PUT',
            url: 'http://localhost:9000/planes',
            contentType: 'application/json',
            data: JSON.stringify(plane),
        }).done(function () {
            webix.message("Добавление прошло успешно!");
            Run.view.refreshPlanesTable();
        }).fail(function (msg) {
            webix.message({ type:"error", text:"Что-то пошло не так: " + msg})
        });
		$$("addPlaneWin").hide();
		$$("planeNameAdd").setValue("");
	}

	this.editPlane = function(){
		if(!$$("planeName").isVisible()){
			tempIndex = $$("planeIndexToEdit").getValue();
			if(!Run.planeProvider.indexValidator(tempIndex)){
				var message = "Неправильный номер самолёта!";
				webix.message({ type:"error", text:message });
				return;
			}
			$$("planeName").show();
			$$("planeName").setValue(Run.planeProvider.getByIndex(tempIndex-1).getName());
			$$("planeIndexToEdit").setValue("");
			$$("planeIndexToEdit").hide();
			return;
		}
		Run.editPlane($$("planeName").getValue(), tempIndex-1);
		$$("planeName").setValue("");
		$$("planeName").hide();
		$$("planeIndexToEdit").show();
		$$("editPlaneWin").hide();
		Run.view.refreshPlanesTable();
	}

	this.removePilot = function(){
        var index = $$("pilotsGrid").getSelectedItem();
        $.ajax({
            type: 'DELETE',
            url: 'http://localhost:9000/pilots/' + index["Id"],
            contentType: 'application/json',
			success: function () {
                webix.message("Удаление прошло успешно!");
                Run.view.refreshPilotsTable();
            }
        }).fail(function (msg) {
            webix.message({ type:"error", text:"Что-то пошло не так" })
        });
	}

	this.removeFlight = function(){
        var index = $$("grid").getSelectedItem();
        $.ajax({
            type: 'DELETE',
            url: 'http://localhost:9000/flights/' + index["Id"],
            contentType: 'application/json',
        }).done(function () {
            webix.message("Удаление прошло успешно!");
            Run.view.refreshFlightTable();
        }).fail(function (msg) {
            webix.message({ type:"error", text:"Что-то пошло не так" })
        });
	}

	this.removePlane = function(){
        var index = $$("planesGrid").getSelectedItem();
        $.ajax({
            type: 'DELETE',
            url: 'http://localhost:9000/planes/' + index["Id"],
            contentType: 'application/json',
        }).done(function () {
            webix.message("Удаление прошло успешно!");
            Run.view.refreshPlanesTable();
        }).fail(function (msg) {
            webix.message({ type:"error", text:"Что-то пошло не так" })
        });
	}

	this.refreshPilotsTable = function(){
		$$('pilotsGrid').clearAll();
        webix.ajax("http://localhost:9000/pilots/", function (text, data) {
            $$("pilotsGrid").parse(data.json()["Data"]);
        });
	}

	this.refreshFlightTable = function(){
		$$('grid').clearAll();
        webix.ajax("http://localhost:9000/flights/", function (text, data) {
        	
            $$("grid").parse(data.json()["Data"]);
        });
        $$('grid').adjustRowHeight();
	}

	this.refreshPlanesTable = function(){
		$$('planesGrid').clearAll();
        webix.ajax("http://localhost:9000/planes/", function (text, data) {
            $$("planesGrid").parse(data.json()["Data"]);
        });
	}

	this.refreshSelects = function(){
		$$("pilotSelect").define("options", Run.pilotProvider.getAllString());
		$$("pilotSelect").refresh();

		$$("planeSelect").define("options", Run.planeProvider.getAllString());
		$$("planeSelect").refresh();
		

	}

}

webix.ready(function(){

	webix.debug = true;
		webix.ui({
		rows: [
			{type: "header", template: "Аэропорт", css: {
              											"font-family"	:"'Comfortaa', cursive;",
              											"font-size"		: "20px;",
              											"text-align"	:"center;",
            											"margin-top"	: "15px;",
            											"box-shadow":"0 0 30px rgba(0,0,0,0.5);"}
            },
          
			{ view:"toolbar", elements:[
				{view:"button", value:"Добавить рейс", click: function(){Run.view.showWindows("addFlightWin"); Run.view.refreshSelects();},  height: 50},
				{view:"button", value:"Справочник пилотов", click: function(){Run.view.showWindows("pilotsInfoWin"); Run.view.refreshPilotsTable();}, height: 50},
				{view:"button", value:"Справочник самолётов", click: function(){Run.view.showWindows("planesInfoWin"); Run.view.refreshPlanesTable();}, height: 50},
			]},

			{view:"datatable",
			id: "grid",
			columns:[
				{id: "index", header:"№", fillspace: 1},
				{id: "IdPilot", header:"Пилот", fillspace: 3},
				{id: "IdPlane", header:"Самолёт", fillspace: 2},
				{id:"DeparturePoint", header:"Из", fillspace: 2},
				{id: "ArrivalPoint", header:"В", fillspace: 2}
			],
             fixedRowHeight:false,
             scrollX:false,
             editable: true,
             editaction:"custom",
             navigation:true,
             select:"row",
			scheme:{
        	$init:function(obj){ obj.index = this.count(); }
    		},
                on:{
                    "onresize":webix.once(function(){
                        this.adjustRowHeight("IdPilot", true);
                    })
                }
			},
			{cols:[ 
				{view:"button",css: "menu", value:"Редактировать",click:function(){Run.view.showWindows("editFlightWin")}, height: 50, fillspace: 1},
				{view:"button",css: "menu", value:"Удалить",click: function(){Run.view.removeFlight()} ,height: 50, fillspace: 1}
			]},
		]
	});

	Run.view.refreshFlightTable()

});